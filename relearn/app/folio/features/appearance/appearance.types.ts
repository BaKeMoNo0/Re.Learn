import { SelectionScope } from "../editor/selection/selection.types";

export type BackgroundStyle = {
    type: "color" | "image";
    color: string;
    image: string | null;
    opacity: number;
    size: "cover" | "contain" | "repeat";
};

export type ColorStyle = {
    color: string;
    background: BackgroundStyle;
    borderColor: string;
};

export type TypographyStyle = {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    fontStyle: "normal" | "italic";
    lineHeight: number;
    textAlign: "left" | "center" | "right" | "justify";
    textDecorationLine: "none" | "underline" | "overline" | "line-through";
    textDecorationStyle: "solid" | "double" | "dotted" | "dashed" | "wavy";
    textDecorationColor: string;
    letterSpacing: number;
};

export type LayoutStyle = {
    width: number;
    height: number;
    padding: number;
    margin: number;
    borderRadius: number;
};


export type Appearance = {
    colors: ColorStyle;
    typography: TypographyStyle;
    layout: LayoutStyle;
};


/**
 * Identifie l'objet dont on souhaite modifier l'apparence.
 */
export type AppearanceTarget =
    | { type: "folio"; }
    | { type: "sheet"; id: string;}
    | { 
        type: "element"; 
        scope: SelectionScope;
        id: string; 
    };


/**
 * Stocke les apparences de l'application.
 */
export type AppearanceStore = {
    folio: Appearance;
    sheets: Record<string, Appearance>;
    elements: Record<string, Appearance>;
};