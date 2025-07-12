export type Color = {
    r: number;
    g: number;
    b: number;
    a: number;
}

export type camera= {
    x: number;
    y: number;
};

export enum LayerType {
    Rectangle,
    Ellipse,
    Triangle,
    Line,
    Arrow,
    Text,
    Note,
    Path,
    Image,
    Pencil,
    Eraser,
}

export type RectangleLayer = {
    type:LayerType.Rectangle;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    value?:string;

};

export type EllipseLayer = {
    type:LayerType.Ellipse;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    value?:string;

};

export type TriangleLayer = {
    type:LayerType.Triangle;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    value?:string;

};  

export type PathLayer = {
    type:LayerType.Path;
    x:number;
    y:number;
    points:number[][];
    fill:Color;
    stroke:Color;
    strokeWidth:number;
    value?:string;

};

export type TextLayer = {
    type:LayerType.Text;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    value?:string;
    fontSize?:number;

};

export type NoteLayer = {
    type:LayerType.Note;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    value?:string;

};

export type ImageLayer = {
    type:LayerType.Image;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    value?:string;

};


export type PencilLayer = {
    type:LayerType.Pencil;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    value?:string;

};

export type Point={
    x:number;
    y:number;
}

export type XYwH={
    x:number;
    y:number;
    width:number;
    height:number;
}

export enum Side {
    Top=1,
    Bottom=2,
    Left=4,
    Right=8,
}

export type CanvasState = 
    // each tool has different state type using the Typescript discriminated union
    | {
        mode: CanvasMode.None;
    }
    | {
        mode: CanvasMode.Pressing;
        origin: Point;
    }
    | {
        mode: CanvasMode.Dragging;
    }
    | {
        mode: CanvasMode.Drawing;
    }
    | {
        mode: CanvasMode.Moving;
    }
    | {
        mode: CanvasMode.Resizing;
        initialBounds: XYwH;
        corner: Side;
    }
    | {
        mode: CanvasMode.Pencil;
    }
    | {
        mode: CanvasMode.Note;
    }
    | {
        mode: CanvasMode.Text;
    }
    | {
        mode: CanvasMode.Ellipse;
    }
    | {
        mode: CanvasMode.Square;
    }
    | {
        mode: CanvasMode.Triangle;
    }
    | {
        mode: CanvasMode.Line;
    }
    | {
        mode: CanvasMode.Arrow;
    }
    | {
        mode: CanvasMode.Inserting;
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Triangle | LayerType.Path | LayerType.Text | LayerType.Note | LayerType.Image | LayerType.Pencil;

    }
    | {
        mode: CanvasMode.SelectionNet,
        origin:Point,
        current?:Point,
    }
    | {
        mode: CanvasMode.Translating,
        current: Point,
        origin:Point,
    }
  


export enum CanvasMode {
    None,
    Pressing,
    Dragging,
    Drawing,
    Moving,
    Resizing,
    Pencil,
    SelectionNet,
    Translating,
    Note,
    Text,
    Ellipse,
    Square,
    Triangle,
    Line,
    Arrow,
    Inserting,
};

export type Layer = RectangleLayer | EllipseLayer | TriangleLayer | PathLayer | TextLayer | NoteLayer | ImageLayer | PencilLayer;

