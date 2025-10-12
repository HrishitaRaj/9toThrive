import { useState } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { FilterBar } from "@/components/Placement/FilterBar";
import { DataTable } from "@/components/Placement/Datatable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { BulkUploadDialog } from "@/components/Placement/BulkUploadDialog";
import { SendNotificationDialog } from "@/components/Placement/SendNotificationDialog";

interface Student {
  id: string;
  name: string;
  branch: string;
  skills: string[];
  verificationStatus: "verified" | "unverified" | "pending";
  email?: string;
  rollNo?: string;
}

const mockStudents: Student[] = [
  { id: "1", name: "Rahul Sharma", branch: "Computer Science", skills: ["React", "Node.js", "Python"], verificationStatus: "verified" },
  { id: "2", name: "Priya Patel", branch: "Electronics", skills: ["VLSI", "Embedded Systems"], verificationStatus: "verified" },
  { id: "3", name: "Amit Kumar", branch: "Mechanical", skills: ["CAD", "SolidWorks", "ANSYS"], verificationStatus: "unverified" },
  { id: "4", name: "Sneha Reddy", branch: "Computer Science", skills: ["Java", "Spring Boot", "AWS"], verificationStatus: "pending" },
  { id: "5", name: "Vikram Singh", branch: "Civil", skills: ["AutoCAD", "Revit", "3D Modeling"], verificationStatus: "verified" },
];

export default function Students() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredStudents = students.filter((student) => {
    const matchesBranch = selectedBranch === "all" || student.branch === selectedBranch;
    const matchesStatus = selectedStatus === "all" || student.verificationStatus === selectedStatus;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesBranch && matchesStatus && matchesSearch;
  });

  const handleStudentsUploaded = (newStudents: Student[]) => {
    setStudents(prev => [...prev, ...newStudents]);
  };

  const handleVerify = (studentName: string) => {
    toast.success(`${studentName} has been verified successfully!`);
  };

  const handleView = (studentName: string) => {
    toast.info(`Viewing details for ${studentName}`);
  };

  const columns = [
    { key: "name", header: "Name" },
    { key: "branch", header: "Branch" },
    {
      key: "skills",
      header: "Skills",
      render: (student: Student) => (
        <div className="flex flex-wrap gap-1">
          {student.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "verificationStatus",
      header: "Status",
      render: (student: Student) => (
        <Badge
          variant={
            student.verificationStatus === "verified"
              ? "default"
              : student.verificationStatus === "pending"
              ? "outline"
              : "destructive"
          }
          className={
            student.verificationStatus === "verified"
              ? "bg-success text-success-foreground"
              : ""
          }
        >
          {student.verificationStatus}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (student: Student) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(student.name)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          {student.verificationStatus !== "verified" && (
            <Button
              size="sm"
              variant="default"
              className="bg-success hover:bg-success/90"
              onClick={() => handleVerify(student.name)}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Verify
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <PageHeader
        title="Students"
        description="Manage student registrations and verifications"
        actions={
          <>
            <BulkUploadDialog onStudentsUploaded={handleStudentsUploaded} />
            <SendNotificationDialog students={filteredStudents} />
          </>
        }
      />

      <FilterBar>
        <Input
          placeholder="Search by name or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Mechanical">Mechanical</SelectItem>
            <SelectItem value="Civil">Civil</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Verification Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      <div className="mt-6">
        <DataTable data={filteredStudents} columns={columns} />
      </div>
    </div>
  );
}
