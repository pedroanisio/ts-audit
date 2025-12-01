#!/usr/bin/env npx ts-node
/**
 * Interactive Project Safety Assessment CLI
 *
 * Run with: npx ts-node src/shared/safety-assess.ts
 *
 * This tool walks you through assessing your project's impact characteristics
 * and generates appropriate engineering constraints.
 */

// Import from specific modules to avoid naming conflicts
import {
	ControllabilityLevel,
	type EngineeringConstraints,
	ExposureLevel,
	type ImpactAssessmentInput,
	IntegrityLevel,
	RegulatoryDomain,
	SystemDomain,
	assessProjectConstraints,
	compareIntegrityLevels,
} from "./risk-assessment";

// =============================================================================
// QUICK ASSESSMENT PROFILES
// =============================================================================

/**
 * Pre-built assessment profiles for common project types
 * Use these as starting points and customize as needed
 */
export const QUICK_PROFILES = {
	/**
	 * Internal dashboard or admin tool
	 */
	internalTool: (): ImpactAssessmentInput => ({
		domain: SystemDomain.WEB_APPLICATION,
		safetyImpact: 0,
		financialImpact: 1,
		reputationalImpact: 0,
		dataImpact: 1,
		exposure: ExposureLevel.OCCASIONAL,
		userBaseScale: 1,
		recoverability: 1,
	}),

	/**
	 * Consumer mobile/web app
	 */
	consumerApp: (): ImpactAssessmentInput => ({
		domain: SystemDomain.WEB_APPLICATION,
		safetyImpact: 0,
		financialImpact: 1,
		reputationalImpact: 2,
		dataImpact: 2,
		exposure: ExposureLevel.FREQUENT,
		userBaseScale: 4,
		recoverability: 2,
		regulatoryRequirements: [RegulatoryDomain.GDPR],
	}),

	/**
	 * B2B SaaS platform
	 */
	b2bSaas: (): ImpactAssessmentInput => ({
		domain: SystemDomain.API_SERVICE,
		safetyImpact: 0,
		financialImpact: 3,
		reputationalImpact: 3,
		dataImpact: 3,
		exposure: ExposureLevel.CONTINUOUS,
		userBaseScale: 3,
		recoverability: 2,
		regulatoryRequirements: [RegulatoryDomain.SOC_2, RegulatoryDomain.GDPR],
	}),

	/**
	 * Payment processing / fintech
	 */
	paymentSystem: (): ImpactAssessmentInput => ({
		domain: SystemDomain.API_SERVICE,
		safetyImpact: 0,
		financialImpact: 4,
		reputationalImpact: 4,
		dataImpact: 4,
		exposure: ExposureLevel.CONTINUOUS,
		userBaseScale: 3,
		recoverability: 1,
		regulatoryRequirements: [
			RegulatoryDomain.PCI_DSS,
			RegulatoryDomain.SOC_2,
			RegulatoryDomain.GDPR,
		],
	}),

	/**
	 * Medical device software
	 */
	medicalDevice: (): ImpactAssessmentInput => ({
		domain: SystemDomain.EMBEDDED_SYSTEM,
		safetyImpact: 4,
		financialImpact: 4,
		reputationalImpact: 4,
		dataImpact: 4,
		exposure: ExposureLevel.CONTINUOUS,
		controllability: ControllabilityLevel.UNCONTROLLABLE,
		userBaseScale: 2,
		recoverability: 4,
		regulatoryRequirements: [RegulatoryDomain.IEC_62304],
	}),

	/**
	 * Automotive ECU
	 */
	automotiveEcu: (): ImpactAssessmentInput => ({
		domain: SystemDomain.EMBEDDED_SYSTEM,
		safetyImpact: 3,
		financialImpact: 4,
		reputationalImpact: 4,
		dataImpact: 0,
		exposure: ExposureLevel.CONTINUOUS,
		controllability: ControllabilityLevel.DIFFICULT,
		userBaseScale: 4,
		recoverability: 4,
		regulatoryRequirements: [RegulatoryDomain.ISO_26262],
	}),
};

// =============================================================================
// OUTPUT GENERATORS
// =============================================================================

/**
 * Generate markdown summary
 */
