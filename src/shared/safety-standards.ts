/**
 * Safety Standards Theory
 *
 * A Categorical Framework for Cross-Standard Safety Communication
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * THEORETICAL BRANCH: FORMAL FOUNDATIONS FOR CROSS-STANDARD VALIDATION
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This module contains the mathematical foundations for comparing and translating
 * between different industrial safety standards. It provides:
 *
 * 1. FORMAL DEFINITIONS of safety standard structures (lattices, ordinals)
 * 2. STANDARD-SPECIFIC LEVELS (SIL, ASIL, DAL, ECSS, IEC 62304)
 * 3. CROSS-STANDARD MAPPING via universal ordinal functors
 * 4. PROBABILITY CALCULUS for quantitative standards
 * 5. COMPOSITION THEOREMS for system-level analysis
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * RESEARCH PROGRAM: FORMAL FOUNDATIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * DRIVING OBSERVATION:
 *   Multiple industrial safety standards (IEC 61508, ISO 26262, DO-178C, ECSS,
 *   IEC 62304) developed independently, yet practitioners routinely treat them
 *   as if they were comparable — speaking of "SIL 3 equivalent" systems.
 *
 * PUZZLE:
 *   If these standards are truly incommensurable (different methodologies,
 *   different risk dimensions, different consequence scales), why does
 *   cross-standard communication work at all in practice?
 *
 * DEFINITION 1 (Safety Standard):
 *   A safety standard is a tuple S = (L, ≤, ⊥, ⊤, ρ) where:
 *   - L is a finite set of integrity levels
 *   - ≤ is a total order on L
 *   - ⊥ ∈ L is the bottom element (no safety requirements)
 *   - ⊤ ∈ L is the top element (maximum integrity)
 *   - ρ: L → R is a (possibly partial) risk reduction function
 *
 * DEFINITION 2 (Standards Universe):
 *   U = {S₁, S₂, ..., Sₙ} where:
 *   - S₁ = IEC 61508 (industrial)
 *   - S₂ = ISO 26262 (automotive)
 *   - S₃ = DO-178C + AC 25.1309 (aviation)
 *   - S₄ = ECSS-E-ST-40C (space)
 *   - S₅ = IEC 62304 (medical)
 *
 * DEFINITION 3 (Heterogeneity):
 *   Standards in U are heterogeneous:
 *   - Methodological: ρᵢ may be quantitative, qualitative, process-based, or severity-only
 *   - Dimensional: Risk inputs differ (C×F×P×W vs S×E×C vs severity alone)
 *   - Consequential: Top-level consequences differ in scale
 *
 * CENTRAL QUESTION:
 *   Given a heterogeneous standards universe U with no official inter-standard
 *   mappings, does there exist a universal construction that:
 *   (1) Preserves the internal order structure of each standard
 *   (2) Enables meaningful cross-standard comparison
 *   (3) Is canonical (not arbitrary)?
 *
 * HYPOTHESIS (Cross-Standard Ordinal Coherence):
 *   There exists a universal ordinal space U = ([0,1], ≤) and a family of
 *   order-preserving maps {φᵢ: Lᵢ → U} such that:
 *   - φᵢ(⊥ᵢ) = 0 and φᵢ(⊤ᵢ) = 1 for all i
 *   - φᵢ preserves order and lattice operations (join = max, meet = min)
 *
 * THESIS:
 *   Although safety standards are methodologically heterogeneous, they share
 *   a common algebraic structure — that of a bounded total order (chain) with
 *   a join-semilattice structure for composition. This structure is sufficient
 *   to define a meaningful universal ordinal space for cross-standard
 *   communication, even though probability semantics are NOT preserved.
 *
 * METHODOLOGICAL POSITION:
 *   Constructivist — the universal ordinal space is a DELIBERATE CONSTRUCTION
 *   that sacrifices semantic richness for comparability. The functor is
 *   explicitly lossy. This enables cross-standard COMMUNICATION, not SUBSTITUTION.
 *
 * NON-CLAIMS:
 *   This mapping does NOT establish:
 *   - Probability equivalence
 *   - Process equivalence
 *   - Legal/regulatory interchangeability
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * STANDARDS REFERENCED
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * PRIMARY SAFETY STANDARDS:
 * - IEC 61508:2010 - Functional Safety of E/E/PE Safety-Related Systems
 *   Source: Tables 2 & 3 for PFDavg and PFH thresholds
 *   Verified against: IEC 61508-1:2010, Annex D (Risk Graph Method)
 *
 * - ISO 26262:2018 - Road Vehicles Functional Safety
 *   Source: Part 5, Table 6 for PMHF targets; Part 9 for ASIL decomposition
 *   Note: ASIL determined via S×E×C matrix (qualitative), not probability
 *
 * - DO-178C - Software Considerations in Airborne Systems (RTCA, 2011)
 *   Note: Process-based, NO probability targets defined
 *   Probability targets from: AC 25.1309-1A (FAA Advisory Circular)
 *   Mapping via: SAE ARP4754A (Development of Civil Aircraft and Systems)
 *
 * - ECSS-E-ST-40C - Space Engineering: Software (ESA, 2009)
 *   Note: ADVISES AGAINST probabilistic software assessment (per ECSS-Q-HB-80-03A)
 *   Classification based on consequence severity only
 *
 * - IEC 62304:2006/Amd.1:2015 - Medical Device Software Lifecycle
 *   Note: Harm severity-based, NO probability thresholds
 *   Classes A/B/C based on potential for harm
 *
 * RELATED STANDARDS & GUIDANCE:
 * - AC 25.1309-1A - System Design and Analysis (FAA)
 * - SAE ARP4761 - Guidelines for Conducting Safety Assessment Process
 * - SAE ARP4754A - Development of Civil Aircraft and Systems
 * - IEC TR 61508-6-1 (Expected 2025) - Cross-standard recognition guidance
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * VERIFICATION STATUS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ✓ IEC 61508 PFH/PFD thresholds - VERIFIED per Tables 2 & 3
 * ✓ ISO 26262 PMHF targets - VERIFIED per Part 5, Table 6
 * ✓ DO-178C objectives - VERIFIED (71/69/62/26/0 for A/B/C/D/E)
 * ✓ AC 25.1309 probability classifications - VERIFIED
 * ✓ Lattice total order property - VERIFIED (each standard forms a chain)
 * ⚠ Cross-standard mapping - APPROXIMATE ONLY (no official mapping exists)
 * ⚠ Universal risk equation - THEORETICAL (not how actual standards work)
 */

// =============================================================================
// SECTION 1: TECHNOLOGY READINESS LEVELS (NASA/ISO 16290)
// =============================================================================

/**
 * Technology Readiness Levels (TRL)
 * Formal standard from NASA, adopted by ISO 16290:2013
 * Used by NASA, ESA, DoD, EU Horizon programs
 */
export enum TechnologyReadinessLevel {
	TRL_1 = 1, // Basic principles observed
	TRL_2 = 2, // Technology concept formulated
	TRL_3 = 3, // Experimental proof of concept
	TRL_4 = 4, // Technology validated in lab
	TRL_5 = 5, // Technology validated in relevant environment
	TRL_6 = 6, // Technology demonstrated in relevant environment
	TRL_7 = 7, // System prototype demonstration in operational environment
	TRL_8 = 8, // System complete and qualified
	TRL_9 = 9, // Actual system proven in operational environment
}

export interface TRLDefinition {
	level: TechnologyReadinessLevel;
	name: string;
	description: string;
	exitCriteria: string[];
	typicalArtifacts: string[];
}

export const TRL_DEFINITIONS: Record<TechnologyReadinessLevel, TRLDefinition> = {
	[TechnologyReadinessLevel.TRL_1]: {
		level: TechnologyReadinessLevel.TRL_1,
		name: "Basic Principles Observed",
		description:
			"Scientific research begins to be translated into applied R&D. Paper studies, thought experiments.",
		exitCriteria: ["Scientific literature published", "Basic principles identified"],
		typicalArtifacts: ["Research papers", "Theoretical models"],
	},
	[TechnologyReadinessLevel.TRL_2]: {
		level: TechnologyReadinessLevel.TRL_2,
		name: "Technology Concept Formulated",
		description: "Invention begins. Practical applications identified but speculative.",
		exitCriteria: ["Application concept documented", "Feasibility analysis complete"],
		typicalArtifacts: ["Concept papers", "Patent applications", "Feasibility studies"],
	},
	[TechnologyReadinessLevel.TRL_3]: {
		level: TechnologyReadinessLevel.TRL_3,
		name: "Experimental Proof of Concept",
		description: "Active R&D initiated. Analytical and laboratory studies to validate predictions.",
		exitCriteria: [
			"Proof of concept demonstrated",
			"Critical function verified analytically or experimentally",
		],
		typicalArtifacts: ["Lab prototypes", "Test reports", "Proof of concept code"],
	},
	[TechnologyReadinessLevel.TRL_4]: {
		level: TechnologyReadinessLevel.TRL_4,
		name: "Technology Validated in Lab",
		description:
			"Basic components integrated to establish they work together in laboratory environment.",
		exitCriteria: [
			"Components integrated",
			"Lab testing successful",
			"Performance baselines established",
		],
		typicalArtifacts: ["Integrated breadboard", "Lab test results", "Alpha prototype"],
	},
	[TechnologyReadinessLevel.TRL_5]: {
		level: TechnologyReadinessLevel.TRL_5,
		name: "Technology Validated in Relevant Environment",
		description:
			"Fidelity of breadboard significantly increases. Basic components integrated with realistic supporting elements.",
		exitCriteria: [
			"High-fidelity lab integration complete",
			"Simulated operational testing successful",
		],
		typicalArtifacts: ["High-fidelity prototype", "Simulation results", "Beta version"],
	},
	[TechnologyReadinessLevel.TRL_6]: {
		level: TechnologyReadinessLevel.TRL_6,
		name: "Technology Demonstrated in Relevant Environment",
		description: "Representative model or prototype tested in relevant environment.",
		exitCriteria: [
			"Prototype demonstrated in relevant environment",
			"Performance verified against requirements",
		],
		typicalArtifacts: ["Engineering prototype", "Field test reports", "Release candidate"],
	},
	[TechnologyReadinessLevel.TRL_7]: {
		level: TechnologyReadinessLevel.TRL_7,
		name: "System Prototype in Operational Environment",
		description:
			"Prototype near or at planned operational system. Demonstrates readiness for operational environment.",
		exitCriteria: [
			"Operational prototype demonstrated",
			"Most functions demonstrated in realistic scenarios",
		],
		typicalArtifacts: ["Operational prototype", "Pilot deployment", "Pre-production unit"],
	},
	[TechnologyReadinessLevel.TRL_8]: {
		level: TechnologyReadinessLevel.TRL_8,
		name: "System Complete and Qualified",
		description:
			"Technology proven through successful mission operations. Final development, testing, and qualification.",
		exitCriteria: [
			"All testing complete",
			"System qualified through demonstration",
			"Documentation complete",
		],
		typicalArtifacts: ["Qualified system", "Test reports", "Certification documentation"],
	},
	[TechnologyReadinessLevel.TRL_9]: {
		level: TechnologyReadinessLevel.TRL_9,
		name: "Actual System Proven in Operations",
		description:
			"Actual application of technology in operational environment. Sustained operational use.",
		exitCriteria: [
			"Operational deployment successful",
			"Mission objectives achieved",
			"Lessons learned documented",
		],
		typicalArtifacts: ["Production system", "Operations manual", "Maintenance procedures"],
	},
};

