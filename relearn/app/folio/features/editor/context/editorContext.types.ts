
import type { SelectionScope } from "../selection/selection.types";

export type EditorMode = "edit" | "customize";

export type EditorContext =
    | {
        type: "sheet";
        pageId: string;
        elementId?: string;
    }
    | {
        type: "interface";
        scope: SelectionScope;
    }
    | null;