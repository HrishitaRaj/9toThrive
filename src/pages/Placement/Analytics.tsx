import { PageHeader } from "@/components/Placement/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner";

const placementByBranch = [
  { branch: "CS", placed: 85, total: 100 },
  { branch: "EC", placed: 72, total: 90 },
  { branch: "ME", placed: 65, total: 95 },
  { branch: "CE", placed: 58, total: 80 },
  { branch: "EE", placed: 70, total: 88 },
];

const topRecruiters = [
  { company: "Tech Innovations", offers: 42 },
  { company: "Global Systems", offers: 38 },
  { company: "Cloud Tech", offers: 35 },
  { company: "Startup Ventures", offers: 28 },
  { company: "Design Solutions", offers: 24 },
];

const salaryTrends = [
  { month: "Jul", avgSalary: 6.5 },
  { month: "Aug", avgSalary: 7.2 },
  { month: "Sep", avgSalary: 7.8 },
  { month: "Oct", avgSalary: 8.5 },
  { month: "Nov", avgSalary: 9.2 },
];

export default function Analytics() {
  const handleDownloadPDF = () => {
    toast.success("Analytics report downloaded as PDF!");
  };

  const handleExportExcel = () => {
    toast.success("Data exported to Excel successfully!");
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Analytics"
        description="Comprehensive placement statistics and trends"
        actions={
          <>
            <Button variant="outline" onClick={handleDownloadPDF}>
              <FileText className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleExportExcel}>
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </>
        }
      />

      <div className="space-y-6">
        {/* Placement by Branch */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Placement Percentage by Branch
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={placementByBranch}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="branch" stroke="hsl(var(--mint-cream))" />
              <YAxis stroke="hsl(var(--mint-cream))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="placed" fill="hsl(var(--success))" name="Placed Students" />
              <Bar dataKey="total" fill="hsl(var(--secondary))" name="Total Students" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Recruiters */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Top Recruiters by Offers
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topRecruiters} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--mint-cream))" />
              <YAxis dataKey="company" type="category" width={150} stroke="hsl(var(--mint-cream))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="offers" fill="hsl(var(--accent))" name="Total Offers" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Salary Trends */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Average Salary Trends (in LPA)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salaryTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--mint-cream))" />
              <YAxis stroke="hsl(var(--mint-cream))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgSalary"
                stroke="hsl(var(--secondary))"
                strokeWidth={3}
                name="Average Salary (LPA)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
