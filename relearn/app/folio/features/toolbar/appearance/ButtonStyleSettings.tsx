"use client";

import type { ButtonAppearance } from "./appearance.types";

type Props = {
    buttons: ButtonAppearance;
    onChange: (buttons: ButtonAppearance) => void;
};

export default function ButtonStyleSettings({
    buttons,
    onChange,
}: Props) {
    const updateButtons = (
        updates: Partial<ButtonAppearance>
    ) => {
        onChange({
            ...buttons,
            ...updates,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Couleur de fond */}
            <div className="flex items-center justify-between">
                <label className="text-sm">
                    Couleur de fond
                </label>

                <input
                    type="color"
                    value={buttons.backgroundColor}
                    onChange={(event) =>
                        updateButtons({
                            backgroundColor: event.target.value,
                        })
                    }
                    className="h-9 w-12 cursor-pointer rounded border-0 bg-transparent"
                />
            </div>

            {/* Couleur du texte */}
            <div className="flex items-center justify-between">
                <label className="text-sm">
                    Couleur du texte
                </label>

                <input
                    type="color"
                    value={buttons.textColor}
                    onChange={(event) =>
                        updateButtons({
                            textColor: event.target.value,
                        })
                    }
                    className="h-9 w-12 cursor-pointer rounded border-0 bg-transparent"
                />
            </div>

            {/* Couleur de bordure */}
            <div className="flex items-center justify-between">
                <label className="text-sm">
                    Couleur de bordure
                </label>

                <input
                    type="color"
                    value={buttons.borderColor}
                    onChange={(event) =>
                        updateButtons({
                            borderColor: event.target.value,
                        })
                    }
                    className="h-9 w-12 cursor-pointer rounded border-0 bg-transparent"
                />
            </div>

            {/* Arrondi */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                    <label>Arrondi des coins</label>
                    <span>{buttons.borderRadius}px</span>
                </div>

                <input
                    type="range"
                    min={0}
                    max={30}
                    value={buttons.borderRadius}
                    onChange={(event) =>
                        updateButtons({
                            borderRadius: Number(event.target.value),
                        })
                    }
                    className="w-full accent-[#777b5b]"
                />
            </div>
        </div>
    );
}