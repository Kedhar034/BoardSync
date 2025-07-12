import { v } from "convex/values";

import { query } from "./_generated/server";

export const get = query({
    args: {
        orgId:v.string(),
        search:v.optional(v.string()),
        favorites:v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        console.log("args", args);
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }

        // If favorites is requested, get only favorited boards
        if(args.favorites){
            const userFavorites = await ctx.db
                .query("userFavorites")
                .withIndex("by_user_org", (q) => 
                    q.eq("userId", identity.subject)
                        .eq("orgId", args.orgId)
                )
                .collect();

            const favoriteBoardIds = userFavorites.map(fav => fav.boardId);
            
            if(favoriteBoardIds.length === 0) {
                return [];
            }

            // Get all boards and filter by favorite IDs
            const allBoards = await ctx.db
                .query("boards")
                .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
                .order("desc")
                .collect();

            return allBoards.filter(board => favoriteBoardIds.includes(board._id));
        }

        if(args.search){
            const boards = await ctx.db
                .query("boards")
                .withSearchIndex("search_title", (q) => q.search("title",args.search!)
                .eq("orgId", args.orgId))
                .collect();

            return boards;
        }

        const boards = await ctx.db
            .query("boards")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .order("desc")
            .collect();


        return boards;

    }
})

export const getUserFavorites = query({
    args: {
        orgId: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }

        const favorites = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_org", (q) => 
                q.eq("userId", args.userId)
                    .eq("orgId", args.orgId)
            )
            .collect();

        return favorites;
    }
})