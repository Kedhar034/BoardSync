"use client";

import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
    id: string;
    layer: RectangleLayer;
    onPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const Rectangle = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}:RectangleProps) =>{

    const { x,y,width,height,fill } = layer;

    return (
        <rect
        className="drop-shadow-md"
        onPointerDown={(e)=>onPointerDown(e,id)}
        style={{
            transform: `translate(${x}px, ${y}px)`,
        }}
        x={0}
        y={0}
        width={width}
        height={height}
        fill={fill ? colorToCss(fill) : "#000000"}
        strokeWidth={1}
        stroke={selectionColor || "transparent"}

        />
    )
}