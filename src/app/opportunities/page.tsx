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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getAllAvailableJobs } from "@/lib/actions/available-jobs.action";
import { AvailableJobs, JobType } from "@/lib/domains/available-jobs.domain";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Building2,
  Search,
  Filter,
} from "lucide-react";

export default function OpportunitiesPage() {
  const [jobs, setJobs] = useState<AvailableJobs[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<AvailableJobs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState<string>("all");

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
        const jobsData = result.data as unknown as AvailableJobs[];
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by job type
    if (selectedJobType !== "all") {
      filtered = filtered.filter(
        (job) => job.job_type === parseInt(selectedJobType)
      );
    }

    setFilteredJobs(filtered);
  };

  const scrollToApplication = () => {
    const applicationSection = document.getElementById("careers");
    if (applicationSection) {
      applicationSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not on home page, navigate to home with hash
      window.location.href = "/#careers";
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, selectedJobType, jobs]);

  const jobTypes = Array.from(new Set(jobs.map((job) => job.job_type)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="text-emerald-400 font-semibold text-sm">
                CAREER OPPORTUNITIES
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Next{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Career Move
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Explore exciting opportunities with ManpowerGroup. Join our
              dynamic team and shape the future of work with flexible positions
              and competitive benefits.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search jobs by title, position, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select
                  value={selectedJobType}
                  onValueChange={setSelectedJobType}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {jobTypes.map((jobType) => (
                      <SelectItem key={jobType} value={jobType.toString()}>
                        <div className="flex items-center gap-2">
                          {getJobTypeIcon(jobType)}
                          {getJobTypeLabel(jobType)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {filteredJobs.length} of {jobs.length}{" "}
              {jobs.length === 1 ? "position" : "positions"}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
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
                {searchTerm || selectedJobType !== "all"
                  ? "No matching positions found"
                  : "No positions available"}
              </h3>
              <p className="text-slate-500 max-w-md mx-auto mb-6">
                {searchTerm || selectedJobType !== "all"
                  ? "Try adjusting your search criteria or filters to find more opportunities."
                  : "We don't have any open positions at the moment. Please check back later for new opportunities."}
              </p>
              {(searchTerm || selectedJobType !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedJobType("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                        <Badge className={getJobTypeBadgeClass(job.job_type)}>
                          <div className="flex items-center gap-1">
                            {getJobTypeIcon(job.job_type)}
                            {getJobTypeLabel(job.job_type)}
                          </div>
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-600">
                          Available
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            job.slot > 0 ? "text-emerald-600" : "text-red-500"
                          }`}
                        >
                          {job.slot} {job.slot === 1 ? "slot" : "slots"}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors line-clamp-2">
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
                            {job.slot} {job.slot === 1 ? "opening" : "openings"}
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
          )}

          {/* CTA Section */}
          {filteredJobs.length > 0 && (
            <div className="mt-16 text-center bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Ready to Take the Next Step?
              </h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Don&apos;t see the perfect fit? Apply anyway! We&apos;re always
                looking for talented individuals to join our growing team. Your
                next opportunity might be just around the corner.
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
                <Link href="/">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 rounded-xl font-semibold"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
