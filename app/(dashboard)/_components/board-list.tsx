"use-client";

import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api"
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-boardbutton";
import { useAuth } from "@clerk/nextjs";

interface BoardListProps {
    OrganizationId: string;
    query: {
        search?: string;
        favorites?: string;
    };
}

export const BoardList = ({
    OrganizationId,
    query,
}: BoardListProps) => {
    const { userId } = useAuth();
    const data = useQuery(api.boards.get, { 
        orgId: OrganizationId,
        search: query.search,
        favorites: query.favorites === "true",
    });

    // Get user favorites for this organization
    const favorites = useQuery(api.boards.getUserFavorites, {
        orgId: OrganizationId,
        userId: userId || "",
    });

    if(data===undefined){
        return (
            <div>
                <h2 className="text-3xl">
                    {query.favorites ? "Favorite Boards": "Team Boards"}
                </h2>
                {/* {JSON.stringify(data)} */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <NewBoardButton orgId={OrganizationId} disabled/> 
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                </div>
            </div>
        )
    }

    if(!data?.length && query.search){
        return (
            <div>
                <EmptySearch/>
            </div>
        )
    }

    if(!data?.length && query.favorites){
        return (
            <div>
                <EmptyFavorites/>
            </div>
        )
    }

    if(!data?.length){
        return (
            <div>
                <EmptyBoards/>
            </div>
        )
    }

    // Create a set of favorited board IDs for quick lookup
    const favoriteBoardIds = new Set(favorites?.map(fav => fav.boardId) || []);

    return (
        <div>
            <h2 className="text-3xl">
                {query.favorites ? "Favorite Boards": "Team Boards"}
            </h2>
            {/* {JSON.stringify(data)} */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <NewBoardButton
                    orgId={OrganizationId}
                />
                {data?.map((board) => (
                    <BoardCard 
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        imageUrl={board.imageUrl}
                        authorId={board.authorId}
                        authorName={board.authorName}
                        createdAt={board._creationTime}
                        orgId={board.orgId}
                        isFavorite={favoriteBoardIds.has(board._id)}
                    />
                ))}
            </div>
        </div>
    );
};