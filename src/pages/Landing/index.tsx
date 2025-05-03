
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import { ArrowRight, CheckCircle } from 'lucide-react';

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
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    quote: "The analytics tools helped us increase engagement by 47% in just three months. Best investment for our small business.",
    author: "Michael Chen",
    role: "Owner, Urban Eats",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    quote: "As an influencer, I need to maintain a consistent presence. Postsync's scheduling tools make it so much easier.",
    author: "Leila Rodriguez",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  }
];

const platforms = [
  { 
    name: "Instagram", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png"
  },
  { 
    name: "Facebook", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/240px-Facebook_Logo_%282019%29.png"
  },
  { 
    name: "LinkedIn", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png" 
  },
  { 
    name: "Twitter", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/240px-Logo_of_Twitter.svg.png"
  },
  { 
    name: "Pinterest", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Pinterest_Logo.svg/220px-Pinterest_Logo.svg.png"
  },
  { 
    name: "YouTube", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/159px-YouTube_full-color_icon_%282017%29.svg.png"
  },
];

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background to-accent/30 dark:from-background dark:to-accent/10">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-2 inline-flex items-center justify-center">
                <span className="text-white font-bold text-2xl">PostSync</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter leading-tight mb-6 gradient-text">
              Streamline Your Social Media Management
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule, publish, and analyze all your social media content from one powerful platform. Save time with AI-generated captions and data-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="#features">See Features</Link>
              </Button>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              <p>No credit card required • 14-day free trial</p>
            </div>
          </div>
          
          {/* Platform logos */}
          <div className="mt-16">
            <p className="text-center text-sm font-medium text-muted-foreground mb-6">
              SUPPORTS ALL MAJOR PLATFORMS
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {platforms.map((platform, index) => (
                <div key={index} className="transform transition-transform hover:-translate-y-1">
                  <img 
                    src={platform.logo} 
                    alt={platform.name} 
                    className="h-8 sm:h-10 object-contain"
                    title={platform.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4 gradient-text">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage your social media presence effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-6 rise-on-hover">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-inter font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-accent/20 dark:bg-accent/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4 gradient-text">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes, see results instantly
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="glass-card p-6 rise-on-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-inter font-bold">
                    1
                  </div>
                </div>
                <h3 className="font-inter font-semibold text-xl mb-3 text-center">Connect Your Platforms</h3>
                <p className="text-muted-foreground text-center">
                  Link all your social media accounts in a few clicks with our secure authorization process.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="glass-card p-6 rise-on-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-inter font-bold">
                    2
                  </div>
                </div>
                <h3 className="font-inter font-semibold text-xl mb-3 text-center">Create & Schedule Content</h3>
                <p className="text-muted-foreground text-center">
                  Use our intuitive composer and AI tools to create engaging posts and schedule them across platforms.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="glass-card p-6 rise-on-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-inter font-bold">
                    3
                  </div>
                </div>
                <h3 className="font-inter font-semibold text-xl mb-3 text-center">Measure & Optimize</h3>
                <p className="text-muted-foreground text-center">
                  Track performance with detailed analytics and use data-driven insights to improve your strategy.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4 gradient-text">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied social media managers and marketers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div key={index} className="glass-card p-6 md:p-8 rise-on-hover">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-primary/50" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8c-3.866 0-7 3.134-7 7v7h7v-7h-4c0-2.21 1.79-4 4-4V8zm12 0c-3.866 0-7 3.134-7 7v7h7v-7h-4c0-2.21 1.79-4 4-4V8z"></path>
                  </svg>
                </div>
                <p className="text-foreground mb-6 italic">{item.quote}</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-foreground">{item.author}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/90 to-blue-700/90 dark:from-primary/80 dark:to-blue-900/80">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4 text-white">
              Ready to Transform Your Social Media Strategy?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of marketers and businesses who trust Postsync
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/signup" className="inline-flex items-center">
                Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-white">
              <div className="flex items-center justify-center sm:justify-start">
                <CheckCircle className="h-5 w-5 mr-2 text-white/80" /> 
                <span className="text-sm">No credit card</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <CheckCircle className="h-5 w-5 mr-2 text-white/80" /> 
                <span className="text-sm">14-day free trial</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <CheckCircle className="h-5 w-5 mr-2 text-white/80" /> 
                <span className="text-sm">Cancel anytime</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <CheckCircle className="h-5 w-5 mr-2 text-white/80" /> 
                <span className="text-sm">24/7 support</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
