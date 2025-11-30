/**
 * Generate HTML Report for System Classification Framework
 *
 * This script generates a comprehensive HTML report showcasing:
 * - Mathematical foundations (lattice theory)
 * - Cross-standard mappings with confidence levels
 * - Probability calculations and architecture analysis
 * - Interactive visualizations
 */

import * as fs from "node:fs";
import * as path from "node:path";
import {
	ASIL_LATTICE,
	ConsequenceSeverity,
	DAL_LATTICE,
	// Lattices
	SIL_LATTICE,
	// Data
	STANDARD_ISOMORPHISM,
	// Enums
	SafetyIntegrityLevel,
	calculateArchitectureSIL,
	calculatePFD_1oo1,
	calculatePFD_1oo2,
	calculatePFD_2oo3,
	computeRequiredIntegrity,
	deriveRequiredSIL,
	verifyLatticeAxioms,
	verifySILCompliance,
} from "./system-classification.js";

// =============================================================================
// REPORT DATA GENERATION
// =============================================================================

function generateLatticeVerificationData() {
	return {
		SIL: verifyLatticeAxioms(SIL_LATTICE),
		ASIL: verifyLatticeAxioms(ASIL_LATTICE),
		DAL: verifyLatticeAxioms(DAL_LATTICE),
	};
}

function generateCrossStandardMappingData() {
	return STANDARD_ISOMORPHISM.probabilityBands.map((band) => ({
		ordinal: band.universalOrdinal,
		confidence: band.confidence,
		meaning: band.meaning,
		pfhRange: `${band.pfhLower.toExponential(0)} - ${band.pfhUpper === Number.POSITIVE_INFINITY ? "∞" : band.pfhUpper.toExponential(0)}`,
		mappings: band.mappings,
		verifiedPairs: band.verifiedPairs || [],
	}));
}

function generateArchitectureCalculations() {
	const lambdaD = 2e-6; // Dangerous failure rate per hour
	const T1 = 8760; // Proof test interval (1 year in hours)
	const beta = 0.1; // Common cause factor

	return {
		parameters: { lambdaD, T1, beta },
		architectures: [
			{
				name: "1oo1 (Single Channel)",
				pfd: calculatePFD_1oo1(lambdaD, T1),
				...calculateArchitectureSIL("1oo1", lambdaD, T1, beta),
			},
			{
				name: "1oo2 (Dual Redundant)",
				pfd: calculatePFD_1oo2(lambdaD, T1, beta),
				...calculateArchitectureSIL("1oo2", lambdaD, T1, beta),
			},
			{
				name: "2oo3 (Triple Modular Redundancy)",
				pfd: calculatePFD_2oo3(lambdaD, T1, beta),
				...calculateArchitectureSIL("2oo3", lambdaD, T1, beta),
			},
		],
	};
}

function generateRiskAssessmentExample() {
	const assessment = {
		hazardProbability: 0.1,
		exposureProbability: 0.5,
		unavoidabilityProbability: 0.8,
		severity: ConsequenceSeverity.CRITICAL,
	};
	const tolerableRisk = 1e-4;

	return {
		input: assessment,
		tolerableRisk,
		result: computeRequiredIntegrity(assessment, tolerableRisk),
		derivedSIL: deriveRequiredSIL(
			assessment.hazardProbability *
				assessment.exposureProbability *
				assessment.unavoidabilityProbability *
				1000,
			tolerableRisk * 1000,
		),
	};
}

function generateSILComplianceExample() {
	return verifySILCompliance(
		40, // Unreduced risk
		0.1, // Tolerable risk
		"1oo2", // Architecture
		2e-6, // Dangerous failure rate
		8760, // Proof test interval
		0.9, // Safe Failure Fraction
		0.1, // Common cause factor
	);
}

function generateUniversalLevelComparison() {
	const silLevels = SIL_LATTICE.levels.map((l) => ({
		name: l.name,
		ordinal: l.ordinal,
		universal: SIL_LATTICE.toUniversal(l),
	}));

	const asilLevels = ASIL_LATTICE.levels.map((l) => ({
		name: l.name,
		ordinal: l.ordinal,
		universal: ASIL_LATTICE.toUniversal(l),
	}));

	const dalLevels = DAL_LATTICE.levels.map((l) => ({
		name: l.name,
		ordinal: l.ordinal,
		universal: DAL_LATTICE.toUniversal(l),
	}));

	return { silLevels, asilLevels, dalLevels };
}

