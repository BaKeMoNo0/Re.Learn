"use client";

import { useCallback, useState } from "react";
import type {Selection, ElementType, SelectionScope} from "./selection.types";

/*
    3 notions pour la sélection d'éléments dans l'interface :
    La cible : quel élément ou groupe d'éléments doit être modifié ?
    La sélection : comment cette cible a-t-elle été choisie ?
    L'édition : quelles propriétés peuvent être modifiées sur cette cible ?
*/

export default function useSelection() {
    const [selection, setSelection] = useState<Selection>(null);

    const selectElement = useCallback((
        id: string,
        elementType: ElementType,
        scope: SelectionScope
    ) => {
        setSelection({
            type: "element",
            id,
            elementType,
            scope,
        });
    }, []);


    const clearSelection = useCallback(() => {
        setSelection(null);
    }, []);

    return {
        selection,
        selectElement,
        clearSelection,
    };
}