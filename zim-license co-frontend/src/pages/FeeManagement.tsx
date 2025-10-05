import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdjustFeesDialog from "@/components/dialogs/AdjustFeesDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Edit, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeeManagement = () => {
  const { toast } = useToast();
  const [adjustFeesOpen, setAdjustFeesOpen] = useState(false);

  // Current fee structure
  const currentFees = [
    {
      id: 1,
      licenseType: "CTL",
      licenseTypeName: "Carrier & Telecommunications License",
      applicationFee: 800,
      licenseFee: 100000000,
      effectiveDate: "2023-01-01",
      validityPeriod: "15 years",
      status: "Active",
    },
    {
      id: 2,
      licenseType: "PRSL",
      licenseTypeName: "Public Radio Station License",
      applicationFee: 350,
      licenseFee: 2000000,
      effectiveDate: "2023-01-01",
      validityPeriod: "10 years",
      status: "Active",
    },
  ];

  // Fee history
  const feeHistory = [
    {
      id: 1,
      licenseType: "CTL",
      previousAppFee: 750,
      newAppFee: 800,
      previousLicenseFee: 95000000,
      newLicenseFee: 100000000,
      changeDate: "2023-01-01",
      changeReason: "Annual inflation adjustment",
      approvedBy: "Admin",
    },
    {
      id: 2,
      licenseType: "PRSL",
      previousAppFee: 300,
      newAppFee: 350,
      previousLicenseFee: 1800000,
      newLicenseFee: 2000000,
      changeDate: "2023-01-01",
      changeReason: "Policy update",
      approvedBy: "Admin",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateChange = (oldValue: number, newValue: number) => {
    const change = ((newValue - oldValue) / oldValue) * 100;
    return change.toFixed(2);
  };

  return (
    <DashboardLayout userRole="regulator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
            <p className="text-muted-foreground">
              Manage license fees and application charges
            </p>
          </div>
          <Button className="gap-2" onClick={() => setAdjustFeesOpen(true)}>
            <Edit className="h-4 w-4" />
            Adjust Fees
          </Button>
        </div>

        {/* Current Fee Structure */}
        <div className="grid gap-4 md:grid-cols-2">
          {currentFees.map((fee) => (
            <Card key={fee.id} className="shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      {fee.licenseType}
                    </CardTitle>
                    <CardDescription>{fee.licenseTypeName}</CardDescription>
                  </div>
                  <Badge>{fee.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Application Fee</p>
                    <p className="text-2xl font-bold">{formatCurrency(fee.applicationFee)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">License Fee</p>
                    <p className="text-2xl font-bold">{formatCurrency(fee.licenseFee)}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Validity Period:</span>
                    <span className="font-medium">{fee.validityPeriod}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Effective Date:</span>
                    <span className="font-medium">{fee.effectiveDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fee Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue (2024)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$204M</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+12%</span> from last year
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Application Fees</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$98K</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+8%</span> this quarter
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">License Renewals</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$156M</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+15%</span> from last year
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Payments</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.3M</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-red-500" />
                <span className="text-red-500">3 overdue</span> payments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Fee Change History */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Fee Change History</CardTitle>
            <CardDescription>
              Historical records of fee adjustments and policy changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License Type</TableHead>
                    <TableHead>Previous App Fee</TableHead>
                    <TableHead>New App Fee</TableHead>
                    <TableHead>Previous License Fee</TableHead>
                    <TableHead>New License Fee</TableHead>
                    <TableHead>Change %</TableHead>
                    <TableHead>Change Date</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeHistory.map((record) => {
                    const appFeeChange = calculateChange(record.previousAppFee, record.newAppFee);
                    const licenseFeeChange = calculateChange(record.previousLicenseFee, record.newLicenseFee);
                    
                    return (
                      <TableRow key={record.id}>
                        <TableCell>
                          <Badge variant="outline">{record.licenseType}</Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(record.previousAppFee)}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(record.newAppFee)}
                        </TableCell>
                        <TableCell>{formatCurrency(record.previousLicenseFee)}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(record.newLicenseFee)}
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-3 w-3" />
                            +{licenseFeeChange}%
                          </span>
                        </TableCell>
                        <TableCell>{record.changeDate}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {record.changeReason}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Adjust Fees Dialog */}
      <AdjustFeesDialog 
        open={adjustFeesOpen} 
        onOpenChange={setAdjustFeesOpen}
        onSuccess={() => {
          toast({
            title: "Fees Updated",
            description: "The new fee structure will be effective from the specified date.",
          });
        }}
      />
    </DashboardLayout>
  );
};

export default FeeManagement;
