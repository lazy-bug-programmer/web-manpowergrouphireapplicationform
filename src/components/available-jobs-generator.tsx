"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createAvailableJob } from "@/lib/actions/available-jobs.action";
import { JobType } from "@/lib/domains/available-jobs.domain";
import { Loader2, Plus } from "lucide-react";

interface AvailableJobsGeneratorProps {
  onJobCreated: () => void;
}

export function AvailableJobsGenerator({
  onJobCreated,
}: AvailableJobsGeneratorProps) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [slot, setSlot] = useState("");
  const [jobType, setJobType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !position || !description || !slot || jobType === "") {
      setMessage("Please fill in all fields");
      return;
    }

    const slotNumber = parseInt(slot);
    if (isNaN(slotNumber) || slotNumber < 1) {
      setMessage("Please enter a valid slot number (minimum 1)");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const result = await createAvailableJob({
        name,
        job_type: parseInt(jobType) as JobType,
        position,
        description,
        slot: slotNumber,
      });

      if (result.success) {
        setMessage("Job created successfully!");
        setName("");
        setPosition("");
        setDescription("");
        setSlot("");
        setJobType("");
        onJobCreated();
      } else {
        setMessage(result.error || "Failed to create job");
      }
    } catch {
      setMessage("An error occurred while creating the job");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Available Job
        </CardTitle>
        <CardDescription>
          Add a new job position with details and available slots
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Job Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter job name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              type="text"
              placeholder="Enter position title"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobType">Job Type</Label>
            <Select
              value={jobType}
              onValueChange={setJobType}
              disabled={isLoading}
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
            <Label htmlFor="slot">Available Slots</Label>
            <Input
              id="slot"
              type="number"
              min="1"
              placeholder="Enter number of slots"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter job description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={4}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Job...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Job
              </>
            )}
          </Button>

          {message && (
            <p
              className={`text-sm ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
