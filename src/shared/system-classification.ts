/**
 * System Classification Module
 *
 * Unified Entry Point for Safety Standards Theory & Universal Risk Framework
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * MODULE STRUCTURE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This module is organized into two branches:
 *
 * 1. THEORETICAL BRANCH (safety-standards-theory.ts)
 *    - Formal lattice algebra for safety integrity levels
 *    - Cross-standard mapping and ordinal functors
 *    - IEC 61508, ISO 26262, DO-178C, ECSS, IEC 62304 definitions
 *    - Probability calculus and composition theorems
 *    - Use for: Cross-standard validation, formal analysis
 *
 * 2. PRACTICAL BRANCH (universal-risk-framework.ts)
 *    - Comprehensive risk assessment across ALL dimensions
 *    - Security, Availability, Data, Organizational, Economic dimensions
 *    - Supply chain, Operational history, Interconnection risk
 *    - Deployment lifecycle and update authority
 *    - Use for: Actual risk assessment, system classification
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * USAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Option 1: Import everything from this file (recommended)
 *   import { SafetyIntegrityLevel, UniversalRiskAssessment } from './system-classification';
 *
 * Option 2: Import from specific branch
 *   import { SIL_LATTICE } from './safety-standards-theory';
 *   import { SecurityClassification } from './universal-risk-framework';
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// =============================================================================
// RE-EXPORT: THEORETICAL BRANCH (Safety Standards Theory)
// =============================================================================

export {
	// Technology Readiness Levels
	TechnologyReadinessLevel,
	TRL_DEFINITIONS,
	type TRLDefinition,

	// IEC 61508 - Safety Integrity Levels
	SafetyIntegrityLevel,
	SIL_DEFINITIONS,
	type SILDefinition,

	// ISO 26262 - Automotive Safety
	AutomotiveSafetyIntegrityLevel,
	ASIL_DEFINITIONS,
	type ASILDefinition,

	// DO-178C - Aviation
	DesignAssuranceLevel,
	DAL_DEFINITIONS,
	type DALDefinition,

	// ECSS - Space
	SpaceSoftwareCriticality,
	SPACE_CRITICALITY_DEFINITIONS,
	type SpaceCriticalityDefinition,

	// IEC 62304 - Medical
	MedicalDeviceSoftwareClass,
	MEDICAL_SOFTWARE_CLASS_DEFINITIONS,
	type MedicalSoftwareClassDefinition,

	// Lattice Algebra (abstract theory from integrity-classification-theory)
	Ordering,
	type OrderedElement,
	type BoundedLattice,
	createBoundedLattice,
	type CompositionStrategy,
	type DecompositionResult,
	decomposeRequirement,
	type UniversalOrdinal,
	toUniversalOrdinal,
	compareAcrossLattices,
	findNearestEquivalent,
	type CrossLatticeMapping,
	type LatticeHomomorphism,
	createNearestHomomorphism,
	type GaloisConnection,
	createGaloisConnection,
	checkGaloisProperty,
	LatticeRegistry,
	globalRegistry,
	describeLattice,
	validateLattice,

	// Lattice Algebra (safety-specific)
	AssessmentMethodology,
	type IntegrityLevel,
	ConsequenceSeverity,
	IEC61508OperatingMode,
	type NumericRange,
	type FailureProbabilityBound,
	type UniversalIntegrityLevel,
	type SafetyStandardStructure,
	StandardIdentifier,
	type StandardHeterogeneity,
	type ConsequenceScaleDescription,
	STANDARDS_UNIVERSE,
	type UniversalOrdinalFunctor,
	createUniversalOrdinalFunctor,
	type SafetyLattice,
	type LatticeVerificationResult,
	verifyLatticeAxioms,

	// Cross-Standard Mapping
	MappingConfidence,
	type ProbabilityBand,
	type CrossStandardMapping,
	CROSS_STANDARD_MAPPING_DISCLAIMER,
	STANDARD_ISOMORPHISM,
	translateIntegrity,
	getUniversalOrdinal,
	getProbabilityBand,
	getMappingConfidence,

	// Concrete Lattices
	SIL_LATTICE,
	createSILLowDemandUniversal,
	ASIL_LATTICE,
	DAL_LATTICE,

	// Composition Theorems
	type CompositionContext,
	DEFAULT_COMPOSITION_CONTEXT,
	composeIntegrityLevels,
	type CompositionResult,
	composeWithContext,
	checkRefinementValid,
	findMinimumLevel,
	isValidASILDecomposition,

	// Risk Calculus
	type RiskAssessment,
	severityToWeight,
	computeUnreducedRisk,
	computeRequiredIntegrity,
	projectToStandard,
	convertPFDtoPFH,
	convertPFHtoPFD,
	calculateRisk,
	deriveRequiredSIL,

	// Architecture Calculations
	calculatePFD_1oo1,
	calculatePFD_1oo2,
	calculatePFD_2oo3,
	calculatePFD_1oo2_Markov,
	calculateArchitectureSIL,

	// Hardware Metrics
	type HardwareMetrics,
	calculateDiagnosticCoverage,
	calculateSFF,
	getArchitecturalConstraintSIL,

	// Fault Tree Analysis
	type FaultTreeGate,
	faultTreeAND,
	faultTreeOR,
	faultTreeVOTE,

	// SIL Verification
	type SILVerificationResult,
	verifySILCompliance,
} from "./safety-standards-theory";

// =============================================================================
// RE-EXPORT: PRACTICAL BRANCH (Universal Risk Framework)
// =============================================================================

export {
	// Security Classification
	SecurityIntegrityLevel,
	type SecurityClassification,
	AttackSurfaceExposure,
	DataSensitivityLevel,
	AuthenticationStrength,
	EncryptionRequirement,
	AuditRequirement,
	ThreatActor,
	SECURITY_LEVEL_DEFINITIONS,

	// Availability Requirements
	AvailabilityTier,
	type AvailabilityRequirements,
	type Duration,
	type TimeWindow,
	GeoRedundancy,
	DisasterRecoveryRequirement,
	AVAILABILITY_TIER_DEFINITIONS,

	// Data Classification
	type DataClassification,
	DataType,
	type DataResidency,
	type CrossBorderRestriction,

	// Organizational Readiness
	type OrganizationalReadiness,
	TeamMaturityLevel,
	ExpertiseLevel,
	TeamStability,
	ProcessMaturityLevel,
	type ResourceAllocation,

	// Economic Impact
	type EconomicImpact,
	type MonetaryAmount,
	ReputationalImpact,
	BusinessCriticality,
	CustomerImpactScope,
	CompetitiveImpact,

	// Supply Chain Risk
	type SupplyChainRisk,
	type DependencyRisk,
	MaintainerHealth,
	type OpenSourceRiskProfile,
	type VendorConcentrationRisk,
	type GeographicSupplyChainRisk,
	SBOMStatus,
	ProvenanceVerification,

	// Operational History
	type OperationalHistory,
	type IncidentHistory,
	IncidentSeverity,
	type SecurityEventHistory,
	type ChangeHistory,
	type TechnicalDebtAssessment,
	type CodeQualityMetrics,
	type AuditHistory,

	// Interconnection Risk
	type InterconnectionRisk,
	type SystemDependency,
	DependencyType,
	type BlastRadius,
	type ImpactScope,
	CascadeFailurePotential,
	IntegrationComplexity,

	// Degraded Mode Capability
	type DegradedModeCapability,
	type DegradedMode,
	type FailSafeState,
	RecoveryAutomation,
	ChaosEngineeringMaturity,

	// System Domain & Scale
	SystemDomain,
	SystemScale,

	// Development Maturity
	DevelopmentMaturity,
	type MaturityDefinition,
	MATURITY_DEFINITIONS,

	// Deployment
	DeploymentEnvironment,
	DeploymentContext,
	RegulatoryDomain,
	DeliveryMechanism,
	PropagationLatency,
	UpdateApplicationMode,
	UpdateAuthorityModel,
	ActorRole,
	UpdateCapability,
	ConsentRequirement,
	type UpdateActor,
	type RollbackCapability,
	type UpdateVelocity,
	type UpdateAuthority,
	type DeploymentLifecycle,

	// Safety Criticality Type
	type SafetyCriticality,

	// Universal Risk Assessment
	type UniversalRiskAssessment,

	// Risk Scoring
	type DimensionRiskScore,
	type RiskProfile,
	RiskTier,
	calculateRiskProfile,

	// Factory Functions
	createMinimalRiskAssessment,
	createWebAppRiskAssessment,
	createSafetyCriticalRiskAssessment,

	// Validation
	type ValidationResult,
	type ValidationIssue,
	validateRiskAssessment,
	trlToMaturity,

	// Engineering Constraints Derivation
	IntegrityLevel,
	ExposureLevel,
	ControllabilityLevel,
	type TestingConstraints,
	type ArchitectureConstraints,
	type ProcessConstraints,
	type ScopingConstraints,
	type DocumentationConstraints,
	type EngineeringConstraints,
	type ConstraintRationale,
	deriveTestingConstraints,
	deriveArchitectureConstraints,
	deriveProcessConstraints,
	deriveScopingConstraints,
	deriveDocumentationConstraints,
	deriveEngineeringConstraints,

	// Impact-Based Integrity Assessment
	type ImpactAssessmentInput,
	computeIntegrityLevel,
	assessProjectConstraints,

	// Compliance Gap Analysis
	type ProjectComplianceStatus,
	type ComplianceGap,
	type ComplianceResult,
	checkProjectCompliance,

	// Constraint Comparison
	compareIntegrityLevels,
} from "./universal-risk-framework";

// =============================================================================
// CONVENIENCE RE-EXPORTS FOR BACKWARD COMPATIBILITY
// =============================================================================

// Legacy type alias - deprecated, use UniversalRiskAssessment instead
import type { UniversalRiskAssessment } from "./universal-risk-framework";

/**
 * @deprecated Use UniversalRiskAssessment instead
 */
