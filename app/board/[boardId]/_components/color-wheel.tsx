"use client";

import { useState, useRef, useEffect } from "react";
import { Color } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";

interface ColorWheelProps {
    color: Color;
    onChange: (color: Color) => void;
}

export const ColorWheel = ({
    color,
    onChange,
}: ColorWheelProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const wheelRef = useRef<HTMLDivElement>(null);

    // Convert RGB to HSL for easier manipulation
    const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h * 360, s * 100, l * 100];
    };

    // Convert HSL to RGB
    const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
        h /= 360;
        s /= 100;
        l /= 100;

        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    };

    const [hue, saturation, lightness] = rgbToHsl(color.r, color.g, color.b);

    const handleWheelClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!wheelRef.current) return;

        const rect = wheelRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = e.clientX - rect.left - centerX;
        const y = e.clientY - rect.top - centerY;

        // Calculate distance from center
        const distance = Math.sqrt(x * x + y * y);
        const maxRadius = Math.min(centerX, centerY) - 10;

        if (distance <= maxRadius) {
            // Calculate hue from angle
            const angle = Math.atan2(y, x) * (180 / Math.PI);
            const hue = (angle + 360) % 360;
            
            // Calculate saturation from distance (0 at center, 100 at edge)
            const saturation = Math.min(100, (distance / maxRadius) * 100);

            const [r, g, b] = hslToRgb(hue, saturation, lightness);
            onChange({ r, g, b, a: color.a });
        }
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !wheelRef.current) return;
        
        const rect = wheelRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = e.clientX - rect.left - centerX;
        const y = e.clientY - rect.top - centerY;

        const distance = Math.sqrt(x * x + y * y);
        const maxRadius = Math.min(centerX, centerY) - 10;

        if (distance <= maxRadius) {
            const angle = Math.atan2(y, x) * (180 / Math.PI);
            const hue = (angle + 360) % 360;
            const saturation = Math.min(100, (distance / maxRadius) * 100);

            const [r, g, b] = hslToRgb(hue, saturation, lightness);
            onChange({ r, g, b, a: color.a });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, lightness]);

    // Close color wheel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && !event.target) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isOpen]);

    return (
        <div className="relative">
            <button
                className="w-8 h-8 rounded-md border-2 border-neutral-300 hover:border-neutral-600 transition-all"
                style={{ background: colorToCss(color) }}
                onClick={() => setIsOpen(!isOpen)}
            />
            
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-lg shadow-lg border z-50">
                    <div className="flex flex-col items-center gap-4">
                        <div
                            ref={wheelRef}
                            className="w-32 h-32 rounded-full cursor-pointer relative"
                            style={{
                                background: `conic-gradient(
                                    hsl(0, 100%, ${lightness}%),
                                    hsl(60, 100%, ${lightness}%),
                                    hsl(120, 100%, ${lightness}%),
                                    hsl(180, 100%, ${lightness}%),
                                    hsl(240, 100%, ${lightness}%),
                                    hsl(300, 100%, ${lightness}%),
                                    hsl(360, 100%, ${lightness}%)
                                )`,
                            }}
                            onClick={handleWheelClick}
                            onMouseDown={handleMouseDown}
                        />
                        
                        {/* Lightness slider */}
                        <div className="w-full">
                            <label className="text-xs text-neutral-600 mb-1 block">Brightness</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={lightness}
                                onChange={(e) => {
                                    const newLightness = parseInt(e.target.value);
                                    const [r, g, b] = hslToRgb(hue, saturation, newLightness);
                                    onChange({ r, g, b, a: color.a });
                                }}
                                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Alpha slider */}
                        <div className="w-full">
                            <label className="text-xs text-neutral-600 mb-1 block">Opacity</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={color.a * 100}
                                onChange={(e) => {
                                    const newAlpha = parseInt(e.target.value) / 100;
                                    onChange({ ...color, a: newAlpha });
                                }}
                                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Color preview */}
                        <div className="w-full h-8 rounded border" style={{ background: colorToCss(color) }} />
                    </div>
                </div>
            )}
        </div>
    );
}; 