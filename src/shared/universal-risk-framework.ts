/**
 * Universal Risk Assessment Framework
 *
 * Practical Branch for Comprehensive Software Risk Assessment
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * PRACTICAL BRANCH: UNIVERSAL RISK ASSESSMENT FRAMEWORK
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This module provides a comprehensive, practical framework for assessing
 * software risk across ALL dimensions, not just safety. It includes:
 *
 * EXISTING DIMENSIONS (from safety-standards-theory):
 * - Safety Criticality (via formal standards)
 * - System Domain & Scale
 * - Development Maturity & TRL
 * - Deployment Environment & Context
 * - Regulatory Compliance
 * - Update Lifecycle (velocity, authority, consent)
 *
 * NEW DIMENSIONS (addressing identified gaps):
 * - Security Classification
 * - Availability Requirements (SLA, RTO, RPO)
 * - Data Classification
 * - Organizational Readiness
 * - Economic Impact
 * - Supply Chain Risk
 * - Operational History
 * - Interconnection/Blast Radius
 * - Degraded Mode Capability
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * DESIGN PRINCIPLES
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 1. COMPLETENESS: Cover all risk dimensions that matter in practice
 * 2. INDEPENDENCE: Each dimension is orthogonal (no double-counting)
 * 3. MEASURABILITY: Each dimension has clear assessment criteria
 * 4. ACTIONABILITY: Assessment results drive concrete decisions
 * 5. COMPOSABILITY: Dimensions can be combined for aggregate risk scores
 */

import {
	// Safety Standards
	SafetyIntegrityLevel,
	AutomotiveSafetyIntegrityLevel,
	DesignAssuranceLevel,
	SpaceSoftwareCriticality,
	MedicalDeviceSoftwareClass,
	TechnologyReadinessLevel,
} from "./safety-standards-theory";

// =============================================================================
// SECTION 1: SECURITY CLASSIFICATION
// =============================================================================

/**
 * Security Integrity Level
 * Inspired by IEC 62443 Security Levels but generalized
 *
 * Reference: IEC 62443-3-3, NIST Cybersecurity Framework
 */
export enum SecurityIntegrityLevel {
	SL_0 = 0, // No security requirements
	SL_1 = 1, // Protection against casual/coincidental violation
	SL_2 = 2, // Protection against intentional violation with low resources
	SL_3 = 3, // Protection against sophisticated attack with moderate resources
	SL_4 = 4, // Protection against state-level actors with extensive resources
}

export interface SecurityClassification {
	/** Target security level */
	level: SecurityIntegrityLevel;

	/** Attack surface exposure */
	attackSurface: AttackSurfaceExposure;

	/** Data sensitivity handled */
	dataSensitivity: DataSensitivityLevel;

	/** Authentication requirements */
	authenticationStrength: AuthenticationStrength;

	/** Encryption requirements */
	encryptionRequirement: EncryptionRequirement;

	/** Audit/logging requirements */
	auditRequirement: AuditRequirement;

	/** Known threat actors */
	threatActors: ThreatActor[];

	/** Justification for the classification */
	justification?: string;
}

export enum AttackSurfaceExposure {
	NONE = "none", // Air-gapped, no external interfaces
	INTERNAL = "internal", // Only accessible within organization
	PARTNER = "partner", // Accessible to trusted partners
	INTERNET = "internet", // Publicly accessible
	CRITICAL_INFRASTRUCTURE = "critical_infrastructure", // Part of critical infrastructure
}

export enum DataSensitivityLevel {
	PUBLIC = "public", // Freely available
	INTERNAL = "internal", // Organization internal
	CONFIDENTIAL = "confidential", // Business sensitive
	RESTRICTED = "restricted", // Highly sensitive (PII, PHI, financial)
	SECRET = "secret", // Classified/regulated
	TOP_SECRET = "top_secret", // Highest classification
}

export enum AuthenticationStrength {
	NONE = "none",
	BASIC = "basic", // Username/password
	STRONG = "strong", // MFA, certificate-based
	HARDWARE = "hardware", // Hardware tokens, smart cards
	BIOMETRIC = "biometric", // Biometric + hardware
}

export enum EncryptionRequirement {
	NONE = "none",
	TRANSPORT = "transport", // TLS for data in transit
	STORAGE = "storage", // Encrypted at rest
	END_TO_END = "end_to_end", // E2E encryption
	HARDWARE = "hardware", // HSM-protected keys
	QUANTUM_SAFE = "quantum_safe", // Post-quantum algorithms
}

export enum AuditRequirement {
	NONE = "none",
	BASIC = "basic", // Error logging
	STANDARD = "standard", // Access logging
	COMPREHENSIVE = "comprehensive", // All operations logged
	IMMUTABLE = "immutable", // Tamper-proof audit trail
	REAL_TIME = "real_time", // Real-time SIEM integration
}

export enum ThreatActor {
	NONE = "none",
	CASUAL = "casual", // Curious individuals
	CRIMINAL = "criminal", // Organized crime
	HACKTIVIST = "hacktivist", // Ideologically motivated
	COMPETITOR = "competitor", // Industrial espionage
	INSIDER = "insider", // Malicious insider
	NATION_STATE = "nation_state", // State-sponsored actors
	TERRORIST = "terrorist", // Terrorist organizations
}

export const SECURITY_LEVEL_DEFINITIONS: Record<SecurityIntegrityLevel, {
	name: string;
	description: string;
	typicalThreats: ThreatActor[];
	requiredControls: string[];
}> = {
	[SecurityIntegrityLevel.SL_0]: {
		name: "No Security Requirements",
		description: "System has no security-relevant functions",
		typicalThreats: [],
		requiredControls: [],
	},
	[SecurityIntegrityLevel.SL_1]: {
		name: "Basic Security",
		description: "Protection against casual or coincidental violation",
		typicalThreats: [ThreatActor.CASUAL],
		requiredControls: ["Basic access control", "Password authentication"],
	},
	[SecurityIntegrityLevel.SL_2]: {
		name: "Standard Security",
		description: "Protection against intentional violation using simple means",
		typicalThreats: [ThreatActor.CASUAL, ThreatActor.CRIMINAL],
		requiredControls: ["Strong authentication", "Network segmentation", "Logging"],
	},
	[SecurityIntegrityLevel.SL_3]: {
		name: "High Security",
		description: "Protection against sophisticated attacks with moderate resources",
		typicalThreats: [ThreatActor.CRIMINAL, ThreatActor.HACKTIVIST, ThreatActor.COMPETITOR],
		requiredControls: ["MFA", "Encryption at rest", "IDS/IPS", "Security monitoring"],
	},
	[SecurityIntegrityLevel.SL_4]: {
		name: "Maximum Security",
		description: "Protection against state-level actors with extensive resources",
		typicalThreats: [ThreatActor.NATION_STATE, ThreatActor.TERRORIST],
		requiredControls: ["Hardware security modules", "Air-gapping", "Formal verification", "Red team testing"],
	},
};

// =============================================================================
// SECTION 2: AVAILABILITY REQUIREMENTS
// =============================================================================

/**
 * Availability Tier based on uptime requirements
 */
export enum AvailabilityTier {
	TIER_0 = 0, // Best effort, no SLA
	TIER_1 = 1, // 99% (3.65 days downtime/year)
	TIER_2 = 2, // 99.9% (8.76 hours downtime/year)
	TIER_3 = 3, // 99.99% (52.6 minutes downtime/year)
	TIER_4 = 4, // 99.999% (5.26 minutes downtime/year)
	TIER_5 = 5, // 99.9999% (31.5 seconds downtime/year)
}

export interface AvailabilityRequirements {
	/** Target availability tier */
	tier: AvailabilityTier;

	/** Target uptime percentage */
	uptimeTarget: number;

	/** Recovery Time Objective - max time to restore service */
	rto: Duration;

	/** Recovery Point Objective - max data loss acceptable */
	rpo: Duration;

	/** Mean Time Between Failures target */
	mtbf?: Duration;

	/** Mean Time To Recovery target */
	mttr?: Duration;

	/** Maintenance windows allowed? */
	maintenanceWindowAllowed: boolean;

	/** Peak hours definition (when SLA is stricter) */
	peakHours?: TimeWindow;

	/** Geographic redundancy requirements */
	geoRedundancy: GeoRedundancy;

	/** Disaster recovery requirements */
	disasterRecovery: DisasterRecoveryRequirement;
}

export interface Duration {
	value: number;
	unit: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years";
}

export interface TimeWindow {
	startHour: number; // 0-23
	endHour: number; // 0-23
	timezone: string;
	daysOfWeek: number[]; // 0=Sunday, 6=Saturday
}

export enum GeoRedundancy {
	NONE = "none", // Single location
	SAME_REGION = "same_region", // Multiple AZs in same region
	MULTI_REGION = "multi_region", // Multiple regions, same continent
	GLOBAL = "global", // Multiple continents
}

export enum DisasterRecoveryRequirement {
	NONE = "none", // No DR
	COLD = "cold", // Backup data, rebuild on demand
	WARM = "warm", // Standby infrastructure, data replication
	HOT = "hot", // Active-active, real-time replication
	INSTANT = "instant", // Zero-downtime failover
}

export const AVAILABILITY_TIER_DEFINITIONS: Record<AvailabilityTier, {
	name: string;
	uptimePercent: number;
	downtimePerYear: string;
	typicalApplications: string[];
}> = {
	[AvailabilityTier.TIER_0]: {
		name: "Best Effort",
		uptimePercent: 0,
		downtimePerYear: "Unlimited",
		typicalApplications: ["Development environments", "Internal tools", "Batch jobs"],
	},
	[AvailabilityTier.TIER_1]: {
		name: "Standard",
		uptimePercent: 99,
		downtimePerYear: "3.65 days",
		typicalApplications: ["Internal applications", "Non-critical services"],
	},
	[AvailabilityTier.TIER_2]: {
		name: "High Availability",
		uptimePercent: 99.9,
		downtimePerYear: "8.76 hours",
		typicalApplications: ["Business applications", "Customer-facing websites"],
	},
	[AvailabilityTier.TIER_3]: {
		name: "Mission Critical",
		uptimePercent: 99.99,
		downtimePerYear: "52.6 minutes",
		typicalApplications: ["E-commerce", "Banking", "Healthcare"],
	},
	[AvailabilityTier.TIER_4]: {
		name: "Carrier Grade",
		uptimePercent: 99.999,
		downtimePerYear: "5.26 minutes",
		typicalApplications: ["Telecom", "Emergency services", "Stock exchanges"],
	},
	[AvailabilityTier.TIER_5]: {
		name: "Ultra High Availability",
		uptimePercent: 99.9999,
		downtimePerYear: "31.5 seconds",
		typicalApplications: ["Nuclear control", "Life support", "Air traffic control"],
	},
};

// =============================================================================
// SECTION 3: DATA CLASSIFICATION
// =============================================================================

/**
 * Comprehensive data classification for risk assessment
 */
export interface DataClassification {
	/** Types of data handled by the system */
	dataTypes: DataType[];

	/** Highest sensitivity level of any data */
	maxSensitivity: DataSensitivityLevel;

	/** Data residency requirements */
	residencyRequirements: DataResidency[];

	/** Retention requirements */
	retentionPeriod: Duration;

	/** Right to be forgotten applicable? */
	rightToErasure: boolean;

	/** Data minimization required? */
	dataMinimization: boolean;

	/** Consent management required? */
	consentRequired: boolean;

	/** Cross-border transfer restrictions */
	crossBorderRestrictions: CrossBorderRestriction[];
}

export enum DataType {
	// Personal Data
	PII = "pii", // Personally Identifiable Information
	PHI = "phi", // Protected Health Information
	PCI = "pci", // Payment Card Industry data
	BIOMETRIC = "biometric", // Biometric data
	GENETIC = "genetic", // Genetic data
	LOCATION = "location", // Location/tracking data
	BEHAVIORAL = "behavioral", // Behavioral/preference data

	// Business Data
	FINANCIAL = "financial", // Financial records
	TRADE_SECRET = "trade_secret", // Trade secrets
	INTELLECTUAL_PROPERTY = "intellectual_property", // IP
	STRATEGIC = "strategic", // Strategic plans

	// Regulated Data
	CLASSIFIED = "classified", // Government classified
	EXPORT_CONTROLLED = "export_controlled", // ITAR/EAR controlled
	LEGAL_PRIVILEGED = "legal_privileged", // Attorney-client privilege

	// Technical Data
	CREDENTIALS = "credentials", // Passwords, keys, tokens
	SECURITY_LOGS = "security_logs", // Security event logs
	AUDIT_TRAILS = "audit_trails", // Audit records

	// General
	PUBLIC = "public", // Publicly available
	INTERNAL = "internal", // Internal business data
}

export interface DataResidency {
	dataTypes: DataType[];
	allowedRegions: string[]; // ISO country codes or region names
	prohibitedRegions: string[];
	regulatoryBasis: string; // e.g., "GDPR", "CCPA", "China PIPL"
}

export interface CrossBorderRestriction {
	dataTypes: DataType[];
	restriction: "prohibited" | "requires_adequacy" | "requires_contract" | "requires_consent";
	regulatoryBasis: string;
}

// =============================================================================
// SECTION 4: ORGANIZATIONAL READINESS
// =============================================================================

/**
 * Organizational capability to develop and maintain the system
 */
export interface OrganizationalReadiness {
	/** Team maturity level */
	teamMaturity: TeamMaturityLevel;

	/** Domain expertise level */
	domainExpertise: ExpertiseLevel;

	/** Technology expertise level */
	technologyExpertise: ExpertiseLevel;

	/** Safety/security expertise (if required) */
	safetyExpertise?: ExpertiseLevel;

	/** Team stability */
	teamStability: TeamStability;

	/** Process maturity (CMMI-like) */
	processMaturity: ProcessMaturityLevel;

	/** Available resources */
	resourceAllocation: ResourceAllocation;