export function generateSummary(constraints: EngineeringConstraints): string {
	const lines: string[] = [];

	lines.push("## Safety Assessment Summary");
	lines.push("");
	lines.push(
		`**Integrity Level:** ${constraints.integrityLevel} - ${constraints.levelDescription}`,
	);
	lines.push(`**Primary Risk Driver:** ${constraints.rationale.primaryDriver}`);
	lines.push("");

	lines.push("### Key Requirements");
	lines.push("");
	lines.push("| Category | Requirement |");
	lines.push("|----------|-------------|");
	lines.push(
		`| Testing | ${constraints.testing.statementCoverage}% statement, ${constraints.testing.branchCoverage}% branch coverage |`,
	);
	lines.push(`| Code Review | ${constraints.process.minReviewers} reviewer(s) required |`);
	lines.push(
		`| Redundancy | ${constraints.architecture.redundancyRequired ? constraints.architecture.redundancyType : "Not required"} |`,
	);
	lines.push(
		`| Rollback | ${constraints.scoping.rollbackCapabilityRequired ? constraints.scoping.rollbackTimeRequirement : "Optional"} |`,
	);
	lines.push(`| Documentation | ${constraints.documentation.requirementsFormality} requirements |`);

	if (constraints.applicableStandards.length > 0) {
		lines.push("");
		lines.push("### Applicable Standards");
		lines.push(constraints.applicableStandards.map((s) => `- ${s}`).join("\n"));
	}

	return lines.join("\n");
}

/**
 * Generate setup checklist
 */
export function generateChecklist(constraints: EngineeringConstraints): string {
	const lines: string[] = [];

	lines.push(`## Project Setup Checklist (Level ${constraints.integrityLevel})`);
	lines.push("");

	lines.push("### Testing");
	if (constraints.testing.unitTestingRequired) {
		lines.push(
			`- [ ] Unit testing framework with ${constraints.testing.statementCoverage}% statement coverage`,
		);
	}
	if (constraints.testing.branchCoverage > 0) {
		lines.push(`- [ ] Branch coverage: ${constraints.testing.branchCoverage}%`);
	}
	if (constraints.testing.mcdcCoverage > 0) {
		lines.push(`- [ ] MC/DC coverage: ${constraints.testing.mcdcCoverage}%`);
	}
	if (constraints.testing.securityTestingRequired) {
		lines.push("- [ ] Security scanning (SAST/DAST)");
	}
	if (constraints.testing.faultInjectionRequired) {
		lines.push("- [ ] Chaos engineering / fault injection");
	}
	lines.push("");

	lines.push("### Architecture");
	if (constraints.architecture.redundancyRequired) {
		lines.push(`- [ ] ${constraints.architecture.redundancyType} redundancy`);
	}
	if (constraints.architecture.gracefulDegradationRequired) {
		lines.push("- [ ] Graceful degradation paths");
	}
	lines.push(`- [ ] ${constraints.architecture.monitoringLevel} monitoring`);
	if (constraints.architecture.auditTrailRequired) {
		lines.push(`- [ ] ${constraints.architecture.auditTrailLevel} audit logging`);
	}
	lines.push("");

	lines.push("### Process");
	if (constraints.process.codeReviewRequired) {
		lines.push(`- [ ] PR requirements: ${constraints.process.minReviewers} reviewer(s)`);
	}
	if (constraints.process.staticAnalysisRequired) {
		lines.push(`- [ ] ${constraints.process.staticAnalysisLevel} static analysis`);
	}
	if (constraints.process.traceabilityRequired) {
		lines.push("- [ ] Requirements traceability");
	}
	lines.push("");

	lines.push("### Deployment");
	if (constraints.scoping.rollbackCapabilityRequired) {
		lines.push(`- [ ] ${constraints.scoping.rollbackTimeRequirement} rollback capability`);
	}
	if (constraints.scoping.canaryDeploymentRequired) {
		lines.push("- [ ] Canary deployments");
	}
	if (constraints.scoping.blueGreenRequired) {
		lines.push("- [ ] Blue/green deployment");
	}

	return lines.join("\n");
}

/**
 * Generate full assessment report
 */
