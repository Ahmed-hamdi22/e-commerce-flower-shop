"use client";

import React, { useState } from "react";
import AddressForm from "./billing-address-form";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/routing";
import SummaryWrapper from "./cart-summary-wrapper";
import { PaymentForm } from "./payment";
import { Accordion } from "@/components/ui/accordion";

export default function CheckoutContent({ cart }: { cart: Cart }) {
  // Translation
  const t = useTranslations();

  // Variables
  const locale = useLocale() as Locale;

  // Initialize state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: "",
    phone: "",
    city: "",
    lat: "",
    long: "",
  });

  // State
  const [open, setOpen] = useState("billing-address");

  // Handle address submit
  const handleAddressSubmit = (address: ShippingAddress) => {
    setShippingAddress(address);
    setOpen("paymentform");
  };

  return (
    <div className="container grid grid-cols-1 gap-8 my-8 px-4 lg:grid-cols-3 lg:my-10">
      <div className="lg:col-span-2 flex flex-col space-y-8">
        <Accordion
          type="single"
          collapsible
          className="space-y-4"
          value={open}
          onValueChange={setOpen}
        >
          {/* Address form  */}
          <AddressForm onSubmitAddress={handleAddressSubmit} setOpen={setOpen} />

          {/* Payment form */}
          <PaymentForm shippingAddress={shippingAddress} />
        </Accordion>
        {/* Buttons */}
        <div className="flex justify-between align-middle mt-6 lg:mt-10">
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
            {locale === "ar" ? <FaArrowRight /> : <FaArrowLeft />}
            {t("back-to-cart")}
          </Button>
        </div>
      </div>

      {/*  Summary cat wrapper  */}

      <div className="min-w-0">
        <SummaryWrapper cart={cart} />
      </div>
    </div>
  );
}
