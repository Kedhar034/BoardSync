"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";
import { connectionIdtoColor } from "@/lib/utils";
import { useOthers } from "@/liveblocks.config";

interface CursorProps {
    connectionId: string;
}

export const Cursor = memo(({
    connectionId
}:CursorProps) => {
    const others = useOthers();
    const user = others.find(other => other.connectionId === parseInt(connectionId));
    const cursor = user?.presence?.cursor;

    if(!cursor) return null;

    const {x,y} = cursor;

    const name = user?.info?.name || "Teammate";

    return (
        <foreignObject 
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
            width={name.length * 10+24}
            height={20}
            className="relative drop-shadow-md pointer-events-none"
        >
            <MousePointer2 
                className="w-4 h-4"
                style={{
                    fill: connectionIdtoColor(parseInt(connectionId)),
                    color: connectionIdtoColor(parseInt(connectionId)),
                }}
            />
            <div
            className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
            >
                {name}
            </div>
        </foreignObject>
    )
})

Cursor.displayName = "Cursor";