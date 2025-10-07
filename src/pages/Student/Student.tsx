import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  FileText, Upload, TrendingUp, Briefcase, Target, Award, 
  Brain, CheckCircle2, AlertCircle, Star, ArrowRight, 
  BarChart3, Calendar, Zap, Eye, Download, Settings,
  Sparkles, TrendingDown, MapPin, X, Plus, Lightbulb, Menu
} from "lucide-react";

const Dashboard = () => {
  const [resumeScore] = useState(78);
  const [profileCompletion] = useState(65);
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([
    "Software Development Intern",
    "Full Stack Developer",
    "Machine Learning Engineer"
  ]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Python", "JavaScript", "React.js", "Machine Learning",
    "TensorFlow", "SQL", "Git", "Next.js", "Data Visualization",
    "NLP", "Web Development", "Open-Source Contribution"
  ]);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const recommendedJobTitles = ["Software Engineer", "Data Scientist", "Backend Developer", "DevOps Engineer"];
  const recommendedSkills = ["Java", "C++", "Object-Oriented Programming (OOP)", "REST APIs", "HTML5", "Unit Testing"];

  const applications = [
    { company: "Tech Corp", role: "Frontend Developer", status: "Interview", date: "2 days ago", match: 92, location: "Bengaluru", type: "Fulltime", level: "Entry Level", salary: "4-8 Lacs", experience: "1 Years" },
    { company: "Innovate Labs", role: "Full Stack Developer", status: "Applied", date: "5 days ago", match: 85, location: "Bengaluru", type: "Fulltime", level: "Mid Level", salary: "8-12 Lacs", experience: "2 Years" },
    { company: "Digital Solutions", role: "React Developer", status: "Rejected", date: "1 week ago", match: 78, location: "Remote", type: "Contract", level: "Entry Level", salary: "5-10 Lacs", experience: "1 Years" },
    { company: "Cloud Systems", role: "Software Engineer", status: "Shortlisted", date: "3 days ago", match: 88, location: "Bengaluru", type: "Onsite", level: "Entry Level", salary: "6-10 Lacs", experience: "1 Years" },
  ];

  const aiInsights = {
    strengths: [
      { title: "Technical Foundation", description: "Strong programming skills in Python, JavaScript, and React", score: 85 },
      { title: "Project Portfolio", description: "3 well-documented GitHub projects with real-world applications", score: 78 },
      { title: "Learning Agility", description: "Consistently adding new skills and completing certifications", score: 82 },
    ],
    weaknesses: [
      { title: "Interview Readiness", description: "Practice more behavioral and technical interview questions", impact: "High", action: "Start mock interviews" },
      { title: "ATS Optimization", description: "Resume lacks key industry keywords for better ATS scoring", impact: "High", action: "Optimize resume" },
      { title: "Soft Skills Documentation", description: "Limited evidence of leadership and teamwork in profile", impact: "Medium", action: "Add team projects" },
    ],
    improvements: [
      { title: "Master System Design", priority: "High", reason: "90% of target companies require system design skills", impact: "+40% job matches" },
      { title: "Get Cloud Certified", priority: "High", reason: "AWS/Azure certification highly valued in current applications", impact: "+35% interview callbacks" },
      { title: "Contribute to Open Source", priority: "Medium", reason: "Demonstrates collaboration and code quality", impact: "+25% profile visibility" },
      { title: "Build Full-Stack Projects", priority: "Medium", reason: "Shows end-to-end development capability", impact: "+30% employer interest" },
    ]
  };

  const discoverContent = [
    { category: "Guidance", title: "10 Best Ways to Introduce Yourself in an Interview", action: "read more" },
    { category: "Career", title: "The Big Four Battle for Talent: How PwC, Deloitte, EY & KPMG are Competing", action: "read more" },
    { category: "Value Addition", title: "What You Can Earn as an AI Data Scientist in India", action: "read more" },
    { category: "Value Addition", title: "How Trump's 50% Tariff Directly Impacts You and Your Job", action: "read more" },
  ];

  const addJobTitle = () => {
    if (newJobTitle && selectedJobTitles.length < 3 && !selectedJobTitles.includes(newJobTitle)) {
      setSelectedJobTitles([...selectedJobTitles, newJobTitle]);
      setNewJobTitle("");
    }
  };

  const removeJobTitle = (title: string) => {
    setSelectedJobTitles(selectedJobTitles.filter(t => t !== title));
  };

  const addSkill = () => {
    if (newSkill && selectedSkills.length < 18 && !selectedSkills.includes(newSkill)) {
      setSelectedSkills([...selectedSkills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const addRecommendedJobTitle = (title: string) => {
    if (selectedJobTitles.length < 3 && !selectedJobTitles.includes(title)) {
      setSelectedJobTitles([...selectedJobTitles, title]);
    }
  };

  const addRecommendedSkill = (skill: string) => {
    if (selectedSkills.length < 18 && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Interview: "bg-accent/20 text-accent border-accent/50",
      Applied: "bg-primary/20 text-primary border-primary/50",
      Rejected: "bg-destructive/20 text-destructive border-destructive/50",
      Shortlisted: "bg-success/20 text-success border-success/50",
    };
    return variants[status] || "bg-muted";
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Top Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2 border-border hover:shadow-lg transition-all bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Profile Score</p>
                  <p className="text-3xl font-bold text-foreground">{profileCompletion}%</p>
                  <Progress value={profileCompletion} className="h-2 mt-2" />
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:shadow-lg transition-all bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">ATS Score</p>
                  <p className={`text-3xl font-bold ${getScoreColor(resumeScore)}`}>{resumeScore}%</p>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-xs text-success">+5% this week</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:shadow-lg transition-all bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-3xl font-bold text-foreground">24</p>
                  <p className="text-xs text-muted-foreground mt-2">4 active interviews</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:shadow-lg transition-all bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Job Matches</p>
                  <p className="text-3xl font-bold text-foreground">47</p>
                  <p className="text-xs text-muted-foreground mt-2">New opportunities</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Job Preferences & Skills */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Titles */}
            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Job Titles
                  <Badge variant="secondary" className="ml-2">max 3 job titles</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {selectedJobTitles.map((title) => (
                    <Badge key={title} className="px-4 py-2 bg-success text-success-foreground hover:bg-success/80 cursor-pointer">
                      {title}
                      <X className="ml-2 h-4 w-4" onClick={() => removeJobTitle(title)} />
                    </Badge>
                  ))}
                </div>
                {selectedJobTitles.length < 3 && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter a job title"
                      value={newJobTitle}
                      onChange={(e) => setNewJobTitle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addJobTitle()}
                      className="bg-input border-border text-foreground"
                    />
                    <Button onClick={addJobTitle} size="icon" className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Skills */}
            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Top Skills
                  <Badge variant="secondary" className="ml-2">max 18 skills</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {selectedSkills.map((skill) => (
                    <Badge key={skill} className="px-4 py-2 bg-success text-success-foreground hover:bg-success/80 cursor-pointer">
                      {skill}
                      <X className="ml-2 h-4 w-4" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                </div>
                {selectedSkills.length < 18 && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                      className="bg-input border-border text-foreground"
                    />
                    <Button onClick={addSkill} size="icon" className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="border-2 border-success/30 bg-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-success" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Select recommended Job Titles</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendedJobTitles.map((title) => (
                      <Button
                        key={title}
                        variant="outline"
                        size="sm"
                        onClick={() => addRecommendedJobTitle(title)}
                        disabled={selectedJobTitles.includes(title) || selectedJobTitles.length >= 3}
                        className="border-success/50 text-muted-foreground hover:bg-success/10 hover:text-foreground"
                      >
                        {title}
                        <Plus className="ml-2 h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Select recommended Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendedSkills.map((skill) => (
                      <Button
                        key={skill}
                        variant="outline"
                        size="sm"
                        onClick={() => addRecommendedSkill(skill)}
                        disabled={selectedSkills.includes(skill) || selectedSkills.length >= 18}
                        className="border-success/50 text-muted-foreground hover:bg-success/10 hover:text-foreground"
                      >
                        {skill}
                        <Plus className="ml-2 h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Applications */}
            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Jobs for You</CardTitle>
                  <Button variant="outline" size="sm" className="text-foreground">Most Relevant</Button>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="ghost" size="sm" className="text-foreground">Your Preferences</Button>
                  <Button variant="ghost" size="sm" className="text-foreground">Your Priority</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.map((app, index) => (
                  <div key={index} className="border-2 border-border rounded-lg p-6 hover:border-primary/50 transition-all bg-card/50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{app.location}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{app.role}</h3>
                        <p className="text-sm text-muted-foreground">{app.company}</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative h-20 w-20">
                          <svg className="transform -rotate-90" width="80" height="80">
                            <circle cx="40" cy="40" r="36" stroke="hsl(var(--border))" strokeWidth="6" fill="none" />
                            <circle 
                              cx="40" 
                              cy="40" 
                              r="36" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth="6" 
                              fill="none" 
                              strokeDasharray={`${app.match * 2.26} 226`}
                              className="transition-all"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-xl font-bold text-foreground">{app.match}%</span>
                          </div>
                        </div>
                        <span className="text-xs text-success font-semibold">Great Match</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {app.type}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BarChart3 className="h-4 w-4" />
                        {app.salary}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        {app.level}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Award className="h-4 w-4" />
                        {app.experience}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={`${getStatusBadge(app.status)} border`}>{app.status}</Badge>
                      <Button className="bg-success hover:bg-success/90 text-success-foreground">Apply Now</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Insights & Discover */}
          <div className="space-y-8">
            {/* AI Insights Card */}
            <Card className="border-2 border-primary/30 bg-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Strengths */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <h4 className="font-semibold text-foreground">Strengths</h4>
                  </div>
                  {aiInsights.strengths.map((strength, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-success/10 border border-success/20">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm text-foreground">{strength.title}</p>
                        <span className="text-xs font-bold text-success">{strength.score}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{strength.description}</p>
                    </div>
                  ))}
                </div>

                {/* Weaknesses */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <h4 className="font-semibold text-foreground">Weaknesses</h4>
                  </div>
                  {aiInsights.weaknesses.map((weakness, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm text-foreground">{weakness.title}</p>
                        <Badge variant={weakness.impact === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                          {weakness.impact}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{weakness.description}</p>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-primary">
                        {weakness.action} <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Areas of Improvement */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">Areas of Improvement</h4>
                  </div>
                  {aiInsights.improvements.map((improvement, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm text-foreground">{improvement.title}</p>
                        <Badge className={improvement.priority === 'High' ? 'bg-destructive' : 'bg-warning'}>
                          {improvement.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{improvement.reason}</p>
                      <p className="text-xs text-success font-semibold">{improvement.impact}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Discover Section */}
            <Card className="border-2 border-border bg-card">
              <CardHeader className="bg-success/10">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-success" />
                  DISCOVER
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {discoverContent.map((item, idx) => (
                  <div key={idx} className="p-4 border-b border-border last:border-b-0 hover:bg-success/5 transition-all">
                    <Badge className="bg-success/20 text-success border-success/40 mb-2 text-xs">
                      {item.category}
                    </Badge>
                    <p className="text-sm text-foreground mb-2">{item.title}</p>
                    <Button variant="link" className="text-success p-0 h-auto text-xs">
                      {item.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20"
                  onClick={() => window.location.href = '/ats-checker'}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Check ATS Score
                </Button>
                <Button 
                  className="w-full justify-start bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20"
                  onClick={() => window.location.href = '/settings'}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Update Preferences
                </Button>
                <Button 
                  className="w-full justify-start bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