	/** External dependencies on expertise */
	externalExpertiseDependencies: string[];
}

export enum TeamMaturityLevel {
	FORMING = "forming", // New team, establishing norms
	STORMING = "storming", // Conflict resolution phase
	NORMING = "norming", // Cohesion developing
	PERFORMING = "performing", // High-functioning team
	ADJOURNING = "adjourning", // Disbanding/transitioning
}

export enum ExpertiseLevel {
	NONE = "none", // No expertise
	NOVICE = "novice", // Basic understanding
	COMPETENT = "competent", // Can perform independently
	PROFICIENT = "proficient", // Deep understanding
	EXPERT = "expert", // Industry-recognized expertise
}

export enum TeamStability {
	VOLATILE = "volatile", // >50% turnover annually
	UNSTABLE = "unstable", // 25-50% turnover annually
	MODERATE = "moderate", // 10-25% turnover annually
	STABLE = "stable", // <10% turnover annually
	VERY_STABLE = "very_stable", // Core team unchanged for years
}

export enum ProcessMaturityLevel {
	INITIAL = 1, // Ad-hoc, chaotic
	MANAGED = 2, // Processes defined for projects
	DEFINED = 3, // Processes defined for organization
	QUANTITATIVELY_MANAGED = 4, // Processes measured and controlled
	OPTIMIZING = 5, // Continuous improvement
}

export interface ResourceAllocation {
	/** Full-time equivalents allocated */
	fte: number;

	/** Budget adequacy */
	budgetAdequacy: "insufficient" | "constrained" | "adequate" | "well_funded";

	/** Time pressure */
	scheduleConstraint: "critical" | "tight" | "reasonable" | "flexible";

	/** Tool/infrastructure availability */
	toolingAdequacy: "insufficient" | "basic" | "adequate" | "comprehensive";
}

// =============================================================================
// SECTION 5: ECONOMIC IMPACT
// =============================================================================

/**
 * Economic/business impact assessment
 */
export interface EconomicImpact {
	/** Revenue at risk if system fails */
	revenueAtRisk: MonetaryAmount;

	/** Revenue impact per hour of downtime */
	downtimeRevenueImpact: MonetaryAmount;

	/** Regulatory penalty exposure */
	regulatoryPenaltyExposure: MonetaryAmount;

	/** Litigation exposure */
	litigationExposure: MonetaryAmount;

	/** Reputational impact */
	reputationalImpact: ReputationalImpact;

	/** Business criticality */
	businessCriticality: BusinessCriticality;

	/** Customer impact scope */
	customerImpactScope: CustomerImpactScope;

	/** Competitive impact */
	competitiveImpact: CompetitiveImpact;
}

export interface MonetaryAmount {
	value: number;
	currency: string;
	period?: "per_hour" | "per_day" | "per_incident" | "per_year" | "total";
}

export enum ReputationalImpact {
	NONE = "none",
	MINOR = "minor", // Internal awareness only
	MODERATE = "moderate", // Limited media coverage
	SIGNIFICANT = "significant", // Industry-wide awareness
	SEVERE = "severe", // National/international news
	CATASTROPHIC = "catastrophic", // Brand-defining incident
}

export enum BusinessCriticality {
	NICE_TO_HAVE = "nice_to_have", // Convenience feature
	OPERATIONAL = "operational", // Supports operations
	IMPORTANT = "important", // Significant business function
	CRITICAL = "critical", // Core business function
	EXISTENTIAL = "existential", // Business cannot function without it
}

export enum CustomerImpactScope {
	NONE = "none",
	SINGLE_USER = "single_user",
	TEAM = "team",
	DEPARTMENT = "department",
	ORGANIZATION = "organization",
	MULTIPLE_ORGANIZATIONS = "multiple_organizations",
	PUBLIC = "public",
}

export enum CompetitiveImpact {
	NONE = "none",
	MINOR = "minor", // Slight advantage lost
	MODERATE = "moderate", // Competitive parity affected
	SIGNIFICANT = "significant", // Market share at risk
	SEVERE = "severe", // Major competitive disadvantage
}

// =============================================================================
// SECTION 6: SUPPLY CHAIN RISK
// =============================================================================

/**
 * Supply chain and dependency risk assessment
 */
export interface SupplyChainRisk {
	/** Third-party dependencies */
	dependencies: DependencyRisk[];

	/** Open source risk profile */
	openSourceProfile: OpenSourceRiskProfile;

	/** Vendor concentration risk */
	vendorConcentration: VendorConcentrationRisk;

	/** Geographic supply chain risk */
	geographicRisk: GeographicSupplyChainRisk;

	/** SBOM (Software Bill of Materials) status */
	sbomStatus: SBOMStatus;

	/** Provenance verification */
	provenanceVerification: ProvenanceVerification;
}

export interface DependencyRisk {
	name: string;
	type: "runtime" | "build" | "dev" | "optional";
	criticality: "low" | "medium" | "high" | "critical";
	maintainerHealth: MaintainerHealth;
	lastUpdate: Date;
	knownVulnerabilities: number;
	license: string;
	alternatives: string[];
}

export enum MaintainerHealth {
	ABANDONED = "abandoned", // No updates in >2 years
	MINIMAL = "minimal", // Occasional security patches only
	MAINTAINED = "maintained", // Regular updates
	ACTIVE = "active", // Frequent updates, responsive maintainers
	COMMERCIAL = "commercial", // Commercially supported
}

export interface OpenSourceRiskProfile {
	/** Percentage of codebase from open source */
	openSourcePercentage: number;

	/** Number of direct dependencies */
	directDependencies: number;

	/** Number of transitive dependencies */
	transitiveDependencies: number;

	/** Dependencies with known vulnerabilities */
	vulnerableDependencies: number;

	/** Dependencies with restrictive licenses */
	restrictiveLicenses: string[];

	/** Dependencies from single maintainers */
	singleMaintainerDependencies: number;
}

export interface VendorConcentrationRisk {
	/** Primary vendor dependency */
	primaryVendor?: string;

	/** Percentage of stack from primary vendor */
	primaryVendorPercentage: number;

	/** Vendor lock-in severity */
	lockInSeverity: "none" | "low" | "moderate" | "high" | "total";

	/** Migration difficulty if vendor fails */
	migrationDifficulty: "trivial" | "easy" | "moderate" | "difficult" | "impractical";
}

export interface GeographicSupplyChainRisk {
	/** Countries of origin for key dependencies */
	countriesOfOrigin: string[];

	/** Potential sanctions/export control issues */
	sanctionsRisk: "none" | "low" | "moderate" | "high";

	/** Geopolitical stability of key sources */
	geopoliticalRisk: "stable" | "uncertain" | "unstable" | "hostile";
}

export enum SBOMStatus {
	NONE = "none", // No SBOM
	PARTIAL = "partial", // Incomplete SBOM
	COMPLETE = "complete", // Complete SBOM exists
	VERIFIED = "verified", // SBOM verified against actual
	AUTOMATED = "automated", // SBOM generated automatically in CI/CD
}

export enum ProvenanceVerification {
	NONE = "none", // No verification
	MANUAL = "manual", // Manual verification of sources
	SIGNATURES = "signatures", // Cryptographic signatures verified
	REPRODUCIBLE = "reproducible", // Reproducible builds
	ATTESTED = "attested", // SLSA or similar attestation
}

// =============================================================================
// SECTION 7: OPERATIONAL HISTORY
// =============================================================================

/**
 * Historical operational data for risk assessment
 */
export interface OperationalHistory {
	/** Age of the system */
	systemAge: Duration;

	/** Operational incidents */
	incidents: IncidentHistory;

	/** Security events */
	securityEvents: SecurityEventHistory;

	/** Change history */
	changeHistory: ChangeHistory;

	/** Technical debt assessment */
	technicalDebt: TechnicalDebtAssessment;

	/** Audit history */
	auditHistory: AuditHistory;
}

export interface IncidentHistory {
	/** Total incidents in assessment period */
	totalIncidents: number;

	/** Incidents by severity */
	bySeverity: Record<IncidentSeverity, number>;

	/** Mean Time Between Incidents */
	mtbi: Duration;

	/** Mean Time To Resolve */
	mttr: Duration;

	/** Repeat incident rate */
	repeatRate: number; // Percentage

	/** Root causes identified */
	rootCausesIdentified: number;

	/** Root causes addressed */
	rootCausesAddressed: number;

	/** Assessment period */
	assessmentPeriod: Duration;
}

export enum IncidentSeverity {
	SEV_1 = 1, // Critical - major outage
	SEV_2 = 2, // High - significant impact
	SEV_3 = 3, // Medium - limited impact
	SEV_4 = 4, // Low - minimal impact
	SEV_5 = 5, // Informational - no impact
}

export interface SecurityEventHistory {
	/** Total security events */
	totalEvents: number;

	/** Confirmed breaches */
	confirmedBreaches: number;

	/** Vulnerabilities discovered */
	vulnerabilitiesDiscovered: number;

	/** Vulnerabilities patched */
	vulnerabilitiesPatched: number;

	/** Mean time to patch critical vulnerabilities */
	criticalPatchTime: Duration;

	/** Penetration tests conducted */
	penTestsConducted: number;

	/** Last pen test date */
	lastPenTest?: Date;
}

export interface ChangeHistory {
	/** Deployments in assessment period */
	deploymentsCount: number;

	/** Failed deployments */
	failedDeployments: number;

	/** Rollbacks required */
	rollbacksRequired: number;

	/** Change failure rate */
	changeFailureRate: number; // Percentage

	/** Lead time for changes */
	leadTime: Duration;

	/** Deployment frequency */
	deploymentFrequency: "on_demand" | "daily" | "weekly" | "monthly" | "quarterly";
}

export interface TechnicalDebtAssessment {
	/** Estimated debt magnitude */
	magnitude: "low" | "moderate" | "high" | "critical";

	/** Debt growth trend */
	trend: "decreasing" | "stable" | "increasing" | "accelerating";

	/** Known issues count */
	knownIssues: number;

	/** Code quality metrics */
	codeQuality: CodeQualityMetrics;

	/** Test coverage */
	testCoverage: number; // Percentage

	/** Documentation coverage */
	documentationCoverage: "none" | "minimal" | "partial" | "comprehensive";
}

export interface CodeQualityMetrics {
	/** Cyclomatic complexity (average) */
	avgComplexity: number;

	/** Duplication percentage */
	duplication: number;

	/** Static analysis issues */
	staticAnalysisIssues: {
		critical: number;
		major: number;
		minor: number;
	};
}

export interface AuditHistory {
	/** Audits conducted */
	auditsCount: number;

	/** Last audit date */
	lastAudit?: Date;

	/** Findings by severity */
	findings: {
		critical: number;
		major: number;
		minor: number;
		observation: number;
	};

	/** Findings closed */
	findingsClosed: number;

	/** Overdue findings */
	findingsOverdue: number;
}

// =============================================================================
// SECTION 8: INTERCONNECTION / BLAST RADIUS
// =============================================================================

/**
 * System interconnection and blast radius assessment
 */
export interface InterconnectionRisk {
	/** Systems that depend on this system */
	downstreamDependents: SystemDependency[];

	/** Systems this system depends on */
	upstreamDependencies: SystemDependency[];

	/** Blast radius if this system fails */
	blastRadius: BlastRadius;

	/** Cascade failure potential */
	cascadeFailurePotential: CascadeFailurePotential;

	/** Integration complexity */
	integrationComplexity: IntegrationComplexity;
}

export interface SystemDependency {
	/** System identifier */
	systemId: string;

	/** System name */
	systemName: string;

	/** Dependency type */
	dependencyType: DependencyType;

	/** Coupling strength */
	couplingStrength: "loose" | "moderate" | "tight";

	/** Failure isolation */
	failureIsolation: "complete" | "partial" | "none";

	/** Degraded mode possible? */
	degradedModePossible: boolean;

	/** SLA/criticality of dependent */
	dependentCriticality: BusinessCriticality;
}

export enum DependencyType {
	SYNC_REQUEST = "sync_request", // Synchronous API calls
	ASYNC_MESSAGE = "async_message", // Async messaging
	SHARED_DATA = "shared_data", // Shared database/state
	SHARED_INFRASTRUCTURE = "shared_infra", // Shared infrastructure
	AUTHENTICATION = "authentication", // Auth dependency
	MONITORING = "monitoring", // Monitoring/observability
}

export interface BlastRadius {
	/** Direct impact scope */
	directImpact: ImpactScope;

	/** Indirect/cascade impact scope */
	indirectImpact: ImpactScope;

	/** Estimated users affected */
	usersAffected: number;

	/** Revenue impact per hour */
	revenueImpactPerHour: MonetaryAmount;

	/** Regulatory exposure */
	regulatoryExposure: "none" | "limited" | "significant" | "critical";
}

export interface ImpactScope {
	systemsAffected: number;
	teamsAffected: number;
	businessUnitsAffected: number;
	externalPartiesAffected: number;
}

export enum CascadeFailurePotential {
	NONE = "none", // No cascade possible
	LOW = "low", // Unlikely to cascade
	MODERATE = "moderate", // Some cascade potential
	HIGH = "high", // Likely to cascade
	CRITICAL = "critical", // Known cascade paths
}

export enum IntegrationComplexity {
	STANDALONE = "standalone", // No integrations
	SIMPLE = "simple", // Few, well-defined integrations
	MODERATE = "moderate", // Multiple integrations, manageable
	COMPLEX = "complex", // Many integrations, some fragile
	HIGHLY_COMPLEX = "highly_complex", // Spaghetti integrations
}

// =============================================================================
// SECTION 9: DEGRADED MODE CAPABILITY
// =============================================================================

/**
 * System's ability to operate in degraded states
 */
export interface DegradedModeCapability {
	/** Defined degraded modes */
	degradedModes: DegradedMode[];

	/** Graceful degradation supported? */
	gracefulDegradation: boolean;

	/** Fail-safe state defined? */
	failSafeState: FailSafeState | null;

