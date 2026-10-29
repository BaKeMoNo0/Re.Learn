"use client";

import { useCallback, useRef, useState } from "react";
import FullscreenButton from "./components/FullscreenButton";
import Zoom from "./features/zoom/Zoom";
import SheetEditor from "./features/sheet/SheetEditor";
import usePages from "./features/pages/usePages";
import type { Page } from "./features/pages/page.types";
import PageNavigation from "./features/pages/PageNavigation";
import ToolbarManager from "./features/toolbar/ToolbarManager";


export default function Folio() {
    
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [zoom, setZoom] = useState(100);
    const [isToolbarSelected, setIsToolbarSelected] = useState(false);

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

    const controlsRef = useRef<HTMLDivElement>(null);
    const [controlsContainer, setControlsContainer] = useState<HTMLDivElement | null>(null);

    return (
        <div 
            ref={containerRef} 
            className="min-h-0 flex-1 overflow-auto flex flex-col items-center justify-start gap-4 bg-[#ffffe3] text-[#454536] font-sans p-4"
            onPointerDown={(event) => {
                if (event.target === event.currentTarget) {
                    setIsToolbarSelected(false);
                }
            }}
        >
            <Zoom zoom={zoom} onZoomChange={setZoom} />

            <div className="my-auto flex w-full flex-col items-center gap-4 shrink-0">
                {activePage && (
                    <SheetEditor
                        key={activePage.id}
                        zoom={zoom}
                        page={activePage}
                        onPageChange={handlePageChange}
                        renderFormatTool={(format, onFormatChange) => (
                            <ToolbarManager
                                format={format}
                                onFormatChange={onFormatChange}
                                controlsContainer={controlsContainer}
                            />
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
            </div>

            <div 
                ref={(node) => {
                    controlsRef.current = node;
                    setControlsContainer(node);
                }}
                className="fixed bottom-4 right-4 z-50 flex items-center gap-2"
            >
                <FullscreenButton containerRef={containerRef} />
            </div>
        </div>
    );
}
