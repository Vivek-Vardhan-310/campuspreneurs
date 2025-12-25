import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Users, FileText, Shield, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Stats {
  totalProblems: number;
  totalUsers: number;
  adminCount: number;
  studentCount: number;
}

interface ProblemStats {
  id: string;
  title: string;
  count: number;
}

interface ThemeStats {
  theme: string;
  count: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProblems: 0,
    totalUsers: 0,
    adminCount: 0,
    studentCount: 0,
  });
  const [problemStats, setProblemStats] = useState<ProblemStats[]>([]);
  const [themeStats, setThemeStats] = useState<ThemeStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      // Fetch problems data (same logic as Problems page)
      const { data: problems, error: problemsError } = await supabase
        .from("problem_statements")
        .select("*")
        .order("problem_statement_id", { ascending: true });

      console.log("AdminDashboard - Fetched problems:", problems);
      console.log("AdminDashboard - Fetch error:", problemsError);

      // Fetch user counts by role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id, role");

      const adminCount = roles?.filter((r) => r.role === "admin").length || 0;
      const studentCount = roles?.filter((r) => r.role === "student").length || 0;

      // Check current user role
      const { data: { user } } = await supabase.auth.getUser();
      const currentUserRole = roles?.find(r => r.user_id === user?.id)?.role;
      console.log("Current user role:", currentUserRole);

      // Fetch team registrations per problem
      const { data: registrations, error: regError } = await (supabase as any)
        .from("team_registrations")
        .select("problem_id");

      if (regError) {
        console.error("Error fetching registrations:", regError);
      } else {
        console.log("Registrations fetched:", registrations);
      }

      const problemCountMap = (registrations as { problem_id: string }[] | null)?.reduce((acc, reg) => {
        acc[reg.problem_id] = (acc[reg.problem_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const problemStatsData = problems?.map(p => ({
        id: p.problem_statement_id,
        title: p.title,
        count: problemCountMap[p.problem_statement_id] || 0
      })) || [];

      // Calculate theme stats
      const themeCountMap = problems?.reduce((acc, p) => {
        const count = problemCountMap[p.problem_statement_id] || 0;
        acc[p.theme] = (acc[p.theme] || 0) + count;
        return acc;
      }, {} as Record<string, number>) || {};

      const themeStatsData = Object.entries(themeCountMap).map(([theme, count]) => ({
        theme,
        count
      }));

      console.log("Theme Stats Data:", themeStatsData);

      setStats({
        totalProblems: problems?.length || 0,
        totalUsers: (roles?.length || 0),
        adminCount,
        studentCount,
      });

      setProblemStats(problemStatsData);
      setThemeStats(themeStatsData);

      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Problem Statements",
      value: stats.totalProblems,
      icon: FileText,
      color: "bg-primary",
    },
    {
      title: "Total Registered Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-secondary",
    },
    {
      title: "Admin Users",
      value: stats.adminCount,
      icon: Shield,
      color: "bg-accent",
    },
    {
      title: "Student Users",
      value: stats.studentCount,
      icon: TrendingUp,
      color: "bg-muted",
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-poppins font-bold text-primary-foreground">
            Admin Dashboard
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Overview of Campuspreneurs statistics and management tools.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4 animate-pulse">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-muted-foreground">Loading statistics...</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.title}
                      className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all"
                    >
                      <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <p className="text-muted-foreground text-sm">{stat.title}</p>
                      <p className="text-3xl font-poppins font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Registration Statistics */}
              <Accordion type="multiple" className="w-full space-y-4">
                <AccordionItem value="problems" className="bg-card rounded-xl shadow-card">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <h2 className="text-xl font-poppins font-semibold text-foreground text-left">
                      Team Registrations by Problem Statement
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {problemStats.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 px-4 font-medium text-foreground">Problem Title</th>
                              <th className="text-right py-2 px-4 font-medium text-foreground">Registered Teams</th>
                            </tr>
                          </thead>
                          <tbody>
                            {problemStats.map((problem) => (
                              <tr key={problem.id} className="border-b border-border/50">
                                <td className="py-3 px-4 text-foreground">{problem.title}</td>
                                <td className="py-3 px-4 text-right font-semibold text-primary">{problem.count}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No registrations yet.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="themes" className="bg-card rounded-xl shadow-card">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <h2 className="text-xl font-poppins font-semibold text-foreground text-left">
                      Team Registrations by Theme
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {themeStats.length > 0 ? (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {themeStats.map((theme) => (
                          <div key={theme.theme} className="bg-muted/50 rounded-lg p-4">
                            <h3 className="font-medium text-foreground capitalize">{theme.theme}</h3>
                            <p className="text-2xl font-bold text-primary mt-1">{theme.count}</p>
                            <p className="text-sm text-muted-foreground">teams registered</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No registrations yet.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Quick Actions */}
              <div className="bg-card rounded-xl p-6 shadow-card mt-8">
                <h2 className="text-xl font-poppins font-semibold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <a
                    href="/problems"
                    className="p-4 rounded-lg border border-border hover:border-secondary hover:bg-accent/50 transition-all"
                  >
                    <FileText className="w-6 h-6 text-secondary mb-2" />
                    <h3 className="font-semibold text-foreground">Manage Problems</h3>
                    <p className="text-sm text-muted-foreground">Add, edit or delete problem statements</p>
                  </a>
                  <a
                    href="/event-structure"
                    className="p-4 rounded-lg border border-border hover:border-secondary hover:bg-accent/50 transition-all"
                  >
                    <TrendingUp className="w-6 h-6 text-secondary mb-2" />
                    <h3 className="font-semibold text-foreground">Edit Event Structure</h3>
                    <p className="text-sm text-muted-foreground">Update phases and framework</p>
                  </a>
                  <a
                    href="/resources"
                    className="p-4 rounded-lg border border-border hover:border-secondary hover:bg-accent/50 transition-all"
                  >
                    <FileText className="w-6 h-6 text-secondary mb-2" />
                    <h3 className="font-semibold text-foreground">Manage Resources</h3>
                    <p className="text-sm text-muted-foreground">Upload and update documents</p>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
