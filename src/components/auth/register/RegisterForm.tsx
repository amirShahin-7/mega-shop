"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { registerSchema } from "../../../schemas/register.schema";
import { RegisterFormFields } from "@/interfaces";
import registerActions from "../../../server/authActions/registerActions/register.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ImSpinner6 } from "react-icons/im";
import { TbUserPlus } from "react-icons/tb";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<RegisterFormFields> = async (values) => {
    try {
      const res = await registerActions(values);
      if (res?.success) {
        toast.success(res.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
      if (res?.errors) {
        Object.keys(res.errors).forEach((key) => {
          form.setError(key as keyof RegisterFormFields, {
            message: res.errors[key],
          });
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
          Create Account
        </h2>
        <p className="text-gray-500">
          Join us today and enjoy a premium shopping experience
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm font-medium" htmlFor={field.name}>
                Full Name
              </FieldLabel>
              <Input
                type="text"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="John Doe"
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

        <div className="grid sm:grid-cols-2 gap-6">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-sm font-medium"
                  htmlFor={field.name}
                >
                  Email Address
                </FieldLabel>
                <Input
                  type="email"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="john@example.com"
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
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-sm font-medium"
                  htmlFor={field.name}
                >
                  Phone Number
                </FieldLabel>
                <Input
                  type="tel"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="01234567890"
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
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-sm font-medium"
                  htmlFor={field.name}
                >
                  Password
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
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-sm font-medium"
                  htmlFor={field.name}
                >
                  Confirm Password
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
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-sky-100 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center gap-2">
              <ImSpinner6 className="animate-spin" />
              <span>Creating account...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <TbUserPlus size={20} />
              <span>Create Account</span>
            </div>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?
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
