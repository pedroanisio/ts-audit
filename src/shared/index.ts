/**
 * Shared Module - Unified Entry Point
 *
 * Barrel file for Safety Standards & Risk Assessment Framework
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * MODULE STRUCTURE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This module is organized into three layers:
 *
 * 1. ABSTRACT THEORY (lattice-theory.ts)
 *    - Domain-agnostic lattice algebra
 *    - BoundedLattice, OrderedElement, Galois connections
 *    - Use for: Custom classification systems, formal mathematics
 *
 * 2. SAFETY STANDARDS (safety-standards.ts)
 *    - IEC 61508 (SIL), ISO 26262 (ASIL), DO-178C (DAL)
 *    - ECSS (Space), IEC 62304 (Medical)
 *    - Cross-standard mapping and probability calculus
 *    - Use for: Safety-critical systems, formal analysis
 *
 * 3. RISK ASSESSMENT (risk-assessment.ts)
 *    - Comprehensive risk assessment across ALL dimensions
 *    - Security, Availability, Data, Organizational, Economic
 *    - Supply chain, Operational history, Interconnection risk
 *    - Use for: Practical risk assessment, system classification
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * USAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Option 1: Import from this barrel file (recommended)
 *   import { SafetyIntegrityLevel, UniversalRiskAssessment } from './shared';
 *
 * Option 2: Import from specific module
 *   import { SIL_LATTICE } from './shared/safety-standards';
 *   import { SecurityClassification } from './shared/risk-assessment';
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
} from "./safety-standards";

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
} from "./risk-assessment";

// =============================================================================
// CONVENIENCE RE-EXPORTS FOR BACKWARD COMPATIBILITY
// =============================================================================

// Legacy type alias - deprecated, use UniversalRiskAssessment instead
import type { UniversalRiskAssessment } from "./risk-assessment";

/**
 * @deprecated Use UniversalRiskAssessment instead
 */
export type SystemClassification = UniversalRiskAssessment;

// Legacy factory function - deprecated
import { createMinimalRiskAssessment, SystemDomain } from "./risk-assessment";

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
 * Three-layer architecture:
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                              index.ts                                       │
 * │                         (Unified Entry Point)                               │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *                                    │
 *        ┌───────────────────────────┼───────────────────────────┐
 *        │                           │                           │
 *        ▼                           ▼                           ▼
 * ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────────────┐
 * │ lattice-theory   │    │ safety-standards │    │    risk-assessment       │
 * │                  │    │                  │    │                          │
 * │ ABSTRACT MATH    │    │ SAFETY STANDARDS │    │ PRACTICAL ASSESSMENT     │
 * │                  │    │                  │    │                          │
 * │ • BoundedLattice │───▶│ • SIL (IEC61508) │───▶│ • Security classification│
 * │ • OrderedElement │    │ • ASIL (ISO26262)│    │ • Availability (SLA/RTO) │
 * │ • Galois connect │    │ • DAL (DO-178C)  │    │ • Data classification    │
 * │ • Homomorphisms  │    │ • ECSS (Space)   │    │ • Org readiness          │
 * │ • Registry       │    │ • IEC62304 (Med) │    │ • Economic impact        │
 * │ • Composition    │    │ • Probability    │    │ • Supply chain risk      │
 * │                  │    │ • Cross-mapping  │    │ • Engineering constraints│
 * │ Domain-agnostic  │    │                  │    │ • Compliance gap analysis│
 * └──────────────────┘    └──────────────────┘    └──────────────────────────┘
 *
 * DEPENDENCY FLOW: lattice-theory → safety-standards → risk-assessment → index
 */
