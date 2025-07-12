"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";

export const EmptyBoards = () => {
    const {organization} = useOrganization();

    const create = useMutation(api.board.create);

    const onClick = ( ) => {
        if(!organization) return 

        create({
            orgId: organization.id,
            title:"untitled"
        })
        .then((id) => {
            toast.success("Board Created")
            //TODO : redirect the board/{id}
        })
        .catch(() => toast.error("Failed to create Board"));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Image
                src="/note1.png"
                height={220}
                width={220}
                alt="No found"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first Board
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Start by creatign a Board
            </p>
            <div className="mt-6">
                <Button onClick={onClick} size='lg'>
                    Create Board
                </Button>
            </div>
        </div>
    );
};