"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ toastOptions, ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  const baseToast =
    "!rounded-xl !border !px-4 !py-3 !shadow-lg !font-medium !gap-3 " +
    "!bg-white dark:!bg-[#2E2E30] !border-custom-rose-100 dark:!border-custom-rose-800 " +
    "!text-[#2E2E30] dark:!text-[#FBFBFD]";

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster"
      {...props}
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...toastOptions?.classNames,
          toast: baseToast,
          default: "!bg-white dark:!bg-[#2E2E30] !border-custom-rose-100 !text-[#2E2E30]",
          success:
            "!bg-emerald-leaf-50 dark:!bg-[#06291A] !border-emerald-leaf-300 !text-emerald-leaf-800 dark:!text-emerald-leaf-50",
          error:
            "!bg-red-50 dark:!bg-[#2A0505] !border-red-200 !text-[#D50000] dark:!text-red-100",
          warning:
            "!bg-[#FFF7E6] dark:!bg-[#2A1D00] !border-[#FBA707] !text-[#9A5B00] dark:!text-[#FFD88A]",
          title: "!text-inherit !font-semibold",
          description: "!text-[#757575] dark:!text-[#D4D4D8]",
          icon: "!text-inherit",
          actionButton:
            "!bg-custom-rose-900 !text-white hover:!bg-custom-rose-800 !rounded-lg !px-3 !py-2",
          cancelButton:
            "!bg-custom-rose-100 !text-custom-rose-900 hover:!bg-custom-rose-200 !rounded-lg !px-3 !py-2",
        },
      }}
    />
  );
};

export { Toaster };