// =============================================================================
// SECTION 2: SAFETY INTEGRITY LEVELS (IEC 61508)
// =============================================================================

/**
 * Safety Integrity Level (SIL)
 * Formal standard from IEC 61508 for functional safety
 * Used in industrial systems, process control, machinery
 *
 * Reference: IEC 61508-1:2010, Tables 2 & 3
 *
 * Note: IEC 61508-5 Annex D (Risk Graph) defines outcomes BELOW SIL 1:
 *   - "a" = No special safety requirements
 *   - "-" = Risk already tolerable (no SIS needed)
 * These are modeled as SIL_0 in this implementation.
 */
export enum SafetyIntegrityLevel {
	SIL_0 = 0, // No safety requirements (includes "a" and "-" from risk graph)
	SIL_1 = 1, // Low safety integrity
	SIL_2 = 2, // Medium safety integrity
	SIL_3 = 3, // High safety integrity
	SIL_4 = 4, // Highest safety integrity (rarely achieved)
}

export interface SILDefinition {
	level: SafetyIntegrityLevel;
	name: string;
	pfdAvg: string; // Probability of Failure on Demand (average)
	riskReductionFactor: string;
	typicalApplications: string[];
	requiredTechniques: string[];
}

export const SIL_DEFINITIONS: Record<SafetyIntegrityLevel, SILDefinition> = {
	[SafetyIntegrityLevel.SIL_0]: {
		level: SafetyIntegrityLevel.SIL_0,
		name: "No Safety Requirements",
		pfdAvg: "N/A",
		riskReductionFactor: "N/A",
		typicalApplications: [
			"Non-safety-critical systems",
			"Entertainment",
			"General business software",
		],
		requiredTechniques: ["Standard development practices"],
	},
	[SafetyIntegrityLevel.SIL_1]: {
		level: SafetyIntegrityLevel.SIL_1,
		name: "Low Safety Integrity",
		pfdAvg: "≥10⁻² to <10⁻¹",
		riskReductionFactor: "10-100",
		typicalApplications: ["Building automation", "HVAC systems", "Basic industrial controls"],
		requiredTechniques: ["Structured programming", "Code reviews", "Functional testing"],
	},
	[SafetyIntegrityLevel.SIL_2]: {
		level: SafetyIntegrityLevel.SIL_2,
		name: "Medium Safety Integrity",
		pfdAvg: "≥10⁻³ to <10⁻²",
		riskReductionFactor: "100-1,000",
		typicalApplications: ["Railway signaling", "Industrial robots", "Medical devices (Class II)"],
		requiredTechniques: [
			"Formal design methods",
			"Static analysis",
			"Coverage testing",
			"Independent verification",
		],
	},
	[SafetyIntegrityLevel.SIL_3]: {
		level: SafetyIntegrityLevel.SIL_3,
		name: "High Safety Integrity",
		pfdAvg: "≥10⁻⁴ to <10⁻³",
		riskReductionFactor: "1,000-10,000",
		typicalApplications: [
			"Nuclear safety systems",
			"Chemical plant emergency shutdown",
			"Medical devices (Class III)",
		],
		requiredTechniques: [
			"Formal methods",
			"Proven in use",
			"Diverse redundancy",
			"Independent V&V",
		],
	},
	[SafetyIntegrityLevel.SIL_4]: {
		level: SafetyIntegrityLevel.SIL_4,
		name: "Highest Safety Integrity",
		pfdAvg: "≥10⁻⁵ to <10⁻⁴",
		riskReductionFactor: "10,000-100,000",
		typicalApplications: [
			"Nuclear reactor protection",
			"Aircraft flight controls (rarely required)",
		],
		requiredTechniques: ["Formal verification", "N-version programming", "Extensive proven in use"],
	},
};

// =============================================================================
// SECTION 3: AUTOMOTIVE SAFETY INTEGRITY LEVEL (ISO 26262)
// =============================================================================

/**
 * Automotive Safety Integrity Level (ASIL)
 * Formal standard from ISO 26262 for road vehicles
 */
export enum AutomotiveSafetyIntegrityLevel {
	QM = "QM", // Quality Management (no safety requirements)
	ASIL_A = "A", // Lowest safety-critical
	ASIL_B = "B", // Low-medium
	ASIL_C = "C", // Medium-high
	ASIL_D = "D", // Highest safety-critical
}

/**
 * ASIL Definition with hardware metrics
 *
 * Reference: ISO 26262-5:2018, Table 6
 *
 * Note: ASIL is determined QUALITATIVELY via Hazard Analysis and Risk
 * Assessment (HARA) using Severity × Exposure × Controllability matrix.
 * Once assigned, hardware must meet quantitative PMHF/SPFM/LFM targets.
 */
export interface ASILDefinition {
	level: AutomotiveSafetyIntegrityLevel;
	name: string;
	severity: string;
	exposure: string;
	controllability: string;
	typicalApplications: string[];
	/** Probabilistic Metric for Hardware Failure (/hour) - hardware only! */
	pmhfTarget?: string;
	/** Single-Point Fault Metric (%) */
	spfm?: number;
	/** Latent Fault Metric (%) */
	lfm?: number;
}

export const ASIL_DEFINITIONS: Record<AutomotiveSafetyIntegrityLevel, ASILDefinition> = {
	[AutomotiveSafetyIntegrityLevel.QM]: {
		level: AutomotiveSafetyIntegrityLevel.QM,
		name: "Quality Management",
		severity: "No safety impact",
		exposure: "N/A",
		controllability: "N/A",
		typicalApplications: ["Infotainment", "Seat heating", "Non-safety ECUs"],
	},
	[AutomotiveSafetyIntegrityLevel.ASIL_A]: {
		level: AutomotiveSafetyIntegrityLevel.ASIL_A,
		name: "ASIL A",
		severity: "Light injuries",
		exposure: "Low",
		controllability: "High",
		typicalApplications: ["Rear lights", "Horn", "Wipers"],
		pmhfTarget: "N/A (no quantitative target)",
	},
	[AutomotiveSafetyIntegrityLevel.ASIL_B]: {
		level: AutomotiveSafetyIntegrityLevel.ASIL_B,
		name: "ASIL B",
		severity: "Severe injuries (survival probable)",
		exposure: "Medium",
		controllability: "Medium",
		typicalApplications: ["Headlights", "Cruise control", "Electric windows"],
		pmhfTarget: "<10⁻⁷/hour",
		spfm: 90,
		lfm: 60,
	},
	[AutomotiveSafetyIntegrityLevel.ASIL_C]: {
		level: AutomotiveSafetyIntegrityLevel.ASIL_C,
		name: "ASIL C",
		severity: "Life-threatening (survival uncertain)",
		exposure: "High",
		controllability: "Low",
		typicalApplications: ["Power steering", "Suspension control", "Battery management"],
		pmhfTarget: "<10⁻⁷/hour",
		spfm: 97,
		lfm: 80,
	},
	[AutomotiveSafetyIntegrityLevel.ASIL_D]: {
		level: AutomotiveSafetyIntegrityLevel.ASIL_D,
		name: "ASIL D",
		severity: "Life-threatening or fatal",
		exposure: "High",
		controllability: "Difficult/impossible",
		typicalApplications: ["Airbags", "ABS/ESC", "Autonomous driving", "Brake-by-wire"],
		pmhfTarget: "<10⁻⁸/hour",
		spfm: 99,
		lfm: 90,
	},
};

// =============================================================================
// SECTION 4: AVIATION SOFTWARE LEVELS (DO-178C)
// =============================================================================

/**
 * Design Assurance Level (DAL) from DO-178C
 * Formal standard for airborne systems and equipment
 */
export enum DesignAssuranceLevel {
	DAL_E = "E", // No effect on safety
	DAL_D = "D", // Minor failure condition
	DAL_C = "C", // Major failure condition
	DAL_B = "B", // Hazardous failure condition
	DAL_A = "A", // Catastrophic failure condition
}

export interface DALDefinition {
	level: DesignAssuranceLevel;
	name: string;
	failureCondition: string;
	objectives: number;
	independenceRequired: boolean;
	typicalApplications: string[];
}

/**
 * DO-178C Design Assurance Level Definitions
 *
 * Reference: DO-178C/ED-12C (RTCA/EUROCAE, 2011)
 *
 * ⚠️ CRITICAL: DO-178C defines NO probability targets!
 * It's purely PROCESS-BASED (number of objectives, verification activities).
 * Probability targets come from AC 25.1309-1A via failure condition severity.
 *
 * Objective counts are VERIFIED from DO-178C Table A-1 through A-10:
 *   - DAL A: 71 objectives (33 with independence requirements)
 *   - DAL B: 69 objectives (21 with independence requirements)
 *   - DAL C: 62 objectives (8 with independence requirements)
 *   - DAL D: 26 objectives (5 with independence requirements)
 *   - DAL E: 0 objectives (outside purview of DO-178C)
 */
