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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getAllAvailableJobs,
  deleteAvailableJob,
  updateAvailableJob,
} from "@/lib/actions/available-jobs.action";
import { AvailableJobs, JobType } from "@/lib/domains/available-jobs.domain";
import { Briefcase, Trash2, RefreshCw, Edit, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AvailableJobsTableProps {
  refreshTrigger: number;
}

export function AvailableJobsTable({
  refreshTrigger,
}: AvailableJobsTableProps) {
  const [jobs, setJobs] = useState<AvailableJobs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingJob, setEditingJob] = useState<AvailableJobs | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    position: "",
    description: "",
    slot: "",
    job_type: "",
  });

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

  const handleEdit = (job: AvailableJobs) => {
    setEditingJob(job);
    setEditForm({
      name: job.name,
      position: job.position,
      description: job.description,
      slot: job.slot.toString(),
      job_type: job.job_type.toString(),
    });
    setShowEditModal(true);
  };

  const handleUpdateJob = async () => {
    if (
      !editingJob ||
      !editForm.name ||
      !editForm.position ||
      !editForm.description ||
      !editForm.slot ||
      editForm.job_type === ""
    ) {
      toast("Please fill in all fields");
      return;
    }

    const slotNumber = parseInt(editForm.slot);
    if (isNaN(slotNumber) || slotNumber < 0) {
      toast("Please enter a valid slot number (minimum 0)");
      return;
    }

    setIsUpdating(true);
    try {
      const result = await updateAvailableJob(editingJob.$id!, {
        name: editForm.name,
        position: editForm.position,
        description: editForm.description,
        slot: slotNumber,
        job_type: parseInt(editForm.job_type) as JobType,
      });

      if (result.success) {
        toast("Job updated successfully!");
        setShowEditModal(false);
        setEditingJob(null);
        await fetchJobs();
      } else {
        toast(result.error || "Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast("An error occurred while updating the job");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingJob(null);
    setEditForm({
      name: "",
      position: "",
      description: "",
      slot: "",
      job_type: "",
    });
  };

  useEffect(() => {
    fetchJobs();
  }, [refreshTrigger]);

  return (
    <>
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
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(job)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
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
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Job Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>
              Update job details and available slots.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Job Name</Label>
              <Input
                id="edit-name"
                type="text"
                placeholder="Enter job name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, name: e.target.value }))
                }
                disabled={isUpdating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-position">Position</Label>
              <Input
                id="edit-position"
                type="text"
                placeholder="Enter position title"
                value={editForm.position}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, position: e.target.value }))
                }
                disabled={isUpdating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-jobType">Job Type</Label>
              <Select
                value={editForm.job_type}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, job_type: value }))
                }
                disabled={isUpdating}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Full Time</SelectItem>
                  <SelectItem value="1">Part Time</SelectItem>
                  <SelectItem value="2">Contract</SelectItem>
                  <SelectItem value="3">Internship</SelectItem>
                  <SelectItem value="4">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-slot">Available Slots</Label>
              <Input
                id="edit-slot"
                type="number"
                min="0"
                placeholder="Enter number of slots"
                value={editForm.slot}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, slot: e.target.value }))
                }
                disabled={isUpdating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Enter job description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, description: e.target.value }))
                }
                disabled={isUpdating}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancelEdit}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateJob} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Job"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
