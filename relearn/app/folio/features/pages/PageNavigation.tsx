"use client";

import { useEffect } from "react";

type Props = {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
    onCreate: () => void;
};

export default function PageNavigation({
    currentPage,
    totalPages,
    onPrevious,
    onNext,
    onCreate,
}: Props) {

    useEffect(() => {
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
    }, [onPrevious, onNext]);

    
    return (
        <div className="flex w-full max-w-99.25 items-center justify-between px-2 text-[#777b5b]">
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

            <span className="text-xs">
                Page {currentPage + 1} / {totalPages}
            </span>

            <button
                type="button"
                onClick={onCreate}
                className="flex items-center gap-2 rounded-full
                           border border-[#d8d9b8] px-3 py-2
                           text-sm transition hover:bg-[#d8d9b8]"
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