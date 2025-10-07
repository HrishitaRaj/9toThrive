import { useState } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { DataTable } from "@/components/Placement/Datatable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download } from "lucide-react";
import { toast } from "sonner";
import { exportToExcel } from "@/utils/excelExport";
import { PostJobDialog } from "@/components/Placement/PostJobDialog";

interface Job {
  id: string;
  jobTitle: string;
  recruiter: string;
  applicants: number;
  driveDate: string;
  salary: string;
  location: string;
}

const mockJobs: Job[] = [
  {
    id: "1",
    jobTitle: "Software Engineer",
    recruiter: "Tech Innovations Pvt Ltd",
    applicants: 45,
    driveDate: "2025-11-15",
    salary: "₹8.5 LPA",
    location: "Bangalore",
  },
  {
    id: "2",
    jobTitle: "Data Analyst",
    recruiter: "Global Systems Inc",
    applicants: 32,
    driveDate: "2025-11-20",
    salary: "₹7 LPA",
    location: "Hyderabad",
  },
  {
    id: "3",
    jobTitle: "Full Stack Developer",
    recruiter: "Startup Ventures",
    applicants: 58,
    driveDate: "2025-11-25",
    salary: "₹10 LPA",
    location: "Pune",
  },
  {
    id: "4",
    jobTitle: "UI/UX Designer",
    recruiter: "Design Solutions",
    applicants: 23,
    driveDate: "2025-12-01",
    salary: "₹6.5 LPA",
    location: "Mumbai",
  },
  {
    id: "5",
    jobTitle: "DevOps Engineer",
    recruiter: "Cloud Tech Systems",
    applicants: 41,
    driveDate: "2025-12-05",
    salary: "₹12 LPA",
    location: "Bangalore",
  },
];

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  const handleJobPosted = (newJob: Omit<Job, "id">) => {
    const job = {
      ...newJob,
      id: (jobs.length + 1).toString(),
    };
    setJobs(prev => [...prev, job]);
  };

  const handleScheduleDrive = (jobTitle: string) => {
    toast.success(`Placement drive scheduled for ${jobTitle}`);
  };

  const handleExport = () => {
    try {
      const exportData = jobs.map(job => ({
        'Job ID': job.id,
        'Job Title': job.jobTitle,
        'Recruiter': job.recruiter,
        'Applicants': job.applicants,
        'Drive Date': job.driveDate,
        'Salary': job.salary,
        'Location': job.location,
      }));
      
      exportToExcel(exportData, 'jobs_list', 'Jobs');
      toast.success("Job listings exported to Excel successfully!");
    } catch (error) {
      toast.error("Failed to export jobs");
    }
  };

  const columns = [
    { key: "jobTitle", header: "Job Title" },
    { key: "recruiter", header: "Recruiter" },
    {
      key: "applicants",
      header: "Applicants",
      render: (job: Job) => (
        <Badge variant="secondary" className="font-semibold">
          {job.applicants}
        </Badge>
      ),
    },
    { key: "salary", header: "Salary" },
    { key: "location", header: "Location" },
    { key: "driveDate", header: "Drive Date" },
    {
      key: "actions",
      header: "Actions",
      render: (job: Job) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleScheduleDrive(job.jobTitle)}
          >
            <Calendar className="w-4 h-4 mr-1" />
            Schedule
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <PageHeader
        title="Jobs"
        description="Manage job postings and placement drives"
        actions={
          <>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
            <PostJobDialog onJobPosted={handleJobPosted} />
          </>
        }
      />

      <div className="mt-6">
        <DataTable data={jobs} columns={columns} />
      </div>
    </div>
  );
}