export const DAL_DEFINITIONS: Record<DesignAssuranceLevel, DALDefinition> = {
	[DesignAssuranceLevel.DAL_E]: {
		level: DesignAssuranceLevel.DAL_E,
		name: "Level E - No Effect",
		failureCondition: "No effect on aircraft operation or crew workload",
		objectives: 0,
		independenceRequired: false,
		typicalApplications: ["Passenger entertainment", "Galley equipment"],
	},
	[DesignAssuranceLevel.DAL_D]: {
		level: DesignAssuranceLevel.DAL_D,
		name: "Level D - Minor",
		failureCondition: "Slight reduction in safety margins or functional capabilities",
		objectives: 26,
		independenceRequired: false,
		typicalApplications: ["Cabin lighting", "Non-critical displays"],
	},
	[DesignAssuranceLevel.DAL_C]: {
		level: DesignAssuranceLevel.DAL_C,
		name: "Level C - Major",
		failureCondition: "Significant reduction in safety margins or functional capabilities",
		objectives: 62,
		independenceRequired: false,
		typicalApplications: ["Fuel quantity indication", "Ice detection"],
	},
	[DesignAssuranceLevel.DAL_B]: {
		level: DesignAssuranceLevel.DAL_B,
		name: "Level B - Hazardous",
		failureCondition: "Large reduction in safety margins, physical distress to passengers/crew",
		objectives: 69,
		independenceRequired: true,
		typicalApplications: ["Engine control", "Flight management", "Autopilot"],
	},
	[DesignAssuranceLevel.DAL_A]: {
		level: DesignAssuranceLevel.DAL_A,
		name: "Level A - Catastrophic",
		failureCondition: "Failure may cause a crash, multiple fatalities",
		objectives: 71,
		independenceRequired: true,
		typicalApplications: [
			"Primary flight control",
			"Flight-critical sensors",
			"Collision avoidance",
		],
	},
};

// =============================================================================
// SECTION 5: SPACE SOFTWARE CRITICALITY (ECSS)
// =============================================================================

/**
 * Software Criticality Categories from ECSS-E-ST-40C
 * European Space Agency standard for space software
 *
 * Reference: ECSS-E-ST-40C (ESA, 2009), ECSS-Q-HB-80-03A (guidance)
 *
 * ⚠️ NOTE: ECSS-Q-HB-80-03A advises against probabilistic assessment
 * of software failures as a criterion for criticality category assignment.
 *
 * Classification is based PURELY on:
 * - Consequence severity of function failure
 * - Availability of compensating provisions
 *
 * Note: Category ordering is A (highest) to D (lowest) - OPPOSITE of
 * IEC 62304's Class A (lowest) to C (highest).
 */
export enum SpaceSoftwareCriticality {
	CATEGORY_A = "A", // Catastrophic - highest criticality
	CATEGORY_B = "B", // Critical
	CATEGORY_C = "C", // Major
	CATEGORY_D = "D", // Minor/Negligible - lowest criticality
}

export interface SpaceCriticalityDefinition {
	category: SpaceSoftwareCriticality;
	name: string;
	consequence: string;
	verificationRigor: "maximum" | "high" | "standard" | "minimum";
	typicalApplications: string[];
}

export const SPACE_CRITICALITY_DEFINITIONS: Record<
	SpaceSoftwareCriticality,
	SpaceCriticalityDefinition
> = {
	[SpaceSoftwareCriticality.CATEGORY_A]: {
		category: SpaceSoftwareCriticality.CATEGORY_A,
		name: "Catastrophic",
		consequence: "Loss of life, loss of mission, loss of launch vehicle or spacecraft",
		verificationRigor: "maximum",
		typicalApplications: ["GNC software", "Propulsion control", "Life support (crewed)"],
	},
	[SpaceSoftwareCriticality.CATEGORY_B]: {
		category: SpaceSoftwareCriticality.CATEGORY_B,
		name: "Critical",
		consequence: "Major mission degradation, major damage to flight or ground systems",
		verificationRigor: "high",
		typicalApplications: ["Payload control", "Communication systems", "Power management"],
	},
	[SpaceSoftwareCriticality.CATEGORY_C]: {
		category: SpaceSoftwareCriticality.CATEGORY_C,
		name: "Major",
		consequence: "Mission degradation, significant damage to systems",
		verificationRigor: "standard",
		typicalApplications: ["Data handling", "Thermal control", "Housekeeping"],
	},
	[SpaceSoftwareCriticality.CATEGORY_D]: {
		category: SpaceSoftwareCriticality.CATEGORY_D,
		name: "Minor/Negligible",
		consequence: "Minor mission impact, minor or no damage",
		verificationRigor: "minimum",
		typicalApplications: [
			"Science data processing",
			"Non-critical telemetry",
			"Ground support tools",
		],
	},
};

// =============================================================================
// SECTION 6: MEDICAL DEVICE SOFTWARE SAFETY (IEC 62304)
// =============================================================================

/**
 * IEC 62304 Software Safety Classification
 * Formal standard for medical device software lifecycle
 *
 * Reference: IEC 62304:2006/Amd.1:2015
 *
 * ⚠️ IMPORTANT:
 * - Class determination is based on HARM SEVERITY, not probability
 * - The 2015 amendment introduced risk acceptability considerations
 *   beyond pure severity, but NO quantitative probability thresholds
 * - Classification follows:
 *   Class A: No harm possible
 *   Class B: Non-serious injury possible WITH unacceptable risk
 *   Class C: Death or serious injury possible WITH unacceptable risk
 *
 * Note: Class ordering is A (lowest) to C (highest) - OPPOSITE of
 * ECSS's Category A (highest) to D (lowest).
 */
export enum MedicalDeviceSoftwareClass {
	CLASS_A = "A", // No injury or damage to health - lowest class
	CLASS_B = "B", // Non-serious injury
	CLASS_C = "C", // Death or serious injury possible - highest class
}

export interface MedicalSoftwareClassDefinition {
	class: MedicalDeviceSoftwareClass;
	name: string;
	hazardConsequence: string;
	requiredDocumentation: string[];
	requiredActivities: string[];
	typicalApplications: string[];
}

export const MEDICAL_SOFTWARE_CLASS_DEFINITIONS: Record<
	MedicalDeviceSoftwareClass,
	MedicalSoftwareClassDefinition
> = {
	[MedicalDeviceSoftwareClass.CLASS_A]: {
		class: MedicalDeviceSoftwareClass.CLASS_A,
		name: "Class A - No Injury",
		hazardConsequence: "No injury or damage to health is possible",
		requiredDocumentation: [
			"Software development plan",
			"Software requirements",
			"Software architecture",
		],
		requiredActivities: ["Risk management", "Configuration management", "Problem resolution"],
		typicalApplications: [
			"Health tracking apps",
			"Appointment scheduling",
			"Non-diagnostic displays",
		],
	},
	[MedicalDeviceSoftwareClass.CLASS_B]: {
		class: MedicalDeviceSoftwareClass.CLASS_B,
		name: "Class B - Non-Serious Injury",
		hazardConsequence: "Non-serious injury is possible",
		requiredDocumentation: [
			"Software development plan",
			"Software requirements",
			"Software architecture",
			"Detailed design",
			"Unit verification",
			"Integration testing",
		],
		requiredActivities: [
			"Risk management",
			"Configuration management",
			"Problem resolution",
			"Traceability",
			"Code review",
		],
		typicalApplications: [
			"Diagnostic imaging viewers",
			"Lab information systems",
			"Patient monitoring displays",
		],
	},
	[MedicalDeviceSoftwareClass.CLASS_C]: {
		class: MedicalDeviceSoftwareClass.CLASS_C,
		name: "Class C - Serious Injury or Death",
		hazardConsequence: "Death or serious injury is possible",
		requiredDocumentation: [
			"Software development plan",
			"Software requirements",
			"Software architecture",
			"Detailed design",
			"Unit verification",
			"Integration testing",
			"System testing",
			"Software release documentation",
		],
		requiredActivities: [
			"Risk management",
			"Configuration management",
			"Problem resolution",
			"Full traceability",
			"Code review",
			"Static analysis",
			"Independent verification",
		],
		typicalApplications: [
			"Infusion pumps",
			"Ventilators",
			"Defibrillators",
			"Radiation therapy systems",
		],
	},
};

// =============================================================================
// SECTION 7: LATTICE ALGEBRA FOUNDATIONS
// =============================================================================
//
// Core lattice abstractions are imported from the domain-agnostic theory module.
// This module extends them with safety-standard-specific semantics.
// =============================================================================

import {
	// Core abstractions
	Ordering,
	type OrderedElement,
	type BoundedLattice,
	createBoundedLattice,

	// Composition (abstract version - SafetyLattice has its own implementation)
	type CompositionStrategy,
	type DecompositionResult,
	decomposeRequirement,

	// Cross-lattice mapping
	type UniversalOrdinal,
	toUniversalOrdinal,
	compareAcrossLattices,
	findNearestEquivalent,
	type CrossLatticeMapping,

	// Homomorphisms & Galois connections
	type LatticeHomomorphism,
	createNearestHomomorphism,
	type GaloisConnection,
	createGaloisConnection,
	checkGaloisProperty,

	// Registry
	LatticeRegistry,
	globalRegistry,

	// Utilities
	describeLattice,
	validateLattice,
} from "./lattice-theory";

// Re-export core types for convenience
export {
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
};

/**
 * Assessment methodology used by a safety standard
 */
export enum AssessmentMethodology {
	QUANTITATIVE_PROBABILITY = "quantitative_probability", // IEC 61508
	QUALITATIVE_MATRIX = "qualitative_matrix", // ISO 26262 (S×E×C)
	PROCESS_BASED = "process_based", // DO-178C
	SEVERITY_BASED = "severity_based", // ECSS, IEC 62304
}

/**
 * Safety-specific integrity level extending the abstract OrderedElement
 *
 * This adds the `id` field required by OrderedElement while maintaining
 * backward compatibility with existing code using `name`.
 */
export interface IntegrityLevel extends OrderedElement {
	// OrderedElement provides: id, ordinal, name
	// For safety levels, id === name for simplicity
}

/**
 * Normalized consequence severity
 * Maps domain-specific outcomes to universal scale
 *
 * ⚠️ WARNING: Scales are NOT equivalent across domains!
 * Aircraft catastrophic ≠ automotive catastrophic ≠ industrial catastrophic
 */
export enum ConsequenceSeverity {
	NEGLIGIBLE = 0, // No injury, minor inconvenience
	MARGINAL = 1, // Minor injury, significant inconvenience
	SERIOUS = 2, // Serious injury, major damage
	CRITICAL = 3, // Single death, severe injury, major system loss
	CATASTROPHIC = 4, // Multiple deaths, total system loss
}

/**
 * IEC 61508 operating mode - determines which probability metric applies
 */
export enum IEC61508OperatingMode {
	LOW_DEMAND = "low_demand", // < 1 demand/year, uses PFDavg
	HIGH_DEMAND = "high_demand", // ≥ 1 demand/year, uses PFH
	CONTINUOUS = "continuous", // Always operating, uses PFH
}

export interface NumericRange {
	min: number;
	max: number;
}

/**
 * Failure probability bounds - the quantitative anchor
 *
 * ⚠️ NOTE: Only applicable to quantitative standards (IEC 61508)
 * Other standards either:
 * - Have no probability targets (ISO 26262 ASIL A, DO-178C)
 * - Get probability from separate documents (DO-178C + AC 25.1309)
 * - Advise against probabilistic assessment (ECSS for software)
 */
