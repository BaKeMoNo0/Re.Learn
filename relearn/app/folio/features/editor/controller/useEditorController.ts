"use client";

import { useCallback, useEffect, useState } from "react";

import useSelection from "../selection/useSelection";
import useEditorContext from "../context/useEditorContext";

import type { EditorMode } from "../context/editorContext.types";
import type { ElementType, SelectionScope } from "../selection/selection.types";

export default function useEditorController(pageId: string | null) {
    const [mode, setMode] = useState<EditorMode>("edit");

    const {
        context,
        setSheetContext,
        setInterfaceContext,
        clearContext,
    } = useEditorContext(pageId);

    const {
        selection,
        selectElement: select,
        clearSelection,
    } = useSelection();


    // Synchronise le contexte avec la page active uniquement en mode édition.
    useEffect(() => {
        if (mode === "edit") {
            setSheetContext(pageId);
        }
    }, [pageId, mode, setSheetContext]);


    const enterCustomization = useCallback(() => {
        setMode("customize");
        clearSelection();
        clearContext();
    }, [clearSelection, clearContext]);

    const exitCustomization = useCallback(() => {
        setMode("edit");
        clearSelection();
        setSheetContext(pageId);
    }, [clearSelection, setSheetContext, pageId]);

    const selectElement = useCallback((
        id: string,
        elementType: ElementType,
        scope: SelectionScope
    ) => {
        if (mode !== "customize") return;

        select(id, elementType, scope);

        if (scope === "sheet") {
            setSheetContext(pageId);
        } else {
            setInterfaceContext(scope);
        }
    }, [mode, select, pageId, setSheetContext, setInterfaceContext]);


    return {
        mode,
        isCustomizing: mode === "customize",

        enterCustomization,
        exitCustomization,

        context,
        selection,

        selectElement,
        clearSelection,
    };
}