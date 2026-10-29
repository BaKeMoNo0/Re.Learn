
"use client";

import { useState } from "react";
import { formats, type Format as FormatType } from "./formats";

type FormatProps = {
    format: FormatType;
    onFormatChange: (format: FormatType) => void;
};

export default function Format({
    format,
    onFormatChange,
}: FormatProps) {
    const [isFormatMenuOpen, setIsFormatMenuOpen] = useState(false);

    return (
        
        <div className="relative">
            <button
                type="button"
                aria-label={`Format du document : ${format}`}
                aria-expanded={isFormatMenuOpen}
                onClick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
                className={`flex h-11 min-w-11 items-center justify-center gap-1 rounded-full px-3 text-sm font-semibold transition-colors ${
                    isFormatMenuOpen
                        ? "bg-[#777b5b] text-[#ffffe3]"
                        : "bg-[#d8d9b8] text-[#454536] hover:bg-[#c6c9a0]"
                }`}
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
                <div className="absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2">
                    <div className="flex flex-row min-w-48 rounded-2xl border border-[#d5d5b5] bg-[#f7f7e7] p-2 shadow-lg">
                        <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-[#85856b]">
                            Format papier
                        </p>

                        {(
                            Object.keys(formats) as FormatType[]
                        ).map((item) => {
                            const selected = format === item;
                            const dimensions = formats[item];

                            return (
                                <button
                                    key={item}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => {
                                        onFormatChange(item);
                                        setIsFormatMenuOpen(false);
                                    }}
                                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                                        selected
                                            ? "bg-[#a7a78a] font-semibold text-[#ffffe3]"
                                            : "text-[#454536] hover:bg-[#e5e5ce]"
                                    }`}
                                >
                                    <span>{item}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-x-[7px] border-t-[7px] border-x-transparent border-t-[#f7f7e7]" />
                </div>
            )}
        </div>
        
    );
}
