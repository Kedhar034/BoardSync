"use client";

import { useState } from "react";
import { Color } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";

interface SimpleColorWheelProps {
    color: Color;
    onChange: (color: Color) => void;
}

export const SimpleColorWheel = ({
    color,
    onChange,
}: SimpleColorWheelProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const predefinedColors: Color[] = [
        { r: 255, g: 0, b: 0, a: 1 },     // Red
        { r: 255, g: 127, b: 0, a: 1 },   // Orange
        { r: 255, g: 255, b: 0, a: 1 },   // Yellow
        { r: 0, g: 255, b: 0, a: 1 },     // Green
        { r: 0, g: 255, b: 255, a: 1 },   // Cyan
        { r: 0, g: 0, b: 255, a: 1 },     // Blue
        { r: 128, g: 0, b: 255, a: 1 },   // Purple
        { r: 255, g: 0, b: 255, a: 1 },   // Magenta
        { r: 255, g: 192, b: 203, a: 1 }, // Pink
        { r: 255, g: 165, b: 0, a: 1 },   // Orange
        { r: 255, g: 255, b: 255, a: 1 }, // White
        { r: 128, g: 128, b: 128, a: 1 }, // Gray
        { r: 0, g: 0, b: 0, a: 1 },       // Black
    ];

    return (
        <div className="relative">
            <button
                className="w-8 h-8 rounded-md border-2 border-neutral-300 hover:border-neutral-600 transition-all"
                style={{ background: colorToCss(color) }}
                onClick={() => setIsOpen(!isOpen)}
            />
            
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 p-2 bg-white rounded-lg shadow-lg border z-50">
                    <div className="grid grid-cols-4 gap-1">
                        {predefinedColors.map((predefinedColor, index) => (
                            <button
                                key={index}
                                className="w-6 h-6 rounded border border-neutral-300 hover:border-neutral-600 transition-all"
                                style={{ background: colorToCss(predefinedColor) }}
                                onClick={() => {
                                    onChange(predefinedColor);
                                    setIsOpen(false);
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 