"use client";

import {useRef, useState } from "react";
import FullscreenButton from "./components/FullscreenButton";
import Zoom from "./features/zoom/Zoom";
import usePages from "./features/pages/usePages";
import ToolbarManager from "./features/toolbar/ToolbarManager";

import type { Appearance } from "./features/toolbar/appearance/appearance.types";
import { defaultAppearance } from "./features/toolbar/appearance/appearance.defaults";
import useSelection from "./features/toolbar/selection/useSelection";
import PageWorkspace from "./features/pages/PageWorkspace";


export default function Folio() {
    
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [zoom, setZoom] = useState(100);

    const {
        pages,
        activePage,
        activePageIndex,
        createPage,
        updatePage,
        goToPreviousPage,
        goToNextPage,
    } = usePages("A6")


    const [controlsContainer, setControlsContainer] = useState<HTMLDivElement | null>(null);

    const [appearance, setAppearance] = useState<Appearance>(defaultAppearance);

    const {
        selection,
        selectElement,
        selectTextRange,
        clearSelection,
    } = useSelection();

    const background = appearance.colors.background;
    const backgroundStyle: React.CSSProperties =
        background.type === "image" && background.image
            ? {
                backgroundColor: background.color,
                backgroundImage: `url(${background.image})`,
                backgroundSize: background.size,
                backgroundRepeat: background.size === "repeat" ? "repeat" : "no-repeat",
            }
            : {
                backgroundColor: background.color,
            };

    return (
        <div 
            ref={containerRef}
            style={{
                ...backgroundStyle,
                color: appearance.colors.color,
                fontFamily: appearance.typography.fontFamily
            }}
            className="min-h-0 flex-1 overflow-auto flex flex-col items-center justify-start gap-4 p-4"
            onPointerDown={(event) => {
                if (event.target === event.currentTarget) {
                    clearSelection();
                }
            }}
        >
            <Zoom zoom={zoom} onZoomChange={setZoom} />

            <ToolbarManager controlsContainer={controlsContainer} appearance={appearance} onAppearanceChange={setAppearance} />

            <div className="my-auto flex w-full flex-col items-center gap-4 shrink-0">
                {activePage && (
                    <PageWorkspace
                        key={activePage.id}
                        page={activePage}
                        zoom={zoom}
                        currentPage={activePageIndex}
                        totalPages={pages.length}
                        onPrevious={goToPreviousPage}
                        onNext={goToNextPage}
                        onCreate={createPage}
                        onPageChange={updatePage}
                    />
                )}
            </div>

            <div 
                ref={setControlsContainer}
                className="fixed bottom-4 right-4 z-50 flex items-center gap-2"
            >
                <FullscreenButton containerRef={containerRef} />
            </div>
        </div>
    );
}