export interface FailureProbabilityBound {
	/** Upper bound (worst acceptable) */
	upper: number;
	/** Lower bound (level floor) */
	lower: number;
	/** Unit of measurement */
	unit: "per_hour" | "per_demand" | "per_mission" | "per_flight_hour";
	/** Confidence level for the bound */
	confidence: number;
	/** Source document for these values */
	source?: string;
}

/**
 * Abstract safety integrity level - the universal type
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * ⚠️ THEORETICAL CONSTRUCT — QUOTIENT SEMANTICS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This is a DELIBERATELY LOSSY representation. Each standard-specific level is
 * mapped via a FUNCTOR (toUniversal) to this common codomain.
 *
 * WHAT IS PRESERVED:
 *   - Ordinal ordering (higher = more stringent)
 *   - Lattice operations (join = max, meet = min)
 *   - Probability bounds where they exist
 *
 * WHAT IS QUOTIENT'D AWAY (LOST):
 *   - ISO 26262: S×E×C decomposition (why a level was assigned)
 *   - IEC 61508: Demand mode (low-demand vs continuous)
 *   - DO-178C: Objective counts and independence requirements
 *   - ECSS: Compensating provisions
 *   - Domain-specific consequence scales
 */
export interface UniversalIntegrityLevel {
	/**
	 * Normalized ordinal ∈ [0, 1]
	 * 0 = no safety requirements (⊥)
	 * 1 = maximum integrity (⊤)
	 */
	readonly ordinal: number;

	/**
	 * Probability target (if applicable)
	 * NULL for standards that don't use probability
	 */
	readonly failureProbability: FailureProbabilityBound | null;

	/**
	 * Risk Reduction Factor (RRF) - if applicable
	 * NULL for non-quantitative standards
	 */
	readonly riskReductionFactor: NumericRange | null;

	/**
	 * Consequence severity if the safety function fails
	 */
	readonly consequenceSeverity: ConsequenceSeverity;

	/**
	 * Assessment methodology of the source standard
	 */
	readonly methodology: AssessmentMethodology;
}

/**
 * Definition 1 (Safety Standard) — TypeScript realization
 *
 * A safety standard S = (L, ≤, ⊥, ⊤, ρ) where:
 * - L: finite set of integrity levels (the `levels` array)
 * - ≤: total order on L (the `compare` function)
 * - ⊥: bottom element (the `bottom` property)
 * - ⊤: top element (the `top` property)
 * - ρ: risk reduction function (the `toUniversal` method, partially)
 */
export interface SafetyStandardStructure<L extends IntegrityLevel> {
	readonly levels: readonly L[];
	readonly bottom: L;
	readonly top: L;
	compare(a: L, b: L): Ordering;
	readonly standardId: StandardIdentifier;
}

/**
 * Definition 2 (Standards Universe) — Identifiers
 */
export enum StandardIdentifier {
	IEC_61508 = "IEC_61508", // S₁ - Industrial
	ISO_26262 = "ISO_26262", // S₂ - Automotive
	DO_178C = "DO_178C", // S₃ - Aviation (+ AC 25.1309)
	ECSS = "ECSS", // S₄ - Space
	IEC_62304 = "IEC_62304", // S₅ - Medical
}

/**
 * Definition 3 (Heterogeneity) — TypeScript encoding
 */
export interface StandardHeterogeneity {
	readonly methodology: AssessmentMethodology;
	readonly riskDimensions: readonly string[];
	readonly consequenceScale: ConsequenceScaleDescription;
}

export interface ConsequenceScaleDescription {
	readonly domain: string;
	readonly typicalTopConsequence: string;
	readonly approximateCasualties: string;
}

/**
 * The Standards Universe — instantiation of Definition 2
 */
export const STANDARDS_UNIVERSE: Record<StandardIdentifier, StandardHeterogeneity> = {
	[StandardIdentifier.IEC_61508]: {
		methodology: AssessmentMethodology.QUANTITATIVE_PROBABILITY,
		riskDimensions: ["Consequence", "Frequency", "Probability", "Avoidance"],
		consequenceScale: {
			domain: "Industrial",
			typicalTopConsequence: "Plant explosion with exposure zone",
			approximateCasualties: "Varies by exposure zone definition",
		},
	},
	[StandardIdentifier.ISO_26262]: {
		methodology: AssessmentMethodology.QUALITATIVE_MATRIX,
		riskDimensions: ["Severity", "Exposure", "Controllability"],
		consequenceScale: {
			domain: "Automotive",
			typicalTopConsequence: "Loaded passenger vehicle collision",
			approximateCasualties: "~6 people maximum",
		},
	},
	[StandardIdentifier.DO_178C]: {
		methodology: AssessmentMethodology.PROCESS_BASED,
		riskDimensions: ["Failure Condition Severity"],
		consequenceScale: {
			domain: "Aviation",
			typicalTopConsequence: "Aircraft loss",
			approximateCasualties: "Hundreds",
		},
	},
	[StandardIdentifier.ECSS]: {
		methodology: AssessmentMethodology.SEVERITY_BASED,
		riskDimensions: ["Consequence Severity", "Compensating Provisions"],
		consequenceScale: {
			domain: "Space",
			typicalTopConsequence: "Mission loss / crew fatality",
			approximateCasualties: "Crew size (typically 3-7)",
		},
	},
	[StandardIdentifier.IEC_62304]: {
		methodology: AssessmentMethodology.SEVERITY_BASED,
		riskDimensions: ["Harm Severity"],
		consequenceScale: {
			domain: "Medical",
			typicalTopConsequence: "Patient death",
			approximateCasualties: "Typically single patient",
		},
	},
};

/**
 * Definition 4 (Universal Ordinal Functor)
 *
 * φᵢ: Lᵢ → [0,1] mapping each standard's levels to the universal ordinal space
 */
export type UniversalOrdinalFunctor<L extends IntegrityLevel> = (level: L) => number;

/**
 * Create a universal ordinal functor for a given standard
 */
export function createUniversalOrdinalFunctor<L extends IntegrityLevel>(
	levels: readonly L[],
): UniversalOrdinalFunctor<L> {
	const maxOrdinal = levels.length - 1;
	return (level: L) => level.ordinal / maxOrdinal;
}

/**
 * The safety integrity lattice
 *
 * Mathematical definition:
 *   𝕃 = (L, ⊥, ⊤, ⊔, ⊓, ≤)
 */
export interface SafetyLattice<T extends IntegrityLevel> {
	readonly levels: readonly T[];
	readonly bottom: T;
	readonly top: T;
	compare(a: T, b: T): Ordering;
	join(a: T, b: T): T;
	meet(a: T, b: T): T;
	toUniversal(level: T): UniversalIntegrityLevel;
}

/**
 * Verification result for axiom checking
 */
export interface LatticeVerificationResult {
	valid: boolean;
	violations: string[];
}

/**
 * Runtime verification of lattice axioms
 */
export function verifyLatticeAxioms<T extends IntegrityLevel>(
	lattice: SafetyLattice<T>,
): LatticeVerificationResult {
	const violations: string[] = [];

	// Axiom 1: Total Order - verify antisymmetry and consistency
	for (const a of lattice.levels) {
		for (const b of lattice.levels) {
			const cmp_ab = lattice.compare(a, b);
			const cmp_ba = lattice.compare(b, a);

			if (cmp_ab === Ordering.LESS && cmp_ba === Ordering.LESS) {
				violations.push(`Antisymmetry violated: ${a.name} < ${b.name} and ${b.name} < ${a.name}`);
			}

			if (cmp_ab === Ordering.LESS && cmp_ba !== Ordering.GREATER) {
				violations.push(`Order consistency violated: ${a.name}, ${b.name}`);
			}
		}
	}

	// Axiom 2: Bounded
	for (const x of lattice.levels) {
		if (lattice.compare(lattice.bottom, x) === Ordering.GREATER) {
			violations.push(`Bottom bound violated: ⊥ > ${x.name}`);
		}
		if (lattice.compare(x, lattice.top) === Ordering.GREATER) {
			violations.push(`Top bound violated: ${x.name} > ⊤`);
		}
	}

	// Axiom 3: Join is least upper bound
	for (const a of lattice.levels) {
		for (const b of lattice.levels) {
			const j = lattice.join(a, b);

			if (lattice.compare(a, j) === Ordering.GREATER) {
				violations.push(`Join upper bound violated: ${a.name} > join(${a.name}, ${b.name})`);
			}
			if (lattice.compare(b, j) === Ordering.GREATER) {
				violations.push(`Join upper bound violated: ${b.name} > join(${a.name}, ${b.name})`);
			}

			const j_ba = lattice.join(b, a);
			if (j.ordinal !== j_ba.ordinal) {
				violations.push(
					`Join commutativity violated: ${a.name} ⊔ ${b.name} ≠ ${b.name} ⊔ ${a.name}`,
				);
			}
		}

		const joinBottom = lattice.join(a, lattice.bottom);
		if (joinBottom.ordinal !== a.ordinal) {
			violations.push(`Join identity violated: ${a.name} ⊔ ⊥ ≠ ${a.name}`);
		}

		const joinTop = lattice.join(a, lattice.top);
		if (joinTop.ordinal !== lattice.top.ordinal) {
			violations.push(`Join absorption violated: ${a.name} ⊔ ⊤ ≠ ⊤`);
		}

		const joinSelf = lattice.join(a, a);
		if (joinSelf.ordinal !== a.ordinal) {
			violations.push(`Join idempotence violated: ${a.name} ⊔ ${a.name} ≠ ${a.name}`);
		}
	}

	// Axiom 4: Probability consistency
	const sortedLevels = [...lattice.levels].sort((a, b) => a.ordinal - b.ordinal);
	for (let i = 1; i < sortedLevels.length; i++) {
		const prevLevel = sortedLevels[i - 1];
		const currLevel = sortedLevels[i];
		if (prevLevel && currLevel) {
			const lower = lattice.toUniversal(prevLevel);
			const higher = lattice.toUniversal(currLevel);
			if (lower.failureProbability && higher.failureProbability) {
				if (lower.failureProbability.upper < higher.failureProbability.upper) {
					violations.push(
						`Probability consistency violated: ${prevLevel.name} has lower PFH than ${currLevel.name}`,
					);
				}
			}
		}
	}

	return {
		valid: violations.length === 0,
		violations,
	};
}

// =============================================================================
// SECTION 8: CROSS-STANDARD ISOMORPHISM
// =============================================================================

/**
 * Confidence level for cross-standard mappings
 */
export enum MappingConfidence {
	HIGH = "high",
	MEDIUM = "medium",
	LOW = "low",
	ORDINAL_ONLY = "ordinal_only",
}

