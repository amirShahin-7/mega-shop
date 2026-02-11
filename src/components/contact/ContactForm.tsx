"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { contactSchema, ContactFormData } from "@/schemas/contact.schema";

export default function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await emailjs.send(
        "service_hkjv4x4",
        "template_wdxwnpe",
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        "um9OMcpSbUIX0lfIP", // Public key provided by user
      );

      if (result.status === 200) {
        toast.success("Message sent successfully!");
        form.reset();
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Send us a message
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-medium">
                    Your Name
                  </FieldLabel>
                  <Input {...field} placeholder="John Doe" className="h-11" />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500 text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-medium">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="john@example.com"
                    className="h-11"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500 text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm font-medium">Message</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="Write your message here..."
                  className="min-h-[150px] resize-none"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-500 text-xs"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white h-12 rounded-xl font-bold text-lg shadow-lg shadow-sky-100 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            {form.formState.isSubmitting ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <Send size={18} />
                Send Message
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
