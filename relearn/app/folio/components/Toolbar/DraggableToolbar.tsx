"use client";

import { useRef, useState } from "react";
import type { ReactNode, PointerEvent } from "react";

type DraggableToolbarProps = {
    children: ReactNode;
};

type Position = {
    x: number;
    y: number;
};

export default function DraggableToolbar({children,}: DraggableToolbarProps) {

    const [position, setPosition] = useState<Position>({
        x: 0,
        y: 0,
    });

    const dragRef = useRef<{
        pointerX: number;
        pointerY: number;
        startX: number; 
        startY: number;
    } | null>(null);

    function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
        if (event.button !== 0) return;

        event.currentTarget.setPointerCapture(event.pointerId);

        dragRef.current = {
            pointerX: event.clientX,
            pointerY: event.clientY,
            startX: position.x,
            startY: position.y,
        };
    }

    function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
        if (!dragRef.current) return;

        const drag = dragRef.current;

        setPosition({
            x: drag.startX + event.clientX - drag.pointerX,
            y: drag.startY + event.clientY - drag.pointerY,
        });
    }

    function handlePointerUp() {
        dragRef.current = null;
    }

    return (
        <div
            className="fixed left-1/6 top-10 z-40"
            style={{
                transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
            }}
        >
            <div className="flex items-center gap-2 rounded-2xl border border-[#d5d5b5] bg-[#ffffe3] p-2 shadow-lg">
                <button
                    type="button"
                    aria-label="Déplacer la barre d'outils"
                    title="Maintenir pour déplacer"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    className="flex h-10 w-6 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-[#85856b] hover:bg-[#e5e5ce] active:cursor-grabbing"
                >
                    <svg
                        viewBox="0 0 12 20"
                        width="12"
                        height="20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        {Array.from({ length: 6 }, (_, index) => (
                            <circle
                                key={index}
                                cx={index % 2 === 0 ? 3 : 9}
                                cy={Math.floor(index / 2) * 6 + 4}
                                r="1.5"
                            />
                        ))}
                    </svg>
                </button>

                {children}
            </div>
        </div>
    );
}