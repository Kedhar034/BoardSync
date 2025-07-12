"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface NewBoardButtonProps{
    orgId: string;
    disabled?: boolean;
}

export const NewBoardButton =({
    orgId,
    disabled,
}:NewBoardButtonProps) =>{
    const create = useMutation(api.board.create);

    const onClick = () => {
        create({
            orgId,
            title: "untitiled"
        })
        .then(() => {
            toast.success("Created");
        })
        .catch(() => toast.error("Failed to Create Board"));
    }

    return (
        <button
          disabled={disabled}
          onClick={onClick}
          className={cn("col-sapn-1 aspect-[100/127] bg-blue-400 rounded-lg hover:bg-blue-700 flex flex-col items-center justify-center py-6",disabled && "opacity-75 hover:bg-blue-600")}  
        >
            <div />
            <Plus className="h-12 w-12 text-white stroke-1"/>
            <p  className="text-sm text-white font-light">
                New Board
            </p>
        </button>
    )
}