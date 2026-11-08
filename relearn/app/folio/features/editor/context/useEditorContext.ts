"use client";

import { useCallback, useState } from "react";

import type { EditorContext } from "./editorContext.types";
import type { SelectionScope } from "../selection/selection.types";

export default function useEditorContext(pageId: string | null) {
    const [context, setContext] = useState<EditorContext>(
        pageId ? { type: "sheet", pageId } : null
    );


    const setSheetContext = useCallback((id: string | null) => {
        setContext(id ? { type: "sheet", pageId: id } : null);
    }, []);

    const setInterfaceContext = useCallback((scope: SelectionScope) => {
        setContext({ type: "interface", scope });
    }, []);

    const clearContext = useCallback(() => {
        setContext(null);
    }, []);

    return {
        context,
        setSheetContext,
        setInterfaceContext,
        clearContext,
    };
}