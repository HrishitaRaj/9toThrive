import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Briefcase, Clock, DollarSign, CheckCircle } from "lucide-react";
import { useJobs, Job } from "@/contexts/JobContext";
import { toast } from "sonner";

const Jobs = () => {
  const navigate = useNavigate();
  const { applyToJob, isJobApplied } = useJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleApply = (job: Job) => {
    applyToJob(job);
    toast.success(`Applied to ${job.title} at ${job.company}!`);
    setSelectedJob(null);
    setTimeout(() => {
      navigate("/applied");
    }, 1500);
  };

  const jobs: Job[] = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Tech Innovations",
      location: "Bengaluru",
      type: "Fulltime",
      experience: "2 Years",
      salary: "8-12 Lacs",
      match: 85,
      description: "Join our team to build scalable full-stack applications. Work with Node.js, React, and cloud technologies in an agile environment.",
      requirements: ["React.js", "Node.js", "MongoDB", "AWS", "Docker", "Microservices"],
      skillsToDevelop: ["AWS", "Docker", "Microservices"],
      benefits: ["Stock Options", "Gym Membership", "Health Insurance", "WFH Allowance"],
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Digital Solutions",
      location: "Remote",
      type: "Contract",
      experience: "1 Years",
      salary: "6-10 Lacs",
      match: 92,
      description: "Create stunning user interfaces using modern React and TypeScript. Work with a global team on cutting-edge web applications.",
      requirements: ["React.js", "TypeScript", "TailwindCSS", "Git"],
      skillsToDevelop: ["TypeScript"],
      benefits: ["Flexible Hours", "Remote Work", "Learning Budget"],
      postedDate: "1 week ago",
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "Cloud Systems",
      location: "Bengaluru",
      type: "Onsite",
      experience: "3 Years",
      salary: "10-15 Lacs",
      match: 78,
      description: "Build robust backend systems and APIs. Work with Python, Django, and PostgreSQL to create scalable microservices.",
      requirements: ["Python", "Django", "PostgreSQL", "Redis", "Kubernetes"],
      skillsToDevelop: ["Redis", "Kubernetes"],
      benefits: ["Stock Options", "Health Insurance", "Free Meals"],
      postedDate: "3 days ago",
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Jobs for You</h1>
        <p className="text-muted-foreground">Personalized job recommendations based on your skills and experience</p>
      </div>

      <div className="grid gap-6">
        {jobs.map((job) => {
          const applied = isJobApplied(job.id);
          return (
            <Card
              key={job.id}
              className={`border-2 transition-all cursor-pointer ${
                applied
                  ? "border-success/50 bg-success/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedJob(job)}
            >
              <CardContent className="p-6">
                {applied && (
                  <div className="mb-4 flex items-center gap-2 text-success">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Applied</span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{job.location}</span>
                    <Badge variant="outline" className="ml-2">{job.type}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{job.title}</h3>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-20 w-20">
                    <svg className="transform -rotate-90" width="80" height="80">
                      <circle cx="40" cy="40" r="35" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="6"
                        strokeDasharray={`${2 * Math.PI * 35}`}
                        strokeDashoffset={`${2 * Math.PI * 35 * (1 - job.match / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{job.match}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">Match</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{job.postedDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.requirements.slice(0, 4).map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary">
                    {skill}
                  </Badge>
                ))}
                {job.requirements.length > 4 && (
                  <Badge variant="secondary">+{job.requirements.length - 4} more</Badge>
                )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{selectedJob.company}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {selectedJob.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {selectedJob.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedJob.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">Your Match Score</h3>
                  <div className="flex items-center gap-4">
                    <Progress value={selectedJob.match} className="flex-1" />
                    <span className="text-2xl font-bold text-primary">{selectedJob.match}%</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Job Description</h3>
                  <p className="text-muted-foreground">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Requirements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requirements.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="bg-secondary text-secondary-foreground">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Skills to Develop</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skillsToDevelop?.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="border-primary/50 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Benefits</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedJob.benefits.map((benefit: string) => (
                      <div key={benefit} className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-success" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  {isJobApplied(selectedJob.id) ? (
                    <Button className="flex-1 bg-success" disabled>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Applied
                    </Button>
                  ) : (
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => handleApply(selectedJob)}
                    >
                      Apply Now
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setSelectedJob(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Jobs;
