"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FontSizeDropdownProps {
  onFontSizeChange: (fontSize: number) => void;
  currentFontSize?: number;
}

const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96];

export const FontSizeDropdown = ({
  onFontSizeChange,
  currentFontSize = 24,
}: FontSizeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-20 h-8 text-xs"
        >
          {currentFontSize}px
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {fontSizes.map((size) => (
          <DropdownMenuItem
            key={size}
            onClick={() => {
              onFontSizeChange(size);
              setIsOpen(false);
            }}
            className={currentFontSize === size ? "bg-blue-50" : ""}
          >
            {size}px
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}; 