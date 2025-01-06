import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LaptopBasicInfo } from "@/components/create-laptop/LaptopBasicInfo";
import { LaptopDisplayInfo } from "@/components/create-laptop/LaptopDisplayInfo";
import { LaptopPerformanceInfo } from "@/components/create-laptop/LaptopPerformanceInfo";
import { LaptopGraphicsInfo } from "@/components/create-laptop/LaptopGraphicsInfo";
import { LaptopAdditionalInfo } from "@/components/create-laptop/LaptopAdditionalInfo";
import { LaptopPreviewCard } from "@/components/create-laptop/LaptopPreviewCard";
import { LaptopCreate } from "@/types/laptop";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const CreateLaptop = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<LaptopCreate>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, any> = {};
    
    formData.forEach((value, key) => {
      if (key === "price" || key === "weight") {
        data[key] = value ? Number(value) : null;
      } else if (key === "cpu_cores" || key === "cpu_threads") {
        data[key] = value ? Number(value) : null;
      } else {
        data[key] = value || null;
      }
    });

    setFormData(data);
  };

  const resetForm = (form: HTMLFormElement) => {
    form.reset();
    setFormData({});
    setValidationErrors([]);
    setShowPreview(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors([]);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      ...Object.fromEntries(formData),
      is_available: formData.get("is_available") === "true",
      price: Number(formData.get("price")),
      weight: formData.get("weight") ? Number(formData.get("weight")) : null,
      cpu_cores: formData.get("cpu_cores") ? Number(formData.get("cpu_cores")) : null,
      cpu_threads: formData.get("cpu_threads") ? Number(formData.get("cpu_threads")) : null,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/laptops/create-laptop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Laptop created successfully",
        });
        navigate("/profile");
      } else if (response.status === 422) {
        const errorData = await response.json();
        const errors = errorData.detail.map((error: any) => 
          `${error.loc[1]}: ${error.msg}`
        );
        setValidationErrors(errors);
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please check the form for errors",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create laptop",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            className="bg-white/10 text-white hover:bg-white/20 border-white/30"
            onClick={() => navigate("/profile")}
          >
            Back to Profile
          </Button>
          <div className="flex items-center gap-4">
            <Switch id="is_available" name="is_available" defaultChecked />
            <span className="text-white">Available for Purchase</span>
          </div>
        </div>

        {validationErrors.length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <form onChange={handleFormChange} onSubmit={handleSubmit} className="space-y-8">
                  <LaptopBasicInfo />
                  <div className="h-px bg-white/10" />
                  <LaptopDisplayInfo />
                  <div className="h-px bg-white/10" />
                  <LaptopPerformanceInfo />
                  <div className="h-px bg-white/10" />
                  <LaptopGraphicsInfo />
                  <div className="h-px bg-white/10" />
                  <LaptopAdditionalInfo />

                  <div className="flex justify-between items-center pt-6">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-white/10 text-white hover:bg-white/20 border-white/30"
                        onClick={() => setShowPreview(!showPreview)}
                      >
                        {showPreview ? "Hide Preview" : "Show Preview"}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="destructive"
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-500"
                          >
                            Reset Form
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#1A1F2C] text-white border-white/10">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                              This action cannot be undone. All form data will be cleared.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-white/10 text-white hover:bg-white/20 border-white/30">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => {
                                const form = document.querySelector('form');
                                if (form) resetForm(form);
                              }}
                            >
                              Reset
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-500 hover:bg-green-600 text-white px-8"
                    >
                      {isSubmitting ? "Creating..." : "Create Laptop"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {showPreview && (
            <div className="lg:w-1/2">
              <LaptopPreviewCard data={formData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLaptop;