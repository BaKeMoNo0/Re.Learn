"use client";

import { useCallback, useState } from "react";

import { defaultAppearance } from "./appearance.defaults";

import type {
    Appearance,
    AppearanceStore,
    AppearanceTarget,
    ColorStyle,
    LayoutStyle,
    TypographyStyle,
} from "./appearance.types";

export default function useAppearance() {
    const [store, setStore] = useState<AppearanceStore>({
        folio: defaultAppearance,
        sheets: {},
        elements: {},
    });

    /**
     * Récupère l'apparence correspondant à une cible.
     *
     * Si aucune apparence n'a encore été enregistrée,
     * retourne l'apparence par défaut.
     */
    const getAppearance = useCallback(
        (target: AppearanceTarget): Appearance => {
            if (target.type === "folio") {
                return store.folio;
            }

            if (target.type === "sheet") {
                return store.sheets[target.id] ?? defaultAppearance;
            }

            const key = `${target.scope}:${target.id}`;

            return store.elements[key] ?? defaultAppearance;
        },
        [store]
    );

    /**
     * Fonction interne qui centralise la mise à jour
     * d'une apparence, quelle que soit sa cible.
     */
    const updateAppearance = useCallback(
        (
            target: AppearanceTarget,
            updater: (appearance: Appearance) => Appearance
        ) => {
            setStore((currentStore) => {

                if (target.type === "folio") {
                    return {
                        ...currentStore,
                        folio: updater(currentStore.folio),
                    };
                }

                if (target.type === "sheet") {
                    const currentAppearance =
                        currentStore.sheets[target.id] ?? defaultAppearance;

                    return {
                        ...currentStore,
                        sheets: {
                            ...currentStore.sheets,
                            [target.id]: updater(currentAppearance),
                        },
                    };
                }

                const key = `${target.scope}:${target.id}`;
                const currentAppearance = currentStore.elements[key] ?? defaultAppearance;

                return {
                    ...currentStore,
                    elements: {
                        ...currentStore.elements,
                        [key]: updater(currentAppearance),
                    },
                };
            });
        },
        []
    );

    /**
     * Met à jour les couleurs d'une cible.
                        [target.id]: updatedAppearance,
                    },
                };
            });
        },
        []
    );

    /**
     * Met à jour les couleurs d'une cible.
     */
    const updateColors = useCallback(
        (target: AppearanceTarget, colors: ColorStyle) => {
            updateAppearance(target, (appearance) => ({
                ...appearance,
                colors,
            }));
        },
        [updateAppearance]
    );

    /**
     * Met à jour la typographie d'une cible.
     */
    const updateTypography = useCallback(
        (target: AppearanceTarget, typography: TypographyStyle) => {
            updateAppearance(target, (appearance) => ({
                ...appearance,
                typography,
            }));
        },
        [updateAppearance]
    );

    /**
     * Met à jour la disposition d'une cible.
     */
    const updateLayout = useCallback(
        (target: AppearanceTarget, layout: LayoutStyle) => {
            updateAppearance(target, (appearance) => ({
                ...appearance,
                layout,
            }));
        },
        [updateAppearance]
    );

    return {
        getAppearance,
        updateColors,
        updateTypography,
        updateLayout,
    };
}