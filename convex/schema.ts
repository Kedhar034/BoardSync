import { v } from "convex/values";
import {defineSchema, defineTable} from "convex/server";
import { title } from "process";

export default defineSchema ({
    boards: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl:v.string(),
    })



        .index("by_org",["orgId"])
        .searchIndex("search_title",{
            searchField : "title",
            filterFields: ["orgId"]
        }),

    userFavorites: defineTable({
        orgId: v.string(),
        userId: v.string(),
        boardId: v.id("boards"),
    })
    .index("by_org",["orgId"])
    .index("by_board",["boardId"])
    .index("by_user_org",["userId","orgId"])
    .index("by_user_board",["boardId","userId"])
    .index("by_user_board_org",["boardId","userId","orgId"])
    .searchIndex("search_title",{
        searchField: "boardId",
        filterFields: ["orgId","userId"]
    }),

});
