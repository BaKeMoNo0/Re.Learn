
"use client";

import { useState } from "react";
import FloatingToolbar from "./FloatingToolbar";
import FormatToolbar from "./format/FormatToolbar";
import type { Format } from "./format/formats";
import FocusButton from "../../components/FocusButton";
import { createPortal } from "react-dom";
import type { RefObject } from "react";

type ToolbarManagerProps = {
    format: Format;
    onFormatChange: (format: Format) => void;
    controlsContainer: HTMLDivElement | null;
};

export default function ToolbarManager({
    format,
    onFormatChange,
    controlsContainer,
}: ToolbarManagerProps) {
    const [toolbarResetKey, setToolbarResetKey] = useState(0);
    const [visible, setVisible] = useState(true);
    const [showToolbars, setShowToolbars] = useState(true);

    const resetToolbarPositions = () => {
        setToolbarResetKey((key) => key + 1);
    };

    return (
        <>
            {/* Format de la feuille */}
            <FloatingToolbar
                icon="📐"
                label="Format de la feuille"
                side="left"
                initialTop={80}
                resetKey={toolbarResetKey}
                visible={visible}
            >
                <FormatToolbar
                    format={format}
                    onFormatChange={onFormatChange}
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
