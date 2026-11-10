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

    const pageNavigationAppearance = getAppearance({
        type: "element",
        scope: "page-navigation",
        id: "main-navigation",
    });

    const colorToolbarAppearance = getAppearance({
        type: "element",
        scope: "floating-toolbar",
        id: "couleurs",
    });

    const typographyToolbarAppearance = getAppearance({
        type: "element",
        scope: "floating-toolbar",
        id: "typographie",
    });

    const layoutToolbarAppearance = getAppearance({
        type: "element",
        scope: "floating-toolbar",
        id: "disposition",
    });

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

        if ( editor.selection?.scope === "page-navigation" || editor.selection?.scope === "floating-toolbar") {
            return {
                type: "element",
                scope: editor.selection.scope,
                id: editor.selection.id,
            };
        }

        return null;
    })();

    const targetAppearance = appearanceTarget ? getAppearance(appearanceTarget) : null;

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
            data-selection-type="container"
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

                const clickedElement = event.target as HTMLElement;
                if (clickedElement.closest("[data-selection-ignore]")) { return;}
                
                const selectionTarget = clickedElement.closest(
                    "[data-selection-scope][data-selection-id][data-selection-type]"
                );

                if (!selectionTarget) return;
                
                console.log("Selection target:", selectionTarget);
                console.log("Clicked element:", clickedElement);

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
                colorsAppearance={colorToolbarAppearance}
                typographyAppearance={typographyToolbarAppearance}
                layoutAppearance={layoutToolbarAppearance}
                onColorsChange={handleColorsChange}
                onTypographyChange={handleTypographyChange}
                onLayoutChange={handleLayoutChange}
            />

            <div className="my-auto flex flex-col items-center gap-4 shrink-0">
                {activePage && sheetAppearance && (
                    <PageWorkspace
                        key={activePage.id}
                        page={activePage}
                        sheetAppearance={sheetAppearance}
                        navigationAppearance={pageNavigationAppearance}
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
