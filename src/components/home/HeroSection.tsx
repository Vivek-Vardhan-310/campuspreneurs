import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-block">
              <span className="bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-medium">
                Chapter 1 — Innovation Begins Here
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary-foreground leading-tight animate-fade-in-up">
              Campuspreneurs
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-light animate-fade-in-up animation-delay-100">
              Turning Campus Challenges into Countable Change
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-200">
              <Button asChild variant="orange" size="xl">
                <Link to="/problems">
                  <FileText className="w-5 h-5" />
                  View Problems
                </Link>
              </Button>
              <Button asChild variant="orangeOutline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/registration">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right - 3D Rotating Advertisement */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 perspective-1000">
              <div className="absolute inset-0 animate-rotate-3d preserve-3d">
                <div className="absolute inset-0 bg-card rounded-2xl shadow-elevated flex flex-col items-center justify-center p-8 backface-hidden">
                  <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h3 className="font-poppins font-semibold text-xl text-foreground text-center mb-2">
                    Innovation Challenge
                  </h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Transform real campus problems into innovative solutions
                  </p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary rounded-xl shadow-card flex items-center justify-center animate-float">
                <span className="text-2xl">💡</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-card rounded-xl shadow-card flex items-center justify-center animate-float animation-delay-200">
                <span className="text-xl">🎯</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
}
