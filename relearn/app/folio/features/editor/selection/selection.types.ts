
export type ElementType =
    | "button"
    | "text"
    | "shape"
    | "container";


export type SelectionScope =
    | "folio"
    | "sheet"
    | "floating-toolbar"
    | "page-navigation";
    

export type Selection =
    | {
        type: "element";
        id: string;
        elementType: ElementType;
        scope: SelectionScope;
    }
    | null;
