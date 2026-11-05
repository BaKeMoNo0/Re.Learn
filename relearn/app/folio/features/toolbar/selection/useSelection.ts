"use client";

import { useCallback, useState } from "react";
import type {
    Selection,
    SelectableElementType,
} from "./selection.types";

export default function useSelection() {
    const [selection, setSelection] = useState<Selection>(null);

    const selectElement = useCallback((
        id: string,
        elementType: SelectableElementType
    ) => {
        setSelection({
            type: "element",
            id,
            elementType,
        });
    }, []);

    const selectTextRange = useCallback((
        elementId: string,
        start: number,
        end: number
    ) => {
        if (start === end) {
            setSelection(null);
            return;
        }

        setSelection({
            type: "text-range",
            elementId,
            start,
            end,
        });
    }, []);

    const clearSelection = useCallback(() => {
        setSelection(null);
    }, []);

    return {
        selection,
        selectElement,
        selectTextRange,
        clearSelection,
    };
}