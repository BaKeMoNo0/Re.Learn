
"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import FloatingToolbar from "./FloatingToolbar";

import ColorToolbar from "./tools/colors/ColorToolbar";
import TypographyToolbar from "./tools/typography/TypographyToolbar";
import LayoutToolbar from "./tools/layout/LayoutToolbar";

import type { Appearance, ColorStyle, LayoutStyle, TypographyStyle,} from "../appearance/appearance.types";


type ToolbarManagerProps = {
    controlsContainer: HTMLDivElement | null;

    colorsAppearance: Appearance;
    typographyAppearance: Appearance;
    layoutAppearance: Appearance;

    onColorsChange: (colors: ColorStyle) => void;
    onTypographyChange: (typography: TypographyStyle) => void;
    onLayoutChange: (layout: LayoutStyle) => void;
};

export default function ToolbarManager({
    controlsContainer,
    colorsAppearance,
    typographyAppearance,
    layoutAppearance,
    onColorsChange,
    onTypographyChange,
    onLayoutChange,
}: ToolbarManagerProps) {

    const [toolbarResetTrigger, setToolbarResetTrigger] = useState(0);
    const [visible, setVisible] = useState(true);

    const resetToolbarPositions = () => {
        setToolbarResetTrigger((trigger) => trigger + 1);
    };

    return (
        <>
            <>
                {/* Couleurs */}
                <FloatingToolbar
                    appearance={colorsAppearance}
                    icon="🎨"
                    label="Couleurs"
                    side="left"
                    initialTop={140}
                    resetKey={toolbarResetTrigger}
                    visible={visible}
                >
                    <ColorToolbar
                        colors={colorsAppearance.colors}
                        onChange={onColorsChange}
                    />
                </FloatingToolbar>

                {/* Typographie */}
                <FloatingToolbar
                    appearance={typographyAppearance}
                    icon="🔤"
                    label="Typographie"
                    side="left"
                    initialTop={200}
                    resetKey={toolbarResetTrigger}
                    visible={visible}
                >
                    <TypographyToolbar
                        typography={typographyAppearance.typography}
                        onChange={onTypographyChange}
                    />
                </FloatingToolbar>

                {/* Disposition */}
                <FloatingToolbar
                    appearance={layoutAppearance}
                    icon="📏"
                    label="Disposition"
                    side="left"
                    initialTop={260}
                    resetKey={toolbarResetTrigger}
                    visible={visible}
                >
                    <LayoutToolbar
                        layout={layoutAppearance.layout}
                        onChange={onLayoutChange}
                    />
                </FloatingToolbar>
            </>

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
                )
            }
        </>
    );
}
