import { Layout } from "@/components/layout/Layout";
import { FileText, Download, HelpCircle, Calendar, BookOpen, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    title: "PPT Template",
    description: "Official presentation template with guidelines for your final pitch.",
    icon: FileText,
    type: "PPTX",
  },
  {
    title: "Evaluation Rubrics",
    description: "Detailed scoring criteria used by the jury for assessment.",
    icon: FileSpreadsheet,
    type: "PDF",
  },
  {
    title: "Rules & Guidelines",
    description: "Complete rulebook covering eligibility, conduct, and submission rules.",
    icon: BookOpen,
    type: "PDF",
  },
  {
    title: "Timeline PDF",
    description: "Detailed schedule with important dates and deadlines.",
    icon: Calendar,
    type: "PDF",
  },
];

const faqs = [
  {
    question: "Who can participate in Campuspreneurs?",
    answer: "Any student currently enrolled in GCET across all departments can participate. Teams must have 3-5 members.",
  },
  {
    question: "Can we form cross-department teams?",
    answer: "Yes! Cross-functional teams from different departments are encouraged as they bring diverse perspectives.",
  },
  {
    question: "What is the registration fee?",
    answer: "Participation is free of cost. There are no registration fees for Campuspreneurs Chapter 1.",
  },
  {
    question: "Can we change our problem statement after registration?",
    answer: "Problem statement changes are allowed until Phase 1 deadline. Contact the organizers for assistance.",
  },
  {
    question: "What kind of prototypes are expected?",
    answer: "Prototypes can be hardware, software, or hybrid. The focus is on demonstrating your solution's feasibility.",
  },
  {
    question: "Will mentorship be provided?",
    answer: "Yes, registered teams get access to faculty mentors and industry experts throughout the event.",
  },
];

export default function Resources() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-poppins font-bold text-primary-foreground">
            Resources
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Download templates, guidelines, and everything you need for your submission.
          </p>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-poppins font-bold text-foreground">
              Downloads
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <div
                  key={resource.title}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 flex flex-col"
                >
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-foreground">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm flex-1">
                    {resource.description}
                  </p>
                  <Button variant="outline" className="mt-4 w-full" size="sm">
                    <Download className="w-4 h-4" />
                    Download {resource.type}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="mt-3 text-2xl lg:text-3xl font-poppins font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
