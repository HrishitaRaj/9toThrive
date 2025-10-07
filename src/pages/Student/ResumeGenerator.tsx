import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileDown, Plus, X } from "lucide-react";
import jsPDF from "jspdf";

const ResumeGenerator = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  const [experiences, setExperiences] = useState([
    { company: "", role: "", duration: "", description: "" },
  ]);

  const [educations, setEducations] = useState([
    { institution: "", degree: "", year: "", gpa: "" },
  ]);

  const [skills, setSkills] = useState("");

  const addExperience = () => {
    setExperiences([...experiences, { company: "", role: "", duration: "", description: "" }]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducations([...educations, { institution: "", degree: "", year: "", gpa: "" }]);
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;

    // Personal Info
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(personalInfo.name || "Your Name", 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${personalInfo.email || "email@example.com"} | ${personalInfo.phone || "+1234567890"} | ${personalInfo.location || "Location"}`,
      20,
      yPosition
    );
    yPosition += 15;

    // Summary
    if (personalInfo.summary) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("PROFESSIONAL SUMMARY", 20, yPosition);
      yPosition += 6;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const summaryLines = doc.splitTextToSize(personalInfo.summary, 170);
      doc.text(summaryLines, 20, yPosition);
      yPosition += summaryLines.length * 5 + 10;
    }

    // Experience
    if (experiences.some((exp) => exp.company || exp.role)) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("WORK EXPERIENCE", 20, yPosition);
      yPosition += 6;

      experiences.forEach((exp) => {
        if (exp.company || exp.role) {
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.text(exp.role || "Position", 20, yPosition);
          yPosition += 5;

          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          doc.text(`${exp.company || "Company"} | ${exp.duration || "Duration"}`, 20, yPosition);
          yPosition += 5;

          if (exp.description) {
            const descLines = doc.splitTextToSize(exp.description, 170);
            doc.text(descLines, 20, yPosition);
            yPosition += descLines.length * 5 + 5;
          }
          yPosition += 3;
        }
      });
      yPosition += 5;
    }

    // Education
    if (educations.some((edu) => edu.institution || edu.degree)) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("EDUCATION", 20, yPosition);
      yPosition += 6;

      educations.forEach((edu) => {
        if (edu.institution || edu.degree) {
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.text(edu.degree || "Degree", 20, yPosition);
          yPosition += 5;

          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          doc.text(
            `${edu.institution || "Institution"} | ${edu.year || "Year"} ${edu.gpa ? `| GPA: ${edu.gpa}` : ""}`,
            20,
            yPosition
          );
          yPosition += 8;
        }
      });
      yPosition += 5;
    }

    // Skills
    if (skills) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("SKILLS", 20, yPosition);
      yPosition += 6;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const skillsLines = doc.splitTextToSize(skills, 170);
      doc.text(skillsLines, 20, yPosition);
    }

    doc.save("ATS-Resume.pdf");
    toast.success("Resume generated successfully!");
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Resume Generator</h1>
        <p className="text-muted-foreground">Create an ATS-friendly resume in universal format</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-primary">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={personalInfo.summary}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                  placeholder="Brief professional summary..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-primary">Work Experience</CardTitle>
                <Button onClick={addExperience} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="space-y-4 p-4 border border-border rounded-lg relative">
                  {experiences.length > 1 && (
                    <Button
                      onClick={() => removeExperience(index)}
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => {
                        const newExps = [...experiences];
                        newExps[index].company = e.target.value;
                        setExperiences(newExps);
                      }}
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                      value={exp.role}
                      onChange={(e) => {
                        const newExps = [...experiences];
                        newExps[index].role = e.target.value;
                        setExperiences(newExps);
                      }}
                      placeholder="Job Title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => {
                        const newExps = [...experiences];
                        newExps[index].duration = e.target.value;
                        setExperiences(newExps);
                      }}
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => {
                        const newExps = [...experiences];
                        newExps[index].description = e.target.value;
                        setExperiences(newExps);
                      }}
                      placeholder="Key responsibilities and achievements..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-2 border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-primary">Education</CardTitle>
                <Button onClick={addEducation} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {educations.map((edu, index) => (
                <div key={index} className="space-y-4 p-4 border border-border rounded-lg relative">
                  {educations.length > 1 && (
                    <Button
                      onClick={() => removeEducation(index)}
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => {
                        const newEdus = [...educations];
                        newEdus[index].institution = e.target.value;
                        setEducations(newEdus);
                      }}
                      placeholder="University Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdus = [...educations];
                        newEdus[index].degree = e.target.value;
                        setEducations(newEdus);
                      }}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      value={edu.year}
                      onChange={(e) => {
                        const newEdus = [...educations];
                        newEdus[index].year = e.target.value;
                        setEducations(newEdus);
                      }}
                      placeholder="2020 - 2024"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GPA (Optional)</Label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) => {
                        const newEdus = [...educations];
                        newEdus[index].gpa = e.target.value;
                        setEducations(newEdus);
                      }}
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-primary">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="skills">List your skills (comma-separated)</Label>
                <Textarea
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="JavaScript, React, Node.js, Python, SQL, Git"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={generatePDF} className="w-full bg-primary hover:bg-primary/90" size="lg">
            <FileDown className="h-5 w-5 mr-2" />
            Generate ATS Resume (PDF)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
