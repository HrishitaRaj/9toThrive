import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { DataTable } from "@/components/Placement/Datatable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Flag } from "lucide-react";
import { toast } from "sonner";
import { AddRecruiterDialog } from "@/components/Placement/AddRecruiterDialog";
import { supabase } from "@/integrations/supabase/client";

interface Recruiter {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  domain?: string;
  active_postings: number;
  status: "active" | "inactive" | "flagged";
  average_salary?: string;
  job_roles: string[];
}

export default function Recruiters() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecruiters();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('recruiters-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'recruiters' }, () => {
        fetchRecruiters();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRecruiters = async () => {
    try {
      const { data, error } = await supabase
        .from('recruiters')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRecruiters((data || []) as Recruiter[]);
    } catch (error: any) {
      toast.error(`Failed to fetch recruiters: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRecruiterAdded = async (newRecruiter: any) => {
    try {
      const { error } = await supabase.from('recruiters').insert({
        company_name: newRecruiter.companyName,
        contact_name: newRecruiter.contactName,
        email: newRecruiter.email,
        phone: newRecruiter.phone,
        domain: newRecruiter.domain,
        status: 'active',
        active_postings: 0,
        job_roles: []
      });
      
      if (error) throw error;
      toast.success("Recruiter added successfully!");
      fetchRecruiters();
    } catch (error: any) {
      toast.error(`Failed to add recruiter: ${error.message}`);
    }
  };

  const handleApprove = async (recruiter: Recruiter) => {
    try {
      const { error } = await supabase
        .from('recruiters')
        .update({ status: 'active' })
        .eq('id', recruiter.id);
      
      if (error) throw error;
      toast.success(`${recruiter.company_name} has been approved!`);
      fetchRecruiters();
    } catch (error: any) {
      toast.error(`Failed to approve: ${error.message}`);
    }
  };

  const handleFlag = async (recruiter: Recruiter) => {
    try {
      const { error } = await supabase
        .from('recruiters')
        .update({ status: 'flagged' })
        .eq('id', recruiter.id);
      
      if (error) throw error;
      toast.error(`${recruiter.company_name} has been flagged for review.`);
      fetchRecruiters();
    } catch (error: any) {
      toast.error(`Failed to flag: ${error.message}`);
    }
  };

  const columns = [
    { key: "company_name", header: "Company Name" },
    { key: "contact_name", header: "Contact Name" },
    { key: "email", header: "Email" },
    { key: "active_postings", header: "Active Postings" },
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
    { key: "average_salary", header: "Average Salary" },
    {
      key: "job_roles",
      header: "Job Roles Offered",
      render: (recruiter: Recruiter) => (
        <div className="flex flex-wrap gap-1">
          {recruiter.job_roles?.length > 0 ? (
            recruiter.job_roles.map((role, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {role}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">No roles</span>
          )}
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
              onClick={() => handleApprove(recruiter)}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </Button>
          )}
          {recruiter.status === "active" && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleFlag(recruiter)}
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
