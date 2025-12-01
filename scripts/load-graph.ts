/**
 * Load Knowledge Graph into Neo4j
 *
 * This script reads the Cypher file and executes statements individually,
 * handling Neo4j 5.x syntax requirements (WITH between CREATE/MATCH).
 */

import * as fs from "node:fs";
import * as path from "node:path";
import neo4j, { type Driver, type Session } from "neo4j-driver";

// =============================================================================
// CONFIGURATION
// =============================================================================

const NEO4J_URI = process.env.NEO4J_URI ?? "bolt://localhost:7687";
const NEO4J_USER = process.env.NEO4J_USER ?? "neo4j";
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD ?? "knowledge_graph_2024";
const CYPHER_FILE = process.argv[2] ?? "complete_graph_v2.cypher";

// =============================================================================
// CYPHER PARSING
// =============================================================================

function parseCypherStatements(content: string): string[] {
	// Remove single-line comments
	const lines = content.split("\n");
	const cleanedLines: string[] = [];

	for (const line of lines) {
		const trimmed = line.trim();
		// Skip comment lines
		if (trimmed.startsWith("//")) {
			continue;
		}
		// Remove inline comments (but be careful with URLs)
		const commentIndex = line.indexOf("//");
		if (commentIndex > 0) {
			// Only remove if it's not part of a URL (http:// or https://)
			const beforeComment = line.substring(0, commentIndex);
			if (!beforeComment.includes("http:") && !beforeComment.includes("https:")) {
				cleanedLines.push(beforeComment);
				continue;
			}
		}
		cleanedLines.push(line);
	}

	const cleaned = cleanedLines.join("\n");

	// Split by semicolons, handling multi-line statements
	const statements: string[] = [];
	let current = "";
	let inString = false;
	let stringChar = "";

	for (let i = 0; i < cleaned.length; i++) {
		const char = cleaned[i];
		const prevChar = i > 0 ? cleaned[i - 1] : "";

		// Track string state
		if ((char === '"' || char === "'") && prevChar !== "\\") {
			if (!inString) {
				inString = true;
				stringChar = char;
			} else if (char === stringChar) {
				inString = false;
			}
		}

		// Split on semicolon if not in string
		if (char === ";" && !inString) {
			const stmt = current.trim();
			if (stmt.length > 0) {
				statements.push(stmt);
			}
			current = "";
		} else {
			current += char;
		}
	}

	// Add final statement if any
	const finalStmt = current.trim();
	if (finalStmt.length > 0) {
		statements.push(finalStmt);
	}

	return statements.filter((s) => s.length > 0);
}

// =============================================================================
// EXECUTION
// =============================================================================

async function clearDatabase(session: Session): Promise<void> {
	console.log("🗑️  Clearing existing data...");
	await session.run("MATCH (n) DETACH DELETE n");
	console.log("✅ Database cleared\n");
}

async function executeStatement(
	session: Session,
	statement: string,
): Promise<{ success: boolean; error?: string }> {
	try {
		await session.run(statement);
		return { success: true };
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		return { success: false, error: message };
	}
}

async function loadGraph(driver: Driver, statements: string[]): Promise<void> {
	const session = driver.session();

	try {
		await clearDatabase(session);

		console.log(`📦 Loading ${statements.length} statements...\n`);

		let successCount = 0;
		let errorCount = 0;
		const errors: Array<{ index: number; statement: string; error: string }> = [];

		for (let i = 0; i < statements.length; i++) {
			const statement = statements[i];
			const progress = Math.floor(((i + 1) / statements.length) * 100);

			// Show progress every 100 statements
			if ((i + 1) % 100 === 0 || i === statements.length - 1) {
				process.stdout.write(
					`\r   Progress: ${i + 1}/${statements.length} (${progress}%) - ✅ ${successCount} | ❌ ${errorCount}`,
				);
			}

			const result = await executeStatement(session, statement);

			if (result.success) {
				successCount++;
			} else {
				errorCount++;
				// Only store first 10 errors for reporting
				if (errors.length < 10) {
					errors.push({
						index: i,
						statement: statement.substring(0, 200) + (statement.length > 200 ? "..." : ""),
						error: result.error ?? "Unknown error",
					});
				}
			}
		}

		console.log("\n\n");
		console.log("=".repeat(60));
		console.log("  LOAD COMPLETE");
		console.log("=".repeat(60));
		console.log(`   ✅ Successful: ${successCount}`);
		console.log(`   ❌ Failed: ${errorCount}`);

		if (errors.length > 0) {
			console.log("\n⚠️  First few errors:");
			for (const err of errors.slice(0, 5)) {
				console.log(`\n   Statement #${err.index + 1}:`);
				console.log(`   ${err.statement}`);
				console.log(`   Error: ${err.error.substring(0, 150)}`);
			}
		}

		// Verify load
		const nodeCount = await session.run("MATCH (n) RETURN count(n) as count");
		const relCount = await session.run("MATCH ()-[r]->() RETURN count(r) as count");

		console.log("\n");
		console.log("=".repeat(60));
		console.log("  DATABASE STATISTICS");
		console.log("=".repeat(60));
		console.log(`   📊 Total nodes: ${nodeCount.records[0]?.get("count").toNumber()}`);
		console.log(`   🔗 Total relationships: ${relCount.records[0]?.get("count").toNumber()}`);
		console.log("");
	} finally {
		await session.close();
	}
}

// =============================================================================
// MAIN
// =============================================================================

async function main(): Promise<void> {
	console.log("=".repeat(60));
	console.log("  KNOWLEDGE GRAPH LOADER");
	console.log("=".repeat(60));
	console.log(`   📡 Neo4j: ${NEO4J_URI}`);
	console.log(`   📄 File: ${CYPHER_FILE}`);
	console.log("");

	// Check file exists
	const filePath = path.resolve(process.cwd(), CYPHER_FILE);
	if (!fs.existsSync(filePath)) {
		console.error(`❌ File not found: ${filePath}`);
		process.exit(1);
	}

	// Read and parse file
	console.log("📖 Reading Cypher file...");
	const content = fs.readFileSync(filePath, "utf-8");
	const statements = parseCypherStatements(content);
	console.log(`   Found ${statements.length} statements\n`);

	// Connect to Neo4j
	console.log("🔌 Connecting to Neo4j...");
	const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));

	try {
		await driver.verifyConnectivity();
		console.log("✅ Connected!\n");

		await loadGraph(driver, statements);

		console.log("🎉 Graph loaded successfully!");
		console.log("");
		console.log("Next steps:");
		console.log("   1. Open Neo4j Browser: http://localhost:7474");
		console.log("   2. Generate report: pnpm report:research");
		console.log("");
	} catch (error) {
		if (error instanceof Error) {
			console.error(`\n❌ Error: ${error.message}`);
		}
		process.exit(1);
	} finally {
		await driver.close();
	}
}

main();
