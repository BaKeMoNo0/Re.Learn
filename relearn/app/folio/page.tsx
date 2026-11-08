"use client";

import {useCallback, useRef, useState } from "react";

import FullscreenButton from "./controls/FullscreenButton";
import Zoom from "./features/zoom/Zoom";
import usePages from "./features/pages/usePages";
import ToolbarManager from "./features/toolbar/ToolbarManager";
import PageWorkspace from "./features/pages/PageWorkspace";
import useEditorController from "./features/editor/controller/useEditorController";

import useAppearance from "./features/appearance/useAppearance";
import type { AppearanceTarget } from "./features/appearance/appearance.types";
import type { ColorStyle, LayoutStyle, TypographyStyle,} from "./features/appearance/appearance.types";


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

    const {
        getAppearance,
        updateColors,
        updateTypography,
        updateLayout,
    } = useAppearance();

    // Apparence de l'espace de travail général.
    const folioAppearance = getAppearance({
        type: "folio",
    });

    // Apparence de la feuille actuellement affichée.
    const sheetAppearance = activePage
        ? getAppearance({
              type: "sheet",
              id: activePage.id,
          })
        : null;

    /**
     * Détermine la cible des toolbars.
     *
     * En mode édition : la Sheet active.
     * En mode personnalisation : l'élément sélectionné,
     * dans la limite des cibles actuellement prises en charge.
     */
    const appearanceTarget: AppearanceTarget | null = (() => {
        if (editor.mode === "edit") {
            return activePage
                ? { type: "sheet", id: activePage.id }
                : null;
        }

        if (editor.selection?.scope === "folio") {
            return { type: "folio" };
        }

        if (editor.selection?.scope === "sheet") {
            return { type: "sheet", id: editor.selection.id };
        }

        return null;
    })();

    const targetAppearance = appearanceTarget
        ? getAppearance(appearanceTarget)
        : null;

    // Callbacks transmis aux toolbars.
    const handleColorsChange = useCallback(
        (colors: ColorStyle) => {
            if (!appearanceTarget) return;

            updateColors(appearanceTarget, colors);
        },
        [appearanceTarget, updateColors]
    );

    const handleTypographyChange = useCallback(
        (typography: TypographyStyle) => {
            if (!appearanceTarget) return;

            updateTypography(appearanceTarget, typography);
        },
        [appearanceTarget, updateTypography]
    );

    const handleLayoutChange = useCallback(
        (layout: LayoutStyle) => {
            if (!appearanceTarget) return;

            updateLayout(appearanceTarget, layout);
        },
        [appearanceTarget, updateLayout]
    );

    // Style de l'espace de travail.
    const background = folioAppearance.colors.background;

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
            data-selection-scope="folio"
            data-selection-id="folio-root"
            data-selection-type="shape"
            style={{
                ...backgroundStyle,
                color: folioAppearance.colors.color,
                fontFamily: folioAppearance.typography.fontFamily
            }}
            className="min-h-0 flex-1 overflow-auto flex flex-col items-center justify-start gap-4 p-4"
            onPointerDown={(event) => {
                if (editor.mode === "edit") {
                    if (event.target === event.currentTarget) {
                        editor.clearSelection();
                    }
                    return;
                }

                const target = (event.target as HTMLElement).closest(
                    "[data-selection-scope][data-selection-id][data-selection-type]"
                );

                if (!target) return;

                const scope = target.getAttribute("data-selection-scope");
                const id = target.getAttribute("data-selection-id");
                const type = target.getAttribute("data-selection-type");

                if (!id || !scope || !type) return;

                if (
                    scope === "folio" ||
                    scope === "sheet" ||
                    scope === "floating-toolbar" ||
                    scope === "page-navigation"
                ) {
                    editor.selectElement(
                        id,
                        type as "button" | "text" | "shape",
                        scope
                    );
                }
            }}
        >
            <Zoom zoom={zoom} onZoomChange={setZoom} />

            <ToolbarManager 
                controlsContainer={controlsContainer} 
                appearance={targetAppearance}
                onColorsChange={handleColorsChange}
                onTypographyChange={handleTypographyChange}
                onLayoutChange={handleLayoutChange}
            />

            <div className="my-auto flex w-full flex-col items-center gap-4 shrink-0">
                {activePage && sheetAppearance && (
                    <PageWorkspace
                        key={activePage.id}
                        page={activePage}
                        appearance={sheetAppearance}
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
