/**
 * Forms - Atomic Requirements for Cross-Standard Comparison
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * WHAT ARE FORMS?
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * A "Form" is an atomic requirement that can be:
 * - Present or absent for a given integrity level
 * - Compared across different standards
 * - Used as attributes in Formal Concept Analysis
 *
 * Forms are extracted from the constraint tables in risk-assessment.ts:
 * - TESTING_CONSTRAINTS → Testing Forms
 * - ARCHITECTURE_CONSTRAINTS → Architecture Forms
 * - PROCESS_CONSTRAINTS → Process Forms
 * - SCOPING_CONSTRAINTS → Scoping Forms
 * - DOCUMENTATION_CONSTRAINTS → Documentation Forms
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * DESIGN DECISIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 1. THRESHOLD HANDLING: Numeric thresholds become separate Forms
 *    - "statementCoverage >= 60" → STMT_COV_60
 *    - "statementCoverage >= 80" → STMT_COV_80
 *    - This keeps FCA pure (binary incidence) at the cost of Form proliferation
 *
 * 2. BOOLEAN REQUIREMENTS: Direct mapping
 *    - "unitTestingRequired: true" → UNIT_TESTING
 *
 * 3. ENUM REQUIREMENTS: Threshold-like treatment for ordered enums
 *    - "regressionTestingScope: 'full'" → REGRESSION_FULL
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * REFERENCES
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * - Antonino et al. (2014), "The Safety Requirements Decomposition Pattern"
 *   Defines Atomic Functional Safety Requirements (AFSR) vs Composite (CFSR)
 *
 * - Ganter & Wille (1999), "Formal Concept Analysis"
 *   Attributes in a formal context must be binary (present/absent)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import {
	type FormalContext,
	createFormalContextBuilder,
	computeConceptLattice,
	deriveAttributes,
	computeAttributeDelta,
	computeAttributeSymmetricDelta,
	type ConceptLattice,
	type FormalConcept,
} from "./fca-theory";

import {
	IntegrityLevel,
	type TestingConstraints,
	type ArchitectureConstraints,
	type ProcessConstraints,
	type ScopingConstraints,
	type DocumentationConstraints,
	deriveTestingConstraints,
	deriveArchitectureConstraints,
	deriveProcessConstraints,
	deriveScopingConstraints,
	deriveDocumentationConstraints,
} from "./risk-assessment";

// =============================================================================
// SECTION 1: FORM DEFINITION
// =============================================================================

/**
 * Categories of Forms (requirement types)
 */
export enum FormCategory {
	TESTING = "testing",
	ARCHITECTURE = "architecture",
	PROCESS = "process",
	SCOPING = "scoping",
	DOCUMENTATION = "documentation",
}

/**
 * A Form is an atomic requirement
 */
export interface Form {
	/** Unique identifier (e.g., "UNIT_TESTING", "STMT_COV_80") */
	readonly id: string;

	/** Human-readable name */
	readonly name: string;

	/** Category this Form belongs to */
	readonly category: FormCategory;

	/** Detailed description */
	readonly description: string;

	/** If this Form has a threshold, what is it? */
	readonly threshold?: {
		metric: string;
		operator: ">=" | ">" | "=" | "<" | "<=";
		value: number;
		unit?: string;
	};

	/** Reference to source (standard section, etc.) */
	readonly reference?: string;
}

// =============================================================================
// SECTION 2: FORM REGISTRY
// =============================================================================

/**
 * All known Forms indexed by ID
 */
export const FORMS: Record<string, Form> = {};

/**
 * Register a Form in the global registry
 */
function registerForm(form: Form): Form {
	FORMS[form.id] = form;
	return form;
}

// -----------------------------------------------------------------------------
// TESTING FORMS
// -----------------------------------------------------------------------------

// Boolean testing requirements
export const UNIT_TESTING = registerForm({
	id: "UNIT_TESTING",
	name: "Unit Testing Required",
	category: FormCategory.TESTING,
	description: "Unit tests must be written and executed for all code units",
});

export const INTEGRATION_TESTING = registerForm({
	id: "INTEGRATION_TESTING",
	name: "Integration Testing Required",
	category: FormCategory.TESTING,
	description: "Integration tests must verify component interactions",
});

export const SYSTEM_TESTING = registerForm({
	id: "SYSTEM_TESTING",
	name: "System Testing Required",
	category: FormCategory.TESTING,
	description: "End-to-end system tests must verify complete functionality",
});

export const ACCEPTANCE_TESTING = registerForm({
	id: "ACCEPTANCE_TESTING",
	name: "Acceptance Testing Required",
	category: FormCategory.TESTING,
	description: "Formal acceptance testing with stakeholder sign-off",
});

export const PERFORMANCE_TESTING = registerForm({
	id: "PERFORMANCE_TESTING",
	name: "Performance Testing Required",
	category: FormCategory.TESTING,
	description: "Performance and stress testing under load",
});

export const SECURITY_TESTING = registerForm({
	id: "SECURITY_TESTING",
	name: "Security Testing Required",
	category: FormCategory.TESTING,
	description: "Security testing including vulnerability assessment",
});

export const FAULT_INJECTION = registerForm({
	id: "FAULT_INJECTION",
	name: "Fault Injection Testing Required",
	category: FormCategory.TESTING,
	description: "Deliberate fault injection to verify error handling",
});

export const INDEPENDENT_VERIFICATION = registerForm({
	id: "INDEPENDENT_VERIFICATION",
	name: "Independent Verification Required",
	category: FormCategory.TESTING,
	description: "Verification by team independent from development",
});

