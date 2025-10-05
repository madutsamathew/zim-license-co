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
import { useToast } from "@/hooks/use-toast";
import { companyService } from "@/services/companyService";
import { Loader2 } from "lucide-react";

const companyFormSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contactPerson: z.string().min(2, "Contact person must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  latitude: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= -90 && Number(val) <= 90, {
    message: "Latitude must be between -90 and 90",
  }),
  longitude: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= -180 && Number(val) <= 180, {
    message: "Longitude must be between -180 and 180",
  }),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

interface AddCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const AddCompanyDialog = ({ open, onOpenChange, onSuccess }: AddCompanyDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contactPerson: "",
      address: "",
      latitude: "",
      longitude: "",
    },
  });

  const onSubmit = async (data: CompanyFormValues) => {
    setIsLoading(true);
    try {
      const companyData = {
        name: data.name,
        email: data.email,
        contactPerson: data.contactPerson,
        address: data.address,
        gpsCoordinates: {
          lat: Number(data.latitude),
          lng: Number(data.longitude),
        },
      };

      await companyService.createCompany(companyData);
      
      toast({
        title: "Success!",
        description: "Company added successfully",
      });

      form.reset();
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add company",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
          <DialogDescription>
            Register a new company in the licensing system
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
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
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
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

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street, City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                Add Company
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCompanyDialog;
