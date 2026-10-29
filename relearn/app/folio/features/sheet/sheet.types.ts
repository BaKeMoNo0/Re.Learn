
import type { formats } from "../toolbar/format/formats";

export type SheetFormat = keyof typeof formats;

export type FormatChangeAction =
    | "cancel"
    | "edit"
    | "delete";
