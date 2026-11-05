//will maybe delete it later
export type SelectableElementType =
    | "button"
    | "text"
    | "shape";

export type ElementSelection = {
    type: "element";
    id: string; //ids: string[];
    elementType: SelectableElementType;
};

export type TextRangeSelection = {
    type: "text-range";
    elementId: string;
    start: number;
    end: number;
};

export type Selection =
    | ElementSelection
    | TextRangeSelection
    | null;