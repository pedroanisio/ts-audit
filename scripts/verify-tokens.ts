/**
 * Token verification script (ADR-112, ADR-113)
 * Verifies design token consistency
 */

import {
	BORDER_COLORS,
	COLORS_ACCENT,
	COLORS_BG,
	COLORS_TEXT,
	FONT_SIZES,
	SPACING,
} from "../src/client/design-tokens";

interface TokenValidation {
	name: string;
	valid: boolean;
	issues: string[];
}

function validateTokens(): TokenValidation[] {
	const validations: TokenValidation[] = [];

	// Validate color tokens have proper format
	const colorTokens = {
		COLORS_BG,
		COLORS_TEXT,
		COLORS_ACCENT,
		BORDER_COLORS,
	};

	for (const [group, tokens] of Object.entries(colorTokens)) {
		const issues: string[] = [];
		for (const [key, value] of Object.entries(tokens)) {
			if (typeof value !== "string") {
				issues.push(`${key}: expected string, got ${typeof value}`);
			} else if (!value.startsWith("#") && !value.startsWith("rgb") && !value.startsWith("hsl")) {
				issues.push(`${key}: "${value}" is not a valid color format`);
			}
		}
		validations.push({
			name: group,
			valid: issues.length === 0,
			issues,
		});
	}

	// Validate spacing tokens
	const spacingIssues: string[] = [];
	for (const [key, value] of Object.entries(SPACING)) {
		if (typeof value !== "string") {
			spacingIssues.push(`${key}: expected string, got ${typeof value}`);
		}
	}
	validations.push({
		name: "SPACING",
		valid: spacingIssues.length === 0,
		issues: spacingIssues,
	});

	// Validate font sizes
	const fontSizeIssues: string[] = [];
	for (const [key, value] of Object.entries(FONT_SIZES)) {
		if (typeof value !== "string" || !value.endsWith("rem")) {
			fontSizeIssues.push(`${key}: expected rem value, got "${value}"`);
		}
	}
	validations.push({
		name: "FONT_SIZES",
		valid: fontSizeIssues.length === 0,
		issues: fontSizeIssues,
	});

	return validations;
}

function main() {
	console.info("🔍 Verifying design tokens...\n");

	const results = validateTokens();
	let hasErrors = false;

	for (const result of results) {
		if (result.valid) {
			console.info(`✓ ${result.name}: valid`);
		} else {
			hasErrors = true;
			console.info(`✗ ${result.name}: invalid`);
			for (const issue of result.issues) {
				console.info(`  - ${issue}`);
			}
		}
	}

	console.info("");

	if (hasErrors) {
		console.info("❌ Token verification failed");
		process.exit(1);
	} else {
		console.info("✅ All tokens are valid");
	}
}

main();