	/** Recovery automation level */
	recoveryAutomation: RecoveryAutomation;

	/** Chaos engineering maturity */
	chaosEngineeringMaturity: ChaosEngineeringMaturity;
}

export interface DegradedMode {
	name: string;
	description: string;
	trigger: string; // What causes this mode
	capabilities: string[]; // What still works
	limitations: string[]; // What doesn't work
	slaInDegradedMode: number; // Reduced SLA percentage
	maxDuration: Duration;
	recoveryPath: string;
}

export interface FailSafeState {
	description: string;
	triggeredBy: string[];
	stateCharacteristics: string[];
	dataPreservation: "none" | "partial" | "complete";
	humanInterventionRequired: boolean;
	recoveryProcedure: string;
}

export enum RecoveryAutomation {
	MANUAL = "manual", // All recovery is manual
	SEMI_AUTOMATED = "semi_automated", // Some automated recovery
	AUTOMATED = "automated", // Most recovery automated
	SELF_HEALING = "self_healing", // System heals automatically
}

export enum ChaosEngineeringMaturity {
	NONE = "none", // No chaos engineering
	EXPERIMENTAL = "experimental", // Occasional experiments
	REGULAR = "regular", // Regular chaos testing
	CONTINUOUS = "continuous", // Continuous chaos in production
	ADVANCED = "advanced", // Advanced chaos practices (game days, etc.)
}

// =============================================================================
// SECTION 10: SYSTEM DOMAIN & SCALE (from original)
// =============================================================================

/**
 * System domain classification
 */
export enum SystemDomain {
	// Software Types
	WEB_APPLICATION = "web_application",
	MOBILE_APPLICATION = "mobile_application",
	DESKTOP_APPLICATION = "desktop_application",
	CLI_TOOL = "cli_tool",
	LIBRARY = "library",
	FRAMEWORK = "framework",
	API_SERVICE = "api_service",
	MICROSERVICE = "microservice",
	SERVERLESS_FUNCTION = "serverless_function",

	// System Software
	OPERATING_SYSTEM = "operating_system",
	KERNEL = "kernel",
	DEVICE_DRIVER = "device_driver",
	BOOTLOADER = "bootloader",
	HYPERVISOR = "hypervisor",
	CONTAINER_RUNTIME = "container_runtime",

	// Embedded & Firmware
	FIRMWARE = "firmware",
	EMBEDDED_SYSTEM = "embedded_system",
	RTOS_APPLICATION = "rtos_application",
	PLC_PROGRAM = "plc_program",
	FPGA_BITSTREAM = "fpga_bitstream",

	// Data & AI
	DATA_PIPELINE = "data_pipeline",
	ML_MODEL = "ml_model",
	AI_AGENT = "ai_agent",
	ANALYTICS_PLATFORM = "analytics_platform",

	// Infrastructure
	INFRASTRUCTURE_AS_CODE = "infrastructure_as_code",
	CI_CD_PIPELINE = "ci_cd_pipeline",
	MONITORING_SYSTEM = "monitoring_system",

	// Specialized
	GAME = "game",
	BLOCKCHAIN_CONTRACT = "blockchain_contract",
	SCIENTIFIC_COMPUTATION = "scientific_computation",
	SIMULATION = "simulation",

	// Hardware-Adjacent
	CAD_MODEL = "cad_model",
	PCB_DESIGN = "pcb_design",
	ASIC_RTL = "asic_rtl",
}

export enum SystemScale {
	SCRIPT = "script", // Single file, <500 LOC
	MODULE = "module", // Single module, <5K LOC
	COMPONENT = "component", // Multiple modules, <50K LOC
	APPLICATION = "application", // Full application, <500K LOC
	SYSTEM = "system", // Multiple applications, <5M LOC
	SYSTEM_OF_SYSTEMS = "system_of_systems", // Multiple integrated systems
	ENTERPRISE = "enterprise", // Organization-wide platform
}

// =============================================================================
// SECTION 11: DEVELOPMENT MATURITY
// =============================================================================

export enum DevelopmentMaturity {
	IDEA = "idea",
	SPIKE = "spike",
	PROOF_OF_CONCEPT = "proof_of_concept",
	PROTOTYPE = "prototype",
	ALPHA = "alpha",
	BETA = "beta",
	RELEASE_CANDIDATE = "release_candidate",
	GENERAL_AVAILABILITY = "general_availability",
	MATURE = "mature",
	LEGACY = "legacy",
	END_OF_LIFE = "end_of_life",
	DEPRECATED = "deprecated",
}

export interface MaturityDefinition {
	stage: DevelopmentMaturity;
	name: string;
	description: string;
	trlEquivalent?: TechnologyReadinessLevel;
	typicalDuration?: string;
	exitCriteria: string[];
}

export const MATURITY_DEFINITIONS: Record<DevelopmentMaturity, MaturityDefinition> = {
	[DevelopmentMaturity.IDEA]: {
		stage: DevelopmentMaturity.IDEA,
		name: "Idea",
		description: "Conceptual stage. Problem identified, solution hypothesized.",
		trlEquivalent: TechnologyReadinessLevel.TRL_1,
		typicalDuration: "Days to weeks",
		exitCriteria: ["Problem statement documented", "Initial solution concept"],
	},
	[DevelopmentMaturity.SPIKE]: {
		stage: DevelopmentMaturity.SPIKE,
		name: "Spike",
		description: "Time-boxed technical investigation.",
		trlEquivalent: TechnologyReadinessLevel.TRL_2,
		typicalDuration: "Hours to days",
		exitCriteria: ["Technical question answered", "Feasibility determined"],
	},
	[DevelopmentMaturity.PROOF_OF_CONCEPT]: {
		stage: DevelopmentMaturity.PROOF_OF_CONCEPT,
		name: "Proof of Concept",
		description: "Demonstrates feasibility. Not production-ready.",
		trlEquivalent: TechnologyReadinessLevel.TRL_3,
		typicalDuration: "Days to weeks",
		exitCriteria: ["Core concept demonstrated", "Stakeholder buy-in"],
	},
	[DevelopmentMaturity.PROTOTYPE]: {
		stage: DevelopmentMaturity.PROTOTYPE,
		name: "Prototype",
		description: "Working model with basic functionality.",
		trlEquivalent: TechnologyReadinessLevel.TRL_4,
		typicalDuration: "Weeks to months",
		exitCriteria: ["Core features working", "User feedback collected"],
	},
	[DevelopmentMaturity.ALPHA]: {
		stage: DevelopmentMaturity.ALPHA,
		name: "Alpha",
		description: "First testable version. Feature incomplete.",
		trlEquivalent: TechnologyReadinessLevel.TRL_5,
		typicalDuration: "Months",
		exitCriteria: ["Core features complete", "Internal testing started"],
	},
	[DevelopmentMaturity.BETA]: {
		stage: DevelopmentMaturity.BETA,
		name: "Beta",
		description: "Feature complete but may have bugs.",
		trlEquivalent: TechnologyReadinessLevel.TRL_6,
		typicalDuration: "Months",
		exitCriteria: ["All features complete", "External beta testing"],
	},
	[DevelopmentMaturity.RELEASE_CANDIDATE]: {
		stage: DevelopmentMaturity.RELEASE_CANDIDATE,
		name: "Release Candidate",
		description: "Potentially shippable. Final testing.",
		trlEquivalent: TechnologyReadinessLevel.TRL_7,
		typicalDuration: "Weeks",
		exitCriteria: ["All tests passing", "Documentation complete"],
	},
	[DevelopmentMaturity.GENERAL_AVAILABILITY]: {
		stage: DevelopmentMaturity.GENERAL_AVAILABILITY,
		name: "General Availability",
		description: "Production release. Fully supported.",
		trlEquivalent: TechnologyReadinessLevel.TRL_8,
		typicalDuration: "Ongoing",
		exitCriteria: ["Released to production", "Support in place"],
	},
	[DevelopmentMaturity.MATURE]: {
		stage: DevelopmentMaturity.MATURE,
		name: "Mature",
		description: "Stable, well-understood, battle-tested.",
		trlEquivalent: TechnologyReadinessLevel.TRL_9,
		typicalDuration: "Years",
		exitCriteria: ["Extended production use", "Low defect rate"],
	},
	[DevelopmentMaturity.LEGACY]: {
		stage: DevelopmentMaturity.LEGACY,
		name: "Legacy",
		description: "Still in use but not actively developed.",
		exitCriteria: ["Active development stopped", "Replacement planned"],
	},
	[DevelopmentMaturity.END_OF_LIFE]: {
		stage: DevelopmentMaturity.END_OF_LIFE,
		name: "End of Life",
		description: "No longer supported.",
		exitCriteria: ["Support ended", "Migration path provided"],
	},
	[DevelopmentMaturity.DEPRECATED]: {
		stage: DevelopmentMaturity.DEPRECATED,
		name: "Deprecated",
		description: "Marked for removal.",
		exitCriteria: ["Deprecation announced", "Replacement available"],
	},
};

// =============================================================================
// SECTION 12: DEPLOYMENT ENVIRONMENT & CONTEXT
// =============================================================================

export enum DeploymentEnvironment {
	LOCAL = "local",
	DEV = "dev",
	INTEGRATION = "integration",
	TEST = "test",
	QA = "qa",
	STAGING = "staging",
	UAT = "uat",
	PERFORMANCE = "performance",
	PRODUCTION = "production",
	DISASTER_RECOVERY = "disaster_recovery",
	AIR_GAPPED = "air_gapped",
	CLASSIFIED = "classified",
	SANDBOX = "sandbox",
}

export enum DeploymentContext {
	PUBLIC_CLOUD = "public_cloud",
	PRIVATE_CLOUD = "private_cloud",
	HYBRID_CLOUD = "hybrid_cloud",
	MULTI_CLOUD = "multi_cloud",
	ON_PREMISE_DATACENTER = "on_premise_datacenter",
	EDGE = "edge",
	FOG = "fog",
	EMBEDDED_DEVICE = "embedded_device",
	IOT_DEVICE = "iot_device",
	MOBILE_DEVICE = "mobile_device",
	WEARABLE = "wearable",
	VEHICLE = "vehicle",
	AIRCRAFT = "aircraft",
	SPACECRAFT = "spacecraft",
	SUBMARINE = "submarine",
	INDUSTRIAL_PLANT = "industrial_plant",
	MEDICAL_DEVICE = "medical_device",
	BROWSER = "browser",
	CDN = "cdn",
}

// =============================================================================
// SECTION 13: REGULATORY DOMAIN
// =============================================================================

export enum RegulatoryDomain {
	NONE = "none",

	// Healthcare/Medical
	FDA_21_CFR_PART_11 = "fda_21_cfr_part_11",
	FDA_CLASS_I = "fda_class_i",
	FDA_CLASS_II = "fda_class_ii",
	FDA_CLASS_III = "fda_class_iii",
	IEC_62304 = "iec_62304",
	HIPAA = "hipaa",

	// Financial
	SOX = "sox",
	PCI_DSS = "pci_dss",
	BASEL_III = "basel_iii",

	// Privacy
	GDPR = "gdpr",
	CCPA = "ccpa",
	LGPD = "lgpd",

	// Government/Defense
	FISMA = "fisma",
	FEDRAMP = "fedramp",
	ITAR = "itar",
	EAR = "ear",
	NIST_800_53 = "nist_800_53",
	CMMC = "cmmc",

	// Aviation
	DO_178C = "do_178c",
	DO_254 = "do_254",

	// Automotive
	ISO_26262 = "iso_26262",
	UNECE_R155 = "unece_r155",
	UNECE_R156 = "unece_r156",

	// Industrial
	IEC_61508 = "iec_61508",
	IEC_62443 = "iec_62443",

	// Railway
	EN_50128 = "en_50128",

	// Quality/Process
	ISO_9001 = "iso_9001",
	ASPICE = "aspice",

	// Space
	ECSS_E_ST_40C = "ecss_e_st_40c",
	NASA_STD_8739_8 = "nasa_std_8739_8",

	// Telecommunications
	FCC = "fcc",
	ETSI = "etsi",

	// General
	ISO_27001 = "iso_27001",
	SOC_2 = "soc_2",
}

// =============================================================================
// SECTION 14: DELIVERY MECHANISM & UPDATE LIFECYCLE
// =============================================================================

export enum DeliveryMechanism {
	BROWSER_RENDER = "browser_render",
	REPL_EXECUTION = "repl_execution",
	SERVERLESS_INVOCATION = "serverless_invoke",
	CONTAINER_IMAGE = "container_image",
	VM_IMAGE = "vm_image",
	UNIKERNEL = "unikernel",
	PACKAGE_REGISTRY = "package_registry",
	OS_PACKAGE = "os_package",
	APP_STORE = "app_store",
	ENTERPRISE_MDM = "enterprise_mdm",
	DOWNLOADABLE_BINARY = "downloadable_binary",
	SIDE_LOAD = "side_load",
	FLASH_MEMORY = "flash_memory",
	EEPROM_BURN = "eeprom_burn",
	OTP_FUSE = "otp_fuse",
	JTAG_DEBUG = "jtag_debug",
	OTA_UPDATE = "ota_update",
	BOOTLOADER_UPDATE = "bootloader_update",
	FPGA_BITSTREAM = "fpga_bitstream",
	ASIC_TAPE_OUT = "asic_tape_out",
	PHYSICAL_MEDIA = "physical_media",
	ROM_MASK = "rom_mask",
	GITOPS_SYNC = "gitops_sync",
	INFRASTRUCTURE_PROVISION = "infra_provision",
	CONFIG_PUSH = "config_push",
}

export enum PropagationLatency {
	REALTIME = "realtime",
	SECONDS = "seconds",
	MINUTES = "minutes",
	HOURS = "hours",
	DAYS = "days",
	WEEKS = "weeks",
	MONTHS = "months",
	NEVER = "never",
}

