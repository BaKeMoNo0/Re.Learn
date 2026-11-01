import type { Appearance } from "./appearance.types";

export const defaultAppearance: Appearance = {
    background: {
        type: "color",
        color: "#ffffe3",
        image: null,
        opacity: 100,
        size: "cover",
    },

    buttons: {
        backgroundColor: "#ffffe3",
        textColor: "#454536",
        borderColor: "#d5d5b5",
        borderRadius: 12,
    },

    typography: {
        fontFamily: "Arial",
        color: "#454536",
        fontSize: 16,
    },
};