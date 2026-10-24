"use client";

import { useRef, useState } from "react";
import Toolbar from "./components/Toolbar/Toolbar";
import { type Format } from "./components/Toolbar/formats";
import FullscreenButton from "./components/FullscreenButton";
import Sheet from "./components/Sheet";
import Zoom from "./components/Zoom";
import DraggableToolbar from "./components/Toolbar/DraggableToolbar";
import Resizable from "./components/Resizable";


export default function Folio() {
    
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [format, setFormat] = useState<Format>("A6");
    
    const [zoom, setZoom] = useState(100);

    const [isToolbarSelected, setIsToolbarSelected] = useState(false);
    
    const [toolbarSize, setToolbarSize] = useState({
        width: 180,
        height: 56,
    });

    return (
        <div 
            ref={containerRef} 
            className="min-h-0 flex-1 overflow-auto flex flex-col items-center gap-4 bg-[#ffffe3] text-[#454536] font-sans p-4"
            onPointerDown={(event) => {
                if (event.target === event.currentTarget) {
                    setIsToolbarSelected(false);
                }
            }}
        >
            <Zoom zoom={zoom} onZoomChange={setZoom} />
            
            {/* Toolbar */}
            <DraggableToolbar>
                <Resizable
                    width={toolbarSize.width}
                    height={toolbarSize.height}
                    isSelected={isToolbarSelected}
                    onSelect={() => setIsToolbarSelected(true)}
                    onResize={setToolbarSize}
                >   
                    <Toolbar format={format} onFormatChange={setFormat} />
                </Resizable>
            </DraggableToolbar>

            {/* Sheet */}
            <Sheet format={format} zoom={zoom} />

            <FullscreenButton containerRef={containerRef} />
        </div>
    );
}
