import { cn } from "@/lib/utils";

/**
 * Props for {@link Vibe0Logo}.
 *
 * @property className - Extra classes applied to the wrapper.
 * @property showWordmark - Whether to render the "vibe0" text next to the mark.
 */
type Vibe0LogoProps = {
    className?: string;
    showWordmark?: boolean;
};

/**
 * The standalone vibe0 glyph (SVG mark) without the wordmark.
 *
 * Inherits color via `currentColor` so it adapts to the surrounding text color.
 *
 * @param className - Extra classes applied to the `<svg>` element.
 */
function Vibe0Mark({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 44 48"
            fill="none"
            aria-hidden
            className={cn("shrink-0", className)}
        >
            <rect
                x="8.5"
                y="4"
                width="27"
                height="40"
                rx="13.5"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
            />
            <path
                fill="currentColor"
                d="M10.8 38.2C10.8 32.5 13.8 26.5 19.5 24.8C16.2 29.2 13.2 34.2 10.8 38.2Z"
            />
        </svg>
    );
}

/**
 * The vibe0 brand logo: the glyph mark plus an optional "vibe0" wordmark.
 *
 * @param props - See {@link Vibe0LogoProps}.
 */
export function Vibe0Logo({
    className,
    showWordmark = true,
}: Vibe0LogoProps) {
    return (
        <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
            <Vibe0Mark className="h-7 w-auto" />
            {showWordmark ? (
                <span className="text-base font-semibold tracking-tight">vibe0</span>
            ) : null}
        </span>
    );
}

export { Vibe0Mark };