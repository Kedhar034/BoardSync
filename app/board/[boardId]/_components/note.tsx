import { useStorage } from "@/liveblocks.config";
import ContentEditable,{ ContentEditableEvent } from "react-contenteditable";
import { NoteLayer } from "@/types/canvas";
import {cn, colorToCss, getContrastingTextColor} from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { Kalam } from "next/font/google";


const font = Kalam({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
});

interface NoteProps {
    id: string;
    layer: NoteLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

const calculateFontSize = (width:number, height:number) => {
    const maxFontSize =96;
    const scaleFactor=0.5;
    const fontSizeBasedonHeight= height*scaleFactor;
    const fontSizeBasedonWidth= width*scaleFactor;

    return Math.min(maxFontSize, Math.max(fontSizeBasedonHeight, fontSizeBasedonWidth));
}

export const Note = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}:NoteProps) => {


    const {x, y,width, height, fill ,value} = layer;

    const updateValue = useMutation(({storage}, newValue:string)=>{
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newValue);
    },[])

    const handleContentChange = (e:ContentEditableEvent)=>{
        updateValue(e.target.value);
    }



    return (
        <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
            outline:selectionColor ? `1px solid ${selectionColor}` : "none",
            backgroundColor:fill ? colorToCss(fill) : "black",
        }}
        onPointerDown={(e)=>onPointerDown(e, id)}
        className="shadow-md drop-shadow-xl "
        >
            <ContentEditable
               html={value || "Text"}
               onChange={handleContentChange}
               className={cn(
                "w-full h-full",
                font.className,
                "text-2xl",
                "focus:outline-none",
                "select-none",
               )}
               style={{
                fontSize:calculateFontSize(width, height),
                color:fill ? getContrastingTextColor(fill) : "black",
               }}
            />
        </foreignObject>
    )
}