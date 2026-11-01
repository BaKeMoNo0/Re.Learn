import type { SheetFormat } from "../sheet/sheet.types";
import type { Appearance } from "../toolbar/appearance/appearance.types";

export type Page = {
    id: string;
    title: string;
    content: string;
    format: SheetFormat;
    appearance: Appearance;
};