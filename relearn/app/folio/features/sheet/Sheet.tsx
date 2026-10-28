"use client";

import { formats } from "../sheet-format/formats";
import type { SheetFormat } from "./sheet.types";

type SheetProps = {
    format: keyof typeof formats;
    zoom: number;
    content: string;
    previewFormat: SheetFormat | null;
    onContentChange: (content: string) => void;
};

const SHEET_INSET = 42;

export default function Sheet({ format, zoom, content, previewFormat, onContentChange }: SheetProps) {

    const currentFormat = formats[format];
    const preview = previewFormat ? formats[previewFormat] : null;

    return (
        <div
            style={{
                width: currentFormat.width,
                height: currentFormat.height * (zoom / 100),
                flexShrink: 0,
                position: "relative",
            }}
        >
            <div 
                className="box-border absolute top-0 left-0
                       overflow-hidden border border-dashed
                       border-[#a7a78a] bg-white p-5 shadow-sm"
                style={{
                    width: currentFormat.width,
                    height: currentFormat.height,
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top center",
                }}
            >
                <textarea
                    value={content}
                    onChange={(event) =>
                        onContentChange(event.currentTarget.value)
                    }
                    placeholder="Ecrire ici..."
                    className="relative z-0 block box-border h-full w-full 
                            resize-none overflow-hidden border-none 
                            bg-transparent text-lg leading-relaxed 
                            text-[#454536] outline-none 
                            placeholder:text-[#b5b5a3]"
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