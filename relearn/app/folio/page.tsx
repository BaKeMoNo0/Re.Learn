"use client";

import {useRef, useState } from "react";

import FullscreenButton from "./controls/FullscreenButton";
import Zoom from "./features/zoom/Zoom";
import usePages from "./features/pages/usePages";
import ToolbarManager from "./features/toolbar/ToolbarManager";
import PageWorkspace from "./features/pages/PageWorkspace";
import useEditorController from "./features/editor/controller/useEditorController";

import useFolioAppearance from "./features/appearance/useFolioAppearance";


export default function Folio() {
    
    const containerRef = useRef<HTMLDivElement>(null);
    const [controlsContainer, setControlsContainer] = useState<HTMLDivElement | null>(null);
    
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

    const editor = useEditorController(activePage?.id ?? null);

    const appearance = useFolioAppearance({
        activePage,
        editor,
    });

    return (
        <div 
            ref={containerRef}
            data-selection-scope="folio"
            data-selection-id="folio-root"
            data-selection-type="container"
            style={{
                ...appearance.backgroundStyle,
                color: appearance.folio.colors.color,
                fontFamily: appearance.folio.typography.fontFamily
            }}
            className="min-h-0 flex-1 overflow-auto flex flex-col items-center justify-start gap-4 p-4"
            onPointerDown={(event) => {
                if (editor.mode === "edit") {
                    if (event.target === event.currentTarget) {
                        editor.clearSelection();
                    }
                    return;
                }

                const clickedElement = event.target as HTMLElement;
                if (clickedElement.closest("[data-selection-ignore]")) { return;}
                
                const selectionTarget = clickedElement.closest(
                    "[data-selection-scope][data-selection-id][data-selection-type]"
                );

                if (!selectionTarget) return;

                // Ne pas sélectionner le Folio lorsqu'on clique
                // sur un enfant qui ne possède pas ses propres attributs.
                if (selectionTarget === containerRef.current && clickedElement !== containerRef.current) { return;}

                const scope = selectionTarget.getAttribute("data-selection-scope");
                const id = selectionTarget.getAttribute("data-selection-id");
                const type = selectionTarget.getAttribute("data-selection-type");

                if (!id || !scope || !type) return;

                const validScopes = [
                    "folio",
                    "sheet",
                    "floating-toolbar",
                    "page-navigation",
                ] as const;

                const validTypes = [
                    "button",
                    "text",
                    "shape",
                    "container",
                ] as const;

                if (
                    !validScopes.includes(scope as typeof validScopes[number]) ||
                    !validTypes.includes(type as typeof validTypes[number])
                ) {
                    return;
                }

                editor.selectElement(
                    id,
                    type as typeof validTypes[number],
                    scope as typeof validScopes[number]
                );
            }}
        >
            <Zoom zoom={zoom} onZoomChange={setZoom} />

            <ToolbarManager     
                controlsContainer={controlsContainer} 
                colorsAppearance={appearance.colorToolbar}
                typographyAppearance={appearance.typographyToolbar}
                layoutAppearance={appearance.layoutToolbar}
                onColorsChange={appearance.updateColors}
                onTypographyChange={appearance.updateTypography}
                onLayoutChange={appearance.updateLayout}
            />

            <div className="my-auto flex flex-col items-center gap-4 shrink-0">
                {activePage && appearance.sheet && (
                    <PageWorkspace
                        key={activePage.id}
                        page={activePage}
                        sheetAppearance={appearance.sheet}
                        navigationAppearance={appearance.pageNavigation}
                        isCustomizing={editor.isCustomizing}
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
                <button
                    type="button"
                    onClick={() => {
                        if (editor.isCustomizing) {
                            editor.exitCustomization();
                        } else {
                            editor.enterCustomization();
                        }
                    }}
                >
                    {editor.isCustomizing ? "Terminer" : "Personnaliser"}
                </button>
                <FullscreenButton containerRef={containerRef} />
            </div>
        </div>
    );
}
