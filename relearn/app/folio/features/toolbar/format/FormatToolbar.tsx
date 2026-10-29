"use client";

import { formats, type Format } from "./formats";
import FormatTool from "./FormatTool";

type ToolbarProps = {
    format: Format;
    onFormatChange: (format: Format) => void;
};


export default function Toolbar({format, onFormatChange}: ToolbarProps) {
    
    return (
        <div className="flex items-center gap-2 rounded-2xl border border-[#d5d5b5] bg-[#eeeed7] p-2 shadow-sm">
            {/* format selector */}
            <FormatTool format={format} onFormatChange={onFormatChange} />

            {/* Other tools for later */}
            <div className="mx-1 h-6 w-px bg-[#d5d5b5]" />
        </div>
    );
}