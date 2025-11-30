import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@client": resolve(__dirname, "src/client"),
			"@server": resolve(__dirname, "src/server"),
			"@shared": resolve(__dirname, "src/shared"),
		},
	},
	root: "src/client",
	publicDir: "../../public",
	build: {
		outDir: "../../dist/client",
		emptyOutDir: true,
		sourcemap: true,
		rollupOptions: {
			input: resolve(__dirname, "src/client/index.html"),
		},
	},
	server: {
		port: 3000,
		strictPort: true,
		open: false,
	},
});
