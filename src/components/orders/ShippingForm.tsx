"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, CreditCard, Banknote } from "lucide-react";
import { createOrderAction } from "@/server/ordersActions/createOrder.actions";
import { checkoutSessionAction } from "@/server/ordersActions/checkout.actions";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { shippingSchema, ShippingValues } from "@/schemas/shipping.schema";

interface ShippingFormProps {
  cartId: string;
}

export default function ShippingForm({ cartId }: ShippingFormProps) {
  const { refreshCart } = useCart();
  const router = useRouter();

  const form = useForm<ShippingValues>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: "cash",
    },
    resolver: zodResolver(shippingSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<ShippingValues> = async (values) => {
    try {
      if (values.paymentMethod === "cash") {
        const result = await createOrderAction(cartId, {
          shippingAddress: {
            details: values.details,
            phone: values.phone,
            city: values.city,
          },
        });

        if ("status" in result && result.status === "success") {
          toast.success("Order placed successfully!");
          await refreshCart();
          router.push("/profile/orders");
        } else {
          const msg =
            "message" in result ? result.message : "Failed to place order";
          toast.error(msg);
        }
      } else {
        const result = await checkoutSessionAction(cartId, {
          shippingAddress: {
            details: values.details,
            phone: values.phone,
            city: values.city,
          },
        });

        if ("status" in result && result.status === "success") {
          router.push(result.session.url);
        } else {
          const msg =
            "message" in result
              ? result.message
              : "Failed to initiate checkout";
          toast.error(msg);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="details"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm font-medium" htmlFor={field.name}>
                Address Details
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Street, Building, Apartment..."
                className={
                  fieldState.invalid
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
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
              <FieldLabel className="text-sm font-medium" htmlFor={field.name}>
                Phone Number
              </FieldLabel>
              <Input
                type="tel"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="01xxxxxxxxx"
                className={
                  fieldState.invalid
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
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
          name="city"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm font-medium" htmlFor={field.name}>
                City
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Cairo, Alexandria..."
                className={
                  fieldState.invalid
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
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

        <div className="pt-4 space-y-4">
          <h3 className="font-semibold text-gray-900">Payment Method</h3>
          <Controller
            name="paymentMethod"
            control={form.control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="cash"
                    id="cash"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="cash"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-sky-600 peer-data-[state=checked]:bg-sky-50 cursor-pointer transition-all"
                  >
                    <Banknote className="mb-3 h-6 w-6 text-gray-600 peer-data-[state=checked]:text-sky-600" />
                    Cash on Delivery
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-sky-600 peer-data-[state=checked]:bg-sky-50 cursor-pointer transition-all"
                  >
                    <CreditCard className="mb-3 h-6 w-6 text-gray-600 peer-data-[state=checked]:text-sky-600" />
                    Online Payment
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white py-3 text-lg rounded-xl shadow-lg shadow-sky-200 hover:translate-y-0.5 transition-all"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin mr-2" />
          ) : form.watch("paymentMethod") === "cash" ? (
            "Place Order"
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </form>
    </div>
  );
}
