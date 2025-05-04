import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import { ArrowRight, CheckCircle } from 'lucide-react';

// Platform logos with actual URLs
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
    name: "YouTube", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/159px-YouTube_full-color_icon_%282017%29.svg.png"
  },
  { 
    name: "TikTok", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/240px-TikTok_logo.svg.png"
  },
];

// Features with updated descriptions
const features = [
  {
    title: "Multi-Platform Publishing",
    description: "Schedule and publish content across all your social media accounts from one intuitive dashboard.",
    icon: "🌐"
  },
  {
    title: "Performance Analytics",
    description: "Track engagement, growth, and content performance with interactive analytics dashboards.",
    icon: "📊"
  },
  {
    title: "Content Calendar",
    description: "Plan your content strategy visually with our drag-and-drop calendar interface.",
    icon: "📅"
  },
  {
    title: "AI-Generated Content",
    description: "Create engaging captions, hashtags, and content ideas with our AI assistant.",
    icon: "✨"
  },
  {
    title: "Bulk Scheduling",
    description: "Save time by scheduling multiple posts across different platforms at once.",
    icon: "⏱️"
  },
  {
    title: "Team Collaboration",
    description: "Work seamlessly with your team using approval workflows and shared content libraries.",
    icon: "👥"
  }
];

// Testimonials
const testimonials = [
  {
    quote: "PostSync transformed how we manage our social presence. Their AI caption feature alone saves us hours every week.",
    author: "Sarah Johnson",
    role: "Marketing Director, TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    quote: "The analytics tools helped us increase engagement by 47% in just three months. Best ROI for our small business.",
    author: "Michael Chen",
    role: "Owner, Urban Eats",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    quote: "As a content creator, I need consistency across platforms. PostSync's scheduling tools make it effortless.",
    author: "Leila Rodriguez",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  }
];

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      {/* Navigation bar with login/signup */}
      <nav className="py-4 px-6 bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="PostSync Logo" className="h-10 w-10" />
            <span className="font-inter font-semibold text-xl">Postsync</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-foreground hover:text-primary">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - More minimalist and modern */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-accent/10 dark:from-background dark:to-accent/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <img src="/logo.svg" alt="PostSync Logo" className="h-20 w-20" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter leading-tight mb-6">
              Streamline Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-postsync-accent to-postsync-primary">Social Media</span> Management
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule, publish, and analyze all your social media content from one powerful platform. Save time with AI-powered features.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-postsync-primary hover:bg-postsync-secondary transition-colors">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="#features">Explore Features</Link>
              </Button>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              <p>No credit card required • 14-day free trial</p>
            </div>
          </div>
          
          {/* Platform logos - using actual logos */}
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
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage your social media presence effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} feature={feature} />
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-accent/10 dark:bg-accent/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes, see results instantly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-border z-0"></div>
            
            <Step number={1} title="Connect Your Platforms" description="Link all your social media accounts in a few clicks with our secure authorization process." />
            <Step number={2} title="Create & Schedule Content" description="Use our intuitive composer and AI tools to create engaging posts and schedule them across platforms." />
            <Step number={3} title="Measure & Optimize" description="Track performance with detailed analytics and use data-driven insights to improve your strategy." />
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied social media managers and marketers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <TestimonialCard key={index} testimonial={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section - Updated colors */}
      <section className="py-16 bg-gradient-to-r from-postsync-primary/90 to-postsync-accent/50 dark:from-postsync-primary/80 dark:to-postsync-accent/30 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4">
              Ready to Transform Your Social Media Strategy?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join thousands of marketers and businesses who trust PostSync
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-postsync-primary hover:bg-gray-100">
              <Link to="/signup" className="inline-flex items-center">
                Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-white">
              <Feature text="No credit card" />
              <Feature text="14-day free trial" />
              <Feature text="Cancel anytime" />
              <Feature text="24/7 support" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

// Helper components 
const Feature = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center sm:justify-start">
    <CheckCircle className="h-5 w-5 mr-2 opacity-80" /> 
    <span className="text-sm">{text}</span>
  </div>
);

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: string;
  };
}

const Card = ({ feature }: FeatureCardProps) => (
  <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
    <div className="text-3xl mb-4">{feature.icon}</div>
    <h3 className="font-inter font-semibold text-xl mb-3">{feature.title}</h3>
    <p className="text-muted-foreground">{feature.description}</p>
  </div>
);

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step = ({ number, title, description }: StepProps) => (
  <div className="relative z-10">
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-postsync-primary flex items-center justify-center text-white font-semibold text-lg mb-4">
        {number}
      </div>
      <h3 className="font-inter font-semibold text-xl mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4 text-postsync-accent">
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </div>
    <p className="text-foreground mb-6">{testimonial.quote}</p>
    <div className="flex items-center">
      <img
        src={testimonial.avatar}
        alt={testimonial.author}
        className="w-10 h-10 rounded-full object-cover mr-4"
      />
      <div>
        <p className="font-inter font-semibold text-foreground">{testimonial.author}</p>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

export default LandingPage;
