"use client";

import { useEffect } from "react";
import FormatTool from "../sheet/FormatTool";
import type { SheetFormat } from "../sheet/formats";
import { Appearance } from "../appearance/appearance.types";

type Props = {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
    onCreate: () => void;
    format: SheetFormat;
    onFormatChange: (format: SheetFormat) => void;
    isCustomizing: boolean;
    appearance: Appearance;
};

export default function PageNavigation({
    currentPage,
    totalPages,
    onPrevious,
    onNext,
    onCreate,
    format,
    onFormatChange,
    isCustomizing,
    appearance,
}: Props) {

    useEffect(() => {
        if (isCustomizing) return;

        function handleKeyDown(event: KeyboardEvent) {
            // Ne pas naviguer pendant la saisie de texte.
            const target = event.target;

            if (
                target instanceof HTMLElement &&
                (
                    target.isContentEditable ||
                    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
                )
            ) {
                return;
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                onPrevious();
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                onNext();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onPrevious, onNext, isCustomizing]);

    
    return (
        <div 
            data-selection-scope="page-navigation"
            data-selection-id="main-navigation"
            data-selection-type="container"
            style={{
                color: appearance.colors.color,
                backgroundColor: appearance.colors.background.color,
                borderColor: appearance.colors.borderColor,
                fontFamily: appearance.typography.fontFamily,
                fontSize: appearance.typography.fontSize,
                fontWeight: appearance.typography.fontWeight,
                borderRadius: appearance.layout.borderRadius,
                padding: appearance.layout.padding,
            }}
            onClickCapture={(event) => {
                if (isCustomizing) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }}
            className="flex w-full max-w-99.25 items-center justify-between px-2"
        >
            <button
                type="button"
                onClick={onPrevious}
                disabled={currentPage === 0}
                aria-label="Page précédente"
                className="rounded-full p-2 transition hover:bg-[#d8d9b8]
                           disabled:cursor-default disabled:opacity-30"
            >
                ←
            </button>

            <span className="whitespace-nowrap">
                Page {currentPage + 1} / {totalPages}
            </span>

            <FormatTool
                format={format}
                onFormatChange={onFormatChange}
                appearance={appearance}
            />

            <button
                type="button"
                onClick={onCreate}
                style={{
                    borderColor: appearance.colors.borderColor,
                }}
                className="flex items-center gap-2 whitespace-nowrap rounded-full
                           border px-3 py-2
                           transition hover:bg-[#d8d9b8]"
            >
                <span aria-hidden="true">+</span>
                Nouvelle page
            </button>

            <button
                type="button"
                onClick={onNext}
                disabled={currentPage === totalPages - 1}
                aria-label="Page suivante"
                className="rounded-full p-2 transition hover:bg-[#d8d9b8]
                           disabled:cursor-default disabled:opacity-30"
            >
                →
            </button>
        </div>
    );
}