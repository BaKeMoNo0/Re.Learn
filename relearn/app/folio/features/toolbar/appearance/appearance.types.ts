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

export type AppearanceTarget =
    | { type: "folio" }
    | { type: "element"; id: string }
    | { type: "group"; id: string };