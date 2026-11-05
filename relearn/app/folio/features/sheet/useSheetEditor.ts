
"use client";

import { useState } from "react";
import { fitsInFormat, largestFittingPrefix } from "./sheet.utils";
import type { SheetFormat } from "../sheet/formats";
import type { PageUpdate } from "../pages/page.types";

type Props = {
    format: SheetFormat;
    content: string;
    onPageUpdate: (updates: PageUpdate) => void;
};

export function useSheetEditor({
    format,
    content,
    onPageUpdate,
}: Props) {
    const [pendingFormat, setPendingFormat] = useState<SheetFormat | null>(null);
    const [previewFormat, setPreviewFormat] = useState<SheetFormat | null>(null);

    function requestFormatChange(nextFormat: SheetFormat) {
        if (nextFormat === format) return;

        if (fitsInFormat(content, nextFormat)) {
            onPageUpdate({ format: nextFormat });
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

        onPageUpdate({ format: previewFormat });
        setPreviewFormat(null);
    }

    function deleteExcessAndApply() {
        if (!pendingFormat) return;

        const nextContent = largestFittingPrefix(
            content,
            pendingFormat
        );

        onPageUpdate({
            format: pendingFormat,
            content: nextContent,
        });
        setPendingFormat(null);
        setPreviewFormat(null);
    }

    function updateContent(nextContent: string) {
        // En mode correction, la feuille reste à l'ancien format.
        // Cela permet de modifier le texte situé hors de la
        // nouvelle limite, sans le rendre inaccessible.
        if (!fitsInFormat(nextContent, format)) return;

        onPageUpdate({ content: nextContent });
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
