"use server";

import { Query } from "node-appwrite";
import { createAdminClient } from "../appwrite/server";
import { AvailableJobs } from "../domains/available-jobs.domain";

// Database information
const DATABASE_ID = "Core";
const AVAILABLE_JOBS_COLLECTION_ID = "AvailableJobs";

// Create a new available job
export async function createAvailableJob(
  availableJob: Omit<AvailableJobs, "$id">
) {
  try {
    const { databases } = await createAdminClient();

    const newAvailableJob = await databases.createDocument(
      DATABASE_ID,
      AVAILABLE_JOBS_COLLECTION_ID,
      "unique()",
      {
        name: availableJob.name,
        job_type: availableJob.job_type,
        position: availableJob.position,
        description: availableJob.description,
        slot: availableJob.slot,
      }
    );

    return {
      success: true,
      data: newAvailableJob,
    };
  } catch (error) {
    console.error("Error creating available job:", error);
    return {
      success: false,
      error: "Failed to create available job",
    };
  }
}

// Get a specific available job by ID
export async function getAvailableJob(availableJobId: string) {
  try {
    const { databases } = await createAdminClient();

    const availableJob = await databases.getDocument(
      DATABASE_ID,
      AVAILABLE_JOBS_COLLECTION_ID,
      availableJobId
    );

    return {
      success: true,
      data: availableJob,
    };
  } catch (error) {
    console.error("Error fetching available job:", error);
    return {
      success: false,
      error: "Failed to fetch available job",
    };
  }
}

// Find available jobs by position
export async function findAvailableJobsByPosition(position: string) {
  try {
    const { databases } = await createAdminClient();

    const response = await databases.listDocuments(
      DATABASE_ID,
      AVAILABLE_JOBS_COLLECTION_ID,
      [Query.equal("position", position)]
    );

    return {
      success: true,
      data: response.documents,
    };
  } catch (error) {
    console.error("Error finding available jobs by position:", error);
    return {
      success: false,
      error: "Failed to find available jobs",
    };
  }
}

// Get all available jobs
export async function getAllAvailableJobs() {
  try {
    const { databases } = await createAdminClient();

    const availableJobs = await databases.listDocuments(
      DATABASE_ID,
      AVAILABLE_JOBS_COLLECTION_ID,
      [
        Query.limit(1000), // Adjust the limit as needed
      ]
    );

    return {
      success: true,
      data: availableJobs.documents,
    };
  } catch (error) {
    console.error("Error fetching all available jobs:", error);
    return {
      success: false,
      error: "Failed to fetch available jobs",
    };
  }
}

// Update an available job
export async function updateAvailableJob(
  availableJobId: string,
  updatedJob: Partial<Omit<AvailableJobs, "$id">>
) {
  try {
    const { databases } = await createAdminClient();

    const updatedAvailableJob = await databases.updateDocument(
      DATABASE_ID,
      AVAILABLE_JOBS_COLLECTION_ID,
      availableJobId,
      updatedJob
    );

    return {
      success: true,
      data: updatedAvailableJob,
    };
  } catch (error) {
    console.error("Error updating available job:", error);
    return {
      success: false,
      error: "Failed to update available job",
    };
  }
}

// Delete an available job
export async function deleteAvailableJob(availableJobId: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      AVAILABLE_JOBS_COLLECTION_ID,
      availableJobId
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting available job:", error);
    return {
      success: false,
      error: "Failed to delete available job",
    };
  }
}

// Get available jobs by job type
export async function getAvailableJobsByType(jobType: number) {
  try {
    const { databases } = await createAdminClient();

    const response = await databases.listDocuments(
      DATABASE_ID,
      AVAILABLE_JOBS_COLLECTION_ID,
      [Query.equal("job_type", jobType)]
    );

    return {
      success: true,
      data: response.documents,
    };
  } catch (error) {
    console.error("Error fetching available jobs by type:", error);
    return {
      success: false,
      error: "Failed to fetch available jobs by type",
    };
  }
}

// Check if job has available slots
export async function checkJobAvailability(availableJobId: string) {
  try {
    const result = await getAvailableJob(availableJobId);

    if (!result.success || !result.data) {
      return {
        success: false,
        available: false,
        error: "Job not found",
      };
    }

    const hasSlots = result.data.slot > 0;

    return {
      success: true,
      available: hasSlots,
      remainingSlots: result.data.slot,
    };
  } catch (error) {
    console.error("Error checking job availability:", error);
    return {
      success: false,
      available: false,
      error: "Failed to check job availability",
    };
  }
}
