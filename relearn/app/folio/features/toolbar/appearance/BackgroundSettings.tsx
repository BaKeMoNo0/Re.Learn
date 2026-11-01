"use client";

import { useRef, useState } from "react";
import type { BackgroundAppearance } from "./appearance.types";

type Props = {
    background: BackgroundAppearance;
    onChange: (background: BackgroundAppearance) => void;
};

export default function BackgroundSettings({
    background,
    onChange,
}: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const updateBackground = (
        updates: Partial<BackgroundAppearance>
    ) => {
        onChange({
            ...background,
            ...updates,
        });
    };

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setError(null);

        if (!file.type.startsWith("image/")) {
            setError("Veuillez sélectionner une image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("L'image ne doit pas dépasser 5 Mo.");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result !== "string") return;

            updateBackground({
                type: "image",
                image: reader.result,
            });
        };

        reader.onerror = () => {
            setError("Impossible de lire cette image.");
        };

        reader.readAsDataURL(file);

        // Permet de sélectionner à nouveau le même fichier.
        event.target.value = "";
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Type de fond */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                    Type de fond
                </label>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            updateBackground({ type: "color" })
                        }
                        className={`flex-1 rounded-lg border p-2 text-sm ${
                            background.type === "color"
                                ? "border-[#777b5b] bg-[#eeeed7]"
                                : "border-[#d5d5b5]"
                        }`}
                    >
                        Couleur
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            updateBackground({ type: "image" })
                        }
                        className={`flex-1 rounded-lg border p-2 text-sm ${
                            background.type === "image"
                                ? "border-[#777b5b] bg-[#eeeed7]"
                                : "border-[#d5d5b5]"
                        }`}
                    >
                        Image
                    </button>
                </div>
            </div>

            {/* Couleur */}
            {background.type === "color" && (
                <div className="flex items-center justify-between gap-3">
                    <label className="text-sm">
                        Couleur de fond
                    </label>

                    <input
                        type="color"
                        value={background.color}
                        onChange={(event) =>
                            updateBackground({
                                color: event.target.value,
                            })
                        }
                        className="h-9 w-12 cursor-pointer rounded border-0 bg-transparent"
                    />
                </div>
            )}

            {/* Image */}
            {background.type === "image" && (
                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-lg border border-[#d5d5b5] bg-[#ffffe3] p-2 text-sm hover:bg-[#eeeed7]"
                    >
                        {background.image
                            ? "Changer l'image"
                            : "Choisir une image"}
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    {error && (
                        <p className="text-xs text-red-600">
                            {error}
                        </p>
                    )}

                    {background.image && (
                        <>
                            <div className="relative overflow-hidden rounded-lg border border-[#d5d5b5]">
                                <img
                                    src={background.image}
                                    alt="Aperçu du fond"
                                    className="h-28 w-full object-cover"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    updateBackground({
                                        image: null,
                                        type: "color",
                                    })
                                }
                                className="text-left text-sm text-red-700 hover:underline"
                            >
                                Supprimer l'image
                            </button>

                            {/* Opacité */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-sm">
                                    <label>Opacité</label>
                                    <span>{background.opacity}%</span>
                                </div>

                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={background.opacity}
                                    onChange={(event) =>
                                        updateBackground({
                                            opacity: Number(event.target.value),
                                        })
                                    }
                                    className="w-full accent-[#777b5b]"
                                />
                            </div>

                            {/* Ajustement */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">
                                    Ajustement
                                </label>

                                <select
                                    value={background.size}
                                    onChange={(event) =>
                                        updateBackground({
                                            size: event.target.value as BackgroundAppearance["size"],
                                        })
                                    }
                                    className="rounded-lg border border-[#d5d5b5] bg-[#ffffe3] p-2 text-sm"
                                >
                                    <option value="cover">
                                        Remplir (Cover)
                                    </option>
                                    <option value="contain">
                                        Contenir (Contain)
                                    </option>
                                    <option value="repeat">
                                        Répéter (Repeat)
                                    </option>
                                </select>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}