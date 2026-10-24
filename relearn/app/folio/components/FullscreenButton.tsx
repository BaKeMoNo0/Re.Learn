"use client";

import { useEffect, useState } from "react";

type FullscreenButtonProps = {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function FullscreenButton({ containerRef }: FullscreenButtonProps) {
    
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            // Request fullscreen for the container div
            containerRef.current.requestFullscreen()
        }

        const handleFullscreenChange = () => {
            setIsFullscreen(
                document.fullscreenElement === containerRef.current
            );
        };

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        );

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    async function toggleFullscreen() {
        try {
            if (document.fullscreenElement === containerRef.current) {
                await document.exitFullscreen();
            } else {
                await containerRef.current?.requestFullscreen();
            }
        } catch (error) {
            console.error("Impossible de modifier le plein écran :", error);
        }
    }

    return (
        <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={
                isFullscreen
                    ? "Quitter le plein écran"
                    : "Passer en plein écran"
            }
            className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#d8d9b8] text-[#454536] shadow-md transition-colors hover:bg-[#c6c9a0]"
        >
            {isFullscreen ? "↙" : "↗"}
        </button>
    );
}