"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteConfirmationDialog } from "@/components/features/dashboard/dialog/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import useDeleteCategory from "@/hooks/category/use-delete-category";
import { Link } from "@/i18n/routing";

export function CategoriesTable({ data }: { data: Category[] }) {
  // Translations
  const t = useTranslations();

  // State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<{ id: string; name: string } | null>(null);

  // Mutate
  const { mutate, isPending } = useDeleteCategory();

  // Functions
  const onDelete = (id: string, name: string) => {
    setCurrentItem({ id, name });
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentItem) {
      mutate({ categoryId: currentItem.id });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      {/* Table header */}
      <Table className="mx-auto mt-6 min-w-[640px] w-full lg:mt-10">
        <TableHeader className="w-full bg-tableHeader">
          <TableRow className="flex w-full mt-5">
            <TableHead className="flex-1 text-black">{t("name")}</TableHead>
            <TableHead className="flex-1 text-black">{t("products")}</TableHead>
            <TableHead className="flex-1" />
          </TableRow>
        </TableHeader>
        {/* Table body */}
        <TableBody className="w-full">
          {data?.map((item) => {
            return (
              <TableRow key={item._id} className="flex w-full hover:bg-custom-rose-100">
                <TableCell className="flex-1">{item.name}</TableCell>
                <TableCell className="flex-1">
                  {item.productsCount} {t("products-0")}
                </TableCell>
                <TableCell className="flex-1 flex justify-end gap-2">
                  <Button
                    size="sm"
                    className="text-stats-orders-primary bg-stats-orders-bg hover:bg-stats-order-bg/20"
                    asChild
                  >
                    <Link href={`/dashboard/categories/${item._id}/update-category`}>
                      <Pencil className="mr-1" />
                      {t("edit")}
                    </Link>
                  </Button>
                  <Button
                    onClick={() => onDelete(item._id, item.name)}
                    size="sm"
                    className="bg-custom-red hover:bg-custom-red/20 text-custom-red-2"
                    disabled={isPending}
                  >
                    <Trash2 className="mr-1" />
                    {t("delete")}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={currentItem?.name || ""}
      />
    </>
  );
}
