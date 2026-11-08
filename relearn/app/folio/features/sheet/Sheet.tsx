"use client";

import { Appearance } from "../appearance/appearance.types";
import { formats } from "./formats";
import type { SheetFormat } from "./formats";

type SheetProps = {
    pageId: string;
    format: keyof typeof formats;
    zoom: number;
    appearance: Appearance;
    content: string;
    previewFormat: SheetFormat | null;
    onContentChange: (content: string) => void;
};

export default function Sheet({ pageId, format, zoom, appearance, content, previewFormat, onContentChange }: SheetProps) {

    const currentFormat = formats[format];
    const preview = previewFormat ? formats[previewFormat] : null;

    const background = appearance.colors.background;

    const backgroundStyle: React.CSSProperties =
        background.type === "image" && background.image
            ? {
                backgroundColor: background.color,
                backgroundImage: `url(${background.image})`,
                backgroundSize: background.size,
                backgroundRepeat:
                    background.size === "repeat" ? "repeat" : "no-repeat",
            }
            : {
                backgroundColor: background.color,
            };

    return (
        <div
            data-selection-scope="sheet"
            data-selection-id={pageId}
            data-selection-type="shape"
            style={{
                width: currentFormat.width,
                height: currentFormat.height * (zoom / 100),
                flexShrink: 0,
                position: "relative",
            }}
        >
            <div 
                style={{
                    ...backgroundStyle,
                    color: appearance.colors.color,
                    borderColor: appearance.colors.borderColor,
                    
                    width: currentFormat.width,
                    height: currentFormat.height,
                    
                    padding: appearance.layout.padding,
                    borderRadius: appearance.layout.borderRadius,

                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top center",
                }}
                className="box-border absolute top-0 left-0
                       overflow-hidden border border-dashed
                       border-[#a7a78a] shadow-sm"
            >
                <textarea
                    value={content}
                    onChange={(event) => onContentChange(event.currentTarget.value)}
                    placeholder="Ecrire ici..."
                    style={{
                        fontFamily: appearance.typography.fontFamily,
                        fontSize: appearance.typography.fontSize,
                        fontWeight: appearance.typography.fontWeight,
                        fontStyle: appearance.typography.fontStyle,
                        lineHeight: appearance.typography.lineHeight,
                        textAlign: appearance.typography.textAlign,
                        letterSpacing: appearance.typography.letterSpacing,
                        color: appearance.colors.color,
                        textDecorationLine: appearance.typography.textDecorationLine,
                        textDecorationStyle: appearance.typography.textDecorationStyle,
                        textDecorationColor: appearance.typography.textDecorationColor,
                    }}
                    className="relative z-0 block box-border h-full w-full 
                            resize-none overflow-hidden border-none 
                            bg-transparent outline-none placeholder:text-[#b5b5a3]"
                />

                {preview && (
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute z-10
                                border-2 border-dotted border-[#777b5b]"
                        style={{
                            top: 0,
                            left: "25%",
                            width: preview.width,
                            height: preview.height,
                            boxSizing: "border-box",
                            transform: "translateX(-50%)",
                        }}
                    />
                )}
            </div>
            
        </div>
    );
}