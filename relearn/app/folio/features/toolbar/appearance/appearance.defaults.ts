import type {
    Appearance,
    ColorStyle,
    TypographyStyle,
    LayoutStyle
} from "./appearance.types";


export const defaultColors: ColorStyle = {
    color: "#454536",
    background: {
        type: "color",
        color: "#ffffe3",
        image: null,
        opacity: 1,
        size: "cover",
    },
    borderColor: "#a7a78a",
};

export const defaultTypography: TypographyStyle = {
    fontFamily: "Arial",
    fontSize: 16,
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: 1.5,
    textAlign: "left",
    textDecorationLine: "none",
    textDecorationStyle: "solid",
    textDecorationColor: "#454536",
    letterSpacing: 0,
};

export const defaultLayout: LayoutStyle = {
    width: 0,
    height: 0,
    padding: 0,
    margin: 0,
    borderRadius: 12,
};

export const defaultAppearance: Appearance = {
    colors: defaultColors,
    typography: defaultTypography,
    layout: defaultLayout,
};