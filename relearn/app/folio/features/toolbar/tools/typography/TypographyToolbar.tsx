"use client";

import TextStyleSettings from "./TextStyleSettings";
import type { TypographyStyle } from "../../appearance/appearance.types";

type TypographyToolbarProps = {
    typography: TypographyStyle;
    onChange: (typography: TypographyStyle) => void;
};

export default function TypographyToolbar({
    typography,
    onChange,
}: TypographyToolbarProps) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Typographie</h3>

            <TextStyleSettings
                typography={typography}
                onChange={onChange}
            />
        </div>
    );
}