export interface ProbabilityBand {
	pfhUpper: number;
	pfhLower: number;
	universalOrdinal: number;
	mappings: Readonly<Record<string, string>>;
	meaning: string;
	confidence: MappingConfidence;
	verifiedPairs?: readonly [string, string][];
}

export interface CrossStandardMapping {
	probabilityBands: readonly ProbabilityBand[];
}

/**
 * ⚠️⚠️⚠️ CRITICAL DISCLAIMER ⚠️⚠️⚠️
 *
 * APPROXIMATE CROSS-STANDARD MAPPING - NON-NORMATIVE
 */
export const CROSS_STANDARD_MAPPING_DISCLAIMER = `
⚠️ WARNING: Cross-standard mappings are APPROXIMATE and NON-NORMATIVE.

Standards were developed independently for different domains and use
fundamentally different methodologies:
- IEC 61508: Quantitative probability
- ISO 26262: Qualitative S×E×C matrix
- DO-178C: Process-based (probability from AC 25.1309)
- ECSS: Severity-based (advises against probabilistic software assessment)
- IEC 62304: Harm severity-based

No official cross-standard mapping exists.
Use these mappings only as rough guidance, never for compliance decisions.
`;

/**
 * APPROXIMATE cross-standard mapping
 */
export const STANDARD_ISOMORPHISM: CrossStandardMapping = {
	probabilityBands: [
		{
			pfhUpper: Number.POSITIVE_INFINITY,
			pfhLower: 1e-5,
			universalOrdinal: 0,
			mappings: {
				IEC_61508: "SIL_0",
				ISO_26262: "QM",
				DO_178C: "DAL_E",
				ECSS: "D",
				IEC_62304: "Class_A",
			},
			meaning: "No safety requirements (ordinal equivalence only)",
			confidence: MappingConfidence.HIGH,
			verifiedPairs: [
				["IEC_61508:SIL_0", "ISO_26262:QM"],
				["IEC_61508:SIL_0", "DO_178C:DAL_E"],
			],
		},
		{
			pfhUpper: 1e-5,
			pfhLower: 1e-6,
			universalOrdinal: 0.25,
			mappings: {
				IEC_61508: "SIL_1",
				ISO_26262: "ASIL_A",
				DO_178C: "DAL_D",
				ECSS: "D",
				IEC_62304: "Class_A",
			},
			meaning: "Low integrity (ordinal equivalence only - probability values DO NOT MATCH)",
			confidence: MappingConfidence.ORDINAL_ONLY,
		},
		{
			pfhUpper: 1e-6,
			pfhLower: 1e-7,
			universalOrdinal: 0.5,
			mappings: {
				IEC_61508: "SIL_2",
				ISO_26262: "ASIL_B",
				DO_178C: "DAL_C",
				ECSS: "C",
				IEC_62304: "Class_B",
			},
			meaning: "Medium integrity (ordinal equivalence only - probability values DO NOT MATCH)",
			confidence: MappingConfidence.LOW,
		},
		{
			pfhUpper: 1e-7,
			pfhLower: 1e-8,
			universalOrdinal: 0.75,
			mappings: {
				IEC_61508: "SIL_3",
				ISO_26262: "ASIL_C",
				DO_178C: "DAL_B",
				ECSS: "B",
				IEC_62304: "Class_C",
			},
			meaning: "High integrity (best probability alignment at this level)",
			confidence: MappingConfidence.MEDIUM,
			verifiedPairs: [["IEC_61508:SIL_3", "DO_178C:DAL_B"]],
		},
		{
			pfhUpper: 1e-8,
			pfhLower: 1e-9,
			universalOrdinal: 1.0,
			mappings: {
				IEC_61508: "SIL_4",
				ISO_26262: "ASIL_D",
				DO_178C: "DAL_A",
				ECSS: "A",
				IEC_62304: "Class_C",
			},
			meaning: "Highest integrity (ordinal equivalence; see scholarly note)",
			confidence: MappingConfidence.MEDIUM,
			verifiedPairs: [
				["IEC_61508:SIL_4", "ISO_26262:ASIL_D"],
				["IEC_61508:SIL_4", "DO_178C:DAL_A"],
			],
		},
	],
};

/**
 * Convert between any two safety standards
 *
 * ⚠️ WARNING: This is APPROXIMATE and NON-NORMATIVE!
 */
export function translateIntegrity(
	level: string,
	fromStandard: string,
	toStandard: string,
): string | null {
	console.warn(
		"translateIntegrity: Cross-standard mapping is APPROXIMATE and NON-NORMATIVE. " +
			"See CROSS_STANDARD_MAPPING_DISCLAIMER for important caveats.",
	);
	for (const band of STANDARD_ISOMORPHISM.probabilityBands) {
		if (band.mappings[fromStandard] === level) {
			return band.mappings[toStandard] ?? null;
		}
	}
	return null;
}

/**
 * Get the universal ordinal for a level in any standard
 */
export function getUniversalOrdinal(level: string, standard: string): number | null {
	for (const band of STANDARD_ISOMORPHISM.probabilityBands) {
		if (band.mappings[standard] === level) {
			return band.universalOrdinal;
		}
	}
	return null;
}

/**
 * Get the probability band for a given level
 */
export function getProbabilityBand(level: string, standard: string): ProbabilityBand | null {
	for (const band of STANDARD_ISOMORPHISM.probabilityBands) {
		if (band.mappings[standard] === level) {
			return band;
		}
	}
	return null;
}

/**
 * Get the confidence level for a cross-standard mapping
 */
export function getMappingConfidence(
	level1: string,
	standard1: string,
	level2: string,
	standard2: string,
): { confidence: MappingConfidence; verified: boolean } | null {
	const band1 = getProbabilityBand(level1, standard1);
	const band2 = getProbabilityBand(level2, standard2);

	if (!band1 || !band2 || band1 !== band2) {
		return null;
	}

	const pairKey1 = `${standard1}:${level1}`;
	const pairKey2 = `${standard2}:${level2}`;
	const verified =
		band1.verifiedPairs?.some(
			([a, b]) => (a === pairKey1 && b === pairKey2) || (a === pairKey2 && b === pairKey1),
		) ?? false;

	return {
		confidence: band1.confidence,
		verified,
	};
}

// =============================================================================
// SECTION 9: CONCRETE LATTICE IMPLEMENTATIONS
// =============================================================================

// Common Lattice Operations
function compareByOrdinal<T extends IntegrityLevel>(a: T, b: T): Ordering {
	if (a.ordinal < b.ordinal) return Ordering.LESS;
	if (a.ordinal > b.ordinal) return Ordering.GREATER;
	return Ordering.EQUAL;
}

function joinByOrdinal<T extends IntegrityLevel>(a: T, b: T): T {
	return a.ordinal >= b.ordinal ? a : b;
}

function meetByOrdinal<T extends IntegrityLevel>(a: T, b: T): T {
	return a.ordinal <= b.ordinal ? a : b;
}

const MAX_INTEGRITY_ORDINAL = 4;

function normalizeOrdinal(ordinal: number): number {
	return ordinal / MAX_INTEGRITY_ORDINAL;
}

function computeRiskReductionFactor(ordinal: number): NumericRange | null {
	if (ordinal === 0) return null;
	return {
		min: 10 ** ordinal,
		max: 10 ** (ordinal + 1),
	};
}

// SIL Lattice
interface SILLevel extends IntegrityLevel {
	readonly sil: SafetyIntegrityLevel;
}

const SIL_0: SILLevel = { id: "SIL_0", name: "SIL_0", ordinal: 0, sil: SafetyIntegrityLevel.SIL_0 };
const SIL_1: SILLevel = { id: "SIL_1", name: "SIL_1", ordinal: 1, sil: SafetyIntegrityLevel.SIL_1 };
const SIL_2: SILLevel = { id: "SIL_2", name: "SIL_2", ordinal: 2, sil: SafetyIntegrityLevel.SIL_2 };
const SIL_3: SILLevel = { id: "SIL_3", name: "SIL_3", ordinal: 3, sil: SafetyIntegrityLevel.SIL_3 };
const SIL_4: SILLevel = { id: "SIL_4", name: "SIL_4", ordinal: 4, sil: SafetyIntegrityLevel.SIL_4 };

const SIL_LEVELS: readonly SILLevel[] = [SIL_0, SIL_1, SIL_2, SIL_3, SIL_4];

const IEC61508_TABLE3_PFH = [
	null,
	{ upper: 1e-5, lower: 1e-6 },
	{ upper: 1e-6, lower: 1e-7 },
	{ upper: 1e-7, lower: 1e-8 },
	{ upper: 1e-8, lower: 1e-9 },
] as const;

const IEC61508_TABLE2_PFD = [
	null,
	{ upper: 1e-1, lower: 1e-2 },
	{ upper: 1e-2, lower: 1e-3 },
	{ upper: 1e-3, lower: 1e-4 },
	{ upper: 1e-4, lower: 1e-5 },
] as const;

interface SILUniversalConfig {
	bounds: { upper: number; lower: number } | null;
	unit: "per_hour" | "per_demand";
	source: string;
}

function createSILUniversalFromConfig(
	level: IntegrityLevel,
	config: SILUniversalConfig,
): UniversalIntegrityLevel {
	return {
		ordinal: normalizeOrdinal(level.ordinal),
		failureProbability: config.bounds
			? {
					upper: config.bounds.upper,
					lower: config.bounds.lower,
					unit: config.unit,
					confidence: 0.95,
					source: config.source,
				}
			: null,
		riskReductionFactor: computeRiskReductionFactor(level.ordinal),
		consequenceSeverity: level.ordinal as ConsequenceSeverity,
		methodology: AssessmentMethodology.QUANTITATIVE_PROBABILITY,
	};
}

export const SIL_LATTICE: SafetyLattice<SILLevel> = {
	levels: SIL_LEVELS,
	bottom: SIL_0,
	top: SIL_4,
	compare: compareByOrdinal,
	join: joinByOrdinal,
	meet: meetByOrdinal,
	toUniversal(level: SILLevel): UniversalIntegrityLevel {
		const bounds = IEC61508_TABLE3_PFH[level.ordinal];
		return createSILUniversalFromConfig(level, {
			bounds: bounds ?? null,
			unit: "per_hour",
			source: "IEC 61508-1:2010 Table 3",
		});
	},
};

export function createSILLowDemandUniversal(level: SILLevel): UniversalIntegrityLevel {
	const bounds = IEC61508_TABLE2_PFD[level.ordinal];
	return createSILUniversalFromConfig(level, {
		bounds: bounds ?? null,
		unit: "per_demand",
		source: "IEC 61508-1:2010 Table 2",
	});
}

