import type { CSSProperties } from "react";
import type { BackgroundStyle } from "./appearance.types";

export function getBackgroundStyle(
    background: BackgroundStyle
): CSSProperties {
    if (background.type === "image" && background.image) {
        return {
            backgroundColor: background.color,
            backgroundImage: `url(${background.image})`,
            backgroundSize: background.size,
            backgroundRepeat:
                background.size === "repeat" ? "repeat" : "no-repeat",
        };
    }

    return {
        backgroundColor: background.color,
    };
}