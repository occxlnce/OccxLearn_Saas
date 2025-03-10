import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Users, CheckCircle, BarChart, School, Calendar, FileText, PenTool, CheckCircle2, Clock, Award, Brain, Lightbulb, LucideShield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-orange-500">OccxLearn</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-black hover:text-orange-500 transition-colors">Features</a>
            <a href="#benefits" className="text-black hover:text-orange-500 transition-colors">Benefits</a>
            <a href="#pricing" className="text-black hover:text-orange-500 transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-orange-500 text-white hover:bg-orange-600">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Transform Your School Management</h1>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            The comprehensive platform designed for schools to simplify administration, enhance teaching, and improve the learning experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="default" className="bg-white text-orange-500 hover:bg-white/90">
                Start Free Trial
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Explore Features
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Powerful Features</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            OccxLearn offers a complete set of tools for both private and public schools to manage every aspect of education.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="card-hover border-t-4 border-t-orange-500 transform transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <Users className="h-10 w-10 text-orange-500 mb-4" />
                <CardTitle>Student & Teacher Management</CardTitle>
                <CardDescription>Effortlessly manage all your records</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Complete student profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Teacher qualification tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Role-based permissions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="card-hover border-t-4 border-t-orange-500 transform transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-orange-500 mb-4" />
                <CardTitle>Curriculum Management</CardTitle>
                <CardDescription>Organize all educational materials</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Syllabus repository</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Learning resource sharing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Module guides for students</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="card-hover border-t-4 border-t-orange-500 transform transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <BarChart className="h-10 w-10 text-orange-500 mb-4" />
                <CardTitle>Performance Tracking</CardTitle>
                <CardDescription>Monitor and analyze progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Comprehensive exam results</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Attendance monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Visualized progress reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="card-hover border-t-4 border-t-orange-500 transform transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <Calendar className="h-10 w-10 text-orange-500 mb-4" />
                <CardTitle>Timetable Management</CardTitle>
                <CardDescription>Effortless scheduling for everyone</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Interactive timetable builder</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Conflict detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Room allocation system</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="card-hover border-t-4 border-t-orange-500 transform transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <FileText className="h-10 w-10 text-orange-500 mb-4" />
                <CardTitle>Document Management</CardTitle>
                <CardDescription>Centralized document repository</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Secure file storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Permission-based access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Version control for documents</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="card-hover border-t-4 border-t-orange-500 transform transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <School className="h-10 w-10 text-orange-500 mb-4" />
                <CardTitle>School Analytics</CardTitle>
                <CardDescription>Data-driven decision making</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Performance trends</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Attendance insights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Resource utilization reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Benefits for Everyone</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            OccxLearn delivers unique advantages for each user role in your school
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Admin Benefits */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                <LucideShield className="h-10 w-10 text-orange-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Administrators</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>Complete oversight of school operations</span>
                </li>
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>Centralized management dashboard</span>
                </li>
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>Data-driven decision making tools</span>
                </li>
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>Streamlined resource allocation</span>
                </li>
              </ul>
            </div>

            {/* Teacher Benefits */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                <PenTool className="h-10 w-10 text-orange-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Teachers</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>Simplified lesson planning and delivery</span>
                </li>
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>Efficient grading and assessment tools</span>
                </li>
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>Quick attendance tracking</span>
                </li>
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>Enhanced student communication</span>
                </li>
              </ul>
            </div>

            {/* Student Benefits */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                <Brain className="h-10 w-10 text-orange-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Students</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>24/7 access to learning materials</span>
                </li>
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>Real-time access to grades and feedback</span>
                </li>
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>Personal timetable and schedule</span>
                </li>
                <li className="flex items-center text-left">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                  <span>Progress tracking and goal setting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Flexible Pricing Plans</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your school with transparent pricing and no hidden fees
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Monthly Plan */}
            <Card className="card-hover transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-orange-200 hover:border-orange-500">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Monthly</CardTitle>
                <div className="mt-4 mb-1">
                  <span className="text-3xl font-bold">$349</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <CardDescription>Billed monthly</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>All features included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited users</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Basic support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Regular updates</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Quarterly Plan */}
            <Card className="card-hover transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-orange-200 hover:border-orange-500">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Quarterly</CardTitle>
                <div className="mt-4 mb-1">
                  <span className="text-3xl font-bold">$299</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <CardDescription>Billed quarterly ($897)</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>All features included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited users</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Save 14%</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Get Started</Button>
              </CardFooter>
            </Card>

            {/* 6-Month Plan */}
            <Card className="card-hover transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-orange-200 hover:border-orange-500">
              <CardHeader className="text-center pb-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 font-medium transform rotate-0 translate-x-4 -translate-y-2">
                  Popular
                </div>
                <CardTitle className="text-xl">6-Month</CardTitle>
                <div className="mt-4 mb-1">
                  <span className="text-3xl font-bold">$249</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <CardDescription>Billed semi-annually ($1,494)</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>All features included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited users</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Save 29%</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Annual Plan */}
            <Card className="card-hover transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-orange-200 hover:border-orange-500">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Annual</CardTitle>
                <div className="mt-4 mb-1">
                  <span className="text-3xl font-bold">$199</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <CardDescription>Billed annually ($2,388)</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>All features included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited users</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>24/7 Premium support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Save 43%</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Get Started</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-bold text-orange-500">OccxLearn</span>
              </div>
              <p className="max-w-xs text-gray-400">
                Simplifying school management to empower education.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-orange-500">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#features" className="hover:text-orange-400">Features</a></li>
                  <li><a href="#benefits" className="hover:text-orange-400">Benefits</a></li>
                  <li><a href="#pricing" className="hover:text-orange-400">Pricing</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-orange-500">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-orange-400">About Us</a></li>
                  <li><a href="#" className="hover:text-orange-400">Contact</a></li>
                  <li><a href="#" className="hover:text-orange-400">Privacy Policy</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-orange-500">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-orange-400">Help Center</a></li>
                  <li><a href="#" className="hover:text-orange-400">Documentation</a></li>
                  <li><a href="#" className="hover:text-orange-400">Status</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 OccxLearn. All rights reserved. Developed by OCS</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
