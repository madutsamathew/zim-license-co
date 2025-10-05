import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import AddCompanyDialog from "@/components/dialogs/AddCompanyDialog";
import IssueLicenseDialog from "@/components/dialogs/IssueLicenseDialog";
import AdjustFeesDialog from "@/components/dialogs/AdjustFeesDialog";
import { Building2, FileText, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  // Mock user role - replace with actual auth context
  const userRole: 'admin' | 'regulator' | 'user' = 'regulator';

  const [addCompanyOpen, setAddCompanyOpen] = useState(false);
  const [issueLicenseOpen, setIssueLicenseOpen] = useState(false);
  const [adjustFeesOpen, setAdjustFeesOpen] = useState(false);

  const recentLicenses = [
    { id: 1, company: "TeleCom Solutions", type: "CTL", status: "Active", expiry: "2038-12-15" },
    { id: 2, company: "Radio Wave Inc", type: "PRSL", status: "Active", expiry: "2029-06-20" },
    { id: 3, company: "Mobile Connect", type: "CTL", status: "Expiring Soon", expiry: "2025-11-30" },
  ];

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of Zim-Tele and Radio License Co
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Companies"
            value="124"
            description="Registered companies"
            icon={Building2}
            variant="default"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Licenses"
            value="187"
            description="Currently valid"
            icon={FileText}
            variant="success"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Expiring Soon"
            value="12"
            description="Within 90 days"
            icon={AlertTriangle}
            variant="warning"
          />
          <StatCard
            title="Total Revenue"
            value="$204M"
            description="License fees collected"
            icon={DollarSign}
            variant="success"
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 shadow-md">
            <CardHeader>
              <CardTitle>Recent Licenses</CardTitle>
              <CardDescription>Latest license activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLicenses.map((license) => (
                  <div
                    key={license.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{license.company}</p>
                      <p className="text-sm text-muted-foreground">
                        Expires: {license.expiry}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{license.type}</Badge>
                      <Badge
                        variant={license.status === "Active" ? "default" : "destructive"}
                      >
                        {license.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/licenses')}
              >
                View All Licenses
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-3 shadow-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setAddCompanyOpen(true)}
              >
                <Building2 className="mr-2 h-4 w-4" />
                Add New Company
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setIssueLicenseOpen(true)}
              >
                <FileText className="mr-2 h-4 w-4" />
                Issue New License
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setAdjustFeesOpen(true)}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Adjust Fees
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  toast({
                    title: "Generating Report",
                    description: "Your comprehensive license report is being generated. This may take a few moments.",
                  });
                  // In a real app, this would trigger report generation
                  setTimeout(() => {
                    toast({
                      title: "Report Ready!",
                      description: "Your report has been generated and is ready for download.",
                    });
                  }, 2000);
                }}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <AddCompanyDialog 
        open={addCompanyOpen} 
        onOpenChange={setAddCompanyOpen}
        onSuccess={() => {
          toast({
            title: "Success",
            description: "Company added successfully! Navigate to Companies page to view.",
          });
        }}
      />
      <IssueLicenseDialog 
        open={issueLicenseOpen} 
        onOpenChange={setIssueLicenseOpen}
        onSuccess={() => {
          toast({
            title: "Success",
            description: "License issued successfully! Navigate to Licenses page to view.",
          });
        }}
      />
      <AdjustFeesDialog 
        open={adjustFeesOpen} 
        onOpenChange={setAdjustFeesOpen}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
