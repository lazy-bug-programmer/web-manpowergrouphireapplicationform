"use client";

import { ApplicationForm } from "@/components/application-form";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              {/* Professional Logo */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-800 tracking-tight">
                  ManpowerGroup
                </span>
                <div className="text-xs text-slate-500 font-medium tracking-wide">
                  WORKFORCE SOLUTIONS
                </div>
              </div>
            </Link>
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Application Form Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-block p-3 bg-slate-800/5 border border-slate-200 rounded-2xl mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-700"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-4">
                Join Our Team
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mb-6"></div>
              <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
                We&apos;re seeking exceptional individuals to help shape the
                future of work. Please share your professional details to begin
                your journey with us.
              </p>
            </div>
            <ApplicationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
