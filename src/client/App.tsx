import { FileSearch } from "lucide-react";

export function App() {
	return (
		<main className="app">
			<header className="app-header">
				<FileSearch className="app-icon" />
				<h1>TS Audit</h1>
			</header>
			<section className="app-content">
				<p>TypeScript codebase introspection and audit tool.</p>
			</section>
		</main>
	);
}
