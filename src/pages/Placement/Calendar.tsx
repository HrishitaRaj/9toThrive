import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface Job {
  id: string;
  title: string;
  company: string;
  scheduled_date: string | null;
  status: string;
}

export default function CalendarPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();

    const channel = supabase
      .channel('jobs-calendar-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, () => {
        fetchJobs();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .not('scheduled_date', 'is', null)
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setJobs((data || []) as Job[]);
    } catch (error: any) {
      toast.error(`Failed to fetch jobs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const jobsOnSelectedDate = selectedDate
    ? jobs.filter(job => {
        if (!job.scheduled_date) return false;
        const jobDate = new Date(job.scheduled_date);
        return (
          jobDate.getDate() === selectedDate.getDate() &&
          jobDate.getMonth() === selectedDate.getMonth() &&
          jobDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  const datesWithJobs = jobs
    .filter(job => job.scheduled_date)
    .map(job => new Date(job.scheduled_date!));

  return (
    <div className="p-8">
      <PageHeader
        title="Calendar"
        description="View scheduled interviews and placement events"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="p-6 lg:col-span-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: datesWithJobs
            }}
            modifiersClassNames={{
              hasEvent: "bg-primary/20 font-bold"
            }}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
          </h3>
          
          {loading ? (
            <div className="text-center py-4 text-muted-foreground">Loading...</div>
          ) : jobsOnSelectedDate.length > 0 ? (
            <div className="space-y-3">
              {jobsOnSelectedDate.map((job) => (
                <Card key={job.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{job.title}</h4>
                    <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  {job.scheduled_date && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(job.scheduled_date), 'h:mm a')}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No events scheduled for this date
            </p>
          )}
        </Card>
      </div>

      <Card className="p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-2">
          {jobs.slice(0, 5).map((job) => (
            <div key={job.id} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
              {job.scheduled_date && (
                <Badge variant="outline">
                  {format(new Date(job.scheduled_date), 'MMM d, h:mm a')}
                </Badge>
              )}
            </div>
          ))}
          {jobs.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No upcoming events
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