// Coverage thresholds - Statement
export const STMT_COV_60 = registerForm({
	id: "STMT_COV_60",
	name: "Statement Coverage ≥ 60%",
	category: FormCategory.TESTING,
	description: "At least 60% of code statements must be executed by tests",
	threshold: { metric: "statementCoverage", operator: ">=", value: 60, unit: "%" },
});

export const STMT_COV_80 = registerForm({
	id: "STMT_COV_80",
	name: "Statement Coverage ≥ 80%",
	category: FormCategory.TESTING,
	description: "At least 80% of code statements must be executed by tests",
	threshold: { metric: "statementCoverage", operator: ">=", value: 80, unit: "%" },
});

export const STMT_COV_90 = registerForm({
	id: "STMT_COV_90",
	name: "Statement Coverage ≥ 90%",
	category: FormCategory.TESTING,
	description: "At least 90% of code statements must be executed by tests",
	threshold: { metric: "statementCoverage", operator: ">=", value: 90, unit: "%" },
});

export const STMT_COV_100 = registerForm({
	id: "STMT_COV_100",
	name: "Statement Coverage = 100%",
	category: FormCategory.TESTING,
	description: "All code statements must be executed by tests",
	threshold: { metric: "statementCoverage", operator: "=", value: 100, unit: "%" },
});

// Coverage thresholds - Branch
export const BRANCH_COV_70 = registerForm({
	id: "BRANCH_COV_70",
	name: "Branch Coverage ≥ 70%",
	category: FormCategory.TESTING,
	description: "At least 70% of code branches must be executed by tests",
	threshold: { metric: "branchCoverage", operator: ">=", value: 70, unit: "%" },
});

export const BRANCH_COV_85 = registerForm({
	id: "BRANCH_COV_85",
	name: "Branch Coverage ≥ 85%",
	category: FormCategory.TESTING,
	description: "At least 85% of code branches must be executed by tests",
	threshold: { metric: "branchCoverage", operator: ">=", value: 85, unit: "%" },
});

export const BRANCH_COV_100 = registerForm({
	id: "BRANCH_COV_100",
	name: "Branch Coverage = 100%",
	category: FormCategory.TESTING,
	description: "All code branches must be executed by tests",
	threshold: { metric: "branchCoverage", operator: "=", value: 100, unit: "%" },
});

// Coverage thresholds - MC/DC
export const MCDC_COV_80 = registerForm({
	id: "MCDC_COV_80",
	name: "MC/DC Coverage ≥ 80%",
	category: FormCategory.TESTING,
	description: "At least 80% Modified Condition/Decision Coverage",
	threshold: { metric: "mcdcCoverage", operator: ">=", value: 80, unit: "%" },
});

export const MCDC_COV_100 = registerForm({
	id: "MCDC_COV_100",
	name: "MC/DC Coverage = 100%",
	category: FormCategory.TESTING,
	description: "Full Modified Condition/Decision Coverage",
	threshold: { metric: "mcdcCoverage", operator: "=", value: 100, unit: "%" },
});

// Regression testing scope
export const REGRESSION_AFFECTED = registerForm({
	id: "REGRESSION_AFFECTED",
	name: "Regression Testing (Affected)",
	category: FormCategory.TESTING,
	description: "Regression tests run for affected modules only",
});

export const REGRESSION_FULL = registerForm({
	id: "REGRESSION_FULL",
	name: "Regression Testing (Full)",
	category: FormCategory.TESTING,
	description: "Full regression test suite run on every change",
});

// Test documentation
export const TEST_DOC_STRUCTURED = registerForm({
	id: "TEST_DOC_STRUCTURED",
	name: "Structured Test Documentation",
	category: FormCategory.TESTING,
	description: "Test cases documented in structured format",
});

export const TEST_DOC_FORMAL = registerForm({
	id: "TEST_DOC_FORMAL",
	name: "Formal Test Documentation",
	category: FormCategory.TESTING,
	description: "Test cases documented with formal specifications",
});

// -----------------------------------------------------------------------------
// ARCHITECTURE FORMS
// -----------------------------------------------------------------------------

export const REDUNDANCY_HOT_STANDBY = registerForm({
	id: "REDUNDANCY_HOT_STANDBY",
	name: "Hot Standby Redundancy",
	category: FormCategory.ARCHITECTURE,
	description: "System has hot standby redundancy for failover",
});

export const REDUNDANCY_ACTIVE_ACTIVE = registerForm({
	id: "REDUNDANCY_ACTIVE_ACTIVE",
	name: "Active-Active Redundancy",
	category: FormCategory.ARCHITECTURE,
	description: "System runs in active-active configuration",
});

export const REDUNDANCY_VOTING = registerForm({
	id: "REDUNDANCY_VOTING",
	name: "Voting Redundancy",
	category: FormCategory.ARCHITECTURE,
	description: "Multiple redundant channels with voting logic",
});

export const FAULT_TOLERANCE = registerForm({
	id: "FAULT_TOLERANCE",
	name: "Fault Tolerance Required",
	category: FormCategory.ARCHITECTURE,
	description: "System must tolerate and recover from faults",
});

export const GRACEFUL_DEGRADATION = registerForm({
	id: "GRACEFUL_DEGRADATION",
	name: "Graceful Degradation Required",
	category: FormCategory.ARCHITECTURE,
	description: "System must degrade gracefully under failure",
});

export const NO_SINGLE_POINT_FAILURE = registerForm({
	id: "NO_SINGLE_POINT_FAILURE",
	name: "No Single Point of Failure",
	category: FormCategory.ARCHITECTURE,
	description: "Architecture must eliminate single points of failure",
});

