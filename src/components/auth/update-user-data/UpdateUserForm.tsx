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
import { UpdateDataFormFields } from "@/interfaces";
import { updateDataSchema } from "@/schemas/updateData.schema";
import updateDataActions from "@/server/authActions/updateDataActions/update.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner6 } from "react-icons/im";
import { MdLogin } from "react-icons/md";
import { toast } from "react-toastify";

export default function UpdateUserForm() {
  const form = useForm<UpdateDataFormFields>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(updateDataSchema),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<UpdateDataFormFields> = async (values) => {
    try {
      const res = await updateDataActions(values);
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
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
          <CardDescription>
            Modify your personal information below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-6">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-sm font-medium"
                    htmlFor={field.name}
                  >
                    User Name*
                  </FieldLabel>
                  <Input
                    type="text"
                    {...field}
                    id={field.name}
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                    placeholder="john doe"
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Email Address*
                  </FieldLabel>
                  <Input
                    type="email"
                    {...field}
                    id={field.name}
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                    placeholder="name@example.com"
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
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Phone Number*
                  </FieldLabel>
                  <Input
                    type="tel"
                    {...field}
                    id={field.name}
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your phone number"
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
                  <span>Update Changes</span>
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
