
"use client";

import { useCallback, useMemo } from "react";

import useAppearance from "./useAppearance";

import type { AppearanceTarget } from "./appearance.types";
import type {
    ColorStyle,
    LayoutStyle,
    TypographyStyle,
} from "./appearance.types";
import { getBackgroundStyle } from "./appearance.utils";

type Props = {
    activePage: {
        id: string;
    } | null;
    editor: {
        mode: "edit" | "customize";
        selection: {
            scope: string;
            id: string;
        } | null;
    };
};

export default function useFolioAppearance({
    activePage,
    editor,
}: Props) {
    const {
        getAppearance,
        updateColors,
        updateTypography,
        updateLayout,
    } = useAppearance();

    // Apparence du Folio.
    const folio = getAppearance({
        type: "folio",
    });

    // Apparence de la Sheet active.
    const sheet = activePage
        ? getAppearance({
              type: "sheet",
              id: activePage.id,
          })
        : null;

    // Apparence de PageNavigation.
    const pageNavigation = getAppearance({
        type: "element",
        scope: "page-navigation",
        id: "main-navigation",
    });

    // Apparences des FloatingToolbars.
    const colorToolbar = getAppearance({
        type: "element",
        scope: "floating-toolbar",
        id: "couleurs",
    });

    const typographyToolbar = getAppearance({
        type: "element",
        scope: "floating-toolbar",
        id: "typographie",
    });

    const layoutToolbar = getAppearance({
        type: "element",
        scope: "floating-toolbar",
        id: "disposition",
    });

    /**
     * Détermine la cible dont l'apparence doit être modifiée.
     *
     * En mode edit : la Sheet active.
     * En mode customize : l'élément sélectionné.
     */
    const appearanceTarget = useMemo<AppearanceTarget | null>(() => {
        if (editor.mode === "edit") {
            return activePage
                ? { type: "sheet", id: activePage.id }
                : null;
        }

        if (!editor.selection) return null;

        if (editor.selection.scope === "folio") {
            return { type: "folio" };
        }

        if (editor.selection.scope === "sheet") {
            return {
                type: "sheet",
                id: editor.selection.id,
            };
        }

        if (
            editor.selection.scope === "page-navigation" ||
            editor.selection.scope === "floating-toolbar"
        ) {
            return {
                type: "element",
                scope: editor.selection.scope,
                id: editor.selection.id,
            };
        }

        return null;
    }, [editor.mode, editor.selection, activePage]);

    // Modifie les couleurs de la cible active.
    const handleColorsChange = useCallback(
        (colors: ColorStyle) => {
            if (!appearanceTarget) return;
            updateColors(appearanceTarget, colors);
        },
        [appearanceTarget, updateColors]
    );

    // Modifie la typographie de la cible active.
    const handleTypographyChange = useCallback(
        (typography: TypographyStyle) => {
            if (!appearanceTarget) return;
            updateTypography(appearanceTarget, typography);
        },
        [appearanceTarget, updateTypography]
    );

    // Modifie la disposition de la cible active.
    const handleLayoutChange = useCallback(
        (layout: LayoutStyle) => {
            if (!appearanceTarget) return;
            updateLayout(appearanceTarget, layout);
        },
        [appearanceTarget, updateLayout]
    );

    // Style du fond du Folio.
    const background = folio.colors.background;

    const backgroundStyle = getBackgroundStyle(
        folio.colors.background
    );

    return {
        folio,
        sheet,
        pageNavigation,
        colorToolbar,
        typographyToolbar,
        layoutToolbar,

        appearanceTarget,

        backgroundStyle,

        updateColors: handleColorsChange,
        updateTypography: handleTypographyChange,
        updateLayout: handleLayoutChange,
    };
}
