import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Users, FileText, Shield, TrendingUp } from "lucide-react";

interface Stats {
  totalProblems: number;
  totalUsers: number;
  adminCount: number;
  studentCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProblems: 0,
    totalUsers: 0,
    adminCount: 0,
    studentCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      // Fetch problem count
      const { count: problemCount } = await supabase
        .from("problem_statements")
        .select("*", { count: "exact", head: true });

      // Fetch user counts by role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role");

      const adminCount = roles?.filter((r) => r.role === "admin").length || 0;
      const studentCount = roles?.filter((r) => r.role === "student").length || 0;

      setStats({
        totalProblems: problemCount || 0,
        totalUsers: (roles?.length || 0),
        adminCount,
        studentCount,
      });

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

              {/* Quick Actions */}
              <div className="bg-card rounded-xl p-6 shadow-card">
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
