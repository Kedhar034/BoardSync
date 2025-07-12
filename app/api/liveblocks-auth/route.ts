import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth,currentUser } from "@clerk/nextjs/server";

// Initialize Convex only at runtime, not during build
const getConvex = () => {
    if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
        throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
    }
    return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
};

// Initialize Liveblocks only at runtime, not during build
const getLiveblocks = () => {
    if (!process.env.LIVEBLOCKS_SECRET_KEY) {
        throw new Error("LIVEBLOCKS_SECRET_KEY is not set");
    }
    return new Liveblocks({
        secret: process.env.LIVEBLOCKS_SECRET_KEY,
    });
};

export async function POST(req: Request) {
    const authorization = await auth();
    const user = await currentUser();

    if(!authorization || !user){
        return new Response("Unauthorized", { status: 401 });
    }

    const { room } = await req.json();

    const convex = getConvex();
    const board = await convex.query(api.board.get, {id: room});

    if(board?.orgId !== authorization.orgId){
        return new Response("Unauthorized", { status: 401 });
    }

    const UserInfo = {
        name: user.fullName || "Team Member",
        picture: user.imageUrl,
    };

    const liveblocks = getLiveblocks();
    const session = liveblocks.prepareSession(
        user.id,
        {
            userInfo: UserInfo,
        }
    );

    if(room){
        session.allow(room, session.FULL_ACCESS);
    }
    
    const { status, body } = await session.authorize();
    return new Response(body, { status });

}; 