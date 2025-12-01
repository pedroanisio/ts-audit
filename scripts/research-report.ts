/**
 * Research Knowledge Graph Report Generator
 *
 * Generates an academic-style HTML report from Neo4j knowledge graph data
 * covering mathematical foundations, theories, and cross-standard requirements.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import neo4j, { type Driver, type Session, type Record as Neo4jRecord } from "neo4j-driver";

// =============================================================================
// CONFIGURATION
// =============================================================================

const NEO4J_URI = process.env.NEO4J_URI ?? "bolt://localhost:7687";
const NEO4J_USER = process.env.NEO4J_USER ?? "neo4j";
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD ?? "knowledge_graph_2024";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface Framework {
	name: string;
	abbreviation: string;
	description: string;
	complexity?: string;
	key_operations?: string[];
	application?: string;
}

interface Paper {
	title: string;
	venue?: string;
	authors?: string;
	contribution?: string;
	topic?: string;
	year?: number;
}

interface Reference {
	title: string;
	authors: string;
	year: number;
	venue?: string;
	publisher?: string;
	significance?: string;
	volume?: string;
	pages?: string;
}

interface Concept {
	name: string;
	notation?: string;
	definition: string;
	framework: string;
}

interface Hypothesis {
	id: string;
	name?: string;
	formal_statement?: string;
	category?: string;
	status?: string;
}

interface ResearchThread {
	id: string;
	name: string;
	description?: string;
	status?: string;
	core_question?: string;
}

interface ResearchDirection {
	name: string;
	category?: string;
	description?: string;
}

interface Definition {
	name: string;
	number?: number;
	notation?: string;
	formal?: string;
	theory?: string;
	note?: string;
}

interface Theorem {
	name: string;
	number?: number;
	statement?: string;
	proof_sketch?: string;
	theory?: string;
}

interface ResearchGroup {
	name: string;
	focus?: string;
	domain?: string;
	key_researchers?: string[];
}

interface Standard {
	name: string;
	full_name?: string;
	domain?: string;
	description?: string;
}

interface Tool {
	name: string;
	description?: string;
	type?: string;
	url?: string;
}

interface ExpertQuote {
	expert: string;
	quote: string;
	credentials?: string;
	source?: string;
}

interface TheoreticalBarrier {
	id: string;
	name?: string;
	description?: string;
	type?: string;
}

interface AchievableCapability {
	id: string;
	name?: string;
	description?: string;
}

interface GraphStats {
	nodeCount: number;
	relationshipCount: number;
	nodeLabels: string[];
	relationshipTypes: string[];
}

interface ResearchData {
	stats: GraphStats;
	frameworks: Framework[];
	papers: Paper[];
	references: Reference[];
	concepts: Concept[];
	hypotheses: Hypothesis[];
	threads: ResearchThread[];
	directions: ResearchDirection[];
	definitions: Definition[];
	theorems: Theorem[];
	groups: ResearchGroup[];
	standards: Standard[];
	tools: Tool[];
	quotes: ExpertQuote[];
	barriers: TheoreticalBarrier[];
	capabilities: AchievableCapability[];
	conceptsByFramework: Map<string, Concept[]>;
	papersByTopic: Map<string, Paper[]>;
}

// =============================================================================
// NEO4J QUERIES
// =============================================================================

async function getGraphStats(session: Session): Promise<GraphStats> {
	const nodeCountResult = await session.run("MATCH (n) RETURN count(n) as count");
	const relCountResult = await session.run("MATCH ()-[r]->() RETURN count(r) as count");
	const labelsResult = await session.run(
		"CALL db.labels() YIELD label RETURN collect(label) as labels",
	);
	const typesResult = await session.run(
		"CALL db.relationshipTypes() YIELD relationshipType RETURN collect(relationshipType) as types",
	);

	return {
		nodeCount: nodeCountResult.records[0]?.get("count").toNumber() ?? 0,
		relationshipCount: relCountResult.records[0]?.get("count").toNumber() ?? 0,
		nodeLabels: labelsResult.records[0]?.get("labels") ?? [],
		relationshipTypes: typesResult.records[0]?.get("types") ?? [],
	};
}

async function getFrameworks(session: Session): Promise<Framework[]> {
	const result = await session.run(`
		MATCH (f:Framework)
		RETURN f.name as name, f.abbreviation as abbreviation, 
		       f.description as description, f.complexity as complexity,
		       f.key_operations as key_operations, f.application as application
		ORDER BY f.name
	`);
	return result.records.map((r: Neo4jRecord) => ({
		name: r.get("name"),
		abbreviation: r.get("abbreviation"),
		description: r.get("description"),
		complexity: r.get("complexity"),
		key_operations: r.get("key_operations"),
		application: r.get("application"),
	}));
}

async function getPapers(session: Session): Promise<Paper[]> {
	const result = await session.run(`
		MATCH (p:Paper)
		RETURN p.title as title, p.venue as venue, p.authors as authors,
		       p.contribution as contribution, p.topic as topic, p.year as year
		ORDER BY p.topic, p.title
	`);
	return result.records.map((r: Neo4jRecord) => ({
		title: r.get("title"),
		venue: r.get("venue"),
		authors: r.get("authors"),
		contribution: r.get("contribution"),
		topic: r.get("topic"),
		year: r.get("year")?.toNumber?.() ?? r.get("year"),
	}));
}

async function getReferences(session: Session): Promise<Reference[]> {
	const result = await session.run(`
		MATCH (r:Reference)
		RETURN r.title as title, r.authors as authors, r.year as year,
		       r.venue as venue, r.publisher as publisher, r.significance as significance,
		       r.volume as volume, r.pages as pages
		ORDER BY r.authors, r.year
	`);
	return result.records.map((r: Neo4jRecord) => ({
		title: r.get("title"),
		authors: r.get("authors"),
		year: r.get("year")?.toNumber?.() ?? r.get("year"),
		venue: r.get("venue"),
		publisher: r.get("publisher"),
		significance: r.get("significance"),
		volume: r.get("volume"),
		pages: r.get("pages"),
	}));
}

async function getConcepts(session: Session): Promise<Concept[]> {
	const result = await session.run(`
		MATCH (c:Concept)
		RETURN c.name as name, c.notation as notation, 
		       c.definition as definition, c.framework as framework
		ORDER BY c.framework, c.name
	`);
	return result.records.map((r: Neo4jRecord) => ({
		name: r.get("name"),
		notation: r.get("notation"),
		definition: r.get("definition"),
		framework: r.get("framework"),
	}));
}

async function getHypotheses(session: Session): Promise<Hypothesis[]> {
	const result = await session.run(`
		MATCH (h:Hypothesis)
		RETURN h.id as id, h.name as name, h.formal_statement as formal_statement,
		       h.category as category, h.status as status
		ORDER BY h.id
	`);
	const ukcResult = await session.run(`
		MATCH (h:UKCHypothesis)
		RETURN h.id as id, h.name as name, h.formal_statement as formal_statement,
		       h.category as category, h.status as status
		ORDER BY h.id
	`);

	const hypotheses = result.records.map((r: Neo4jRecord) => ({
		id: r.get("id"),
		name: r.get("name"),
		formal_statement: r.get("formal_statement"),
		category: r.get("category"),
		status: r.get("status"),
	}));

	const ukcHypotheses = ukcResult.records.map((r: Neo4jRecord) => ({
		id: r.get("id"),
		name: r.get("name"),
		formal_statement: r.get("formal_statement"),
		category: r.get("category"),
		status: r.get("status"),
	}));

	return [...hypotheses, ...ukcHypotheses];
}

async function getResearchThreads(session: Session): Promise<ResearchThread[]> {
	const result = await session.run(`
		MATCH (t:ResearchThread)
		RETURN t.id as id, t.name as name, t.description as description, 
		       t.status as status, t.core_question as core_question
		ORDER BY t.id
	`);
	return result.records.map((r: Neo4jRecord) => ({
		id: r.get("id"),
		name: r.get("name"),
		description: r.get("description"),
		status: r.get("status"),
		core_question: r.get("core_question"),
	}));
}

async function getResearchDirections(session: Session): Promise<ResearchDirection[]> {
	const result = await session.run(`
		MATCH (d:ResearchDirection)
		RETURN d.name as name, d.category as category, d.description as description
		ORDER BY d.category, d.name
	`);
	return result.records.map((r: Neo4jRecord) => ({
		name: r.get("name"),
		category: r.get("category"),
		description: r.get("description"),
	}));
}

async function getDefinitions(session: Session): Promise<Definition[]> {
	const result = await session.run(`
		MATCH (d:Definition)
		RETURN d.name as name, d.number as number, d.notation as notation,
		       d.formal as formal, d.theory as theory, d.note as note
		ORDER BY d.theory, d.number
	`);
	return result.records.map((r: Neo4jRecord) => ({
		name: r.get("name"),
		number: r.get("number")?.toNumber?.() ?? r.get("number"),
		notation: r.get("notation"),
		formal: r.get("formal"),
		theory: r.get("theory"),
		note: r.get("note"),
	}));
}

async function getTheorems(session: Session): Promise<Theorem[]> {
	const result = await session.run(`
		MATCH (t:Theorem)
		RETURN t.name as name, t.number as number, t.statement as statement,
		       t.proof_sketch as proof_sketch, t.theory as theory
		ORDER BY t.theory, t.number
	`);
	return result.records.map((r: Neo4jRecord) => ({
		name: r.get("name"),
		number: r.get("number")?.toNumber?.() ?? r.get("number"),
		statement: r.get("statement"),
		proof_sketch: r.get("proof_sketch"),
		theory: r.get("theory"),
	}));
}

async function getResearchGroups(session: Session): Promise<ResearchGroup[]> {
	const result = await session.run(`
		MATCH (g:ResearchGroup)
		RETURN g.name as name, g.focus as focus, g.domain as domain,
		       g.key_researchers as key_researchers
		ORDER BY g.domain, g.name
	`);
	return result.records.map((r: Neo4jRecord) => ({
		name: r.get("name"),
		focus: r.get("focus"),
		domain: r.get("domain"),
		key_researchers: r.get("key_researchers"),
	}));
}

async function getStandards(session: Session): Promise<Standard[]> {
	const result = await session.run(`
		MATCH (s:Standard)
		RETURN s.name as name, s.full_name as full_name, 
		       s.domain as domain, s.description as description
		ORDER BY s.name
	`);
	return result.records.map((r: Neo4jRecord) => ({
		name: r.get("name"),
		full_name: r.get("full_name"),
		domain: r.get("domain"),
		description: r.get("description"),
	}));
}

async function getTools(session: Session): Promise<Tool[]> {
	const result = await session.run(`
		MATCH (t:Tool)
		RETURN t.name as name, t.description as description, 
		       t.type as type, t.url as url
		ORDER BY t.name
	`);
	const verificationTools = await session.run(`
		MATCH (t:VerificationTool)
		RETURN t.name as name, t.description as description, 
		       t.type as type, t.url as url
		ORDER BY t.name
	`);

	const tools = result.records.map((r: Neo4jRecord) => ({
		name: r.get("name"),
		description: r.get("description"),
		type: r.get("type"),
		url: r.get("url"),
	}));

	const vTools = verificationTools.records.map((r: Neo4jRecord) => ({
		name: r.get("name"),
		description: r.get("description"),
		type: r.get("type") ?? "Verification",
		url: r.get("url"),
	}));

	return [...tools, ...vTools];
}

async function getExpertQuotes(session: Session): Promise<ExpertQuote[]> {
	const result = await session.run(`
		MATCH (q:ExpertQuote)
		RETURN q.expert as expert, q.quote as quote, 
		       q.credentials as credentials, q.source as source
		ORDER BY q.expert
	`);
	return result.records.map((r: Neo4jRecord) => ({
		expert: r.get("expert"),
		quote: r.get("quote"),
		credentials: r.get("credentials"),
		source: r.get("source"),
	}));
}

async function getTheoreticalBarriers(session: Session): Promise<TheoreticalBarrier[]> {
	const result = await session.run(`
		MATCH (b:TheoreticalBarrier)
		WHERE b.id IS NOT NULL
		RETURN b.id as id, b.name as name, b.description as description, b.type as type
		ORDER BY b.id
	`);
	return result.records.map((r: Neo4jRecord) => ({
		id: r.get("id"),
		name: r.get("name"),
		description: r.get("description"),
		type: r.get("type"),
	}));
}

async function getAchievableCapabilities(session: Session): Promise<AchievableCapability[]> {
	const result = await session.run(`
		MATCH (c:AchievableCapability)
		WHERE c.id IS NOT NULL
		RETURN c.id as id, c.name as name, c.description as description
		ORDER BY c.id
	`);
	return result.records.map((r: Neo4jRecord) => ({
		id: r.get("id"),
		name: r.get("name"),
		description: r.get("description"),
	}));
}

// =============================================================================
// DATA FETCHING
// =============================================================================

async function fetchAllData(driver: Driver): Promise<ResearchData> {
	const session = driver.session();

	try {
		console.log("📊 Fetching graph statistics...");
		const stats = await getGraphStats(session);

		console.log("🔬 Fetching frameworks...");
		const frameworks = await getFrameworks(session);

		console.log("📄 Fetching papers...");
		const papers = await getPapers(session);

		console.log("📚 Fetching references...");
		const references = await getReferences(session);

		console.log("💡 Fetching concepts...");
		const concepts = await getConcepts(session);

		console.log("🧪 Fetching hypotheses...");
		const hypotheses = await getHypotheses(session);

		console.log("🧵 Fetching research threads...");
		const threads = await getResearchThreads(session);

		console.log("🧭 Fetching research directions...");
		const directions = await getResearchDirections(session);

		console.log("📐 Fetching definitions...");
		const definitions = await getDefinitions(session);

		console.log("🎯 Fetching theorems...");
		const theorems = await getTheorems(session);

		console.log("👥 Fetching research groups...");
		const groups = await getResearchGroups(session);

		console.log("📋 Fetching standards...");
		const standards = await getStandards(session);

		console.log("🛠️ Fetching tools...");
		const tools = await getTools(session);

		console.log("💬 Fetching expert quotes...");
		const quotes = await getExpertQuotes(session);

		console.log("🚧 Fetching theoretical barriers...");
		const barriers = await getTheoreticalBarriers(session);

		console.log("✅ Fetching achievable capabilities...");
		const capabilities = await getAchievableCapabilities(session);

		// Group concepts by framework
		const conceptsByFramework = new Map<string, Concept[]>();
		for (const concept of concepts) {
			const fw = concept.framework ?? "Other";
			if (!conceptsByFramework.has(fw)) {
				conceptsByFramework.set(fw, []);
			}
			conceptsByFramework.get(fw)?.push(concept);
		}

		// Group papers by topic
		const papersByTopic = new Map<string, Paper[]>();
		for (const paper of papers) {
			const topic = paper.topic ?? "Other";
			if (!papersByTopic.has(topic)) {
				papersByTopic.set(topic, []);
			}
			papersByTopic.get(topic)?.push(paper);
		}

		return {
			stats,
			frameworks,
			papers,
			references,
			concepts,
			hypotheses,
			threads,
			directions,
			definitions,
			theorems,
			groups,
			standards,
			tools,
			quotes,
			barriers,
			capabilities,
			conceptsByFramework,
			papersByTopic,
		};
	} finally {
		await session.close();
	}
}

// =============================================================================
// HTML GENERATION
// =============================================================================

function escapeHtml(text: string | null | undefined): string {
	if (!text) return "";
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function formatCitation(ref: Reference, index: number): string {
	const parts: string[] = [];
	if (ref.authors) parts.push(escapeHtml(ref.authors));
	if (ref.year) parts.push(`(${ref.year})`);
	if (ref.title) parts.push(`<em>${escapeHtml(ref.title)}</em>`);
	if (ref.venue) parts.push(escapeHtml(ref.venue));
	if (ref.publisher) parts.push(escapeHtml(ref.publisher));
	if (ref.volume) parts.push(`Vol. ${escapeHtml(ref.volume)}`);
	if (ref.pages) parts.push(`pp. ${escapeHtml(ref.pages)}`);
	return `<span class="ref-number">[${index + 1}]</span> ${parts.join(". ")}.`;
}

function generateHTML(data: ResearchData): string {
	const uniqueQuotes = data.quotes.filter(
		(q, i, arr) => arr.findIndex((x) => x.quote === q.quote) === i,
	);

	// Deduplicate references by title
	const uniqueRefs = data.references.filter(
		(r, i, arr) => arr.findIndex((x) => x.title === r.title) === i,
	);

	const today = new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	// Framework abbreviation mapping for full names
	const frameworkNames: Record<string, string> = {
		FCA: "Formal Concept Analysis",
		DL: "Description Logics",
		IT: "Institution Theory",
		GC: "Galois Connections",
		FM: "Feature Models",
		CT: "Category Theory",
		AGM: "AGM Belief Revision",
		DEL: "Dynamic Epistemic Logic",
		SCM: "Structural Causal Models",
		Kripke: "Kripke Semantics",
		FRRP: "Formal Request-Response Protocol",
		"Curry-Howard": "Curry-Howard Correspondence",
	};

	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mathematical Foundations for Cross-Standard Requirements Decomposition</title>
    
    <!-- KaTeX for math rendering -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
    
    <!-- Academic Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Code+Pro:wght@400;500&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --text-color: #1a1a1a;
            --text-secondary: #4a4a4a;
            --text-muted: #6b6b6b;
            --bg-color: #ffffff;
            --bg-secondary: #f8f9fa;
            --bg-highlight: #fff9e6;
            --accent-color: #1a5f7a;
            --accent-secondary: #2c3e50;
            --border-color: #e0e0e0;
            --link-color: #1a5f7a;
            --theorem-bg: #f0f7fb;
            --definition-bg: #f5f5f5;
            --proof-color: #666;
        }
        
        @media (prefers-color-scheme: dark) {
            :root {
                --text-color: #e8e8e8;
                --text-secondary: #b0b0b0;
                --text-muted: #888;
                --bg-color: #1a1a1a;
                --bg-secondary: #242424;
                --bg-highlight: #2a2520;
                --accent-color: #6db3d0;
                --accent-secondary: #8fa8bd;
                --border-color: #3a3a3a;
                --link-color: #6db3d0;
                --theorem-bg: #1e2a30;
                --definition-bg: #262626;
                --proof-color: #999;
            }
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        html {
            font-size: 18px;
        }
        
        body {
            font-family: 'Crimson Pro', Georgia, 'Times New Roman', serif;
            background: var(--bg-color);
            color: var(--text-color);
            line-height: 1.8;
            max-width: 52rem;
            margin: 0 auto;
            padding: 3rem 2rem;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
        }
        
        /* Title Page */
        .title-page {
            text-align: center;
            padding: 4rem 0;
            margin-bottom: 3rem;
            border-bottom: 2px solid var(--border-color);
        }
        
        .title-page h1 {
            font-size: 2rem;
            font-weight: 600;
            line-height: 1.3;
            margin-bottom: 1.5rem;
            color: var(--text-color);
        }
        
        .title-page .subtitle {
            font-size: 1.25rem;
            font-style: italic;
            color: var(--text-secondary);
            margin-bottom: 2rem;
        }
        
        .title-page .meta {
            font-size: 0.95rem;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
        }
        
        .title-page .institution {
            font-variant: small-caps;
            letter-spacing: 0.05em;
        }
        
        /* Abstract */
        .abstract {
            background: var(--bg-secondary);
            padding: 1.5rem 2rem;
            margin: 2rem 0 3rem;
            border-left: 4px solid var(--accent-color);
        }
        
        .abstract h2 {
            font-size: 1rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 1rem;
            color: var(--accent-color);
        }
        
        .abstract p {
            font-size: 0.95rem;
            text-align: justify;
            hyphens: auto;
        }
        
        .keywords {
            margin-top: 1rem;
            font-size: 0.9rem;
        }
        
        .keywords strong {
            font-weight: 600;
        }
        
        /* Table of Contents */
        .toc {
            margin: 2rem 0 3rem;
            padding: 1.5rem 2rem;
            background: var(--bg-secondary);
        }
        
        .toc h2 {
            font-size: 1.1rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .toc ol {
            list-style: none;
            counter-reset: toc-counter;
        }
        
        .toc > ol > li {
            counter-increment: toc-counter;
            margin: 0.5rem 0;
        }
        
        .toc > ol > li::before {
            content: counter(toc-counter) ".";
            font-weight: 600;
            margin-right: 0.5rem;
            color: var(--accent-color);
        }
        
        .toc a {
            color: var(--text-color);
            text-decoration: none;
            border-bottom: 1px dotted var(--border-color);
        }
        
        .toc a:hover {
            color: var(--accent-color);
        }
        
        .toc .toc-sub {
            margin-left: 1.5rem;
            font-size: 0.95rem;
        }
        
        /* Sections */
        section {
            margin: 3rem 0;
        }
        
        h2 {
            font-size: 1.4rem;
            font-weight: 600;
            color: var(--text-color);
            margin: 2.5rem 0 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        h2 .section-number {
            color: var(--accent-color);
            margin-right: 0.5rem;
        }
        
        h3 {
            font-size: 1.15rem;
            font-weight: 600;
            color: var(--text-secondary);
            margin: 2rem 0 1rem;
        }
        
        h3 .section-number {
            color: var(--accent-color);
            margin-right: 0.4rem;
        }
        
        h4 {
            font-size: 1rem;
            font-weight: 600;
            font-style: italic;
            margin: 1.5rem 0 0.75rem;
        }
        
        p {
            margin: 1rem 0;
            text-align: justify;
            hyphens: auto;
        }
        
        /* Definition Environment */
        .definition {
            background: var(--definition-bg);
            padding: 1.25rem 1.5rem;
            margin: 1.5rem 0;
            border-left: 3px solid var(--accent-secondary);
        }
        
        .definition-header {
            font-weight: 600;
            color: var(--accent-secondary);
            margin-bottom: 0.5rem;
        }
        
        .definition-header .def-name {
            font-style: italic;
            font-weight: 500;
        }
        
        /* Theorem Environment */
        .theorem {
            background: var(--theorem-bg);
            padding: 1.25rem 1.5rem;
            margin: 1.5rem 0;
            border-left: 3px solid var(--accent-color);
        }
        
        .theorem-header {
            font-weight: 600;
            color: var(--accent-color);
            margin-bottom: 0.5rem;
        }
        
        .theorem-header .thm-name {
            font-style: italic;
            font-weight: 500;
        }
        
        .proof {
            margin-top: 1rem;
            padding-top: 0.5rem;
            border-top: 1px dashed var(--border-color);
        }
        
        .proof-header {
            font-style: italic;
            color: var(--proof-color);
        }
        
        .qed {
            float: right;
            font-size: 0.9rem;
        }
        
        /* Hypothesis */
        .hypothesis {
            background: var(--bg-highlight);
            padding: 1rem 1.5rem;
            margin: 1rem 0;
            border-left: 3px solid #c9a227;
        }
        
        .hypothesis-header {
            font-weight: 600;
            color: #8a6d1b;
        }
        
        /* Math */
        .math-display {
            margin: 1.5rem 0;
            padding: 1rem;
            overflow-x: auto;
            text-align: center;
        }
        
        code {
            font-family: 'Source Code Pro', 'Consolas', monospace;
            font-size: 0.85em;
            background: var(--bg-secondary);
            padding: 0.15rem 0.4rem;
            border-radius: 3px;
        }
        
        /* Tables */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.95rem;
        }
        
        caption {
            font-size: 0.9rem;
            font-weight: 600;
            text-align: left;
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
        }
        
        th, td {
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
            vertical-align: top;
        }
        
        th {
            font-weight: 600;
            font-variant: small-caps;
            letter-spacing: 0.05em;
            background: var(--bg-secondary);
        }
        
        tr:hover td {
            background: var(--bg-secondary);
        }
        
        /* Figures */
        figure {
            margin: 2rem 0;
            text-align: center;
        }
        
        figcaption {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-top: 0.75rem;
        }
        
        figcaption strong {
            font-weight: 600;
        }
        
        /* Lists */
        ul, ol {
            margin: 1rem 0 1rem 1.5rem;
        }
        
        li {
            margin: 0.4rem 0;
        }
        
        /* Blockquote */
        blockquote {
            margin: 1.5rem 0 1.5rem 2rem;
            padding-left: 1.5rem;
            border-left: 3px solid var(--border-color);
            color: var(--text-secondary);
            font-style: italic;
        }
        
        blockquote cite {
            display: block;
            margin-top: 0.75rem;
            font-style: normal;
            font-size: 0.9rem;
            color: var(--text-muted);
        }
        
        /* References */
        .references {
            font-size: 0.9rem;
        }
        
        .references ol {
            list-style: none;
            margin-left: 0;
            padding-left: 0;
        }
        
        .references li {
            margin: 0.75rem 0;
            padding-left: 2.5rem;
            text-indent: -2.5rem;
        }
        
        .ref-number {
            font-weight: 600;
            color: var(--accent-color);
            margin-right: 0.5rem;
        }
        
        /* Links */
        a {
            color: var(--link-color);
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        /* Appendix */
        .appendix h2 {
            color: var(--text-secondary);
        }
        
        .appendix h2::before {
            content: "Appendix ";
        }
        
        /* Framework cards in appendix */
        .framework-entry {
            margin: 1.5rem 0;
            padding: 1rem 1.5rem;
            background: var(--bg-secondary);
            border-radius: 4px;
        }
        
        .framework-entry h4 {
            margin-top: 0;
            color: var(--accent-color);
        }
        
        .framework-meta {
            font-size: 0.9rem;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
        }
        
        /* Print styles */
        @media print {
            body {
                font-size: 11pt;
                max-width: none;
                padding: 0;
            }
            
            .title-page {
                page-break-after: always;
            }
            
            section {
                page-break-inside: avoid;
            }
            
            .theorem, .definition, .hypothesis {
                break-inside: avoid;
            }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            html {
                font-size: 16px;
            }
            
            body {
                padding: 1.5rem 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Title Page -->
    <header class="title-page">
        <h1>Mathematical Foundations for Cross-Standard Requirements Decomposition</h1>
        <p class="subtitle">A Unified Knowledge Graph Approach to Safety Integrity Level Analysis</p>
        <p class="meta institution">Research Knowledge Graph Report</p>
        <p class="meta">${today}</p>
        <p class="meta" style="margin-top: 1.5rem; font-size: 0.85rem;">
            Knowledge Graph Statistics: ${data.stats.nodeCount.toLocaleString()} nodes, 
            ${data.stats.relationshipCount.toLocaleString()} relationships
        </p>
    </header>
    
    <!-- Abstract -->
    <div class="abstract">
        <h2>Abstract</h2>
        <p>
            This report presents a comprehensive knowledge graph synthesizing mathematical foundations 
            for cross-standard requirements decomposition and AI safety verification. We integrate 
            ${data.frameworks.length} mathematical frameworks—including Formal Concept Analysis, 
            Description Logics, Institution Theory, and Category Theory—to establish rigorous 
            foundations for comparing safety integrity levels across industrial standards (IEC 61508, 
            ISO 26262, DO-178C). The graph captures ${data.concepts.length} formal concepts, 
            ${data.definitions.length} definitions, ${data.theorems.length} theorems, and 
            ${data.hypotheses.length} research hypotheses. We document ${data.papers.length} 
            relevant papers and ${uniqueRefs.length} foundational references, identifying 
            ${data.barriers.length} theoretical barriers and ${data.capabilities.length} achievable 
            capabilities for AI-assisted safety engineering. The unified lattice-theoretic approach 
            enables principled cross-standard comparison while acknowledging fundamental limitations 
            of probabilistic AI systems in safety-critical domains.
        </p>
        <p class="keywords">
            <strong>Keywords:</strong> Formal Concept Analysis, Lattice Theory, Safety Integrity Levels, 
            Cross-Standard Mapping, Knowledge Graphs, AI Safety, Neuro-Symbolic AI
        </p>
    </div>
    
    <!-- Table of Contents -->
    <nav class="toc">
        <h2>Contents</h2>
        <ol>
            <li><a href="#introduction">Introduction</a></li>
            <li><a href="#frameworks">Mathematical Frameworks</a></li>
            <li><a href="#formal-theory">Formal Theory</a>
                <ol class="toc-sub">
                    <li><a href="#definitions">Definitions</a></li>
                    <li><a href="#theorems">Theorems</a></li>
                </ol>
            </li>
            <li><a href="#concepts">Key Concepts</a></li>
            <li><a href="#hypotheses">Research Hypotheses</a></li>
            <li><a href="#threads">Research Threads</a></li>
            <li><a href="#barriers">Theoretical Landscape</a></li>
            <li><a href="#literature">Literature Survey</a></li>
            <li><a href="#standards">Safety Standards</a></li>
            <li><a href="#tools">Tools and Systems</a></li>
            <li><a href="#references">References</a></li>
            <li><a href="#appendix-groups">Appendix A: Research Groups</a></li>
        </ol>
    </nav>
    
    <!-- 1. Introduction -->
    <section id="introduction">
        <h2><span class="section-number">1.</span> Introduction</h2>
        
        <p>
            The proliferation of safety-critical systems across automotive, aerospace, medical, and 
            industrial domains has created an urgent need for principled methods to compare and 
            translate safety requirements across different regulatory frameworks. Each domain has 
            developed its own safety integrity level taxonomy—SIL (IEC 61508), ASIL (ISO 26262), 
            DAL (DO-178C)—reflecting domain-specific concerns about failure modes, operational 
            environments, and acceptable risk levels.
        </p>
        
        <p>
            This report synthesizes research on mathematical foundations for cross-standard 
            requirements analysis, organizing knowledge in a graph structure that captures 
            formal relationships between concepts, theories, and applications. We draw upon 
            lattice theory, formal concept analysis, and category theory to establish rigorous 
            foundations for integrity level comparison.
        </p>
        
        ${
					data.threads.length > 0
						? `
        <p>
            The research is organized around ${data.threads.length} primary investigation threads:
        </p>
        <ol>
            ${data.threads
							.map(
								(t) => `
                <li><strong>${escapeHtml(t.name)}</strong>${t.core_question ? `: ${escapeHtml(t.core_question)}` : ""}</li>
            `,
							)
							.join("")}
        </ol>
        `
						: ""
				}
        
        ${
					uniqueQuotes.length > 0
						? `
        <p>
            The challenge of AI safety in this context is aptly summarized by leading researchers:
        </p>
        <blockquote>
            "${escapeHtml(uniqueQuotes[0]?.quote)}"
            <cite>— ${escapeHtml(uniqueQuotes[0]?.expert)}${uniqueQuotes[0]?.credentials ? `, ${escapeHtml(uniqueQuotes[0].credentials)}` : ""}</cite>
        </blockquote>
        `
						: ""
				}
    </section>
    
    <!-- 2. Mathematical Frameworks -->
    <section id="frameworks">
        <h2><span class="section-number">2.</span> Mathematical Frameworks</h2>
        
        <p>
            We employ ${data.frameworks.length} complementary mathematical frameworks to address 
            different aspects of requirements decomposition and cross-standard mapping. Each 
            framework provides specific capabilities while acknowledging inherent limitations.
        </p>
        
        ${data.frameworks
					.map(
						(fw, i) => `
        <h3><span class="section-number">2.${i + 1}.</span> ${escapeHtml(fw.name)} (${escapeHtml(fw.abbreviation)})</h3>
        <p>${escapeHtml(fw.description)}</p>
        ${fw.complexity ? `<p><strong>Complexity:</strong> ${escapeHtml(fw.complexity)}</p>` : ""}
        ${fw.application ? `<p><strong>Application:</strong> ${escapeHtml(fw.application)}</p>` : ""}
        ${
					fw.key_operations?.length
						? `
        <p><strong>Key Operations:</strong></p>
        <ul>
            ${fw.key_operations.map((op: string) => `<li>${escapeHtml(op)}</li>`).join("")}
        </ul>
        `
						: ""
				}
        `,
					)
					.join("")}
    </section>
    
    <!-- 3. Formal Theory -->
    <section id="formal-theory">
        <h2><span class="section-number">3.</span> Formal Theory</h2>
        
        <p>
            This section presents the formal definitions and theorems that constitute the 
            mathematical foundation of the integrity classification framework.
        </p>
        
        <h3 id="definitions"><span class="section-number">3.1.</span> Definitions</h3>
        
        ${data.definitions
					.map(
						(d) => `
        <div class="definition">
            <div class="definition-header">
                Definition ${d.number ?? ""}${d.name ? ` <span class="def-name">(${escapeHtml(d.name)})</span>` : ""}
                ${d.theory ? `<span style="float: right; font-weight: normal; font-size: 0.85rem; color: var(--text-muted);">[${escapeHtml(d.theory)}]</span>` : ""}
            </div>
            ${d.notation ? `<div class="math-display">$$${escapeHtml(d.notation)}$$</div>` : ""}
            <p>${escapeHtml(d.formal)}</p>
            ${d.note ? `<p><em>Note:</em> ${escapeHtml(d.note)}</p>` : ""}
        </div>
        `,
					)
					.join("")}
        
        <h3 id="theorems"><span class="section-number">3.2.</span> Theorems</h3>
        
        ${data.theorems
					.map(
						(t) => `
        <div class="theorem">
            <div class="theorem-header">
                Theorem ${t.number ?? ""}${t.name ? ` <span class="thm-name">(${escapeHtml(t.name)})</span>` : ""}
                ${t.theory ? `<span style="float: right; font-weight: normal; font-size: 0.85rem; color: var(--text-muted);">[${escapeHtml(t.theory)}]</span>` : ""}
            </div>
            ${t.statement ? `<p>${escapeHtml(t.statement)}</p>` : ""}
            ${
							t.proof_sketch
								? `
            <div class="proof">
                <span class="proof-header">Proof sketch.</span> ${escapeHtml(t.proof_sketch)} <span class="qed">□</span>
            </div>
            `
								: ""
						}
        </div>
        `,
					)
					.join("")}
    </section>
    
    <!-- 4. Key Concepts -->
    <section id="concepts">
        <h2><span class="section-number">4.</span> Key Concepts</h2>
        
        <p>
            The knowledge graph captures ${data.concepts.length} formal concepts organized by 
            mathematical framework. We present the core concepts from each framework below.
        </p>
        
        ${Array.from(data.conceptsByFramework.entries())
					.map(
						([fw, concepts], i) => `
        <h3><span class="section-number">4.${i + 1}.</span> ${frameworkNames[fw] ?? fw}</h3>
        
        <table>
            <caption>Table ${i + 1}: Concepts in ${frameworkNames[fw] ?? fw}</caption>
            <thead>
                <tr>
                    <th style="width: 25%;">Concept</th>
                    <th style="width: 25%;">Notation</th>
                    <th>Definition</th>
                </tr>
            </thead>
            <tbody>
                ${concepts
									.slice(0, 8)
									.map(
										(c) => `
                <tr>
                    <td><strong>${escapeHtml(c.name)}</strong></td>
                    <td><code>${escapeHtml(c.notation)}</code></td>
                    <td>${escapeHtml(c.definition)}</td>
                </tr>
                `,
									)
									.join("")}
            </tbody>
        </table>
        ${concepts.length > 8 ? `<p><em>And ${concepts.length - 8} additional concepts...</em></p>` : ""}
        `,
					)
					.join("")}
    </section>
    
    <!-- 5. Research Hypotheses -->
    <section id="hypotheses">
        <h2><span class="section-number">5.</span> Research Hypotheses</h2>
        
        <p>
            The following hypotheses guide ongoing research in cross-standard requirements 
            analysis and AI safety verification. Each hypothesis is formulated to be 
            empirically testable or formally provable.
        </p>
        
        ${data.hypotheses
					.map(
						(h) => `
        <div class="hypothesis">
            <div class="hypothesis-header">
                Hypothesis ${h.id}${h.name ? `: ${escapeHtml(h.name)}` : ""}
                ${h.category ? `<span style="float: right; font-weight: normal; font-size: 0.85rem;">[${escapeHtml(h.category)}]</span>` : ""}
            </div>
            ${h.formal_statement ? `<p>${escapeHtml(h.formal_statement)}</p>` : ""}
            ${h.status ? `<p><em>Status: ${escapeHtml(h.status)}</em></p>` : ""}
        </div>
        `,
					)
					.join("")}
    </section>
    
    <!-- 6. Research Threads -->
    <section id="threads">
        <h2><span class="section-number">6.</span> Research Threads and Directions</h2>
        
        ${data.threads
					.map(
						(t, i) => `
        <h3><span class="section-number">6.${i + 1}.</span> ${escapeHtml(t.name)}</h3>
        ${t.core_question ? `<p><strong>Core Question:</strong> ${escapeHtml(t.core_question)}</p>` : ""}
        ${t.description ? `<p>${escapeHtml(t.description)}</p>` : ""}
        ${t.status ? `<p><em>Status: ${escapeHtml(t.status)}</em></p>` : ""}
        `,
					)
					.join("")}
        
        ${
					data.directions.length > 0
						? `
        <h3><span class="section-number">6.${data.threads.length + 1}.</span> Future Research Directions</h3>
        <ul>
            ${data.directions
							.map(
								(d) => `
            <li><strong>${escapeHtml(d.name)}</strong>${d.category ? ` (${escapeHtml(d.category)})` : ""}${d.description ? `: ${escapeHtml(d.description)}` : ""}</li>
            `,
							)
							.join("")}
        </ul>
        `
						: ""
				}
    </section>
    
    <!-- 7. Theoretical Landscape -->
    <section id="barriers">
        <h2><span class="section-number">7.</span> Theoretical Landscape</h2>
        
        <p>
            Understanding the boundaries of what is theoretically achievable is essential for 
            setting realistic expectations and focusing research efforts productively.
        </p>
        
        ${
					data.barriers.length > 0
						? `
        <h3><span class="section-number">7.1.</span> Theoretical Barriers</h3>
        <p>
            We identify ${data.barriers.length} fundamental barriers that constrain what can 
            be achieved through formal methods and AI-assisted verification:
        </p>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Barrier</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${data.barriers
									.map(
										(b) => `
                <tr>
                    <td>${escapeHtml(b.id)}</td>
                    <td><strong>${escapeHtml(b.name)}</strong></td>
                    <td>${escapeHtml(b.type)}</td>
                    <td>${escapeHtml(b.description)}</td>
                </tr>
                `,
									)
									.join("")}
            </tbody>
        </table>
        `
						: ""
				}
        
        ${
					data.capabilities.length > 0
						? `
        <h3><span class="section-number">7.2.</span> Achievable Capabilities</h3>
        <p>
            Despite theoretical limitations, ${data.capabilities.length} capabilities remain 
            achievable through careful system design:
        </p>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Capability</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${data.capabilities
									.map(
										(c) => `
                <tr>
                    <td>${escapeHtml(c.id)}</td>
                    <td><strong>${escapeHtml(c.name)}</strong></td>
                    <td>${escapeHtml(c.description)}</td>
                </tr>
                `,
									)
									.join("")}
            </tbody>
        </table>
        `
						: ""
				}
    </section>
    
    <!-- 8. Literature Survey -->
    <section id="literature">
        <h2><span class="section-number">8.</span> Literature Survey</h2>
        
        <p>
            This section surveys ${data.papers.length} relevant papers organized by research topic. 
            The survey spans neuro-symbolic integration, ontology-grounded generation, constrained 
            decoding, hallucination detection, and AI safety verification.
        </p>
        
        ${Array.from(data.papersByTopic.entries())
					.map(
						([topic, papers], i) => `
        <h3><span class="section-number">8.${i + 1}.</span> ${escapeHtml(topic)}</h3>
        <table>
            <thead>
                <tr>
                    <th style="width: 35%;">Paper</th>
                    <th style="width: 15%;">Venue</th>
                    <th>Contribution</th>
                </tr>
            </thead>
            <tbody>
                ${papers
									.map(
										(p) => `
                <tr>
                    <td><em>${escapeHtml(p.title)}</em>${p.authors ? `<br><small>${escapeHtml(p.authors)}</small>` : ""}</td>
                    <td>${escapeHtml(p.venue)}</td>
                    <td>${escapeHtml(p.contribution)}</td>
                </tr>
                `,
									)
									.join("")}
            </tbody>
        </table>
        `,
					)
					.join("")}
    </section>
    
    <!-- 9. Safety Standards -->
    <section id="standards">
        <h2><span class="section-number">9.</span> Safety Standards</h2>
        
        <p>
            The knowledge graph covers ${data.standards.length} major safety standards across 
            industrial, automotive, aerospace, and medical domains:
        </p>
        
        <table>
            <thead>
                <tr>
                    <th>Standard</th>
                    <th>Full Name</th>
                    <th>Domain</th>
                </tr>
            </thead>
            <tbody>
                ${data.standards
									.map(
										(s) => `
                <tr>
                    <td><strong>${escapeHtml(s.name)}</strong></td>
                    <td>${escapeHtml(s.full_name)}</td>
                    <td>${escapeHtml(s.domain)}</td>
                </tr>
                `,
									)
									.join("")}
            </tbody>
        </table>
    </section>
    
    <!-- 10. Tools and Systems -->
    <section id="tools">
        <h2><span class="section-number">10.</span> Tools and Systems</h2>
        
        <p>
            The following ${data.tools.length} tools and systems are referenced in the knowledge 
            graph for requirements engineering, formal verification, and AI safety:
        </p>
        
        <table>
            <thead>
                <tr>
                    <th style="width: 20%;">Tool</th>
                    <th style="width: 15%;">Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${data.tools
									.slice(0, 25)
									.map(
										(t) => `
                <tr>
                    <td><strong>${escapeHtml(t.name)}</strong></td>
                    <td>${escapeHtml(t.type)}</td>
                    <td>${escapeHtml(t.description)}${t.url ? ` <a href="${escapeHtml(t.url)}" target="_blank">[link]</a>` : ""}</td>
                </tr>
                `,
									)
									.join("")}
            </tbody>
        </table>
        ${data.tools.length > 25 ? `<p><em>And ${data.tools.length - 25} additional tools...</em></p>` : ""}
    </section>
    
    <!-- 11. References -->
    <section id="references" class="references">
        <h2><span class="section-number">11.</span> References</h2>
        
        <ol>
            ${uniqueRefs
							.slice(0, 50)
							.map(
								(r, i) => `
            <li>${formatCitation(r, i)}</li>
            `,
							)
							.join("")}
        </ol>
        ${uniqueRefs.length > 50 ? `<p><em>And ${uniqueRefs.length - 50} additional references...</em></p>` : ""}
    </section>
    
    <!-- Appendix A: Research Groups -->
    <section id="appendix-groups" class="appendix">
        <h2>A: Research Groups</h2>
        
        <p>
            The following ${data.groups.length} research groups are actively contributing to 
            the fields covered by this knowledge graph:
        </p>
        
        ${data.groups
					.map(
						(g) => `
        <div class="framework-entry">
            <h4>${escapeHtml(g.name)}</h4>
            <div class="framework-meta">${escapeHtml(g.domain)}</div>
            ${g.focus ? `<p><strong>Focus:</strong> ${escapeHtml(g.focus)}</p>` : ""}
            ${g.key_researchers?.length ? `<p><strong>Key Researchers:</strong> ${g.key_researchers.map((r: string) => escapeHtml(r)).join(", ")}</p>` : ""}
        </div>
        `,
					)
					.join("")}
    </section>
    
    <footer style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border-color); text-align: center; color: var(--text-muted); font-size: 0.9rem;">
        <p>
            <em>This report was automatically generated from the research knowledge graph.</em>
        </p>
        <p style="margin-top: 0.5rem;">
            Graph: ${data.stats.nodeCount.toLocaleString()} nodes, ${data.stats.relationshipCount.toLocaleString()} relationships<br>
            ${data.stats.nodeLabels.length} node types, ${data.stats.relationshipTypes.length} relationship types
        </p>
        <p style="margin-top: 0.5rem;">${today}</p>
    </footer>
    
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(document.body, {
                    delimiters: [
                        {left: "$$", right: "$$", display: true},
                        {left: "$", right: "$", display: false},
                        {left: "\\\\[", right: "\\\\]", display: true},
                        {left: "\\\\(", right: "\\\\)", display: false}
                    ],
                    throwOnError: false
                });
            }
        });
    </script>
