import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface AddRecruiterDialogProps {
  onRecruiterAdded: (recruiter: {
    companyName: string;
    activePostings: number;
    status: "active" | "inactive" | "flagged";
    averageSalary: string;
    jobRoles: string[];
  }) => void;
}

export function AddRecruiterDialog({ onRecruiterAdded }: AddRecruiterDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    averageSalary: "",
    jobRoles: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companyName || !formData.averageSalary || !formData.jobRoles) {
      toast.error("Please fill in all fields");
      return;
    }

    const newRecruiter = {
      companyName: formData.companyName,
      activePostings: 0,
      status: "active" as const,
      averageSalary: formData.averageSalary,
      jobRoles: formData.jobRoles.split(",").map(role => role.trim()),
    };

    onRecruiterAdded(newRecruiter);
    toast.success("Recruiter added successfully!");
    setFormData({ companyName: "", averageSalary: "", jobRoles: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Recruiter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Recruiter</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="e.g., Tech Innovations Pvt Ltd"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="averageSalary">Average Salary</Label>
            <Input
              id="averageSalary"
              value={formData.averageSalary}
              onChange={(e) => setFormData({ ...formData, averageSalary: e.target.value })}
              placeholder="e.g., ₹8.5 LPA"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobRoles">Job Roles (comma-separated)</Label>
            <Input
              id="jobRoles"
              value={formData.jobRoles}
              onChange={(e) => setFormData({ ...formData, jobRoles: e.target.value })}
              placeholder="e.g., Software Engineer, Data Analyst"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Recruiter</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
