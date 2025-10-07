import { PageHeader } from "@/components/layout/PageHeaderRec";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, Plus, X, Sparkles } from "lucide-react";
import { useState } from "react";

export default function MatchCalculator() {
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Python"]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div>
      <PageHeader
        title="Match Fit Calculator"
        description="Configure key skills and criteria to calculate candidate match scores"
        actions={
          <Button>
            <Sparkles className="w-4 h-4 mr-2" />
            Calculate Matches
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Company & Role Details
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input 
                id="company" 
                placeholder="e.g., TechCorp Solutions"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="role">Job Role</Label>
              <Input 
                id="role" 
                placeholder="e.g., Full Stack Developer"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="experience">Required Experience (Years)</Label>
              <Input 
                id="experience" 
                type="number" 
                placeholder="e.g., 2"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="e.g., Bangalore, Remote"
                className="mt-2 bg-input border-border"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Key Skills Required
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Add a skill (e.g., React, Python)"
                className="bg-input border-border"
              />
              <Button onClick={addSkill} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-muted rounded-lg">
              {skills.length === 0 ? (
                <p className="text-sm text-muted-foreground">No skills added yet</p>
              ) : (
                skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="px-3 py-1 flex items-center gap-2"
                  >
                    {skill}
                    <button 
                      onClick={() => removeSkill(skill)}
                      className="hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm text-foreground">
              <strong>Match Calculation:</strong> The system will analyze candidate profiles 
              against these skills and automatically compute a match fit percentage based on 
              skill alignment, experience, and project relevance.
            </p>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6 bg-gradient-card shadow-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Weighting Preferences (Optional)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="skillWeight">Skill Match Weight</Label>
            <Input 
              id="skillWeight" 
              type="number" 
              placeholder="50"
              className="mt-2 bg-input border-border"
            />
          </div>

          <div>
            <Label htmlFor="expWeight">Experience Weight</Label>
            <Input 
              id="expWeight" 
              type="number" 
              placeholder="30"
              className="mt-2 bg-input border-border"
            />
          </div>

          <div>
            <Label htmlFor="projectWeight">Project Quality Weight</Label>
            <Input 
              id="projectWeight" 
              type="number" 
              placeholder="20"
              className="mt-2 bg-input border-border"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
