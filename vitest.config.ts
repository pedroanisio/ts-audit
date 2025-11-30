import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@client": resolve(__dirname, "src/client"),
			"@server": resolve(__dirname, "src/server"),
			"@shared": resolve(__dirname, "src/shared"),
		},
	},
	test: {
		globals: true,
		environment: "happy-dom",
		include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
		exclude: ["node_modules", "dist"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["src/**/*.ts", "src/**/*.tsx"],
			exclude: ["src/**/*.d.ts", "src/**/__tests__/**", "src/**/index.ts", "src/client/main.tsx"],
			thresholds: {
				statements: 70,
				branches: 65,
				functions: 75,
				lines: 70,
			},
		},
	},
});
