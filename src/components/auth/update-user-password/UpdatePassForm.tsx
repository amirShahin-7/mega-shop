"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UpdatePassFormFields } from "@/interfaces";
import { updatePassSchema } from "@/schemas/updatePass.schema";
import updatePassActions from "@/server/authActions/updatePassActions/updatePass.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner6 } from "react-icons/im";
import { MdLogin } from "react-icons/md";
import { toast } from "react-toastify";

export default function UpdatePassForm() {
  const form = useForm<UpdatePassFormFields>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(updatePassSchema),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<UpdatePassFormFields> = async (values) => {
    try {
      const res = await updatePassActions(values);
      if (res?.success) {
        toast.success(res.message);
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
        }, 2000);
      }
      if (res?.errors) {
        form.setError("currentPassword", {
          message: res.errors.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
          <CardDescription>
            Update your account security regularly.
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-6">
            <Controller
              name="currentPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Current Password*
                  </FieldLabel>
                  <Input
                    type="password"
                    {...field}
                    id={field.name}
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500"
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
                  <FieldLabel
                    className="text-sm font-medium"
                    htmlFor={field.name}
                  >
                    New Password*
                  </FieldLabel>
                  <Input
                    type="password"
                    {...field}
                    id={field.name}
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500"
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
                    Confirm New Password*
                  </FieldLabel>
                  <Input
                    type="password"
                    {...field}
                    id={field.name}
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-sky-600 hover:bg-sky-700 text-white cursor-pointer w-full h-11 disabled:cursor-not-allowed disabled:bg-sky-400 font-semibold"
            >
              {form.formState.isSubmitting ? (
                <>
                  <ImSpinner6 className="animate-spin mr-2" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <MdLogin className="mr-2" />
                  <span>Update Password</span>
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
