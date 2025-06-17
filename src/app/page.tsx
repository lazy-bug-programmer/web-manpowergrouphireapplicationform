"use client";

import { AvailableJobsSection } from "@/components/available-jobs-section";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
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
            </div>
            <div className="flex items-center space-x-8">
              <a
                href="#solutions"
                className="hidden md:inline-block text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                Solutions
              </a>
              <Link
                href="/opportunities"
                className="hidden md:inline-block text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                Opportunities
              </Link>
              <a
                href="#stats"
                className="hidden md:inline-block text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                Industries
              </a>
              <a
                href="#footer"
                className="hidden md:inline-block text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                About
              </a>
              <Link
                href={"/apply"}
                className="bg-slate-800 text-white px-3 py-2 text-center rounded-lg font-semibold hover:bg-slate-700 transition-colors shadow-md"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white py-24 relative overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
            alt="Professional workspace"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                <span className="text-emerald-400 font-semibold text-sm">
                  TRUSTED WORLDWIDE
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Powering the
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {" "}
                  Future{" "}
                </span>
                of Work
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-slate-300 leading-relaxed max-w-3xl">
                We connect exceptional talent with forward-thinking
                organizations. ManpowerGroup delivers innovative workforce
                solutions that drive business success.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href="/opportunities">
                  <button className="bg-white text-slate-800 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-slate-50 transition-colors shadow-lg">
                    Find Opportunities
                  </button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1526&q=80"
                  alt="Professional team meeting"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    500K+
                  </div>
                  <div className="text-white">Jobs Filled Annually</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="solutions" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-slate-800/5 border border-slate-200 rounded-full mb-6">
              <span className="text-slate-600 font-semibold text-sm">
                OUR EXPERTISE
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Professional Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive workforce solutions designed to help organizations
              and professionals achieve excellence
            </p>
          </div>

          {/* Solutions Grid with Images */}
          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100 overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80"
                  alt="Workforce Solutions"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-10">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-6 -mt-8 relative z-10 shadow-lg">
                  <svg
                    className="w-8 h-8 text-slate-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Workforce Solutions
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Connect with exceptional talent through our comprehensive
                  staffing and strategic recruitment services.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100 overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Professional Development"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mb-6 -mt-8 relative z-10 shadow-lg">
                  <svg
                    className="w-8 h-8 text-emerald-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Professional Development
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Advance your workforce with cutting-edge training programs and
                  professional development initiatives.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100 overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Strategic Analytics"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-10">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center mb-6 -mt-8 relative z-10 shadow-lg">
                  <svg
                    className="w-8 h-8 text-cyan-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Strategic Analytics
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Make informed decisions with comprehensive data-driven
                  workforce insights and strategic analytics.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Content Section with Image */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Transforming Businesses Worldwide
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Our comprehensive approach to workforce management has helped
                thousands of organizations optimize their human capital and
                achieve sustainable growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-600">
                    Global talent acquisition
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-600">
                    Skills development programs
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-600">Workforce optimization</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Business meeting"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-6 shadow-lg">
                <div className="text-2xl font-bold text-slate-800 mb-1">
                  98%
                </div>
                <div className="text-slate-600 text-sm">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        className="py-24 bg-gradient-to-r from-slate-800 to-slate-700"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 text-center text-white">
            <div className="p-6">
              <div className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                75+
              </div>
              <div className="text-slate-300 font-medium text-lg">
                Countries & Territories
              </div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                4M+
              </div>
              <div className="text-slate-300 font-medium text-lg">
                People We Employ
              </div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                400K+
              </div>
              <div className="text-slate-300 font-medium text-lg">
                Clients Served
              </div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                70+
              </div>
              <div className="text-slate-300 font-medium text-lg">
                Years of Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Jobs Section */}
      <AvailableJobsSection />

      {/* How It Works Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="text-emerald-400 font-semibold text-sm">
                HOW IT WORKS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bringing Out The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Potential
              </span>{" "}
              In You
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Set your hours, work from home, and earn more your way!
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Fill Online Form
              </h3>
              <p className="text-slate-400">
                Complete our simple application form with your details and
                preferences
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Verify Details
              </h3>
              <p className="text-slate-400">
                Our team reviews and verifies your application and
                qualifications
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Get Contacted by Us
              </h3>
              <p className="text-slate-400">
                We&apos;ll reach out with opportunities that match your skills
                and goals
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Start Working
              </h3>
              <p className="text-slate-400">
                Begin your new career journey with flexible work arrangements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="text-emerald-400 font-semibold text-sm">
                CLIENT REVIEW
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Happy Customer{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Testimonial
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Felix Zeltner"
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 text-lg mb-4 leading-relaxed">
                    &quot;I love that I can find job info here without paying—
                    everything is free and accessible.&quot;
                  </p>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="font-semibold text-slate-800">
                      — Felix Zeltner
                    </p>
                    <p className="text-emerald-600 text-sm font-medium">
                      Marketing Analyst
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1680104073088-ad3ef1ba4a1c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Camelia"
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 text-lg mb-4 leading-relaxed">
                    &quot;This platform makes it easy to earn online while
                    enjoying a flexible freelance schedule.&quot;
                  </p>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="font-semibold text-slate-800">— Camelia</p>
                    <p className="text-emerald-600 text-sm font-medium">
                      Font Designer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
            <span className="text-emerald-400 font-semibold text-sm">
              START YOUR JOURNEY
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Advance Your Career?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who have elevated their careers
            through ManpowerGroup&apos;s comprehensive workforce solutions
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-12 py-5 rounded-lg font-semibold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Begin Application
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold">ManpowerGroup</span>
                  <div className="text-xs text-slate-400 font-medium">
                    WORKFORCE SOLUTIONS
                  </div>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Powering the world of work with innovative solutions for over 70
                years.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Workforce Solutions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Professional Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Strategic Analytics
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    News
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 ManpowerGroup. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
