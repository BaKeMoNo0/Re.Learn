"use client";

import { useCallback, useEffect, useState } from "react";
import type { Page } from "./page.types";
import type { SheetFormat } from "../sheet/sheet.types";

export default function usePages(
    initialFormat: SheetFormat
) {
    const [pages, setPages] = useState<Page[]>([]);
    const [activePageId, setActivePageId] = useState<string | null>(null);

    useEffect(() => {
        const firstPage: Page = {
            id: crypto.randomUUID(),
            title: "Page 1",
            content: "",
            format: initialFormat,
        };

        setPages([firstPage]);
        setActivePageId(firstPage.id);
    }, [initialFormat]);

    const activePageIndex = pages.findIndex(
        (page) => page.id === activePageId
    );

    const activePage = pages[activePageIndex] ?? null;

    function createPage() {
        if (!activePage) return;

        const newPage: Page = {
            id: crypto.randomUUID(),
            title: `Page ${pages.length + 1}`,
            content: "",
            format: activePage.format,
        };

        setPages((currentPages) => [...currentPages, newPage]);
        setActivePageId(newPage.id);
    }

    const updatePage = useCallback((updatedPage: Page) => {
        setPages((currentPages) =>
            currentPages.map((page) =>
                page.id === updatedPage.id
                    ? updatedPage
                    : page
            )
        );
    }, []);

    function goToPreviousPage() {
        if (activePageIndex > 0) {
            setActivePageId(pages[activePageIndex - 1].id);
        }
    }

    function goToNextPage() {
        if (activePageIndex < pages.length - 1) {
            setActivePageId(pages[activePageIndex + 1].id);
        }
    }

    return {
        pages,
        activePage,
        activePageIndex,
        createPage,
        updatePage,
        goToPreviousPage,
        goToNextPage,
        setActivePageId,
    };
}