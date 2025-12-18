import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Registration() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    member1Name: "",
    member1Roll: "",
    member2Name: "",
    member2Roll: "",
    member3Name: "",
    member3Roll: "",
    year: "",
    department: "",
    phone: "",
    email: "",
    problemId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Registration Successful!",
      description: "Your team has been registered for Campuspreneurs Chapter 1.",
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-poppins font-bold text-foreground">
                Registration Complete!
              </h1>
              <p className="mt-4 text-muted-foreground">
                Thank you for registering for Campuspreneurs Chapter 1. You will receive a confirmation email shortly with further instructions.
              </p>
              <Button
                variant="default"
                size="lg"
                className="mt-8"
                onClick={() => setIsSubmitted(false)}
              >
                Register Another Team
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-poppins font-bold text-primary-foreground">
            Team Registration
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Register your team for Campuspreneurs Chapter 1. Fill in all the required details below.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl shadow-card p-8 space-y-8">
              {/* Team Info */}
              <div>
                <h3 className="font-poppins font-semibold text-lg text-foreground border-b border-border pb-3 mb-6">
                  Team Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      required
                      value={formData.teamName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter your team name"
                    />
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h3 className="font-poppins font-semibold text-lg text-foreground border-b border-border pb-3 mb-6">
                  Team Members (Minimum 3)
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Member {num} Name *
                        </label>
                        <input
                          type="text"
                          name={`member${num}Name`}
                          required
                          value={formData[`member${num}Name` as keyof typeof formData]}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Roll Number *
                        </label>
                        <input
                          type="text"
                          name={`member${num}Roll`}
                          required
                          value={formData[`member${num}Roll` as keyof typeof formData]}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Roll number"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Info */}
              <div>
                <h3 className="font-poppins font-semibold text-lg text-foreground border-b border-border pb-3 mb-6">
                  Academic Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Year *
                    </label>
                    <select
                      name="year"
                      required
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Department *
                    </label>
                    <select
                      name="department"
                      required
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select Department</option>
                      <option value="AIML">AIML</option>
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="MECH">MECH</option>
                      <option value="CIVIL">CIVIL</option>
                      <option value="MBA">MBA</option>
                      <option value="PHARMACY">PHARMACY</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-poppins font-semibold text-lg text-foreground border-b border-border pb-3 mb-6">
                  Contact Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Team contact email"
                    />
                  </div>
                </div>
              </div>

              {/* Problem Selection */}
              <div>
                <h3 className="font-poppins font-semibold text-lg text-foreground border-b border-border pb-3 mb-6">
                  Problem Selection
                </h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Problem ID *
                  </label>
                  <input
                    type="text"
                    name="problemId"
                    required
                    value={formData.problemId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter problem ID (e.g., PS001)"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <h3 className="font-poppins font-semibold text-lg text-foreground border-b border-border pb-3 mb-6">
                  Upload Documents
                </h3>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop your files here, or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Accepted formats: PDF, PPT, PPTX (Max 10MB)
                  </p>
                  <input type="file" className="hidden" accept=".pdf,.ppt,.pptx" />
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" variant="orange" size="xl" className="w-full">
                Submit Registration
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
