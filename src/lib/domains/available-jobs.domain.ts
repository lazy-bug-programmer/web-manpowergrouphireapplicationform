export interface AvailableJobs {
  $id: string | undefined;
  name: string;
  job_type: JobType;
  position: string;
  description: string;
  slot: number;
}

export enum JobType {
  FullTime,
  PartTime,
  Contract,
  Internship,
  Freelance,
}
