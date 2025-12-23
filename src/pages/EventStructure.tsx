import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Check, Rocket, Users, Award, Target, Lightbulb, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { toast } from "sonner";

const iconMap: Record<string, React.ElementType> = {
  Target,
  Users,
  Lightbulb,
  Rocket,
  Award,
};

interface Phase {
  id: number;
  name: string;
  title: string;
  icon: string;
  points: string[];
}

interface Framework {
  letter: string;
  word: string;
  description: string;
}

export default function EventStructure() {
  const { isAdmin } = useAdmin();
  const [phases, setPhases] = useState<Phase[]>([]);
  const [framework, setFramework] = useState<Framework[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit states
  const [editPhases, setEditPhases] = useState<Phase[]>([]);
  const [editFramework, setEditFramework] = useState<Framework[]>([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    
    const { data } = await supabase
      .from("page_content")
      .select("*")
      .eq("page_name", "event_structure");

    if (data) {
      const phasesData = data.find((d) => d.section_key === "phases");
      const frameworkData = data.find((d) => d.section_key === "framework");

      if (phasesData) {
        const parsed = typeof phasesData.content === "string" 
          ? JSON.parse(phasesData.content) 
          : phasesData.content;
        setPhases(parsed);
        setEditPhases(parsed);
      }
      if (frameworkData) {
        const parsed = typeof frameworkData.content === "string" 
          ? JSON.parse(frameworkData.content) 
          : frameworkData.content;
        setFramework(parsed);
        setEditFramework(parsed);
      }
    }
    
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await supabase
        .from("page_content")
        .update({ content: JSON.parse(JSON.stringify(editPhases)), updated_at: new Date().toISOString() })
        .eq("page_name", "event_structure")
        .eq("section_key", "phases");

      await supabase
        .from("page_content")
        .update({ content: JSON.parse(JSON.stringify(editFramework)), updated_at: new Date().toISOString() })
        .eq("page_name", "event_structure")
        .eq("section_key", "framework");

      setPhases(editPhases);
      setFramework(editFramework);
      setEditing(false);
      toast.success("Content saved successfully");
    } catch (error) {
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditPhases(phases);
    setEditFramework(framework);
    setEditing(false);
  };

  const updatePhase = (index: number, field: keyof Phase, value: any) => {
    const updated = [...editPhases];
    updated[index] = { ...updated[index], [field]: value };
    setEditPhases(updated);
  };

  const updatePhasePoint = (phaseIndex: number, pointIndex: number, value: string) => {
    const updated = [...editPhases];
    updated[phaseIndex].points[pointIndex] = value;
    setEditPhases(updated);
  };

  const updateFramework = (index: number, field: keyof Framework, value: string) => {
    const updated = [...editFramework];
    updated[index] = { ...updated[index], [field]: value };
    setEditFramework(updated);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  const displayPhases = editing ? editPhases : phases;
  const displayFramework = editing ? editFramework : framework;

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
          {isAdmin && (
            <div className="mt-6 flex justify-center gap-2">
              {editing ? (
                <>
                  <Button onClick={handleSave} disabled={saving} variant="heroOutline">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button onClick={handleCancel} variant="ghost" className="text-primary-foreground">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditing(true)} variant="heroOutline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Content
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Phases */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {displayPhases.map((phase, index) => {
              const Icon = iconMap[phase.icon] || Target;
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
                      {editing ? (
                        <Input
                          value={phase.title}
                          onChange={(e) => updatePhase(index, "title", e.target.value)}
                          className="mt-2 text-center bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground"
                        />
                      ) : (
                        <h3 className="mt-2 font-poppins font-bold text-2xl text-primary-foreground">
                          {phase.title}
                        </h3>
                      )}
                    </div>

                    {/* Right Panel */}
                    <div className="p-8">
                      <ul className="grid sm:grid-cols-2 gap-4">
                        {phase.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-secondary" />
                            </div>
                            {editing ? (
                              <Input
                                value={point}
                                onChange={(e) => updatePhasePoint(index, pointIndex, e.target.value)}
                                className="flex-1"
                              />
                            ) : (
                              <span className="text-foreground">{point}</span>
                            )}
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
            {displayFramework.map((item, index) => (
              <div
                key={item.word}
                className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-4">
                  <span className="text-primary-foreground font-poppins font-bold text-2xl">
                    {index + 1}{item.letter}
                  </span>
                </div>
                {editing ? (
                  <>
                    <Input
                      value={item.word}
                      onChange={(e) => updateFramework(index, "word", e.target.value)}
                      className="text-center mb-2"
                    />
                    <Textarea
                      value={item.description}
                      onChange={(e) => updateFramework(index, "description", e.target.value)}
                      rows={2}
                      className="text-center text-sm"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="font-poppins font-semibold text-lg text-foreground">
                      {item.word}
                    </h3>
                    <p className="mt-2 text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
