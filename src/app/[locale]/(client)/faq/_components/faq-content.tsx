import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import React from "react";

const fallbackQuestions = [
  {
    value: "ordering",
    titleKey: "ordering-title",
    answerKey: "ordering-answer",
    title: "How do I place an order?",
    answer:
      "Select a product, add it to your cart, and continue through checkout with your preferred payment option.",
  },
  {
    value: "shipping",
    titleKey: "shipping-title",
    answerKey: "shipping-answer",
    title: "What are the shipping options?",
    answer: "Available shipping options and timing are shown during checkout.",
  },
  {
    value: "payment",
    titleKey: "payment-title",
    answerKey: "payment-answer",
    title: "What payment methods do you accept?",
    answer: "Available payment methods are shown during checkout.",
  },
  {
    value: "returns",
    titleKey: "returns-title",
    answerKey: "returns-answer",
    title: "How do I return a product?",
    answer: "Please contact support with your order details so we can help with the return.",
  },
  {
    value: "product",
    titleKey: "product-title",
    answerKey: "product-answer",
    title: "How do I know if a product is in stock?",
    answer: "Product availability is shown on the product details page.",
  },
];

export default function FaqContent() {
  // Translation
  const t = useTranslations();
  const translate = (key: string, fallback: string) => {
    try {
      return t(key);
    } catch {
      return fallback;
    }
  };

  return (
    <div className="container my-20">
      {/* Main title */}
      <div className="mb-4 text-blue-gray-900 font-inter leading-[36px] capitalize">
        <h1 className="text-[30px] font-bold">{translate("faq-title", "Common Questions")}</h1>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {fallbackQuestions.length === 0 ? (
          <div className="rounded-lg bg-main-color p-6 text-center text-blue-gray-700">
            {translate("no-products-available", "No questions are available right now.")}
          </div>
        ) : (
          fallbackQuestions.map((question) => (
            <AccordionItem key={question.value} value={question.value}>
              <AccordionTrigger className="text-xl">
                {translate(question.titleKey, question.title)}
              </AccordionTrigger>
              <AccordionContent>{translate(question.answerKey, question.answer)}</AccordionContent>
            </AccordionItem>
          ))
        )}
      </Accordion>
    </div>
  );
}
