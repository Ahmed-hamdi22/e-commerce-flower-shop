"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useTranslations } from "use-intl";

// Type
type DeleteDialog = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
};

export function DeleteConfirmationDialog({ isOpen, onClose, onConfirm, itemName }: DeleteDialog) {
  // Translation
  const t = useTranslations();

  // Handler confirmtion
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Dialog container */}
      <DialogContent className="min-h-[371px] w-[92vw] max-w-[92vw] text-center sm:max-w-lg rtl:space-x-reverse">
        {/* Header read on server only */}
        <DialogHeader className="sr-only">
          <DialogTitle>{t("delete-title")}</DialogTitle>
          <DialogDescription>{t("description-dialog")}</DialogDescription>
        </DialogHeader>

        {/* Trash icon */}
        <div className="flex justify-center items-center mt-6">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center">
            <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
              <Trash className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Dialog message*/}
        <p className="mb-6 font-inter font-semibold text-lg">
          {t("delete-message")} {itemName}?
        </p>

        {/* Dialog footer */}
        <DialogFooter className="flex w-full flex-col gap-3 sm:flex-row sm:justify-around">
          {/* Cancel button */}
          <Button
            variant="outline"
            onClick={onClose}
            className="h-10 w-full rounded-md capitalize text-sm sm:w-52"
          >
            {t("cancel")}
          </Button>

          {/* Confirm button */}
          <Button
            onClick={handleConfirm}
            className="h-10 w-full rounded-md bg-flamingo text-sm capitalize text-white hover:bg-flamingo/80 sm:w-52"
          >
            {t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
