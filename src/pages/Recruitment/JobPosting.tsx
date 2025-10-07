import { PageHeader } from "@/components/layout/PageHeaderRec";
import { DataTable } from "@/components/Recruitment/Table";
import { FilterBar } from "@/components/Recruitment/Bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, Eye, Edit, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const jobData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    recruiter: "Rajesh Kumar",
    skills: "React, TypeScript, Node.js",
    applicants: 87,
    status: "Active",
  },
  {
    id: 2,
    title: "Data Scientist",
    recruiter: "Priya Sharma",
    skills: "Python, ML, TensorFlow",
    applicants: 134,
    status: "Active",
  },
  {
    id: 3,
    title: "Product Manager",
    recruiter: "Amit Patel",
    skills: "Agile, Strategy, Analytics",
    applicants: 56,
    status: "Closed",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    recruiter: "Neha Gupta",
    skills: "Figma, Sketch, Prototyping",
    applicants: 92,
    status: "Active",
  },
  {
    id: 5,
    title: "Backend Engineer",
    recruiter: "Vikram Singh",
    skills: "Java, Spring Boot, AWS",
    applicants: 78,
    status: "Active",
  },
];

const columns = [
  { header: "Job Title", accessor: "title" },
  { header: "Recruiter", accessor: "recruiter" },
  { header: "Required Skills", accessor: "skills" },
  {
    header: "Applicants",
    accessor: "applicants",
    cell: (value: number) => (
      <span className="font-semibold text-primary">{value}</span>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    cell: (value: string) => (
      <Badge variant={value === "Active" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
  {
    header: "Actions",
    accessor: "id",
    cell: () => (
      <div className="flex gap-2">
        <Button size="sm" variant="ghost">
          <Eye className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost">
          <Edit className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];

export default function JobPosting() {
  return (
    <div>
      <PageHeader
        title="Job Postings"
        description="Manage all your active and closed job positions"
        actions={
          <>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Job Post
            </Button>
          </>
        }
      />

      <FilterBar>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Recruiter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Recruiters</SelectItem>
            <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
            <SelectItem value="priya">Priya Sharma</SelectItem>
            <SelectItem value="amit">Amit Patel</SelectItem>
            <SelectItem value="neha">Neha Gupta</SelectItem>
            <SelectItem value="vikram">Vikram Singh</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      <DataTable columns={columns} data={jobData} />
    </div>
  );
}
