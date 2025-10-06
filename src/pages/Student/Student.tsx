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
  const [mobileOpen, setMobileOpen] = useState(false);

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
    // Use main text color for prominent scores per design request
    if (score >= 80) return "text-[#e25c28ff]";
    if (score >= 60) return "text-[#e25c28ff]";
    return "text-[#e25c28ff]";
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Interview: "bg-[#011627ff] text-[#e25c28ff] border-[#e25c28ff]/50",
      Applied: "bg-[#011627ff] text-[#e25c28ff] border-[#e25c28ff]/50",
      Rejected: "bg-[#011627ff] text-[#e25c28ff] border-[#e25c28ff]/50",
      Shortlisted: "bg-[#011627ff] text-[#e25c28ff] border-[#e25c28ff]/50",
    };
    return variants[status] || "bg-muted";
  };

  return (
    <div className="min-h-screen bg-[#011627ff]">
      {/* Elegant Navbar */}
      <header className="sticky top-4 z-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[#011627ff]/60 backdrop-blur-md border border-[#073138]/40 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-[#011627ff] border border-[#e25c28ff]/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <circle cx="12" cy="12" r="9" fill="#011627ff" stroke="#e25c28ff" strokeWidth="1.5" />
                      <circle cx="18" cy="6" r="2" fill="#e25c28ff" />
                    </svg>
                  </div>
                  <nav className="hidden sm:flex items-center gap-3">
                    <a href="#ats-checker" className="px-4 py-2 rounded-md text-sm text-white hover:bg-[#022632] transition">ATS Checker</a>
                    <a href="#jobs-for-you" className="px-4 py-2 rounded-md text-sm text-white hover:bg-[#022632] transition">Jobs for You</a>
                    <a href="#ai-recommendations" className="px-4 py-2 rounded-md text-sm text-white hover:bg-[#022632] transition">AI Recommendations</a>
                  </nav>
                </div>
              </div>

              <nav className="hidden sm:flex items-center gap-3">
                <a href="#ats-checker" className="px-4 py-2 rounded-md text-sm text-white hover:bg-[#022632] transition">ATS Checker</a>
                <a href="#jobs-for-you" className="px-4 py-2 rounded-md text-sm text-white hover:bg-[#022632] transition">Jobs for You</a>
                <a href="#ai-recommendations" className="px-4 py-2 rounded-md text-sm text-white hover:bg-[#022632] transition">AI Recommendations</a>
              </nav>

              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-white border border-transparent hover:bg-[#022632]/60">
                  <Settings className="h-5 w-5 text-white" />
                </Button>
                {/* removed avatar per request */}
              </div>

              {/* mobile menu button */}
              <div className="sm:hidden">
                <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" className="p-2 rounded-md bg-transparent border border-transparent text-white">
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="sm:hidden fixed inset-x-4 top-20 z-50 rounded-lg bg-[#011627ff]/95 border border-[#073138]/30 p-4 shadow-lg">
          <nav className="flex flex-col gap-2">
            <a onClick={() => setMobileOpen(false)} href="#ats-checker" className="block px-3 py-2 rounded text-white">ATS Checker</a>
            <a onClick={() => setMobileOpen(false)} href="#jobs-for-you" className="block px-3 py-2 rounded text-white">Jobs for You</a>
            <a onClick={() => setMobileOpen(false)} href="#ai-recommendations" className="block px-3 py-2 rounded text-white">AI Recommendations</a>
          </nav>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Top Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2 border-border hover:shadow-lg transition-all bg-[#011627ff]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-[#f1f7edff]">Profile Score</p>
                  <p className="text-3xl font-bold text-[#e25c28ff]">{profileCompletion}%</p>
                  <Progress value={profileCompletion} className="h-2 mt-2" />
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:shadow-lg transition-all bg-[#011627ff]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-[#f1f7edff]">ATS Score</p>
                  <p className={`text-3xl font-bold ${getScoreColor(resumeScore)}`}>{resumeScore}%</p>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="h-4 w-4 text-[#e25c28ff]" />
                    <span className="text-xs text-[#f1f7edff]">+5% this week</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-xl bg-[#011627ff] flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#e25c28ff]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:shadow-lg transition-all bg-[#011627ff]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-[#f1f7edff]">Applications</p>
                  <p className="text-3xl font-bold text-[#e25c28ff]">24</p>
                  <p className="text-xs text-[#f1f7edff] mt-2">4 active interviews</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-[#011627ff] flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-[#e25c28ff]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:shadow-lg transition-all bg-[#011627ff]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-[#f1f7edff]">Job Matches</p>
                  <p className="text-3xl font-bold text-[#e25c28ff]">47</p>
                  <p className="text-xs text-[#f1f7edff] mt-2">New opportunities</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-[#011627ff] flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-[#e25c28ff]" />
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
            <Card className="border-2 border-border bg-[#011627ff]">
              <CardHeader>
                <CardTitle className="text-[#e25c28ff] flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Job Titles
                  <Badge variant="secondary" className="ml-2 bg-[#011627ff] text-[#f1f7edff] border-[#e25c28ff]/20">max 3 job titles</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {selectedJobTitles.map((title) => (
                    <Badge key={title} className="px-4 py-2 bg-[#011627ff] text-[#f1f7edff] hover:bg-[#011627ff] cursor-pointer border border-[#e25c28ff]/10">
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
                      className="bg-[#011627ff] border-border text-[#e25c28ff] placeholder:text-[#f1f7edff]"
                    />
                    <Button onClick={addJobTitle} size="icon" className="bg-[#011627ff] border border-[#e25c28ff]/10 text-[#e25c28ff] hover:bg-[#011627ff]">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Skills */}
            <Card className="border-2 border-border bg-[#011627ff]">
              <CardHeader>
                <CardTitle className="text-[#e25c28ff] flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Top Skills
                  <Badge variant="secondary" className="ml-2 bg-[#011627ff] text-[#f1f7edff] border-[#e25c28ff]/20">max 18 skills</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {selectedSkills.map((skill) => (
                    <Badge key={skill} className="px-4 py-2 bg-[#011627ff] text-[#f1f7edff] hover:bg-[#011627ff] cursor-pointer border border-[#e25c28ff]/10">
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
                      className="bg-[#011627ff] border border-[#e25c28ff]/10 text-[#f1f7edff] placeholder:text-[#f1f7edff]"
                    />
                    <Button onClick={addSkill} size="icon" className="bg-[#011627ff] border border-[#e25c28ff]/10 text-[#e25c28ff] hover:bg-[#011627ff]">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card id="ai-recommendations" className="border-2 border-success/30 bg-[#011627ff]">
              <CardHeader>
                <CardTitle className="text-[#e25c28ff] flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-success" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-[#f1f7edff] mb-3">Select recommended Job Titles</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendedJobTitles.map((title) => (
                      <Button
                        key={title}
                        variant="outline"
                        size="sm"
                        onClick={() => addRecommendedJobTitle(title)}
                        disabled={selectedJobTitles.includes(title) || selectedJobTitles.length >= 3}
                        className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff] hover:bg-[#011627ff] hover:text-[#e25c28ff]"
                      >
                        {title}
                        <Plus className="ml-2 h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#f1f7edff] mb-3">Select recommended Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendedSkills.map((skill) => (
                      <Button
                        key={skill}
                        variant="outline"
                        size="sm"
                        onClick={() => addRecommendedSkill(skill)}
                        disabled={selectedSkills.includes(skill) || selectedSkills.length >= 18}
                        className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff] hover:bg-[#011627ff] hover:text-[#e25c28ff]"
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
            <Card id="jobs-for-you" className="border-2 border-border bg-[#011627ff]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#e25c28ff]">Jobs for You</CardTitle>
                  <Button variant="outline" size="sm" className="text-[#e25c28ff]">Most Relevant</Button>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="ghost" size="sm" className="text-[#e25c28ff]">Your Preferences</Button>
                  <Button variant="ghost" size="sm" className="text-[#e25c28ff]">Your Priority</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.map((app, index) => (
                  <div key={index} className="border-2 border-border rounded-lg p-6 transition-all bg-[#011627ff]">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-[#f1f7edff]" />
                          <span className="text-sm text-[#f1f7edff]">{app.location}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-[#e25c28ff] mb-2">{app.role}</h3>
                        <p className="text-sm text-[#f1f7edff]">{app.company}</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative h-20 w-20">
                          <svg className="transform -rotate-90" width="80" height="80">
                            <circle cx="40" cy="40" r="36" stroke="#02222cff" strokeWidth="6" fill="none" />
                            <circle 
                              cx="40" 
                              cy="40" 
                              r="36" 
                              stroke="#e25c28ff" 
                              strokeWidth="6" 
                              fill="none" 
                              strokeDasharray={`${app.match * 2.26} 226`}
                              className="transition-all"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-xl font-bold text-[#e25c28ff]">{app.match}%</span>
                          </div>
                        </div>
                        <span className="text-xs text-[#e25c28ff] font-semibold">Great Match</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-[#f1f7edff]">
                        <Calendar className="h-4 w-4 text-[#f1f7edff]" />
                        {app.type}
                      </div>
                      <div className="flex items-center gap-2 text-[#f1f7edff]">
                        <BarChart3 className="h-4 w-4 text-[#f1f7edff]" />
                        {app.salary}
                      </div>
                      <div className="flex items-center gap-2 text-[#f1f7edff]">
                        <Briefcase className="h-4 w-4 text-[#f1f7edff]" />
                        {app.level}
                      </div>
                      <div className="flex items-center gap-2 text-[#f1f7edff]">
                        <Award className="h-4 w-4 text-[#f1f7edff]" />
                        {app.experience}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={`${getStatusBadge(app.status)} border`}>{app.status}</Badge>
                      <Button className="bg-[#011627ff] border border-[#e25c28ff]/10 text-[#e25c28ff] hover:bg-[#011627ff]">Apply Now</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Insights & Discover */}
          <div className="space-y-8">
            {/* AI Insights Card */}
            <Card className="border-2 border-[#e25c28ff]/30 bg-[#011627ff]">
              <CardHeader>
                <CardTitle className="text-[#e25c28ff] flex items-center gap-2">
                  <Brain className="h-5 w-5 text-[#e25c28ff]" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Strengths */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#e25c28ff]" />
                    <h4 className="font-semibold text-[#e25c28ff]">Strengths</h4>
                  </div>
                  {aiInsights.strengths.map((strength, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#02222cff] border border-[#073138]/20">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm text-[#f1f7edff]">{strength.title}</p>
                        <span className="text-xs font-bold text-[#f1f7edff]">{strength.score}%</span>
                      </div>
                      <p className="text-xs text-[#bcd8b0ff]">{strength.description}</p>
                    </div>
                  ))}
                </div>

                {/* Weaknesses */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <h4 className="font-semibold text-[#e25c28ff]">Weaknesses</h4>
                  </div>
                  {aiInsights.weaknesses.map((weakness, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#02222cff] border border-[#073138]/20">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm text-[#f1f7edff]">{weakness.title}</p>
                        <span className={weakness.impact === 'High' ? 'inline-flex items-center px-3 py-1 rounded-full bg-[#e25c28ff] text-white text-xs' : 'inline-flex items-center px-3 py-1 rounded-full bg-[#f1f7edff]/20 text-[#f1f7edff] text-xs'}>
                          {weakness.impact}
                        </span>
                      </div>
                      <p className="text-xs text-[#bcd8b0ff] mb-2">{weakness.description}</p>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-[#e25c28ff]">
                        {weakness.action} <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Areas of Improvement */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-[#e25c28ff]">Areas of Improvement</h4>
                  </div>
                  {aiInsights.improvements.map((improvement, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#02222cff] border border-[#073138]/20">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm text-[#f1f7edff]">{improvement.title}</p>
                        <span className={improvement.priority === 'High' ? 'inline-flex items-center px-3 py-1 rounded-full bg-[#e25c28ff] text-white text-xs' : 'inline-flex items-center px-3 py-1 rounded-full bg-[#f1f7edff]/20 text-[#f1f7edff] text-xs'}>
                          {improvement.priority}
                        </span>
                      </div>
                      <p className="text-xs text-[#bcd8b0ff] mb-1">{improvement.reason}</p>
                      <p className="text-xs text-[#e25c28ff] font-semibold">{improvement.impact}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Discover Student Section */}
            <Card className="border-2 border-border bg-[#011627ff]">
              <CardHeader className="bg-[#011627ff]">
                <CardTitle className="text-[#e25c28ff] flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-success" />
                  DISCOVER
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {discoverContent.map((item, idx) => (
                  <div key={idx} className="p-4 border-b border-border last:border-b-0 transition-all">
                    <Badge className="bg-[#011627ff] text-[#f1f7edff] border-[#e25c28ff]/40 mb-2 text-xs">
                      {item.category}
                    </Badge>
                    <p className="text-sm text-[#e25c28ff] mb-2">{item.title}</p>
                    <Button variant="link" className="text-[#e25c28ff] p-0 h-auto text-xs">
                      {item.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Resume Upload */}
            <Card id="ats-checker" className="border-2 border-border bg-[#011627ff]">
              <CardHeader>
                <CardTitle className="text-[#e25c28ff] flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  ATS Resume Scorer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center p-6 border-2 border-dashed border-border rounded-lg hover:border-primary transition-all cursor-pointer bg-[#011627ff]">
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-[#011627ff] flex items-center justify-center mx-auto border border-[#e25c28ff]/20">
                      <Upload className="h-6 w-6 text-[#e25c28ff]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#e25c28ff] text-sm">Upload Resume</p>
                      <p className="text-xs text-[#f1f7edff]">PDF, DOC (Max 5MB)</p>
                    </div>
                    <Button size="sm" className="bg-[#011627ff] border border-[#e25c28ff]/10 text-[#e25c28ff] hover:bg-[#011627ff]">Choose File</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-[#011627ff] border border-[#e25c28ff]/20">
                  <p className="text-xs text-[#f1f7edff] mb-1">Current ATS Score</p>
                  <div className="flex items-center justify-between">
                    <p className={`text-2xl font-bold ${getScoreColor(resumeScore)}`}>{resumeScore}/100</p>
                    <Award className="h-8 w-8 text-[#e25c28ff]" />
                  </div>
                  <Progress value={resumeScore} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
