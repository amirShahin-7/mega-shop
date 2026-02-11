"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Loader2, Plus, MapPin, Phone, User, Home } from "lucide-react";
import { addAddressAction } from "@/server/addressActions/addAddress.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addressSchema, AddressValues } from "@/schemas/address.schema";

export default function AddressForm() {
  const router = useRouter();

  const form = useForm<AddressValues>({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(addressSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<AddressValues> = async (values) => {
    try {
      const res = await addAddressAction(values);
      if (res.status === "success") {
        toast.success("Address added successfully!");
        form.reset();
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6 sticky top-24">
      <div className="flex items-center gap-2">
        <Plus className="text-sky-600" size={24} />
        <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm font-medium flex items-center gap-2">
                <Home size={16} className="text-gray-400" />
                Address Name (e.g., Home, Work)
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Home"
                className={fieldState.invalid ? "border-red-500" : ""}
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-red-500 text-sm"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="details"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm font-medium flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                Address Details
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Street name, building number..."
                className={fieldState.invalid ? "border-red-500" : ""}
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-red-500 text-sm"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm font-medium flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  City
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Cairo"
                  className={fieldState.invalid ? "border-red-500" : ""}
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-500 text-sm"
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
                <FieldLabel className="text-sm font-medium flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  Phone
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="010..."
                  className={fieldState.invalid ? "border-red-500" : ""}
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-500 text-sm"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl font-semibold text-lg shadow-lg shadow-sky-200 transition-all hover:scale-[1.02] active:scale-95 duration-200"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            "Save Address"
          )}
        </Button>
      </form>
    </div>
  );
}
