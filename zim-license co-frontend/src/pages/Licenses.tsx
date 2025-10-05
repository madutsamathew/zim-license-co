import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import IssueLicenseDialog from "@/components/dialogs/IssueLicenseDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Edit, Trash2, Eye, Calculator, GitCompare, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { licenseService } from "@/services/licenseService";

const Licenses = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLicenseId, setSelectedLicenseId] = useState<string | null>(null);
  const [licenses, setLicenses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch licenses on mount and after updates
  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    setIsLoading(true);
    try {
      const data = await licenseService.getAllLicenses();
      // Transform the data to include calculated fields
      const transformedData = data.map((license: any) => {
        const issueDate = new Date(license.issueDate);
        const expiryDate = new Date(issueDate);
        expiryDate.setFullYear(expiryDate.getFullYear() + license.validityPeriodYears);
        
        const now = new Date();
        const yearsRemaining = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 365);
        const status = yearsRemaining < 1 ? "Expiring Soon" : "Active";
        
        return {
          ...license,
          expiryDate: expiryDate.toISOString().split('T')[0],
          yearsRemaining: Math.max(0, yearsRemaining).toFixed(1),
          status,
          applicationFee: `$${license.applicationFeePaid?.toLocaleString() || 0}`,
          licenseFee: `$${license.licenseFeePaid?.toLocaleString() || 0}`,
          type: license.licenseType,
          company: license.companyName,
        };
      });
      setLicenses(transformedData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch licenses",
        variant: "destructive",
      });
      // Use mock data if API fails
      setLicenses([
        {
          id: "1",
          company: "TeleCom Solutions Ltd",
          type: "CTL",
          issueDate: "2023-01-15",
          expiryDate: "2038-01-15",
          applicationFee: "$800",
          licenseFee: "$100,000,000",
          status: "Active",
          yearsRemaining: 13,
        },
        {
          id: "2",
          company: "Radio Wave Broadcasting",
          type: "PRSL",
          issueDate: "2019-06-20",
          expiryDate: "2029-06-20",
          applicationFee: "$350",
          licenseFee: "$2,000,000",
          status: "Active",
          yearsRemaining: 4,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateExpiry = (id: string) => {
    const license = licenses.find(l => l.id === id);
    if (license) {
      const expiryDate = new Date(license.expiryDate);
      const today = new Date();
      const daysRemaining = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      toast({ 
        title: "License Expiry Calculation", 
        description: `${license.company} license expires in ${daysRemaining} days (${license.yearsRemaining} years). Expiry date: ${license.expiryDate}`,
      });
    }
  };

  const handleDelete = (id: string) => {
    setSelectedLicenseId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedLicenseId) return;
    
    setIsDeleting(true);
    try {
      await licenseService.deleteLicense(selectedLicenseId);
      toast({
        title: "Success",
        description: "License deleted successfully",
      });
      fetchLicenses();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete license",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedLicenseId(null);
    }
  };

  const handleView = (id: string) => {
    const license = licenses.find(l => l.id === id);
    if (license) {
      toast({ 
        title: `${license.type} License - ${license.company}`, 
        description: `Issue Date: ${license.issueDate} | Expiry: ${license.expiryDate} | Status: ${license.status}`,
      });
    }
  };

  const handleEdit = (id: string) => {
    toast({ 
      title: "Edit feature", 
      description: "Edit functionality will be implemented in the next iteration",
    });
  };

  const handleCompare = () => {
    toast({ 
      title: "Compare Licenses", 
      description: "License comparison feature will be implemented in the next iteration",
    });
  };

  // Filter licenses based on search query
  const filteredLicenses = licenses.filter((license) =>
    license.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    license.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    license.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout userRole="regulator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Licenses</h1>
            <p className="text-muted-foreground">
              Manage telecommunications licenses (CTL & PRSL)
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleCompare}>
              <GitCompare className="h-4 w-4" />
              Compare Licenses
            </Button>
            <Button className="gap-2" onClick={() => setIssueDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Issue License
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-md border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                CTL Licenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground mt-1">
                15-year validity period
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                PRSL Licenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">102</div>
              <p className="text-xs text-muted-foreground mt-1">
                Variable validity period
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-warning/20 bg-gradient-to-br from-warning/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Expiring Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                Within 90 days
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Active Licenses</CardTitle>
            <CardDescription>
              View and manage all issued licenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search licenses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredLicenses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? "No licenses found matching your search" : "No licenses found"}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Application Fee</TableHead>
                      <TableHead>License Fee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLicenses.map((license) => (
                      <TableRow key={license.id}>
                        <TableCell className="font-medium">{license.company}</TableCell>
                        <TableCell>
                          <Badge variant={license.type === "CTL" ? "default" : "secondary"}>
                            {license.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{license.issueDate}</TableCell>
                        <TableCell>{license.expiryDate}</TableCell>
                        <TableCell>{license.applicationFee}</TableCell>
                        <TableCell>{license.licenseFee}</TableCell>
                        <TableCell>
                          <Badge
                            variant={license.status === "Active" ? "default" : "destructive"}
                          >
                            {license.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => calculateExpiry(license.id)}
                              title="Calculate expiry"
                            >
                              <Calculator className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleView(license.id)}
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleEdit(license.id)}
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDelete(license.id)}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <IssueLicenseDialog 
        open={issueDialogOpen} 
        onOpenChange={setIssueDialogOpen}
        onSuccess={fetchLicenses}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the license
              and all associated data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Licenses;
