import { useState } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { DataTable } from "@/components/Placement/Datatable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Flag } from "lucide-react";
import { toast } from "sonner";
import { AddRecruiterDialog } from "@/components/Placement/AddRecruiterDialog";

interface Recruiter {
  id: string;
  companyName: string;
  activePostings: number;
  status: "active" | "inactive" | "flagged";
  averageSalary: string;
  jobRoles: string[];
}

const mockRecruiters: Recruiter[] = [
  {
    id: "1",
    companyName: "Tech Innovations Pvt Ltd",
    activePostings: 5,
    status: "active",
    averageSalary: "₹8.5 LPA",
    jobRoles: ["Software Engineer", "Data Analyst"],
  },
  {
    id: "2",
    companyName: "Global Systems Inc",
    activePostings: 3,
    status: "active",
    averageSalary: "₹12 LPA",
    jobRoles: ["Full Stack Developer", "DevOps Engineer"],
  },
  {
    id: "3",
    companyName: "Design Solutions",
    activePostings: 2,
    status: "active",
    averageSalary: "₹6.5 LPA",
    jobRoles: ["UI/UX Designer", "Graphic Designer"],
  },
  {
    id: "4",
    companyName: "Manufacturing Hub",
    activePostings: 0,
    status: "inactive",
    averageSalary: "₹5 LPA",
    jobRoles: ["Production Engineer"],
  },
  {
    id: "5",
    companyName: "Startup Ventures",
    activePostings: 4,
    status: "flagged",
    averageSalary: "₹7 LPA",
    jobRoles: ["Product Manager", "Marketing Specialist"],
  },
];

export default function Recruiters() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>(mockRecruiters);

  const handleRecruiterAdded = (newRecruiter: Omit<Recruiter, "id">) => {
    const recruiter = {
      ...newRecruiter,
      id: (recruiters.length + 1).toString(),
    };
    setRecruiters(prev => [...prev, recruiter]);
  };

  const handleApprove = (companyName: string) => {
    toast.success(`${companyName} has been approved!`);
  };

  const handleFlag = (companyName: string) => {
    toast.error(`${companyName} has been flagged for review.`);
  };

  const columns = [
    { key: "companyName", header: "Company Name" },
    { key: "activePostings", header: "Active Postings" },
    {
      key: "status",
      header: "Status",
      render: (recruiter: Recruiter) => (
        <Badge
          variant={
            recruiter.status === "active"
              ? "default"
              : recruiter.status === "flagged"
              ? "destructive"
              : "outline"
          }
          className={
            recruiter.status === "active"
              ? "bg-success text-success-foreground"
              : ""
          }
        >
          {recruiter.status}
        </Badge>
      ),
    },
    { key: "averageSalary", header: "Average Salary" },
    {
      key: "jobRoles",
      header: "Job Roles Offered",
      render: (recruiter: Recruiter) => (
        <div className="flex flex-wrap gap-1">
          {recruiter.jobRoles.map((role, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {role}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (recruiter: Recruiter) => (
        <div className="flex gap-2">
          {recruiter.status !== "active" && (
            <Button
              size="sm"
              variant="default"
              className="bg-success hover:bg-success/90"
              onClick={() => handleApprove(recruiter.companyName)}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </Button>
          )}
          {recruiter.status === "active" && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleFlag(recruiter.companyName)}
            >
              <Flag className="w-4 h-4 mr-1" />
              Flag
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <PageHeader
        title="Recruiters"
        description="Manage recruiting companies and their job postings"
        actions={
          <AddRecruiterDialog onRecruiterAdded={handleRecruiterAdded} />
        }
      />

      <div className="mt-6">
        <DataTable data={recruiters} columns={columns} />
      </div>
    </div>
  );
}
