"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllAvailableJobs } from "@/lib/actions/available-jobs.action";
import { AvailableJobs, JobType } from "@/lib/domains/available-jobs.domain";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Building2,
} from "lucide-react";

export function AvailableJobsSection() {
  const [jobs, setJobs] = useState<AvailableJobs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null);

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

  const getJobTypeIcon = (jobType: JobType) => {
    switch (jobType) {
      case JobType.FullTime:
        return <Building2 className="h-4 w-4" />;
      case JobType.PartTime:
        return <Clock className="h-4 w-4" />;
      case JobType.Contract:
        return <Briefcase className="h-4 w-4" />;
      case JobType.Internship:
        return <Users className="h-4 w-4" />;
      case JobType.Freelance:
        return <MapPin className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  const getJobTypeBadgeClass = (jobType: JobType) => {
    switch (jobType) {
      case JobType.FullTime:
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
      case JobType.PartTime:
        return "bg-blue-100 text-blue-700 hover:bg-blue-200";
      case JobType.Contract:
        return "bg-purple-100 text-purple-700 hover:bg-purple-200";
      case JobType.Internship:
        return "bg-orange-100 text-orange-700 hover:bg-orange-200";
      case JobType.Freelance:
        return "bg-cyan-100 text-cyan-700 hover:bg-cyan-200";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const result = await getAllAvailableJobs();
      if (result.success) {
        // Limit to 3 latest jobs for home page
        const jobsData = (result.data as unknown as AvailableJobs[]).slice(
          0,
          3
        );
        setJobs(jobsData);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs =
    selectedJobType !== null
      ? jobs.filter((job) => job.job_type === selectedJobType)
      : jobs;

  const jobTypes = Array.from(new Set(jobs.map((job) => job.job_type)));

  const scrollToApplication = () => {
    document.getElementById("careers")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-slate-800/5 border border-slate-200 rounded-full mb-6">
            <span className="text-slate-600 font-semibold text-sm">
              CURRENT OPENINGS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Available{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
              Opportunities
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover exciting career opportunities that match your skills and
            aspirations. Join our dynamic team and shape the future of work.
          </p>
        </div>

        {/* Job Type Filter - Only show if there are multiple types */}
        {jobTypes.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              variant={selectedJobType === null ? "default" : "outline"}
              onClick={() => setSelectedJobType(null)}
              className="rounded-full"
            >
              All Jobs ({jobs.length})
            </Button>
            {jobTypes.map((jobType) => (
              <Button
                key={jobType}
                variant={selectedJobType === jobType ? "default" : "outline"}
                onClick={() => setSelectedJobType(jobType)}
                className="rounded-full gap-2"
              >
                {getJobTypeIcon(jobType)}
                {getJobTypeLabel(jobType)} (
                {jobs.filter((j) => j.job_type === jobType).length})
              </Button>
            ))}
          </div>
        )}

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
              <span className="text-slate-600 font-medium">
                Loading opportunities...
              </span>
            </div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-3">
              No positions available
            </h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              {selectedJobType !== null
                ? `No ${getJobTypeLabel(
                    selectedJobType
                  ).toLowerCase()} positions are currently available. Try selecting a different job type.`
                : "We don't have any open positions at the moment. Please check back later for new opportunities."}
            </p>
            <Link href="/opportunities">
              <Button variant="outline">View All Opportunities</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredJobs.map((job) => (
                <Card
                  key={job.$id}
                  className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-slate-50 overflow-hidden group cursor-pointer"
                  onClick={scrollToApplication}
                >
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <Badge className={getJobTypeBadgeClass(job.job_type)}>
                            <div className="flex items-center gap-1">
                              {getJobTypeIcon(job.job_type)}
                              {getJobTypeLabel(job.job_type)}
                            </div>
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-600">
                          Available Slots
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            job.slot > 0 ? "text-emerald-600" : "text-red-500"
                          }`}
                        >
                          {job.slot}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                      {job.name}
                    </CardTitle>
                    <CardDescription className="text-slate-600 font-medium">
                      {job.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>Remote/Hybrid</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>
                            {job.slot} {job.slot === 1 ? "spot" : "spots"}
                          </span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="bg-slate-800 hover:bg-slate-700 text-white gap-2 group-hover:scale-105 transition-transform duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToApplication();
                        }}
                      >
                        Apply Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Show More Button */}
            <div className="text-center mb-12">
              <Link href="/opportunities">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 rounded-xl font-semibold border-2 hover:bg-slate-50 transition-all duration-300"
                >
                  Show More Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Don&apos;t see the perfect fit? Apply anyway! We&apos;re always
                looking for talented individuals to join our growing team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={scrollToApplication}
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link href="/opportunities">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 rounded-xl font-semibold"
                  >
                    View All Opportunities
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