export const MONITORING_COMPREHENSIVE = registerForm({
	id: "MONITORING_COMPREHENSIVE",
	name: "Comprehensive Monitoring",
	category: FormCategory.ARCHITECTURE,
	description: "Comprehensive monitoring of system health",
});

export const MONITORING_REALTIME = registerForm({
	id: "MONITORING_REALTIME",
	name: "Real-time Monitoring",
	category: FormCategory.ARCHITECTURE,
	description: "Real-time monitoring with immediate alerting",
});

export const ERROR_HANDLING_COMPREHENSIVE = registerForm({
	id: "ERROR_HANDLING_COMPREHENSIVE",
	name: "Comprehensive Error Handling",
	category: FormCategory.ARCHITECTURE,
	description: "All error conditions explicitly handled",
});

export const ERROR_HANDLING_FAILSAFE = registerForm({
	id: "ERROR_HANDLING_FAILSAFE",
	name: "Fail-Safe Error Handling",
	category: FormCategory.ARCHITECTURE,
	description: "Errors trigger safe state transitions",
});

export const DATA_INTEGRITY_STRONG = registerForm({
	id: "DATA_INTEGRITY_STRONG",
	name: "Strong Data Integrity",
	category: FormCategory.ARCHITECTURE,
	description: "Strong consistency guarantees for data",
});

export const DATA_INTEGRITY_VERIFIED = registerForm({
	id: "DATA_INTEGRITY_VERIFIED",
	name: "Verified Data Integrity",
	category: FormCategory.ARCHITECTURE,
	description: "Data integrity verified with checksums/signatures",
});

export const AUDIT_TRAIL_BASIC = registerForm({
	id: "AUDIT_TRAIL_BASIC",
	name: "Basic Audit Trail",
	category: FormCategory.ARCHITECTURE,
	description: "Basic logging of significant events",
});

export const AUDIT_TRAIL_DETAILED = registerForm({
	id: "AUDIT_TRAIL_DETAILED",
	name: "Detailed Audit Trail",
	category: FormCategory.ARCHITECTURE,
	description: "Detailed logging of all operations",
});

export const AUDIT_TRAIL_FORENSIC = registerForm({
	id: "AUDIT_TRAIL_FORENSIC",
	name: "Forensic Audit Trail",
	category: FormCategory.ARCHITECTURE,
	description: "Tamper-evident forensic logging",
});

export const ISOLATION_PROCESS = registerForm({
	id: "ISOLATION_PROCESS",
	name: "Process Isolation",
	category: FormCategory.ARCHITECTURE,
	description: "Components isolated at process level",
});

export const ISOLATION_CONTAINER = registerForm({
	id: "ISOLATION_CONTAINER",
	name: "Container Isolation",
	category: FormCategory.ARCHITECTURE,
	description: "Components isolated in containers",
});

export const ISOLATION_VM = registerForm({
	id: "ISOLATION_VM",
	name: "VM Isolation",
	category: FormCategory.ARCHITECTURE,
	description: "Components isolated in virtual machines",
});

export const ISOLATION_PHYSICAL = registerForm({
	id: "ISOLATION_PHYSICAL",
	name: "Physical Isolation",
	category: FormCategory.ARCHITECTURE,
	description: "Components physically isolated",
});

// -----------------------------------------------------------------------------
// PROCESS FORMS
// -----------------------------------------------------------------------------

export const CODE_REVIEW = registerForm({
	id: "CODE_REVIEW",
	name: "Code Review Required",
	category: FormCategory.PROCESS,
	description: "All code changes must be reviewed",
});

export const REVIEWERS_MIN_2 = registerForm({
	id: "REVIEWERS_MIN_2",
	name: "Minimum 2 Reviewers",
	category: FormCategory.PROCESS,
	description: "At least 2 reviewers required for approval",
});

export const INDEPENDENT_REVIEW = registerForm({
	id: "INDEPENDENT_REVIEW",
	name: "Independent Review Required",
	category: FormCategory.PROCESS,
	description: "Review by independent team required",
});

export const FORMAL_INSPECTION = registerForm({
	id: "FORMAL_INSPECTION",
	name: "Formal Inspection Required",
	category: FormCategory.PROCESS,
	description: "Formal Fagan-style inspection process",
});

export const DESIGN_DOC_STRUCTURED = registerForm({
	id: "DESIGN_DOC_STRUCTURED",
	name: "Structured Design Documentation",
	category: FormCategory.PROCESS,
	description: "Design documented in structured format",
});

export const DESIGN_DOC_FORMAL = registerForm({
	id: "DESIGN_DOC_FORMAL",
	name: "Formal Design Documentation",
	category: FormCategory.PROCESS,
	description: "Design documented with formal notation",
});

export const DESIGN_DOC_MATHEMATICAL = registerForm({
	id: "DESIGN_DOC_MATHEMATICAL",
	name: "Mathematical Design Documentation",
	category: FormCategory.PROCESS,
	description: "Design specified with mathematical proofs",
});

export const TRACEABILITY = registerForm({
	id: "TRACEABILITY",
	name: "Traceability Required",
	category: FormCategory.PROCESS,
	description: "Requirements traced to implementation",
});

export const TRACEABILITY_BIDIRECTIONAL = registerForm({
	id: "TRACEABILITY_BIDIRECTIONAL",
	name: "Bidirectional Traceability",
	category: FormCategory.PROCESS,
	description: "Forward and backward requirement traceability",
});

