"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

type ProductsLayoutShellProps = {
  filters: ReactNode;
  children: ReactNode;
};

export default function ProductsLayoutShell({ filters, children }: ProductsLayoutShellProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="container grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-[302px_minmax(0,1fr)] lg:p-10">
      <div className="lg:hidden">
        <Button
          type="button"
          variant="outline"
          aria-expanded={isFiltersOpen}
          onClick={() => setIsFiltersOpen((value) => !value)}
          className="h-11 w-full justify-center gap-2 rounded-xl border-custom-rose-200 bg-white text-custom-rose-900 shadow-sm"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {isFiltersOpen ? "Hide filters" : "Filters"}
        </Button>
      </div>

      <aside
        className={cn(
          "min-w-0 space-y-4 rounded-2xl border border-custom-rose-100 bg-custom-rose-25 p-3 shadow-sm lg:block lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none",
          isFiltersOpen ? "block" : "hidden",
        )}
      >
        {filters}
      </aside>

      <section className="min-w-0">{children}</section>
    </div>
  );
}
