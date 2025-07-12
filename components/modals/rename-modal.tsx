"use client";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";

import { useRenameModal } from "@/store/use-rename-modal";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";


export const RenameModal = () =>{
    
    const create = useMutation(api.board.update)

    const {
        isOpen,
        onClose,
        initialValues

    }= useRenameModal();

    const [title,SetTitle] = useState(initialValues.title);

    useEffect(()=>{
        SetTitle(initialValues.title);

    },[initialValues.title]);
    
    const onSubmit: FormEventHandler<HTMLFormElement> = (
        e,
    ) =>{
        e.preventDefault();
        create({
            id:initialValues.id as Id<"boards">,
            title,
        })
        .then(()=>{
            toast.success("Board Renamed");
            onClose();
        })
        .catch(()=>toast.error("Failed to remname board"))
    };

    return (
        <Dialog open={isOpen} onOpenChange ={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new Title 
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                    disabled={false}
                    required
                    maxLength={60}
                    value = {title}
                    onChange={(e)=>SetTitle(e.target.value)}
                    placeholder="Board Title"
                    />
                    <DialogFooter>
                        <DialogClose>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={false} type="submit">
                                Submit
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )

}