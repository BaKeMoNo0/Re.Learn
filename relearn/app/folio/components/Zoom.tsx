"use client";

import { useEffect } from "react";

type ZoomProps = {
    zoom: number;
    onZoomChange: (zoom: number) => void;
};

const MIN_ZOOM = 25;
const MAX_ZOOM = 200;

export default function Zoom({ zoom, onZoomChange }: ZoomProps) {
    useEffect(() => {
        function handleWheel(event: WheelEvent) {
            // Ctrl + molette ou pincement du pavé tactile
            if (!event.ctrlKey) return;

            // Empêche le navigateur de zoomer sur toute la page
            event.preventDefault();

            const factor = Math.exp(-event.deltaY * 0.002);

            const nextZoom = Math.min(
                MAX_ZOOM,
                Math.max(MIN_ZOOM, zoom * factor)
            );

            onZoomChange(Math.round(nextZoom));
        }

        window.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [zoom, onZoomChange]);

    return (
        <div
            className="flex min-w-16 items-center justify-center rounded-full px-3 py-2 text-sm font-medium text-[#454536]"
            aria-label={`Zoom : ${zoom} %`}
            title="Pincer sur le pavé tactile ou utiliser Ctrl + molette"
        >
            {zoom} %
        </div>
    );
}