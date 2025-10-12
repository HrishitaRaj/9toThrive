import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface PostJobDialogProps {
  onJobPosted: (job: {
    jobTitle: string;
    recruiter: string;
    applicants: number;
    driveDate: string;
    salary: string;
    location: string;
  }) => void;
}

export function PostJobDialog({ onJobPosted }: PostJobDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    recruiter: "",
    salary: "",
    location: "",
    driveDate: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.jobTitle || !formData.recruiter || !formData.salary || !formData.location || !formData.driveDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newJob = {
      jobTitle: formData.jobTitle,
      recruiter: formData.recruiter,
      applicants: 0,
      driveDate: formData.driveDate,
      salary: formData.salary,
      location: formData.location,
    };

    onJobPosted(newJob);
    toast.success("Job posted successfully!");
    setFormData({ jobTitle: "", recruiter: "", salary: "", location: "", driveDate: "", description: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Post Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post New Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              placeholder="e.g., Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recruiter">Company/Recruiter *</Label>
            <Input
              id="recruiter"
              value={formData.recruiter}
              onChange={(e) => setFormData({ ...formData, recruiter: e.target.value })}
              placeholder="e.g., Tech Innovations Pvt Ltd"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Salary *</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="e.g., ₹8.5 LPA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Bangalore"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="driveDate">Drive Date *</Label>
            <Input
              id="driveDate"
              type="date"
              value={formData.driveDate}
              onChange={(e) => setFormData({ ...formData, driveDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Job description and requirements..."
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Post Job</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