// ASIL Lattice
interface ASILLevel extends IntegrityLevel {
	readonly asil: AutomotiveSafetyIntegrityLevel;
}

const ASIL_QM: ASILLevel = { id: "QM", name: "QM", ordinal: 0, asil: AutomotiveSafetyIntegrityLevel.QM };
const ASIL_A: ASILLevel = {
	id: "ASIL_A",
	name: "ASIL_A",
	ordinal: 1,
	asil: AutomotiveSafetyIntegrityLevel.ASIL_A,
};
const ASIL_B: ASILLevel = {
	id: "ASIL_B",
	name: "ASIL_B",
	ordinal: 2,
	asil: AutomotiveSafetyIntegrityLevel.ASIL_B,
};
const ASIL_C: ASILLevel = {
	id: "ASIL_C",
	name: "ASIL_C",
	ordinal: 3,
	asil: AutomotiveSafetyIntegrityLevel.ASIL_C,
};
const ASIL_D: ASILLevel = {
	id: "ASIL_D",
	name: "ASIL_D",
	ordinal: 4,
	asil: AutomotiveSafetyIntegrityLevel.ASIL_D,
};

const ASIL_LEVELS: readonly ASILLevel[] = [ASIL_QM, ASIL_A, ASIL_B, ASIL_C, ASIL_D];

const ISO26262_PMHF_TARGETS: (FailureProbabilityBound | null)[] = [
	null,
	null,
	{ upper: 1e-7, lower: 0, unit: "per_hour", confidence: 0.95, source: "ISO 26262-5:2018 Table 6" },
	{ upper: 1e-7, lower: 0, unit: "per_hour", confidence: 0.95, source: "ISO 26262-5:2018 Table 6" },
	{ upper: 1e-8, lower: 0, unit: "per_hour", confidence: 0.95, source: "ISO 26262-5:2018 Table 6" },
];

export const ASIL_LATTICE: SafetyLattice<ASILLevel> = {
	levels: ASIL_LEVELS,
	bottom: ASIL_QM,
	top: ASIL_D,
	compare: compareByOrdinal,
	join: joinByOrdinal,
	meet: meetByOrdinal,
	toUniversal(level: ASILLevel): UniversalIntegrityLevel {
		const pmhfTarget = ISO26262_PMHF_TARGETS[level.ordinal] ?? null;
		return {
			ordinal: normalizeOrdinal(level.ordinal),
			failureProbability: pmhfTarget,
			riskReductionFactor: null,
			consequenceSeverity: level.ordinal as ConsequenceSeverity,
			methodology: AssessmentMethodology.QUALITATIVE_MATRIX,
		};
	},
};

// DAL Lattice
interface DALLevel extends IntegrityLevel {
	readonly dal: DesignAssuranceLevel;
}

const DAL_E: DALLevel = { id: "DAL_E", name: "DAL_E", ordinal: 0, dal: DesignAssuranceLevel.DAL_E };
const DAL_D: DALLevel = { id: "DAL_D", name: "DAL_D", ordinal: 1, dal: DesignAssuranceLevel.DAL_D };
const DAL_C: DALLevel = { id: "DAL_C", name: "DAL_C", ordinal: 2, dal: DesignAssuranceLevel.DAL_C };
const DAL_B: DALLevel = { id: "DAL_B", name: "DAL_B", ordinal: 3, dal: DesignAssuranceLevel.DAL_B };
const DAL_A: DALLevel = { id: "DAL_A", name: "DAL_A", ordinal: 4, dal: DesignAssuranceLevel.DAL_A };

const DAL_LEVELS: readonly DALLevel[] = [DAL_E, DAL_D, DAL_C, DAL_B, DAL_A];

const AC25_1309_PROBABILITY_TARGETS: (FailureProbabilityBound | null)[] = [
	null,
	{
		upper: Number.POSITIVE_INFINITY,
		lower: 1e-5,
		unit: "per_flight_hour",
		confidence: 0.95,
		source: "AC 25.1309-1A (Probable)",
	},
	{
		upper: 1e-5,
		lower: 1e-7,
		unit: "per_flight_hour",
		confidence: 0.95,
		source: "AC 25.1309-1A (Remote)",
	},
	{
		upper: 1e-7,
		lower: 1e-9,
		unit: "per_flight_hour",
		confidence: 0.95,
		source: "AC 25.1309-1A (Extremely Remote)",
	},
	{
		upper: 1e-9,
		lower: 0,
		unit: "per_flight_hour",
		confidence: 0.95,
		source: "AC 25.1309-1A (Extremely Improbable)",
	},
];

export const DAL_LATTICE: SafetyLattice<DALLevel> = {
	levels: DAL_LEVELS,
	bottom: DAL_E,
	top: DAL_A,
	compare: compareByOrdinal,
	join: joinByOrdinal,
	meet: meetByOrdinal,
	toUniversal(level: DALLevel): UniversalIntegrityLevel {
		const probabilityTarget = AC25_1309_PROBABILITY_TARGETS[level.ordinal] ?? null;
		return {
			ordinal: normalizeOrdinal(level.ordinal),
			failureProbability: probabilityTarget,
			riskReductionFactor: null,
			consequenceSeverity: level.ordinal as ConsequenceSeverity,
			methodology: AssessmentMethodology.PROCESS_BASED,
		};
	},
};

// ECSS Lattice (Space Software Criticality)
interface ECSSLevel extends IntegrityLevel {
	readonly ecss: SpaceSoftwareCriticality;
}

// Note: ECSS ordering is A (highest) to D (lowest) - opposite of IEC 62304
const ECSS_A: ECSSLevel = {
	id: "ECSS_A",
	name: "ECSS_A",
	ordinal: 4,
	ecss: SpaceSoftwareCriticality.CATEGORY_A,
};
const ECSS_B: ECSSLevel = {
	id: "ECSS_B",
	name: "ECSS_B",
	ordinal: 3,
	ecss: SpaceSoftwareCriticality.CATEGORY_B,
};
const ECSS_C: ECSSLevel = {
	id: "ECSS_C",
	name: "ECSS_C",
	ordinal: 2,
	ecss: SpaceSoftwareCriticality.CATEGORY_C,
};
const ECSS_D: ECSSLevel = {
	id: "ECSS_D",
	name: "ECSS_D",
	ordinal: 1,
	ecss: SpaceSoftwareCriticality.CATEGORY_D,
};

const ECSS_LEVELS: readonly ECSSLevel[] = [ECSS_D, ECSS_C, ECSS_B, ECSS_A];

export const ECSS_LATTICE: SafetyLattice<ECSSLevel> = {
	levels: ECSS_LEVELS,
	bottom: ECSS_D,
	top: ECSS_A,
	compare: compareByOrdinal,
	join: joinByOrdinal,
	meet: meetByOrdinal,
	toUniversal(level: ECSSLevel): UniversalIntegrityLevel {
		// ECSS has no probability targets - severity-based only
		return {
			ordinal: normalizeOrdinal(level.ordinal),
			failureProbability: null,
			riskReductionFactor: null,
			consequenceSeverity: level.ordinal as ConsequenceSeverity,
			methodology: AssessmentMethodology.SEVERITY_BASED,
		};
	},
};

// Medical Device Software Lattice (IEC 62304)
interface MedicalLevel extends IntegrityLevel {
	readonly medicalClass: MedicalDeviceSoftwareClass;
}

// Note: IEC 62304 ordering is A (lowest) to C (highest)
const MEDICAL_A: MedicalLevel = {
	id: "CLASS_A",
	name: "CLASS_A",
	ordinal: 1,
	medicalClass: MedicalDeviceSoftwareClass.CLASS_A,
};
const MEDICAL_B: MedicalLevel = {
	id: "CLASS_B",
	name: "CLASS_B",
	ordinal: 2,
	medicalClass: MedicalDeviceSoftwareClass.CLASS_B,
};
const MEDICAL_C: MedicalLevel = {
	id: "CLASS_C",
	name: "CLASS_C",
	ordinal: 3,
	medicalClass: MedicalDeviceSoftwareClass.CLASS_C,
};

const MEDICAL_LEVELS: readonly MedicalLevel[] = [MEDICAL_A, MEDICAL_B, MEDICAL_C];

export const MEDICAL_LATTICE: SafetyLattice<MedicalLevel> = {
	levels: MEDICAL_LEVELS,
	bottom: MEDICAL_A,
	top: MEDICAL_C,
	compare: compareByOrdinal,
	join: joinByOrdinal,
	meet: meetByOrdinal,
	toUniversal(level: MedicalLevel): UniversalIntegrityLevel {
		// IEC 62304 has no probability targets - harm severity-based only
		// Map 3-level scale to universal ordinal
		const ordinalMapping: Record<number, number> = {
			1: 0.25, // Class A → low
			2: 0.5, // Class B → medium
			3: 0.75, // Class C → high (not full 1.0 as it's a 3-level scale)
		};
		return {
			ordinal: ordinalMapping[level.ordinal] ?? 0.5,
			failureProbability: null,
			riskReductionFactor: null,
			consequenceSeverity:
				level.ordinal === 1
					? ConsequenceSeverity.NEGLIGIBLE
					: level.ordinal === 2
						? ConsequenceSeverity.SERIOUS
						: ConsequenceSeverity.CRITICAL,
			methodology: AssessmentMethodology.SEVERITY_BASED,
		};
	},
};

// =============================================================================
// SECTION 10: SAFETY DOMAIN MAPPINGS
// =============================================================================

/**
 * Safety-critical application domains
 */
export enum SafetyDomain {
	// Safety-critical domains (potential for physical harm)
	AUTOMOTIVE = "automotive",
	AVIATION = "aviation",
	RAILWAY = "railway",
	NUCLEAR = "nuclear",
	SPACE = "space",
	MEDICAL_DEVICE = "medical_device",
	INDUSTRIAL_CONTROL = "industrial_control",
	MARINE = "marine",
	DEFENSE = "defense",

	// Non-safety but regulated domains
	FINTECH = "fintech",
	HEALTHCARE_IT = "healthcare_it",
	CRITICAL_INFRASTRUCTURE = "critical_infrastructure",
}

/**
 * Mapping from safety domains to applicable primary standards
 */