export const CONFIG_MGMT_CONTROLLED = registerForm({
	id: "CONFIG_MGMT_CONTROLLED",
	name: "Controlled Configuration Management",
	category: FormCategory.PROCESS,
	description: "Formal configuration management with baselines",
});

export const CONFIG_MGMT_AUDITED = registerForm({
	id: "CONFIG_MGMT_AUDITED",
	name: "Audited Configuration Management",
	category: FormCategory.PROCESS,
	description: "Configuration management with audit trail",
});

export const CHANGE_CONTROL_DOCUMENTED = registerForm({
	id: "CHANGE_CONTROL_DOCUMENTED",
	name: "Documented Change Control",
	category: FormCategory.PROCESS,
	description: "All changes documented with rationale",
});

export const CHANGE_CONTROL_FORMAL = registerForm({
	id: "CHANGE_CONTROL_FORMAL",
	name: "Formal Change Control",
	category: FormCategory.PROCESS,
	description: "Formal change control board approval",
});

export const STATIC_ANALYSIS_LINTER = registerForm({
	id: "STATIC_ANALYSIS_LINTER",
	name: "Linter Analysis",
	category: FormCategory.PROCESS,
	description: "Static analysis with linter tools",
});

export const STATIC_ANALYSIS_TYPE_CHECKER = registerForm({
	id: "STATIC_ANALYSIS_TYPE_CHECKER",
	name: "Type Checker Analysis",
	category: FormCategory.PROCESS,
	description: "Static type checking required",
});

export const STATIC_ANALYSIS_FORMAL = registerForm({
	id: "STATIC_ANALYSIS_FORMAL",
	name: "Formal Verification",
	category: FormCategory.PROCESS,
	description: "Formal static analysis or model checking",
});

export const CODING_STANDARD_INTERNAL = registerForm({
	id: "CODING_STANDARD_INTERNAL",
	name: "Internal Coding Standard",
	category: FormCategory.PROCESS,
	description: "Adherence to internal coding standards",
});

export const CODING_STANDARD_MISRA = registerForm({
	id: "CODING_STANDARD_MISRA",
	name: "MISRA Coding Standard",
	category: FormCategory.PROCESS,
	description: "Adherence to MISRA C/C++ guidelines",
});

// -----------------------------------------------------------------------------
// SCOPING FORMS
// -----------------------------------------------------------------------------

export const INCREMENTAL_DELIVERY = registerForm({
	id: "INCREMENTAL_DELIVERY",
	name: "Incremental Delivery Required",
	category: FormCategory.SCOPING,
	description: "Features delivered incrementally",
});

export const FEATURE_FLAGS = registerForm({
	id: "FEATURE_FLAGS",
	name: "Feature Flags Required",
	category: FormCategory.SCOPING,
	description: "New features behind feature flags",
});

export const ROLLBACK_CAPABILITY = registerForm({
	id: "ROLLBACK_CAPABILITY",
	name: "Rollback Capability Required",
	category: FormCategory.SCOPING,
	description: "Ability to rollback deployments",
});

export const ROLLBACK_MINUTES = registerForm({
	id: "ROLLBACK_MINUTES",
	name: "Rollback Within Minutes",
	category: FormCategory.SCOPING,
	description: "Rollback achievable within minutes",
});

export const ROLLBACK_SECONDS = registerForm({
	id: "ROLLBACK_SECONDS",
	name: "Rollback Within Seconds",
	category: FormCategory.SCOPING,
	description: "Rollback achievable within seconds",
});

export const ROLLBACK_AUTOMATIC = registerForm({
	id: "ROLLBACK_AUTOMATIC",
	name: "Automatic Rollback",
	category: FormCategory.SCOPING,
	description: "Automatic rollback on failure detection",
});

export const CANARY_DEPLOYMENT = registerForm({
	id: "CANARY_DEPLOYMENT",
	name: "Canary Deployment Required",
	category: FormCategory.SCOPING,
	description: "Canary deployment before full rollout",
});

export const BLUE_GREEN_DEPLOYMENT = registerForm({
	id: "BLUE_GREEN_DEPLOYMENT",
	name: "Blue-Green Deployment Required",
	category: FormCategory.SCOPING,
	description: "Blue-green deployment strategy",
});

export const BETA_PHASE = registerForm({
	id: "BETA_PHASE",
	name: "Beta Phase Required",
	category: FormCategory.SCOPING,
	description: "Beta testing phase before GA",
});

export const BETA_PHASE_7_DAYS = registerForm({
	id: "BETA_PHASE_7_DAYS",
	name: "Beta Phase ≥ 7 Days",
	category: FormCategory.SCOPING,
	description: "Minimum 7 days beta testing",
	threshold: { metric: "betaDurationMinDays", operator: ">=", value: 7, unit: "days" },
});

export const BETA_PHASE_14_DAYS = registerForm({
	id: "BETA_PHASE_14_DAYS",
	name: "Beta Phase ≥ 14 Days",
	category: FormCategory.SCOPING,
	description: "Minimum 14 days beta testing",
	threshold: { metric: "betaDurationMinDays", operator: ">=", value: 14, unit: "days" },
});

export const BETA_PHASE_30_DAYS = registerForm({
	id: "BETA_PHASE_30_DAYS",
	name: "Beta Phase ≥ 30 Days",
	category: FormCategory.SCOPING,
	description: "Minimum 30 days beta testing",
	threshold: { metric: "betaDurationMinDays", operator: ">=", value: 30, unit: "days" },
});

// -----------------------------------------------------------------------------
// DOCUMENTATION FORMS
// -----------------------------------------------------------------------------

