import { useMutation,useSelf } from "@liveblocks/react";

export const useDeleteLayers = ()=>{
    const selection = useSelf((me)=>me.presence.selection);

    return useMutation((
        {storage, setMyPresence}
    )=>{
        const liveLayers = storage.get("layers");
        const livelayersIds = storage.get("layerIds");

        for( const id of selection){
            liveLayers.delete(id);

            const index = livelayersIds.indexOf(id);

            if(index !== -1){
                livelayersIds.delete(index);
            }
        }

        setMyPresence({
            selection: [],
        }, {addToHistory: true})
    }, [selection]);
}