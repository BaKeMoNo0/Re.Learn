
"use client";

import { useState } from "react";
import { fitsInFormat, largestFittingPrefix } from "./sheet.utils";
import type { SheetFormat } from "./sheet.types";

//Gérer le contenu, le format et l'état de correction

export function useSheetEditor(
    initialFormat: SheetFormat = "A4",
    initialContent = ""
) {
    const [format, setFormat] = useState<SheetFormat>(initialFormat);
    const [content, setContent] = useState(initialContent);
    const [pendingFormat, setPendingFormat] =
        useState<SheetFormat | null>(null);
    const [previewFormat, setPreviewFormat] =
        useState<SheetFormat | null>(null);

    function requestFormatChange(nextFormat: SheetFormat) {
        if (nextFormat === format) return;

        if (fitsInFormat(content, nextFormat)) {
            setFormat(nextFormat);
            setPreviewFormat(null);
            setPendingFormat(null);
            return;
        }

        setPendingFormat(nextFormat);
    }

    function cancelFormatChange() {
        setPendingFormat(null);
    }

    function editContentForNewFormat() {
        if (!pendingFormat) return;

        setPreviewFormat(pendingFormat);
        setPendingFormat(null);
    }

    function canApplyPreview() {
        return (
            previewFormat !== null &&
            fitsInFormat(content, previewFormat)
        );
    }

    function cancelPreview() {
        setPreviewFormat(null);
    }

    function applyPreviewFormat() {
        if (!previewFormat || !canApplyPreview()) return;

        setFormat(previewFormat);
        setPreviewFormat(null);
    }

    function deleteExcessAndApply() {
        if (!pendingFormat) return;

        const nextContent = largestFittingPrefix(
            content,
            pendingFormat
        );

        setContent(nextContent);
        setFormat(pendingFormat);
        setPendingFormat(null);
        setPreviewFormat(null);
    }

    function updateContent(nextContent: string) {
        // En mode correction, la feuille reste à l'ancien format.
        // Cela permet de modifier le texte situé hors de la
        // nouvelle limite, sans le rendre inaccessible.
        if (!fitsInFormat(nextContent, format)) return;

        setContent(nextContent);
    }

    return {
        format,
        content,
        pendingFormat,
        previewFormat,
        requestFormatChange,
        cancelFormatChange,
        editContentForNewFormat,
        canApplyPreview,
        applyPreviewFormat,
        deleteExcessAndApply,
        updateContent,
        cancelPreview
    };
}
