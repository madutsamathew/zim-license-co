import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { licenseService } from "@/services/licenseService";
import { Loader2 } from "lucide-react";

const licenseFormSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  licenseType: z.enum(["CTL", "PRSL"], {
    required_error: "Please select a license type",
  }),
  email: z.string().email("Invalid email address"),
  issueDate: z.string().min(1, "Issue date is required"),
  validityPeriodYears: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Validity period must be a positive number",
  }),
  applicationFeePaid: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Application fee must be a positive number",
  }),
  licenseFeePaid: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "License fee must be a positive number",
  }),
  latitude: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= -90 && Number(val) <= 90, {
    message: "Latitude must be between -90 and 90",
  }),
  longitude: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= -180 && Number(val) <= 180, {
    message: "Longitude must be between -180 and 180",
  }),
});

type LicenseFormValues = z.infer<typeof licenseFormSchema>;

interface IssueLicenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const IssueLicenseDialog = ({ open, onOpenChange, onSuccess }: IssueLicenseDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LicenseFormValues>({
    resolver: zodResolver(licenseFormSchema),
    defaultValues: {
      companyName: "",
      licenseType: undefined,
      email: "",
      issueDate: new Date().toISOString().split('T')[0],
      validityPeriodYears: "",
      applicationFeePaid: "",
      licenseFeePaid: "",
      latitude: "",
      longitude: "",
    },
  });

  const onSubmit = async (data: LicenseFormValues) => {
    setIsLoading(true);
    try {
      const licenseData = {
        companyName: data.companyName,
        licenseType: data.licenseType as "CTL" | "PRSL",
        email: data.email,
        issueDate: data.issueDate,
        validityPeriodYears: Number(data.validityPeriodYears),
        applicationFeePaid: Number(data.applicationFeePaid),
        licenseFeePaid: Number(data.licenseFeePaid),
        gpsCoordinates: {
          lat: Number(data.latitude),
          lng: Number(data.longitude),
        },
      };

      await licenseService.createLicense(licenseData);
      
      toast({
        title: "Success!",
        description: "License issued successfully",
      });

      form.reset();
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to issue license",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Issue New License</DialogTitle>
          <DialogDescription>
            Issue a new telecommunications license (CTL or PRSL)
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="TeleCom Solutions Ltd" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="licenseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CTL">CTL - Carrier & Telecommunications License</SelectItem>
                      <SelectItem value="PRSL">PRSL - Public Radio Station License</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="info@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="issueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="validityPeriodYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Validity (Years)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="applicationFeePaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Fee ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="800" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="licenseFeePaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Fee ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="-17.8252" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="31.0335" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Issue License
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default IssueLicenseDialog;