// =============================================================================
// HTML GENERATION
// =============================================================================

function generateHTML(): string {
	const latticeVerification = generateLatticeVerificationData();
	const crossStandardMapping = generateCrossStandardMappingData();
	const architectureCalcs = generateArchitectureCalculations();
	const riskAssessment = generateRiskAssessmentExample();
	const silCompliance = generateSILComplianceExample();
	const universalComparison = generateUniversalLevelComparison();

	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Safety Integrity Framework - Mathematical Report</title>
    
    <!-- KaTeX for math rendering -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
    
    <!-- Chart.js for plots -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <style>
        :root {
            --bg-primary: #0d1117;
            --bg-secondary: #161b22;
            --bg-tertiary: #21262d;
            --text-primary: #e6edf3;
            --text-secondary: #8b949e;
            --accent-blue: #58a6ff;
            --accent-green: #3fb950;
            --accent-yellow: #d29922;
            --accent-red: #f85149;
            --accent-purple: #a371f7;
            --border-color: #30363d;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            padding: 2rem;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
            border-radius: 16px;
            border: 1px solid var(--border-color);
        }
        
        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
        }
        
        .subtitle {
            color: var(--text-secondary);
            font-size: 1.1rem;
        }
        
        .warning-banner {
            background: linear-gradient(135deg, rgba(210, 153, 34, 0.1), rgba(248, 81, 73, 0.1));
            border: 1px solid var(--accent-yellow);
            border-radius: 12px;
            padding: 1.5rem;
            margin: 2rem 0;
        }
        
        .warning-banner h3 {
            color: var(--accent-yellow);
            margin-bottom: 0.5rem;
        }
        
        section {
            background: var(--bg-secondary);
            border-radius: 16px;
            border: 1px solid var(--border-color);
            padding: 2rem;
            margin-bottom: 2rem;
        }
        
        h2 {
            color: var(--accent-blue);
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid var(--border-color);
        }
        
        h3 {
            color: var(--text-primary);
            font-size: 1.2rem;
            margin: 1.5rem 0 1rem;
        }
        
        .math-block {
            background: var(--bg-tertiary);
            border-radius: 8px;
            padding: 1.5rem;
            margin: 1rem 0;
            overflow-x: auto;
            text-align: center;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        
        th, td {
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }
        
        th {
            background: var(--bg-tertiary);
            color: var(--accent-blue);
            font-weight: 600;
        }
        
        tr:hover {
            background: var(--bg-tertiary);
        }
        
        .confidence-high { color: var(--accent-green); }
        .confidence-medium { color: var(--accent-yellow); }
        .confidence-low { color: var(--accent-red); }
        .confidence-ordinal { color: var(--text-secondary); }
        
        .verification-pass { color: var(--accent-green); }
        .verification-fail { color: var(--accent-red); }
        
        .chart-container {
            background: var(--bg-tertiary);
            border-radius: 12px;
            padding: 1.5rem;
            margin: 1rem 0;
        }
        
        .chart-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 1.5rem;
        }
        
        .result-box {
            background: var(--bg-tertiary);
            border-radius: 8px;
            padding: 1rem;
            margin: 0.5rem 0;
            font-family: 'SF Mono', Monaco, monospace;
            font-size: 0.9rem;
        }
        
        .result-label {
            color: var(--text-secondary);
            font-size: 0.8rem;
            margin-bottom: 0.25rem;
        }
        
        .result-value {
            color: var(--accent-green);
            font-weight: 600;
        }
        
        .grid-2 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
        }
        
        .card {
            background: var(--bg-tertiary);
            border-radius: 12px;
            padding: 1.5rem;
            border: 1px solid var(--border-color);
        }
        
        .card-title {
            color: var(--accent-purple);
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        code {
            background: var(--bg-tertiary);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-family: 'SF Mono', Monaco, monospace;
            font-size: 0.85rem;
        }
        
        .sil-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.85rem;
        }
        
        .sil-0 { background: var(--bg-tertiary); color: var(--text-secondary); }
        .sil-1 { background: rgba(63, 185, 80, 0.2); color: var(--accent-green); }
        .sil-2 { background: rgba(210, 153, 34, 0.2); color: var(--accent-yellow); }
        .sil-3 { background: rgba(248, 81, 73, 0.2); color: var(--accent-red); }
        .sil-4 { background: rgba(163, 113, 247, 0.2); color: var(--accent-purple); }
        
        footer {
            text-align: center;
            padding: 2rem;
            color: var(--text-secondary);
            border-top: 1px solid var(--border-color);
            margin-top: 2rem;
        }
        
        .timestamp {
            font-size: 0.85rem;
            color: var(--text-secondary);
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Safety Integrity Framework</h1>
            <p class="subtitle">A Categorical Framework for Cross-Standard Safety Communication</p>
            <p class="timestamp">Generated: ${new Date().toISOString()}</p>
        </header>
        
        <div class="warning-banner">
            <h3>⚠️ Constructed Functor — Not Discovered Equivalence</h3>
            <p>This framework constructs <strong>explicit functors</strong> from each standard's integrity lattice to a shared ordinal space [0,1].
            These mappings are <strong>deliberately lossy</strong> — they quotient away domain-specific dimensions (S×E×C paths, demand modes, 
            consequence scales) in favor of ordinal comparability. This enables cross-standard <em>communication</em>, not <em>substitution</em>.</p>
            <p><strong>NOT for compliance.</strong> Always consult actual standards. (Cf. Goguen's institution theory for the mathematical approach.)</p>
        </div>
        
        <!-- Section 1: Mathematical Foundation -->
        <section>
            <h2>📐 Mathematical Foundation</h2>
            
            <h3>The Safety Integrity Lattice</h3>
            <p>A Safety Integrity Lattice is a bounded, totally ordered algebraic structure:</p>
            
            <div class="math-block">
                $$\\mathbb{L} = (L, \\bot, \\top, \\sqcup, \\sqcap, \\leq)$$
            </div>
            
            <div class="grid-2">
                <div class="card">
                    <div class="card-title">Carrier Set</div>
                    <div class="math-block">$$L = \\{l_0, l_1, ..., l_n\\}$$</div>
                    <p>The set of all integrity levels in the standard</p>
                </div>
                <div class="card">
                    <div class="card-title">Bounds</div>
                    <div class="math-block">$$\\bot = l_0 \\quad \\top = l_n$$</div>
                    <p>Bottom (no requirements) and Top (maximum integrity)</p>
                </div>
                <div class="card">
                    <div class="card-title">Join Operation</div>
                    <div class="math-block">$$a \\sqcup b = \\max(a, b)$$</div>
                    <p>Least upper bound (composition takes worst case)</p>
                </div>
                <div class="card">
                    <div class="card-title">Meet Operation</div>
                    <div class="math-block">$$a \\sqcap b = \\min(a, b)$$</div>
                    <p>Greatest lower bound (minimum requirement)</p>
                </div>
            </div>
            
            <h3>Key Axioms</h3>
            <div class="math-block">
                $$\\text{Total Order:} \\quad \\forall a, b \\in L: (a \\leq b) \\lor (b \\leq a)$$
            </div>
            <div class="math-block">
                $$\\text{Bounded:} \\quad \\forall x \\in L: \\bot \\leq x \\leq \\top$$
            </div>
            <div class="math-block">
                $$\\text{Monotonic Composition:} \\quad \\text{Integrity}(S) = \\bigsqcup_i \\text{Integrity}(S_i)$$
            </div>
        </section>
        
        <!-- Section 2: Lattice Verification -->
        <section>
            <h2>✓ Lattice Axiom Verification</h2>
            <p>Runtime verification of lattice properties for each safety standard:</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Standard</th>
                        <th>Lattice Valid</th>
                        <th>Violations</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(latticeVerification)
											.map(
												([name, result]) => `
                    <tr>
                        <td><strong>${name}</strong></td>
                        <td class="${result.valid ? "verification-pass" : "verification-fail"}">
                            ${result.valid ? "✓ VALID" : "✗ INVALID"}
                        </td>
                        <td>${result.violations.length === 0 ? "None" : result.violations.join(", ")}</td>
                    </tr>
                    `,
											)
											.join("")}
                </tbody>
            </table>
        </section>
        
        <!-- Section 3: Cross-Standard Mapping -->
        <section>
            <h2>🔄 Cross-Standard Mapping</h2>
            <p>Approximate ordinal mapping between safety standards (NOT probability equivalence):</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Ordinal</th>
                        <th>IEC 61508</th>
                        <th>ISO 26262</th>
                        <th>DO-178C</th>
                        <th>ECSS</th>
                        <th>IEC 62304</th>
                        <th>Confidence</th>
                    </tr>
                </thead>
                <tbody>
                    ${crossStandardMapping
											.map(
												(band) => `
                    <tr>
                        <td><strong>${band.ordinal.toFixed(2)}</strong></td>
                        <td><span class="sil-badge sil-${band.mappings.IEC_61508?.split("_")[1] || "0"}">${band.mappings.IEC_61508}</span></td>
                        <td>${band.mappings.ISO_26262}</td>
                        <td>${band.mappings.DO_178C}</td>
                        <td>${band.mappings.ECSS}</td>
                        <td>${band.mappings.IEC_62304}</td>
                        <td class="confidence-${band.confidence}">${band.confidence.toUpperCase()}</td>
                    </tr>
                    `,
											)
											.join("")}
                </tbody>
            </table>
            
            <div class="chart-container">
                <canvas id="confidenceChart"></canvas>
            </div>
        </section>
        
        <!-- Section 4: Probability Calculations -->
        <section>
            <h2>📊 Probability & Architecture Calculations</h2>
            
            <h3>IEC 61508 PFD Formulas</h3>
            
            <div class="grid-2">
                <div class="card">
                    <div class="card-title">1oo1 Architecture (Single Channel)</div>
                    <div class="math-block">
                        $$\\text{PFD}_{avg} = \\frac{\\lambda_D \\cdot T_1}{2}$$
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">1oo2 Architecture (Dual Redundant)</div>
                    <div class="math-block">
                        $$\\text{PFD}_{avg} = \\frac{(\\lambda_D \\cdot T_1)^2}{3} + \\beta \\cdot \\frac{\\lambda_D \\cdot T_1}{2}$$
                    </div>
                </div>
            </div>
            
            <h3>Calculation Results</h3>
            <p>Parameters: λ<sub>D</sub> = ${architectureCalcs.parameters.lambdaD.toExponential(1)}/h, 
               T<sub>1</sub> = ${architectureCalcs.parameters.T1} hours, 
               β = ${architectureCalcs.parameters.beta}</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Architecture</th>
                        <th>PFD<sub>avg</sub></th>
                        <th>Achieved SIL</th>
                    </tr>
                </thead>
                <tbody>
                    ${architectureCalcs.architectures
											.map(
												(arch) => `
                    <tr>
                        <td><strong>${arch.name}</strong></td>
                        <td><code>${arch.pfd.toExponential(2)}</code></td>
                        <td><span class="sil-badge sil-${arch.sil}">${SafetyIntegrityLevel[arch.sil]}</span></td>
                    </tr>
                    `,
											)
											.join("")}
                </tbody>
            </table>
            
            <div class="chart-container">
                <canvas id="pfdChart"></canvas>
            </div>
        </section>
        
        <!-- Section 5: Risk Assessment Example -->
        <section>
            <h2>⚡ Risk Assessment Example</h2>
            
            <h3>The Universal Risk Equation (Theoretical)</h3>
            <div class="math-block">
                $$R_{unreduced} = P_{hazard} \\times P_{exposure} \\times P_{unavoidable} \\times W_{severity}$$
            </div>
            <div class="math-block">
                $$\\text{RRF} = \\frac{R_{unreduced}}{R_{tolerable}} \\quad \\Rightarrow \\quad \\text{SIL} = \\lceil \\log_{10}(\\text{RRF}) \\rceil$$
            </div>
            
            <div class="warning-banner">
                <h3>⚠️ Theoretical Model</h3>
                <p>This equation is for educational purposes. Actual standards use risk graphs (IEC 61508) 
                or lookup tables (ISO 26262), NOT arithmetic multiplication.</p>
            </div>
            
            <h3>Example Calculation</h3>
            <div class="grid-2">
                <div class="card">
                    <div class="card-title">Input Parameters</div>
                    <div class="result-box">
                        <div class="result-label">P<sub>hazard</sub></div>
                        <div class="result-value">${riskAssessment.input.hazardProbability}</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">P<sub>exposure</sub></div>
                        <div class="result-value">${riskAssessment.input.exposureProbability}</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">P<sub>unavoidable</sub></div>
                        <div class="result-value">${riskAssessment.input.unavoidabilityProbability}</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Severity</div>
                        <div class="result-value">${ConsequenceSeverity[riskAssessment.input.severity]}</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">R<sub>tolerable</sub></div>
                        <div class="result-value">${riskAssessment.tolerableRisk.toExponential(0)}</div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">Results</div>
                    <div class="result-box">
                        <div class="result-label">Risk Reduction Factor</div>
                        <div class="result-value">${riskAssessment.derivedSIL.rrf.toFixed(0)}</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Exact Level</div>
                        <div class="result-value">${riskAssessment.derivedSIL.exactLevel.toFixed(2)}</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Required SIL</div>
                        <div class="result-value"><span class="sil-badge sil-${riskAssessment.derivedSIL.sil}">${SafetyIntegrityLevel[riskAssessment.derivedSIL.sil]}</span></div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Universal Ordinal</div>
                        <div class="result-value">${riskAssessment.result.ordinal.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Section 6: SIL Compliance Verification -->
        <section>
            <h2>✅ SIL Compliance Verification Example</h2>
            
            <h3>Scenario: Emergency Shutdown System</h3>
            <p>Verifying that a 1oo2 architecture meets the required SIL:</p>
            
            <div class="grid-2">
                <div class="card">
                    <div class="card-title">Verification Results</div>
                    <div class="result-box">
                        <div class="result-label">Required SIL</div>
                        <div class="result-value"><span class="sil-badge sil-${silCompliance.requiredSIL}">${SafetyIntegrityLevel[silCompliance.requiredSIL]}</span></div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Achieved SIL</div>
                        <div class="result-value"><span class="sil-badge sil-${silCompliance.achievedSIL}">${SafetyIntegrityLevel[silCompliance.achievedSIL]}</span></div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Architectural Constraint</div>
                        <div class="result-value"><span class="sil-badge sil-${silCompliance.architecturalConstraint}">${SafetyIntegrityLevel[silCompliance.architecturalConstraint]}</span></div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Achieved PFD</div>
                        <div class="result-value">${silCompliance.achievedPFD.toExponential(2)}</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Compliance Status</div>
                        <div class="result-value ${silCompliance.verified ? "verification-pass" : "verification-fail"}">
                            ${silCompliance.verified ? "✓ COMPLIANT" : "✗ NON-COMPLIANT"}
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">Verification Steps</div>
                    ${silCompliance.details.map((d) => `<div class="result-box">${d}</div>`).join("")}
                </div>
            </div>
        </section>
        
        <!-- Section 7: Universal Level Comparison -->
        <section>
            <h2>📈 Universal Level Comparison</h2>
            
            <div class="chart-container">
                <canvas id="universalComparisonChart"></canvas>
            </div>
            
            <h3>Normalized Ordinal Mapping</h3>
            <table>
                <thead>
                    <tr>
                        <th>IEC 61508 (SIL)</th>
                        <th>ISO 26262 (ASIL)</th>
                        <th>DO-178C (DAL)</th>
                        <th>Universal Ordinal</th>
                    </tr>
                </thead>
                <tbody>
                    ${[0, 1, 2, 3, 4]
											.map(
												(i) => `
                    <tr>
                        <td>${universalComparison.silLevels[i]?.name || "-"}</td>
                        <td>${universalComparison.asilLevels[i]?.name || "-"}</td>
                        <td>${universalComparison.dalLevels[i]?.name || "-"}</td>
                        <td><strong>${(i / 4).toFixed(2)}</strong></td>
                    </tr>
                    `,
											)
											.join("")}
                </tbody>
            </table>
        </section>
        
        <footer>
            <p><strong>A Categorical Framework for Cross-Standard Safety Communication</strong></p>
            <p>This framework constructs functors to a universal ordinal space — it does NOT claim equivalence.</p>
            <p>Cross-standard mappings are <strong>ordinal</strong>, not probability-based. Always consult actual standards.</p>
        </footer>
    </div>
    
    <script>
        // Initialize KaTeX for math rendering
        document.addEventListener("DOMContentLoaded", function() {
            renderMathInElement(document.body, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false}
                ]
            });
            
            // Confidence Distribution Chart
            new Chart(document.getElementById('confidenceChart'), {
                type: 'doughnut',
                data: {
                    labels: ['High', 'Medium', 'Low', 'Ordinal Only'],
                    datasets: [{
                        data: [${crossStandardMapping.filter((b) => b.confidence === "high").length}, 
                               ${crossStandardMapping.filter((b) => b.confidence === "medium").length}, 
                               ${crossStandardMapping.filter((b) => b.confidence === "low").length}, 
                               ${crossStandardMapping.filter((b) => b.confidence === "ordinal_only").length}],
                        backgroundColor: ['#3fb950', '#d29922', '#f85149', '#8b949e']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Cross-Standard Mapping Confidence Distribution',
                            color: '#e6edf3'
                        },
                        legend: {
                            labels: { color: '#e6edf3' }
                        }
                    }
                }
            });
            
            // PFD Architecture Comparison Chart
            new Chart(document.getElementById('pfdChart'), {
                type: 'bar',
                data: {
                    labels: ${JSON.stringify(architectureCalcs.architectures.map((a) => a.name))},
                    datasets: [{
                        label: 'PFD (log scale)',
                        data: ${JSON.stringify(architectureCalcs.architectures.map((a) => Math.log10(a.pfd)))},
                        backgroundColor: ['#58a6ff', '#3fb950', '#a371f7']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'PFD by Architecture (log₁₀ scale)',
                            color: '#e6edf3'
                        },
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            title: { display: true, text: 'log₁₀(PFD)', color: '#e6edf3' },
                            ticks: { color: '#8b949e' },
                            grid: { color: '#30363d' }
                        },
                        x: {
                            ticks: { color: '#8b949e' },
                            grid: { color: '#30363d' }
                        }
                    }
                }
            });
            
            // Universal Level Comparison Chart
            new Chart(document.getElementById('universalComparisonChart'), {
                type: 'radar',
                data: {
                    labels: ['Level 0', 'Level 1', 'Level 2', 'Level 3', 'Level 4'],
                    datasets: [
                        {
                            label: 'IEC 61508 (SIL)',
                            data: [0, 0.25, 0.5, 0.75, 1.0],
                            borderColor: '#58a6ff',
                            backgroundColor: 'rgba(88, 166, 255, 0.1)'
                        },
                        {
                            label: 'ISO 26262 (ASIL)',
                            data: [0, 0.25, 0.5, 0.75, 1.0],
                            borderColor: '#3fb950',
                            backgroundColor: 'rgba(63, 185, 80, 0.1)'
                        },
                        {
                            label: 'DO-178C (DAL)',
                            data: [0, 0.25, 0.5, 0.75, 1.0],
                            borderColor: '#a371f7',
                            backgroundColor: 'rgba(163, 113, 247, 0.1)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Universal Ordinal Space Mapping',
                            color: '#e6edf3'
                        },
                        legend: {
                            labels: { color: '#e6edf3' }
                        }
                    },
                    scales: {
                        r: {
                            grid: { color: '#30363d' },
                            pointLabels: { color: '#e6edf3' },
                            ticks: { color: '#8b949e', backdropColor: 'transparent' }
                        }
                    }
                }
            });
        });
    </script>
</body>
</html>`;
}

// =============================================================================
// MAIN
// =============================================================================

function main() {
	const html = generateHTML();
	const outputPath = path.join(process.cwd(), "safety-framework-report.html");
	fs.writeFileSync(outputPath, html);
	console.info(`✅ Report generated: ${outputPath}`);
}

main();
