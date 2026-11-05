"use client";

type ColorPickerProps = {
    label: string;
    value: string;
    onChange: (color: string) => void;
};

export default function ColorPicker({
    label,
    value,
    onChange,
}: ColorPickerProps) {
    return (
        <label className="flex items-center justify-between gap-4">
            <span className="text-sm">{label}</span>

            <div className="flex items-center gap-2">
                <input
                    type="color"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-[#a7a78a] bg-transparent"
                />

                <span className="w-16 text-xs uppercase">
                    {value}
                </span>
            </div>
        </label>
    );
}