import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Building2, FileText, BarChart3, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
              <Shield className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Zim-Tele and Radio License Co
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Streamlined telecommunications and broadcasting license management for regulatory authorities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="gap-2">
                <Link to="/login">
                  Access System
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
                <Link to="/register">
                  Register Company
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive License Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Efficiently manage CTL and PRSL licenses with powerful tools for regulators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Company Management</h3>
              <p className="text-muted-foreground">
                Maintain comprehensive records of licensed companies with full CRUD operations
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">License Tracking</h3>
              <p className="text-muted-foreground">
                Track CTL and PRSL licenses with automated expiry calculations and notifications
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reports & Analytics</h3>
              <p className="text-muted-foreground">
                Generate comprehensive reports in multiple formats with map visualizations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access the system or register your company to apply for licenses
          </p>
          <Button size="lg" asChild>
            <Link to="/login">
              Access System Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 License Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
