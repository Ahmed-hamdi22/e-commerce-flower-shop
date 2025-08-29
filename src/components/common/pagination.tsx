"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type PagePaginationProps = {
  metadata?: Metadata;
};

export default function PagePagination({ metadata }: PagePaginationProps) {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = metadata?.totalPages ?? 1;

  const [currentPage, setCurrentPage] = useState<number>(metadata?.currentPage ?? 1);

  // Function to navigate to a new page
  const navigateToPage = useCallback(
    (page: number) => {
      const queryString = new URLSearchParams(searchParams);
      if (page < 1 || page > totalPages || page === currentPage) return;

      setCurrentPage(page);

      queryString.set("page", page.toString());
      router.push(`${pathname}?${queryString.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router, currentPage, totalPages],
  );

  // Generates an array of page numbers and ellipsis elements
  const generatePages = (): (number | JSX.Element)[] => {
    const pages: (number | JSX.Element)[] = [];

    // If total pages are 3 or fewer, display all pages
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      // Show leading dots if current page is beyond page 3
      if (currentPage > 3) {
        pages.push(<HiOutlineDotsHorizontal />);
      }

      // Center current page with one before/after
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      // Add the middle page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Show trailing dots if current page is not close to the end
      if (currentPage < totalPages - 2) {
        pages.push(<HiOutlineDotsHorizontal />);
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination className="flex items-center justify-center">
      <PaginationContent>
        {/* Go to First Page */}
        <PaginationItem>
          <button
            onClick={() => navigateToPage(1)}
            disabled={currentPage === 1}
            className={`rounded-lg border text-sm w-10 h-10 flex items-center justify-center ${
              currentPage === 1
                ? "bg-white text-gray-400 border-gray-300 cursor-not-allowed"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
        </PaginationItem>
        {/* Previous button */}
        <PaginationItem>
          <button
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-lg border text-sm w-10 h-10 flex items-center justify-center ${
              currentPage === 1
                ? "bg-white text-gray-400 border-gray-300 cursor-not-allowed"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </PaginationItem>

        {/* Numbered pages */}
        {generatePages().map((page, idx) =>
          typeof page === "number" ? (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage(page);
                }}
                className={`rounded-lg w-10 h-10 flex items-center justify-center ${
                  page === currentPage
                    ? "bg-custom-rose-900 text-white hover:bg-custom-rose-900 hover:text-white"
                    : "bg-blue-gray-100 text-white hover:bg-blue-gray-100 hover:text-white"
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={`ellipsis-${idx}`}>
              <div className="w-10 h-10 rounded-full text-blue-gray-900 flex items-center justify-center">
                <HiOutlineDotsHorizontal className="w-5 h-5" />
              </div>
            </PaginationItem>
          ),
        )}

        {/* Next button*/}
        <PaginationItem>
          <button
            onClick={() => navigateToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-lg border text-sm w-10 h-10 flex items-center justify-center ${
              currentPage === totalPages
                ? "bg-white text-gray-400 border-gray-300 cursor-not-allowed"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </PaginationItem>

        {/* Go to Last Page */}
        <PaginationItem>
          <button
            onClick={() => navigateToPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`rounded-lg border text-sm w-10 h-10 flex items-center justify-center ${
              currentPage === totalPages
                ? "bg-white text-gray-400 border-gray-300 cursor-not-allowed"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
