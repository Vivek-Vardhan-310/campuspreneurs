import { Layout } from "@/components/layout/Layout";
import { Mail, Phone, MapPin, User } from "lucide-react";

const coordinators = [
  {
    role: "Head Coordinator",
    name: "Rahul Sharma",
    email: "rahul.sharma@gcet.edu.in",
    phone: "+91 98765 43210",
  },
  {
    role: "Co-Coordinator",
    name: "Priya Verma",
    email: "priya.verma@gcet.edu.in",
    phone: "+91 98765 43211",
  },
  {
    role: "Co-Coordinator",
    name: "Amit Kumar",
    email: "amit.kumar@gcet.edu.in",
    phone: "+91 98765 43212",
  },
  {
    role: "Co-Coordinator",
    name: "Neha Singh",
    email: "neha.singh@gcet.edu.in",
    phone: "+91 98765 43213",
  },
  {
    role: "Co-Coordinator",
    name: "Vikram Joshi",
    email: "vikram.joshi@gcet.edu.in",
    phone: "+91 98765 43214",
  },
  {
    role: "Co-Coordinator",
    name: "Sunita Rao",
    email: "sunita.rao@gcet.edu.in",
    phone: "+91 98765 43215",
  },
];

export default function Contact() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-poppins font-bold text-primary-foreground">
            Contact Us
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Have questions? Reach out to our organizing team for assistance.
          </p>
        </div>
      </section>

      {/* Coordinators Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-poppins font-bold text-foreground">
              Organizing Team
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {coordinators.map((coordinator, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="text-secondary text-sm font-medium">
                      {coordinator.role}
                    </span>
                    <h3 className="font-poppins font-semibold text-lg text-foreground mt-1">
                      {coordinator.name}
                    </h3>
                    <div className="mt-3 space-y-2">
                      <a
                        href={`mailto:${coordinator.email}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        {coordinator.email}
                      </a>
                      <a
                        href={`tel:${coordinator.phone}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        {coordinator.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Contact */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl shadow-card p-8 lg:p-12">
              <h2 className="text-2xl font-poppins font-bold text-foreground text-center mb-8">
                General Enquiries
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <a
                      href="mailto:campuspreneurs@gcet.edu.in"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      campuspreneurs@gcet.edu.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Helpline</h4>
                    <a
                      href="tel:+911234567890"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 12345 67890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Address</h4>
                    <p className="text-muted-foreground">
                      GCET Campus, Knowledge Park II,<br />
                      Greater Noida, Uttar Pradesh 201310,<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
