import { createClient, LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import {Layer, Color} from "@/types/canvas";

const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblocks-auth",
});



// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      cursor: {
        x: number;
        y: number;
      } | null,
      selection: string[],
    }

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      layers: LiveMap<string,LiveObject<Layer>>;
      layerIds: LiveList<string>;
    }

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info?: {
        name: string;
        picture: string;
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: Record<string, never>;
      // Example has two events, using a union
      // | { type: "PLAY" } 
      // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: Record<string, never>;

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: Record<string, never>;
  }
}

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useSelf,
    useOthers, 
    useStorage,
    useMutation,
    useEventListener,
    useBroadcastEvent,
    useThreads,
    useCreateThread,
    useRoomInfo,
    useHistory,
    useCanRedo,
    useCanUndo,
    useUndo,
    useRedo,
    useOthersConnectionIds,
  },
} = createRoomContext(client);
