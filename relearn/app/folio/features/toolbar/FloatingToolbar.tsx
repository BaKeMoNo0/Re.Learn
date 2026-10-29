
"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";

type Side = "left" | "right";

type Props = {
    children: ReactNode;
    icon: string;
    label: string;
    side: Side;
    resetKey: number;
    visible: boolean;
    initialTop?: number;
};

type Position = {
    x: number;
    y: number;
};

const BUTTON_SIZE = 44;

export default function FloatingToolbar({
    children,
    icon,
    label,
    side,
    resetKey,
    visible,
    initialTop = 80,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<Position>({
        x: 0,
        y: initialTop,
    });

    const dragRef = useRef<{
        pointerX: number;
        pointerY: number;
        startX: number;
        startY: number;
    } | null>(null);

    useEffect(() => {
        setPosition({ x: 0, y: initialTop });
        setIsOpen(false);
    }, [resetKey, initialTop]);

    function handlePointerDown(
        event: PointerEvent<HTMLButtonElement>
    ) {
        if (event.button !== 0) return;

        event.currentTarget.setPointerCapture(event.pointerId);

        dragRef.current = {
            pointerX: event.clientX,
            pointerY: event.clientY,
            startX: position.x,
            startY: position.y,
        };
    }

    function handlePointerMove(
        event: PointerEvent<HTMLButtonElement>
    ) {
        if (!dragRef.current) return;

        const drag = dragRef.current;

        setPosition({
            x: drag.startX + event.clientX - drag.pointerX,
            y: Math.max(
                0,
                drag.startY + event.clientY - drag.pointerY
            ),
        });
    }

    function handlePointerUp() {
        dragRef.current = null;
    }

    const isRight = side === "right";

    return (
        <div
            className="fixed z-40"
            style={{
                top: position.y,
                left: isRight ? undefined : 0,
                right: isRight ? 0 : undefined,
                transform: `translate(${position.x}px, 0)`,
                visibility: visible ? "visible" : "hidden",
                pointerEvents: visible ? "auto" : "none",
            }}
        >
            <div
                className={[
                    "flex items-start gap-2 transition-transform duration-300 ease-out",
                    isRight ? "flex-row" : "flex-row-reverse",
                ].join(" ")}
                style={{
                    transform: isOpen
                        ? "translateX(0)"
                        : isRight
                            ? `translateX(calc(100% - ${BUTTON_SIZE}px))`
                            : `translateX(calc(-100% + ${BUTTON_SIZE}px))`,
                }}
            >
                <button
                    type="button"
                    aria-label={`Ouvrir la barre : ${label}`}
                    aria-expanded={isOpen}
                    title={label}
                    onClick={() => setIsOpen((open) => !open)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d5d5b5] bg-[#ffffe3] text-xl shadow-lg hover:bg-[#eeeed7]"
                >
                    {icon}
                </button>

                <div className="flex min-w-0 items-start gap-2 rounded-2xl border border-[#d5d5b5] bg-[#ffffe3] p-2 shadow-lg">
                    {isRight && (
                        <>  
                            <button
                                type="button"
                                aria-label={`Déplacer ${label}`}
                                title="Maintenir pour déplacer"
                                onPointerDown={handlePointerDown}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                                className="flex h-10 w-6 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-[#85856b] hover:bg-[#e5e5ce] active:cursor-grabbing"
                            >
                                ⠿
                            </button>
                            {children}
                        </>
                    )} :
                    {!isRight && (
                        <>
                            {children}
                            <button
                                type="button"
                                aria-label={`Déplacer ${label}`}
                                title="Maintenir pour déplacer"
                                onPointerDown={handlePointerDown}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                                className="flex h-10 w-6 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-[#85856b] hover:bg-[#e5e5ce] active:cursor-grabbing"
                            >
                                ⠿
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
