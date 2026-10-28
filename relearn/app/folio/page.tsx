"use client";

import { useCallback, useRef, useState } from "react";
import Toolbar from "./features/toolbar/Toolbar";
import FullscreenButton from "./components/FullscreenButton";
import Zoom from "./features/zoom/Zoom";
import DraggableToolbar from "./features/toolbar/DraggableToolbar";
import Resizable from "./features/selection/Resizable";
import SheetEditor from "./features/sheet/SheetEditor";
import usePages from "./features/pages/usePages";
import type { Page } from "./features/pages/page.types";
import PageNavigation from "./features/pages/PageNavigation";


export default function Folio() {
    
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [zoom, setZoom] = useState(100);
    const [isToolbarSelected, setIsToolbarSelected] = useState(false);
    
    const [toolbarSize, setToolbarSize] = useState({
        width: 180,
        height: 56,
    });

    const {
        pages,
        activePage,
        activePageIndex,
        createPage,
        updatePage,
        goToPreviousPage,
        goToNextPage,
    } = usePages("A6")

    const handlePageChange = useCallback(
        (updatedPage: Page) => {
            updatePage(updatedPage);
        },
        [updatePage]
    );

    return (
        <div 
            ref={containerRef} 
            className="min-h-0 flex-1 overflow-auto flex flex-col items-center justify-center gap-4 bg-[#ffffe3] text-[#454536] font-sans p-4"
            onPointerDown={(event) => {
                if (event.target === event.currentTarget) {
                    setIsToolbarSelected(false);
                }
            }}
        >
            <Zoom zoom={zoom} onZoomChange={setZoom} />
            
            {activePage && (
                <SheetEditor
                    key={activePage.id}
                    zoom={zoom}
                    page={activePage}
                    onPageChange={handlePageChange}
                    renderFormatTool={(format, onFormatChange) => (
                        <DraggableToolbar>
                            <Resizable
                                width={toolbarSize.width}
                                height={toolbarSize.height}
                                isSelected={isToolbarSelected}
                                onSelect={() => setIsToolbarSelected(true)}
                                onResize={setToolbarSize}
                            >
                                <Toolbar
                                    format={format}
                                    onFormatChange={onFormatChange}
                                />
                            </Resizable>
                        </DraggableToolbar>
                    )}
                />
            )}

            <PageNavigation
                currentPage={activePageIndex}
                totalPages={pages.length}
                onPrevious={goToPreviousPage}
                onNext={goToNextPage}
                onCreate={createPage}
            />

            <FullscreenButton containerRef={containerRef} />
        </div>
    );
}
