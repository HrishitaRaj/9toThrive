import { PageHeader } from "@/components/layout/PageHeaderRec";
import { DataTable } from "@/components/Recruitment/Table";
import { FilterBar } from "@/components/Recruitment/Bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Eye, UserPlus, X, BarChart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const candidateData = [
  {
    id: 1,
    name: "Priya Sharma",
    college: "IIT Delhi",
    matchFit: 94,
    skills: "React, Python, ML",
    phss: 89,
    status: "New",
  },
  {
    id: 2,
    name: "Rahul Verma",
    college: "BITS Pilani",
    matchFit: 88,
    skills: "Java, Spring, AWS",
    phss: 85,
    status: "Reviewed",
  },
  {
    id: 3,
    name: "Ananya Reddy",
    college: "NIT Trichy",
    matchFit: 92,
    skills: "UI/UX, Figma, Design",
    phss: 87,
    status: "New",
  },
  {
    id: 4,
    name: "Vikram Singh",
    college: "IIT Bombay",
    matchFit: 85,
    skills: "Data Science, Python, SQL",
    phss: 82,
    status: "Shortlisted",
  },
  {
    id: 5,
    name: "Sneha Patel",
    college: "IIIT Hyderabad",
    matchFit: 91,
    skills: "Full Stack, Node.js, React",
    phss: 88,
    status: "New",
  },
];

const columns = [
  { header: "Candidate Name", accessor: "name" },
  { header: "College", accessor: "college" },
  {
    header: "Match Fit",
    accessor: "matchFit",
    cell: (value: number) => (
      <div className="flex items-center gap-3">
        <Progress value={value} className="w-20" />
        <span className="text-sm font-semibold text-primary">{value}%</span>
      </div>
    ),
  },
  { header: "Top Skills", accessor: "skills" },
  {
    header: "PHSS Score",
    accessor: "phss",
    cell: (value: number) => (
      <Badge variant={value >= 85 ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    cell: (value: string) => {
      const variant = value === "Shortlisted" ? "default" : value === "Reviewed" ? "secondary" : "outline";
      return <Badge variant={variant}>{value}</Badge>;
    },
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
          <UserPlus className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost">
          <X className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];

export default function CandidateMatching() {
  return (
    <div>
      <PageHeader
        title="Candidate Matching"
        description="AI-powered candidate discovery with predictive success scoring"
        actions={
          <>
            <Button variant="outline">
              <BarChart className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Auto-Shortlist
            </Button>
          </>
        }
      />

      <FilterBar>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="College" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Colleges</SelectItem>
            <SelectItem value="iit">IIT</SelectItem>
            <SelectItem value="nit">NIT</SelectItem>
            <SelectItem value="iiit">IIIT</SelectItem>
            <SelectItem value="bits">BITS</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Match Fit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Matches</SelectItem>
            <SelectItem value="high">90%+ Match</SelectItem>
            <SelectItem value="good">80-89% Match</SelectItem>
            <SelectItem value="fair">70-79% Match</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      <DataTable columns={columns} data={candidateData} />
    </div>
  );
}
