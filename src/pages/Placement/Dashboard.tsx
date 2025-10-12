import { PageHeader } from "@/components/Placement/PageHeader";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/Placement/StatCard";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle, XCircle, Briefcase, FileText, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Registered Students",
      value: "1,247",
      icon: Users,
      trend: { value: "12.5%", isPositive: true },
      description: "Active students in database",
    },
    {
      title: "Verified Students",
      value: "892",
      icon: CheckCircle,
      description: "71.5% of total students",
    },
    {
      title: "Unverified Students",
      value: "355",
      icon: XCircle,
      trend: { value: "8.2%", isPositive: false },
      description: "Pending verification",
    },
    {
      title: "Total Recruiters",
      value: "86",
      icon: Briefcase,
      trend: { value: "23%", isPositive: true },
      description: "Active recruiting companies",
    },
    {
      title: "Jobs Posted This Month",
      value: "142",
      icon: FileText,
      trend: { value: "18.7%", isPositive: true },
      description: "New opportunities",
    },
    {
      title: "Placement Rate",
      value: "78.4%",
      icon: TrendingUp,
      trend: { value: "5.3%", isPositive: true },
      description: "Current academic year",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-end mb-4">
        <Link to="/">
          <Button variant="ghost">Back to Home</Button>
        </Link>
      </div>

      <PageHeader
        title="Dashboard"
        description="Overview of placement cell activities and metrics"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Recent Activity
        </h2>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="space-y-4">
            {[
              { action: "New recruiter registered", company: "Tech Corp", time: "2 hours ago" },
              { action: "Job posting created", company: "InnovateX", time: "5 hours ago" },
              { action: "Placement drive scheduled", company: "DataSystems Inc", time: "1 day ago" },
              { action: "Student verified", company: "N/A", time: "1 day ago" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.company}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
