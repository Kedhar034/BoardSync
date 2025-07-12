"use client";

import { camera, Color } from "@/types/canvas";
import { memo, useState } from "react";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";
import { useMutation } from "@liveblocks/react";
import { useSelf } from "@liveblocks/react";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { Trash2, SendToBack, BringToFront } from "lucide-react";


interface SelectionToolsProps {
    camera: camera;
    setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(({
    camera,
    setLastUsedColor,
}: SelectionToolsProps) =>{

    const selection = useSelf((me)=>me.presence.selection);

    // Default color state
    const [currentColor, setCurrentColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
    });

    const moveToFront = useMutation(({storage})=>{
        
        const livelayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = livelayerIds.toArray();

        for(let i=0;i<arr.length;i++){
            if(selection?.includes(arr[i])){
                indices.push(i);
            }
        }

        for(let i=indices.length-1;i>=0;i--){
            livelayerIds.move(indices[i],arr.length-1-(indices.length-1-i));
        }

    },[selection])

    const moveToBack = useMutation(({storage})=>{
        
        const livelayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = livelayerIds.toArray();

        for(let i=0;i<arr.length;i++){
            if(selection?.includes(arr[i])){
                indices.push(i);
            }
        }

        for(let i=0;i<indices.length;i++){
            livelayerIds.move(indices[i], i);

        }
    },[selection])

    const setFill = useMutation(({storage}, fill: Color) =>{

        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);
        setCurrentColor(fill);

        selection?.forEach((id)=>{
            liveLayers.get(id)?.set("fill", fill);
        })
    }, [selection, setLastUsedColor]);


    const deleteLayers = useDeleteLayers();

    const selectionBounds = useSelectionBounds();

    if(!selectionBounds) return null;

    // Calculate position in screen coordinates
    // The bounds are in canvas coordinates, so we need to add camera offset
    const x = selectionBounds.x + camera.x + selectionBounds.width / 2;
    const y = selectionBounds.y + camera.y - 16; // Position above the selection



    return (
        <div className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
            style={{
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 100%))`,
            }}
        >
           <ColorPicker
              color={currentColor}
              onChange={setFill}
           />
            <div className="flex flex-col gap-y-0.5">
                <Hint label="Bring to front">
                    <Button 
                    variant="board"
                    size="icon"
                    onClick={moveToFront}
                    >
                        <BringToFront />
                    </Button>
                </Hint>
                <Hint label="send to back">
                    <Button 
                    variant="board"
                    size="icon"
                    onClick={moveToBack}
                    >
                        <SendToBack />
                    </Button>
                </Hint>
                
            </div>

           <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
            <Hint label="Delete">
                <Button
                    variant="board"
                    size="icon"
                    onClick={deleteLayers}
                    
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </Hint>
            
           </div>
           
        </div>
    )

   }, (prevProps, nextProps) =>{
    return prevProps.camera === nextProps.camera && prevProps.setLastUsedColor === nextProps.setLastUsedColor;
});

SelectionTools.displayName = "SelectionTools";