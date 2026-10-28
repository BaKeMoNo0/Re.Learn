
"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useSheetEditor } from "./useSheetEditor";
import Sheet from "./Sheet";
import FormatChangeDialog from "./FormatChangeDialog";
import type { SheetFormat } from "./sheet.types";
import type { Page } from "../pages/page.types";

type Props = {
    zoom: number;
    page: Page;
    onPageChange: (page: Page) => void;
    renderFormatTool: (
        format: SheetFormat,
        onFormatChange: (format: SheetFormat) => void
    ) => ReactNode;
};

export default function SheetEditor({zoom, page, onPageChange, renderFormatTool}: Props) {
    const editor = useSheetEditor(page.format, page.content);

    useEffect(() => {
        onPageChange({
            ...page,
            format: editor.format,
            content: editor.content,
        });
    }, [
        page.id,
        page.title,
        editor.format,
        editor.content,
        onPageChange,
    ]);

    return (
        <div className="flex flex-col items-center gap-4">
            {renderFormatTool(
                editor.format,
                editor.requestFormatChange
            )}

            <Sheet
                format={editor.format}
                zoom={zoom}
                content={editor.content}
                previewFormat={editor.previewFormat}
                onContentChange={editor.updateContent}
            />

            {editor.previewFormat && (
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-[#777b5b]">
                        Ajuste le texte pour qu'il tienne dans{" "}
                        {editor.previewFormat}.
                    </p>

                    <button
                        type="button"
                        disabled={!editor.canApplyPreview()}
                        onClick={editor.applyPreviewFormat}
                        className="rounded-lg bg-[#777b5b] px-4 py-2
                                   text-white disabled:cursor-not-allowed
                                   disabled:opacity-40"
                    >
                        Appliquer le format {editor.previewFormat}
                    </button>

                    <button
                        type="button"
                        onClick={editor.cancelPreview}
                        className="text-sm text-[#454536] underline"
                    >
                        Annuler le changement de format
                    </button>
                </div>
            )}

            {editor.pendingFormat && (
                <FormatChangeDialog
                    fromFormat={editor.format}
                    toFormat={editor.pendingFormat}
                    onCancel={editor.cancelFormatChange}
                    onEdit={editor.editContentForNewFormat}
                    onDelete={editor.deleteExcessAndApply}
                />
            )}
        </div>
    );
}
