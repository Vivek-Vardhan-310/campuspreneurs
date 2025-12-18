import { Layout } from "@/components/layout/Layout";
import { Check, Rocket, Users, Award, Target, Lightbulb } from "lucide-react";

const phases = [
  {
    id: 0,
    name: "Phase 0",
    title: "Problem Discovery",
    icon: Target,
    points: [
      "Observe and identify real campus challenges",
      "Document problem areas with evidence",
      "Validate problem significance through surveys",
      "Select problem statement for submission",
      "Form initial understanding of stakeholders",
    ],
  },
  {
    id: 1,
    name: "Phase 1",
    title: "Team Formation & Registration",
    icon: Users,
    points: [
      "Form cross-functional teams (3-5 members)",
      "Assign roles and responsibilities",
      "Complete online registration",
      "Submit initial problem selection",
      "Receive confirmation and guidelines",
      "Access to mentorship resources",
    ],
  },
  {
    id: 2,
    name: "Phase 2",
    title: "Solution Ideation",
    icon: Lightbulb,
    points: [
      "Brainstorm multiple solution approaches",
      "Conduct feasibility analysis",
      "Validate ideas with potential users",
      "Refine solution based on feedback",
      "Prepare initial solution proposal",
    ],
  },
  {
    id: 3,
    name: "Phase 3",
    title: "Prototype Development",
    icon: Rocket,
    points: [
      "Build minimum viable prototype",
      "Document development process",
      "Test prototype with target users",
      "Iterate based on testing feedback",
      "Prepare comprehensive documentation",
      "Create presentation materials",
    ],
  },
  {
    id: 4,
    name: "Phase 4",
    title: "Final Pitch & Evaluation",
    icon: Award,
    points: [
      "Present solution to jury panel",
      "Demonstrate working prototype",
      "Answer evaluator questions",
      "Receive feedback and scores",
      "Award ceremony and recognition",
      "Opportunity for incubation support",
    ],
  },
];

const framework5D = [
  { letter: "D", word: "Discover", description: "Identify and understand the problem" },
  { letter: "D", word: "Define", description: "Clearly articulate the challenge" },
  { letter: "D", word: "Design", description: "Ideate and plan the solution" },
  { letter: "D", word: "Develop", description: "Build and test the prototype" },
  { letter: "D", word: "Deliver", description: "Present and implement the solution" },
];

export default function EventStructure() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-poppins font-bold text-primary-foreground">
            Event Structure
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            A comprehensive journey from problem identification to prototype presentation.
          </p>
        </div>
      </section>

      {/* Phases */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.id}
                  className="bg-card rounded-2xl shadow-card overflow-hidden"
                >
                  <div className="grid lg:grid-cols-[300px_1fr]">
                    {/* Left Panel */}
                    <div className="bg-primary p-8 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <span className="text-secondary font-medium text-sm">
                        {phase.name}
                      </span>
                      <h3 className="mt-2 font-poppins font-bold text-2xl text-primary-foreground">
                        {phase.title}
                      </h3>
                    </div>

                    {/* Right Panel */}
                    <div className="p-8">
                      <ul className="grid sm:grid-cols-2 gap-4">
                        {phase.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-secondary" />
                            </div>
                            <span className="text-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5D Framework */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Methodology
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-poppins font-bold text-foreground">
              The 5D Framework
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {framework5D.map((item, index) => (
              <div
                key={item.word}
                className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-4">
                  <span className="text-primary-foreground font-poppins font-bold text-2xl">
                    {index + 1}{item.letter}
                  </span>
                </div>
                <h3 className="font-poppins font-semibold text-lg text-foreground">
                  {item.word}
                </h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
