import { useEffect, useState } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { StatCard } from "@/components/Placement/StatCard";
import { Users, CheckCircle, XCircle, Briefcase, FileText, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format, formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  action: string;
  company: string;
  created_at: string;
}

export default function Dashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [recruitersCount, setRecruitersCount] = useState(0);
  const [jobsCount, setJobsCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchDashboardData();

    // Real-time subscriptions
    const studentsChannel = supabase
      .channel('students-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, fetchDashboardData)
      .subscribe();

    const recruitersChannel = supabase
      .channel('recruiters-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'recruiters' }, fetchDashboardData)
      .subscribe();

    const jobsChannel = supabase
      .channel('jobs-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, fetchDashboardData)
      .subscribe();

    return () => {
      supabase.removeChannel(studentsChannel);
      supabase.removeChannel(recruitersChannel);
      supabase.removeChannel(jobsChannel);
    };
  }, []);

  const fetchDashboardData = async () => {
    // Fetch students count
    const { count: totalStudents } = await supabase
      .from('students')
      .select('*', { count: 'exact', head: true });

    const { count: verified } = await supabase
      .from('students')
      .select('*', { count: 'exact', head: true })
      .eq('verification_status', 'verified');

    // Fetch recruiters count
    const { count: recruiters } = await supabase
      .from('recruiters')
      .select('*', { count: 'exact', head: true });

    // Fetch jobs count (this month)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const { count: jobs } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth.toISOString());

    // Fetch recent activities
    const { data: recentJobs } = await supabase
      .from('jobs')
      .select('id, title, company, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    const activities: Activity[] = (recentJobs || []).map(job => ({
      id: job.id,
      action: `New job posted: ${job.title}`,
      company: job.company,
      created_at: job.created_at
    }));

    setStudentsCount(totalStudents || 0);
    setVerifiedCount(verified || 0);
    setRecruitersCount(recruiters || 0);
    setJobsCount(jobs || 0);
    setRecentActivities(activities);
  };

  const stats = [
    {
      title: "Total Registered Students",
      value: studentsCount.toString(),
      icon: Users,
      description: "Active students in database",
    },
    {
      title: "Verified Students",
      value: verifiedCount.toString(),
      icon: CheckCircle,
      description: `${studentsCount > 0 ? ((verifiedCount / studentsCount) * 100).toFixed(1) : 0}% of total students`,
    },
    {
      title: "Unverified Students",
      value: (studentsCount - verifiedCount).toString(),
      icon: XCircle,
      description: "Pending verification",
    },
    {
      title: "Total Recruiters",
      value: recruitersCount.toString(),
      icon: Briefcase,
      description: "Active recruiting companies",
    },
    {
      title: "Jobs Posted This Month",
      value: jobsCount.toString(),
      icon: FileText,
      description: "New opportunities",
    },
    {
      title: "Placement Rate",
      value: studentsCount > 0 ? `${((verifiedCount / studentsCount) * 100).toFixed(1)}%` : "0%",
      icon: TrendingUp,
      description: "Current academic year",
    },
  ];

  return (
    <div className="p-8">
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
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