export enum UpdateApplicationMode {
	HOT_RELOAD = "hot_reload",
	PROCESS_RESTART = "process_restart",
	SERVICE_RESTART = "service_restart",
	ROLLING = "rolling",
	BLUE_GREEN = "blue_green",
	REBOOT_REQUIRED = "reboot_required",
	POWER_CYCLE = "power_cycle",
	PHYSICAL_ACCESS = "physical_access",
	REPLACEMENT = "replacement",
	NOT_APPLICABLE = "not_applicable",
}

export enum UpdateAuthorityModel {
	MANUFACTURER_PUSH = "manufacturer_push",
	MANUFACTURER_MANDATORY = "manufacturer_mand",
	USER_PROMPTED = "user_prompted",
	USER_DEFERRABLE = "user_deferrable",
	OWNER_INITIATED = "owner_initiated",
	OWNER_EXCLUSIVE = "owner_exclusive",
	ENTERPRISE_MANAGED = "enterprise_managed",
	CARRIER_CONTROLLED = "carrier_controlled",
	REGULATOR_GATED = "regulator_gated",
	FIELD_LOCKED = "field_locked",
	PHYSICALLY_IMMUTABLE = "physically_immutable",
}

export enum ActorRole {
	MANUFACTURER = "manufacturer",
	DEVICE_OEM = "device_oem",
	PLATFORM_OWNER = "platform_owner",
	ENTERPRISE_IT = "enterprise_it",
	END_USER = "end_user",
	OPERATOR = "operator",
	REGULATOR = "regulator",
	CARRIER = "carrier",
	INTEGRATOR = "integrator",
}

export enum UpdateCapability {
	CAN_AUTHOR = "can_author",
	CAN_SIGN = "can_sign",
	CAN_DISTRIBUTE = "can_distribute",
	CAN_APPROVE = "can_approve",
	CAN_TRIGGER = "can_trigger",
	CAN_DEFER = "can_defer",
	CAN_BLOCK = "can_block",
	CAN_ROLLBACK = "can_rollback",
	CAN_AUDIT = "can_audit",
}

export enum ConsentRequirement {
	NONE = "none",
	NOTIFICATION = "notification",
	OPT_OUT = "opt_out",
	OPT_IN = "opt_in",
	EXPLICIT_ACTION = "explicit_action",
	MULTI_PARTY = "multi_party",
}

export interface UpdateActor {
	role: ActorRole;
	capabilities: UpdateCapability[];
	approvalRequired: boolean;
}

export interface RollbackCapability {
	possible: boolean;
	latency: PropagationLatency;
	automated: boolean;
	preservesState: boolean;
	limitedSlots?: number;
}

export interface UpdateVelocity {
	updatable: boolean;
	propagationLatency: PropagationLatency;
	applicationMode: UpdateApplicationMode;
	rollback: RollbackCapability;
}

export interface UpdateAuthority {
	model: UpdateAuthorityModel;
	actors: UpdateActor[];
	consentRequired: ConsentRequirement;
	userCanBlock: boolean;
	userCanDefer: boolean;
	maxDeferralPeriod?: string;
	forcedUpdateTriggers?: string[];
	updateAuditTrail: boolean;
	rollbackRequiresApproval: boolean;
}

export interface DeploymentLifecycle {
	deliveryMechanism: DeliveryMechanism;
	updateVelocity: UpdateVelocity;
	updateAuthority: UpdateAuthority;
}

// =============================================================================
// SECTION 15: SAFETY CRITICALITY (Discriminated Union)
// =============================================================================

export type SafetyCriticality =
	| { standard: "NONE"; level: null; justification?: string }
	| { standard: "IEC_61508"; level: SafetyIntegrityLevel; justification?: string }
	| { standard: "ISO_26262"; level: AutomotiveSafetyIntegrityLevel; justification?: string }
	| { standard: "DO_178C"; level: DesignAssuranceLevel; justification?: string }
	| { standard: "ECSS"; level: SpaceSoftwareCriticality; justification?: string }
	| { standard: "IEC_62304"; level: MedicalDeviceSoftwareClass; justification?: string };

// =============================================================================
// SECTION 16: COMPREHENSIVE RISK ASSESSMENT
// =============================================================================

/**
 * Complete Universal Risk Assessment
 *
 * This is the main type for comprehensive software risk assessment.
 * It combines all dimensions from both theoretical and practical branches.
 */
export interface UniversalRiskAssessment {
	// ─────────────────────────────────────────────────────────────────────────
	// IDENTITY
	// ─────────────────────────────────────────────────────────────────────────
	id: string;
	name: string;
	version: string;
	description?: string;

	// ─────────────────────────────────────────────────────────────────────────
	// TYPE & SCALE
	// ─────────────────────────────────────────────────────────────────────────
	domain: SystemDomain;
	scale: SystemScale;

	// ─────────────────────────────────────────────────────────────────────────
	// MATURITY
	// ─────────────────────────────────────────────────────────────────────────
	maturity: DevelopmentMaturity;
	trl?: TechnologyReadinessLevel;

	// ─────────────────────────────────────────────────────────────────────────
	// SAFETY (from theoretical branch)
	// ─────────────────────────────────────────────────────────────────────────
	safetyCriticality: SafetyCriticality;

	// ─────────────────────────────────────────────────────────────────────────
	// SECURITY (NEW)
	// ─────────────────────────────────────────────────────────────────────────
	securityClassification: SecurityClassification;

	// ─────────────────────────────────────────────────────────────────────────
	// AVAILABILITY (NEW)
	// ─────────────────────────────────────────────────────────────────────────
	availabilityRequirements: AvailabilityRequirements;

	// ─────────────────────────────────────────────────────────────────────────
	// DATA (NEW)
	// ─────────────────────────────────────────────────────────────────────────
	dataClassification: DataClassification;

	// ─────────────────────────────────────────────────────────────────────────
	// ORGANIZATIONAL (NEW)
	// ─────────────────────────────────────────────────────────────────────────
	organizationalReadiness: OrganizationalReadiness;

	// ─────────────────────────────────────────────────────────────────────────
	// ECONOMIC (NEW)
	// ─────────────────────────────────────────────────────────────────────────
	economicImpact: EconomicImpact;

	// ─────────────────────────────────────────────────────────────────────────
	// SUPPLY CHAIN (NEW)
	// ─────────────────────────────────────────────────────────────────────────
	supplyChainRisk: SupplyChainRisk;

	// ─────────────────────────────────────────────────────────────────────────
	// OPERATIONAL HISTORY (NEW)
	// ─────────────────────────────────────────────────────────────────────────
	operationalHistory?: OperationalHistory;

	// ─────────────────────────────────────────────────────────────────────────
	// INTERCONNECTION (NEW)
	// ─────────────────────────────────────────────────────────────────────────
	interconnectionRisk: InterconnectionRisk;

	// ─────────────────────────────────────────────────────────────────────────
	// DEGRADED MODE (NEW)
	// ─────────────────────────────────────────────────────────────────────────
	degradedModeCapability: DegradedModeCapability;

	// ─────────────────────────────────────────────────────────────────────────
	// DEPLOYMENT
	// ─────────────────────────────────────────────────────────────────────────
	deploymentEnvironment: DeploymentEnvironment;
	deploymentContext: DeploymentContext;
	deploymentLifecycle?: DeploymentLifecycle;

	// ─────────────────────────────────────────────────────────────────────────
	// COMPLIANCE
	// ─────────────────────────────────────────────────────────────────────────
	regulatoryDomains: RegulatoryDomain[];

	// ─────────────────────────────────────────────────────────────────────────
	// METADATA
	// ─────────────────────────────────────────────────────────────────────────
	createdAt: Date;
	updatedAt: Date;
	assessedBy?: string;
	approvedBy?: string;
	nextReviewDate?: Date;

	// ─────────────────────────────────────────────────────────────────────────
	// LINKS
	// ─────────────────────────────────────────────────────────────────────────
	repository?: string;
	documentation?: string;
	issueTracker?: string;
}

// =============================================================================
// SECTION 17: AGGREGATE RISK SCORING
// =============================================================================

/**
 * Risk score for a single dimension
 */
export interface DimensionRiskScore {
	dimension: string;
	score: number; // 0-100
	weight: number; // 0-1
	confidence: number; // 0-1
	rationale: string;
}

/**
 * Aggregate risk profile
 */
export interface RiskProfile {
	/** Overall risk score (0-100) */
	overallScore: number;

	/** Risk tier */
	tier: RiskTier;

	/** Scores by dimension */
	dimensionScores: DimensionRiskScore[];

	/** Top risk factors */
	topRisks: string[];

	/** Recommended mitigations */
	mitigations: string[];

	/** Assessment confidence */
	confidence: number;

	/** Assessment date */
	assessedAt: Date;
}

export enum RiskTier {
	MINIMAL = "minimal", // 0-20
	LOW = "low", // 21-40
	MODERATE = "moderate", // 41-60
	HIGH = "high", // 61-80
	CRITICAL = "critical", // 81-100
}

/**
 * Calculate aggregate risk profile from assessment
 */
export function calculateRiskProfile(assessment: UniversalRiskAssessment): RiskProfile {
	const dimensionScores: DimensionRiskScore[] = [];

	// Safety dimension
	const safetyScore = calculateSafetyScore(assessment.safetyCriticality);
	dimensionScores.push({
		dimension: "safety",
		score: safetyScore,
		weight: 0.2,
		confidence: 0.9,
		rationale: `Safety criticality: ${assessment.safetyCriticality.standard}`,
	});

	// Security dimension
	const securityScore = assessment.securityClassification.level * 25;
	dimensionScores.push({
		dimension: "security",
		score: securityScore,
		weight: 0.15,
		confidence: 0.85,
		rationale: `Security level: SL-${assessment.securityClassification.level}`,
	});

	// Availability dimension
	const availabilityScore = assessment.availabilityRequirements.tier * 20;
	dimensionScores.push({
		dimension: "availability",
		score: availabilityScore,
		weight: 0.1,
		confidence: 0.9,
		rationale: `Availability tier: ${assessment.availabilityRequirements.tier}`,
	});

	// Data sensitivity dimension
	const dataScore = calculateDataScore(assessment.dataClassification);
	dimensionScores.push({
		dimension: "data",
		score: dataScore,
		weight: 0.1,
		confidence: 0.85,
		rationale: `Max data sensitivity: ${assessment.dataClassification.maxSensitivity}`,
	});

	// Organizational readiness (inverse - higher readiness = lower risk)
	const orgScore = 100 - calculateOrgReadinessScore(assessment.organizationalReadiness);
	dimensionScores.push({
		dimension: "organizational",
		score: orgScore,
		weight: 0.1,
		confidence: 0.7,
		rationale: `Team maturity: ${assessment.organizationalReadiness.teamMaturity}`,
	});

	// Economic impact
	const economicScore = calculateEconomicScore(assessment.economicImpact);
	dimensionScores.push({
		dimension: "economic",
		score: economicScore,
		weight: 0.1,
		confidence: 0.75,
		rationale: `Business criticality: ${assessment.economicImpact.businessCriticality}`,
	});

	// Supply chain
	const supplyChainScore = calculateSupplyChainScore(assessment.supplyChainRisk);
	dimensionScores.push({
		dimension: "supply_chain",
		score: supplyChainScore,
		weight: 0.1,
		confidence: 0.7,
		rationale: `SBOM status: ${assessment.supplyChainRisk.sbomStatus}`,
	});

	// Interconnection
	const interconnectionScore = calculateInterconnectionScore(assessment.interconnectionRisk);
	dimensionScores.push({
		dimension: "interconnection",
		score: interconnectionScore,
		weight: 0.1,
		confidence: 0.8,
		rationale: `Cascade potential: ${assessment.interconnectionRisk.cascadeFailurePotential}`,
	});

	// Degraded mode (inverse - better capability = lower risk)
	const degradedModeScore = 100 - calculateDegradedModeScore(assessment.degradedModeCapability);
	dimensionScores.push({
		dimension: "resilience",
		score: degradedModeScore,
		weight: 0.05,
		confidence: 0.8,
		rationale: `Recovery automation: ${assessment.degradedModeCapability.recoveryAutomation}`,
	});

	// Calculate weighted overall score
	const totalWeight = dimensionScores.reduce((sum, d) => sum + d.weight, 0);
	const overallScore = dimensionScores.reduce(
		(sum, d) => sum + (d.score * d.weight) / totalWeight,
		0,
	);

	// Determine tier
	let tier: RiskTier;
	if (overallScore <= 20) tier = RiskTier.MINIMAL;
	else if (overallScore <= 40) tier = RiskTier.LOW;
	else if (overallScore <= 60) tier = RiskTier.MODERATE;
	else if (overallScore <= 80) tier = RiskTier.HIGH;
	else tier = RiskTier.CRITICAL;

	// Identify top risks
	const topRisks = dimensionScores
		.sort((a, b) => b.score * b.weight - a.score * a.weight)
		.slice(0, 3)
		.map((d) => `${d.dimension}: ${d.rationale}`);

	// Calculate overall confidence
	const confidence = dimensionScores.reduce(
		(sum, d) => sum + (d.confidence * d.weight) / totalWeight,
		0,
	);

	return {
		overallScore,
		tier,
		dimensionScores,
		topRisks,
		mitigations: generateMitigations(dimensionScores),
		confidence,
		assessedAt: new Date(),
	};
}

