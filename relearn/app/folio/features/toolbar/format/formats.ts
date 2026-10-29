export type Format = "A4" | "A5" | "A6" | "A7";

export const formats = {
    A4: { width: 794, height: 1123, widthMm: 210, heightMm: 297 },
    A5: { width: 559, height: 794, widthMm: 148, heightMm: 210 },
    A6: { width: 397, height: 559, widthMm: 105, heightMm: 148 },
    A7: { width: 280, height: 397, widthMm: 74, heightMm: 105 },
} satisfies Record<
    Format,
    { width: number; height: number; widthMm: number; heightMm: number }
>;