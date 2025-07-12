import { shallow } from "@liveblocks/react";

import { Layer, XYwH, LayerType } from "@/types/canvas";
import { useStorage, useSelf } from "@liveblocks/react";

const boundingBox = (layers: Layer[]): XYwH | null => {

    const first = layers[0];

    if(!first) return null;

    let left =first.x;
    let top = first.y;
    let right = first.x + (first.type === LayerType.Path ? 0 : (first as { width: number }).width);
    let bottom = first.y + (first.type === LayerType.Path ? 0 : (first as { height: number }).height);

    for(let i =1; i<layers.length; i++){
        const { x, y, type } = layers[i];
        const width = type === LayerType.Path ? 0 : (layers[i] as { width: number }).width;
        const height = type === LayerType.Path ? 0 : (layers[i] as { height: number }).height;

        if(x < left){
            left = x;
        }

        if(y < top){
            top = y;
        }

        if(x + width > right){
            right = x + width;
        }

        if(y + height > bottom){
            bottom = y + height;
        }
        

    }
    return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
    }

};

export const useSelectionBounds = ()=>{
    const selection = useSelf((me)=>me.presence.selection);

    return useStorage((root)=>{
        const selectedLayers = selection?.map((layerId)=>root.layers.get(layerId)!
        ).filter(Boolean);
        
        console.log("Selection bounds calculation:", {
            selection,
            selectedLayersCount: selectedLayers?.length,
            bounds: boundingBox(selectedLayers || [])
        });
        
        return boundingBox(selectedLayers || []);

    },shallow);
}