"use client";

import type { Page, PageUpdate } from "./page.types";
import { useSheetEditor } from "../sheet/useSheetEditor";
import SheetEditor from "../sheet/SheetEditor";
import PageNavigation from "./PageNavigation";

type PageWorkspaceProps = {
    page: Page;
    zoom: number;
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
    onCreate: () => void;
    onPageChange: (pageId: string, updates: PageUpdate) => void;
};

export default function PageWorkspace({ 
    page,
    zoom,
    currentPage,
    totalPages,
    onPrevious,
    onNext,
    onCreate,
    onPageChange, 
}: PageWorkspaceProps) {

     const editor = useSheetEditor({
        format: page.format,
        content: page.content,
        onPageUpdate: (updates) => onPageChange(page.id, updates),
    });

    return (
        <div className="my-auto flex w-full flex-col items-center gap-4 shrink-0">

            <SheetEditor
                editor={editor}
                zoom={zoom}
            />

            <PageNavigation
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevious={onPrevious}
                onNext={onNext}
                onCreate={onCreate}
                format={editor.format}
                onFormatChange={editor.requestFormatChange}
            />
        </div>
    );
}