export const REQUIREMENTS_SPEC = registerForm({
	id: "REQUIREMENTS_SPEC",
	name: "Requirements Specification Required",
	category: FormCategory.DOCUMENTATION,
	description: "Formal requirements specification document",
});

export const REQUIREMENTS_STRUCTURED = registerForm({
	id: "REQUIREMENTS_STRUCTURED",
	name: "Structured Requirements",
	category: FormCategory.DOCUMENTATION,
	description: "Requirements in structured format (e.g., EARS)",
});

export const REQUIREMENTS_FORMAL = registerForm({
	id: "REQUIREMENTS_FORMAL",
	name: "Formal Requirements",
	category: FormCategory.DOCUMENTATION,
	description: "Requirements in formal specification language",
});

export const REQUIREMENTS_MATHEMATICAL = registerForm({
	id: "REQUIREMENTS_MATHEMATICAL",
	name: "Mathematical Requirements",
	category: FormCategory.DOCUMENTATION,
	description: "Requirements with mathematical proofs",
});

export const ARCHITECTURE_DOC = registerForm({
	id: "ARCHITECTURE_DOC",
	name: "Architecture Documentation Required",
	category: FormCategory.DOCUMENTATION,
	description: "System architecture documentation",
});

export const API_DOC = registerForm({
	id: "API_DOC",
	name: "API Documentation Required",
	category: FormCategory.DOCUMENTATION,
	description: "API reference documentation",
});

export const RUNBOOK = registerForm({
	id: "RUNBOOK",
	name: "Operations Runbook Required",
	category: FormCategory.DOCUMENTATION,
	description: "Operations and incident response runbook",
});

export const ASSURANCE_CASE = registerForm({
	id: "ASSURANCE_CASE",
	name: "Assurance Case Required",
	category: FormCategory.DOCUMENTATION,
	description: "Safety/security assurance case (GSN/CAE)",
});

export const HAZARD_ANALYSIS = registerForm({
	id: "HAZARD_ANALYSIS",
	name: "Hazard Analysis Required",
	category: FormCategory.DOCUMENTATION,
	description: "Systematic hazard analysis (HAZOP, FMEA)",
});

export const RISK_REGISTER = registerForm({
	id: "RISK_REGISTER",
	name: "Risk Register Required",
	category: FormCategory.DOCUMENTATION,
	description: "Maintained risk register",
});

// =============================================================================
// SECTION 3: FORM EXTRACTION FROM CONSTRAINTS
// =============================================================================

/**
 * Extract Forms from TestingConstraints
 */
export function extractTestingForms(constraints: TestingConstraints): Set<string> {
	const forms = new Set<string>();

	// Boolean requirements
	if (constraints.unitTestingRequired) forms.add(UNIT_TESTING.id);
	if (constraints.integrationTestingRequired) forms.add(INTEGRATION_TESTING.id);
	if (constraints.systemTestingRequired) forms.add(SYSTEM_TESTING.id);
	if (constraints.acceptanceTestingRequired) forms.add(ACCEPTANCE_TESTING.id);
	if (constraints.performanceTestingRequired) forms.add(PERFORMANCE_TESTING.id);
	if (constraints.securityTestingRequired) forms.add(SECURITY_TESTING.id);
	if (constraints.faultInjectionRequired) forms.add(FAULT_INJECTION.id);
	if (constraints.independentVerificationRequired) forms.add(INDEPENDENT_VERIFICATION.id);

	// Statement coverage thresholds
	if (constraints.statementCoverage >= 60) forms.add(STMT_COV_60.id);
	if (constraints.statementCoverage >= 80) forms.add(STMT_COV_80.id);
	if (constraints.statementCoverage >= 90) forms.add(STMT_COV_90.id);
	if (constraints.statementCoverage >= 100) forms.add(STMT_COV_100.id);

	// Branch coverage thresholds
	if (constraints.branchCoverage >= 70) forms.add(BRANCH_COV_70.id);
	if (constraints.branchCoverage >= 85) forms.add(BRANCH_COV_85.id);
	if (constraints.branchCoverage >= 100) forms.add(BRANCH_COV_100.id);

	// MC/DC coverage thresholds
	if (constraints.mcdcCoverage >= 80) forms.add(MCDC_COV_80.id);
	if (constraints.mcdcCoverage >= 100) forms.add(MCDC_COV_100.id);

	// Regression testing scope
	if (constraints.regressionTestingScope === "affected" || constraints.regressionTestingScope === "full") {
		forms.add(REGRESSION_AFFECTED.id);
	}
	if (constraints.regressionTestingScope === "full") {
		forms.add(REGRESSION_FULL.id);
	}

	// Test documentation
	if (constraints.testDocumentationLevel === "structured" || constraints.testDocumentationLevel === "formal") {
		forms.add(TEST_DOC_STRUCTURED.id);
	}
	if (constraints.testDocumentationLevel === "formal") {
		forms.add(TEST_DOC_FORMAL.id);
	}

	return forms;
}

/**
 * Extract Forms from ArchitectureConstraints
 */
