
import type { formats } from "../sheet-format/formats";

export type SheetFormat = keyof typeof formats;

export type FormatChangeAction =
    | "cancel"
    | "edit"
    | "delete";