// Helper functions for score calculation
function calculateSafetyScore(safety: SafetyCriticality): number {
	if (safety.standard === "NONE") return 0;

	// Each standard has its own ordinal mapping
	switch (safety.standard) {
		case "IEC_61508": {
			// SIL 0-4 maps to 0-100
			const level = safety.level as SafetyIntegrityLevel;
			return level * 25;
		}
		case "ISO_26262": {
			// QM, A, B, C, D maps to 0, 25, 50, 75, 100
			const ordinalMap: Record<AutomotiveSafetyIntegrityLevel, number> = {
				[AutomotiveSafetyIntegrityLevel.QM]: 0,
				[AutomotiveSafetyIntegrityLevel.ASIL_A]: 25,
				[AutomotiveSafetyIntegrityLevel.ASIL_B]: 50,
				[AutomotiveSafetyIntegrityLevel.ASIL_C]: 75,
				[AutomotiveSafetyIntegrityLevel.ASIL_D]: 100,
			};
			return ordinalMap[safety.level as AutomotiveSafetyIntegrityLevel] ?? 50;
		}
		case "DO_178C": {
			// E, D, C, B, A maps to 0, 25, 50, 75, 100 (reversed alphabetical)
			const ordinalMap: Record<DesignAssuranceLevel, number> = {
				[DesignAssuranceLevel.DAL_E]: 0,
				[DesignAssuranceLevel.DAL_D]: 25,
				[DesignAssuranceLevel.DAL_C]: 50,
				[DesignAssuranceLevel.DAL_B]: 75,
				[DesignAssuranceLevel.DAL_A]: 100,
			};
			return ordinalMap[safety.level as DesignAssuranceLevel] ?? 50;
		}
		case "ECSS": {
			// A, B, C, D maps to 100, 75, 50, 25 (A is highest)
			const ordinalMap: Record<SpaceSoftwareCriticality, number> = {
				[SpaceSoftwareCriticality.CATEGORY_A]: 100,
				[SpaceSoftwareCriticality.CATEGORY_B]: 75,
				[SpaceSoftwareCriticality.CATEGORY_C]: 50,
				[SpaceSoftwareCriticality.CATEGORY_D]: 25,
			};
			return ordinalMap[safety.level as SpaceSoftwareCriticality] ?? 50;
		}
		case "IEC_62304": {
			// A, B, C maps to 0, 50, 100 (A is lowest)
			const ordinalMap: Record<MedicalDeviceSoftwareClass, number> = {
				[MedicalDeviceSoftwareClass.CLASS_A]: 0,
				[MedicalDeviceSoftwareClass.CLASS_B]: 50,
				[MedicalDeviceSoftwareClass.CLASS_C]: 100,
			};
			return ordinalMap[safety.level as MedicalDeviceSoftwareClass] ?? 50;
		}
		default:
			return 50;
	}
}

function calculateDataScore(data: DataClassification): number {
	const sensitivityMap: Record<DataSensitivityLevel, number> = {
		[DataSensitivityLevel.PUBLIC]: 0,
		[DataSensitivityLevel.INTERNAL]: 20,
		[DataSensitivityLevel.CONFIDENTIAL]: 40,
		[DataSensitivityLevel.RESTRICTED]: 60,
		[DataSensitivityLevel.SECRET]: 80,
		[DataSensitivityLevel.TOP_SECRET]: 100,
	};
	return sensitivityMap[data.maxSensitivity];
}

function calculateOrgReadinessScore(org: OrganizationalReadiness): number {
	const maturityMap: Record<TeamMaturityLevel, number> = {
		[TeamMaturityLevel.FORMING]: 20,
		[TeamMaturityLevel.STORMING]: 30,
		[TeamMaturityLevel.NORMING]: 50,
		[TeamMaturityLevel.PERFORMING]: 80,
		[TeamMaturityLevel.ADJOURNING]: 40,
	};
	return maturityMap[org.teamMaturity];
}

function calculateEconomicScore(economic: EconomicImpact): number {
	const criticalityMap: Record<BusinessCriticality, number> = {
		[BusinessCriticality.NICE_TO_HAVE]: 10,
		[BusinessCriticality.OPERATIONAL]: 30,
		[BusinessCriticality.IMPORTANT]: 50,
		[BusinessCriticality.CRITICAL]: 75,
		[BusinessCriticality.EXISTENTIAL]: 100,
	};
	return criticalityMap[economic.businessCriticality];
}

function calculateSupplyChainScore(supply: SupplyChainRisk): number {
	const sbomMap: Record<SBOMStatus, number> = {
		[SBOMStatus.NONE]: 80,
		[SBOMStatus.PARTIAL]: 60,
		[SBOMStatus.COMPLETE]: 40,
		[SBOMStatus.VERIFIED]: 20,
		[SBOMStatus.AUTOMATED]: 10,
	};
	let score = sbomMap[supply.sbomStatus];
	score += supply.openSourceProfile.vulnerableDependencies * 5;
	return Math.min(100, score);
}

function calculateInterconnectionScore(interconnection: InterconnectionRisk): number {
	const cascadeMap: Record<CascadeFailurePotential, number> = {
		[CascadeFailurePotential.NONE]: 0,
		[CascadeFailurePotential.LOW]: 25,
		[CascadeFailurePotential.MODERATE]: 50,
		[CascadeFailurePotential.HIGH]: 75,
		[CascadeFailurePotential.CRITICAL]: 100,
	};
	return cascadeMap[interconnection.cascadeFailurePotential];
}

function calculateDegradedModeScore(degraded: DegradedModeCapability): number {
	const automationMap: Record<RecoveryAutomation, number> = {
		[RecoveryAutomation.MANUAL]: 20,
		[RecoveryAutomation.SEMI_AUTOMATED]: 40,
		[RecoveryAutomation.AUTOMATED]: 70,
		[RecoveryAutomation.SELF_HEALING]: 100,
	};
	let score = automationMap[degraded.recoveryAutomation];
	if (degraded.gracefulDegradation) score += 10;
	if (degraded.failSafeState) score += 10;
	return Math.min(100, score);
}

function generateMitigations(scores: DimensionRiskScore[]): string[] {
	const mitigations: string[] = [];
	const highRiskDimensions = scores.filter((d) => d.score > 60);

	for (const dim of highRiskDimensions) {
		switch (dim.dimension) {
			case "safety":
				mitigations.push("Implement formal safety case and hazard analysis");
				break;
			case "security":
				mitigations.push("Conduct penetration testing and security audit");
				break;
			case "availability":
				mitigations.push("Implement redundancy and automated failover");
				break;
			case "data":
				mitigations.push("Implement data encryption and access controls");
				break;
			case "organizational":
				mitigations.push("Invest in training and team development");
				break;
			case "economic":
				mitigations.push("Develop business continuity plan");
				break;
			case "supply_chain":
				mitigations.push("Generate and verify SBOM, assess dependency health");
				break;
			case "interconnection":
				mitigations.push("Implement circuit breakers and isolation patterns");
				break;
			case "resilience":
				mitigations.push("Define and test degraded modes and fail-safe states");
				break;
		}
	}

	return mitigations;
}

// =============================================================================
// SECTION 18: FACTORY FUNCTIONS
// =============================================================================

