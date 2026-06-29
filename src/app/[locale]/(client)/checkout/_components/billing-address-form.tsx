"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useLocation } from "@/hooks/use-location";
import { toast } from "sonner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Locale } from "@/i18n/routing";

// Type
type AddressFormProps = {
  onSubmitAddress: (address: ShippingAddress) => void;
  setOpen: (value: string) => void;
};
export default function AddressForm({ onSubmitAddress, setOpen }: AddressFormProps) {
  // Translation
  const t = useTranslations();
  const locale = useLocale() as Locale;

  // Queries
  const { isLoading, refetchCurrentLocation } = useLocation();

  // Form & Validation
  const Schema = z.object({
    street: z.string().min(1, t("street-is-required")),
    phone: z
      .string({ required_error: t("phone-is-required") })
      .regex(
        /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        t("invalid-phone-number-format-must-start-with-a-country-code"),
      ),
    city: z.string().optional(),
    lat: z.string().trim().optional(),
    long: z.string().trim().optional(),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
    defaultValues: {
      street: "",
      phone: "",
      city: "",
      lat: "",
      long: "",
    },
  });

  // Functions
  const handleDetectLocation = async () => {
    const locationData = await refetchCurrentLocation();
    if (locationData.data) {
      form.setValue("lat", locationData.data.latitude.toString());
      form.setValue("long", locationData.data.longitude.toString());
      toast.success(t("location-detected-successfully"));
    } else if (locationData.data === null) {
      toast.error(t("error-detecting-location"));
    }
  };

  //  Handle submission address form
  const onSubmit = (values: Inputs) => {
    const address: ShippingAddress = {
      ...values,
    };

    if (!values.lat?.trim()) delete address.lat;
    else address.lat = values.lat.trim();

    if (!values.long?.trim()) delete address.long;
    else address.long = values.long.trim();

    onSubmitAddress?.(address);
    setOpen("paymentform");
  };

  return (
    <AccordionItem value="billing-address">
      <AccordionTrigger
        className="text-custom-rose-900 font-inter fw-600 text-base
          leading-[19.2px] capitalize border rounded-[5px] py-4 px-5"
      >
        {t("your-billing-address")}
      </AccordionTrigger>
      <AccordionContent className="mt-4">
        {/* Billing form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="font-roboto">
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 mb-4 md:grid-cols-2 xl:grid-cols-3">
              {/* Street */}
              <FormField
                name="street"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    {/* Label */}
                    <FormLabel className="text-base font-medium text-[#2E2E30] font-roboto">
                      {t("street")}
                    </FormLabel>

                    {/* Input */}
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t("street")}
                        {...field}
                        className="w-full h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)] xl:w-[280px]"
                      />
                    </FormControl>

                    {/* Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel className="text-base font-medium text-[#2E2E30] font-roboto">
                      {t("phone")}
                    </FormLabel>

                    {/* Input */}
                    <FormControl>
                      <Input
                        placeholder={t("phone")}
                        type="text"
                        {...field}
                        className="w-full h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)] xl:w-[280px]"
                      />
                    </FormControl>

                    {/* Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel className="text-base font-medium text-[#2E2E30] font-roboto">
                      {t("city")}
                    </FormLabel>

                    <FormControl>
                      {/* Input */}
                      <Input
                        placeholder={t("city")}
                        type="text"
                        {...field}
                        className="w-full h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)] xl:w-[280px]"
                      />
                    </FormControl>

                    {/* Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:items-end">
              {/* Latitude */}
              <FormField
                name="lat"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel className="text-base font-medium text-[#2E2E30] font-roboto">
                      {t("latitude")}
                    </FormLabel>

                    <FormControl>
                      {/* Input */}
                      <Input
                        placeholder={t("latitude")}
                        type="text"
                        readOnly
                        {...field}
                        className="w-full cursor-not-allowed h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)] xl:w-[280px]"
                      />
                    </FormControl>

                    {/* Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Longitude */}
              <FormField
                name="long"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel className="text-base font-medium text-[#2E2E30] font-roboto">
                      {t("longitude")}
                    </FormLabel>

                    <FormControl>
                      {/* Input */}
                      <Input
                        placeholder={t("longitude")}
                        type="text"
                        readOnly
                        {...field}
                        className="w-full cursor-not-allowed h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)] xl:w-[280px]"
                      />
                    </FormControl>

                    {/* Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Detect location */}
              <Button
                type="button"
                onClick={handleDetectLocation}
                disabled={isLoading}
                className=" bg-custom-rose-900  
                    h-[49px]
                    rounded-[10px] 
                    w-full
                    font-medium 
                    text-base
                    text-center 
                    shadow-[0px_0px_40px_5px_rgba(0, 0, 0, 0.05)]
                    hover:bg-custom-rose-800
                    xl:w-[280px]"
              >
                {isLoading ? t("detecting-location") : t("detect-location")}
              </Button>
            </div>

            <div className="flex justify-end mt-4 w-full">
              <Button
                type="submit"
                className="
                        bg-custom-rose-900  
                          rounded-[10px] 
                          h-[49px]
                          w-full
                          px-5
                          py-[10px]
                          font-medium 
                          text-base
                          text-center 
                          shadow-[0px_0px_40px_5px_rgba(0, 0, 0, 0.05)]
                          hover:bg-custom-rose-800   
                          capitalize
                          sm:w-auto
                          "
              >
                {t("next-step")}
                {locale === "ar" ? <FaArrowLeft /> : <FaArrowRight />}
              </Button>
            </div>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
}
