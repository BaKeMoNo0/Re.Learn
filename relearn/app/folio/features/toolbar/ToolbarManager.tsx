
"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import FloatingToolbar from "./FloatingToolbar";

import ColorToolbar from "./tools/colors/ColorToolbar";
import TypographyToolbar from "./tools/typography/TypographyToolbar";
import LayoutToolbar from "./tools/layout/LayoutToolbar";

import type { Appearance } from "./appearance/appearance.types";

type ToolbarManagerProps = {
    controlsContainer: HTMLDivElement | null;
    
    appearance: Appearance;
    onAppearanceChange: (appearance: Appearance) => void;

    context: any; // Replace 'any' with the actual type of context
    selection: any; // Replace 'any' with the actual type of selection
    mode: any; // Replace 'any' with the actual type of mode
};

export default function ToolbarManager({
    controlsContainer,
    appearance,
    onAppearanceChange,
}: ToolbarManagerProps) {

    const [toolbarResetTrigger, setToolbarResetTrigger] = useState(0);
    const [visible, setVisible] = useState(true);

    const resetToolbarPositions = () => {
        setToolbarResetTrigger((trigger) => trigger + 1);
    };

    const updateColors = (colors: Appearance["colors"]) => {
        onAppearanceChange({
            ...appearance,
            colors,
        });
    };

    const updateTypography = (
        typography: Appearance["typography"]
    ) => {
        onAppearanceChange({
            ...appearance,
            typography,
        });
    };

    const updateLayout = (layout: Appearance["layout"]) => {
        onAppearanceChange({
            ...appearance,
            layout,
        });
    };

    return (
        <>
            {/* Couleurs */}
            <FloatingToolbar
                icon="🎨"
                label="Couleurs"
                side="left"
                initialTop={140}
                resetKey={toolbarResetTrigger}
                visible={visible}
            >
                <ColorToolbar
                    colors={appearance.colors}
                    onChange={updateColors}
                />
            </FloatingToolbar>

            {/* Typographie */}
            <FloatingToolbar
                icon="🔤"
                label="Typographie"
                side="left"
                initialTop={200}
                resetKey={toolbarResetTrigger}
                visible={visible}
            >
                <TypographyToolbar
                    typography={appearance.typography}
                    onChange={updateTypography}
                />
            </FloatingToolbar>

            {/* Disposition */}
            <FloatingToolbar
                icon="📏"
                label="Disposition"
                side="left"
                initialTop={260}
                resetKey={toolbarResetTrigger}
                visible={visible}
            >
                <LayoutToolbar
                    layout={appearance.layout}
                    onChange={updateLayout}
                />
            </FloatingToolbar>



            {/* Commandes globales des toolbars */}
            {controlsContainer &&
                createPortal(
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={resetToolbarPositions}
                            title="Réinitialiser les positions"
                            aria-label="Réinitialiser les positions des barres d'outils"
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d5d5b5] bg-[#ffffe3] shadow-lg hover:bg-[#eeeed7]"
                        >
                            ↺
                        </button>

                        <button
                            type="button"
                            onClick={() => setVisible((current) => !current)}
                            title={visible ? "Mode Focus" : "Afficher les barres d'outils"}
                            aria-label={visible ? "Masquer les barres d'outils" : "Afficher les barres d'outils"}
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d5d5b5] bg-[#ffffe3] text-lg shadow-lg hover:bg-[#eeeed7]"
                        >
                            ◎
                        </button>
                    </div>,
                    controlsContainer
                )}
        </>
    );
}
