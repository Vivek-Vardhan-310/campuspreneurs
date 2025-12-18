import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Filter, ArrowRight, Mail } from "lucide-react";

const categories = ["All", "Technology", "Sustainability", "Education", "Infrastructure", "Health"];

const problems = [
  {
    id: 1,
    title: "Smart Waste Management System",
    category: "Sustainability",
    theme: "Green Campus",
    spoc: "Dr. Amit Sharma",
    spocEmail: "amit.sharma@gcet.edu.in",
    description: "Design an IoT-based waste segregation and monitoring system for efficient campus waste management.",
    solutionType: "Hardware + Software",
  },
  {
    id: 2,
    title: "Digital Attendance Tracking",
    category: "Technology",
    theme: "Smart Campus",
    spoc: "Prof. Priya Verma",
    spocEmail: "priya.verma@gcet.edu.in",
    description: "Develop a seamless attendance system using facial recognition or RFID technology.",
    solutionType: "Software",
  },
  {
    id: 3,
    title: "Mental Health Support Platform",
    category: "Health",
    theme: "Student Wellness",
    spoc: "Dr. Neha Singh",
    spocEmail: "neha.singh@gcet.edu.in",
    description: "Create an anonymous mental health support platform for students with AI-powered assistance.",
    solutionType: "App/Web Platform",
  },
  {
    id: 4,
    title: "Energy Consumption Optimizer",
    category: "Sustainability",
    theme: "Green Campus",
    spoc: "Prof. Rahul Gupta",
    spocEmail: "rahul.gupta@gcet.edu.in",
    description: "Build a system to monitor and optimize energy usage across campus buildings.",
    solutionType: "IoT + Dashboard",
  },
  {
    id: 5,
    title: "Library Resource Finder",
    category: "Education",
    theme: "Academic Support",
    spoc: "Dr. Sunita Rao",
    spocEmail: "sunita.rao@gcet.edu.in",
    description: "Develop an intelligent system to locate and reserve library resources efficiently.",
    solutionType: "Mobile App",
  },
  {
    id: 6,
    title: "Campus Navigation Assistant",
    category: "Infrastructure",
    theme: "Smart Campus",
    spoc: "Prof. Vikram Joshi",
    spocEmail: "vikram.joshi@gcet.edu.in",
    description: "Create an AR-based indoor navigation system for new students and visitors.",
    solutionType: "AR Application",
  },
];

export default function Problems() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProblems = problems.filter((problem) => {
    const matchesCategory = activeCategory === "All" || problem.category === activeCategory;
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-poppins font-bold text-primary-foreground">
            Problem Statements
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Explore real campus challenges waiting for innovative solutions. Choose your problem and make an impact.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-background border-b border-border sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Cards */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="bg-card rounded-xl shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium">
                      {problem.category}
                    </span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {problem.theme}
                    </span>
                  </div>

                  <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                    {problem.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {problem.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">SPOC: {problem.spoc}</span>
                    <span className="bg-muted px-2 py-1 rounded text-xs font-medium">
                      {problem.solutionType}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border p-4 flex items-center justify-between">
                  <a
                    href={`mailto:${problem.spocEmail}`}
                    className="text-primary hover:text-secondary transition-colors flex items-center gap-1 text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Contact SPOC
                  </a>
                  <Button asChild size="sm" variant="ghost">
                    <Link to={`/problems/${problem.id}`}>
                      View More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredProblems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No problems found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
