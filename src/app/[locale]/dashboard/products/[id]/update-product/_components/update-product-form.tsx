"use client";

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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Image, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryCarouselDialog } from "@/components/features/dashboard/dialog/gallery-dialog";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Heading from "@/components/common/header";
import { useUpdateProduct } from "@/hooks/dashboard/use-update-product";
import { Textarea } from "@/components/ui/textarea";
import { GoChevronUp } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";

type TypeParam = {
  params: { id: string };
  product: Product;
  categories: Category[];
  occasions: Occasions[];
};

export default function UpdateProductform({ params, product, categories, occasions }: TypeParam) {
  // Translation
  const t = useTranslations();

  // State
  const [galleryOpen, setGalleryOpen] = useState(false);

  // Mutation
  const { updateProduct, isLoading } = useUpdateProduct();

  // Validation
  const Schema = z.object({
    occasion: z.string().nonempty("please select occasion"),
    name: z
      .string({ required_error: t("name-is-required") })
      .min(2, t("name-must-be-at-least-2-characters")),
    title: z
      .string()
      .min(1, t("title-is-required"))
      .min(2, t("title-must-be-at-least-2-characters")),
    description: z
      .string()
      .min(1, t("message-is-required"))
      .min(10, t("message-must-be-at-least-10-characters")),

    image: z
      .instanceof(File, { message: t("image-required") })
      .refine((file) => file.size > 0, { message: t("image-required") }),

    price: z
      .number({
        invalid_type_error: t("price-must-be-a-number"),
        required_error: t("price-is-required"),
      })
      .min(0.01, t("price-must-be-greater-than-0")),

    pricediscount: z
      .number({
        invalid_type_error: t("price-must-be-a-number"),
        required_error: t("price-is-required"),
      })
      .min(0.01, t("price-must-be-greater-than-0")),

    priceafterdiscount: z
      .number({
        invalid_type_error: t("price-must-be-a-number"),
        required_error: t("price-is-required"),
      })
      .min(0.01, t("price-must-be-greater-than-0")),

    quantity: z
      .number({ required_error: t("quantity-is-required") })
      .min(1, t("minimum-quantity-is-1"))
      .max(1000, t("maximum-quantity-is-1000")),

    category: z.string().nonempty("Please select a category"),
    occassion: z.string().nonempty("please select occassion"),
  });

  type Inputs = z.infer<typeof Schema>;
  const form = useForm<Inputs>({
    defaultValues: {
      title: product?.title || "",
      category: product?.category || categories[0]?.name || "",
      occasion: product?.occasion || occasions[0]?.name || "",
    },

    resolver: zodResolver(Schema),
  });

  // Submission
  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("occasion", data.occasion);
    formData.append("title", data.name);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("pricediscount", data.pricediscount.toString());
    formData.append("priceafterdiscount", data.priceafterdiscount.toString());
    formData.append("quantity", data.quantity.toString());
    await updateProduct({ id: params.id, data: formData });
  };
  return (
    <div>
      {/* Heading */}
      <Heading name={product?.title || ""}>{t("update-product")} :</Heading>

      <div className="bg-white w-full rounded-lg p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-6">
                  {/* Label */}
                  <FormLabel className="captalize font-medium text-sm font-inter">
                    {t("title")}
                    <span className="text-custom-red-100 ps-1">*</span>
                  </FormLabel>
                  <FormControl>
                    {/* Input */}
                    <Input
                      placeholder="Flowers"
                      {...field}
                      type="text"
                      className="w-full rounded-lg border-2 border-blue-gray-100 lg:w-4/5"
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discription */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-6">
                  {/* Label */}
                  <FormLabel className="captalize font-medium text-sm font-inter">
                    {t("description")}
                    <span className="text-custom-red-100 ps-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      rows={5}
                      {...field}
                      className="max-h-64 w-full border-2 border-blue-gray-100 lg:w-4/5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price feild */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:w-4/5">
              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    {/* Label */}
                    <FormLabel className="captalize font-medium text-sm font-inter">
                      {t("price")}
                      <span className="text-custom-red-100 ps-1">*</span>
                    </FormLabel>
                    <FormControl>
                      {/* Input */}
                      <Input
                        placeholder="Example: 5000"
                        {...field}
                        type="number"
                        className="h-14 w-full rounded-lg border-2 border-blue-gray-100"
                      />
                    </FormControl>

                    {/* Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Discount field */}
              <FormField
                control={form.control}
                name="pricediscount"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    {/* Label */}
                    <FormLabel className="captalize font-medium text-sm font-inter">
                      {t("discount")}
                      <span className="text-custom-red-100 ps-1">*</span>
                    </FormLabel>
                    <FormControl>
                      {/* Input */}
                      <Input
                        placeholder="Example: 5"
                        {...field}
                        type="number"
                        className="h-14 w-full rounded-lg border-2 border-blue-gray-100"
                      />
                    </FormControl>

                    {/* Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price after discount  */}
              <FormField
                control={form.control}
                name="priceafterdiscount"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    {/* Label */}
                    <FormLabel className="captalize font-medium text-sm font-inter">
                      {t("price-after-discount")}
                      <span className="text-custom-red-100 ps-1">*</span>
                    </FormLabel>
                    <FormControl>
                      {/* Input */}
                      <Input
                        placeholder="Example: 5"
                        {...field}
                        type="number"
                        className="h-14 w-full rounded-lg border-2 border-blue-gray-100"
                      />
                    </FormControl>

                    {/* Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="mb-6">
                  {/* Label */}
                  <FormLabel className="captalize font-medium text-sm font-inter">
                    {t("quantity")}
                    <span className="text-custom-red-100 ps-1">*</span>
                  </FormLabel>

                  <FormControl>
                    {/* Input */}
                    <Input
                      placeholder="Example: 200"
                      {...field}
                      type="number"
                      className="w-full rounded-lg border-2 border-blue-gray-100 lg:w-4/5"
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                const currentIndex = categories.findIndex((c) => c.name === field.value);

                const handleNext = () => {
                  const nextIndex = (currentIndex + 1) % categories.length;
                  field.onChange(categories[nextIndex].name);
                };

                const handlePrev = () => {
                  const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
                  field.onChange(categories[prevIndex].name);
                };

                return (
                  <FormItem className="mb-6">
                    <FormLabel className="capitalize font-medium text-sm font-inter">
                      {t("category")}
                      <span className="text-custom-red-100 ps-1">*</span>
                    </FormLabel>
                    <div className="relative w-full lg:w-4/5">
                      <Input
                        readOnly
                        value={field.value || ""}
                        placeholder="Select a category"
                        className="w-full border-blue-gray-100 border-2 rounded-lg pr-10"
                      />
                      <div className="absolute inset-y-0 right-2 flex flex-col justify-center space-y-1">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="text-gray-600 hover:text-black text-sm"
                        >
                          <GoChevronUp className="mr-2" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="text-gray-600 hover:text-black text-sm"
                        >
                          <GoChevronDown className="mr-2" />
                        </button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Occasion */}
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => {
                const currentIndex = occasions.findIndex((o) => o.name === field.value);

                const handleNext = () => {
                  const nextIndex = (currentIndex + 1) % occasions.length;
                  field.onChange(occasions[nextIndex].name);
                };

                const handlePrev = () => {
                  const prevIndex = (currentIndex - 1 + occasions.length) % occasions.length;
                  field.onChange(occasions[prevIndex].name);
                };

                return (
                  <FormItem className="mb-6">
                    <FormLabel className="capitalize font-medium text-sm font-inter">
                      {t("occasion")}
                      <span className="text-custom-red-100 ps-1">*</span>
                    </FormLabel>
                    <div className="relative w-full lg:w-4/5">
                      <Input
                        readOnly
                        value={field.value || ""}
                        placeholder="Select an occasion"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 pr-10"
                      />
                      <div className="absolute inset-y-0 right-2 flex flex-col justify-center space-y-1">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="text-gray-600 hover:text-black text-sm"
                        >
                          <GoChevronUp className="mr-2" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="text-gray-600 hover:text-black text-sm"
                        >
                          <GoChevronDown className="mr-2" />
                        </button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Trigger to open gallery dialog */}
            <div className="flex w-full justify-end lg:w-4/5">
              <div className="text-stats-orders-primary flex items-center gap-2 font-normal text-sm  border-2 border-blue-gray-100 rounded-lg p-2 ">
                <Image className="w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  className="text-stats-orders-primary capitalize"
                >
                  {t("dialog-image")}
                </button>
              </div>
            </div>

            {/* Gallery dialog */}
            <GalleryCarouselDialog
              isOpen={galleryOpen}
              onClose={() => setGalleryOpen(false)}
              images={product?.images ?? []}
            />

            {/* Submit button */}
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className="mt-10 h-10 w-full rounded-lg bg-custom-rose-900 text-sm font-semibold capitalize text-white lg:mt-16 lg:w-4/5"
            >
              {isLoading ? <Loader className="text-center" /> : "update product"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
