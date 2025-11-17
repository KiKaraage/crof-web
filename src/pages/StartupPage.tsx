import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  startup_name: string;
  website: string;
  contact_email: string;
  description: string;
  use_case: string;
}

interface FormErrors {
  [key: string]: string[];
}

export function StartupPage() {
  const [formData, setFormData] = useState<FormData>({
    startup_name: "",
    website: "",
    contact_email: "",
    description: "",
    use_case: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.startup_name.trim()) {
      newErrors.startup_name = ["Startup name is required"];
    }

    if (!formData.website.trim()) {
      newErrors.website = ["Website is required"];
    } else if (!/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = ["Please enter a valid URL starting with http:// or https://"];
    }

    if (!formData.contact_email.trim()) {
      newErrors.contact_email = ["Contact email is required"];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
      newErrors.contact_email = ["Please enter a valid email address"];
    }

    if (!formData.description.trim()) {
      newErrors.description = ["Description is required"];
    } else if (formData.description.length < 50) {
      newErrors.description = ["Please provide at least 50 characters"];
    }

    if (!formData.use_case.trim()) {
      newErrors.use_case = ["Use case is required"];
    } else if (formData.use_case.length < 50) {
      newErrors.use_case = ["Please provide at least 50 characters"];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: [] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ general: ["Failed to submit application. Please try again."] });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="px-8 pt-9 pb-0 h-full">
          <div className="w-full rounded-md h-[calc(100vh-8.5rem)] flex items-center justify-center relative">
            <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 gradient-text">Application Submitted!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in CrofAI startup credits. We'll review your application and get back to you within 3-5 business days.
            </p>
            <Button onClick={() => window.location.href = "/"} variant="default">
              Return Home
            </Button>
          </div>
          <div className="absolute inset-0 rounded-md animate-gradient-glow pointer-events-none"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 pt-9 pb-0 h-full">
        <div className="w-full rounded-md h-[calc(100vh-8.5rem)] flex flex-col overflow-hidden relative">
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-16 py-12">
            <h1 className="text-3xl font-bold mb-8 gradient-text">Tell us about your startup</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8 w-full">
              {errors.general && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
                  <FieldError errors={[{ message: errors.general[0] }]} />
                </div>
              )}
              
              <FieldSet>
                <FieldGroup className="space-y-0 w-full">
                  <Field data-invalid={!!errors.startup_name?.length}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <FieldLabel htmlFor="startup_name" className="sm:flex-shrink-0 sm:w-32 sm:text-right">Startup Name</FieldLabel>
                      <Input
                        id="startup_name"
                        className="sm:flex-1 w-full"
                        value={formData.startup_name}
                        onChange={(e) => handleInputChange("startup_name", e.target.value)}
                        placeholder="CrofAI"
                        required
                        aria-invalid={!!errors.startup_name?.length}
                      />
                    </div>
                    <FieldError errors={errors.startup_name?.map(err => ({ message: err }))} />
                  </Field>
                  <Field data-invalid={!!errors.website?.length}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <FieldLabel htmlFor="website" className="sm:flex-shrink-0 sm:w-32 sm:text-right">Company Website</FieldLabel>
                      <Input
                        id="website"
                        className="sm:flex-1 w-full"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://example.com"
                        required
                        aria-invalid={!!errors.website?.length}
                      />
                    </div>
                    <FieldError errors={errors.website?.map(err => ({ message: err }))} />
                  </Field>
                  <Field data-invalid={!!errors.contact_email?.length}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <FieldLabel htmlFor="contact_email" className="sm:flex-shrink-0 sm:w-32 sm:text-right">Contact Email</FieldLabel>
                      <Input
                        id="contact_email"
                        className="sm:flex-1 w-full"
                        type="email"
                        value={formData.contact_email}
                        onChange={(e) => handleInputChange("contact_email", e.target.value)}
                        placeholder="you@company.com"
                        required
                        aria-invalid={!!errors.contact_email?.length}
                      />
                    </div>
                    <FieldError errors={errors.contact_email?.map(err => ({ message: err }))} />
                  </Field>

                  
                  <Field data-invalid={!!errors.description?.length}>
                    <FieldLabel htmlFor="description">
                      What problem are you solving? Who are your customers?
                    </FieldLabel>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your product, target market, stage, and traction."
                      rows={4}
                      required
                      aria-invalid={!!errors.description?.length}
                    />
                    <FieldDescription>
                      Help us understand your business model and target audience.
                    </FieldDescription>
                    <FieldError errors={errors.description?.map(err => ({ message: err }))} />
                  </Field>
                  
                  <Field data-invalid={!!errors.use_case?.length}>
                    <FieldLabel htmlFor="use_case">How will you use CrofAI?</FieldLabel>
                    <Textarea
                      id="use_case"
                      value={formData.use_case}
                      onChange={(e) => handleInputChange("use_case", e.target.value)}
                      placeholder="Describe your project and how our AI services will help you achieve your goals."
                      rows={4}
                      required
                      aria-invalid={!!errors.use_case?.length}
                    />
                    <FieldDescription>
                      Tell us about your technical requirements and expected usage.
                    </FieldDescription>
                    <FieldError errors={errors.use_case?.map(err => ({ message: err }))} />
                  </Field>
                </FieldGroup>
              </FieldSet>
              
              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" variant="default" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Apply for Credits"}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="absolute inset-0 rounded-md animate-gradient-glow pointer-events-none"></div>
      </div>
    </div>
  );
}

export default StartupPage;