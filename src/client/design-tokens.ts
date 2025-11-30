/**
 * Design Token System (ADR-112)
 * Single source of truth for all design values
 * @module @client/design-tokens
 */

import type { CSSProperties } from "react";

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const COLORS_BG = {
	primary: "#0a0a0f",
	secondary: "#12121a",
	tertiary: "#1a1a24",
	elevated: "#22222e",
	overlay: "rgba(0, 0, 0, 0.7)",
} as const;

export const COLORS_TEXT = {
	primary: "#f0f0f5",
	secondary: "#a0a0b0",
	muted: "#606070",
	inverse: "#0a0a0f",
} as const;

export const COLORS_ACCENT = {
	primary: "#6366f1",
	primaryHover: "#818cf8",
	success: "#22c55e",
	warning: "#f59e0b",
	error: "#ef4444",
	info: "#3b82f6",
} as const;

export const BORDER_COLORS = {
	subtle: "rgba(255, 255, 255, 0.06)",
	default: "rgba(255, 255, 255, 0.1)",
	strong: "rgba(255, 255, 255, 0.2)",
	accent: COLORS_ACCENT.primary,
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const FONTS = {
	sans: "'Plus Jakarta Sans', system-ui, sans-serif",
	mono: "'JetBrains Mono', 'Fira Code', monospace",
} as const;

export const FONT_SIZES = {
	xs: "0.75rem",
	sm: "0.875rem",
	base: "1rem",
	lg: "1.125rem",
	xl: "1.25rem",
	"2xl": "1.5rem",
	"3xl": "2rem",
	"4xl": "2.5rem",
} as const;

export const FONT_WEIGHTS = {
	normal: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
} as const;

export const LINE_HEIGHTS = {
	tight: 1.25,
	normal: 1.5,
	relaxed: 1.75,
} as const;

// ============================================================================
// SPACING TOKENS
// ============================================================================

/** Spacing scale in pixels - use for margins, padding, gaps */
export const SPACING = {
	0: "0",
	1: "0.25rem", // 4px
	2: "0.5rem", // 8px
	3: "0.75rem", // 12px
	4: "1rem", // 16px
	5: "1.25rem", // 20px
	6: "1.5rem", // 24px
	8: "2rem", // 32px
	10: "2.5rem", // 40px
	12: "3rem", // 48px
	16: "4rem", // 64px
	20: "5rem", // 80px
} as const;

// ============================================================================
// LAYOUT TOKENS
// ============================================================================

export const BORDER_RADIUS = {
	none: "0",
	sm: "0.25rem",
	md: "0.5rem",
	lg: "0.75rem",
	xl: "1rem",
	full: "9999px",
} as const;

export const SHADOWS = {
	sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
	md: "0 4px 6px rgba(0, 0, 0, 0.4)",
	lg: "0 10px 15px rgba(0, 0, 0, 0.5)",
	xl: "0 20px 25px rgba(0, 0, 0, 0.6)",
	glow: `0 0 20px ${COLORS_ACCENT.primary}40`,
} as const;

export const Z_INDEX = {
	base: 0,
	dropdown: 100,
	sticky: 200,
	modal: 300,
	popover: 400,
	tooltip: 500,
} as const;

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

export const TRANSITIONS = {
	fast: "150ms ease",
	normal: "250ms ease",
	slow: "400ms ease",
} as const;

export const DURATIONS = {
	fast: 150,
	normal: 250,
	slow: 400,
} as const;

// ============================================================================
// COMPONENT STYLE PATTERNS (ADR-112, ADR-113)
// ============================================================================

/** Reusable style patterns using tokens */
export const STYLES = {
	// Layout
	flexCenter: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	} satisfies CSSProperties,

	flexColumn: {
		display: "flex",
		flexDirection: "column",
	} satisfies CSSProperties,

	// Cards
	card: {
		backgroundColor: COLORS_BG.secondary,
		borderRadius: BORDER_RADIUS.lg,
		border: `1px solid ${BORDER_COLORS.subtle}`,
		padding: SPACING[4],
	} satisfies CSSProperties,

	cardElevated: {
		backgroundColor: COLORS_BG.elevated,
		borderRadius: BORDER_RADIUS.lg,
		border: `1px solid ${BORDER_COLORS.default}`,
		padding: SPACING[4],
		boxShadow: SHADOWS.md,
	} satisfies CSSProperties,

	// Text
	heading: {
		fontFamily: FONTS.sans,
		fontWeight: FONT_WEIGHTS.semibold,
		color: COLORS_TEXT.primary,
		lineHeight: LINE_HEIGHTS.tight,
	} satisfies CSSProperties,

	body: {
		fontFamily: FONTS.sans,
		fontWeight: FONT_WEIGHTS.normal,
		color: COLORS_TEXT.secondary,
		lineHeight: LINE_HEIGHTS.normal,
	} satisfies CSSProperties,

	code: {
		fontFamily: FONTS.mono,
		fontSize: FONT_SIZES.sm,
		backgroundColor: COLORS_BG.tertiary,
		padding: `${SPACING[1]} ${SPACING[2]}`,
		borderRadius: BORDER_RADIUS.sm,
	} satisfies CSSProperties,

	// Interactive
	buttonBase: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: SPACING[2],
		padding: `${SPACING[2]} ${SPACING[4]}`,
		borderRadius: BORDER_RADIUS.md,
		fontFamily: FONTS.sans,
		fontWeight: FONT_WEIGHTS.medium,
		fontSize: FONT_SIZES.sm,
		cursor: "pointer",
		transition: `all ${TRANSITIONS.fast}`,
		border: "none",
	} satisfies CSSProperties,

	buttonPrimary: {
		backgroundColor: COLORS_ACCENT.primary,
		color: COLORS_TEXT.primary,
	} satisfies CSSProperties,

	buttonSecondary: {
		backgroundColor: COLORS_BG.tertiary,
		color: COLORS_TEXT.secondary,
		border: `1px solid ${BORDER_COLORS.default}`,
	} satisfies CSSProperties,
} as const;

