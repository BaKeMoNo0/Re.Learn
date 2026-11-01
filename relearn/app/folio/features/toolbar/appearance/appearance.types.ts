export type BackgroundAppearance = {
    type: "color" | "image";
    color: string;
    image: string | null;
    opacity: number;
    size: "cover" | "contain" | "repeat";
};

export type ButtonAppearance = {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    borderRadius: number;
};

export type TypographyAppearance = {
    fontFamily: string;
    color: string;
    fontSize: number;
};

export type Appearance = {
    background: BackgroundAppearance;
    buttons: ButtonAppearance;
    typography: TypographyAppearance;
};