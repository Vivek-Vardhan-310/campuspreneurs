import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Mail, GraduationCap, Users, Lightbulb } from "lucide-react";

const themes = [
  {
    id: "academic",
    name: "Academic",
    icon: GraduationCap,
    description: "Problems related to teaching, learning, examinations, and academic infrastructure.",
    color: "bg-primary",
  },
  {
    id: "non-academic",
    name: "Non-Academic",
    icon: Users,
    description: "Problems related to campus operations, administration, and student services.",
    color: "bg-secondary",
  },
  {
    id: "community",
    name: "Community Innovation",
    icon: Lightbulb,
    description: "Problems addressing societal challenges and community development.",
    color: "bg-accent",
  },
];

const problems = [
  // Academic Theme
  {
    id: "CP01",
    title: "Smart Attendance Management System",
    theme: "Academic",
    organization: "Department of CSE",
    category: "Software",
    description: "Develop an automated attendance system using facial recognition or RFID that integrates with the existing ERP system.",
    spoc: "Dr. Amit Sharma",
    spocEmail: "amit.sharma@gcet.edu.in",
  },
  {
    id: "CP02",
    title: "AI-Based Exam Proctoring Solution",
    theme: "Academic",
    organization: "Examination Cell",
    category: "Software/AI",
    description: "Create an intelligent proctoring system for online examinations that detects suspicious activities.",
    spoc: "Prof. Priya Verma",
    spocEmail: "priya.verma@gcet.edu.in",
  },
  {
    id: "CP03",
    title: "Personalized Learning Path Generator",
    theme: "Academic",
    organization: "Department of AIML",
    category: "Software/AI",
    description: "Build an adaptive learning system that creates personalized study plans based on student performance.",
    spoc: "Dr. Sunita Rao",
    spocEmail: "sunita.rao@gcet.edu.in",
  },
  {
    id: "CP04",
    title: "Digital Lab Manual Platform",
    theme: "Academic",
    organization: "Department of ECE",
    category: "Web Platform",
    description: "Create an interactive digital platform for lab manuals with simulation capabilities.",
    spoc: "Prof. Rahul Gupta",
    spocEmail: "rahul.gupta@gcet.edu.in",
  },
  // Non-Academic Theme
  {
    id: "CP05",
    title: "Smart Campus Navigation System",
    theme: "Non-Academic",
    organization: "Administration",
    category: "Mobile App",
    description: "Develop an AR-based indoor navigation app for visitors and new students to navigate the campus.",
    spoc: "Prof. Vikram Joshi",
    spocEmail: "vikram.joshi@gcet.edu.in",
  },
  {
    id: "CP06",
    title: "Hostel Management Automation",
    theme: "Non-Academic",
    organization: "Hostel Administration",
    category: "Software",
    description: "Create a comprehensive hostel management system for room allocation, complaints, and mess management.",
    spoc: "Dr. Neha Singh",
    spocEmail: "neha.singh@gcet.edu.in",
  },
  {
    id: "CP07",
    title: "Campus Energy Monitoring Dashboard",
    theme: "Non-Academic",
    organization: "Infrastructure Cell",
    category: "IoT + Dashboard",
    description: "Build an IoT-based system to monitor and optimize energy consumption across campus buildings.",
    spoc: "Prof. Sanjay Kumar",
    spocEmail: "sanjay.kumar@gcet.edu.in",
  },
  {
    id: "CP08",
    title: "Smart Parking Management",
    theme: "Non-Academic",
    organization: "Security Department",
    category: "IoT + Software",
    description: "Develop a smart parking system with real-time slot availability and vehicle tracking.",
    spoc: "Mr. Rajesh Patel",
    spocEmail: "rajesh.patel@gcet.edu.in",
  },
  // Community Innovation Theme
  {
    id: "CP09",
    title: "Rural Health Awareness Platform",
    theme: "Community Innovation",
    organization: "NSS Cell",
    category: "Web/Mobile App",
    description: "Create a multilingual health awareness platform for rural communities with telemedicine features.",
    spoc: "Dr. Kavita Sharma",
    spocEmail: "kavita.sharma@gcet.edu.in",
  },
  {
    id: "CP10",
    title: "Farmer Connect Marketplace",
    theme: "Community Innovation",
    organization: "Innovation Council",
    category: "E-Commerce Platform",
    description: "Build a direct farmer-to-consumer marketplace eliminating middlemen for agricultural products.",
    spoc: "Prof. Arun Mishra",
    spocEmail: "arun.mishra@gcet.edu.in",
  },
  {
    id: "CP11",
    title: "Waste Segregation Awareness Game",
    theme: "Community Innovation",
    organization: "Environment Club",
    category: "Gamification",
    description: "Develop an educational game to teach waste segregation and recycling to school children.",
    spoc: "Dr. Meera Reddy",
    spocEmail: "meera.reddy@gcet.edu.in",
  },
  {
    id: "CP12",
    title: "Local Artisan Skill Mapping",
    theme: "Community Innovation",
    organization: "CSR Cell",
    category: "Web Platform",
    description: "Create a platform to map, showcase, and connect local artisans with potential buyers and training programs.",
    spoc: "Prof. Deepak Verma",
    spocEmail: "deepak.verma@gcet.edu.in",
  },
];

