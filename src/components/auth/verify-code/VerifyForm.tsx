"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { VerifyCodeFormFields } from "@/interfaces";
import { verifyCodeSchema } from "@/schemas/verifyCode.schema";
import verifyCodeActions from "@/server/authActions/verifyCodeActions/verifyCode.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ImSpinner6 } from "react-icons/im";
import { MdLogin } from "react-icons/md";
export default function VerifyForm() {
  const router = useRouter();
  const form = useForm<VerifyCodeFormFields>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(verifyCodeSchema),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<VerifyCodeFormFields> = async (values) => {
    try {
      const res = await verifyCodeActions(values);
      if (res?.success) {
        toast.success(res.message);
        setTimeout(() => {
          router.push("/reset-password");
        }, 2000);
      }
      if (res?.errors) {
        form.setError("resetCode", {
          message: res.errors.resetCode,
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
          Verify Identity
        </h2>
        <p className="text-gray-500">
          Phase 2: Enter the 6-digit code sent to your inbox
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="resetCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel
                className="text-sm font-medium mb-4 block text-center"
                htmlFor={field.name}
              >
                Reset Code
              </FieldLabel>
              <div className="flex justify-center">
                <InputOTP
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  maxLength={6}
                  {...field}
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot
                      index={0}
                      className="w-12 h-14 text-xl rounded-xl border-gray-200 focus:border-sky-500"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-12 h-14 text-xl rounded-xl border-gray-200 focus:border-sky-500"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-12 h-14 text-xl rounded-xl border-gray-200 focus:border-sky-500"
                    />
                    <InputOTPSeparator className="text-gray-300" />
                    <InputOTPSlot
                      index={3}
                      className="w-12 h-14 text-xl rounded-xl border-gray-200 focus:border-sky-500"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-12 h-14 text-xl rounded-xl border-gray-200 focus:border-sky-500"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-12 h-14 text-xl rounded-xl border-gray-200 focus:border-sky-500"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {fieldState.invalid && (
                <FieldError
                  className="text-red-500 text-center text-xs mt-3"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-sky-100 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-4"
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center gap-2">
              <ImSpinner6 className="animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MdLogin size={20} />
              <span>Verify Code</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}
