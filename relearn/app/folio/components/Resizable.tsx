"use client";

import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";

type ResizeDirection =
    | "n" | "s" | "e" | "w"
    | "ne" | "nw" | "se" | "sw";

type Size = {
    width: number;
    height: number;
};

type ResizeStart = {
    pointerX: number;
    pointerY: number;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
};

type ResizableProps = {
    width: number;
    height: number;
    isSelected: boolean;
    onSelect: () => void;
    onResize: (size: Size) => void;
    children: ReactNode;
    minWidth?: number;
    minHeight?: number;
};

const HANDLE_SIZE = 10;

const handles: {
    direction: ResizeDirection;
    className: string;
}[] = [
    { direction: "n", className: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize" },
    { direction: "s", className: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize" },
    { direction: "e", className: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize" },
    { direction: "w", className: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize" },
    { direction: "ne", className: "right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize" },
    { direction: "nw", className: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize" },
    { direction: "se", className: "bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize" },
    { direction: "sw", className: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize" },
];

export default function Resizable({
    width,
    height,
    isSelected,
    onSelect,
    onResize,
    children,
    minWidth = 80,
    minHeight = 40,
}: ResizableProps) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const resizeStart = useRef<ResizeStart | null>(null);

    const activeDirection = useRef<ResizeDirection | null>(null);

    function handlePointerDown(
        event: PointerEvent<HTMLButtonElement>,
        direction: ResizeDirection,
    ) {
        if (event.button !== 0) return;

        event.preventDefault();
        event.stopPropagation();

        onSelect();

        activeDirection.current = direction;

        resizeStart.current = {
            pointerX: event.clientX,
            pointerY: event.clientY,
            width,
            height,
            offsetX: offset.x,
            offsetY: offset.y,
        };

        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
        const start = resizeStart.current;
        const direction = activeDirection.current;

        if (!start || !direction) return;

        const dx = event.clientX - start.pointerX;
        const dy = event.clientY - start.pointerY;

        const changesWidth = direction.includes("e") || direction.includes("w");
        const changesHeight = direction.includes("n") || direction.includes("s");

        const growsFromLeft = direction.includes("w");
        const growsFromTop = direction.includes("n");

        const nextWidth = changesWidth
            ? Math.max(
                minWidth,
                start.width + (growsFromLeft ? -dx : dx),
            )
            : start.width;

        const nextHeight = changesHeight
            ? Math.max(
                minHeight,
                start.height + (growsFromTop ? -dy : dy),
            )
            : start.height;

        const actualWidthChange = nextWidth - start.width;
        const actualHeightChange = nextHeight - start.height;

        // When resizing from the left or top, keep the opposite
        // edge in place by shifting the element.
        setOffset({
            x: start.offsetX + (growsFromLeft ? -actualWidthChange : 0),
            y: start.offsetY + (growsFromTop ? -actualHeightChange : 0),
        });

        onResize({
            width: nextWidth,
            height: nextHeight,
        });
    }

    function handlePointerUp() {
        resizeStart.current = null;
        activeDirection.current = null;
    }

    const wrapperStyle: CSSProperties = {
        width,
        height,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
    };

    return (
        <div
            style={wrapperStyle}
            onPointerDown={(event) => {
                const target = event.target as HTMLElement;

                // Ne pas sélectionner le conteneur quand on clique
                // sur un bouton ou un élément interactif.
                if (target.closest("button, input, select, textarea")) {
                    return;
                }

                onSelect();
            }}
            className={`relative box-border ${
                isSelected
                    ? "z-10 outline outline-1 outline-[#777b5b]"
                    : ""
            }`}
        >
            <div>
                {children}
            </div>

            {isSelected && handles.map(({ direction, className }) => (
                <button
                    key={direction}
                    type="button"
                    aria-label={`Redimensionner : ${direction}`}
                    onPointerDown={(event) =>
                        handlePointerDown(event, direction)
                    }
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    className={`absolute z-20 rounded-sm border border-[#777b5b] bg-[#ffffe3] touch-none ${className}`}
                    style={{
                        width: HANDLE_SIZE,
                        height: HANDLE_SIZE,
                    }}
                />
            ))}
        </div>
    );
}