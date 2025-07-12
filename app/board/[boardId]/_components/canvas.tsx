"use client";

import { Info } from "./info";
import { nanoid } from "nanoid";

import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useMemo, useState } from "react";
import { CanvasState, CanvasMode, Color, LayerType, Point, camera, Layer, Side, XYwH } from "@/types/canvas";
import { useHistory, useCanRedo, useCanUndo, useMutation } from "@/liveblocks.config";
import { CursorsPresence } from "./cursors-presence";
import { useCallback } from "react";
import { connectionIdtoColor, findIntersectingLayerswithRectangle, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { useOthersMapped, useStorage } from "@liveblocks/react";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";


interface CanvasProps {
    boardId: string;
}

const MAX_LAYERS = 1000;

export const Canvas = ({
    boardId
}: CanvasProps) => {

    const layerIds = useStorage((root) => root.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
    });

    const [currentFontSize, setCurrentFontSize] = useState<number>(24);

    const [camera, setCamera] = useState<camera>({ x: 0, y: 0 });

    const history = useHistory();
    const canRedo = useCanRedo();
    const canUndo = useCanUndo();

    const insertLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
        point: Point,
        
    )=>{
        const liveLayers = storage.get("layers");
        if(liveLayers.size >= MAX_LAYERS){
            return;
        }

        const liveLayerIds = storage.get("layerIds");
        const layerId = nanoid();
        const layer = new LiveObject({
            type:layerType,
            x:point.x,
            y:point.y,
            height:100,
            width:100,
            fill: lastUsedColor,
            ...(layerType === LayerType.Text && { fontSize: currentFontSize }),
        });
        liveLayerIds.push(layerId);
        liveLayers.set(layerId,layer as unknown as LiveObject<Layer>);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({
            mode: CanvasMode.None,
        });

    },[lastUsedColor, currentFontSize]);


    const resizeSelectedLayer = useMutation((
        { storage, self },
        point:Point,
    )=>{
        if( canvasState.mode !== CanvasMode.Resizing) return;

        const bounds = resizeBounds(canvasState.initialBounds, canvasState.corner, point);

        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(self.presence.selection[0]);
        if(layer){
            layer.update(bounds);
        }

    },[camera, canvasState]);


    const unselectLayer = useMutation((
        { setMyPresence, self },
    )=>{
        if(self.presence.selection.length > 0){
            setMyPresence({ selection: [] }, { addToHistory: true });
        }
    },[]);

    const startMultiSelection = useCallback((
        current:Point,
        origin:Point,
    )=>{

        if(Math.abs(current.x - origin.x) + Math.abs(current.y-origin.y)> 5){
            setCanvasState({
                mode: CanvasMode.SelectionNet,
                origin,
                current,
            });
        }
        

    },[setCanvasState])

    const updateSelectionNet = useMutation((
        { storage, setMyPresence },
        current:Point,
        origin:Point,
    )=>{
        const layers = storage.get("layers").toImmutable();;
        setCanvasState({
            mode: CanvasMode.SelectionNet,
            origin,
            current,
        });

        const ids = findIntersectingLayerswithRectangle(
            layerIds ?? []  ,
            layers,
            origin,
            current,
        );

        setMyPresence({ selection: ids }, { addToHistory: true });
        
    },[layerIds])

    const onWheel = useCallback((e:React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
        }))
    },[])

    const translateSelectedLayer = useMutation((
        { storage, self },
        point:Point,
    )=>{
        if(canvasState.mode !== CanvasMode.Translating) return;

        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y,
        }

        const liveLayers = storage.get("layers");
        
        // Move all selected layers
        console.log("Moving layers:", self.presence.selection);
        for (const layerId of self.presence.selection) {
            const layer = liveLayers.get(layerId);
            if(layer){
                layer.update({ 
                    x: layer.get("x") + offset.x, 
                    y: layer.get("y") + offset.y 
                });
            }
        }

        setCanvasState({mode: CanvasMode.Translating, current: point, origin: point});
    },[camera, canvasState]);
    
    const onPointerMove = useMutation((
        { setMyPresence },
        e:React.PointerEvent
    )=>{
        e.preventDefault();

        const current = pointerEventToCanvasPoint(e,camera);

        if(canvasState.mode === CanvasMode.Pressing){
            startMultiSelection(current, canvasState.origin);

        }
        else if (canvasState.mode === CanvasMode.SelectionNet){
            updateSelectionNet(current, canvasState.origin);
        }
        
        else if (canvasState.mode === CanvasMode.Translating){
            translateSelectedLayer(current);
        }
        else if (canvasState.mode === CanvasMode.Resizing) {
            // Handle resize logic here
            resizeSelectedLayer(current);
        }


        setMyPresence({ cursor: current });

    },[camera, canvasState, resizeSelectedLayer, translateSelectedLayer]);



    const onPointerUp = useMutation(({ setMyPresence},e)=>{

        setMyPresence({ cursor: null });
        const point = pointerEventToCanvasPoint(e,camera);

        if(canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing){
            unselectLayer();
            setCanvasState({
                mode: CanvasMode.None,
            });
            
        }
        else if (canvasState.mode === CanvasMode.Inserting ){
            insertLayer(canvasState.layerType as LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note, point);
        } else if (canvasState.mode === CanvasMode.Resizing) {
            // Handle resize end
            setCanvasState({
                mode: CanvasMode.None,
            });
        } else{
            setCanvasState({
                mode: CanvasMode.None,
            });
        }

        history.resume();
    },[
        camera,
        canvasState,
        unselectLayer,
    ]);

    const onPointerDown = useMutation((
        { setMyPresence},
        e:React.PointerEvent
    )=>{
        const point = pointerEventToCanvasPoint(e,camera);
        
        if(canvasState.mode === CanvasMode.Inserting){
            return ;
        }
        // we shoudl add case for drawing 
        e.preventDefault();
        const current = pointerEventToCanvasPoint(e,camera);
        setMyPresence({ cursor: current });

        setCanvasState({
            mode: CanvasMode.Pressing,
            
            origin: point,
        });
    },[camera, canvasState.mode, setCanvasState]);

    const onLayerPointerDown = useMutation((
        { self, setMyPresence },
        e: React.PointerEvent,
        layerId: string
    ) => {
        e.stopPropagation();
        
        if(canvasState.mode === CanvasMode.Inserting || canvasState.mode === CanvasMode.Pencil){
            return;
        }

        history.pause();
        const point = pointerEventToCanvasPoint(e,camera);

        console.log("Layer pointer down:", {
            layerId,
            currentSelection: self.presence.selection,
            isAlreadySelected: self.presence.selection.includes(layerId)
        });

        // If the clicked layer is already selected, keep the current selection
        // If not, select only this layer
        if(!self.presence.selection.includes(layerId)){
            setMyPresence({ selection: [layerId] }, { addToHistory: true });
        }
        setCanvasState({
            mode: CanvasMode.Translating,
            current: point,
            origin: point,
        });
        


    }, [setCanvasState, camera, history,canvasState.mode]);

    const onPointerLeave = useMutation(({ setMyPresence})=>{
        setMyPresence({ cursor: null }); 
    },[]);

    const onResizeHandlePointerDown = useCallback((
        corner: Side,
        initialBounds: XYwH
    ) => {
        history.pause();
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner,
        });
    }, [history]);

    const updateFontSize = useMutation(({ storage, self }, fontSize: number) => {
        const liveLayers = storage.get("layers");
        
        // Update font size for all selected text layers
        for (const layerId of self.presence.selection) {
            const layer = liveLayers.get(layerId);
            if (layer && layer.get("type") === LayerType.Text) {
                layer.update({ fontSize });
            }
        }
    }, []);

    const handleFontSizeChange = useCallback((fontSize: number) => {
        setCurrentFontSize(fontSize);
        // Update font size of selected text layers
        updateFontSize(fontSize);
    }, [updateFontSize]);

    const selections= useOthersMapped((other) => other.presence.selection);

    const layersIdsToColorSelection = useMemo(()=>{
        const layersIdsToColorSelection: Record<string, string> = {};

        for (const user of selections){
            const [connectionId, selection] = user;

            for(const layerId of selection){
                layersIdsToColorSelection[layerId] = connectionIdtoColor(connectionId);
                console.log(layersIdsToColorSelection);
            }
        }

        return layersIdsToColorSelection;
        
    },[selections]);

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId}/>
            <Participants/>
            {/* The undo/redo system is already properly implemented using Liveblocks' built-in history system:
                History Storage: Liveblocks automatically tracks all mutations (changes) to the storage
                History Management: Uses useHistory(), useCanUndo(), and useCanRedo() hooks
                History Stack: The history is stored in Liveblocks' server and includes:
                Layer creation/deletion
                Layer modifications
                Selection changes
                Any other storage mutations */}
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState }
                undo={history.undo}
                redo={history.redo}
                canUndo={canUndo}
                canRedo={canRedo}
                onFontSizeChange={handleFontSizeChange}
                currentFontSize={currentFontSize}
                />
            {/* // all the notes will be in this svg */}
            <SelectionTools

                camera = {camera}
                setLastUsedColor = {setLastUsedColor}
            />

            <svg 
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerDown={onPointerDown}
                onPointerLeave={onPointerLeave}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`,
                    }}
                >
                    {/* // all the layers will be in this g */}
                    {layerIds?.map((layerId)=>(
                        <LayerPreview
                        key={layerId}
                        id={layerId}
                        onLayerPointerDown={onLayerPointerDown}
                        selectionColor={layersIdsToColorSelection[layerId]}
                        />
                    ))}

                    <SelectionBox
                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                    />
                    {canvasState.mode===CanvasMode.SelectionNet && canvasState.current != null && (
                        <rect
                            className="fill-blue-500/5 stroke-blue-500 stroke-1"
                            x={Math.min(canvasState.origin.x, canvasState.current.x)}
                            y={Math.min(canvasState.origin.y, canvasState.current.y)}
                            width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                            height={Math.abs(canvasState.origin.y - canvasState.current.y)}
                        />
                        
                    )}

                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}