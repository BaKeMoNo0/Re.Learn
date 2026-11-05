import type { SheetFormat } from "../sheet/formats";

export type Page = {
    id: string;
    title: string;
    content: string;
    format: SheetFormat;
};

export type PageUpdate = Partial<
    Pick<Page, "content" | "format">
>;