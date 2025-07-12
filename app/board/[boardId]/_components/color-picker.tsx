"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
    color: Color;
    onChange: (color: Color) => void;
}

export const ColorPicker = ({
    color,
    onChange,
}: ColorPickerProps) => {
    const colors: Color[] = [
        // Reds
        { r: 255, g: 0, b: 0, a: 1 },      // Red
        { r: 255, g: 100, b: 100, a: 1 },  // Light Red
        { r: 139, g: 0, b: 0, a: 1 },      // Dark Red
        
        // Oranges
        { r: 255, g: 165, b: 0, a: 1 },    // Orange
        { r: 255, g: 140, b: 0, a: 1 },    // Dark Orange
        
        // Yellows
        { r: 255, g: 255, b: 0, a: 1 },    // Yellow
        { r: 255, g: 215, b: 0, a: 1 },    // Gold
        
        // Greens
        { r: 0, g: 255, b: 0, a: 1 },      // Green
        { r: 0, g: 128, b: 0, a: 1 },      // Dark Green
        { r: 144, g: 238, b: 144, a: 1 },  // Light Green
        
        // Blues
        { r: 0, g: 0, b: 255, a: 1 },      // Blue
        { r: 0, g: 191, b: 255, a: 1 },    // Deep Sky Blue
        { r: 30, g: 144, b: 255, a: 1 },   // Dodger Blue
        
        // Purples
        { r: 128, g: 0, b: 128, a: 1 },    // Purple
        { r: 255, g: 0, b: 255, a: 1 },    // Magenta
        
        // Pinks
        { r: 255, g: 192, b: 203, a: 1 },  // Pink
        { r: 255, g: 20, b: 147, a: 1 },   // Deep Pink
        
        // Grays and Blacks
        { r: 0, g: 0, b: 0, a: 1 },        // Black
        { r: 128, g: 128, b: 128, a: 1 },  // Gray
        { r: 255, g: 255, b: 255, a: 1 },  // White
    ];

    return (
        <div className="flex flex-wrap gap-1 items-center max-w-[200px] pr-2 mr-2 border-r">
            {colors.map((colorOption, index) => (
                <ColorButton 
                    key={index}
                    color={colorOption} 
                    onClick={onChange}
                    isSelected={
                        color.r === colorOption.r && 
                        color.g === colorOption.g && 
                        color.b === colorOption.b
                    }
                />
            ))}
        </div>
    )
};

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
    isSelected?: boolean;
}

const ColorButton = ({
    onClick,
    color,
    isSelected = false,
}: ColorButtonProps) => {
    return (
        <button 
        className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
        onClick={() => onClick(color)}>
           <div 
            className={`w-8 h-8 rounded-md border-2 transition-all ${
                isSelected 
                    ? "border-neutral-800 scale-110" 
                    : "border-neutral-300 hover:border-neutral-600"
            }`}
            style={{
                background: colorToCss(color),
            }}
           />
        </button>
    )
}