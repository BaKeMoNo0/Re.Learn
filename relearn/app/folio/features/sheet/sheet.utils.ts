
import { formats } from "../sheet-format/formats";
import type { SheetFormat } from "./sheet.types";

// Mesurer le texte et déterminer ce qui tient dans une page

const SHEET_INSET = 42; // Bordures + padding p-5

export function fitsInFormat(
    content: string,
    format: SheetFormat
): boolean {
    if (typeof document === "undefined") return true;

    const dimensions = formats[format];
    const probe = document.createElement("textarea");

    probe.className =
        "block box-border resize-none border-none bg-transparent " +
        "text-lg leading-relaxed text-[#454536] outline-none";

    Object.assign(probe.style, {
        position: "fixed",
        left: "-10000px",
        top: "0",
        visibility: "hidden",
        width: `${dimensions.width - SHEET_INSET}px`,
        height: `${dimensions.height - SHEET_INSET}px`,
        overflow: "hidden",
        padding: "0",
        margin: "0",
        boxSizing: "border-box",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        transform: "none",
    });

    probe.value = content;
    document.body.appendChild(probe);

    const fits = probe.scrollHeight <= probe.clientHeight + 1;

    probe.remove();

    return fits;
}

export function largestFittingPrefix(
    content: string,
    format: SheetFormat
): string {
    const characters = Array.from(content);
    let low = 0;
    let high = characters.length;

    while (low < high) {
        const middle = Math.ceil((low + high) / 2);
        const candidate = characters.slice(0, middle).join("");

        if (fitsInFormat(candidate, format)) {
            low = middle;
        } else {
            high = middle - 1;
        }
    }

    return characters.slice(0, low).join("");
}
