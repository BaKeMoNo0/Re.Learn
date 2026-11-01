"use client";

import type { TypographyAppearance } from "./appearance.types";

type Props = {
    typography: TypographyAppearance;
    onChange: (typography: TypographyAppearance) => void;
};

export default function TypographySettings({
    typography,
    onChange,
}: Props) {
    const updateTypography = (
        updates: Partial<TypographyAppearance>
    ) => {
        onChange({
            ...typography,
            ...updates,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Police */}
            <div className="flex flex-col gap-2">
                <label className="text-sm">
                    Police d'écriture
                </label>

                <select
                    value={typography.fontFamily}
                    onChange={(event) =>
                        updateTypography({
                            fontFamily: event.target.value,
                        })
                    }
                    className="rounded-lg border border-[#d5d5b5] bg-[#ffffe3] p-2 text-sm"
                >
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">
                        Times New Roman
                    </option>
                    <option value="Verdana">Verdana</option>
                    <option value="Courier New">Courier New</option>
                </select>
            </div>

            {/* Couleur */}
            <div className="flex items-center justify-between">
                <label className="text-sm">
                    Couleur du texte
                </label>

                <input
                    type="color"
                    value={typography.color}
                    onChange={(event) =>
                        updateTypography({
                            color: event.target.value,
                        })
                    }
                    className="h-9 w-12 cursor-pointer rounded border-0 bg-transparent"
                />
            </div>

            {/* Taille */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                    <label>Taille du texte</label>
                    <span>{typography.fontSize}px</span>
                </div>

                <input
                    type="range"
                    min={10}
                    max={32}
                    value={typography.fontSize}
                    onChange={(event) =>
                        updateTypography({
                            fontSize: Number(event.target.value),
                        })
                    }
                    className="w-full accent-[#777b5b]"
                />
            </div>
        </div>
    );
}