function generateId(): string {
	return `risk_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a minimal risk assessment with sensible defaults
 */
export function createMinimalRiskAssessment(
	name: string,
	domain: SystemDomain,
): UniversalRiskAssessment {
	const now = new Date();

	return {
		id: generateId(),
		name,
		version: "0.0.1",
		domain,
		scale: SystemScale.MODULE,
		maturity: DevelopmentMaturity.IDEA,

		safetyCriticality: { standard: "NONE", level: null },

		securityClassification: {
			level: SecurityIntegrityLevel.SL_1,
			attackSurface: AttackSurfaceExposure.INTERNAL,
			dataSensitivity: DataSensitivityLevel.INTERNAL,
			authenticationStrength: AuthenticationStrength.BASIC,
			encryptionRequirement: EncryptionRequirement.TRANSPORT,
			auditRequirement: AuditRequirement.BASIC,
			threatActors: [ThreatActor.CASUAL],
		},

		availabilityRequirements: {
			tier: AvailabilityTier.TIER_1,
			uptimeTarget: 99,
			rto: { value: 4, unit: "hours" },
			rpo: { value: 1, unit: "hours" },
			maintenanceWindowAllowed: true,
			geoRedundancy: GeoRedundancy.NONE,
			disasterRecovery: DisasterRecoveryRequirement.COLD,
		},

		dataClassification: {
			dataTypes: [DataType.INTERNAL],
			maxSensitivity: DataSensitivityLevel.INTERNAL,
			residencyRequirements: [],
			retentionPeriod: { value: 1, unit: "years" },
			rightToErasure: false,
			dataMinimization: false,
			consentRequired: false,
			crossBorderRestrictions: [],
		},

		organizationalReadiness: {
			teamMaturity: TeamMaturityLevel.FORMING,
			domainExpertise: ExpertiseLevel.NOVICE,
			technologyExpertise: ExpertiseLevel.NOVICE,
			teamStability: TeamStability.MODERATE,
			processMaturity: ProcessMaturityLevel.INITIAL,
			resourceAllocation: {
				fte: 1,
				budgetAdequacy: "constrained",
				scheduleConstraint: "reasonable",
				toolingAdequacy: "basic",
			},
			externalExpertiseDependencies: [],
		},

		economicImpact: {
			revenueAtRisk: { value: 0, currency: "USD", period: "per_year" },
			downtimeRevenueImpact: { value: 0, currency: "USD", period: "per_hour" },
			regulatoryPenaltyExposure: { value: 0, currency: "USD", period: "total" },
			litigationExposure: { value: 0, currency: "USD", period: "total" },
			reputationalImpact: ReputationalImpact.NONE,
			businessCriticality: BusinessCriticality.NICE_TO_HAVE,
			customerImpactScope: CustomerImpactScope.NONE,
			competitiveImpact: CompetitiveImpact.NONE,
		},

		supplyChainRisk: {
			dependencies: [],
			openSourceProfile: {
				openSourcePercentage: 0,
				directDependencies: 0,
				transitiveDependencies: 0,
				vulnerableDependencies: 0,
				restrictiveLicenses: [],
				singleMaintainerDependencies: 0,
			},
			vendorConcentration: {
				primaryVendorPercentage: 0,
				lockInSeverity: "none",
				migrationDifficulty: "trivial",
			},
			geographicRisk: {
				countriesOfOrigin: [],
				sanctionsRisk: "none",
				geopoliticalRisk: "stable",
			},
			sbomStatus: SBOMStatus.NONE,
			provenanceVerification: ProvenanceVerification.NONE,
		},

		interconnectionRisk: {
			downstreamDependents: [],
			upstreamDependencies: [],
			blastRadius: {
				directImpact: {
					systemsAffected: 0,
					teamsAffected: 0,
					businessUnitsAffected: 0,
					externalPartiesAffected: 0,
				},
				indirectImpact: {
					systemsAffected: 0,
					teamsAffected: 0,
					businessUnitsAffected: 0,
					externalPartiesAffected: 0,
				},
				usersAffected: 0,
				revenueImpactPerHour: { value: 0, currency: "USD", period: "per_hour" },
				regulatoryExposure: "none",
			},
			cascadeFailurePotential: CascadeFailurePotential.NONE,
			integrationComplexity: IntegrationComplexity.STANDALONE,
		},

		degradedModeCapability: {
			degradedModes: [],
			gracefulDegradation: false,
			failSafeState: null,
			recoveryAutomation: RecoveryAutomation.MANUAL,
			chaosEngineeringMaturity: ChaosEngineeringMaturity.NONE,
		},

		deploymentEnvironment: DeploymentEnvironment.LOCAL,
		deploymentContext: DeploymentContext.PUBLIC_CLOUD,
		regulatoryDomains: [RegulatoryDomain.NONE],

		createdAt: now,
		updatedAt: now,
	};
}

/**
 * Create risk assessment for a typical web application
 */
export function createWebAppRiskAssessment(
	name: string,
	options?: Partial<UniversalRiskAssessment>,
): UniversalRiskAssessment {
	const base = createMinimalRiskAssessment(name, SystemDomain.WEB_APPLICATION);

	return {
		...base,
		scale: SystemScale.APPLICATION,
		maturity: DevelopmentMaturity.ALPHA,
		securityClassification: {
			...base.securityClassification,
			level: SecurityIntegrityLevel.SL_2,
			attackSurface: AttackSurfaceExposure.INTERNET,
		},
		availabilityRequirements: {
			...base.availabilityRequirements,
			tier: AvailabilityTier.TIER_2,
			uptimeTarget: 99.9,
		},
		deploymentContext: DeploymentContext.PUBLIC_CLOUD,
		...options,
	};
}

/**
 * Create risk assessment for safety-critical embedded system
 */
export function createSafetyCriticalRiskAssessment(
	name: string,
	safetyCriticality: SafetyCriticality,
	options?: Partial<UniversalRiskAssessment>,
): UniversalRiskAssessment {
	const base = createMinimalRiskAssessment(name, SystemDomain.EMBEDDED_SYSTEM);

	return {
		...base,
		scale: SystemScale.COMPONENT,
		maturity: DevelopmentMaturity.ALPHA,
		safetyCriticality,
		securityClassification: {
			...base.securityClassification,
			level: SecurityIntegrityLevel.SL_3,
			attackSurface: AttackSurfaceExposure.INTERNAL,
		},
		availabilityRequirements: {
			...base.availabilityRequirements,
			tier: AvailabilityTier.TIER_4,
			uptimeTarget: 99.999,
			disasterRecovery: DisasterRecoveryRequirement.HOT,
		},
		organizationalReadiness: {
			...base.organizationalReadiness,
			teamMaturity: TeamMaturityLevel.PERFORMING,
			domainExpertise: ExpertiseLevel.EXPERT,
			processMaturity: ProcessMaturityLevel.QUANTITATIVELY_MANAGED,
		},
		degradedModeCapability: {
			degradedModes: [],
			gracefulDegradation: true,
			failSafeState: {
				description: "Safe shutdown state",
				triggeredBy: ["critical_failure", "watchdog_timeout"],
				stateCharacteristics: ["outputs_disabled", "alerts_active"],
				dataPreservation: "complete",
				humanInterventionRequired: true,
				recoveryProcedure: "Manual restart after root cause analysis",
			},
			recoveryAutomation: RecoveryAutomation.SEMI_AUTOMATED,
			chaosEngineeringMaturity: ChaosEngineeringMaturity.REGULAR,
		},
		...options,
	};
}

// =============================================================================
// SECTION 19: VALIDATION
// =============================================================================

export interface ValidationResult {
	valid: boolean;
	issues: ValidationIssue[];
}

export interface ValidationIssue {
	severity: "error" | "warning" | "info";
	message: string;
	field: string;
}

/**
 * Validate a universal risk assessment for completeness and consistency
 */
export function validateRiskAssessment(assessment: UniversalRiskAssessment): ValidationResult {
	const issues: ValidationIssue[] = [];

	// Safety-critical context checks
	const safetyCriticalContexts: DeploymentContext[] = [
		DeploymentContext.VEHICLE,
		DeploymentContext.AIRCRAFT,
		DeploymentContext.SPACECRAFT,
		DeploymentContext.MEDICAL_DEVICE,
		DeploymentContext.INDUSTRIAL_PLANT,
	];

	if (
		safetyCriticalContexts.includes(assessment.deploymentContext) &&
		assessment.safetyCriticality.standard === "NONE"
	) {
		issues.push({
			severity: "error",
			message: `Safety-critical context ${assessment.deploymentContext} requires safety criticality classification`,
			field: "safetyCriticality",
		});
	}

	// Security vs attack surface consistency
	if (
		assessment.securityClassification.attackSurface === AttackSurfaceExposure.INTERNET &&
		assessment.securityClassification.level < SecurityIntegrityLevel.SL_2
	) {
		issues.push({
			severity: "warning",
			message: "Internet-exposed systems should typically have SL-2 or higher security",
			field: "securityClassification.level",
		});
	}

	// Data sensitivity vs security level
	if (
		assessment.dataClassification.maxSensitivity >= DataSensitivityLevel.RESTRICTED &&
		assessment.securityClassification.level < SecurityIntegrityLevel.SL_3
	) {
		issues.push({
			severity: "warning",
			message: "Restricted/secret data typically requires SL-3 or higher security",
			field: "securityClassification.level",
		});
	}

	// Availability vs business criticality consistency
	if (
		assessment.economicImpact.businessCriticality === BusinessCriticality.EXISTENTIAL &&
		assessment.availabilityRequirements.tier < AvailabilityTier.TIER_3
	) {
		issues.push({
			severity: "warning",
			message: "Existential business criticality should have Tier 3+ availability",
			field: "availabilityRequirements.tier",
		});
	}

	// Supply chain checks
	if (
		assessment.supplyChainRisk.sbomStatus === SBOMStatus.NONE &&
		assessment.supplyChainRisk.openSourceProfile.directDependencies > 10
	) {
		issues.push({
			severity: "warning",
			message: "Systems with many dependencies should maintain an SBOM",
			field: "supplyChainRisk.sbomStatus",
		});
	}

	// Degraded mode for high availability
	if (
		assessment.availabilityRequirements.tier >= AvailabilityTier.TIER_3 &&
		assessment.degradedModeCapability.degradedModes.length === 0
	) {
		issues.push({
			severity: "warning",
			message: "High-availability systems should define degraded modes",
			field: "degradedModeCapability.degradedModes",
		});
	}

	// TRL vs maturity consistency
	if (assessment.trl !== undefined) {
		const expectedMaturity = trlToMaturity(assessment.trl);
		if (assessment.maturity !== expectedMaturity) {
			issues.push({
				severity: "info",
				message: `TRL ${assessment.trl} typically corresponds to maturity ${expectedMaturity}`,
				field: "maturity",
			});
		}
	}

	return {
		valid: issues.filter((i) => i.severity === "error").length === 0,
		issues,
	};
}

/**
 * Map TRL to development maturity
 */
export function trlToMaturity(trl: TechnologyReadinessLevel): DevelopmentMaturity {
	const mapping: Record<TechnologyReadinessLevel, DevelopmentMaturity> = {
		[TechnologyReadinessLevel.TRL_1]: DevelopmentMaturity.IDEA,
		[TechnologyReadinessLevel.TRL_2]: DevelopmentMaturity.SPIKE,
		[TechnologyReadinessLevel.TRL_3]: DevelopmentMaturity.PROOF_OF_CONCEPT,
		[TechnologyReadinessLevel.TRL_4]: DevelopmentMaturity.PROTOTYPE,
		[TechnologyReadinessLevel.TRL_5]: DevelopmentMaturity.ALPHA,
		[TechnologyReadinessLevel.TRL_6]: DevelopmentMaturity.BETA,
		[TechnologyReadinessLevel.TRL_7]: DevelopmentMaturity.RELEASE_CANDIDATE,
		[TechnologyReadinessLevel.TRL_8]: DevelopmentMaturity.GENERAL_AVAILABILITY,
		[TechnologyReadinessLevel.TRL_9]: DevelopmentMaturity.MATURE,
	};
	return mapping[trl];
}

// =============================================================================
// SECTION 20: ENGINEERING CONSTRAINTS DERIVATION
// =============================================================================
//
// This section implements the FUNCTOR from risk assessment to engineering
// constraints. Given an integrity level, it derives concrete requirements
// for testing, architecture, process, scoping, and documentation.
//
// The functor is MONOTONIC: higher integrity levels produce strictly more
// stringent constraints.
// =============================================================================

/**
 * Universal Integrity Level (0-4 ordinal)
 * Maps to: SIL 0-4, ASIL QM/A/B/C/D, DAL E/D/C/B/A
 */
export enum IntegrityLevel {
	/** Level 0: No special requirements (QM, DAL E, SIL 0) */
	LEVEL_0 = 0,
	/** Level 1: Low integrity (SIL 1, ASIL A, DAL D) */
	LEVEL_1 = 1,
	/** Level 2: Medium integrity (SIL 2, ASIL B, DAL C) */
	LEVEL_2 = 2,
	/** Level 3: High integrity (SIL 3, ASIL C, DAL B) */
	LEVEL_3 = 3,
	/** Level 4: Highest integrity (SIL 4, ASIL D, DAL A) */
	LEVEL_4 = 4,
}

/**
 * Exposure level - how often users are exposed to potential failure
 */
export enum ExposureLevel {
	/** Extremely rare exposure (<1% of operation time) */
	RARE = 0,
	/** Occasional exposure (1-10% of operation time) */
	OCCASIONAL = 1,
	/** Regular exposure (10-50% of operation time) */
	REGULAR = 2,
	/** Frequent exposure (50-90% of operation time) */
	FREQUENT = 3,
	/** Continuous exposure (>90% of operation time) */
	CONTINUOUS = 4,
}

/**
 * Controllability - ability to avoid or mitigate failure consequences
 */
export enum ControllabilityLevel {
	/** Easily controllable by user */
	EASILY_CONTROLLABLE = 0,
	/** Controllable with some effort */
	NORMALLY_CONTROLLABLE = 1,
	/** Difficult to control */
	DIFFICULT = 2,
	/** Very difficult or impossible to control */
	UNCONTROLLABLE = 3,
}

// -----------------------------------------------------------------------------
// Testing Constraints
// -----------------------------------------------------------------------------

/**
 * Testing constraints derived from integrity level
 */
export interface TestingConstraints {
	/** Minimum statement coverage percentage */
	statementCoverage: number;
	/** Minimum branch coverage percentage */
	branchCoverage: number;
	/** Minimum MC/DC coverage percentage (0 if not required) */
	mcdcCoverage: number;
	/** Unit testing required */
	unitTestingRequired: boolean;
	/** Integration testing required */
	integrationTestingRequired: boolean;
	/** System testing required */
	systemTestingRequired: boolean;
	/** Acceptance testing required */
	acceptanceTestingRequired: boolean;
	/** Performance/stress testing required */
	performanceTestingRequired: boolean;
	/** Security testing required */
	securityTestingRequired: boolean;
	/** Fault injection testing required */
	faultInjectionRequired: boolean;
	/** Independent verification required */
	independentVerificationRequired: boolean;
	/** Regression testing scope */
	regressionTestingScope: "none" | "affected" | "full";
	/** Test documentation formality */
	testDocumentationLevel: "informal" | "structured" | "formal";
}

const TESTING_CONSTRAINTS: Record<IntegrityLevel, TestingConstraints> = {
	[IntegrityLevel.LEVEL_0]: {
		statementCoverage: 0,
		branchCoverage: 0,
		mcdcCoverage: 0,
		unitTestingRequired: false,
		integrationTestingRequired: false,
		systemTestingRequired: false,
		acceptanceTestingRequired: false,
		performanceTestingRequired: false,
		securityTestingRequired: false,
		faultInjectionRequired: false,
		independentVerificationRequired: false,
		regressionTestingScope: "none",
		testDocumentationLevel: "informal",
	},
	[IntegrityLevel.LEVEL_1]: {
		statementCoverage: 60,
		branchCoverage: 0,
		mcdcCoverage: 0,
		unitTestingRequired: true,
		integrationTestingRequired: true,
		systemTestingRequired: false,
		acceptanceTestingRequired: false,
		performanceTestingRequired: false,
		securityTestingRequired: false,
		faultInjectionRequired: false,
		independentVerificationRequired: false,
		regressionTestingScope: "affected",
		testDocumentationLevel: "informal",
	},
	[IntegrityLevel.LEVEL_2]: {
		statementCoverage: 80,
		branchCoverage: 70,
		mcdcCoverage: 0,
		unitTestingRequired: true,
		integrationTestingRequired: true,
		systemTestingRequired: true,
		acceptanceTestingRequired: true,
		performanceTestingRequired: true,
		securityTestingRequired: true,
		faultInjectionRequired: false,
		independentVerificationRequired: false,
		regressionTestingScope: "affected",
		testDocumentationLevel: "structured",
	},
	[IntegrityLevel.LEVEL_3]: {
		statementCoverage: 90,
		branchCoverage: 85,
		mcdcCoverage: 80,
		unitTestingRequired: true,
		integrationTestingRequired: true,
		systemTestingRequired: true,
		acceptanceTestingRequired: true,
		performanceTestingRequired: true,
		securityTestingRequired: true,
		faultInjectionRequired: true,
		independentVerificationRequired: true,
		regressionTestingScope: "full",
		testDocumentationLevel: "formal",
	},
	[IntegrityLevel.LEVEL_4]: {
		statementCoverage: 100,
		branchCoverage: 100,
		mcdcCoverage: 100,
		unitTestingRequired: true,
		integrationTestingRequired: true,
		systemTestingRequired: true,
		acceptanceTestingRequired: true,
		performanceTestingRequired: true,
		securityTestingRequired: true,
		faultInjectionRequired: true,
		independentVerificationRequired: true,
		regressionTestingScope: "full",
		testDocumentationLevel: "formal",
	},
};

export function deriveTestingConstraints(level: IntegrityLevel): TestingConstraints {
	return TESTING_CONSTRAINTS[level];
}

// -----------------------------------------------------------------------------
// Architecture Constraints
// -----------------------------------------------------------------------------

/**
 * Architecture constraints derived from integrity level
 */
export interface ArchitectureConstraints {
	/** Redundancy required */
	redundancyRequired: boolean;
	/** Type of redundancy if required */
	redundancyType?: "none" | "hot_standby" | "active_active" | "voting";
	/** Fault tolerance required */
	faultToleranceRequired: boolean;
	/** Graceful degradation required */
	gracefulDegradationRequired: boolean;
	/** Maximum single point of failure exposure */
	maxSinglePointFailureExposure: "unlimited" | "non_critical" | "none";
	/** Monitoring and alerting requirements */
	monitoringLevel: "basic" | "comprehensive" | "real_time";
	/** Error handling requirements */
	errorHandlingLevel: "basic" | "comprehensive" | "fail_safe";
	/** State management requirements */
	stateManagementLevel: "stateless_preferred" | "managed" | "persistent_audit";
	/** Isolation requirements */
	isolationLevel: "none" | "process" | "container" | "vm" | "physical";
	/** Data integrity requirements */
	dataIntegrityLevel: "eventual" | "strong" | "verified";
	/** Audit trail required */
	auditTrailRequired: boolean;
	/** Audit trail detail level */
	auditTrailLevel?: "basic" | "detailed" | "forensic";
}

const ARCHITECTURE_CONSTRAINTS: Record<IntegrityLevel, ArchitectureConstraints> = {
	[IntegrityLevel.LEVEL_0]: {
		redundancyRequired: false,
		faultToleranceRequired: false,
		gracefulDegradationRequired: false,
		maxSinglePointFailureExposure: "unlimited",
		monitoringLevel: "basic",
		errorHandlingLevel: "basic",
		stateManagementLevel: "stateless_preferred",
		isolationLevel: "none",
		dataIntegrityLevel: "eventual",
		auditTrailRequired: false,
	},
	[IntegrityLevel.LEVEL_1]: {
		redundancyRequired: false,
		faultToleranceRequired: false,
		gracefulDegradationRequired: true,
		maxSinglePointFailureExposure: "non_critical",
		monitoringLevel: "basic",
		errorHandlingLevel: "comprehensive",
		stateManagementLevel: "managed",
		isolationLevel: "process",
		dataIntegrityLevel: "strong",
		auditTrailRequired: false,
	},
	[IntegrityLevel.LEVEL_2]: {
		redundancyRequired: true,
		redundancyType: "hot_standby",
		faultToleranceRequired: true,
		gracefulDegradationRequired: true,
		maxSinglePointFailureExposure: "non_critical",
		monitoringLevel: "comprehensive",
		errorHandlingLevel: "comprehensive",
		stateManagementLevel: "managed",
		isolationLevel: "container",
		dataIntegrityLevel: "strong",
		auditTrailRequired: true,
		auditTrailLevel: "basic",
	},
	[IntegrityLevel.LEVEL_3]: {
		redundancyRequired: true,
		redundancyType: "active_active",
		faultToleranceRequired: true,
		gracefulDegradationRequired: true,
		maxSinglePointFailureExposure: "none",
		monitoringLevel: "real_time",
		errorHandlingLevel: "fail_safe",
		stateManagementLevel: "persistent_audit",
		isolationLevel: "vm",
		dataIntegrityLevel: "verified",
		auditTrailRequired: true,
		auditTrailLevel: "detailed",
	},
	[IntegrityLevel.LEVEL_4]: {
		redundancyRequired: true,
		redundancyType: "voting",
		faultToleranceRequired: true,
		gracefulDegradationRequired: true,
		maxSinglePointFailureExposure: "none",
		monitoringLevel: "real_time",
		errorHandlingLevel: "fail_safe",
		stateManagementLevel: "persistent_audit",
		isolationLevel: "physical",
		dataIntegrityLevel: "verified",
		auditTrailRequired: true,
		auditTrailLevel: "forensic",
	},
};

export function deriveArchitectureConstraints(level: IntegrityLevel): ArchitectureConstraints {
	return ARCHITECTURE_CONSTRAINTS[level];
}

// -----------------------------------------------------------------------------
// Process Constraints
// -----------------------------------------------------------------------------

/**
 * Process constraints derived from integrity level
 */
export interface ProcessConstraints {
	/** Code review required */
	codeReviewRequired: boolean;
	/** Number of reviewers required */
	minReviewers: number;
	/** Independent review required (different team) */
	independentReviewRequired: boolean;
	/** Formal inspection required */
	formalInspectionRequired: boolean;
	/** Design documentation required */
	designDocumentationRequired: boolean;
	/** Design documentation formality */
	designDocumentationLevel: "informal" | "structured" | "formal" | "mathematical";
	/** Traceability required */
	traceabilityRequired: boolean;
	/** Bidirectional traceability */
	bidirectionalTraceability: boolean;
	/** Configuration management requirements */
	configurationManagementLevel: "basic" | "controlled" | "audited";
	/** Change control process */
	changeControlLevel: "informal" | "documented" | "formal_approval";
	/** Static analysis required */
	staticAnalysisRequired: boolean;
	/** Static analysis level */
	staticAnalysisLevel: "none" | "linter" | "type_checker" | "formal_verifier";
	/** Coding standard required */
	codingStandardRequired: boolean;
	/** Specific coding standard */
	codingStandard?: "internal" | "MISRA" | "CERT" | "custom";
}

const PROCESS_CONSTRAINTS: Record<IntegrityLevel, ProcessConstraints> = {
	[IntegrityLevel.LEVEL_0]: {
		codeReviewRequired: false,
		minReviewers: 0,
		independentReviewRequired: false,
		formalInspectionRequired: false,
		designDocumentationRequired: false,
		designDocumentationLevel: "informal",
		traceabilityRequired: false,
		bidirectionalTraceability: false,
		configurationManagementLevel: "basic",
		changeControlLevel: "informal",
		staticAnalysisRequired: false,
		staticAnalysisLevel: "none",
		codingStandardRequired: false,
	},
	[IntegrityLevel.LEVEL_1]: {
		codeReviewRequired: true,
		minReviewers: 1,
		independentReviewRequired: false,
		formalInspectionRequired: false,
		designDocumentationRequired: false,
		designDocumentationLevel: "informal",
		traceabilityRequired: false,
		bidirectionalTraceability: false,
		configurationManagementLevel: "basic",
		changeControlLevel: "documented",
		staticAnalysisRequired: true,
		staticAnalysisLevel: "linter",
		codingStandardRequired: false,
	},
	[IntegrityLevel.LEVEL_2]: {
		codeReviewRequired: true,
		minReviewers: 1,
		independentReviewRequired: false,
		formalInspectionRequired: false,
		designDocumentationRequired: true,
		designDocumentationLevel: "structured",
		traceabilityRequired: true,
		bidirectionalTraceability: false,
		configurationManagementLevel: "controlled",
		changeControlLevel: "documented",
		staticAnalysisRequired: true,
		staticAnalysisLevel: "type_checker",
		codingStandardRequired: true,
		codingStandard: "internal",
	},
	[IntegrityLevel.LEVEL_3]: {
		codeReviewRequired: true,
		minReviewers: 2,
		independentReviewRequired: true,
		formalInspectionRequired: true,
		designDocumentationRequired: true,
		designDocumentationLevel: "formal",
		traceabilityRequired: true,
		bidirectionalTraceability: true,
		configurationManagementLevel: "audited",
		changeControlLevel: "formal_approval",
		staticAnalysisRequired: true,
		staticAnalysisLevel: "type_checker",
		codingStandardRequired: true,
		codingStandard: "MISRA",
	},
	[IntegrityLevel.LEVEL_4]: {
		codeReviewRequired: true,
		minReviewers: 2,
		independentReviewRequired: true,
		formalInspectionRequired: true,
		designDocumentationRequired: true,
		designDocumentationLevel: "mathematical",
		traceabilityRequired: true,
		bidirectionalTraceability: true,
		configurationManagementLevel: "audited",
		changeControlLevel: "formal_approval",
		staticAnalysisRequired: true,
		staticAnalysisLevel: "formal_verifier",
		codingStandardRequired: true,
		codingStandard: "MISRA",
	},
};

export function deriveProcessConstraints(level: IntegrityLevel): ProcessConstraints {
	return PROCESS_CONSTRAINTS[level];
}

// -----------------------------------------------------------------------------
// Scoping Constraints
// -----------------------------------------------------------------------------

/**
 * Scoping constraints derived from integrity level
 */
export interface ScopingConstraints {
	/** Maximum recommended scope per release */
	maxScopePerRelease: "unlimited" | "feature_set" | "single_feature" | "minimal";
	/** Incremental delivery required */
	incrementalDeliveryRequired: boolean;
	/** Feature flag requirements */
	featureFlagsRequired: boolean;
	/** Rollback capability required */
	rollbackCapabilityRequired: boolean;
	/** Rollback time requirement */
	rollbackTimeRequirement?: "hours" | "minutes" | "seconds" | "automatic";
	/** Canary deployment required */
	canaryDeploymentRequired: boolean;
	/** Blue/green deployment required */
	blueGreenRequired: boolean;
	/** Beta/pilot phase required */
	betaPhaseRequired: boolean;
	/** Beta duration minimum (days) */
	betaDurationMinDays?: number;
}

const SCOPING_CONSTRAINTS: Record<IntegrityLevel, ScopingConstraints> = {
	[IntegrityLevel.LEVEL_0]: {
		maxScopePerRelease: "unlimited",
		incrementalDeliveryRequired: false,
		featureFlagsRequired: false,
		rollbackCapabilityRequired: false,
		canaryDeploymentRequired: false,
		blueGreenRequired: false,
		betaPhaseRequired: false,
	},
	[IntegrityLevel.LEVEL_1]: {
		maxScopePerRelease: "feature_set",
		incrementalDeliveryRequired: true,
		featureFlagsRequired: false,
		rollbackCapabilityRequired: true,
		rollbackTimeRequirement: "hours",
		canaryDeploymentRequired: false,
		blueGreenRequired: false,
		betaPhaseRequired: false,
	},
	[IntegrityLevel.LEVEL_2]: {
		maxScopePerRelease: "single_feature",
		incrementalDeliveryRequired: true,
		featureFlagsRequired: true,
		rollbackCapabilityRequired: true,
		rollbackTimeRequirement: "minutes",
		canaryDeploymentRequired: true,
		blueGreenRequired: false,
		betaPhaseRequired: true,
		betaDurationMinDays: 7,
	},
	[IntegrityLevel.LEVEL_3]: {
		maxScopePerRelease: "single_feature",
		incrementalDeliveryRequired: true,
		featureFlagsRequired: true,
		rollbackCapabilityRequired: true,
		rollbackTimeRequirement: "seconds",
		canaryDeploymentRequired: true,
		blueGreenRequired: true,
		betaPhaseRequired: true,
		betaDurationMinDays: 14,
	},
	[IntegrityLevel.LEVEL_4]: {
		maxScopePerRelease: "minimal",
		incrementalDeliveryRequired: true,
		featureFlagsRequired: true,
		rollbackCapabilityRequired: true,
		rollbackTimeRequirement: "automatic",
		canaryDeploymentRequired: true,
		blueGreenRequired: true,
		betaPhaseRequired: true,
		betaDurationMinDays: 30,
	},
};

export function deriveScopingConstraints(level: IntegrityLevel): ScopingConstraints {
	return SCOPING_CONSTRAINTS[level];
}

// -----------------------------------------------------------------------------
// Documentation Constraints
// -----------------------------------------------------------------------------

/**
 * Documentation constraints derived from integrity level
 */
export interface DocumentationConstraints {
	/** Requirements specification required */
	requirementsSpecRequired: boolean;
	/** Requirements formality */
	requirementsFormality: "user_stories" | "structured" | "formal" | "mathematical";
	/** Architecture documentation required */
	architectureDocRequired: boolean;
	/** API documentation required */
	apiDocRequired: boolean;
	/** Operations runbook required */
	runbookRequired: boolean;
	/** Safety case / assurance case required */
	assuranceCaseRequired: boolean;
	/** Hazard analysis required */
	hazardAnalysisRequired: boolean;
	/** Risk register required */
	riskRegisterRequired: boolean;
}

const DOCUMENTATION_CONSTRAINTS: Record<IntegrityLevel, DocumentationConstraints> = {
	[IntegrityLevel.LEVEL_0]: {
		requirementsSpecRequired: false,
		requirementsFormality: "user_stories",
		architectureDocRequired: false,
		apiDocRequired: false,
		runbookRequired: false,
		assuranceCaseRequired: false,
		hazardAnalysisRequired: false,
		riskRegisterRequired: false,
	},
	[IntegrityLevel.LEVEL_1]: {
		requirementsSpecRequired: true,
		requirementsFormality: "user_stories",
		architectureDocRequired: false,
		apiDocRequired: true,
		runbookRequired: false,
		assuranceCaseRequired: false,
		hazardAnalysisRequired: false,
		riskRegisterRequired: false,
	},
	[IntegrityLevel.LEVEL_2]: {
		requirementsSpecRequired: true,
		requirementsFormality: "structured",
		architectureDocRequired: true,
		apiDocRequired: true,
		runbookRequired: true,
		assuranceCaseRequired: false,
		hazardAnalysisRequired: false,
		riskRegisterRequired: true,
	},
	[IntegrityLevel.LEVEL_3]: {
		requirementsSpecRequired: true,
		requirementsFormality: "formal",
		architectureDocRequired: true,
		apiDocRequired: true,
		runbookRequired: true,
		assuranceCaseRequired: true,
		hazardAnalysisRequired: true,
		riskRegisterRequired: true,
	},
	[IntegrityLevel.LEVEL_4]: {
		requirementsSpecRequired: true,
		requirementsFormality: "mathematical",
		architectureDocRequired: true,
		apiDocRequired: true,
		runbookRequired: true,
		assuranceCaseRequired: true,
		hazardAnalysisRequired: true,
		riskRegisterRequired: true,
	},
};

export function deriveDocumentationConstraints(level: IntegrityLevel): DocumentationConstraints {
	return DOCUMENTATION_CONSTRAINTS[level];
}

// -----------------------------------------------------------------------------
// Complete Engineering Constraints
// -----------------------------------------------------------------------------

/**
 * Complete engineering constraints bundle
 */
export interface EngineeringConstraints {
	/** Computed integrity level */
	integrityLevel: IntegrityLevel;
	/** Human-readable level description */
	levelDescription: string;
	/** Testing constraints */
	testing: TestingConstraints;
	/** Architecture constraints */
	architecture: ArchitectureConstraints;
	/** Process constraints */
	process: ProcessConstraints;
	/** Scoping constraints */
	scoping: ScopingConstraints;
	/** Documentation constraints */
	documentation: DocumentationConstraints;
	/** Applicable regulatory standards */
	applicableStandards: RegulatoryDomain[];
	/** Assessment rationale */
	rationale: ConstraintRationale;
}

/**
 * Rationale for the constraint derivation
 */
export interface ConstraintRationale {
	/** Primary driver of the integrity level */
	primaryDriver: string;
	/** Individual dimension scores */
	dimensionScores: {
		safety: number;
		financial: number;
		reputational: number;
		data: number;
		exposure: number;
		userBase: number;
		recoverability: number;
	};
	/** Computed risk score */
	riskScore: number;
	/** Domain-specific adjustments applied */
	domainAdjustments: string[];
	/** Regulatory requirements that influenced the level */
	regulatoryInfluences: string[];
	/** Warnings or considerations */
	warnings: string[];
}

const LEVEL_DESCRIPTIONS: Record<IntegrityLevel, string> = {
	[IntegrityLevel.LEVEL_0]: "No special requirements - standard development practices",
	[IntegrityLevel.LEVEL_1]: "Low integrity - basic quality assurance required",
	[IntegrityLevel.LEVEL_2]: "Medium integrity - systematic quality and testing required",
	[IntegrityLevel.LEVEL_3]: "High integrity - rigorous verification and documentation required",
	[IntegrityLevel.LEVEL_4]: "Highest integrity - formal methods and exhaustive verification required",
};

/**
 * Derive all engineering constraints from integrity level
 */
export function deriveEngineeringConstraints(
	level: IntegrityLevel,
	applicableStandards: RegulatoryDomain[] = [],
	rationale?: Partial<ConstraintRationale>,
): EngineeringConstraints {
	return {
		integrityLevel: level,
		levelDescription: LEVEL_DESCRIPTIONS[level],
		testing: deriveTestingConstraints(level),
		architecture: deriveArchitectureConstraints(level),
		process: deriveProcessConstraints(level),
		scoping: deriveScopingConstraints(level),
		documentation: deriveDocumentationConstraints(level),
		applicableStandards,
		rationale: {
			primaryDriver: rationale?.primaryDriver ?? "Direct level specification",
			dimensionScores: rationale?.dimensionScores ?? {
				safety: 0,
				financial: 0,
				reputational: 0,
				data: 0,
				exposure: 0,
				userBase: 0,
				recoverability: 0,
			},
			riskScore: rationale?.riskScore ?? level,
			domainAdjustments: rationale?.domainAdjustments ?? [],
			regulatoryInfluences: rationale?.regulatoryInfluences ?? [],
			warnings: rationale?.warnings ?? [],
		},
	};
}

// =============================================================================
// SECTION 21: IMPACT-BASED INTEGRITY ASSESSMENT
// =============================================================================

/**
 * Domain baseline risk levels
 */
const DOMAIN_RISK_BASELINES: Partial<Record<SystemDomain, number>> = {
	// Safety-critical domains
	[SystemDomain.EMBEDDED_SYSTEM]: 3, // May be automotive, aviation, etc.
	[SystemDomain.FIRMWARE]: 2,
	[SystemDomain.RTOS_APPLICATION]: 3,
	[SystemDomain.PLC_PROGRAM]: 3,

	// Standard domains
	[SystemDomain.WEB_APPLICATION]: 1,
	[SystemDomain.MOBILE_APPLICATION]: 1,
	[SystemDomain.API_SERVICE]: 1,
	[SystemDomain.MICROSERVICE]: 1,

	// Low-risk domains
	[SystemDomain.CLI_TOOL]: 0,
	[SystemDomain.LIBRARY]: 1,
	[SystemDomain.INFRASTRUCTURE_AS_CODE]: 1,
};

/**
 * Domain to applicable standards mapping
 */
const DOMAIN_APPLICABLE_STANDARDS: Partial<Record<SystemDomain, RegulatoryDomain[]>> = {
	[SystemDomain.EMBEDDED_SYSTEM]: [RegulatoryDomain.IEC_61508],
	[SystemDomain.PLC_PROGRAM]: [RegulatoryDomain.IEC_61508, RegulatoryDomain.IEC_62443],
	[SystemDomain.WEB_APPLICATION]: [RegulatoryDomain.GDPR, RegulatoryDomain.SOC_2],
	[SystemDomain.API_SERVICE]: [RegulatoryDomain.SOC_2],
};

/**
 * Impact assessment input for deriving integrity level
 */
export interface ImpactAssessmentInput {
	/** System domain */
	domain: SystemDomain;

	/** Safety impact (0-4) */
	safetyImpact: number;

	/** Financial impact (0-4) */
	financialImpact: number;

	/** Reputational impact (0-4) */
	reputationalImpact: number;

	/** Data/privacy impact (0-4) */
	dataImpact: number;

	/** Exposure level */
	exposure: ExposureLevel;

	/** Controllability */
	controllability?: ControllabilityLevel;

	/** User base scale (0-4) */
	userBaseScale: number;

	/** Recoverability (0-4, higher = harder to recover) */
	recoverability: number;

	/** Optional: specific regulatory requirements */
	regulatoryRequirements?: RegulatoryDomain[];

	/** Optional: explicit integrity level override (for certified systems) */
	certifiedLevel?: IntegrityLevel;
}

/**
 * Compute integrity level from impact assessment
 */
export function computeIntegrityLevel(input: ImpactAssessmentInput): {
	level: IntegrityLevel;
	rationale: ConstraintRationale;
} {
	// If explicitly certified, use that level
	if (input.certifiedLevel !== undefined) {
		return {
			level: input.certifiedLevel,
			rationale: {
				primaryDriver: "Explicit certification requirement",
				dimensionScores: {
					safety: input.safetyImpact,
					financial: input.financialImpact,
					reputational: input.reputationalImpact,
					data: input.dataImpact,
					exposure: input.exposure,
					userBase: input.userBaseScale,
					recoverability: input.recoverability,
				},
				riskScore: input.certifiedLevel,
				domainAdjustments: ["Using explicit certification level"],
				regulatoryInfluences: input.regulatoryRequirements?.map(String) ?? [],
				warnings: [],
			},
		};
	}

	// Compute maximum consequence severity
	const maxConsequence = Math.max(
		input.safetyImpact,
		input.financialImpact,
		input.reputationalImpact,
		input.dataImpact,
	);

	// Identify primary driver
	let primaryDriver = "Unknown";
	if (maxConsequence === input.safetyImpact) {
		primaryDriver = "Safety impact";
	} else if (maxConsequence === input.financialImpact) {
		primaryDriver = "Financial impact";
	} else if (maxConsequence === input.reputationalImpact) {
		primaryDriver = "Reputational impact";
	} else if (maxConsequence === input.dataImpact) {
		primaryDriver = "Data/Privacy impact";
	}

	// Compute factors
	const controllability = input.controllability ?? ControllabilityLevel.NORMALLY_CONTROLLABLE;
	const controllabilityFactor = 1 + controllability / 3;
	const exposureFactor = 1 + input.exposure / 4;
	const userBaseFactor = 1 + input.userBaseScale / 4;
	const recoverabilityFactor = 1 + input.recoverability / 4;

	// Compute raw risk score
	const rawRiskScore =
		maxConsequence *
		exposureFactor *
		controllabilityFactor *
		Math.sqrt(userBaseFactor) *
		Math.sqrt(recoverabilityFactor);

	// Apply domain baseline
	const domainBaseline = DOMAIN_RISK_BASELINES[input.domain] ?? 0;
	const domainAdjustments: string[] = [];

	let adjustedRiskScore = rawRiskScore;
	if (domainBaseline > rawRiskScore) {
		adjustedRiskScore = domainBaseline;
		domainAdjustments.push(
			`Domain baseline (${input.domain}) raised level from ${rawRiskScore.toFixed(1)} to ${domainBaseline}`,
		);
	}

	// Apply regulatory requirements
	const applicableStandards = [
		...(DOMAIN_APPLICABLE_STANDARDS[input.domain] ?? []),
		...(input.regulatoryRequirements ?? []),
	];
	const regulatoryInfluences: string[] = [];

	for (const standard of applicableStandards) {
		const safetyCriticalStandards = [
			RegulatoryDomain.IEC_61508,
			RegulatoryDomain.ISO_26262,
			RegulatoryDomain.DO_178C,
			RegulatoryDomain.IEC_62304,
			RegulatoryDomain.EN_50128,
		];
		if (safetyCriticalStandards.includes(standard)) {
			if (adjustedRiskScore < 2) {
				adjustedRiskScore = 2;
				regulatoryInfluences.push(`${standard} requires minimum Level 2`);
			}
		}
	}

	// Clamp to valid range [0, 4]
	const clampedScore = Math.max(0, Math.min(4, Math.round(adjustedRiskScore)));

	// Warnings
	const warnings: string[] = [];
	if (input.safetyImpact >= 2 && clampedScore < 2) {
		warnings.push("Safety impact suggests higher integrity level may be needed");
	}
	if (clampedScore >= 3 && applicableStandards.length === 0) {
		warnings.push("High integrity level - consider formal safety standard compliance");
	}

	return {
		level: clampedScore as IntegrityLevel,
		rationale: {
			primaryDriver,
			dimensionScores: {
				safety: input.safetyImpact,
				financial: input.financialImpact,
				reputational: input.reputationalImpact,
				data: input.dataImpact,
				exposure: input.exposure,
				userBase: input.userBaseScale,
				recoverability: input.recoverability,
			},
			riskScore: adjustedRiskScore,
			domainAdjustments,
			regulatoryInfluences,
			warnings,
		},
	};
}

/**
 * Assess a project and derive engineering constraints
 */
export function assessProjectConstraints(input: ImpactAssessmentInput): EngineeringConstraints {
	const { level, rationale } = computeIntegrityLevel(input);

	const applicableStandards = [
		...new Set([
			...(DOMAIN_APPLICABLE_STANDARDS[input.domain] ?? []),
			...(input.regulatoryRequirements ?? []),
		]),
	];

	return deriveEngineeringConstraints(level, applicableStandards, rationale);
}

// =============================================================================
// SECTION 22: COMPLIANCE GAP ANALYSIS
// =============================================================================

/**
 * Current project status for compliance checking
 */
export interface ProjectComplianceStatus {
	/** Current code coverage */
	currentCoverage?: {
		statement: number;
		branch: number;
		mcdc?: number;
	};
	/** Has code review process */
	hasCodeReview: boolean;
	/** Number of reviewers */
	reviewerCount: number;
	/** Has redundancy */
	hasRedundancy: boolean;
	/** Monitoring level */
	monitoringLevel: "none" | "basic" | "comprehensive" | "real_time";
	/** Has rollback capability */
	hasRollback: boolean;
	/** Has audit trail */
	hasAuditTrail: boolean;
	/** Has design documentation */
	hasDesignDoc: boolean;
	/** Has requirements specification */
	hasRequirementsSpec: boolean;
}

/**
 * Compliance gap
 */
export interface ComplianceGap {
	category: "testing" | "architecture" | "process" | "scoping" | "documentation";
	requirement: string;
	currentState: string;
	requiredState: string;
	priority: "critical" | "high" | "medium" | "low";
}

/**
 * Compliance check result
 */
export interface ComplianceResult {
	compliant: boolean;
	gaps: ComplianceGap[];
	compliancePercentage: number;
}

/**
 * Check project compliance against derived constraints
 */
export function checkProjectCompliance(
	constraints: EngineeringConstraints,
	status: ProjectComplianceStatus,
): ComplianceResult {
	const gaps: ComplianceGap[] = [];

	// Check testing constraints
	if (status.currentCoverage) {
		if (status.currentCoverage.statement < constraints.testing.statementCoverage) {
			gaps.push({
				category: "testing",
				requirement: "Statement coverage",
				currentState: `${status.currentCoverage.statement}%`,
				requiredState: `${constraints.testing.statementCoverage}%`,
				priority: constraints.integrityLevel >= 3 ? "critical" : "high",
			});
		}
		if (status.currentCoverage.branch < constraints.testing.branchCoverage) {
			gaps.push({
				category: "testing",
				requirement: "Branch coverage",
				currentState: `${status.currentCoverage.branch}%`,
				requiredState: `${constraints.testing.branchCoverage}%`,
				priority: constraints.integrityLevel >= 3 ? "critical" : "high",
			});
		}
	}

	// Check process constraints
	if (constraints.process.codeReviewRequired && !status.hasCodeReview) {
		gaps.push({
			category: "process",
			requirement: "Code review",
			currentState: "Not implemented",
			requiredState: "Required",
			priority: "high",
		});
	}
	if (status.reviewerCount < constraints.process.minReviewers) {
		gaps.push({
			category: "process",
			requirement: "Minimum reviewers",
			currentState: `${status.reviewerCount} reviewers`,
			requiredState: `${constraints.process.minReviewers} reviewers`,
			priority: "medium",
		});
	}

	// Check architecture constraints
	if (constraints.architecture.redundancyRequired && !status.hasRedundancy) {
		gaps.push({
			category: "architecture",
			requirement: "Redundancy",
			currentState: "Not implemented",
			requiredState: `${constraints.architecture.redundancyType} redundancy required`,
			priority: "critical",
		});
	}
	if (constraints.architecture.auditTrailRequired && !status.hasAuditTrail) {
		gaps.push({
			category: "architecture",
			requirement: "Audit trail",
			currentState: "Not implemented",
			requiredState: `${constraints.architecture.auditTrailLevel} audit trail required`,
			priority: constraints.integrityLevel >= 3 ? "critical" : "high",
		});
	}

	// Check documentation constraints
	if (constraints.documentation.requirementsSpecRequired && !status.hasRequirementsSpec) {
		gaps.push({
			category: "documentation",
			requirement: "Requirements specification",
			currentState: "Not available",
			requiredState: `${constraints.documentation.requirementsFormality} format required`,
			priority: "high",
		});
	}
	if (constraints.documentation.architectureDocRequired && !status.hasDesignDoc) {
		gaps.push({
			category: "documentation",
			requirement: "Architecture documentation",
			currentState: "Not available",
			requiredState: "Required",
			priority: "medium",
		});
	}

	// Calculate compliance percentage
	const totalChecks = 10;
	const passedChecks = totalChecks - gaps.length;
	const compliancePercentage = Math.round((passedChecks / totalChecks) * 100);

	return {
		compliant: gaps.filter((g) => g.priority === "critical").length === 0,
		gaps,
		compliancePercentage,
	};
}

// =============================================================================
// SECTION 23: CONSTRAINT COMPARISON
// =============================================================================

/**
 * Compare constraints between two integrity levels
 */
export function compareIntegrityLevels(
	lower: IntegrityLevel,
	higher: IntegrityLevel,
): {
	testingDelta: Partial<TestingConstraints>;
	architectureDelta: Partial<ArchitectureConstraints>;
	processDelta: Partial<ProcessConstraints>;
	effortMultiplier: number;
} {
	if (lower > higher) {
		throw new Error("Lower level must be <= higher level");
	}

	const lowerTesting = deriveTestingConstraints(lower);
	const higherTesting = deriveTestingConstraints(higher);

	const testingDelta: Partial<TestingConstraints> = {};
	if (higherTesting.statementCoverage > lowerTesting.statementCoverage) {
		testingDelta.statementCoverage = higherTesting.statementCoverage;
	}
	if (higherTesting.branchCoverage > lowerTesting.branchCoverage) {
		testingDelta.branchCoverage = higherTesting.branchCoverage;
	}
	if (higherTesting.mcdcCoverage > lowerTesting.mcdcCoverage) {
		testingDelta.mcdcCoverage = higherTesting.mcdcCoverage;
	}
	if (higherTesting.faultInjectionRequired && !lowerTesting.faultInjectionRequired) {
		testingDelta.faultInjectionRequired = true;
	}
	if (higherTesting.independentVerificationRequired && !lowerTesting.independentVerificationRequired) {
		testingDelta.independentVerificationRequired = true;
	}

	// Effort roughly doubles per level
	const effortMultiplier = Math.pow(2, higher - lower);

	return {
		testingDelta,
		architectureDelta: {},
		processDelta: {},
		effortMultiplier,
	};
}

