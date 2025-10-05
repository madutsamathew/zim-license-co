import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AddCompanyDialog from "@/components/dialogs/AddCompanyDialog";
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
import { Plus, Search, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { companyService } from "@/services/companyService";

const Companies = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch companies on mount and after updates
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const data = await companyService.getAllCompanies();
      setCompanies(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch companies",
        variant: "destructive",
      });
      // Use mock data if API fails
      setCompanies([
        {
          id: "1",
          name: "TeleCom Solutions Ltd",
          email: "info@telecom.com",
          contactPerson: "John Smith",
          address: "123 Main St, Capital City",
          gpsCoordinates: { lat: -17.8252, lng: 31.0335 },
          licenses: 2,
          status: "Active",
        },
        {
          id: "2",
          name: "Radio Wave Broadcasting",
          email: "contact@radiowave.com",
          contactPerson: "Sarah Johnson",
          address: "456 Radio Ave, Metro City",
          gpsCoordinates: { lat: -17.8252, lng: 31.0335 },
          licenses: 1,
          status: "Active",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    toast({ 
      title: "Edit feature", 
      description: "Edit functionality will be implemented in the next iteration",
    });
  };

  const handleDelete = (id: string) => {
    setSelectedCompanyId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCompanyId) return;
    
    setIsDeleting(true);
    try {
      await companyService.deleteCompany(selectedCompanyId);
      toast({
        title: "Success",
        description: "Company deleted successfully",
      });
      fetchCompanies();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete company",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedCompanyId(null);
    }
  };

  const handleView = (id: string) => {
    const company = companies.find(c => c.id === id);
    if (company) {
      toast({ 
        title: company.name, 
        description: `Contact: ${company.contactPerson} | Email: ${company.email}`,
      });
    }
  };

  // Filter companies based on search query
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout userRole="regulator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
            <p className="text-muted-foreground">
              Manage licensed companies and their information
            </p>
          </div>
          <Button className="gap-2" onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Registered Companies</CardTitle>
            <CardDescription>
              View and manage all companies in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search companies..."
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
              ) : filteredCompanies.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? "No companies found matching your search" : "No companies found"}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead className="text-center">Licenses</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{company.contactPerson}</TableCell>
                        <TableCell>{company.email}</TableCell>
                        <TableCell>{company.address}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">{company.licenses || 0}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{company.status || "Active"}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleView(company.id)}
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(company.id)}
                              title="Edit company"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(company.id)}
                              title="Delete company"
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
      <AddCompanyDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onSuccess={fetchCompanies}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the company
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

export default Companies;
