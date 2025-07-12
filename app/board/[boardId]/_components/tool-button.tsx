"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";


interface ToolButtonProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
}


export const ToolButton = ({
    icon: Icon,
    onClick,
    isActive,
    isDisabled,
    label,
}:ToolButtonProps)=>{
    return (
        <Hint label={label} side="right" sideOffset={10}>
            <Button
                variant={isActive ? "boardActive" : "board"}
                size="icon" 
                onClick={onClick}
                disabled={isDisabled}
                className={cn("relative", isActive && "bg-accent")}
            >
                <Icon  />
            </Button>
        </Hint>
    )
}
