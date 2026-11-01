"use client";

import type { Appearance } from "./appearance.types";

import BackgroundSettings from "./BackgroundSettings";
import ButtonStyleSettings from "./ButtonStyleSettings";
import TypographySettings from "./TypographySettings";

type Props = {
    appearance: Appearance;
    onAppearanceChange: (appearance: Appearance) => void;
};

export default function GlobalToolbar({
    appearance,
    onAppearanceChange,
}: Props) {
    const updateBackground = (
        background: Appearance["background"]
    ) => {
        onAppearanceChange({
            ...appearance,
            background,
        });
    };

    const updateButtons = (
        buttons: Appearance["buttons"]
    ) => {
        onAppearanceChange({
            ...appearance,
            buttons,
        });
    };

    const updateTypography = (
        typography: Appearance["typography"]
    ) => {
        onAppearanceChange({
            ...appearance,
            typography,
        });
    };

    const sectionClass =
        "rounded-lg border border-[#d5d5b5] bg-[#ffffe3]";

    const summaryClass =
        "flex cursor-pointer list-none items-center justify-between p-3 text-sm font-medium hover:bg-[#eeeed7] [&::-webkit-details-marker]:hidden";

    return (
        <div className="flex w-64 flex-col gap-2 p-1">

            {/* Arrière-plan */}
            <details className={sectionClass}>
                <summary className={summaryClass}>
                    <span>🎨 Arrière-plan</span>
                    <span className="text-xs">⌄</span>
                </summary>

                <div className="border-t border-[#d5d5b5] p-3">
                    <BackgroundSettings
                        background={appearance.background}
                        onChange={updateBackground}
                    />
                </div>
            </details>

            {/* Boutons */}
            <details className={sectionClass}>
                <summary className={summaryClass}>
                    <span>🔘 Boutons</span>
                    <span className="text-xs">⌄</span>
                </summary>

                <div className="border-t border-[#d5d5b5] p-3">
                    <ButtonStyleSettings
                        buttons={appearance.buttons}
                        onChange={updateButtons}
                    />
                </div>
            </details>

            {/* Typographie */}
            <details className={sectionClass}>
                <summary className={summaryClass}>
                    <span>🔤 Typographie</span>
                    <span className="text-xs">⌄</span>
                </summary>

                <div className="border-t border-[#d5d5b5] p-3">
                    <TypographySettings
                        typography={appearance.typography}
                        onChange={updateTypography}
                    />
                </div>
            </details>
        </div>
    );
}