import ContentEditable,{ ContentEditableEvent } from "react-contenteditable";
import { TextLayer } from "@/types/canvas";
import {cn, colorToCss} from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { Kalam } from "next/font/google";

const font = Kalam({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
});

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

const calculateFontSize = (width:number, height:number, customFontSize?:number) => {
    if (customFontSize) return customFontSize;
    
    const maxFontSize =96;
    const scaleFactor=0.5;
    const fontSizeBasedonHeight= height*scaleFactor;
    const fontSizeBasedonWidth= width*scaleFactor;

    return Math.min(maxFontSize, Math.max(fontSizeBasedonHeight, fontSizeBasedonWidth));
}

export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}:TextProps) => {


    const {x, y,width, height, fill ,value, fontSize} = layer;

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
        }}
        onPointerDown={(e)=>onPointerDown(e, id)}
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
                fontSize:calculateFontSize(width, height, fontSize),
                color:fill ? colorToCss(fill) : "black",
               }}
            />
        </foreignObject>
    )
}