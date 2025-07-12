import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = [
    "/placeholders/1.jpg",
    "/placeholders/2.jpg",
    "/placeholders/3.jpg",
    "/placeholders/4.jpg",
    "/placeholders/5.jpg",
    "/placeholders/6.jpg",
    "/placeholders/7.jpg",
    "/placeholders/8.jpg",
    "/placeholders/9.jpg",
    "/placeholders/10.jpg",

];

export const create = mutation({
    args:{
        orgId: v.string(),
        title: v.string(),

    },
    handler: async (ctx, args) =>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,

        });

        return board;
    },

});

export const remove = mutation({
    args:{ id: v.id("boards")},
    handler: async (ctx,args) =>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("unauthorized");

        }

        // Delete all favorites for this board
        const favorites = await ctx.db
            .query("userFavorites")
            .withIndex("by_board", (q) => q.eq("boardId", args.id))
            .collect();

        for (const favorite of favorites) {
            await ctx.db.delete(favorite._id);
        }

        await ctx.db.delete(args.id);

    }
})

export const update = mutation({
    args:{id: v.id("boards"), title: v.string()},
    handler: async (ctx,args) =>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");

        }
        const title = args.title.trim();

        if(!title){
            throw new Error("No title is given");
        }

        if(title.length>60){
            throw new Error("Title cannot be more than 60 chars")
        }

        const board = await ctx.db.patch(args.id, {
            title:args.title,
        });

        return board;

    },

})


export const favorite = mutation({
    args:{ orgId: v.string(), boardId: v.id("boards")},
    handler: async(ctx,args) =>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }
        const board = await ctx.db.get(args.boardId);

        if(!board){
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db.query("userFavorites")
            .withIndex("by_user_board_org", (q) =>
                q.eq("boardId", board._id)
                    .eq("userId", userId)
                    .eq("orgId", args.orgId)
            )
            .unique();

        if(existingFavorite){
            return board;
        }

        await ctx.db.insert("userFavorites",{
            orgId: args.orgId,
            userId: userId,
            boardId: board._id,
        });

        return board;
    }
});


export const unfavorite = mutation({
    args:{ orgId: v.string(), boardId: v.id("boards")},
    handler: async(ctx,args) =>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }
        const board = await ctx.db.get(args.boardId);

        if(!board){
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db.query("userFavorites")
            .withIndex("by_user_board_org", (q) =>
                q.eq("boardId", board._id)
                    .eq("userId", userId)
                    .eq("orgId", args.orgId)
            )
            .unique();

        if(existingFavorite){
            await ctx.db.delete(existingFavorite._id);
        }

        return board;
    }
});

export const get = query({
    args:{id: v.id("boards")},
    handler: async(ctx,args) =>{
        const board = await ctx.db.get(args.id);

        if(!board){
            throw new Error("Board not found");
        }

        return board;
    }
})
