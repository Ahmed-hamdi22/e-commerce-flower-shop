"use client";

import { DeleteConfirmationDialog } from "@/components/features/dashboard/dialog/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDeleteOccasion from "@/hooks/occasion/use-delete-occasion";
import { Pencil, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export function OcassionsTable({ data }: { data: Occasions[] }) {
  // State for dialog control
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<{ id: string; name: string } | null>(null);

  // Locale
  const locale = useLocale();

  //  Translations
  const t = useTranslations();

  // Mutate
  const { mutate, isPending } = useDeleteOccasion();

  // Functions
  const onDelete = (id: string, name: string) => {
    setCurrentItem({ id, name });
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentItem) {
      mutate({ occasionId: currentItem.id });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      {/* Table header */}
      <Table className="mt-10 w-full px-20 mx-auto">
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
                <TableCell className="flex-1 flex justify-end">
                  <Button
                    size="sm"
                    className="text-stats-orders-primary bg-stats-orders-bg hover:bg-stats-order-bg/20 mr-2 ml-2"
                    asChild
                  >
                    <Link href={`/${locale}/dashboard/occasions/${item._id}/update-occasion`}>
                      <Pencil className="mr-1" />
                      {t("edit")}
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-custom-red hover:bg-custom-red/20 text-custom-red-2"
                    onClick={() => onDelete(item._id, item.name)}
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
