"use client";

import { useState } from "react";
import { AvailableJobsGenerator } from "@/components/available-jobs-generator";
import { AvailableJobsTable } from "@/components/available-jobs-table";

export default function AvailableJobsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleJobCreated = () => {
    // Increment refreshTrigger to force AvailableJobsTable to reload
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Available Jobs
        </h1>
        <p className="text-muted-foreground mt-2">
          Create and manage available job positions for applicants.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <AvailableJobsGenerator onJobCreated={handleJobCreated} />
        <AvailableJobsTable refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
