"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { LoginFormFields } from "@/interfaces";
import { useSearchParams } from "next/navigation";
import { ImSpinner6 } from "react-icons/im";
import { MdLogin } from "react-icons/md";
import { loginSchema } from "../../../schemas/login.schema";
import Link from "next/link";
import { signIn } from "next-auth/react";
export default function LoginForm() {
  let searchParams = useSearchParams();
  const form = useForm<LoginFormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (values) => {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/products",
      redirect: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Welcome Back
        </h2>
        <p className="text-gray-500">
          Enter your credentials to access your account
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
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex flex-wrap justify-between mb-1.5">
                <FieldLabel
                  className="text-sm font-medium"
                  htmlFor={field.name}
                >
                  Password
                </FieldLabel>
                <Link
                  className="text-sm text-sky-600 font-medium hover:underline decoration-2 underline-offset-4"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type={`password`}
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
              {searchParams.get("error") && (
                <FieldDescription className="text-red-500 text-xs font-medium">
                  {searchParams.get("error")}
                </FieldDescription>
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
              <span>Logging in...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MdLogin size={20} />
              <span>Sign In</span>
            </div>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            className="font-bold text-sky-600 hover:text-sky-700 transition-colors"
            href="/register"
          >
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
