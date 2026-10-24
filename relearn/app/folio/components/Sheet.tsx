"use client";

import { formats } from "./Toolbar/formats";

type SheetProps = {
    format: keyof typeof formats;
    zoom: number;
};

export default function Sheet({ format, zoom }: SheetProps) {

    const currentFormat = formats[format];

    return (
        <div 
            className="box-border shrink-0 border border-dashed border-[#a7a78a] bg-white p-5 shadow-sm"
            style={{
                width: currentFormat.width,
                height: currentFormat.height,
                maxWidth: "100%",
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
            }}
        >
            <textarea
                placeholder="Ecrire ici..."
                className="h-full w-full resize-none border-none bg-transparent text-lg leading-relaxed text-[#454536] outline-none placeholder:text-[#b5b5a3]"
            />
        </div>
    );
}