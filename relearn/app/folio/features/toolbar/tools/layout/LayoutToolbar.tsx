"use client";

import type { LayoutStyle } from "../../../appearance/appearance.types";

type LayoutToolbarProps = {
    layout: LayoutStyle;
    onChange: (layout: LayoutStyle) => void;
};

export default function LayoutToolbar({
    layout,
    onChange,
}: LayoutToolbarProps) {
    const update = <K extends keyof LayoutStyle>(
        property: K,
        value: LayoutStyle[K]
    ) => {
        onChange({
            ...layout,
            [property]: value,
        });
    };

    const renderSlider = (
        label: string,
        property: keyof LayoutStyle,
        min: number,
        max: number
    ) => (
        <label className="flex flex-col gap-1" key={property}>
            <span className="text-sm">
                {label} : {layout[property]}px
            </span>

            <input
                type="range"
                min={min}
                max={max}
                value={layout[property]}
                onChange={(event) =>
                    update(property, Number(event.target.value))
                }
            />
        </label>
    );

    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Disposition</h3>

            {renderSlider("Largeur", "width", 0, 1200)}
            {renderSlider("Hauteur", "height", 0, 1200)}
            {renderSlider("Marge intérieure", "padding", 0, 100)}
            {renderSlider("Marge extérieure", "margin", 0, 100)}
            {renderSlider("Arrondi", "borderRadius", 0, 100)}
        </div>
    );
}