// ============================================================================
// CSS VARIABLE GENERATION
// ============================================================================

/** Generate CSS custom properties from tokens for use in stylesheets */
export function generateCSSVariables(): string {
	const vars: string[] = [];

	// Background colors
	for (const [key, value] of Object.entries(COLORS_BG)) {
		vars.push(`--color-bg-${key}: ${value};`);
	}

	// Text colors
	for (const [key, value] of Object.entries(COLORS_TEXT)) {
		vars.push(`--color-text-${key}: ${value};`);
	}

	// Accent colors
	for (const [key, value] of Object.entries(COLORS_ACCENT)) {
		vars.push(`--color-accent-${key}: ${value};`);
	}

	// Border colors
	for (const [key, value] of Object.entries(BORDER_COLORS)) {
		vars.push(`--color-border-${key}: ${value};`);
	}

	// Fonts
	for (const [key, value] of Object.entries(FONTS)) {
		vars.push(`--font-${key}: ${value};`);
	}

	// Font sizes
	for (const [key, value] of Object.entries(FONT_SIZES)) {
		vars.push(`--font-size-${key}: ${value};`);
	}

	// Spacing
	for (const [key, value] of Object.entries(SPACING)) {
		vars.push(`--spacing-${key}: ${value};`);
	}

	// Border radius
	for (const [key, value] of Object.entries(BORDER_RADIUS)) {
		vars.push(`--radius-${key}: ${value};`);
	}

	// Shadows
	for (const [key, value] of Object.entries(SHADOWS)) {
		vars.push(`--shadow-${key}: ${value};`);
	}

	// Transitions
	for (const [key, value] of Object.entries(TRANSITIONS)) {
		vars.push(`--transition-${key}: ${value};`);
	}

	return `:root {\n  ${vars.join("\n  ")}\n}`;
}
