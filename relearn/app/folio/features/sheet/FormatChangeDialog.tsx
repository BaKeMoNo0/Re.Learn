
"use client";

import { useState } from "react";
import type { SheetFormat } from "./sheet.types";

type Props = {
    fromFormat: SheetFormat;
    toFormat: SheetFormat;
    onCancel: () => void;
    onEdit: () => void;
    onDelete: () => void;
};

export default function FormatChangeDialog({
    fromFormat,
    toFormat,
    onCancel,
    onEdit,
    onDelete,
}: Props) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center
                       bg-black/40 p-4"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="format-dialog-title"
                className="w-full max-w-md rounded-xl bg-[#ffffe3]
                           p-6 text-[#454536] shadow-xl"
            >
                {confirmDelete ? (
                    <>
                        <h2 className="text-xl font-semibold">
                            Supprimer le texte excédentaire ?
                        </h2>

                        <p className="mt-3 text-sm leading-relaxed">
                            Le texte qui ne tient pas dans le format{" "}
                            {toFormat} sera supprimé. Cette action
                            peut entraîner une perte d'informations.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setConfirmDelete(false)}
                                className="rounded-lg px-4 py-2 hover:bg-[#e7e7d9]"
                            >
                                Annuler
                            </button>

                            <button
                                type="button"
                                onClick={onDelete}
                                className="rounded-lg bg-[#777b5b] px-4 py-2
                                           text-white hover:bg-[#62664a]"
                            >
                                Confirmer la suppression
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2
                            id="format-dialog-title"
                            className="text-xl font-semibold"
                        >
                            Le contenu dépasse la feuille
                        </h2>

                        <p className="mt-3 text-sm leading-relaxed">
                            Tu as changé le format de {fromFormat} à{" "}
                            {toFormat}. Une partie du texte ne tient
                            plus dans la nouvelle page.
                        </p>

                        <p className="mt-4 font-medium">
                            Que souhaites-tu faire ?
                        </p>

                        <div className="mt-5 flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="rounded-lg border border-[#a7a78a]
                                           px-4 py-3 text-left hover:bg-[#e7e7d9]"
                            >
                                <span className="block font-medium">
                                    Revenir au format précédent
                                </span>
                                <span className="mt-1 block text-sm opacity-75">
                                    Conserver le format et le texte actuels.
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={onEdit}
                                className="rounded-lg border border-[#a7a78a]
                                           px-4 py-3 text-left hover:bg-[#e7e7d9]"
                            >
                                <span className="block font-medium">
                                    Modifier le texte
                                </span>
                                <span className="mt-1 block text-sm opacity-75">
                                    Afficher la limite du nouveau format
                                    pour ajuster le contenu.
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setConfirmDelete(true)}
                                className="rounded-lg border border-[#a7a78a]
                                           px-4 py-3 text-left hover:bg-[#e7e7d9]"
                            >
                                <span className="block font-medium">
                                    Supprimer le texte excédentaire
                                </span>
                                <span className="mt-1 block text-sm opacity-75">
                                    Conserver uniquement le texte qui tient
                                    dans la nouvelle page.
                                </span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
