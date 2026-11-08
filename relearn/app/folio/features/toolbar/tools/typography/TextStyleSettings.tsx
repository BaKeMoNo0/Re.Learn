"use client";

import type { TypographyStyle } from "../../appearance/appearance.types";

type TextStyleSettingsProps = {
    typography: TypographyStyle;
    onChange: (typography: TypographyStyle) => void;
};

export default function TextStyleSettings({
    typography,
    onChange,
}: TextStyleSettingsProps) {
    const update = <K extends keyof TypographyStyle>(
        property: K,
        value: TypographyStyle[K]
    ) => {
        onChange({
            ...typography,
            [property]: value,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Police */}
            <label className="flex flex-col gap-1">
                <span className="text-sm">Police</span>

                <select
                    value={typography.fontFamily}
                    onChange={(event) =>
                        update("fontFamily", event.target.value)
                    }
                    className="rounded border border-[#a7a78a] bg-[#ffffe3] p-2"
                >
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                </select>
            </label>

            {/* Taille */}
            <label className="flex flex-col gap-1">
                <span className="text-sm">Taille : {typography.fontSize}px</span>

                <input
                    type="range"
                    min="8"
                    max="72"
                    value={typography.fontSize}
                    onChange={(event) =>
                        update("fontSize", Number(event.target.value))
                    }
                />
            </label>

            {/* Graisse */}
            <label className="flex flex-col gap-1">
                <span className="text-sm">Graisse</span>

                <select
                    value={typography.fontWeight}
                    onChange={(event) =>
                        update("fontWeight", Number(event.target.value))
                    }
                    className="rounded border border-[#a7a78a] bg-[#ffffe3] p-2"
                >
                    <option value={300}>Light</option>
                    <option value={400}>Normal</option>
                    <option value={500}>Medium</option>
                    <option value={600}>Semi-bold</option>
                    <option value={700}>Bold</option>
                    <option value={900}>Black</option>
                </select>
            </label>

            {/* Italique */}
            <label className="flex items-center justify-between text-sm">
                Italique

                <input
                    type="checkbox"
                    checked={typography.fontStyle === "italic"}
                    onChange={(event) =>
                        update(
                            "fontStyle",
                            event.target.checked ? "italic" : "normal"
                        )
                    }
                />
            </label>

            {/* Alignement */}
            <label className="flex flex-col gap-1">
                <span className="text-sm">Alignement</span>

                <select
                    value={typography.textAlign}
                    onChange={(event) =>
                        update(
                            "textAlign",
                            event.target.value as TypographyStyle["textAlign"]
                        )
                    }
                    className="rounded border border-[#a7a78a] bg-[#ffffe3] p-2"
                >
                    <option value="left">Gauche</option>
                    <option value="center">Centré</option>
                    <option value="right">Droite</option>
                    <option value="justify">Justifié</option>
                </select>
            </label>

            {/* Interligne */}
            <label className="flex flex-col gap-1">
                <span className="text-sm">
                    Interligne : {typography.lineHeight}
                </span>

                <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={typography.lineHeight}
                    onChange={(event) =>
                        update("lineHeight", Number(event.target.value))
                    }
                />
            </label>

            {/* Espacement des lettres */}
            <label className="flex flex-col gap-1">
                <span className="text-sm">
                    Espacement : {typography.letterSpacing}px
                </span>

                <input
                    type="range"
                    min="-2"
                    max="10"
                    step="0.5"
                    value={typography.letterSpacing}
                    onChange={(event) =>
                        update("letterSpacing", Number(event.target.value))
                    }
                />
            </label>

            {/* Décoration */}
            <label className="flex flex-col gap-1">
                <span className="text-sm">Décoration</span>

                <select
                    value={typography.textDecorationLine}
                    onChange={(event) =>
                        update(
                            "textDecorationLine",
                            event.target.value as TypographyStyle["textDecorationLine"]
                        )
                    }
                    className="rounded border border-[#a7a78a] bg-[#ffffe3] p-2"
                >
                    <option value="none">Aucune</option>
                    <option value="underline">Souligné</option>
                    <option value="overline">Au-dessus</option>
                    <option value="line-through">Barré</option>
                </select>
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-sm">Style de décoration</span>

                <select
                    value={typography.textDecorationStyle}
                    onChange={(event) =>
                        update(
                            "textDecorationStyle",
                            event.target.value as TypographyStyle["textDecorationStyle"]
                        )
                    }
                    className="rounded border border-[#a7a78a] bg-[#ffffe3] p-2"
                >
                    <option value="solid">Continu</option>
                    <option value="double">Double</option>
                    <option value="dotted">Pointillé</option>
                    <option value="dashed">Tirets</option>
                    <option value="wavy">Ondulé</option>
                </select>
            </label>
        </div>
    );
}