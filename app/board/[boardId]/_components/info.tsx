"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Hint } from "@/components/hint";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

const TabSeperator = () => {
    return (
        <div className="text-neutral-300 px-1.5">

        </div>
    );
};

interface InfoProps {
    boardId: string;
}

const font = Poppins({
    subsets:["latin"],
    weight:["400","500","600","700"],
});

export const Info = ({
    boardId
}: InfoProps) => {

    const { onOpen } = useRenameModal();

    const data = useQuery(api.board.get,{
        id:boardId as Id<"boards">,
    });
    return (
        <div className="absolute top-2 left-2  bg-white rounded-md px-1.5 h-12 flex items-center justify-center shadow-md">
            <Hint label="Go to Home" side="bottom" sideOffset={10}>
                <Button asChild variant="board" className="px-2">
                    <Link href="/">
                        <Image
                        src="/board.png" 
                        alt="logo"
                        width={40}
                        height={40}
                        />
                        <span className={cn("font-semibold text-xl  text-black",font.className)}>
                            BoardSync
                        </span>
                    </Link>
                </Button>
            </Hint>
            <TabSeperator/>
            <Hint label="Rename Board" side="bottom" sideOffset={10}>
            <Button
             onClick={()=>onOpen(data?._id as string,data?.title as string)}
             variant="board" className="text-base font-medium-2">
                {data?.title}
            </Button>
            </Hint>
            <TabSeperator/>
            <Actions
                id={data?._id as Id<"boards">}
                title={data?.title as string}
                side="bottom"
                sideOffset={10}
            >
                <div>
                    <Hint label="Main Menu" side="bottom" sideOffset={10}>
                        <Button size="icon" variant="board">
                            <Menu />
                        </Button>
                    </Hint>
                </div>
                
            </Actions>
            
        </div>
    )
}

export const InfoSkeleton = () => {
    return (
        <div className="absolute top-2 left-2  bg-white rounded-md px-1.5 h-12 flex items-center  shadow-md w-[300]">
            <Skeleton className="h-full w-full bg-muted-400"/>
        </div>
    )
}


