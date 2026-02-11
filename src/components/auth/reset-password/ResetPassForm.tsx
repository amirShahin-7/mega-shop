"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ResetFormFields } from "@/interfaces";
import { resetPassSchema } from "@/schemas/resetPass.schema";
import resetPassActions from "@/server/authActions/resetPassActions/resetPass.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner6 } from "react-icons/im";
import { MdLogin } from "react-icons/md";
import { toast } from "react-toastify";

export default function ResetPassForm() {
  const form = useForm<ResetFormFields>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPassSchema),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<ResetFormFields> = async (values) => {
    try {
      const res = await resetPassActions(values);
      if (res?.success) {
        toast.success(res.message);
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
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
          New Password
        </h2>
        <p className="text-gray-500">
          Phase 3: Secure your account with a new password
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm font-medium" htmlFor={field.name}>
                Confirm Email
              </FieldLabel>
              <Input
                type="email"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="re-enter your email"
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
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm font-medium" htmlFor={field.name}>
                New Password
              </FieldLabel>
              <Input
                type="password"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
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
              <span>Resetting...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MdLogin size={20} />
              <span>Reset Password</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}
