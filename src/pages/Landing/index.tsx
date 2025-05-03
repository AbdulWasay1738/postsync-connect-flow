
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import { ArrowRight, CheckCircle, Instagram, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';

// Mock data for features and testimonials
const features = [
  {
    title: "Multi-Platform Publishing",
    description: "Schedule and publish content across all your social media accounts from a single dashboard.",
    icon: "📱"
  },
  {
    title: "Performance Analytics",
    description: "Track engagement, growth, and content performance with detailed analytics and reports.",
    icon: "📊"
  },
  {
    title: "Content Calendar",
    description: "Plan your content strategy with an intuitive drag-and-drop visual calendar.",
    icon: "📅"
  },
  {
    title: "AI-Generated Content",
    description: "Create captions, hashtags, and content ideas with our advanced AI tools.",
    icon: "🤖"
  },
  {
    title: "Bulk Scheduling",
    description: "Save time by scheduling multiple posts across different platforms at once.",
    icon: "⏱️"
  },
  {
    title: "Team Collaboration",
    description: "Work seamlessly with your team with approval workflows and shared calendars.",
    icon: "👥"
  }
];

const testimonials = [
  {
    quote: "Postsync revolutionized how we manage our social media. The AI caption generator alone saved us hours each week.",
    author: "Sarah Johnson",
    role: "Marketing Director, TechCorp",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=FF6B6B&color=fff"
  },
  {
    quote: "The analytics tools helped us increase engagement by 47% in just three months. Best investment for our small business.",
    author: "Michael Chen",
    role: "Owner, Urban Eats",
    avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=1A73E8&color=fff"
  },
  {
    quote: "As an influencer, I need to maintain a consistent presence. Postsync's scheduling tools make it so much easier.",
    author: "Leila Rodriguez",
    role: "Content Creator",
    avatar: "https://ui-avatars.com/api/?name=Leila+Rodriguez&background=FF6B6B&color=fff"
  }
];

const platforms = [
  { name: "Instagram", icon: <Instagram className="h-6 w-6" /> },
  { name: "Facebook", icon: <Facebook className="h-6 w-6" /> },
  { name: "LinkedIn", icon: <Linkedin className="h-6 w-6" /> },
  { name: "Twitter", icon: <Twitter className="h-6 w-6" /> },
  { name: "Pinterest", icon: <Twitter className="h-6 w-6" /> }, // Using Twitter icon as a replacement for Pinterest
  { name: "YouTube", icon: <Youtube className="h-6 w-6" /> },
];

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter leading-tight mb-6">
              Streamline Your Social Media Management
            </h1>
            <p className="text-lg md:text-xl text-postsync-muted mb-8 max-w-2xl mx-auto">
              Schedule, publish, and analyze all your social media content from one powerful platform. Save time with AI-generated captions and data-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-postsync-primary hover:bg-blue-700">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="#features">See Features</Link>
              </Button>
            </div>
            <div className="mt-8 text-sm text-postsync-muted">
              <p>No credit card required • 14-day free trial</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-postsync-backgroundAlt">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-lg text-postsync-muted">
              Everything you need to manage your social media presence effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-4">{feature.icon}</div>
                <h3 className="font-inter font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-postsync-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4">
              How It Works
            </h2>
            <p className="text-lg text-postsync-muted">
              Get started in minutes, see results instantly
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-postsync-primary font-inter font-bold">
                    1
                  </div>
                </div>
                <h3 className="font-inter font-semibold text-xl mb-3 text-center">Connect Your Platforms</h3>
                <p className="text-postsync-muted text-center">
                  Link all your social media accounts in a few clicks with our secure authorization process.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-postsync-primary font-inter font-bold">
                    2
                  </div>
                </div>
                <h3 className="font-inter font-semibold text-xl mb-3 text-center">Create & Schedule Content</h3>
                <p className="text-postsync-muted text-center">
                  Use our intuitive composer and AI tools to create engaging posts and schedule them across platforms.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-postsync-primary font-inter font-bold">
                    3
                  </div>
                </div>
                <h3 className="font-inter font-semibold text-xl mb-3 text-center">Measure & Optimize</h3>
                <p className="text-postsync-muted text-center">
                  Track performance with detailed analytics and use data-driven insights to improve your strategy.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-postsync-backgroundAlt">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-postsync-muted">
              Join thousands of satisfied social media managers and marketers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-gray-300" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8c-3.866 0-7 3.134-7 7v7h7v-7h-4c0-2.21 1.79-4 4-4V8zm12 0c-3.866 0-7 3.134-7 7v7h7v-7h-4c0-2.21 1.79-4 4-4V8z"></path>
                  </svg>
                </div>
                <p className="text-postsync-text mb-6 italic">{item.quote}</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-postsync-text">{item.author}</p>
                    <p className="text-sm text-postsync-muted">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Platforms Section */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4">
              Compatible Platforms
            </h2>
            <p className="text-lg text-postsync-muted">
              Manage all your social media from one place
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
            {platforms.map((platform, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  {platform.icon}
                </div>
                <p className="text-sm font-medium text-postsync-text">{platform.name}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-postsync-primary">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4 text-white">
              Ready to Transform Your Social Media Strategy?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of marketers and businesses who trust Postsync
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-postsync-primary hover:bg-gray-100">
              <Link to="/signup" className="inline-flex items-center">
                Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-6 text-sm text-white/80">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
