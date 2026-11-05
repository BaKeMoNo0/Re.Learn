"use client";

import ColorPicker from "./ColorPicker";
import type { ColorStyle } from "../appearance.types";

type ColorToolbarProps = {
    colors: ColorStyle;
    onChange: (colors: ColorStyle) => void;
};

export default function ColorToolbar({
    colors,
    onChange,
}: ColorToolbarProps) {

    const updateColor = (property: keyof ColorStyle, value: string) => {
        onChange({
            ...colors,
            [property]: value,
        });
    };

    const updateBackgroundColor = (value: string) => {
        onChange({
            ...colors,
            background: {  
                ...colors.background,      
                type: "color",
                color: value,
                image: null
            },
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Couleurs</h3>

            <ColorPicker
                label="Couleur du texte"
                value={colors.color}
                onChange={(value) => updateColor("color", value)}
            />

            <ColorPicker
                label="Fond du Folio"
                value={colors.background.color}
                onChange={updateBackgroundColor}
            />

            <ColorPicker
                label="Couleur de bordure"
                value={colors.borderColor}
                onChange={(value) => updateColor("borderColor", value)}
            />
        </div>
    );
}