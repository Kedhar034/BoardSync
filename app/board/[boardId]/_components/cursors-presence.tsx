"use client";

// trottle is minimum and connectio nis fast
import { memo } from "react";

import { useOthersConnectionIds } from "@/liveblocks.config";
import { Cursor } from "./cursor";

const Cursors = () => {
    const othersConnectionIds = useOthersConnectionIds();
    return (
        <>
            {othersConnectionIds.map((connectionId) => (
                <Cursor 
                    key={connectionId}
                    connectionId={connectionId.toString()}
                />
            ))}
        </>
    )
}

export const CursorsPresence = memo(() => {
    return <Cursors />
})

CursorsPresence.displayName = "CursorsPresence";