export default function Problems() {
  const [activeTheme, setActiveTheme] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProblems = problems.filter((problem) => {
    const matchesTheme = activeTheme === "All" || problem.theme === activeTheme;
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTheme && matchesSearch;
  });

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case "Academic":
        return "bg-primary text-primary-foreground";
      case "Non-Academic":
        return "bg-secondary text-secondary-foreground";
      case "Community Innovation":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const problemCounts = {
    All: problems.length,
    Academic: problems.filter((p) => p.theme === "Academic").length,
    "Non-Academic": problems.filter((p) => p.theme === "Non-Academic").length,
    "Community Innovation": problems.filter((p) => p.theme === "Community Innovation").length,
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-poppins font-bold text-primary-foreground">
            Problem Statements
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Explore real-world challenges across three distinct themes. Choose a problem that resonates with you and build innovative solutions.
          </p>
          <div className="mt-6 flex justify-center gap-8 text-primary-foreground/90">
            <div className="text-center">
              <span className="text-3xl font-bold">{problems.length}</span>
              <p className="text-sm">Total Problems</p>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold">3</span>
              <p className="text-sm">Themes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Cards */}
      <section className="py-12 bg-highlight">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-poppins font-semibold text-foreground text-center mb-8">
            Select a Theme
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const isActive = activeTheme === theme.name;
              return (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(isActive ? "All" : theme.name)}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    isActive
                      ? "border-secondary bg-secondary/5 shadow-lg"
                      : "border-border bg-card hover:border-secondary/50 hover:shadow-md"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg ${theme.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                    {theme.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {theme.description}
                  </p>
                  <span className="text-secondary font-medium text-sm">
                    {problemCounts[theme.name as keyof typeof problemCounts]} Problems
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-6 bg-background border-b border-border sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Theme Pills */}
            <div className="flex flex-wrap gap-2">
              {["All", "Academic", "Non-Academic", "Community Innovation"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => setActiveTheme(theme)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTheme === theme
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {theme} ({problemCounts[theme as keyof typeof problemCounts]})
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by ID, title, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Cards - SIH Style */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredProblems.length}</span> problem statements
            </p>
          </div>

          <div className="space-y-4">
            {filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="bg-card rounded-xl border border-border hover:border-secondary/50 hover:shadow-card transition-all overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Problem ID Section */}
                  <div className={`lg:w-32 p-4 lg:p-6 flex lg:flex-col items-center lg:items-start justify-center ${getThemeColor(problem.theme)}`}>
                    <span className="text-2xl lg:text-3xl font-bold font-poppins">{problem.id}</span>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-4 lg:p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getThemeColor(problem.theme)}`}>
                        {problem.theme}
                      </span>
                      <span className="bg-muted px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">
                        {problem.category}
                      </span>
                    </div>

                    <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                      {problem.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4">
                      {problem.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        <strong className="text-foreground">Organization:</strong> {problem.organization}
                      </span>
                      <span className="text-muted-foreground">
                        <strong className="text-foreground">SPOC:</strong> {problem.spoc}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:w-48 p-4 lg:p-6 flex lg:flex-col items-center justify-center gap-3 border-t lg:border-t-0 lg:border-l border-border bg-highlight/50">
                    <a
                      href={`mailto:${problem.spocEmail}`}
                      className="text-primary hover:text-secondary transition-colors flex items-center gap-1 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      Contact SPOC
                    </a>
                    <Button asChild size="sm" variant="orange">
                      <Link to={`/problems/${problem.id}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProblems.length === 0 && (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No problem statements found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setActiveTheme("All");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-poppins font-bold text-primary-foreground mb-4">
            Ready to Solve a Problem?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Register your team and start working on your innovative solution today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/resources">Download Resources</Link>
            </Button>
            <Button asChild variant="orange" size="lg">
              <Link to="/registration">Register Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