</body>
</html>`;
}

// =============================================================================
// MAIN
// =============================================================================

async function main(): Promise<void> {
	console.log("🚀 Research Knowledge Graph Report Generator (Academic Style)");
	console.log(`📡 Connecting to Neo4j at ${NEO4J_URI}...`);

	const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));

	try {
		await driver.verifyConnectivity();
		console.log("✅ Connected to Neo4j successfully!\n");

		const data = await fetchAllData(driver);

		console.log("\n📊 Summary:");
		console.log(`   • ${data.stats.nodeCount.toLocaleString()} nodes`);
		console.log(`   • ${data.stats.relationshipCount.toLocaleString()} relationships`);
		console.log(`   • ${data.frameworks.length} frameworks`);
		console.log(`   • ${data.concepts.length} concepts`);
		console.log(`   • ${data.papers.length} papers`);
		console.log(`   • ${data.hypotheses.length} hypotheses`);
		console.log(`   • ${data.theorems.length} theorems`);

		console.log("\n📝 Generating academic-style HTML report...");
		const html = generateHTML(data);

		const outputPath = path.join(process.cwd(), "research-report.html");
		fs.writeFileSync(outputPath, html);
		console.log(`\n✅ Report generated: ${outputPath}`);
		console.log(`📂 Open in browser: file://${outputPath}`);
	} catch (error) {
		if (error instanceof Error) {
			console.error(`❌ Error: ${error.message}`);
			if (error.message.includes("ECONNREFUSED") || error.message.includes("ServiceUnavailable")) {
				console.error("\n💡 Is Neo4j running? Try:");
				console.error("   make up      # Start Neo4j via Docker");
				console.error("   make load    # Load the knowledge graph");
			}
		} else {
			console.error("❌ Unknown error:", error);
		}
		process.exit(1);
	} finally {
		await driver.close();
	}
}

main();