export function generateAssessmentReport(constraints: EngineeringConstraints): string {
	const lines: string[] = [];

	lines.push("# Engineering Constraints Report");
	lines.push("");
	lines.push("## Overview");
	lines.push("");
	lines.push(`- **Integrity Level:** ${constraints.integrityLevel}`);
	lines.push(`- **Description:** ${constraints.levelDescription}`);
	lines.push(`- **Primary Driver:** ${constraints.rationale.primaryDriver}`);
	lines.push(`- **Risk Score:** ${constraints.rationale.riskScore.toFixed(2)}`);
	lines.push("");

	lines.push("## Dimension Scores");
	lines.push("");
	lines.push("| Dimension | Score |");
	lines.push("|-----------|-------|");
	lines.push(`| Safety | ${constraints.rationale.dimensionScores.safety} |`);
	lines.push(`| Financial | ${constraints.rationale.dimensionScores.financial} |`);
	lines.push(`| Reputational | ${constraints.rationale.dimensionScores.reputational} |`);
	lines.push(`| Data | ${constraints.rationale.dimensionScores.data} |`);
	lines.push(`| Exposure | ${constraints.rationale.dimensionScores.exposure} |`);
	lines.push(`| User Base | ${constraints.rationale.dimensionScores.userBase} |`);
	lines.push(`| Recoverability | ${constraints.rationale.dimensionScores.recoverability} |`);
	lines.push("");

	if (constraints.rationale.warnings.length > 0) {
		lines.push("## Warnings");
		lines.push("");
		for (const warning of constraints.rationale.warnings) {
			lines.push(`⚠️ ${warning}`);
		}
		lines.push("");
	}

	lines.push("## Testing Requirements");
	lines.push("");
	lines.push("| Requirement | Value |");
	lines.push("|-------------|-------|");
	lines.push(`| Statement Coverage | ${constraints.testing.statementCoverage}% |`);
	lines.push(`| Branch Coverage | ${constraints.testing.branchCoverage}% |`);
	lines.push(`| MC/DC Coverage | ${constraints.testing.mcdcCoverage}% |`);
	lines.push(
		`| Unit Testing | ${constraints.testing.unitTestingRequired ? "Required" : "Optional"} |`,
	);
	lines.push(
		`| Integration Testing | ${constraints.testing.integrationTestingRequired ? "Required" : "Optional"} |`,
	);
	lines.push(
		`| Security Testing | ${constraints.testing.securityTestingRequired ? "Required" : "Optional"} |`,
	);
	lines.push(
		`| Fault Injection | ${constraints.testing.faultInjectionRequired ? "Required" : "Optional"} |`,
	);
	lines.push(
		`| Independent Verification | ${constraints.testing.independentVerificationRequired ? "Required" : "Optional"} |`,
	);
	lines.push("");

	lines.push("## Architecture Requirements");
	lines.push("");
	lines.push("| Requirement | Value |");
	lines.push("|-------------|-------|");
	lines.push(
		`| Redundancy | ${constraints.architecture.redundancyRequired ? constraints.architecture.redundancyType : "Not required"} |`,
	);
	lines.push(`| Monitoring | ${constraints.architecture.monitoringLevel} |`);
	lines.push(`| Error Handling | ${constraints.architecture.errorHandlingLevel} |`);
	lines.push(`| Isolation | ${constraints.architecture.isolationLevel} |`);
	lines.push(
		`| Audit Trail | ${constraints.architecture.auditTrailRequired ? constraints.architecture.auditTrailLevel : "Not required"} |`,
	);
	lines.push("");

	lines.push("## Process Requirements");
	lines.push("");
	lines.push("| Requirement | Value |");
	lines.push("|-------------|-------|");
	lines.push(
		`| Code Review | ${constraints.process.codeReviewRequired ? "Required" : "Optional"} |`,
	);
	lines.push(`| Min Reviewers | ${constraints.process.minReviewers} |`);
	lines.push(`| Static Analysis | ${constraints.process.staticAnalysisLevel} |`);
	lines.push(
		`| Coding Standard | ${constraints.process.codingStandardRequired ? constraints.process.codingStandard : "Not required"} |`,
	);
	lines.push(`| Design Documentation | ${constraints.process.designDocumentationLevel} |`);
	lines.push("");

	return lines.join("\n");
}

// =============================================================================
// DEMO RUNNER
// =============================================================================

function runDemo() {
	const _internalResult = assessProjectConstraints(QUICK_PROFILES.internalTool());
	const _saasResult = assessProjectConstraints(QUICK_PROFILES.b2bSaas());
	const _paymentResult = assessProjectConstraints(QUICK_PROFILES.paymentSystem());
	const _medicalResult = assessProjectConstraints(QUICK_PROFILES.medicalDevice());
	const _comparison = compareIntegrityLevels(IntegrityLevel.LEVEL_1, IntegrityLevel.LEVEL_3);
}

// Run demo if executed directly
runDemo();

// Export for use as module
export {
	assessProjectConstraints,
	compareIntegrityLevels,
	IntegrityLevel,
	SystemDomain,
	RegulatoryDomain,
	ExposureLevel,
	ControllabilityLevel,
};