export type SystemClassification = UniversalRiskAssessment;

// Legacy factory function - deprecated
import { createMinimalRiskAssessment, SystemDomain } from "./universal-risk-framework";

/**
 * @deprecated Use createMinimalRiskAssessment instead
 */
export function createSystemClassification(
	name: string,
	domain: SystemDomain,
	options?: Partial<UniversalRiskAssessment>,
): UniversalRiskAssessment {
	return {
		...createMinimalRiskAssessment(name, domain),
		...options,
	};
}

// =============================================================================
// MODULE SUMMARY
// =============================================================================

/**
 * Summary of the two-branch architecture:
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                        system-classification.ts                             │
 * │                         (Unified Entry Point)                               │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *                                    │
 *              ┌─────────────────────┴─────────────────────┐
 *              │                                           │
 *              ▼                                           ▼
 * ┌─────────────────────────────┐         ┌─────────────────────────────┐
 * │  safety-standards-theory.ts │         │ universal-risk-framework.ts │
 * │                             │         │                             │
 * │  THEORETICAL BRANCH         │         │  PRACTICAL BRANCH           │
 * │                             │         │                             │
 * │  • Lattice algebra          │         │  • Security classification  │
 * │  • SIL/ASIL/DAL/ECSS/62304  │         │  • Availability (SLA/RTO)   │
 * │  • Cross-standard mapping   │         │  • Data classification      │
 * │  • Probability calculus     │         │  • Organizational readiness │
 * │  • Composition theorems     │         │  • Economic impact          │
 * │  • Architecture analysis    │         │  • Supply chain risk        │
 * │  • Fault tree analysis      │         │  • Operational history      │
 * │                             │         │  • Interconnection risk     │
 * │  Use for:                   │         │  • Degraded mode capability │
 * │  Cross-standard validation  │         │  • Deployment lifecycle     │
 * │  Formal safety analysis     │         │  • Engineering constraints  │
 * │                             │         │  • Compliance gap analysis  │
 * │                             │         │                             │
 * │                             │         │  Use for:                   │
 * │                             │         │  Practical risk assessment  │
 * │                             │         │  System classification      │
 * └─────────────────────────────┘         └─────────────────────────────┘
 *
 * The theoretical branch provides the formal mathematical foundations for
 * comparing safety standards. The practical branch uses those foundations
 * while adding all the dimensions needed for comprehensive risk assessment,
 * engineering constraints derivation, and compliance gap analysis.
 */
