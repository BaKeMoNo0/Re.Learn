
"use client";

import { useState } from "react";
import { formats, SheetFormat } from "./formats";
import { Appearance } from "../appearance/appearance.types";

type FormatProps = {
    format: SheetFormat;
    onFormatChange: (format: SheetFormat) => void;
    appearance: Appearance;
};

export default function Format({
    format,
    onFormatChange,
    appearance,
}: FormatProps) {
    const [isFormatMenuOpen, setIsFormatMenuOpen] = useState(false);

    return (
        
        <div className="relative">
            <button
                type="button"
                aria-label={`Format du document : ${format}`}
                aria-expanded={isFormatMenuOpen}
                onClick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
                style={{
                    borderColor: appearance.colors.borderColor,
                }}
                className="flex h-11 min-w-11 items-center justify-center 
                           gap-1 border rounded-full px-3
                           transition-colors hover:bg-[#d8d9b8]"
            >
                {format}
                <svg
                    viewBox="0 0 16 16"
                    className={`h-3 w-3 transition-transform ${
                        isFormatMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                >
                    <path
                        d="m4 6 4 4 4-4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {isFormatMenuOpen && (
                <div className="absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2">
                    <div className="min-w-36 rounded-2xl border border-[#d5d5b5] bg-[#ffffe3] p-2 shadow-lg">
                        <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider">
                            Format papier
                        </p>

                        {(
                            Object.keys(formats) as SheetFormat[]
                        ).map((item) => {
                            const selected = format === item;

                            return (
                                <button
                                    key={item}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => {
                                        onFormatChange(item);
                                        setIsFormatMenuOpen(false);
                                    }}
                                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                                        selected
                                            ? "bg-[#777b5b] font-semibold"
                                            : "hover:bg-[#d8d9b8]"
                                    }`}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
        
    );
}