export const SAFETY_DOMAIN_STANDARDS: Record<SafetyDomain, StandardIdentifier[]> = {
	[SafetyDomain.AUTOMOTIVE]: [StandardIdentifier.ISO_26262],
	[SafetyDomain.AVIATION]: [StandardIdentifier.DO_178C],
	[SafetyDomain.RAILWAY]: [StandardIdentifier.IEC_61508], // EN 50128 derives from IEC 61508
	[SafetyDomain.NUCLEAR]: [StandardIdentifier.IEC_61508],
	[SafetyDomain.SPACE]: [StandardIdentifier.ECSS],
	[SafetyDomain.MEDICAL_DEVICE]: [StandardIdentifier.IEC_62304],
	[SafetyDomain.INDUSTRIAL_CONTROL]: [StandardIdentifier.IEC_61508],
	[SafetyDomain.MARINE]: [StandardIdentifier.IEC_61508],
	[SafetyDomain.DEFENSE]: [StandardIdentifier.DO_178C], // Often uses DO-178C or MIL-STD
	[SafetyDomain.FINTECH]: [], // No safety standards, but regulatory (PCI-DSS, SOC2)
	[SafetyDomain.HEALTHCARE_IT]: [StandardIdentifier.IEC_62304], // If affects patient safety
	[SafetyDomain.CRITICAL_INFRASTRUCTURE]: [StandardIdentifier.IEC_61508],
};

/**
 * Minimum integrity level by domain
 * Represents typical baseline requirements for the domain
 */
export const SAFETY_DOMAIN_BASELINES: Record<SafetyDomain, number> = {
	[SafetyDomain.NUCLEAR]: 4, // Highest safety requirements
	[SafetyDomain.AVIATION]: 4,
	[SafetyDomain.SPACE]: 4,
	[SafetyDomain.MEDICAL_DEVICE]: 3,
	[SafetyDomain.RAILWAY]: 3,
	[SafetyDomain.AUTOMOTIVE]: 3,
	[SafetyDomain.DEFENSE]: 3,
	[SafetyDomain.INDUSTRIAL_CONTROL]: 2,
	[SafetyDomain.MARINE]: 2,
	[SafetyDomain.CRITICAL_INFRASTRUCTURE]: 2,
	[SafetyDomain.HEALTHCARE_IT]: 2,
	[SafetyDomain.FINTECH]: 2,
};

/**
 * Get the appropriate lattice for a given standard
 */
export function getLatticeForStandard(
	standard: StandardIdentifier,
): SafetyLattice<IntegrityLevel> {
	switch (standard) {
		case StandardIdentifier.IEC_61508:
			return SIL_LATTICE as SafetyLattice<IntegrityLevel>;
		case StandardIdentifier.ISO_26262:
			return ASIL_LATTICE as SafetyLattice<IntegrityLevel>;
		case StandardIdentifier.DO_178C:
			return DAL_LATTICE as SafetyLattice<IntegrityLevel>;
		case StandardIdentifier.ECSS:
			return ECSS_LATTICE as SafetyLattice<IntegrityLevel>;
		case StandardIdentifier.IEC_62304:
			return MEDICAL_LATTICE as SafetyLattice<IntegrityLevel>;
		default:
			return SIL_LATTICE as SafetyLattice<IntegrityLevel>; // Default to IEC 61508
	}
}

/**
 * Get the primary standard for a safety domain
 */
export function getPrimaryStandard(domain: SafetyDomain): StandardIdentifier | null {
	const standards = SAFETY_DOMAIN_STANDARDS[domain];
	return standards.length > 0 ? standards[0]! : null;
}

/**
 * Get the recommended integrity level for a domain
 * Returns the level in the domain's primary standard
 */
export function getRecommendedLevel(
	domain: SafetyDomain,
): { standard: StandardIdentifier; levelName: string; ordinal: number } | null {
	const standard = getPrimaryStandard(domain);
	if (!standard) return null;

	const baseline = SAFETY_DOMAIN_BASELINES[domain];
	const lattice = getLatticeForStandard(standard);

	// Find the level that matches the baseline ordinal
	const level = lattice.levels.find((l) => l.ordinal === baseline);
	if (!level) return null;

	return {
		standard,
		levelName: level.name,
		ordinal: baseline,
	};
}

// =============================================================================
// SECTION 11: COMPOSITION THEOREMS
// =============================================================================

/**
 * Composition context for systems with redundancy
 */
export interface CompositionContext {
	redundant: boolean;
	independent: boolean;
	commonCauseFreedom: number;
	diverseImplementation: boolean;
}

export const DEFAULT_COMPOSITION_CONTEXT: CompositionContext = {
	redundant: false,
	independent: false,
	commonCauseFreedom: 0,
	diverseImplementation: false,
};

/**
 * THEOREM: Monotonic Composition (SIMPLIFIED MODEL)
 */
export function composeIntegrityLevels<T extends IntegrityLevel>(
	lattice: SafetyLattice<T>,
	subsystems: T[],
): T {
	if (subsystems.length === 0) {
		return lattice.bottom;
	}
	return subsystems.reduce((acc, level) => lattice.join(acc, level), lattice.bottom);
}

export interface CompositionResult<T extends IntegrityLevel> {
	resultLevel: T;
	synthesisApplied: boolean;
	warnings: string[];
}

/**
 * Composition with redundancy context
 */
export function composeWithContext<T extends IntegrityLevel>(
	lattice: SafetyLattice<T>,
	components: T[],
	context: CompositionContext,
): CompositionResult<T> {
	if (components.length === 0) {
		return {
			resultLevel: lattice.bottom,
			synthesisApplied: false,
			warnings: [],
		};
	}

	const conservativeResult = components.reduce(
		(acc, level) => lattice.join(acc, level),
		lattice.bottom,
	);

	if (!context.redundant || !context.independent) {
		return {
			resultLevel: conservativeResult,
			synthesisApplied: false,
			warnings:
				context.redundant && !context.independent
					? ["Components are redundant but not independent - cannot apply synthesis"]
					: [],
		};
	}

	if (context.commonCauseFreedom < 0.9) {
		return {
			resultLevel: conservativeResult,
			synthesisApplied: false,
			warnings: [
				`Common cause freedom (${context.commonCauseFreedom}) below 0.9 threshold - cannot apply synthesis`,
			],
		};
	}

	const minOrdinal = Math.min(...components.map((c) => c.ordinal));
	const redundancyBonus = components.length >= 2 ? 1 : 0;
	const synthesizedOrdinal = Math.min(minOrdinal + redundancyBonus, lattice.top.ordinal);

	const synthesizedLevel = lattice.levels.find((l) => l.ordinal === synthesizedOrdinal);

	if (!synthesizedLevel || synthesizedLevel.ordinal <= conservativeResult.ordinal) {
		return {
			resultLevel: conservativeResult,
			synthesisApplied: false,
			warnings: [],
		};
	}

	return {
		resultLevel: synthesizedLevel,
		synthesisApplied: true,
		warnings: [
			"Synthesis applied based on redundancy and independence. " +
				"Verify against specific standard requirements (IEC 61508-2 or ISO 26262-9).",
		],
	};
}

/**
 * THEOREM: Refinement Preservation
 */
export function checkRefinementValid<T extends IntegrityLevel>(
	lattice: SafetyLattice<T>,
	specLevel: T,
	implLevel: T,
): boolean {
	return lattice.compare(implLevel, specLevel) !== Ordering.LESS;
}

/**
 * Find the minimum integrity level required to meet a target
 */
export function findMinimumLevel<T extends IntegrityLevel>(
	lattice: SafetyLattice<T>,
	targetUniversalOrdinal: number,
): T {
	for (const level of lattice.levels) {
		const universal = lattice.toUniversal(level);
		if (universal.ordinal >= targetUniversalOrdinal) {
			return level;
		}
	}
	return lattice.top;
}

/**
 * Check if ASIL decomposition is valid per ISO 26262-9
 */
export function isValidASILDecomposition(
	targetASIL: AutomotiveSafetyIntegrityLevel,
	component1ASIL: AutomotiveSafetyIntegrityLevel,
	component2ASIL: AutomotiveSafetyIntegrityLevel,
): boolean {
	const ordinalMap: Record<AutomotiveSafetyIntegrityLevel, number> = {
		[AutomotiveSafetyIntegrityLevel.QM]: 0,
		[AutomotiveSafetyIntegrityLevel.ASIL_A]: 1,
		[AutomotiveSafetyIntegrityLevel.ASIL_B]: 2,
		[AutomotiveSafetyIntegrityLevel.ASIL_C]: 3,
		[AutomotiveSafetyIntegrityLevel.ASIL_D]: 4,
	};

	const target = ordinalMap[targetASIL];
	const c1 = ordinalMap[component1ASIL];
	const c2 = ordinalMap[component2ASIL];

	return c1 + c2 >= target;
}

// =============================================================================
// SECTION 11: PROBABILITY THEORY & RISK CALCULUS
// =============================================================================

/**
 * Risk assessment inputs for computing required integrity
 */
export interface RiskAssessment {
	hazardProbability: number;
	exposureProbability: number;
	unavoidabilityProbability: number;
	severity: ConsequenceSeverity;
}

export function severityToWeight(severity: ConsequenceSeverity): number {
	return 10 ** severity;
}

export function computeUnreducedRisk(assessment: RiskAssessment): number {
	return (
		assessment.hazardProbability *
		assessment.exposureProbability *
		assessment.unavoidabilityProbability *
		severityToWeight(assessment.severity)
	);
}

export function computeRequiredIntegrity(
	assessment: RiskAssessment,
	tolerableRisk: number,
): UniversalIntegrityLevel {
	const unreducedRisk = computeUnreducedRisk(assessment);
	const riskReductionFactor = unreducedRisk / tolerableRisk;
	const rawLevel = Math.ceil(Math.log10(riskReductionFactor));
	const level = Math.max(0, Math.min(4, rawLevel));
	const ordinal = level / 4;
	const requiredPFH = tolerableRisk / severityToWeight(assessment.severity);

	return {
		ordinal,
		failureProbability: {
			upper: requiredPFH,
			lower: requiredPFH / 10,
			unit: "per_hour",
			confidence: 0.95,
		},
		riskReductionFactor: {
			min: 10 ** level,
			max: 10 ** (level + 1),
		},
		consequenceSeverity: assessment.severity,
		methodology: AssessmentMethodology.QUANTITATIVE_PROBABILITY,
	};
}

export function projectToStandard(universal: UniversalIntegrityLevel, standard: string): string | null {
	let closestBand: ProbabilityBand | null = null;
	let closestDistance = Number.POSITIVE_INFINITY;

	for (const band of STANDARD_ISOMORPHISM.probabilityBands) {
		const distance = Math.abs(band.universalOrdinal - universal.ordinal);
		if (distance < closestDistance) {
			closestDistance = distance;
			closestBand = band;
		}
	}

	return closestBand?.mappings[standard] ?? null;
}

