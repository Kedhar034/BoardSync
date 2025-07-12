"use client";

import Link from "next/link"
import Image from "next/image"
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { MoreHorizontal } from "lucide-react";
import { Actions } from "@/components/actions";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";



interface BoardCardProps {
    id:string;
    title: string;
    authorName : string;
    authorId: string;
    createdAt : number;
    imageUrl : string;
    orgId: string;
    isFavorite: boolean;


}

export const BoardCard = ({
    id, 
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,
    isFavorite,
}:BoardCardProps) => {
    
    const { userId } = useAuth();
    
    const authorLabel = userId ===authorId ? "You" : authorName;
    const createAtLable = formatDistanceToNow(createdAt,{

        addSuffix: true,


    });

    const createFavorite = useMutation(api.board.favorite);
    const deleteFavorite = useMutation(api.board.unfavorite);

    const toggleFavorite = () =>{
        console.log("Toggle favorite called", { isFavorite, id, orgId });
        
        if(isFavorite){
            console.log("Attempting to unfavorite board", { orgId, boardId: id });
            deleteFavorite({orgId, boardId: id as Id<"boards">})
            .then(() => {
                console.log("Board unfavorited successfully");
                toast.success("Board unfavorited");
            })
            .catch((error) => {
                console.error("Failed to unfavorite board:", error);
                toast.error("Failed to unfavorite board");
            });
        }else{
            console.log("Attempting to favorite board", { orgId, boardId: id });
            createFavorite({orgId, boardId: id as Id<"boards">})
            .then(() => {
                console.log("Board favorited successfully");
                toast.success("Board favorited");
            })
            .catch((error) => {
                console.error("Failed to favorite board:", error);
                toast.error("Failed to favorite board");
            });
        }
    }

    return (
        <Link href={`/board/${id}`} onClick={(e) => {
            // Prevent navigation if clicking on the star button area
            const target = e.target as HTMLElement;
            if (target.closest('button')) {
                e.preventDefault();
            }
        }}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="objectfit"
                    />
                    <Overlay />
                    <Actions 
                        id={id} 
                        title={title}
                        side="right"
                    >
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal
                                className="text-white opacity-75 hover:opacity-100 transition-opacity"
                            />
                        </button>
                    </Actions>

                </div>
                <Footer
                isFavorite={isFavorite}
                title={title}
                authorLabel={authorLabel}
                createdAtLable={createAtLable}
                onClick={toggleFavorite}
                disabled={false}
                
                />
            </div>
        </Link>
    );
};


BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/127] rounded-lg  overflow-hidden"></div>
    );
};