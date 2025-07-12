import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import { Circle, MousePointer2, Square, Type, StickyNote, Undo, Redo} from "lucide-react";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { FontSizeDropdown } from "./font-size-dropdown";

interface ToolbarProps {

    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    onFontSizeChange?: (fontSize: number) => void;
    currentFontSize?: number;
    
}   

export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo,
    onFontSizeChange,
    currentFontSize,

}: ToolbarProps) => {
    return (
        <div className="absolute top-60 left-4 flex-col gap-y-4 z-10">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <ToolButton
                    label="Pointer"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({mode: CanvasMode.None})}
                    isActive={
                        canvasState.mode === CanvasMode.None || 
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.Resizing ||
                        canvasState.mode === CanvasMode.Translating||
                        canvasState.mode === CanvasMode.SelectionNet 
                    }
                />
                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Ellipse,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Ellipse
                    }
                />
                <ToolButton
                    label="Square"
                    icon={Square}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Rectangle,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Rectangle
                    }
                />
                {/* <ToolButton
                    label="Pen"
                    icon={Pencil}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Pencil,
                        
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Pencil
                    }
                /> */}
                <ToolButton
                    label="Note"
                    icon={StickyNote}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Note,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                />
                <ToolButton
                    label="Text"
                    icon={Type}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Text,
                    })}


                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Text
                    }
                />

                {/* Font Size Dropdown - only show when text tool is active */}
                {(canvasState.mode === CanvasMode.Inserting && 
                  canvasState.layerType === LayerType.Text) && 
                  onFontSizeChange && (
                    <div className="mt-2">
                        <FontSizeDropdown
                            onFontSizeChange={onFontSizeChange}
                            currentFontSize={currentFontSize || 24}
                        />
                    </div>
                )}
                
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md mt-4">
                <ToolButton
                    label="Undo"
                    icon={Undo}
                    onClick={undo}
                    isDisabled={!canUndo}
                />
                <ToolButton
                    label="Redo"
                    icon={Redo}
                    onClick={redo}
                    isDisabled={!canRedo}
                />
            </div>
           
        </div>
    )
}

export const ToolbarSkeleton = () => {
    return (
        <div className="absolute top-60 left-4 flex-col gap-y-4 z-10">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <Skeleton className="h-4 w-24"/>
            </div>
        </div>
    )
}