export function extractArchitectureForms(constraints: ArchitectureConstraints): Set<string> {
	const forms = new Set<string>();

	// Redundancy - cumulative (higher types include lower)
	if (constraints.redundancyRequired) {
		if (constraints.redundancyType === "hot_standby") {
			forms.add(REDUNDANCY_HOT_STANDBY.id);
		}
		if (constraints.redundancyType === "active_active") {
			forms.add(REDUNDANCY_HOT_STANDBY.id);
			forms.add(REDUNDANCY_ACTIVE_ACTIVE.id);
		}
		if (constraints.redundancyType === "voting") {
			forms.add(REDUNDANCY_HOT_STANDBY.id);
			forms.add(REDUNDANCY_ACTIVE_ACTIVE.id);
			forms.add(REDUNDANCY_VOTING.id);
		}
	}

	// Fault tolerance and degradation
	if (constraints.faultToleranceRequired) forms.add(FAULT_TOLERANCE.id);
	if (constraints.gracefulDegradationRequired) forms.add(GRACEFUL_DEGRADATION.id);

	// Single point of failure
	if (constraints.maxSinglePointFailureExposure === "none") {
		forms.add(NO_SINGLE_POINT_FAILURE.id);
	}

	// Monitoring
	if (constraints.monitoringLevel === "comprehensive" || constraints.monitoringLevel === "real_time") {
		forms.add(MONITORING_COMPREHENSIVE.id);
	}
	if (constraints.monitoringLevel === "real_time") {
		forms.add(MONITORING_REALTIME.id);
	}

	// Error handling
	if (constraints.errorHandlingLevel === "comprehensive" || constraints.errorHandlingLevel === "fail_safe") {
		forms.add(ERROR_HANDLING_COMPREHENSIVE.id);
	}
	if (constraints.errorHandlingLevel === "fail_safe") {
		forms.add(ERROR_HANDLING_FAILSAFE.id);
	}

	// Data integrity
	if (constraints.dataIntegrityLevel === "strong" || constraints.dataIntegrityLevel === "verified") {
		forms.add(DATA_INTEGRITY_STRONG.id);
	}
	if (constraints.dataIntegrityLevel === "verified") {
		forms.add(DATA_INTEGRITY_VERIFIED.id);
	}

	// Audit trail
	if (constraints.auditTrailRequired) {
		if (constraints.auditTrailLevel === "basic") forms.add(AUDIT_TRAIL_BASIC.id);
		if (constraints.auditTrailLevel === "detailed") {
			forms.add(AUDIT_TRAIL_BASIC.id);
			forms.add(AUDIT_TRAIL_DETAILED.id);
		}
		if (constraints.auditTrailLevel === "forensic") {
			forms.add(AUDIT_TRAIL_BASIC.id);
			forms.add(AUDIT_TRAIL_DETAILED.id);
			forms.add(AUDIT_TRAIL_FORENSIC.id);
		}
	}

	// Isolation
	if (constraints.isolationLevel === "process") forms.add(ISOLATION_PROCESS.id);
	if (constraints.isolationLevel === "container") {
		forms.add(ISOLATION_PROCESS.id);
		forms.add(ISOLATION_CONTAINER.id);
	}
	if (constraints.isolationLevel === "vm") {
		forms.add(ISOLATION_PROCESS.id);
		forms.add(ISOLATION_CONTAINER.id);
		forms.add(ISOLATION_VM.id);
	}
	if (constraints.isolationLevel === "physical") {
		forms.add(ISOLATION_PROCESS.id);
		forms.add(ISOLATION_CONTAINER.id);
		forms.add(ISOLATION_VM.id);
		forms.add(ISOLATION_PHYSICAL.id);
	}

	return forms;
}

/**
 * Extract Forms from ProcessConstraints
 */
export function extractProcessForms(constraints: ProcessConstraints): Set<string> {
	const forms = new Set<string>();

	// Code review
	if (constraints.codeReviewRequired) forms.add(CODE_REVIEW.id);
	if (constraints.minReviewers >= 2) forms.add(REVIEWERS_MIN_2.id);
	if (constraints.independentReviewRequired) forms.add(INDEPENDENT_REVIEW.id);
	if (constraints.formalInspectionRequired) forms.add(FORMAL_INSPECTION.id);

	// Design documentation
	if (constraints.designDocumentationRequired) {
		if (constraints.designDocumentationLevel === "structured") forms.add(DESIGN_DOC_STRUCTURED.id);
		if (constraints.designDocumentationLevel === "formal") {
			forms.add(DESIGN_DOC_STRUCTURED.id);
			forms.add(DESIGN_DOC_FORMAL.id);
		}
		if (constraints.designDocumentationLevel === "mathematical") {
			forms.add(DESIGN_DOC_STRUCTURED.id);
			forms.add(DESIGN_DOC_FORMAL.id);
			forms.add(DESIGN_DOC_MATHEMATICAL.id);
		}
	}

	// Traceability
	if (constraints.traceabilityRequired) forms.add(TRACEABILITY.id);
	if (constraints.bidirectionalTraceability) {
		forms.add(TRACEABILITY.id);
		forms.add(TRACEABILITY_BIDIRECTIONAL.id);
	}

	// Configuration management
	if (constraints.configurationManagementLevel === "controlled") {
		forms.add(CONFIG_MGMT_CONTROLLED.id);
	}
	if (constraints.configurationManagementLevel === "audited") {
		forms.add(CONFIG_MGMT_CONTROLLED.id);
		forms.add(CONFIG_MGMT_AUDITED.id);
	}

	// Change control
	if (constraints.changeControlLevel === "documented") forms.add(CHANGE_CONTROL_DOCUMENTED.id);
	if (constraints.changeControlLevel === "formal_approval") {
		forms.add(CHANGE_CONTROL_DOCUMENTED.id);
		forms.add(CHANGE_CONTROL_FORMAL.id);
	}

	// Static analysis
	if (constraints.staticAnalysisRequired) {
		if (constraints.staticAnalysisLevel === "linter") forms.add(STATIC_ANALYSIS_LINTER.id);
		if (constraints.staticAnalysisLevel === "type_checker") {
			forms.add(STATIC_ANALYSIS_LINTER.id);
			forms.add(STATIC_ANALYSIS_TYPE_CHECKER.id);
		}
		if (constraints.staticAnalysisLevel === "formal_verifier") {
			forms.add(STATIC_ANALYSIS_LINTER.id);
			forms.add(STATIC_ANALYSIS_TYPE_CHECKER.id);
			forms.add(STATIC_ANALYSIS_FORMAL.id);
		}
	}

	// Coding standard
	if (constraints.codingStandardRequired) {
		if (constraints.codingStandard === "internal") forms.add(CODING_STANDARD_INTERNAL.id);
		if (constraints.codingStandard === "MISRA") {
			forms.add(CODING_STANDARD_INTERNAL.id);
			forms.add(CODING_STANDARD_MISRA.id);
		}
	}

	return forms;
}

