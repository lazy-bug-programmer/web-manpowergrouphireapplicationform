"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getAllAvailableJobs,
  deleteAvailableJob,
} from "@/lib/actions/available-jobs.action";
import { AvailableJobs, JobType } from "@/lib/domains/available-jobs.domain";
import { Briefcase, Trash2, RefreshCw } from "lucide-react";

interface AvailableJobsTableProps {
  refreshTrigger: number;
}

export function AvailableJobsTable({
  refreshTrigger,
}: AvailableJobsTableProps) {
  const [jobs, setJobs] = useState<AvailableJobs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getJobTypeLabel = (jobType: JobType) => {
    switch (jobType) {
      case JobType.FullTime:
        return "Full Time";
      case JobType.PartTime:
        return "Part Time";
      case JobType.Contract:
        return "Contract";
      case JobType.Internship:
        return "Internship";
      case JobType.Freelance:
        return "Freelance";
      default:
        return "Unknown";
    }
  };

  const getJobTypeBadgeVariant = (jobType: JobType) => {
    switch (jobType) {
      case JobType.FullTime:
        return "default";
      case JobType.PartTime:
        return "secondary";
      case JobType.Contract:
        return "outline";
      case JobType.Internship:
        return "destructive";
      case JobType.Freelance:
        return "secondary";
      default:
        return "outline";
    }
  };

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const result = await getAllAvailableJobs();
      if (result.success) {
        setJobs(result.data as unknown as AvailableJobs[]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) {
      return;
    }

    setDeletingId(jobId);
    try {
      const result = await deleteAvailableJob(jobId);
      if (result.success) {
        await fetchJobs();
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [refreshTrigger]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Available Jobs
            </CardTitle>
            <CardDescription>
              Manage existing job positions and their details
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchJobs}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No jobs available. Create your first job above.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Slots</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.$id}>
                    <TableCell className="font-medium">{job.name}</TableCell>
                    <TableCell>{job.position}</TableCell>
                    <TableCell>
                      <Badge variant={getJobTypeBadgeVariant(job.job_type)}>
                        {getJobTypeLabel(job.job_type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={job.slot > 0 ? "default" : "destructive"}>
                        {job.slot} {job.slot === 1 ? "slot" : "slots"}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className="max-w-xs truncate"
                      title={job.description}
                    >
                      {job.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(job.$id!)}
                        disabled={deletingId === job.$id}
                      >
                        {deletingId === job.$id ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
