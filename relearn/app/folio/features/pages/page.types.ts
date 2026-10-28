import type { SheetFormat } from "../sheet/sheet.types";

export type Page = {
    id: string;
    title: string;
    content: string;
    format: SheetFormat;
};