/**
 * Extract Forms from ScopingConstraints
 */
export function extractScopingForms(constraints: ScopingConstraints): Set<string> {
	const forms = new Set<string>();

	if (constraints.incrementalDeliveryRequired) forms.add(INCREMENTAL_DELIVERY.id);
	if (constraints.featureFlagsRequired) forms.add(FEATURE_FLAGS.id);

	// Rollback
	if (constraints.rollbackCapabilityRequired) {
		forms.add(ROLLBACK_CAPABILITY.id);
		if (constraints.rollbackTimeRequirement === "minutes") forms.add(ROLLBACK_MINUTES.id);
		if (constraints.rollbackTimeRequirement === "seconds") {
			forms.add(ROLLBACK_MINUTES.id);
			forms.add(ROLLBACK_SECONDS.id);
		}
		if (constraints.rollbackTimeRequirement === "automatic") {
			forms.add(ROLLBACK_MINUTES.id);
			forms.add(ROLLBACK_SECONDS.id);
			forms.add(ROLLBACK_AUTOMATIC.id);
		}
	}

	if (constraints.canaryDeploymentRequired) forms.add(CANARY_DEPLOYMENT.id);
	if (constraints.blueGreenRequired) forms.add(BLUE_GREEN_DEPLOYMENT.id);

	// Beta phase
	if (constraints.betaPhaseRequired) {
		forms.add(BETA_PHASE.id);
		if (constraints.betaDurationMinDays && constraints.betaDurationMinDays >= 7) {
			forms.add(BETA_PHASE_7_DAYS.id);
		}
		if (constraints.betaDurationMinDays && constraints.betaDurationMinDays >= 14) {
			forms.add(BETA_PHASE_14_DAYS.id);
		}
		if (constraints.betaDurationMinDays && constraints.betaDurationMinDays >= 30) {
			forms.add(BETA_PHASE_30_DAYS.id);
		}
	}

	return forms;
}

/**
 * Extract Forms from DocumentationConstraints
 */
export function extractDocumentationForms(constraints: DocumentationConstraints): Set<string> {
	const forms = new Set<string>();

	if (constraints.requirementsSpecRequired) {
		forms.add(REQUIREMENTS_SPEC.id);
		if (constraints.requirementsFormality === "structured") forms.add(REQUIREMENTS_STRUCTURED.id);
		if (constraints.requirementsFormality === "formal") {
			forms.add(REQUIREMENTS_STRUCTURED.id);
			forms.add(REQUIREMENTS_FORMAL.id);
		}
		if (constraints.requirementsFormality === "mathematical") {
			forms.add(REQUIREMENTS_STRUCTURED.id);
			forms.add(REQUIREMENTS_FORMAL.id);
			forms.add(REQUIREMENTS_MATHEMATICAL.id);
		}
	}

	if (constraints.architectureDocRequired) forms.add(ARCHITECTURE_DOC.id);
	if (constraints.apiDocRequired) forms.add(API_DOC.id);
	if (constraints.runbookRequired) forms.add(RUNBOOK.id);
	if (constraints.assuranceCaseRequired) forms.add(ASSURANCE_CASE.id);
	if (constraints.hazardAnalysisRequired) forms.add(HAZARD_ANALYSIS.id);
	if (constraints.riskRegisterRequired) forms.add(RISK_REGISTER.id);

	return forms;
}

/**
 * Extract all Forms for an integrity level
 */
export function extractAllForms(level: IntegrityLevel): Set<string> {
	const testing = deriveTestingConstraints(level);
	const architecture = deriveArchitectureConstraints(level);
	const process = deriveProcessConstraints(level);
	const scoping = deriveScopingConstraints(level);
	const documentation = deriveDocumentationConstraints(level);

	const forms = new Set<string>();

	for (const f of extractTestingForms(testing)) forms.add(f);
	for (const f of extractArchitectureForms(architecture)) forms.add(f);
	for (const f of extractProcessForms(process)) forms.add(f);
	for (const f of extractScopingForms(scoping)) forms.add(f);
	for (const f of extractDocumentationForms(documentation)) forms.add(f);

	return forms;
}

// =============================================================================
// SECTION 4: FORMAL CONTEXT FOR INTEGRITY LEVELS
// =============================================================================

/**
 * Build a FormalContext from IntegrityLevel → Forms
 */
export function buildIntegrityFormsContext(): FormalContext<string, string> {
	const builder = createFormalContextBuilder<string, string>(
		"integrity_forms",
		"Integrity Levels → Forms"
	);

	// Add all integrity levels
	for (const level of [
		IntegrityLevel.LEVEL_0,
		IntegrityLevel.LEVEL_1,
		IntegrityLevel.LEVEL_2,
		IntegrityLevel.LEVEL_3,
		IntegrityLevel.LEVEL_4,
	]) {
		const levelName = `L${level}`;
		const forms = extractAllForms(level);
		builder.addObjectAttributes(levelName, forms);
	}

	return builder.build();
}

