import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { camera, Color, Layer, Point, Side, XYwH } from "@/types/canvas";


const colors = [
    "#DC2626",
    "#F59E0B",
    "#16A34A",
    "#10B981",
    "#06B6D4",
    "#0EA5E9",
    "#8B5CF6",
    "#EC4899",
    "#F43F5E",
    "#F59E0B",
    "#16A34A",
    "#10B981",
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function connectionIdtoColor(connectionId: number): string {
  return colors[connectionId%colors.length]
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: camera
) {
  return {
    x:Math.round(e.clientX) - camera.x,
    y:Math.round(e.clientY) - camera.y,
  }
};

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`
}

export function resizeBounds(
  bounds: XYwH,
  corner: Side,
  point: Point

): XYwH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  }

  if((corner & Side.Left) === Side.Left){
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }
  if((corner & Side.Right) === Side.Right){
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(bounds.x - point.x);
  }

  if((corner & Side.Top) === Side.Top){
    result.y = Math.min(point.y, bounds.y+ bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if((corner & Side.Bottom) === Side.Bottom){
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(bounds.y - point.y);
  }

  return result;
}


export function findIntersectingLayerswithRectangle(
  layerIds:readonly string[],
  layers: ReadonlyMap<string , Layer>,
  a:Point,
  b:Point,
){
  const rect ={
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  }

  const ids = [];

  for( const layerId of layerIds){
    const layer = layers.get(layerId);

    if(layer ==null ){
      continue;
    }

    // Access properties directly since layers are immutable objects
    // All layer types have x, y, width, height properties
    const { x, y, width, height } = layer as { x: number; y: number; width: number; height: number };
    if(
      rect.x + rect.width > x && rect.x < x + width &&
      rect.y + rect.height > y && rect.y < y + height
    ){
      ids.push(layerId);
    }
  }

  return ids;
}

export function getContrastingTextColor(color: Color){

  const luminance = 0.299 * color.r + 0.587 * color.g + 0.0722 * color.b;

  return luminance > 182 ? "black" : "white";
}

