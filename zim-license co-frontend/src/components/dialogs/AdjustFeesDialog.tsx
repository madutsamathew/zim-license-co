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
  FormDescription,
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
import { Loader2 } from "lucide-react";

const feesFormSchema = z.object({
  licenseType: z.enum(["CTL", "PRSL"], {
    required_error: "Please select a license type",
  }),
  applicationFee: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Application fee must be a positive number",
  }),
  licenseFee: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "License fee must be a positive number",
  }),
  effectiveDate: z.string().min(1, "Effective date is required"),
});

type FeesFormValues = z.infer<typeof feesFormSchema>;

interface AdjustFeesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const AdjustFeesDialog = ({ open, onOpenChange, onSuccess }: AdjustFeesDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FeesFormValues>({
    resolver: zodResolver(feesFormSchema),
    defaultValues: {
      licenseType: undefined,
      applicationFee: "",
      licenseFee: "",
      effectiveDate: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: FeesFormValues) => {
    setIsLoading(true);
    try {
      // In a real application, this would make an API call to update fee structures
      // For now, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: `Fees adjusted for ${data.licenseType} license type`,
      });

      form.reset();
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to adjust fees",
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
          <DialogTitle>Adjust License Fees</DialogTitle>
          <DialogDescription>
            Update application and license fees for CTL or PRSL license types
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormDescription>
                    Current CTL fees: App $800, License $100M | PRSL fees: App $350, License $2M
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicationFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Fee ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="800" {...field} />
                  </FormControl>
                  <FormDescription>
                    One-time fee for license application processing
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="licenseFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Fee ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100000000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Annual or one-time license operational fee
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="effectiveDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effective Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    When the new fee structure will take effect
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                Update Fees
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdjustFeesDialog;