/**
 * Cached context instance
 */
let _cachedContext: FormalContext<string, string> | null = null;

/**
 * Get the integrity forms context (cached)
 */
export function getIntegrityFormsContext(): FormalContext<string, string> {
	if (!_cachedContext) {
		_cachedContext = buildIntegrityFormsContext();
	}
	return _cachedContext;
}

/**
 * Get the concept lattice for integrity levels (cached)
 */
let _cachedLattice: ConceptLattice<string, string> | null = null;

export function getIntegrityFormsLattice(): ConceptLattice<string, string> {
	if (!_cachedLattice) {
		_cachedLattice = computeConceptLattice(getIntegrityFormsContext());
	}
	return _cachedLattice;
}

// =============================================================================
// SECTION 5: DELTA OPERATIONS
// =============================================================================

/**
 * Compute what Forms are required by target but not by baseline
 */
export function computeFormsDelta(
	target: IntegrityLevel,
	baseline: IntegrityLevel
): Set<string> {
	const context = getIntegrityFormsContext();
	return computeAttributeDelta(context, `L${target}`, `L${baseline}`);
}

/**
 * Compute symmetric delta (added and removed Forms)
 */
export function computeFormsSymmetricDelta(
	target: IntegrityLevel,
	baseline: IntegrityLevel
): { added: Set<string>; removed: Set<string> } {
	const context = getIntegrityFormsContext();
	return computeAttributeSymmetricDelta(context, `L${target}`, `L${baseline}`);
}

/**
 * Get Forms shared by all specified levels
 */
export function computeSharedForms(levels: IntegrityLevel[]): Set<string> {
	const context = getIntegrityFormsContext();
	const levelNames = new Set(levels.map(l => `L${l}`));
	return deriveAttributes(context, levelNames);
}

/**
 * Get all Forms for a level with rich metadata
 */
export function getFormsForLevel(level: IntegrityLevel): Form[] {
	const formIds = extractAllForms(level);
	return [...formIds].map(id => FORMS[id]).filter((f): f is Form => f !== undefined);
}

/**
 * Get delta Forms with rich metadata
 */
export function getDeltaFormsWithMetadata(
	target: IntegrityLevel,
	baseline: IntegrityLevel
): { form: Form; category: FormCategory }[] {
	const delta = computeFormsDelta(target, baseline);
	return [...delta]
		.map(id => FORMS[id])
		.filter((f): f is Form => f !== undefined)
		.map(f => ({ form: f, category: f.category }));
}

// =============================================================================
// SECTION 6: REPORTING
// =============================================================================

/**
 * Generate a human-readable report of Forms for a level
 */
export function generateFormReport(level: IntegrityLevel): string {
	const forms = getFormsForLevel(level);
	const byCategory = new Map<FormCategory, Form[]>();

	for (const form of forms) {
		const list = byCategory.get(form.category) ?? [];
		list.push(form);
		byCategory.set(form.category, list);
	}

	const lines: string[] = [
		`Forms Required for Integrity Level ${level}`,
		`${"═".repeat(50)}`,
		`Total Forms: ${forms.length}`,
		"",
	];

	for (const category of Object.values(FormCategory)) {
		const categoryForms = byCategory.get(category) ?? [];
		if (categoryForms.length > 0) {
			lines.push(`${category.toUpperCase()} (${categoryForms.length})`);
			lines.push(`${"─".repeat(30)}`);
			for (const form of categoryForms) {
				lines.push(`  • ${form.name}`);
				if (form.threshold) {
					lines.push(`    ${form.threshold.metric} ${form.threshold.operator} ${form.threshold.value}${form.threshold.unit ?? ""}`);
				}
			}
			lines.push("");
		}
	}

	return lines.join("\n");
}

/**
 * Generate a delta report between two levels
 */
export function generateDeltaReport(
	target: IntegrityLevel,
	baseline: IntegrityLevel
): string {
	const { added, removed } = computeFormsSymmetricDelta(target, baseline);

	const lines: string[] = [
		`Form Delta: Level ${baseline} → Level ${target}`,
		`${"═".repeat(50)}`,
		"",
	];

	if (added.size > 0) {
		lines.push(`ADDED (${added.size})`);
		lines.push(`${"─".repeat(30)}`);
		for (const id of added) {
			const form = FORMS[id];
			if (form) {
				lines.push(`  + ${form.name}`);
			}
		}
		lines.push("");
	}

	if (removed.size > 0) {
		lines.push(`REMOVED (${removed.size})`);
		lines.push(`${"─".repeat(30)}`);
		for (const id of removed) {
			const form = FORMS[id];
			if (form) {
				lines.push(`  - ${form.name}`);
			}
		}
		lines.push("");
	}

	if (added.size === 0 && removed.size === 0) {
		lines.push("No difference between levels.");
	}

	return lines.join("\n");
}

/**
 * Generate a cross-table view of all levels and forms
 */
export function generateFormMatrix(): string {
	const context = getIntegrityFormsContext();

	// Use the FCA cross-table generator with custom formatters
	const { contextToCrossTable } = require("./fca-theory");

	return contextToCrossTable(context, {
		objectFormatter: (g: string) => g,
		attributeFormatter: (m: string) => {
			const form = FORMS[m];
			// Truncate to 20 chars for display
			const name = form?.name ?? m;
			return name.length > 20 ? name.substring(0, 17) + "..." : name;
		},
	});
}

