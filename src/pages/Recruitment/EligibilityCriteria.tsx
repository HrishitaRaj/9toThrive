import { PageHeader } from "@/components/layout/PageHeaderRec";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Plus, X, CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EligibilityCriteria() {
  const [skills, setSkills] = useState<string[]>(["JavaScript", "Python", "SQL"]);
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

  const savedCriteria = [
    {
      role: "Senior Frontend Developer",
      minCGPA: "7.5",
      maxBacklogs: "0",
      branches: ["Computer Science", "IT"],
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      role: "Data Scientist",
      minCGPA: "8.0",
      maxBacklogs: "0",
      branches: ["Computer Science", "Data Science"],
      skills: ["Python", "ML", "TensorFlow"],
    },
    {
      role: "UI/UX Designer",
      minCGPA: "7.0",
      maxBacklogs: "1",
      branches: ["Design", "Computer Science"],
      skills: ["Figma", "Sketch", "Prototyping"],
    },
  ];

  return (
    <div>
      <PageHeader
        title="Eligibility Criteria"
        description="Set specific eligibility requirements and skills for candidate filtering"
        actions={
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Criteria
          </Button>
        }
      />

      <Card className="p-6 bg-gradient-card shadow-card border-border mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Define Eligibility Requirements
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="jobRole">Job Role</Label>
              <Input 
                id="jobRole" 
                placeholder="e.g., Software Developer"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="minCGPA">Minimum CGPA</Label>
              <Input 
                id="minCGPA" 
                type="number" 
                step="0.1"
                placeholder="e.g., 7.5"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="maxBacklogs">Maximum Active Backlogs</Label>
              <Input 
                id="maxBacklogs" 
                type="number"
                placeholder="e.g., 0"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="gradYear">Graduation Year</Label>
              <Select>
                <SelectTrigger id="gradYear" className="mt-2">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                  <SelectItem value="2028">2028</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-3 block">Eligible Branches</Label>
              <div className="space-y-2">
                {["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"].map((branch) => (
                  <div key={branch} className="flex items-center gap-2">
                    <Checkbox id={branch} />
                    <label htmlFor={branch} className="text-sm text-foreground cursor-pointer">
                      {branch}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Required Skills</Label>
              <div className="flex gap-2 mt-2">
                <Input 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  placeholder="Add a skill"
                  className="bg-input border-border"
                />
                <Button onClick={addSkill} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[120px] p-4 bg-muted rounded-lg">
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

            <div>
              <Label htmlFor="minExp">Preferred Experience (Months)</Label>
              <Input 
                id="minExp" 
                type="number"
                placeholder="e.g., 6 (for internships)"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Checkbox id="portfolio" />
              <label htmlFor="portfolio" className="text-sm text-foreground cursor-pointer">
                Portfolio/GitHub Required
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="workAuth" />
              <label htmlFor="workAuth" className="text-sm text-foreground cursor-pointer">
                Work Authorization Required
              </label>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card shadow-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Saved Eligibility Criteria
        </h3>

        <div className="space-y-4">
          {savedCriteria.map((criteria, index) => (
            <div 
              key={index}
              className="p-4 bg-muted rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    {criteria.role}
                    <CheckCircle className="w-4 h-4 text-success" />
                  </h4>
                </div>
                <Button size="sm" variant="ghost">
                  Edit
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Min CGPA</p>
                  <p className="font-medium text-foreground">{criteria.minCGPA}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Max Backlogs</p>
                  <p className="font-medium text-foreground">{criteria.maxBacklogs}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground mb-1">Branches</p>
                  <div className="flex flex-wrap gap-1">
                    {criteria.branches.map((branch) => (
                      <Badge key={branch} variant="outline" className="text-xs">
                        {branch}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-muted-foreground text-sm mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {criteria.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