// PFD/PFH Conversions
export function convertPFDtoPFH(pfdAvg: number, proofTestIntervalHours: number): number {
	return (2 * pfdAvg) / proofTestIntervalHours;
}

export function convertPFHtoPFD(pfh: number, proofTestIntervalHours: number): number {
	return (pfh * proofTestIntervalHours) / 2;
}

export function calculateRisk(
	hazardFrequency: number,
	exposureProbability: number,
	harmProbability: number,
	severityWeight: number,
): number {
	return hazardFrequency * exposureProbability * harmProbability * severityWeight;
}

export function deriveRequiredSIL(
	unreducedRisk: number,
	tolerableRisk: number,
): { sil: SafetyIntegrityLevel; rrf: number; exactLevel: number } {
	if (tolerableRisk <= 0) {
		throw new Error("Tolerable risk must be positive");
	}

	const rrf = unreducedRisk / tolerableRisk;
	const exactLevel = Math.log10(rrf);
	const silOrdinal = Math.max(0, Math.min(4, Math.ceil(exactLevel)));

	const silMap: Record<number, SafetyIntegrityLevel> = {
		0: SafetyIntegrityLevel.SIL_0,
		1: SafetyIntegrityLevel.SIL_1,
		2: SafetyIntegrityLevel.SIL_2,
		3: SafetyIntegrityLevel.SIL_3,
		4: SafetyIntegrityLevel.SIL_4,
	};

	return {
		sil: silMap[silOrdinal] ?? SafetyIntegrityLevel.SIL_4,
		rrf,
		exactLevel,
	};
}

// =============================================================================
// SECTION 12: ARCHITECTURE CALCULATIONS
// =============================================================================

export function calculatePFD_1oo1(
	dangerousFailureRate: number,
	proofTestIntervalHours: number,
): number {
	return (dangerousFailureRate * proofTestIntervalHours) / 2;
}

export function calculatePFD_1oo2(
	dangerousFailureRate: number,
	proofTestIntervalHours: number,
	commonCauseFactor: number,
): number {
	const lambdaT = dangerousFailureRate * proofTestIntervalHours;
	const independentTerm = (lambdaT * lambdaT) / 3;
	const commonCauseTerm = (commonCauseFactor * lambdaT) / 2;
	return independentTerm + commonCauseTerm;
}

export function calculatePFD_2oo3(
	dangerousFailureRate: number,
	proofTestIntervalHours: number,
	commonCauseFactor: number,
): number {
	const lambdaT = dangerousFailureRate * proofTestIntervalHours;
	const independentTerm = 3 * (lambdaT * lambdaT);
	const commonCauseTerm = (commonCauseFactor * lambdaT) / 2;
	return independentTerm + commonCauseTerm;
}

export function calculatePFD_1oo2_Markov(dangerousFailureRate: number, repairRate: number): number {
	const lambdaPlusMu = dangerousFailureRate + repairRate;
	return (dangerousFailureRate * dangerousFailureRate) / (lambdaPlusMu * lambdaPlusMu);
}

export function calculateArchitectureSIL(
	architecture: "1oo1" | "1oo2" | "2oo2" | "2oo3",
	dangerousFailureRate: number,
	proofTestIntervalHours: number,
	commonCauseFactor = 0.1,
): { pfd: number; sil: SafetyIntegrityLevel } {
	let pfd: number;

	switch (architecture) {
		case "1oo1":
			pfd = calculatePFD_1oo1(dangerousFailureRate, proofTestIntervalHours);
			break;
		case "1oo2":
			pfd = calculatePFD_1oo2(dangerousFailureRate, proofTestIntervalHours, commonCauseFactor);
			break;
		case "2oo2":
			pfd = calculatePFD_1oo1(dangerousFailureRate, proofTestIntervalHours);
			break;
		case "2oo3":
			pfd = calculatePFD_2oo3(dangerousFailureRate, proofTestIntervalHours, commonCauseFactor);
			break;
	}

	let sil: SafetyIntegrityLevel;
	if (pfd >= 0.1) {
		sil = SafetyIntegrityLevel.SIL_0;
	} else if (pfd >= 0.01) {
		sil = SafetyIntegrityLevel.SIL_1;
	} else if (pfd >= 0.001) {
		sil = SafetyIntegrityLevel.SIL_2;
	} else if (pfd >= 0.0001) {
		sil = SafetyIntegrityLevel.SIL_3;
	} else {
		sil = SafetyIntegrityLevel.SIL_4;
	}

	return { pfd, sil };
}

// =============================================================================
// SECTION 13: HARDWARE METRICS
// =============================================================================

export interface HardwareMetrics {
	safeFaultRate: number;
	detectedDangerousRate: number;
	undetectedDangerousRate: number;
}

export function calculateDiagnosticCoverage(metrics: HardwareMetrics): number {
	const totalDangerous = metrics.detectedDangerousRate + metrics.undetectedDangerousRate;
	if (totalDangerous === 0) return 1;
	return metrics.detectedDangerousRate / totalDangerous;
}

export function calculateSFF(metrics: HardwareMetrics): number {
	const totalDangerous = metrics.detectedDangerousRate + metrics.undetectedDangerousRate;
	const total = metrics.safeFaultRate + totalDangerous;
	if (total === 0) return 1;
	return (metrics.safeFaultRate + metrics.detectedDangerousRate) / total;
}

export function getArchitecturalConstraintSIL(
	sff: number,
	hardwareFaultTolerance: 0 | 1 | 2,
): SafetyIntegrityLevel {
	const table: Record<string, SafetyIntegrityLevel[]> = {
		low: [SafetyIntegrityLevel.SIL_1, SafetyIntegrityLevel.SIL_2, SafetyIntegrityLevel.SIL_3],
		medium: [SafetyIntegrityLevel.SIL_2, SafetyIntegrityLevel.SIL_3, SafetyIntegrityLevel.SIL_4],
		high: [SafetyIntegrityLevel.SIL_3, SafetyIntegrityLevel.SIL_4, SafetyIntegrityLevel.SIL_4],
		very_high: [SafetyIntegrityLevel.SIL_3, SafetyIntegrityLevel.SIL_4, SafetyIntegrityLevel.SIL_4],
	};

	let category: string;
	if (sff < 0.6) {
		category = "low";
	} else if (sff < 0.9) {
		category = "medium";
	} else if (sff < 0.99) {
		category = "high";
	} else {
		category = "very_high";
	}

	return table[category]?.[hardwareFaultTolerance] ?? SafetyIntegrityLevel.SIL_1;
}

// =============================================================================
// SECTION 14: FAULT TREE ANALYSIS
// =============================================================================

export type FaultTreeGate = "AND" | "OR" | "VOTE" | "NOT";

export function faultTreeAND(probabilities: number[]): number {
	return probabilities.reduce((acc, p) => acc * p, 1);
}

export function faultTreeOR(probabilities: number[]): number {
	const noFailure = probabilities.reduce((acc, p) => acc * (1 - p), 1);
	return 1 - noFailure;
}

function binomial(n: number, k: number): number {
	if (k < 0 || k > n) return 0;
	if (k === 0 || k === n) return 1;

	let result = 1;
	for (let i = 0; i < k; i++) {
		result = (result * (n - i)) / (i + 1);
	}
	return result;
}

export function faultTreeVOTE(probabilities: number[], minFailures: number): number {
	const n = probabilities.length;
	if (n === 0) return 0;

	const p = probabilities[0] ?? 0;

	let total = 0;
	for (let i = minFailures; i <= n; i++) {
		const combinations = binomial(n, i);
		total += combinations * p ** i * (1 - p) ** (n - i);
	}
	return total;
}

// =============================================================================
// SECTION 15: SIL VERIFICATION WORKFLOW
// =============================================================================

export interface SILVerificationResult {
	requiredSIL: SafetyIntegrityLevel;
	riskReductionFactor: number;
	selectedArchitecture: string;
	achievedPFD: number;
	achievedSIL: SafetyIntegrityLevel;
	architecturalConstraint: SafetyIntegrityLevel;
	verified: boolean;
	details: string[];
}

export function verifySILCompliance(
	unreducedRisk: number,
	tolerableRisk: number,
	architecture: "1oo1" | "1oo2" | "2oo2" | "2oo3",
	dangerousFailureRate: number,
	proofTestIntervalHours: number,
	sff: number,
	commonCauseFactor = 0.1,
): SILVerificationResult {
	const details: string[] = [];

	const { sil: requiredSIL, rrf } = deriveRequiredSIL(unreducedRisk, tolerableRisk);
	details.push(`Required SIL: ${requiredSIL} (RRF = ${rrf.toFixed(0)})`);

	const { pfd: achievedPFD, sil: achievedSIL } = calculateArchitectureSIL(
		architecture,
		dangerousFailureRate,
		proofTestIntervalHours,
		commonCauseFactor,
	);
	details.push(
		`Architecture ${architecture}: PFD = ${achievedPFD.toExponential(2)}, SIL ${achievedSIL}`,
	);

	const hft: 0 | 1 | 2 =
		architecture === "1oo1" || architecture === "2oo2" ? 0 : architecture === "1oo2" ? 1 : 2;
	const architecturalConstraint = getArchitecturalConstraintSIL(sff, hft);
	details.push(
		`Architectural constraint (SFF=${(sff * 100).toFixed(0)}%, HFT=${hft}): SIL ${architecturalConstraint}`,
	);

	const silOrdinals = {
		[SafetyIntegrityLevel.SIL_0]: 0,
		[SafetyIntegrityLevel.SIL_1]: 1,
		[SafetyIntegrityLevel.SIL_2]: 2,
		[SafetyIntegrityLevel.SIL_3]: 3,
		[SafetyIntegrityLevel.SIL_4]: 4,
	};

	const requiredOrdinal = silOrdinals[requiredSIL];
	const achievedOrdinal = silOrdinals[achievedSIL];
	const constraintOrdinal = silOrdinals[architecturalConstraint];

	const verified = achievedOrdinal >= requiredOrdinal && constraintOrdinal >= requiredOrdinal;

	if (verified) {
		details.push("✓ SIL COMPLIANCE VERIFIED");
	} else {
		if (achievedOrdinal < requiredOrdinal) {
			details.push(`✗ PFD too high: need SIL ${requiredSIL}, achieved SIL ${achievedSIL}`);
		}
		if (constraintOrdinal < requiredOrdinal) {
			details.push(
				`✗ Architecture insufficient: need SIL ${requiredSIL}, constraint allows SIL ${architecturalConstraint}`,
			);
		}
	}

	return {
		requiredSIL,
		riskReductionFactor: rrf,
		selectedArchitecture: architecture,
		achievedPFD,
		achievedSIL,
		architecturalConstraint,
		verified,
		details,
	};
}

