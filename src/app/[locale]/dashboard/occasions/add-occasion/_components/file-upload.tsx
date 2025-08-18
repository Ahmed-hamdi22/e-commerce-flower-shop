"use client";

import type React from "react";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { MdUploadFile } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

export interface FileUploadHandle {
  reset: () => void;
}

export const FileUpload = forwardRef<FileUploadHandle, FileUploadProps>(
  ({ onFileSelect, accept = "image/*" }, ref) => {
    // Translation
    const t = useTranslations();

    // State
    const [fileName, setFileName] = useState<string>("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Function to handle the click event and trigger the file input element
    const handleFileClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    // Function to handle changes in file input
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        setFileName(file.name);
        onFileSelect(file);
      }
    };

    // Imperative handle to allow parent component to reset file input
    useImperativeHandle(ref, () => ({
      reset: () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setFileName("");
      },
    }));

    return (
      <div>
        <div
          className="flex items-center justify-end h-[49px] w-[746px] rounded-lg border border-input"
          onClick={handleFileClick}
        >
          {/* Display file name in input */}
          <span>{fileName}</span>

          {/* Button */}
          <Button
            type="button"
            variant="outline"
            className="text-custom-rose-900 hover:text-custom-rose-900 hover:bg-transparent"
          >
            {/* Icon */}
            <MdUploadFile className="text-gray-500 w-8 h-8 " />
            {t("upload-file")}
          </Button>
        </div>

        {/* Input */}
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="sr-only"
          accept={accept}
        />
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";
