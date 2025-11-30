/**
 * Token generation script (ADR-112)
 * Generates CSS from design tokens
 */

import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { generateCSSVariables } from "../src/client/design-tokens";

async function main() {
	const cssContent = generateCSSVariables();
	const outputPath = resolve(import.meta.dirname, "../src/client/generated-tokens.css");

	await writeFile(outputPath, cssContent, "utf-8");
	console.info(`✓ Generated CSS tokens at ${outputPath}`);
}

main().catch(console.error);
