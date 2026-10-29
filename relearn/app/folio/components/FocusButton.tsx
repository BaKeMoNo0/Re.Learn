
"use client";

type Props = {
    isFocused: boolean;
    onToggle: () => void;
};

export default function FocusButton({
    isFocused,
    onToggle,
}: Props) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={
                isFocused
                    ? "Afficher les barres d'outils"
                    : "Masquer les barres d'outils"
            }
            aria-pressed={!isFocused}
            title={
                isFocused
                    ? "Afficher les barres d'outils"
                    : "Mode Focus"
            }
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d5d5b5] bg-[#ffffe3] text-lg shadow-lg hover:bg-[#eeeed7]"
        >
            {isFocused ? "◉" : "◎"}
        </button>
    );
}
