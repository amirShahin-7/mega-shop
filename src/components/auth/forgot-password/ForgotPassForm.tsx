"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ForgotPassFormFields } from "@/interfaces";
import { forgotPassSchema } from "@/schemas/forgotPass.schema";
import forgotPassActions from "@/server/authActions/forgotPassActions/forgotPass.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner6 } from "react-icons/im";
import { MdLogin } from "react-icons/md";
import { toast } from "react-toastify";

export default function ForgotPassForm() {
  const router = useRouter();
  const form = useForm<ForgotPassFormFields>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPassSchema),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<ForgotPassFormFields> = async (values) => {
    try {
      const res = await forgotPassActions(values);
      if (res?.success) {
        toast.success(res.message);
        setTimeout(() => {
          router.push("/verify-code");
        }, 2000);
      }
      if (res?.errors) {
        form.setError("email", {
          message: res.errors.email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Forgot Password?
        </h2>
        <p className="text-gray-500">
          Enter your email and we'll send you a verification code
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm font-medium" htmlFor={field.name}>
                Email address
              </FieldLabel>
              <Input
                type="email"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="name@example.com"
                className="h-12 rounded-xl border-gray-200 focus:ring-sky-500"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-red-500 text-xs mt-1"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-sky-100 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center gap-2">
              <ImSpinner6 className="animate-spin" />
              <span>Sending...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MdLogin size={20} />
              <span>Send Code</span>
            </div>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Remember your password?
          <Link
            className="font-bold text-sky-600 hover:text-sky-700 transition-colors"
            href="/login"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
