"use client";

import { XYwH, Side } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { useSelf } from "@liveblocks/react";
import { LayerType } from "@/types/canvas";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

interface SelectionBoxProps {
    onResizeHandlePointerDown: (corner: Side, initialBounds: XYwH) => void;
}

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(({
    onResizeHandlePointerDown
}:SelectionBoxProps)=>{

    const soleLayerId= useSelf((me)=>
        me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowingHandles = useStorage((root)=>{
        if (!soleLayerId) return false;
        const layer = root.layers.get(soleLayerId);
        if (!layer) return false;
        
        // Show handles for all resizable layer types
        return layer.type === LayerType.Rectangle ||
               layer.type === LayerType.Ellipse ||
               layer.type === LayerType.Triangle ||
               layer.type === LayerType.Text ||
               layer.type === LayerType.Note ||
               layer.type === LayerType.Image ||
               layer.type === LayerType.Path;
    });

    const bounds = useSelectionBounds();

    console.log("SelectionBox bounds:", bounds);

    if(!bounds) return null;
    
    return (
        <>
        <rect
            className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
            style={{
                transform: `translate(${bounds.x}px, ${bounds.y}px)`,
            }}
            x={0}
            y={0}
            width={bounds.width}
            height={bounds.height}
        />
        {isShowingHandles && (
            <>
            {/* Top handle */}
            <rect
                className="fill-white stroke-1 stroke-blue-500"
                x={0}
                y={0}
                style={{
                    cursor: "ns-resize",
                    width: `${HANDLE_WIDTH}px`,
                    height: `${HANDLE_WIDTH}px`,
                    transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                }}
                onPointerDown={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onResizeHandlePointerDown(Side.Top, bounds);
                }}
            />
            {/* Bottom handle */}
            <rect
                className="fill-white stroke-1 stroke-blue-500"
                x={0}
                y={0}
                style={{
                    cursor: "ns-resize",
                    width: `${HANDLE_WIDTH}px`,
                    height: `${HANDLE_WIDTH}px`,
                    transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
                }}
                onPointerDown={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onResizeHandlePointerDown(Side.Bottom, bounds);
                }}
            />
            {/* Left handle */}
            <rect
                className="fill-white stroke-1 stroke-blue-500"
                x={0}
                y={0}
                style={{
                    cursor: "ew-resize",
                    width: `${HANDLE_WIDTH}px`,
                    height: `${HANDLE_WIDTH}px`,
                    transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
                }}
                onPointerDown={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onResizeHandlePointerDown(Side.Left, bounds);
                }}
            />
            {/* Right handle */}
            <rect
                className="fill-white stroke-1 stroke-blue-500"
                x={0}
                y={0}
                style={{
                    cursor: "ew-resize",
                    width: `${HANDLE_WIDTH}px`,
                    height: `${HANDLE_WIDTH}px`,
                    transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
                }}
                onPointerDown={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onResizeHandlePointerDown(Side.Right, bounds);
                }}
            />
            {/* Top-left corner handle */}
            <rect
                className="fill-white stroke-1 stroke-blue-500"
                x={0}
                y={0}
                style={{
                    cursor: "nw-resize",
                    width: `${HANDLE_WIDTH}px`,
                    height: `${HANDLE_WIDTH}px`,
                    transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                }}
                onPointerDown={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onResizeHandlePointerDown(Side.Top | Side.Left, bounds);
                }}
            />
            {/* Top-right corner handle */}
            <rect
                className="fill-white stroke-1 stroke-blue-500"
                x={0}
                y={0}
                style={{
                    cursor: "ne-resize",
                    width: `${HANDLE_WIDTH}px`,
                    height: `${HANDLE_WIDTH}px`,
                    transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                }}
                onPointerDown={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onResizeHandlePointerDown(Side.Top | Side.Right, bounds);
                }}
            />
            {/* Bottom-left corner handle */}
            <rect
                className="fill-white stroke-1 stroke-blue-500"
                x={0}
                y={0}
                style={{
                    cursor: "sw-resize",
                    width: `${HANDLE_WIDTH}px`,
                    height: `${HANDLE_WIDTH}px`,
                    transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
                }}
                onPointerDown={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onResizeHandlePointerDown(Side.Bottom | Side.Left, bounds);
                }}
            />
            {/* Bottom-right corner handle */}
            <rect
                className="fill-white stroke-1 stroke-blue-500"
                x={0}
                y={0}
                style={{
                    cursor: "se-resize",
                    width: `${HANDLE_WIDTH}px`,
                    height: `${HANDLE_WIDTH}px`,
                    transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
                }}
                onPointerDown={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onResizeHandlePointerDown(Side.Bottom | Side.Right, bounds);
                }}
            />
            </>
        )}
        </>
    );
});

SelectionBox.displayName = "SelectionBox";