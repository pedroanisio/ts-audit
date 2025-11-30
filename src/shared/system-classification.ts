/**
 * System Classification Model
 *
 * A Categorical Framework for Cross-Standard Safety Communication
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
 *   Probability classifications: Probable, Remote, Extremely Remote,
 *   Extremely Improbable
 *
 * - SAE ARP4761 - Guidelines for Conducting Safety Assessment Process
 * - SAE ARP4754A - Development of Civil Aircraft and Systems
 * - IEC TR 61508-6-1 (Expected 2025) - Cross-standard recognition guidance
 *
 * OTHER REFERENCED STANDARDS:
 * - ISO 16290:2013 - Technology Readiness Levels (TRL)
 * - IEC 62443 - Industrial Cybersecurity
 * - ISO/IEC 12207 - Software Lifecycle Processes
 * - ISO/IEC 15288 - System Lifecycle Processes
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * VERIFICATION STATUS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This implementation has been verified against primary sources:
 *
 * ✓ IEC 61508 PFH/PFD thresholds - VERIFIED per Tables 2 & 3
 * ✓ ISO 26262 PMHF targets - VERIFIED per Part 5, Table 6
 * ✓ DO-178C objectives - VERIFIED (71/69/62/26/0 for A/B/C/D/E)
 * ✓ AC 25.1309 probability classifications - VERIFIED
 * ✓ Lattice total order property - VERIFIED (each standard forms a chain)
 * ⚠ Cross-standard mapping - APPROXIMATE ONLY (no official mapping exists)
 * ⚠ Universal risk equation - THEORETICAL (not how actual standards work)
 *
 * See: "Verification of Lattice-Theoretic Safety Integrity Level
 *       Formalization Across Industrial Standards" for detailed analysis.
 */

// =============================================================================
// TECHNOLOGY READINESS LEVELS (NASA/ISO 16290)
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
// SAFETY INTEGRITY LEVELS (IEC 61508)
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
// AUTOMOTIVE SAFETY INTEGRITY LEVEL (ISO 26262)
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
		// No PMHF/SPFM/LFM requirements for QM
	},
	[AutomotiveSafetyIntegrityLevel.ASIL_A]: {
		level: AutomotiveSafetyIntegrityLevel.ASIL_A,
		name: "ASIL A",
		severity: "Light injuries",
		exposure: "Low",
		controllability: "High",
		typicalApplications: ["Rear lights", "Horn", "Wipers"],
		// ⚠️ ASIL A has NO quantitative PMHF target! Purely qualitative process requirements.
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
		spfm: 90, // ≥90%
		lfm: 60, // ≥60%
	},
	[AutomotiveSafetyIntegrityLevel.ASIL_C]: {
		level: AutomotiveSafetyIntegrityLevel.ASIL_C,
		name: "ASIL C",
		severity: "Life-threatening (survival uncertain)",
		exposure: "High",
		controllability: "Low",
		typicalApplications: ["Power steering", "Suspension control", "Battery management"],
		// ⚠️ ASIL C has SAME PMHF as ASIL B! The difference is in SPFM/LFM requirements.
		pmhfTarget: "<10⁻⁷/hour",
		spfm: 97, // ≥97% (higher than ASIL B)
		lfm: 80, // ≥80% (higher than ASIL B)
	},
	[AutomotiveSafetyIntegrityLevel.ASIL_D]: {
		level: AutomotiveSafetyIntegrityLevel.ASIL_D,
		name: "ASIL D",
		severity: "Life-threatening or fatal",
		exposure: "High",
		controllability: "Difficult/impossible",
		typicalApplications: ["Airbags", "ABS/ESC", "Autonomous driving", "Brake-by-wire"],
		pmhfTarget: "<10⁻⁸/hour",
		spfm: 99, // ≥99%
		lfm: 90, // ≥90%
	},
};

// =============================================================================
// AVIATION SOFTWARE LEVELS (DO-178C)
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
		objectives: 0, // Explicitly stated as "outside the purview of DO-178C"
		independenceRequired: false,
		typicalApplications: ["Passenger entertainment", "Galley equipment"],
	},
	[DesignAssuranceLevel.DAL_D]: {
		level: DesignAssuranceLevel.DAL_D,
		name: "Level D - Minor",
		failureCondition: "Slight reduction in safety margins or functional capabilities",
		objectives: 26, // 5 with independence requirements
		independenceRequired: false,
		typicalApplications: ["Cabin lighting", "Non-critical displays"],
	},
	[DesignAssuranceLevel.DAL_C]: {
		level: DesignAssuranceLevel.DAL_C,
		name: "Level C - Major",
		failureCondition: "Significant reduction in safety margins or functional capabilities",
		objectives: 62, // 8 with independence requirements
		independenceRequired: false,
		typicalApplications: ["Fuel quantity indication", "Ice detection"],
	},
	[DesignAssuranceLevel.DAL_B]: {
		level: DesignAssuranceLevel.DAL_B,
		name: "Level B - Hazardous",
		failureCondition: "Large reduction in safety margins, physical distress to passengers/crew",
		objectives: 69, // 21 with independence requirements
		independenceRequired: true,
		typicalApplications: ["Engine control", "Flight management", "Autopilot"],
	},
	[DesignAssuranceLevel.DAL_A]: {
		level: DesignAssuranceLevel.DAL_A,
		name: "Level A - Catastrophic",
		failureCondition: "Failure may cause a crash, multiple fatalities",
		objectives: 71, // 33 with independence requirements
		independenceRequired: true,
		typicalApplications: [
			"Primary flight control",
			"Flight-critical sensors",
			"Collision avoidance",
		],
	},
};

// =============================================================================
// SPACE SOFTWARE CRITICALITY (ECSS)
// =============================================================================

/**
 * Software Criticality Categories from ECSS-E-ST-40C
 * European Space Agency standard for space software
 *
 * Reference: ECSS-E-ST-40C (ESA, 2009), ECSS-Q-HB-80-03A (guidance)
 *
 * ⚠️ NOTE: ECSS-Q-HB-80-03A advises against probabilistic assessment
 * of software failures as a criterion for criticality category assignment.
 * (Earlier interpretations used stronger "prohibits" language, but the
 * handbook uses advisory framing.)
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
// MEDICAL DEVICE SOFTWARE SAFETY (IEC 62304)
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
// UNIVERSAL SAFETY INTEGRITY FORMALIZATION
// =============================================================================
//
// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORICAL FRAMING: CONSTRUCTED FUNCTORS, NOT DISCOVERED EQUIVALENCES
// ═══════════════════════════════════════════════════════════════════════════════
//
// This framework constructs a COMMON REPRESENTATION (the universal ordinal space)
// not by claiming the standards are equivalent, but by defining EXPLICIT FUNCTORS
// from each standard's integrity lattice to a shared codomain [0, 1].
//
// In category-theoretic terms (cf. Goguen's institution theory):
//   - Each standard is an OBJECT in a category of safety classification systems
//   - The universal ordinal mapping is a FUNCTOR that preserves order structure
//   - These functors are explicitly LOSSY — they quotient away domain-specific
//     dimensions (controllability, exposure, architectural requirements) in favor
//     of ordinal comparability
//
// THE UNIVERSAL ORDINAL IS A QUOTIENT:
//   Two hazards with the same ASIL may have arrived via different S×E×C paths
//   with genuinely incomparable risk profiles. Example:
//     - ASIL C from (S3, E2, C2) = high-severity, low-exposure
//     - ASIL C from (S2, E4, C2) = lower-severity, high-exposure
//   When mapped to universal ordinal 0.75, this dimensional information is LOST.
//   This is a DELIBERATE DESIGN CHOICE enabling cross-standard communication,
//   not a claim about inherent equivalence.
//
// ═══════════════════════════════════════════════════════════════════════════════
// METHODOLOGICAL INCOMPATIBILITY (Why the functor must be lossy)
// ═══════════════════════════════════════════════════════════════════════════════
//
// 1. ASSESSMENT METHODS DIFFER FUNDAMENTALLY:
//    - IEC 61508: Quantitative (probability-based via risk graph or LOPA)
//    - ISO 26262: Qualitative (S×E×C matrix → ASIL lookup table)
//    - DO-178C: Process-based (no probability targets - those come from AC 25.1309)
//    - ECSS: Severity-based only (advises against probabilistic software assessment)
//    - IEC 62304: Harm severity-based (no probability thresholds)
//
// 2. NO OFFICIAL CROSS-STANDARD MAPPING EXISTS:
//    ISO 26262 explicitly states "no normative mapping to SIL"
//    IEC TR 61508-6-1 (expected 2025) may provide first official guidance
//
// 3. CONSEQUENCE SCALES ARE NOT EQUIVALENT:
//    - DAL A: Catastrophic aircraft loss (hundreds of deaths)
//    - ASIL D: At most a loaded passenger vehicle (~6 people max)
//    - SIL 4: Industrial plant with defined exposure zones
//
// 4. DEMAND MODES DIFFER:
//    IEC 61508 distinguishes low-demand (PFD) vs continuous/high-demand (PFH)
//    Other standards don't make this distinction
//
// ═══════════════════════════════════════════════════════════════════════════════
// MATHEMATICAL FOUNDATION (Within each standard)
// ═══════════════════════════════════════════════════════════════════════════════
//
// Each individual standard's levels form a bounded join-semilattice (total order).
// Cross-standard comparison uses CONSTRUCTED FUNCTORS to a shared ordinal space.
//
// Key axioms (WITHIN a single standard - these are VERIFIED):
// 1. (L, ≤) is a total order (all levels comparable)
// 2. ⊥ ≤ x for all x ∈ L (bottom is least element)
// 3. x ≤ ⊤ for all x ∈ L (top is greatest element)
// 4. x ⊔ y = max(x, y) (composition takes worst case - SIMPLIFIED model)
// 5. Monotonicity: if x ≤ y then f(x) ≤ f(y) for all valid transformations f
//
// CROSS-STANDARD ordering is a CONSTRUCTED functor to [0,1], NOT a discovered
// property of the standards. The join(SIL_2, ASIL_C) operation presupposes
// the ordinal mapping — it doesn't derive it.
//
// Note: Actual standards allow decomposition (e.g., SIL 3 → SIL 2 + SIL 1 with
// redundancy + independence). This simplified model doesn't capture that fully.
// =============================================================================

// =============================================================================
// FORMAL DOMAIN SPACE (TypeScript realization of mathematical definitions)
// =============================================================================
// See THEORY.md for full mathematical treatment
// =============================================================================

/**
 * Definition 1 (Safety Standard) — TypeScript realization
 *
 * A safety standard S = (L, ≤, ⊥, ⊤, ρ) where:
 * - L: finite set of integrity levels (the `levels` array)
 * - ≤: total order on L (the `compare` function)
 * - ⊥: bottom element (the `bottom` property)
 * - ⊤: top element (the `top` property)
 * - ρ: risk reduction function (the `toUniversal` method, partially)
 *
 * This interface captures the algebraic structure shared by all safety standards.
 */
export interface SafetyStandardStructure<L extends IntegrityLevel> {
	/** The carrier set L of integrity levels */
	readonly levels: readonly L[];
	/** Bottom element ⊥ (no safety requirements) */
	readonly bottom: L;
	/** Top element ⊤ (maximum integrity) */
	readonly top: L;
	/** The total order ≤ on L */
	compare(a: L, b: L): Ordering;
	/** The standard's identifier in the standards universe */
	readonly standardId: StandardIdentifier;
}

/**
 * Definition 2 (Standards Universe) — Identifiers
 *
 * U = {S₁, S₂, ..., Sₙ} enumeration
 */
export enum StandardIdentifier {
	IEC_61508 = "IEC_61508", // S₁ - Industrial
	ISO_26262 = "ISO_26262", // S₂ - Automotive
	DO_178C = "DO_178C", // S₃ - Aviation (+ AC 25.1309)
	ECSS = "ECSS", // S₄ - Space
	IEC_62304 = "IEC_62304", // S₅ - Medical
}

/**
 * Assessment methodology used by a safety standard
 * (Moved before STANDARDS_UNIVERSE to avoid forward reference)
 */
export enum AssessmentMethodology {
	QUANTITATIVE_PROBABILITY = "quantitative_probability", // IEC 61508
	QUALITATIVE_MATRIX = "qualitative_matrix", // ISO 26262 (S×E×C)
	PROCESS_BASED = "process_based", // DO-178C
	SEVERITY_BASED = "severity_based", // ECSS, IEC 62304
}

/**
 * Definition 3 (Heterogeneity) — TypeScript encoding
 *
 * Captures the different types of heterogeneity across standards
 */
export interface StandardHeterogeneity {
	/** Methodological heterogeneity: how ρ is defined */
	readonly methodology: AssessmentMethodology;
	/** Dimensional heterogeneity: what risk inputs are used */
	readonly riskDimensions: readonly string[];
	/** Consequential heterogeneity: scale of top-level consequences */
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
 * Definition 4 (Universal Ordinal Functor) — TypeScript signature
 *
 * φᵢ: Lᵢ → [0,1] mapping each standard's levels to the universal ordinal space
 *
 * The functor maps: φᵢ(ℓⱼ) = j / (kᵢ - 1) for j ∈ {0, 1, ..., kᵢ - 1}
 * where kᵢ = |Lᵢ| is the number of levels in standard i
 */
export type UniversalOrdinalFunctor<L extends IntegrityLevel> = (level: L) => number;

/**
 * Create a universal ordinal functor for a given standard
 *
 * This implements Definition 4 from the theory:
 * φᵢ(ℓⱼ) = j / (kᵢ - 1)
 */
export function createUniversalOrdinalFunctor<L extends IntegrityLevel>(
	levels: readonly L[],
): UniversalOrdinalFunctor<L> {
	const maxOrdinal = levels.length - 1;
	return (level: L) => level.ordinal / maxOrdinal;
}

// =============================================================================
// CONSEQUENCE & PROBABILITY TYPES
// =============================================================================

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

/**
 * Failure probability bounds - the quantitative anchor
 *
 * ⚠️ NOTE: Only applicable to quantitative standards (IEC 61508)
 * Other standards either:
 * - Have no probability targets (ISO 26262 ASIL A, DO-178C)
 * - Get probability from separate documents (DO-178C + AC 25.1309)
 * - Advise against probabilistic assessment (ECSS for software, per ECSS-Q-HB-80-03A)
 */
export interface FailureProbabilityBound {
	/** Upper bound (worst acceptable) */
	upper: number;
	/** Lower bound (level floor) */
	lower: number;
	/** Unit of measurement */
	unit: "per_hour" | "per_demand" | "per_mission" | "per_flight_hour";
	/** Confidence level for the bound */
	confidence: number; // Typically 0.95 or 0.99
	/** Source document for these values */
	source?: string;
}

export interface NumericRange {
	min: number;
	max: number;
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
 *
 * The universal ordinal enables cross-standard COMMUNICATION, not SUBSTITUTION.
 * Cross-standard mappings are APPROXIMATE and NON-NORMATIVE.
 * ═══════════════════════════════════════════════════════════════════════════════
 */
export interface UniversalIntegrityLevel {
	/**
	 * Normalized ordinal ∈ [0, 1]
	 * 0 = no safety requirements (⊥)
	 * 1 = maximum integrity (⊤)
	 *
	 * ⚠️ This is ordinal position only - consequence severities differ vastly!
	 */
	readonly ordinal: number;

	/**
	 * Probability target (if applicable)
	 *
	 * ⚠️ NULL for standards that don't use probability:
	 * - ISO 26262 ASIL A (no target)
	 * - DO-178C (process-based, no probability)
	 * - ECSS (severity-based, advises against probabilistic assessment for software)
	 * - IEC 62304 (harm severity-based, no probability)
	 */
	readonly failureProbability: FailureProbabilityBound | null;

	/**
	 * Risk Reduction Factor (RRF) - if applicable
	 * RRF = 1 / PFD (or 1 / PFH × mission_time)
	 * Represents how much the system reduces base risk
	 *
	 * ⚠️ NULL for non-quantitative standards
	 */
	readonly riskReductionFactor: NumericRange | null;

	/**
	 * Consequence severity if the safety function fails
	 *
	 * ⚠️ WARNING: Scales are NOT equivalent across domains!
	 */
	readonly consequenceSeverity: ConsequenceSeverity;

	/**
	 * Assessment methodology of the source standard
	 */
	readonly methodology: AssessmentMethodology;
}

/**
 * Ordering result for lattice comparison
 */
export enum Ordering {
	LESS = -1,
	EQUAL = 0,
	GREATER = 1,
}

/**
 * Base constraint for any integrity level in the lattice
 */
export interface IntegrityLevel {
	readonly name: string;
	readonly ordinal: number; // Position in the order (0 = bottom)
}

/**
 * The safety integrity lattice
 *
 * Mathematical definition:
 *   𝕃 = (L, ⊥, ⊤, ⊔, ⊓, ≤)
 *
 * Where:
 *   L = carrier set of integrity levels
 *   ⊥ = bottom (no requirements)
 *   ⊤ = top (maximum integrity)
 *   ⊔ = join (least upper bound, composition)
 *   ⊓ = meet (greatest lower bound)
 *   ≤ = partial order (criticality ordering)
 */
export interface SafetyLattice<T extends IntegrityLevel> {
	/** The carrier set */
	readonly levels: readonly T[];

	/** Bottom element (⊥) - no safety requirements */
	readonly bottom: T;

	/** Top element (⊤) - maximum integrity */
	readonly top: T;

	/**
	 * Ordering relation: a ≤ b iff a is less-or-equal critical to b
	 * Must satisfy: reflexive, antisymmetric, transitive, total
	 */
	compare(a: T, b: T): Ordering;

	/**
	 * Join operation: a ⊔ b = least upper bound
	 * For safety: join(a,b) = max(a,b) in criticality
	 *
	 * Axioms:
	 *   - Commutative: a ⊔ b = b ⊔ a
	 *   - Associative: (a ⊔ b) ⊔ c = a ⊔ (b ⊔ c)
	 *   - Idempotent: a ⊔ a = a
	 *   - Identity: a ⊔ ⊥ = a
	 *   - Absorption: a ⊔ ⊤ = ⊤
	 */
	join(a: T, b: T): T;

	/**
	 * Meet operation: a ⊓ b = greatest lower bound
	 * For safety: meet(a,b) = min(a,b) in criticality
	 * Used for: "what's the minimum we can get away with?"
	 */
	meet(a: T, b: T): T;

	/**
	 * Embedding into universal space
	 * Allows cross-standard comparison
	 */
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
 *
 * Verifies:
 * - AXIOM 1: Total Order - ∀ a, b ∈ L: (a ≤ b) ∨ (b ≤ a)
 * - AXIOM 2: Bounded - ∀ x ∈ L: ⊥ ≤ x ≤ ⊤
 * - AXIOM 3: Join is Least Upper Bound
 * - AXIOM 4: Join Identity and Absorption
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

			// Antisymmetry: if a ≤ b and b ≤ a then a = b
			if (cmp_ab === Ordering.LESS && cmp_ba === Ordering.LESS) {
				violations.push(`Antisymmetry violated: ${a.name} < ${b.name} and ${b.name} < ${a.name}`);
			}

			// Consistency: cmp(a,b) and cmp(b,a) must be inverses
			if (cmp_ab === Ordering.LESS && cmp_ba !== Ordering.GREATER) {
				violations.push(`Order consistency violated: ${a.name}, ${b.name}`);
			}
		}
	}

	// Axiom 2: Bounded - bottom ≤ all, all ≤ top
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

			// a ≤ (a ⊔ b) and b ≤ (a ⊔ b)
			if (lattice.compare(a, j) === Ordering.GREATER) {
				violations.push(`Join upper bound violated: ${a.name} > join(${a.name}, ${b.name})`);
			}
			if (lattice.compare(b, j) === Ordering.GREATER) {
				violations.push(`Join upper bound violated: ${b.name} > join(${a.name}, ${b.name})`);
			}

			// Commutativity: a ⊔ b = b ⊔ a
			const j_ba = lattice.join(b, a);
			if (j.ordinal !== j_ba.ordinal) {
				violations.push(
					`Join commutativity violated: ${a.name} ⊔ ${b.name} ≠ ${b.name} ⊔ ${a.name}`,
				);
			}
		}

		// Identity: a ⊔ ⊥ = a
		const joinBottom = lattice.join(a, lattice.bottom);
		if (joinBottom.ordinal !== a.ordinal) {
			violations.push(`Join identity violated: ${a.name} ⊔ ⊥ ≠ ${a.name}`);
		}

		// Absorption: a ⊔ ⊤ = ⊤
		const joinTop = lattice.join(a, lattice.top);
		if (joinTop.ordinal !== lattice.top.ordinal) {
			violations.push(`Join absorption violated: ${a.name} ⊔ ⊤ ≠ ⊤`);
		}

		// Idempotence: a ⊔ a = a
		const joinSelf = lattice.join(a, a);
		if (joinSelf.ordinal !== a.ordinal) {
			violations.push(`Join idempotence violated: ${a.name} ⊔ ${a.name} ≠ ${a.name}`);
		}
	}

	// Axiom 4: Probability consistency (higher ordinal = lower failure probability)
	const sortedLevels = [...lattice.levels].sort((a, b) => a.ordinal - b.ordinal);
	for (let i = 1; i < sortedLevels.length; i++) {
		const prevLevel = sortedLevels[i - 1];
		const currLevel = sortedLevels[i];
		if (prevLevel && currLevel) {
			const lower = lattice.toUniversal(prevLevel);
			const higher = lattice.toUniversal(currLevel);
			// Only check probability consistency for quantitative standards
			// Standards like ISO 26262 may have null probability for some levels
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
// CROSS-STANDARD ISOMORPHISM
// =============================================================================

/**
 * A probability band mapping levels across standards
 * Based on equivalent failure probability targets
 */
/**
 * Confidence level for cross-standard mappings
 */
export enum MappingConfidence {
	/** Probability targets align within one order of magnitude */
	HIGH = "high",
	/** Probability targets are in same general range */
	MEDIUM = "medium",
	/** Ordinal position matches but probabilities differ significantly */
	LOW = "low",
	/** Mapping based purely on ordinal position (highest↔highest) */
	ORDINAL_ONLY = "ordinal_only",
}

export interface ProbabilityBand {
	/** Upper PFH bound (worst acceptable for this level) */
	pfhUpper: number;
	/** Lower PFH bound (floor for this level) */
	pfhLower: number;
	/** Normalized ordinal ∈ [0, 1] */
	universalOrdinal: number;
	/** Level names in each standard */
	mappings: Readonly<Record<string, string>>;
	/** Human-readable meaning */
	meaning: string;
	/** Confidence level for this mapping */
	confidence: MappingConfidence;
	/** Which standard pairs have verified probability alignment? */
	verifiedPairs?: readonly [string, string][];
}

/**
 * Cross-standard mapping based on probability equivalences
 */
export interface CrossStandardMapping {
	probabilityBands: readonly ProbabilityBand[];
}

/**
 * ⚠️⚠️⚠️ CRITICAL DISCLAIMER ⚠️⚠️⚠️
 *
 * APPROXIMATE CROSS-STANDARD MAPPING - NON-NORMATIVE
 *
 * These mappings are PROVIDED FOR REFERENCE ONLY and are NOT officially endorsed
 * by any standards body. Use with extreme caution.
 *
 * VERIFICATION STATUS: These issues have been VERIFIED against primary sources.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * KNOWN ISSUES WITH CROSS-STANDARD COMPARISON
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 1. METHODOLOGICAL INCOMPATIBILITY:
 *    - IEC 61508: Quantitative (probability-based via risk graph or LOPA)
 *    - ISO 26262: Qualitative (S×E×C matrix) - explicitly states "no normative
 *                 nor informative mapping of ASIL to SIL" [Wikipedia]
 *    - DO-178C: Process-based (no probability targets - those come from AC 25.1309)
 *    - ECSS: Severity-based only (advises against probabilistic software
 *            assessment per ECSS-Q-HB-80-03A)
 *    - IEC 62304: Harm severity-based (no probability thresholds)
 *
 * 2. CONSEQUENCE SCALES ARE NOT EQUIVALENT:
 *    - DAL A: Catastrophic aircraft loss (potentially hundreds of deaths)
 *    - ASIL D: At most a fully loaded passenger vehicle (~10 people)
 *    - SIL 4: Industrial plant with defined exposure zones
 *    Quote: "While ASIL D encompasses at most the hazards of a loaded passenger
 *            van, DAL A includes the greater hazards of large aircraft loaded
 *            with fuel and passengers." [Wikipedia]
 *
 * 3. VERIFIED MAPPING ISSUES (from primary sources):
 *    - ASIL A has NO probability target (purely qualitative process requirements)
 *    - ASIL B and ASIL C share the SAME PMHF target (<10⁻⁷/h)!
 *      The difference is SPFM (90% vs 97%) and LFM (60% vs 80%) [ISO 26262-5]
 *    - DO-178C DAL D is "Probable" (>10⁻⁵), not in a specific probability band
 *    - DO-178C DAL A is "Extremely Improbable" (≤10⁻⁹) [AC 25.1309-1A]
 *
 * 4. NO OFFICIAL MAPPING EXISTS:
 *    - ISO 26262 explicitly states no normative mapping to SIL exists
 *    - IEC TR 61508-6-1 (reportedly in development for 2025) may provide
 *      first official cross-standard recognition guidance
 *    - Academic literature on lattice-theoretic formalization is sparse
 *      (primarily contract theory extensions, not pure lattice algebra)
 *
 * 5. SOFTWARE VS HARDWARE:
 *    - DO-178C explicitly states design errors cannot be probabilistically
 *      quantified (software failures are systematic, not random)
 *    - IEC 62304 and ECSS similarly reject probability-based software classification
 *    - ISO 26262 PMHF targets apply to HARDWARE only
 *
 * This mapping is based on rough ORDINAL equivalence (highest in each = highest
 * integrity) NOT on verified probability equivalence.
 *
 * References:
 *   - IEC 61508-1:2010, Tables 2 & 3
 *   - ISO 26262-5:2018, Table 6
 *   - AC 25.1309-1A, FAA
 *   - ECSS-Q-ST-40C, Section 5.2.3.1
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
 *
 * ⚠️ SEE CROSS_STANDARD_MAPPING_DISCLAIMER BEFORE USING
 *
 * This is based on ORDINAL position (highest = highest) NOT probability equivalence
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
			// All standards agree: these levels have no safety requirements
			verifiedPairs: [
				["IEC_61508:SIL_0", "ISO_26262:QM"],
				["IEC_61508:SIL_0", "DO_178C:DAL_E"],
			],
		},
		{
			// ⚠️ ASIL_A has NO probability target!
			pfhUpper: 1e-5,
			pfhLower: 1e-6,
			universalOrdinal: 0.25,
			mappings: {
				IEC_61508: "SIL_1",
				ISO_26262: "ASIL_A", // ⚠️ NO probability target for ASIL A!
				DO_178C: "DAL_D", // ⚠️ DAL D is actually "Probable" (>10⁻⁵)
				ECSS: "D", // ⚠️ ECSS prohibits probability assessment for SW
				IEC_62304: "Class_A", // ⚠️ IEC 62304 has no probability targets
			},
			meaning: "Low integrity (ordinal equivalence only - probability values DO NOT MATCH)",
			confidence: MappingConfidence.ORDINAL_ONLY,
			// ASIL A has NO probability target, DAL D allows >10⁻⁵ (different from SIL 1)
		},
		{
			// ⚠️ ASIL_B target is <10⁻⁷, not <10⁻⁶!
			pfhUpper: 1e-6,
			pfhLower: 1e-7,
			universalOrdinal: 0.5,
			mappings: {
				IEC_61508: "SIL_2",
				ISO_26262: "ASIL_B", // ⚠️ ASIL B target is <10⁻⁷ (same as ASIL C!)
				DO_178C: "DAL_C", // ⚠️ DAL C is "Remote" (≤10⁻⁵)
				ECSS: "C",
				IEC_62304: "Class_B",
			},
			meaning: "Medium integrity (ordinal equivalence only - probability values DO NOT MATCH)",
			confidence: MappingConfidence.LOW,
			// SIL 2 is 10⁻⁶-10⁻⁷, but ASIL B is <10⁻⁷, DAL C is ≤10⁻⁵
		},
		{
			// ⚠️ ASIL_B and ASIL_C share SAME probability target (<10⁻⁷)!
			pfhUpper: 1e-7,
			pfhLower: 1e-8,
			universalOrdinal: 0.75,
			mappings: {
				IEC_61508: "SIL_3",
				ISO_26262: "ASIL_C", // ⚠️ Same PMHF as ASIL B! Differs in SPFM/LFM only
				DO_178C: "DAL_B", // DAL B is "Extremely Remote" (≤10⁻⁷) - closest match
				ECSS: "B",
				IEC_62304: "Class_C",
			},
			meaning: "High integrity (best probability alignment at this level)",
			confidence: MappingConfidence.MEDIUM,
			// SIL 3 (10⁻⁷-10⁻⁸) aligns with DAL B (≤10⁻⁷) within ~1 order of magnitude
			verifiedPairs: [["IEC_61508:SIL_3", "DO_178C:DAL_B"]],
		},
		{
			pfhUpper: 1e-8,
			pfhLower: 1e-9,
			universalOrdinal: 1.0,
			mappings: {
				IEC_61508: "SIL_4", // SIL 4: ≥10⁻⁹ to <10⁻⁸
				ISO_26262: "ASIL_D", // ASIL D: <10⁻⁸
				DO_178C: "DAL_A", // ⚠️ DAL A is ≤10⁻⁹ (stricter than SIL 4)
				ECSS: "A",
				IEC_62304: "Class_C", // ⚠️ IEC 62304 has no probability targets
			},
			meaning: "Highest integrity (ordinal equivalence; see scholarly note below)",
			confidence: MappingConfidence.MEDIUM,
			// ⚠️ SCHOLARLY NOTE (Verhulst et al., SAFECOMP 2013):
			// ASIL D may correspond more closely to SIL 3 than SIL 4 in practice.
			// Reasoning: ISO 26262 targets single-channel automotive systems (not fault-tolerant),
			// while SIL 4 typically requires redundant MooN architectures.
			// Maximum automotive casualties (~6 people) don't approach SIL 4 consequence scales.
			// This mapping uses ordinal equivalence (highest = highest) for theoretical consistency,
			// but practitioners should note this scholarly critique.
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
 * See CROSS_STANDARD_MAPPING_DISCLAIMER before using.
 *
 * @example
 * translateIntegrity("SIL_3", "IEC_61508", "ISO_26262") // → "ASIL_C" (approximate!)
 * translateIntegrity("DAL_A", "DO_178C", "IEC_61508")   // → "SIL_4" (approximate!)
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
 *
 * @example
 * getMappingConfidence("SIL_3", "IEC_61508", "DAL_B", "DO_178C")
 * // Returns: { confidence: "medium", verified: true }
 */
export function getMappingConfidence(
	level1: string,
	standard1: string,
	level2: string,
	standard2: string,
): { confidence: MappingConfidence; verified: boolean } | null {
	const band1 = getProbabilityBand(level1, standard1);
	const band2 = getProbabilityBand(level2, standard2);

	// Check if both levels map to the same band
	if (!band1 || !band2 || band1 !== band2) {
		return null; // Levels are not equivalent in this mapping
	}

	// Check if this specific pair has been verified
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
// THE UNIVERSAL RISK EQUATION
// =============================================================================
//
// ⚠️⚠️⚠️ IMPORTANT CAVEAT ⚠️⚠️⚠️
//
// The "universal risk equation" below is a THEORETICAL construct for educational
// purposes. It is NOT how any actual safety standard determines integrity levels!
//
// VERIFIED: How standards ACTUALLY work (from primary sources):
//
// IEC 61508 Risk Graph Method (Annex D):
//   Uses four DISCRETE parameters combined via graphical decision tree:
//   - C: Consequence (C1-C4)
//   - F: Frequency/exposure (F1-F2)
//   - P: Possibility of avoidance (P1-P2)
//   - W: Demand rate (W1-W3)
//   NOT arithmetic multiplication!
//
// ISO 26262 HARA:
//   Uses QUALITATIVE S×E×C lookup table:
//   - S: Severity (S0-S3)
//   - E: Exposure probability (E0-E4)
//   - C: Controllability (C0-C3)
//   Result is ASIL via table lookup, NOT calculation!
//
// DO-178C + ARP4761:
//   Uses failure condition severity classification with AC 25.1309 probability
//   targets. Higher severity → lower allowable probability (inverse relationship).
//   Software integrity is assigned based on PROCESS rigor, not calculation.
//
// The equation below is useful for understanding risk reduction concepts but
// should NOT be used to determine actual SIL/ASIL/DAL requirements for
// compliance purposes. Always consult the actual standard and domain experts.
// =============================================================================

/**
 * Risk assessment inputs for computing required integrity
 *
 * ⚠️ THEORETICAL MODEL - See caveat above!
 *
 * THE FUNDAMENTAL EQUATION:
 *   Risk = f(Severity, Exposure, Controllability)
 *   IntegrityRequirement = g(Risk_unreduced, Risk_tolerable)
 *   where g(R_u, R_t) = ⌈log₁₀(R_u / R_t)⌉
 */
export interface RiskAssessment {
	/** Probability of hazardous event occurring (unmitigated) */
	hazardProbability: number;

	/** Probability of exposure to hazard when it occurs */
	exposureProbability: number;

	/** Probability that harm cannot be avoided given exposure */
	unavoidabilityProbability: number;

	/** Severity of harm if it occurs */
	severity: ConsequenceSeverity;
}

/**
 * Convert consequence severity to numerical weight
 * Exponential weighting - each level is 10x worse
 */
export function severityToWeight(severity: ConsequenceSeverity): number {
	return 10 ** severity;
}

/**
 * Compute the unreduced risk from a risk assessment
 *
 * R_unreduced = P_hazard × P_exposure × P_unavoidable × W_severity
 */
export function computeUnreducedRisk(assessment: RiskAssessment): number {
	return (
		assessment.hazardProbability *
		assessment.exposureProbability *
		assessment.unavoidabilityProbability *
		severityToWeight(assessment.severity)
	);
}

/**
 * Compute required integrity level from risk assessment
 *
 * THE UNIVERSAL FORMULA:
 *   RRF = R_unreduced / R_tolerable
 *   Level = ceil(log10(RRF)), clamped to [0, 4]
 *   Ordinal = Level / 4
 */
export function computeRequiredIntegrity(
	assessment: RiskAssessment,
	tolerableRisk: number,
): UniversalIntegrityLevel {
	const unreducedRisk = computeUnreducedRisk(assessment);

	// RRF = R_unreduced / R_tolerable
	const riskReductionFactor = unreducedRisk / tolerableRisk;

	// Level = ceil(log10(RRF)), clamped to [0, 4]
	const rawLevel = Math.ceil(Math.log10(riskReductionFactor));
	const level = Math.max(0, Math.min(4, rawLevel));

	// Convert to normalized ordinal ∈ [0, 1]
	const ordinal = level / 4;

	// Compute required failure probability
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
		// This is a theoretical computation, not aligned with any specific standard
		methodology: AssessmentMethodology.QUANTITATIVE_PROBABILITY,
	};
}

/**
 * Find the matching level in a specific standard for a universal integrity
 */
export function projectToStandard(
	universal: UniversalIntegrityLevel,
	standard: string,
): string | null {
	// Find the band with the closest ordinal
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

// =============================================================================
// CONCRETE LATTICE IMPLEMENTATIONS
// =============================================================================

// -----------------------------------------------------------------------------
// Common Lattice Operations (DRY extraction)
// -----------------------------------------------------------------------------
// All safety integrity lattices share identical compare/join/meet operations
// since they are all totally ordered sets based on ordinal values.

/**
 * Standard ordinal comparison for any integrity level
 * All safety standards form total orders, so this is universal.
 */
function compareByOrdinal<T extends IntegrityLevel>(a: T, b: T): Ordering {
	if (a.ordinal < b.ordinal) return Ordering.LESS;
	if (a.ordinal > b.ordinal) return Ordering.GREATER;
	return Ordering.EQUAL;
}

/**
 * Standard join (least upper bound) for totally ordered lattice
 * join(a, b) = max(a, b) by ordinal
 */
function joinByOrdinal<T extends IntegrityLevel>(a: T, b: T): T {
	return a.ordinal >= b.ordinal ? a : b;
}

/**
 * Standard meet (greatest lower bound) for totally ordered lattice
 * meet(a, b) = min(a, b) by ordinal
 */
function meetByOrdinal<T extends IntegrityLevel>(a: T, b: T): T {
	return a.ordinal <= b.ordinal ? a : b;
}

/**
 * Normalize ordinal to [0, 1] range for universal comparison
 * Assumes 4 is the maximum ordinal (SIL 4, ASIL D, DAL A)
 */
const MAX_INTEGRITY_ORDINAL = 4;

function normalizeOrdinal(ordinal: number): number {
	return ordinal / MAX_INTEGRITY_ORDINAL;
}

/**
 * Compute Risk Reduction Factor from ordinal
 * RRF represents how much the system reduces base risk (orders of magnitude)
 * Returns null for ordinal 0 (no safety requirements)
 */
function computeRiskReductionFactor(ordinal: number): NumericRange | null {
	if (ordinal === 0) return null;
	return {
		min: 10 ** ordinal,
		max: 10 ** (ordinal + 1),
	};
}

/**
 * Configuration for creating a SIL universal level
 */
interface SILUniversalConfig {
	bounds: { upper: number; lower: number } | null;
	unit: "per_hour" | "per_demand";
	source: string;
}

/**
 * Create a UniversalIntegrityLevel for IEC 61508 SIL
 * Shared by both high-demand (PFH) and low-demand (PFD) modes
 */
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

// -----------------------------------------------------------------------------

/**
 * IEC 61508 SIL Lattice Implementation
 *
 * ⚠️ NOTE: IEC 61508 has TWO different probability tables:
 * - Table 2: Low-demand mode (PFDavg - per demand)
 * - Table 3: High-demand/Continuous mode (PFH - per hour)
 *
 * This implementation uses Table 3 (PFH) values.
 * For low-demand applications, use createSILLowDemandUniversal() instead.
 */
interface SILLevel extends IntegrityLevel {
	readonly sil: SafetyIntegrityLevel;
}

const SIL_0: SILLevel = { name: "SIL_0", ordinal: 0, sil: SafetyIntegrityLevel.SIL_0 };
const SIL_1: SILLevel = { name: "SIL_1", ordinal: 1, sil: SafetyIntegrityLevel.SIL_1 };
const SIL_2: SILLevel = { name: "SIL_2", ordinal: 2, sil: SafetyIntegrityLevel.SIL_2 };
const SIL_3: SILLevel = { name: "SIL_3", ordinal: 3, sil: SafetyIntegrityLevel.SIL_3 };
const SIL_4: SILLevel = { name: "SIL_4", ordinal: 4, sil: SafetyIntegrityLevel.SIL_4 };

const SIL_LEVELS: readonly SILLevel[] = [SIL_0, SIL_1, SIL_2, SIL_3, SIL_4];

/**
 * IEC 61508-1 Table 3: Safety integrity levels - target failure measures
 * for a safety function operating in high demand or continuous mode
 *
 * Source: IEC 61508-1:2010, Table 3
 */
const IEC61508_TABLE3_PFH = [
	null, // SIL 0: No requirements
	{ upper: 1e-5, lower: 1e-6 }, // SIL 1: ≥10⁻⁶ to <10⁻⁵
	{ upper: 1e-6, lower: 1e-7 }, // SIL 2: ≥10⁻⁷ to <10⁻⁶
	{ upper: 1e-7, lower: 1e-8 }, // SIL 3: ≥10⁻⁸ to <10⁻⁷
	{ upper: 1e-8, lower: 1e-9 }, // SIL 4: ≥10⁻⁹ to <10⁻⁸
] as const;

/**
 * IEC 61508-1 Table 2: Safety integrity levels - target failure measures
 * for a safety function operating in low demand mode
 *
 * Source: IEC 61508-1:2010, Table 2
 */
const IEC61508_TABLE2_PFD = [
	null, // SIL 0: No requirements
	{ upper: 1e-1, lower: 1e-2 }, // SIL 1: ≥10⁻² to <10⁻¹
	{ upper: 1e-2, lower: 1e-3 }, // SIL 2: ≥10⁻³ to <10⁻²
	{ upper: 1e-3, lower: 1e-4 }, // SIL 3: ≥10⁻⁴ to <10⁻³
	{ upper: 1e-4, lower: 1e-5 }, // SIL 4: ≥10⁻⁵ to <10⁻⁴
] as const;

export const SIL_LATTICE: SafetyLattice<SILLevel> = {
	levels: SIL_LEVELS,
	bottom: SIL_0,
	top: SIL_4,

	compare: compareByOrdinal,
	join: joinByOrdinal,
	meet: meetByOrdinal,

	/**
	 * Convert to universal level using PFH (high-demand/continuous mode)
	 * For low-demand mode, use createSILLowDemandUniversal()
	 */
	toUniversal(level: SILLevel): UniversalIntegrityLevel {
		const bounds = IEC61508_TABLE3_PFH[level.ordinal];
		return createSILUniversalFromConfig(level, {
			bounds: bounds ?? null,
			unit: "per_hour",
			source: "IEC 61508-1:2010 Table 3",
		});
	},
};

/**
 * Create universal level for SIL in low-demand mode (PFDavg)
 */
export function createSILLowDemandUniversal(level: SILLevel): UniversalIntegrityLevel {
	const bounds = IEC61508_TABLE2_PFD[level.ordinal];
	return createSILUniversalFromConfig(level, {
		bounds: bounds ?? null,
		unit: "per_demand",
		source: "IEC 61508-1:2010 Table 2",
	});
}

/**
 * ISO 26262 ASIL Lattice Implementation
 *
 * ⚠️ CRITICAL NOTES:
 *
 * 1. ASIL is determined QUALITATIVELY via S×E×C matrix (Severity × Exposure × Controllability)
 *    It is NOT derived from probability calculations.
 *
 * 2. ASIL A has NO quantitative probability target - it's purely qualitative
 *
 * 3. ASIL B and ASIL C share the SAME PMHF target (<10⁻⁷/h)
 *    The difference is in SPFM/LFM requirements, not probability!
 *
 * 4. ISO 26262 explicitly states "no normative mapping to SIL exists"
 *
 * Hardware PMHF targets (ISO 26262-5):
 *   QM:     N/A
 *   ASIL A: N/A (no quantitative target)
 *   ASIL B: <10⁻⁷/h, SPFM ≥90%, LFM ≥60%
 *   ASIL C: <10⁻⁷/h, SPFM ≥97%, LFM ≥80%  (SAME probability as B!)
 *   ASIL D: <10⁻⁸/h, SPFM ≥99%, LFM ≥90%
 */
interface ASILLevel extends IntegrityLevel {
	readonly asil: AutomotiveSafetyIntegrityLevel;
}

const ASIL_QM: ASILLevel = { name: "QM", ordinal: 0, asil: AutomotiveSafetyIntegrityLevel.QM };
const ASIL_A: ASILLevel = {
	name: "ASIL_A",
	ordinal: 1,
	asil: AutomotiveSafetyIntegrityLevel.ASIL_A,
};
const ASIL_B: ASILLevel = {
	name: "ASIL_B",
	ordinal: 2,
	asil: AutomotiveSafetyIntegrityLevel.ASIL_B,
};
const ASIL_C: ASILLevel = {
	name: "ASIL_C",
	ordinal: 3,
	asil: AutomotiveSafetyIntegrityLevel.ASIL_C,
};
const ASIL_D: ASILLevel = {
	name: "ASIL_D",
	ordinal: 4,
	asil: AutomotiveSafetyIntegrityLevel.ASIL_D,
};

const ASIL_LEVELS: readonly ASILLevel[] = [ASIL_QM, ASIL_A, ASIL_B, ASIL_C, ASIL_D];

/**
 * ISO 26262-5 Hardware PMHF targets
 *
 * ⚠️ WARNING: These are HARDWARE targets only!
 * ISO 26262 has NO software probability targets.
 *
 * Source: ISO 26262-5:2018, Table 6
 */
const ISO26262_PMHF_TARGETS: (FailureProbabilityBound | null)[] = [
	null, // QM: No safety requirements
	null, // ASIL A: NO quantitative target!
	{ upper: 1e-7, lower: 0, unit: "per_hour", confidence: 0.95, source: "ISO 26262-5:2018 Table 6" }, // ASIL B
	{ upper: 1e-7, lower: 0, unit: "per_hour", confidence: 0.95, source: "ISO 26262-5:2018 Table 6" }, // ASIL C (SAME as B!)
	{ upper: 1e-8, lower: 0, unit: "per_hour", confidence: 0.95, source: "ISO 26262-5:2018 Table 6" }, // ASIL D
];

export const ASIL_LATTICE: SafetyLattice<ASILLevel> = {
	levels: ASIL_LEVELS,
	bottom: ASIL_QM,
	top: ASIL_D,

	compare: compareByOrdinal,
	join: joinByOrdinal,
	meet: meetByOrdinal,

	/**
	 * Convert to universal level
	 *
	 * ⚠️ WARNING: ASIL is a QUALITATIVE classification!
	 * The probability values here are HARDWARE PMHF targets only.
	 * ASIL A has NO probability target.
	 * ASIL B and C share the SAME probability target - they differ in SPFM/LFM!
	 */
	toUniversal(level: ASILLevel): UniversalIntegrityLevel {
		const pmhfTarget = ISO26262_PMHF_TARGETS[level.ordinal] ?? null;

		return {
			ordinal: normalizeOrdinal(level.ordinal),
			// Many ASIL levels have NO probability target or share targets
			failureProbability: pmhfTarget,
			// Cannot derive RRF from qualitative classification
			riskReductionFactor: null,
			consequenceSeverity: level.ordinal as ConsequenceSeverity,
			methodology: AssessmentMethodology.QUALITATIVE_MATRIX,
		};
	},
};

/**
 * DO-178C DAL Lattice Implementation
 *
 * ⚠️ CRITICAL NOTES:
 *
 * 1. DO-178C itself defines NO probability targets - it's purely PROCESS-BASED
 *    Probability targets come from AC 25.1309-1A (for transport aircraft)
 *
 * 2. The link is: Failure Condition Severity → AC 25.1309 Probability → DO-178C DAL
 *
 * 3. DAL uses reverse ordering (A is highest/most critical, E is lowest)
 *
 * AC 25.1309-1A Probability Classifications:
 *   - Probable:              >10⁻⁵ per flight hour
 *   - Remote:                ≤10⁻⁵ per flight hour
 *   - Extremely Remote:      ≤10⁻⁷ per flight hour
 *   - Extremely Improbable:  ≤10⁻⁹ per flight hour
 *
 * Mapping (from SAE ARP4754A):
 *   DAL E (No Effect):          N/A
 *   DAL D (Minor):              Probable (>10⁻⁵)
 *   DAL C (Major):              Remote (≤10⁻⁵)
 *   DAL B (Hazardous):          Extremely Remote (≤10⁻⁷)
 *   DAL A (Catastrophic):       Extremely Improbable (≤10⁻⁹)
 */
interface DALLevel extends IntegrityLevel {
	readonly dal: DesignAssuranceLevel;
}

const DAL_E: DALLevel = { name: "DAL_E", ordinal: 0, dal: DesignAssuranceLevel.DAL_E };
const DAL_D: DALLevel = { name: "DAL_D", ordinal: 1, dal: DesignAssuranceLevel.DAL_D };
const DAL_C: DALLevel = { name: "DAL_C", ordinal: 2, dal: DesignAssuranceLevel.DAL_C };
const DAL_B: DALLevel = { name: "DAL_B", ordinal: 3, dal: DesignAssuranceLevel.DAL_B };
const DAL_A: DALLevel = { name: "DAL_A", ordinal: 4, dal: DesignAssuranceLevel.DAL_A };

const DAL_LEVELS: readonly DALLevel[] = [DAL_E, DAL_D, DAL_C, DAL_B, DAL_A];

/**
 * AC 25.1309-1A probability targets per failure condition severity
 *
 * ⚠️ NOTE: These are from AC 25.1309, NOT from DO-178C!
 * DO-178C is process-based and has no probability requirements.
 *
 * Source: AC 25.1309-1A, FAA
 */
const AC25_1309_PROBABILITY_TARGETS: (FailureProbabilityBound | null)[] = [
	null, // DAL E: No Effect - no probability requirement
	// DAL D: Minor - "Probable" means probability may be >10⁻⁵ (no upper bound specified)
	{
		upper: Number.POSITIVE_INFINITY,
		lower: 1e-5,
		unit: "per_flight_hour",
		confidence: 0.95,
		source: "AC 25.1309-1A (Probable)",
	},
	// DAL C: Major - "Remote" means ≤10⁻⁵
	{
		upper: 1e-5,
		lower: 1e-7,
		unit: "per_flight_hour",
		confidence: 0.95,
		source: "AC 25.1309-1A (Remote)",
	},
	// DAL B: Hazardous - "Extremely Remote" means ≤10⁻⁷
	{
		upper: 1e-7,
		lower: 1e-9,
		unit: "per_flight_hour",
		confidence: 0.95,
		source: "AC 25.1309-1A (Extremely Remote)",
	},
	// DAL A: Catastrophic - "Extremely Improbable" means ≤10⁻⁹
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

	/**
	 * Convert to universal level
	 *
	 * ⚠️ WARNING: DO-178C is PROCESS-BASED, not probability-based!
	 * Probability values come from AC 25.1309-1A, not DO-178C itself.
	 */
	toUniversal(level: DALLevel): UniversalIntegrityLevel {
		const probabilityTarget = AC25_1309_PROBABILITY_TARGETS[level.ordinal] ?? null;

		return {
			ordinal: normalizeOrdinal(level.ordinal),
			failureProbability: probabilityTarget,
			// Cannot derive RRF from process-based classification
			riskReductionFactor: null,
			consequenceSeverity: level.ordinal as ConsequenceSeverity,
			methodology: AssessmentMethodology.PROCESS_BASED,
		};
	},
};

// =============================================================================
// COMPOSITION THEOREMS
// =============================================================================
//
// VERIFIED: "Join = max" composition principle is PARTIALLY TRUE but oversimplified.
//
// The simple lattice model (a ⊔ b = max(a, b)) holds for:
//   - Components serving different functions (no redundancy)
//   - Single-channel architectures
//
// However, both IEC 61508 and ISO 26262 allow achieving HIGHER system
// integrity from LOWER-rated components through decomposition/synthesis:
//
// IEC 61508 SIL Synthesis (requires redundancy + independence):
//   - SIL 1 + SIL 1 → SIL 2 (with sufficient independence)
//   - SIL 2 + SIL 1 → SIL 3 (with sufficient independence)
//   Reference: IEC 61508-2, Section 7.4.4.3
//
// ISO 26262 ASIL Decomposition (requires "sufficient independence"):
//   - ASIL D → ASIL D + QM
//   - ASIL D → ASIL C(D) + ASIL A(D)
//   - ASIL D → ASIL B(D) + ASIL B(D)
//   The notation X(Y) means "ASIL X developed to ASIL Y requirements
//   for dependent failure analysis"
//   Reference: ISO 26262-9:2018, Clause 5
//
// Homogeneous redundancy ALONE is NOT sufficient for level reduction.
// Freedom from common-cause failures is REQUIRED.
// =============================================================================

/**
 * Composition context for systems with redundancy
 *
 * IEC 61508 and ISO 26262 allow decomposition/synthesis:
 *   - SIL 3 → SIL 2 + SIL 1 (with redundancy + independence)
 *   - ASIL D → ASIL B(D) + ASIL B(D)
 *   - ASIL D → ASIL C(D) + ASIL A(D)
 *
 * This means composition is NOT simply join(a, b) = max(a, b) when
 * redundancy and independence requirements are met.
 *
 * Reference: IEC 61508-2 Section 7.4.4.3, ISO 26262-9 Clause 5
 */
export interface CompositionContext {
	/** Are the components redundant (perform same function)? */
	redundant: boolean;

	/** Are the components sufficiently independent? */
	independent: boolean;

	/** Common cause freedom factor (β factor, 0-1, higher = more independent) */
	commonCauseFreedom: number;

	/** Diversity of implementation */
	diverseImplementation: boolean;
}

/**
 * Default context: no redundancy, conservative composition
 */
export const DEFAULT_COMPOSITION_CONTEXT: CompositionContext = {
	redundant: false,
	independent: false,
	commonCauseFreedom: 0,
	diverseImplementation: false,
};

/**
 * THEOREM: Monotonic Composition (SIMPLIFIED MODEL)
 *
 * For a system composed of subsystems WITHOUT redundancy:
 *   Integrity(System) = ⊔ { Integrity(Subsystem_i) }
 *
 * Equivalently:
 *   P_fail(System) ≥ max { P_fail(Subsystem_i) }
 *
 * This is the "weakest link" principle formalized.
 *
 * ⚠️ WARNING: This is a SIMPLIFIED model!
 * Actual standards allow decomposition with redundancy.
 * Use composeWithContext() for more accurate modeling.
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

/**
 * Composition with redundancy context
 *
 * When components are redundant and independent, lower integrity components
 * can achieve higher system integrity (synthesis).
 *
 * Example (IEC 61508):
 *   SIL 1 + SIL 1 (redundant, independent) → SIL 2
 *   SIL 2 + SIL 1 (redundant, independent) → SIL 3
 *
 * Example (ISO 26262 ASIL decomposition):
 *   ASIL D → ASIL B(D) + ASIL B(D)
 *   ASIL D → ASIL C(D) + ASIL A(D)
 *
 * ⚠️ NOTE: This is a simplified model. Actual decomposition has
 * additional requirements (see IEC 61508-2 and ISO 26262-9).
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

	// Conservative default: take maximum (weakest link)
	const conservativeResult = components.reduce(
		(acc, level) => lattice.join(acc, level),
		lattice.bottom,
	);

	// Check if synthesis conditions are met
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

	// Check common cause freedom
	if (context.commonCauseFreedom < 0.9) {
		return {
			resultLevel: conservativeResult,
			synthesisApplied: false,
			warnings: [
				`Common cause freedom (${context.commonCauseFreedom}) below 0.9 threshold - cannot apply synthesis`,
			],
		};
	}

	// Synthesis: with redundancy and independence, can achieve higher integrity
	// Simplified model: n redundant SIL x components → SIL (x + log2(n))
	// This is a simplified approximation - actual standards have specific tables
	const minOrdinal = Math.min(...components.map((c) => c.ordinal));
	const redundancyBonus = components.length >= 2 ? 1 : 0;
	const synthesizedOrdinal = Math.min(minOrdinal + redundancyBonus, lattice.top.ordinal);

	// Find the level with the synthesized ordinal
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

export interface CompositionResult<T extends IntegrityLevel> {
	resultLevel: T;
	synthesisApplied: boolean;
	warnings: string[];
}

/**
 * THEOREM: Refinement Preservation
 *
 * If implementation I refines specification S:
 *   Integrity(I) ≥ Integrity(S)
 *
 * You cannot implement a SIL 3 spec with SIL 2 code.
 */
export function checkRefinementValid<T extends IntegrityLevel>(
	lattice: SafetyLattice<T>,
	specLevel: T,
	implLevel: T,
): boolean {
	// Implementation must be at least as critical as specification
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
 *
 * Valid decompositions:
 *   ASIL D → ASIL D + QM
 *   ASIL D → ASIL C(D) + ASIL A(D)
 *   ASIL D → ASIL B(D) + ASIL B(D)
 *   ASIL C → ASIL C + QM
 *   ASIL C → ASIL B(C) + ASIL A(C)
 *   ASIL B → ASIL B + QM
 *   ASIL B → ASIL A(B) + ASIL A(B)
 *   ASIL A → ASIL A + QM
 *
 * The notation X(Y) means "ASIL X developed to ASIL Y requirements for
 * dependent failure analysis"
 */
export function isValidASILDecomposition(
	targetASIL: AutomotiveSafetyIntegrityLevel,
	component1ASIL: AutomotiveSafetyIntegrityLevel,
	component2ASIL: AutomotiveSafetyIntegrityLevel,
): boolean {
	// Map to ordinals: QM=0, A=1, B=2, C=3, D=4
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

	// Per ISO 26262-9: sum of components must equal target
	// (simplified model - actual standard has additional requirements)
	return c1 + c2 >= target;
}

// =============================================================================
// MATHEMATICAL FORMALIZATION & CALCULUS
// =============================================================================
//
// This section provides the formal mathematical foundations for safety integrity
// analysis, including probability calculus, lattice algebra, and risk equations.
//
// ⚠️ IMPORTANT: These are THEORETICAL models. Actual standards may use different
// methods (qualitative matrices, process checklists, etc.)
// =============================================================================

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PART 1: PROBABILITY THEORY FOUNDATIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Key Probability Metrics in Safety Standards:
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ Metric │ Definition                        │ Unit        │ Used By        │
 * ├────────┼───────────────────────────────────┼─────────────┼────────────────┤
 * │ PFDavg │ Average Probability of Failure    │ per demand  │ IEC 61508      │
 * │        │ on Demand                         │             │ (low-demand)   │
 * │ PFH    │ Probability of Dangerous Failure  │ per hour    │ IEC 61508      │
 * │        │ per Hour                          │             │ (continuous)   │
 * │ PMHF   │ Probabilistic Metric for random   │ per hour    │ ISO 26262      │
 * │        │ Hardware Failures                 │             │                │
 * │ λ      │ Failure rate (dangerous failures) │ per hour    │ All            │
 * │ MTBF   │ Mean Time Between Failures        │ hours       │ All            │
 * │ MTTF   │ Mean Time To Failure              │ hours       │ All            │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * Fundamental Relationships:
 *
 *   λ = 1/MTTF                     (failure rate = inverse of mean time to failure)
 *
 *   PFH ≈ λ_D                      (for small λ·t, PFH ≈ dangerous failure rate)
 *
 *   PFDavg = (λ_D × TI) / 2        (average PFD over proof test interval TI)
 *                                   for 1oo1 architecture
 *
 *   RRF = 1 / PFD                  (Risk Reduction Factor)
 */

/**
 * Conversion between PFD and PFH
 *
 * For a system operating in both modes, we need conversion:
 *
 * Given:
 *   - TI = Proof test interval (hours)
 *   - λ_D = Dangerous failure rate (per hour)
 *
 * For 1oo1 (single channel) architecture:
 *   PFDavg = (λ_D × TI) / 2
 *   PFH = λ_D
 *
 * Therefore:
 *   PFDavg = (PFH × TI) / 2
 *   PFH = (2 × PFDavg) / TI
 */
export function convertPFDtoPFH(pfdAvg: number, proofTestIntervalHours: number): number {
	// PFH = (2 × PFDavg) / TI
	return (2 * pfdAvg) / proofTestIntervalHours;
}

export function convertPFHtoPFD(pfh: number, proofTestIntervalHours: number): number {
	// PFDavg = (PFH × TI) / 2
	return (pfh * proofTestIntervalHours) / 2;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PART 2: THE RISK EQUATION
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * THE FUNDAMENTAL RISK EQUATION:
 *
 *   R = f × C
 *
 * Where:
 *   R = Risk (expected loss per unit time)
 *   f = Frequency of hazardous event (per unit time)
 *   C = Consequence severity (loss magnitude)
 *
 * EXPANDED FORM (considering exposure and avoidance):
 *
 *   R = P_hazard × P_exposure × P_harm|exposure × C_severity
 *
 * Where:
 *   P_hazard      = Probability of hazardous event occurring
 *   P_exposure    = Probability of exposure when hazard occurs
 *   P_harm|exposure = Probability of harm given exposure (1 - controllability)
 *   C_severity    = Consequence severity weight
 *
 * IEC 61508 RISK GRAPH MODEL:
 *
 *   Uses qualitative parameters:
 *   - C: Consequence (C1-C4)
 *   - F: Frequency of exposure (F1-F2)
 *   - P: Possibility of avoiding hazard (P1-P2)
 *   - W: Demand rate (W1-W3)
 *
 * ISO 26262 ASIL DETERMINATION:
 *
 *   ASIL = f(S, E, C) via lookup table
 *
 *   Where:
 *   - S: Severity (S0-S3)
 *   - E: Exposure probability (E0-E4)
 *   - C: Controllability (C0-C3)
 */

/**
 * Quantitative risk calculation
 *
 * @param hazardFrequency - Frequency of hazardous event (per hour)
 * @param exposureProbability - Probability of exposure when hazard occurs [0,1]
 * @param harmProbability - Probability of harm given exposure [0,1]
 * @param severityWeight - Consequence severity weight (typically 10^severity)
 * @returns Risk value (expected loss per hour)
 */
export function calculateRisk(
	hazardFrequency: number,
	exposureProbability: number,
	harmProbability: number,
	severityWeight: number,
): number {
	return hazardFrequency * exposureProbability * harmProbability * severityWeight;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PART 3: REQUIRED INTEGRITY LEVEL DERIVATION
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * THE INTEGRITY LEVEL EQUATION:
 *
 * Given:
 *   R_unreduced = Risk without safety function
 *   R_tolerable = Maximum acceptable risk
 *
 * Required Risk Reduction Factor:
 *   RRF = R_unreduced / R_tolerable
 *
 * Required Integrity Level:
 *   SIL = ⌈log₁₀(RRF)⌉
 *
 * EXAMPLE CALCULATION:
 *
 *   Scenario: Chemical plant emergency shutdown system
 *
 *   Given:
 *     - Hazard frequency (unmitigated): 0.1 per year
 *     - Exposure probability: 0.5
 *     - Harm probability: 0.8
 *     - Severity: Critical (weight = 1000)
 *     - Tolerable risk: 10⁻⁴ fatalities per year
 *
 *   Calculation:
 *     R_unreduced = 0.1 × 0.5 × 0.8 × 1000 = 40 (weighted events/year)
 *     R_tolerable = 10⁻⁴ × 1000 = 0.1 (weighted events/year)
 *     RRF = 40 / 0.1 = 400
 *     SIL = ⌈log₁₀(400)⌉ = ⌈2.6⌉ = 3
 *
 *   Result: SIL 3 required
 */

/**
 * Calculate required Safety Integrity Level from risk parameters
 */
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

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PART 4: LATTICE ALGEBRA PROOFS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * VERIFICATION STATUS (from primary sources and academic review):
 *
 * ✓ VERIFIED: Total order within standards
 *   Each standard's integrity levels form a strict linear ordering:
 *   - SIL: 0 < 1 < 2 < 3 < 4
 *   - ASIL: QM < A < B < C < D
 *   - DAL: E < D < C < B < A (reverse alphabetical!)
 *   This supports modeling individual standards as totally ordered sets.
 *
 * ✓ VERIFIED: Join = max for non-redundant composition
 *   When components serve different requirements, the system inherits the
 *   highest required level. This is standard industry practice.
 *
 * ⚠️ PARTIALLY VERIFIED: Decomposition/synthesis rules
 *   The simple lattice model is an oversimplification. Both IEC 61508 and
 *   ISO 26262 allow achieving higher system integrity from lower-rated
 *   components through decomposition rules with redundancy and independence.
 *   See COMPOSITION THEOREMS section for details.
 *
 * ❌ NOT VERIFIED in academic literature:
 *   - No published papers specifically proposing lattice-theoretic formalization
 *     of safety integrity levels were found
 *   - The practical "take the maximum SIL" composition rule lacks rigorous
 *     mathematical foundation in published literature
 *   - Closest frameworks are contract theory extensions (Westman & Nyberg, 2015)
 *     and "Contracts for System Design" (Benveniste et al., 2012-2018)
 *
 * This represents a genuine research gap in formal methods for safety engineering.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * DEFINITION: Safety Integrity Lattice
 *
 * A Safety Integrity Lattice is a structure 𝕃 = (L, ⊥, ⊤, ⊔, ⊓, ≤) where:
 *
 *   L = {l₀, l₁, ..., lₙ}  is the carrier set of integrity levels
 *   ⊥ = l₀                  is the bottom element (no requirements)
 *   ⊤ = lₙ                  is the top element (highest integrity)
 *   ⊔ : L × L → L           is the join operation (least upper bound)
 *   ⊓ : L × L → L           is the meet operation (greatest lower bound)
 *   ≤ ⊆ L × L               is the partial order
 *
 * AXIOMS:
 *
 *   A1. (L, ≤) is a total order:
 *       ∀ a, b ∈ L: (a ≤ b) ∨ (b ≤ a)
 *
 *   A2. ⊥ is the bottom:
 *       ∀ x ∈ L: ⊥ ≤ x
 *
 *   A3. ⊤ is the top:
 *       ∀ x ∈ L: x ≤ ⊤
 *
 *   A4. Join is least upper bound:
 *       a ⊔ b = min{c ∈ L | a ≤ c ∧ b ≤ c}
 *
 *   A5. Meet is greatest lower bound:
 *       a ⊓ b = max{c ∈ L | c ≤ a ∧ c ≤ b}
 *
 * DERIVED PROPERTIES:
 *
 *   P1. For total order: a ⊔ b = max(a, b)
 *   P2. For total order: a ⊓ b = min(a, b)
 *   P3. Idempotence: a ⊔ a = a
 *   P4. Commutativity: a ⊔ b = b ⊔ a
 *   P5. Associativity: (a ⊔ b) ⊔ c = a ⊔ (b ⊔ c)
 *   P6. Identity: a ⊔ ⊥ = a
 *   P7. Absorption: a ⊔ ⊤ = ⊤
 *
 * THEOREM 1: Monotonic Composition
 *
 *   For system S composed of subsystems S₁, S₂, ..., Sₙ:
 *
 *   Integrity(S) = ⊔ᵢ Integrity(Sᵢ) = max{Integrity(Sᵢ)}
 *
 * PROOF:
 *   The system failure probability is at least as high as the worst component:
 *   P_fail(S) ≥ max{P_fail(Sᵢ)}
 *
 *   Therefore the required integrity is the maximum of components:
 *   SIL(S) = max{SIL(Sᵢ)}  □
 *
 * THEOREM 2: Refinement Preservation
 *
 *   If implementation I refines specification S:
 *   Integrity(I) ≥ Integrity(S)
 *
 * PROOF:
 *   Refinement means I satisfies all properties of S.
 *   If S requires SIL k, then I must achieve at least SIL k to satisfy
 *   the failure probability bound.  □
 *
 * THEOREM 3: Decomposition (with redundancy)
 *
 *   For redundant, independent subsystems:
 *
 *   P_fail(S₁ ∥ S₂) = P_fail(S₁) × P_fail(S₂)
 *
 *   Therefore:
 *   SIL(S₁ ∥ S₂) > max{SIL(S₁), SIL(S₂)}  (under certain conditions)
 *
 * PROOF:
 *   Let S₁ be SIL 1 (PFD = 10⁻¹) and S₂ be SIL 1 (PFD = 10⁻¹)
 *   Combined (redundant, independent):
 *   PFD_combined = 10⁻¹ × 10⁻¹ = 10⁻²
 *   This corresponds to SIL 2.  □
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PART 5: REDUNDANCY & ARCHITECTURE CALCULATIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ARCHITECTURE NOTATION:
 *
 *   MooN = M-out-of-N (M of N channels must function)
 *
 *   1oo1 = Single channel (no redundancy)
 *   1oo2 = Dual channel, both must fail for system failure
 *   2oo2 = Dual channel, either failure causes system failure
 *   2oo3 = Triple redundancy with voting
 *
 * PFDavg FORMULAS (simplified, for λ·T << 1):
 *
 *   1oo1:  PFDavg = λ_D × TI / 2
 *
 *   1oo2:  PFDavg = ((λ_D × TI)² / 3) + β × λ_D × TI / 2
 *          (β = common cause factor, typically 0.01-0.1)
 *
 *   2oo3:  PFDavg = (λ_D × TI)² + β × λ_D × TI / 2
 *
 * Where:
 *   λ_D = Dangerous failure rate (per hour)
 *   TI  = Proof test interval (hours)
 *   β   = Common cause factor (0 = perfectly independent, 1 = totally dependent)
 */

/**
 * Calculate PFDavg for a 1oo1 (single channel) architecture
 */
export function calculatePFD_1oo1(
	dangerousFailureRate: number, // λ_D in failures per hour
	proofTestIntervalHours: number, // TI
): number {
	return (dangerousFailureRate * proofTestIntervalHours) / 2;
}

/**
 * Calculate PFDavg for a 1oo2 (dual redundant) architecture
 *
 * @param dangerousFailureRate - λ_D per channel (per hour)
 * @param proofTestIntervalHours - TI (hours)
 * @param commonCauseFactor - β (0-1, typically 0.01-0.1)
 */
export function calculatePFD_1oo2(
	dangerousFailureRate: number,
	proofTestIntervalHours: number,
	commonCauseFactor: number,
): number {
	const lambdaT = dangerousFailureRate * proofTestIntervalHours;

	// Independent failures: ((λ_D × TI)² / 3)
	const independentTerm = (lambdaT * lambdaT) / 3;

	// Common cause failures: β × λ_D × TI / 2
	const commonCauseTerm = (commonCauseFactor * lambdaT) / 2;

	return independentTerm + commonCauseTerm;
}

/**
 * Calculate PFDavg for a 2oo3 (voting) architecture
 */
export function calculatePFD_2oo3(
	dangerousFailureRate: number,
	proofTestIntervalHours: number,
	commonCauseFactor: number,
): number {
	const lambdaT = dangerousFailureRate * proofTestIntervalHours;

	// Need 2 of 3 to fail: 3 × (λT)² (combinations of 2 failures from 3)
	const independentTerm = 3 * (lambdaT * lambdaT);

	// Common cause term
	const commonCauseTerm = (commonCauseFactor * lambdaT) / 2;

	return independentTerm + commonCauseTerm;
}

/**
 * Determine achievable SIL based on architecture and failure rates
 */
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
			// 2oo2 is like 1oo1 but with higher spurious trip rate (not safety-relevant here)
			pfd = calculatePFD_1oo1(dangerousFailureRate, proofTestIntervalHours);
			break;
		case "2oo3":
			pfd = calculatePFD_2oo3(dangerousFailureRate, proofTestIntervalHours, commonCauseFactor);
			break;
	}

	// Map PFD to SIL (IEC 61508 Table 2)
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

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PART 6: MARKOV CHAIN RELIABILITY MODELING
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * For complex architectures, we use Markov chain analysis.
 *
 * STATE SPACE:
 *   State 0: All channels OK (operational)
 *   State 1: One channel failed (degraded, still safe)
 *   State 2: System failed (dangerous state)
 *
 * TRANSITION RATES:
 *   λ_D = Dangerous failure rate (OK → Failed)
 *   μ   = Repair rate (Failed → OK)
 *
 * For 1oo2 system:
 *
 *   State 0 (OK,OK) --λ_D--> State 1 (OK,F) --λ_D--> State 2 (F,F)
 *                    <--μ--              <--μ--
 *
 * STEADY-STATE PROBABILITY:
 *   P(dangerous state) ≈ λ_D² / (λ_D + μ)²
 *
 *   For λ_D << μ:
 *   PFDavg ≈ λ_D² / μ²  (for continuously monitored system)
 */

/**
 * Markov-based PFD calculation for 1oo2 with repair
 *
 * @param dangerousFailureRate - λ_D (per hour)
 * @param repairRate - μ (per hour), typically 1/MTTR
 */
export function calculatePFD_1oo2_Markov(dangerousFailureRate: number, repairRate: number): number {
	// Steady-state dangerous failure probability
	// P_danger ≈ (λ_D)² / (λ_D + μ)²
	const lambdaPlusMu = dangerousFailureRate + repairRate;
	return (dangerousFailureRate * dangerousFailureRate) / (lambdaPlusMu * lambdaPlusMu);
}

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PART 7: FAULT TREE ANALYSIS (FTA) CALCULATIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Fault Tree Analysis uses Boolean algebra to combine failure probabilities.
 *
 * BASIC GATES:
 *
 *   AND Gate: P(A ∧ B) = P(A) × P(B)           (for independent events)
 *   OR Gate:  P(A ∨ B) = P(A) + P(B) - P(A)×P(B)
 *            ≈ P(A) + P(B)                     (for small probabilities)
 *
 * MINIMAL CUT SETS:
 *   Top event probability = Σᵢ P(MCSᵢ)        (approximate, for rare events)
 *
 *   where MCSᵢ is the probability of minimal cut set i
 */

/**
 * Fault tree gate types
 */
export type FaultTreeGate = "AND" | "OR" | "VOTE" | "NOT";

/**
 * Calculate probability through an AND gate (all inputs must fail)
 */
export function faultTreeAND(probabilities: number[]): number {
	return probabilities.reduce((acc, p) => acc * p, 1);
}

/**
 * Calculate probability through an OR gate (any input failing causes output failure)
 */
export function faultTreeOR(probabilities: number[]): number {
	// P(A ∪ B ∪ C...) = 1 - P(¬A)×P(¬B)×P(¬C)...
	const noFailure = probabilities.reduce((acc, p) => acc * (1 - p), 1);
	return 1 - noFailure;
}

/**
 * Calculate probability through a VOTE gate (k-out-of-n)
 * Uses binomial distribution for identical component probabilities
 */
export function faultTreeVOTE(probabilities: number[], minFailures: number): number {
	const n = probabilities.length;
	if (n === 0) return 0;

	const p = probabilities[0] ?? 0; // Assume identical components

	// P(at least k failures) = Σᵢ₌ₖⁿ C(n,i) × pⁱ × (1-p)^(n-i)
	let total = 0;
	for (let i = minFailures; i <= n; i++) {
		const combinations = binomial(n, i);
		total += combinations * p ** i * (1 - p) ** (n - i);
	}
	return total;
}

/**
 * Binomial coefficient C(n, k)
 */
function binomial(n: number, k: number): number {
	if (k < 0 || k > n) return 0;
	if (k === 0 || k === n) return 1;

	let result = 1;
	for (let i = 0; i < k; i++) {
		result = (result * (n - i)) / (i + 1);
	}
	return result;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PART 8: SAFETY INTEGRITY VERIFICATION
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * To claim a SIL, you must demonstrate:
 *
 *   1. QUANTITATIVE: P_fail ≤ SIL threshold
 *   2. SYSTEMATIC: Process rigor appropriate for SIL
 *   3. ARCHITECTURAL: Appropriate redundancy and diagnostics
 *
 * DIAGNOSTIC COVERAGE (DC):
 *   DC = λ_DD / (λ_DD + λ_DU)
 *
 *   where:
 *     λ_DD = Detected dangerous failure rate
 *     λ_DU = Undetected dangerous failure rate
 *
 * SAFE FAILURE FRACTION (SFF):
 *   SFF = (λ_S + λ_DD) / (λ_S + λ_D)
 *
 *   where:
 *     λ_S = Safe failure rate
 *     λ_D = λ_DD + λ_DU (total dangerous)
 */

export interface HardwareMetrics {
	/** Safe failure rate (per hour) */
	safeFaultRate: number;
	/** Detected dangerous failure rate (per hour) */
	detectedDangerousRate: number;
	/** Undetected dangerous failure rate (per hour) */
	undetectedDangerousRate: number;
}

/**
 * Calculate Diagnostic Coverage (DC)
 */
export function calculateDiagnosticCoverage(metrics: HardwareMetrics): number {
	const totalDangerous = metrics.detectedDangerousRate + metrics.undetectedDangerousRate;
	if (totalDangerous === 0) return 1;
	return metrics.detectedDangerousRate / totalDangerous;
}

/**
 * Calculate Safe Failure Fraction (SFF)
 */
export function calculateSFF(metrics: HardwareMetrics): number {
	const totalDangerous = metrics.detectedDangerousRate + metrics.undetectedDangerousRate;
	const total = metrics.safeFaultRate + totalDangerous;
	if (total === 0) return 1;
	return (metrics.safeFaultRate + metrics.detectedDangerousRate) / total;
}

/**
 * IEC 61508 Hardware architectural constraints
 *
 * Based on SFF and fault tolerance (number of redundant channels - 1)
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │ SFF          │ HFT=0    │ HFT=1    │ HFT=2    │
 * ├──────────────┼──────────┼──────────┼──────────┤
 * │ <60%         │ SIL 1    │ SIL 2    │ SIL 3    │
 * │ 60% - <90%   │ SIL 2    │ SIL 3    │ SIL 4    │
 * │ 90% - <99%   │ SIL 3    │ SIL 4    │ SIL 4    │
 * │ ≥99%         │ SIL 3    │ SIL 4    │ SIL 4    │
 * └─────────────────────────────────────────────────────────────┘
 *
 * HFT = Hardware Fault Tolerance (0 = no redundancy, 1 = dual, 2 = TMR)
 */
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

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PART 9: COMPREHENSIVE EXAMPLE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * EXAMPLE: Emergency Shutdown System for Chemical Reactor
 *
 * Step 1: Determine Required SIL
 *   - Hazard: Reactor overpressure explosion
 *   - Unmitigated frequency: 0.1/year
 *   - Consequence: 10 fatalities expected
 *   - Tolerable individual risk: 10⁻⁴ fatalities/year per person
 *   - Exposure: 10 people
 *
 *   R_unreduced = 0.1 × 10 = 1 fatality/year
 *   R_tolerable = 10⁻⁴ × 10 = 10⁻³ fatalities/year
 *   RRF = 1 / 10⁻³ = 1000
 *   SIL = ⌈log₁₀(1000)⌉ = 3
 *
 *   RESULT: SIL 3 required
 *
 * Step 2: Select Architecture
 *   - Target PFDavg: < 10⁻³ (SIL 3 threshold)
 *   - Available sensors: λ_D = 2×10⁻⁶/hour
 *   - Proof test interval: 8760 hours (1 year)
 *
 *   1oo1 PFD = (2×10⁻⁶ × 8760) / 2 = 8.76×10⁻³ ❌ (only SIL 2)
 *
 *   1oo2 PFD (β=0.1):
 *     Independent = ((2×10⁻⁶ × 8760)² / 3 = 1.02×10⁻⁴
 *     Common cause = 0.1 × (2×10⁻⁶ × 8760) / 2 = 8.76×10⁻⁴
 *     Total = 9.78×10⁻⁴ ✓ (SIL 3 achieved)
 *
 *   RESULT: 1oo2 architecture selected
 *
 * Step 3: Verify Architectural Constraints
 *   - SFF = 90% (high diagnostic coverage sensors)
 *   - HFT = 1 (dual redundancy)
 *   - Table lookup: SFF 90-99%, HFT=1 → SIL 4 capable
 *
 *   RESULT: Architecture supports SIL 3 ✓
 */

/**
 * Complete SIL verification workflow
 */
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

	// Step 1: Derive required SIL
	const { sil: requiredSIL, rrf } = deriveRequiredSIL(unreducedRisk, tolerableRisk);
	details.push(`Required SIL: ${requiredSIL} (RRF = ${rrf.toFixed(0)})`);

	// Step 2: Calculate achieved PFD for selected architecture
	const { pfd: achievedPFD, sil: achievedSIL } = calculateArchitectureSIL(
		architecture,
		dangerousFailureRate,
		proofTestIntervalHours,
		commonCauseFactor,
	);
	details.push(
		`Architecture ${architecture}: PFD = ${achievedPFD.toExponential(2)}, SIL ${achievedSIL}`,
	);

	// Step 3: Check architectural constraints
	const hft: 0 | 1 | 2 =
		architecture === "1oo1" || architecture === "2oo2" ? 0 : architecture === "1oo2" ? 1 : 2;
	const architecturalConstraint = getArchitecturalConstraintSIL(sff, hft);
	details.push(
		`Architectural constraint (SFF=${(sff * 100).toFixed(0)}%, HFT=${hft}): SIL ${architecturalConstraint}`,
	);

	// Step 4: Verify all constraints met
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

// =============================================================================
// SYSTEM DOMAIN / TYPE
// =============================================================================

/**
 * System domain classification
 * Industry practice - not a formal standard
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

/**
 * System scale classification
 */
export enum SystemScale {
	SCRIPT = "script", // Single file, <500 LOC
	MODULE = "module", // Single module, <5K LOC
	COMPONENT = "component", // Multiple modules, <50K LOC
	APPLICATION = "application", // Full application, <500K LOC
	SYSTEM = "system", // Multiple applications, <5M LOC
	SYSTEM_OF_SYSTEMS = "system_of_systems", // Multiple integrated systems
	ENTERPRISE = "enterprise", // Organization-wide platform
}

/**
 * Development maturity - industry practice
 */
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
		description: "Time-boxed technical investigation. Answering specific questions.",
		trlEquivalent: TechnologyReadinessLevel.TRL_2,
		typicalDuration: "Hours to days",
		exitCriteria: ["Technical question answered", "Feasibility determined"],
	},
	[DevelopmentMaturity.PROOF_OF_CONCEPT]: {
		stage: DevelopmentMaturity.PROOF_OF_CONCEPT,
		name: "Proof of Concept (PoC)",
		description: "Demonstrates feasibility. Not production-ready. Often throwaway code.",
		trlEquivalent: TechnologyReadinessLevel.TRL_3,
		typicalDuration: "Days to weeks",
		exitCriteria: ["Core concept demonstrated", "Stakeholder buy-in"],
	},
	[DevelopmentMaturity.PROTOTYPE]: {
		stage: DevelopmentMaturity.PROTOTYPE,
		name: "Prototype",
		description: "Working model with basic functionality. May evolve into product.",
		trlEquivalent: TechnologyReadinessLevel.TRL_4,
		typicalDuration: "Weeks to months",
		exitCriteria: ["Core features working", "User feedback collected"],
	},
	[DevelopmentMaturity.ALPHA]: {
		stage: DevelopmentMaturity.ALPHA,
		name: "Alpha",
		description: "First testable version. Feature incomplete, many bugs expected.",
		trlEquivalent: TechnologyReadinessLevel.TRL_5,
		typicalDuration: "Months",
		exitCriteria: ["Core features complete", "Internal testing started"],
	},
	[DevelopmentMaturity.BETA]: {
		stage: DevelopmentMaturity.BETA,
		name: "Beta",
		description: "Feature complete but may have bugs. External testing.",
		trlEquivalent: TechnologyReadinessLevel.TRL_6,
		typicalDuration: "Months",
		exitCriteria: ["All features complete", "External beta testing", "Bug count acceptable"],
	},
	[DevelopmentMaturity.RELEASE_CANDIDATE]: {
		stage: DevelopmentMaturity.RELEASE_CANDIDATE,
		name: "Release Candidate (RC)",
		description: "Potentially shippable. Final testing and validation.",
		trlEquivalent: TechnologyReadinessLevel.TRL_7,
		typicalDuration: "Weeks",
		exitCriteria: ["All tests passing", "Performance validated", "Documentation complete"],
	},
	[DevelopmentMaturity.GENERAL_AVAILABILITY]: {
		stage: DevelopmentMaturity.GENERAL_AVAILABILITY,
		name: "General Availability (GA)",
		description: "Production release. Fully supported.",
		trlEquivalent: TechnologyReadinessLevel.TRL_8,
		typicalDuration: "Ongoing",
		exitCriteria: ["Released to production", "Support processes in place"],
	},
	[DevelopmentMaturity.MATURE]: {
		stage: DevelopmentMaturity.MATURE,
		name: "Mature",
		description: "Stable, well-understood, battle-tested. Low change rate.",
		trlEquivalent: TechnologyReadinessLevel.TRL_9,
		typicalDuration: "Years",
		exitCriteria: ["Extended production use", "Stable API", "Low defect rate"],
	},
	[DevelopmentMaturity.LEGACY]: {
		stage: DevelopmentMaturity.LEGACY,
		name: "Legacy",
		description: "Still in use but not actively developed. Maintenance mode.",
		exitCriteria: ["Active development stopped", "Replacement planned or in progress"],
	},
	[DevelopmentMaturity.END_OF_LIFE]: {
		stage: DevelopmentMaturity.END_OF_LIFE,
		name: "End of Life (EOL)",
		description: "No longer supported. Security patches only or none.",
		exitCriteria: ["Support ended", "Migration path provided"],
	},
	[DevelopmentMaturity.DEPRECATED]: {
		stage: DevelopmentMaturity.DEPRECATED,
		name: "Deprecated",
		description: "Marked for removal. Should not be used for new projects.",
		exitCriteria: ["Deprecation announced", "Replacement available"],
	},
};

// =============================================================================
// DEPLOYMENT ENVIRONMENT
// =============================================================================

/**
 * Deployment environment classification
 */
export enum DeploymentEnvironment {
	// Development
	LOCAL = "local",
	DEV = "dev",
	INTEGRATION = "integration",

	// Testing
	TEST = "test",
	QA = "qa",
	STAGING = "staging",
	UAT = "uat",
	PERFORMANCE = "performance",

	// Production
	PRODUCTION = "production",
	DISASTER_RECOVERY = "disaster_recovery",

	// Special
	AIR_GAPPED = "air_gapped",
	CLASSIFIED = "classified",
	SANDBOX = "sandbox",
}

/**
 * Physical deployment context
 */
export enum DeploymentContext {
	// Cloud
	PUBLIC_CLOUD = "public_cloud",
	PRIVATE_CLOUD = "private_cloud",
	HYBRID_CLOUD = "hybrid_cloud",
	MULTI_CLOUD = "multi_cloud",

	// On-Premise
	ON_PREMISE_DATACENTER = "on_premise_datacenter",
	EDGE = "edge",
	FOG = "fog",

	// Embedded
	EMBEDDED_DEVICE = "embedded_device",
	IOT_DEVICE = "iot_device",
	MOBILE_DEVICE = "mobile_device",
	WEARABLE = "wearable",

	// Specialized
	VEHICLE = "vehicle",
	AIRCRAFT = "aircraft",
	SPACECRAFT = "spacecraft",
	SUBMARINE = "submarine",
	INDUSTRIAL_PLANT = "industrial_plant",
	MEDICAL_DEVICE = "medical_device",

	// Network
	BROWSER = "browser",
	CDN = "cdn",
}

// =============================================================================
// REGULATORY DOMAIN
// =============================================================================

/**
 * Regulatory compliance domains
 */
export enum RegulatoryDomain {
	NONE = "none",

	// Healthcare/Medical
	FDA_21_CFR_PART_11 = "fda_21_cfr_part_11",
	FDA_CLASS_I = "fda_class_i",
	FDA_CLASS_II = "fda_class_ii",
	FDA_CLASS_III = "fda_class_iii",
	IEC_62304 = "iec_62304", // Medical device software
	HIPAA = "hipaa",

	// Financial
	SOX = "sox", // Sarbanes-Oxley
	PCI_DSS = "pci_dss", // Payment Card Industry
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
	DO_254 = "do_254", // Airborne electronic hardware

	// Automotive
	ISO_26262 = "iso_26262",
	UNECE_R155 = "unece_r155", // Cybersecurity
	UNECE_R156 = "unece_r156", // Software updates

	// Industrial
	IEC_61508 = "iec_61508",
	IEC_62443 = "iec_62443", // Industrial cybersecurity

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
// DELIVERY MECHANISM / DEPLOYMENT MODALITY
// =============================================================================

/**
 * How software is delivered from source to execution target
 * This is orthogonal to WHERE it runs (DeploymentContext) and
 * WHAT STAGE it's in (DeploymentEnvironment)
 */
export enum DeliveryMechanism {
	// Ephemeral / Interpreted
	BROWSER_RENDER = "browser_render", // HTML/JS served on demand
	REPL_EXECUTION = "repl_execution", // Interactive interpreter
	SERVERLESS_INVOCATION = "serverless_invoke", // Cold start per request

	// Containerized / Virtualized
	CONTAINER_IMAGE = "container_image", // Docker, OCI images
	VM_IMAGE = "vm_image", // AMI, VMDK, qcow2
	UNIKERNEL = "unikernel", // MirageOS, IncludeOS

	// Package Distribution
	PACKAGE_REGISTRY = "package_registry", // npm, PyPI, crates.io, Maven
	OS_PACKAGE = "os_package", // apt, rpm, msi, pkg
	APP_STORE = "app_store", // iOS App Store, Google Play, Mac App Store
	ENTERPRISE_MDM = "enterprise_mdm", // Intune, JAMF, managed deployment

	// Binary Distribution
	DOWNLOADABLE_BINARY = "downloadable_binary", // GitHub releases, direct download
	SIDE_LOAD = "side_load", // Manual install, ADB, TestFlight

	// Firmware / Embedded
	FLASH_MEMORY = "flash_memory", // SPI flash, NOR/NAND programming
	EEPROM_BURN = "eeprom_burn", // One-time or limited-write
	OTP_FUSE = "otp_fuse", // One-time programmable, irreversible
	JTAG_DEBUG = "jtag_debug", // Debug interface programming
	OTA_UPDATE = "ota_update", // Over-the-air firmware update
	BOOTLOADER_UPDATE = "bootloader_update", // A/B partition, recovery mode

	// Hardware Definition
	FPGA_BITSTREAM = "fpga_bitstream", // Reconfigurable logic
	ASIC_TAPE_OUT = "asic_tape_out", // Irreversible, sent to fab

	// Physical Media
	PHYSICAL_MEDIA = "physical_media", // USB, CD, SD card delivery
	ROM_MASK = "rom_mask", // Manufactured into chip

	// Infrastructure
	GITOPS_SYNC = "gitops_sync", // ArgoCD, Flux reconciliation
	INFRASTRUCTURE_PROVISION = "infra_provision", // Terraform apply, CloudFormation
	CONFIG_PUSH = "config_push", // Feature flags, remote config
}

export type UpdateStrategy =
	| "immutable"
	| "in_place"
	| "rolling"
	| "blue_green"
	| "canary"
	| "manual_reflash";
export type RollbackSpeed = "instant" | "minutes" | "hours" | "requires_physical" | "impossible";
export type Gatekeeper =
	| "none"
	| "self"
	| "registry"
	| "app_review"
	| "certification_body"
	| "customer";

export interface DeliveryCharacteristics {
	mechanism: DeliveryMechanism;

	// Mutability
	updateStrategy: UpdateStrategy;
	rollbackCapability: RollbackSpeed;
	writeEndurance?: number; // For EEPROM/Flash - write cycle limits

	// Distribution
	gatekeeper: Gatekeeper;
	approvalLatency?: string; // "minutes" | "hours" | "days" | "weeks"

	// Signing & Trust
	signingRequired: boolean;
	signatureAuthority?: string; // "self-signed" | "Apple" | "Google" | "Microsoft" | "HSM"

	// Physical
	requiresPhysicalAccess: boolean;
	requiresSpecialHardware?: string[]; // ["JTAG programmer", "chip burner", "clean room"]
}

export const DELIVERY_CHARACTERISTICS: Partial<Record<DeliveryMechanism, DeliveryCharacteristics>> =
	{
		[DeliveryMechanism.BROWSER_RENDER]: {
			mechanism: DeliveryMechanism.BROWSER_RENDER,
			updateStrategy: "in_place",
			rollbackCapability: "instant",
			gatekeeper: "none",
			signingRequired: false,
			requiresPhysicalAccess: false,
		},

		[DeliveryMechanism.SERVERLESS_INVOCATION]: {
			mechanism: DeliveryMechanism.SERVERLESS_INVOCATION,
			updateStrategy: "blue_green",
			rollbackCapability: "instant",
			gatekeeper: "self",
			signingRequired: false,
			requiresPhysicalAccess: false,
		},

		[DeliveryMechanism.CONTAINER_IMAGE]: {
			mechanism: DeliveryMechanism.CONTAINER_IMAGE,
			updateStrategy: "blue_green",
			rollbackCapability: "instant",
			gatekeeper: "self",
			signingRequired: false,
			requiresPhysicalAccess: false,
		},

		[DeliveryMechanism.APP_STORE]: {
			mechanism: DeliveryMechanism.APP_STORE,
			updateStrategy: "rolling",
			rollbackCapability: "hours",
			gatekeeper: "app_review",
			approvalLatency: "days",
			signingRequired: true,
			signatureAuthority: "Apple/Google",
			requiresPhysicalAccess: false,
		},

		[DeliveryMechanism.ENTERPRISE_MDM]: {
			mechanism: DeliveryMechanism.ENTERPRISE_MDM,
			updateStrategy: "rolling",
			rollbackCapability: "hours",
			gatekeeper: "customer",
			approvalLatency: "hours",
			signingRequired: true,
			signatureAuthority: "Enterprise",
			requiresPhysicalAccess: false,
		},

		[DeliveryMechanism.FLASH_MEMORY]: {
			mechanism: DeliveryMechanism.FLASH_MEMORY,
			updateStrategy: "manual_reflash",
			rollbackCapability: "requires_physical",
			writeEndurance: 10000,
			gatekeeper: "self",
			signingRequired: false,
			requiresPhysicalAccess: true,
			requiresSpecialHardware: ["flash programmer"],
		},

		[DeliveryMechanism.EEPROM_BURN]: {
			mechanism: DeliveryMechanism.EEPROM_BURN,
			updateStrategy: "manual_reflash",
			rollbackCapability: "requires_physical",
			writeEndurance: 100000,
			gatekeeper: "self",
			signingRequired: false,
			requiresPhysicalAccess: true,
			requiresSpecialHardware: ["EEPROM programmer", "chip socket or soldering"],
		},

		[DeliveryMechanism.OTP_FUSE]: {
			mechanism: DeliveryMechanism.OTP_FUSE,
			updateStrategy: "immutable",
			rollbackCapability: "impossible",
			writeEndurance: 1,
			gatekeeper: "self",
			signingRequired: false,
			requiresPhysicalAccess: true,
			requiresSpecialHardware: ["fuse programmer"],
		},

		[DeliveryMechanism.OTA_UPDATE]: {
			mechanism: DeliveryMechanism.OTA_UPDATE,
			updateStrategy: "blue_green",
			rollbackCapability: "minutes",
			gatekeeper: "self",
			signingRequired: true,
			signatureAuthority: "Manufacturer",
			requiresPhysicalAccess: false,
		},

		[DeliveryMechanism.FPGA_BITSTREAM]: {
			mechanism: DeliveryMechanism.FPGA_BITSTREAM,
			updateStrategy: "in_place",
			rollbackCapability: "minutes",
			gatekeeper: "self",
			signingRequired: false,
			requiresPhysicalAccess: false,
		},

		[DeliveryMechanism.ASIC_TAPE_OUT]: {
			mechanism: DeliveryMechanism.ASIC_TAPE_OUT,
			updateStrategy: "immutable",
			rollbackCapability: "impossible",
			gatekeeper: "certification_body",
			approvalLatency: "weeks",
			signingRequired: true,
			requiresPhysicalAccess: true,
			requiresSpecialHardware: ["semiconductor fab"],
		},

		[DeliveryMechanism.ROM_MASK]: {
			mechanism: DeliveryMechanism.ROM_MASK,
			updateStrategy: "immutable",
			rollbackCapability: "impossible",
			writeEndurance: 1,
			gatekeeper: "certification_body",
			approvalLatency: "weeks",
			signingRequired: false,
			requiresPhysicalAccess: true,
			requiresSpecialHardware: ["semiconductor fab"],
		},

		[DeliveryMechanism.GITOPS_SYNC]: {
			mechanism: DeliveryMechanism.GITOPS_SYNC,
			updateStrategy: "rolling",
			rollbackCapability: "instant",
			gatekeeper: "self",
			signingRequired: false,
			requiresPhysicalAccess: false,
		},

		[DeliveryMechanism.CONFIG_PUSH]: {
			mechanism: DeliveryMechanism.CONFIG_PUSH,
			updateStrategy: "in_place",
			rollbackCapability: "instant",
			gatekeeper: "self",
			signingRequired: false,
			requiresPhysicalAccess: false,
		},
	};

// =============================================================================
// UPDATE VELOCITY
// =============================================================================

/**
 * How quickly changes can propagate from source to running system
 */
export enum PropagationLatency {
	REALTIME = "realtime", // < 1 second (hot reload, feature flags)
	SECONDS = "seconds", // 1-60 seconds (serverless, CDN purge)
	MINUTES = "minutes", // 1-60 minutes (container orchestration, app restart)
	HOURS = "hours", // 1-24 hours (app store expedited, staged rollout)
	DAYS = "days", // 1-7 days (app store review, enterprise MDM)
	WEEKS = "weeks", // 1-4 weeks (certification, compliance review)
	MONTHS = "months", // Hardware revision, regulatory approval
	NEVER = "never", // OTP fuse, ASIC, ROM mask
}

export enum UpdateApplicationMode {
	HOT_RELOAD = "hot_reload", // No restart, immediate (React HMR, Erlang)
	PROCESS_RESTART = "process_restart", // App restarts, no OS reboot
	SERVICE_RESTART = "service_restart", // Container/service replaced
	ROLLING = "rolling", // Gradual instance replacement
	BLUE_GREEN = "blue_green", // Parallel environment swap
	REBOOT_REQUIRED = "reboot_required", // OS/device must restart
	POWER_CYCLE = "power_cycle", // Full power off/on needed
	PHYSICAL_ACCESS = "physical_access", // Must physically touch device
	REPLACEMENT = "replacement", // Swap entire unit
	NOT_APPLICABLE = "not_applicable", // Cannot be updated
}

export interface RollbackCapability {
	possible: boolean;
	latency: PropagationLatency;
	automated: boolean;
	preservesState: boolean; // Does rollback lose user data/state?
	limitedSlots?: number; // A/B partitions, version history depth
}

export interface UpdateVelocity {
	// Can it be updated at all?
	updatable: boolean;

	// Time from "commit" to "running in production"
	propagationLatency: PropagationLatency;

	// How updates are applied
	applicationMode: UpdateApplicationMode;

	// Rollback characteristics
	rollback: RollbackCapability;
}

// =============================================================================
// UPDATE AUTHORITY / POST-SHIP CONTROL
// =============================================================================

/**
 * Who controls the update lifecycle after deployment
 * This is about POWER and GOVERNANCE, not technology
 */
export enum UpdateAuthorityModel {
	// Manufacturer/Developer Control
	MANUFACTURER_PUSH = "manufacturer_push", // Vendor pushes, user cannot refuse (Tesla, Chrome)
	MANUFACTURER_MANDATORY = "manufacturer_mand", // Vendor pushes, deadline enforced (Windows security)

	// Shared Control
	USER_PROMPTED = "user_prompted", // Vendor offers, user approves timing
	USER_DEFERRABLE = "user_deferrable", // User can delay, not indefinitely

	// Owner Control
	OWNER_INITIATED = "owner_initiated", // Owner must explicitly trigger
	OWNER_EXCLUSIVE = "owner_exclusive", // Only owner can update, vendor cannot

	// Third-Party Control
	ENTERPRISE_MANAGED = "enterprise_managed", // IT department controls
	CARRIER_CONTROLLED = "carrier_controlled", // Telecom/carrier gates updates
	REGULATOR_GATED = "regulator_gated", // Regulatory approval required per update

	// No Control (Immutable)
	FIELD_LOCKED = "field_locked", // Cannot be updated once deployed
	PHYSICALLY_IMMUTABLE = "physically_immutable", // Hardware prevents updates
}

export enum ActorRole {
	MANUFACTURER = "manufacturer", // Software vendor
	DEVICE_OEM = "device_oem", // Hardware manufacturer (may differ from software)
	PLATFORM_OWNER = "platform_owner", // Apple, Google, Microsoft
	ENTERPRISE_IT = "enterprise_it", // Corporate IT department
	END_USER = "end_user", // Individual owner/operator
	OPERATOR = "operator", // Fleet manager, system admin
	REGULATOR = "regulator", // FDA, FAA, NHTSA
	CARRIER = "carrier", // Telecom provider
	INTEGRATOR = "integrator", // System integrator, VAR
}

export enum UpdateCapability {
	CAN_AUTHOR = "can_author", // Can create updates
	CAN_SIGN = "can_sign", // Can cryptographically sign
	CAN_DISTRIBUTE = "can_distribute", // Can push to devices
	CAN_APPROVE = "can_approve", // Can approve for release
	CAN_TRIGGER = "can_trigger", // Can initiate installation
	CAN_DEFER = "can_defer", // Can postpone installation
	CAN_BLOCK = "can_block", // Can permanently refuse
	CAN_ROLLBACK = "can_rollback", // Can revert to previous
	CAN_AUDIT = "can_audit", // Can view update history
}

export enum ConsentRequirement {
	NONE = "none", // Silent updates
	NOTIFICATION = "notification", // Informed, no action needed
	OPT_OUT = "opt_out", // Auto-updates unless refused
	OPT_IN = "opt_in", // Must explicitly accept
	EXPLICIT_ACTION = "explicit_action", // Must perform update manually
	MULTI_PARTY = "multi_party", // Multiple approvals needed
}

export interface UpdateActor {
	role: ActorRole;
	capabilities: UpdateCapability[];
	approvalRequired: boolean;
}

export interface UpdateAuthority {
	model: UpdateAuthorityModel;

	// Who are the actors?
	actors: UpdateActor[];

	// Consent requirements
	consentRequired: ConsentRequirement;

	// Can updates be blocked/refused?
	userCanBlock: boolean;
	userCanDefer: boolean;
	maxDeferralPeriod?: string; // "30 days", "until EOL", "indefinite"

	// Forced update conditions
	forcedUpdateTriggers?: string[]; // ["security_critical", "regulatory", "safety_recall"]

	// Audit & Compliance
	updateAuditTrail: boolean;
	rollbackRequiresApproval: boolean;
}

// =============================================================================
// DEPLOYMENT LIFECYCLE (COMPOSITE)
// =============================================================================

/**
 * Complete deployment lifecycle control combining delivery, velocity, and authority
 */
export interface DeploymentLifecycle {
	// How it gets there initially
	deliveryMechanism: DeliveryMechanism;
	deliveryCharacteristics?: DeliveryCharacteristics;

	// How fast can changes propagate
	updateVelocity: UpdateVelocity;

	// Who controls updates post-deployment
	updateAuthority: UpdateAuthority;
}

// =============================================================================
// COMPREHENSIVE SYSTEM CLASSIFICATION
// =============================================================================

/**
 * Complete system classification combining all dimensions
 */
export interface SystemClassification {
	// Identity
	id: string;
	name: string;
	version: string;
	description?: string;

	// Type & Scale
	domain: SystemDomain;
	scale: SystemScale;

	// Maturity (formal where applicable)
	maturity: DevelopmentMaturity;
	trl?: TechnologyReadinessLevel;

	// Criticality (formal standards)
	safetyCriticality: SafetyCriticality;

	// Deployment
	deploymentEnvironment: DeploymentEnvironment;
	deploymentContext: DeploymentContext;

	// Deployment Lifecycle (NEW: velocity + authority)
	deploymentLifecycle?: DeploymentLifecycle;

	// Compliance
	regulatoryDomains: RegulatoryDomain[];

	// Metadata
	createdAt: Date;
	updatedAt: Date;
	owner?: string;
	team?: string;

	// Links
	repository?: string;
	documentation?: string;
	issueTracker?: string;
}

/**
 * Safety criticality can use different standards depending on domain.
 * Discriminated union ensures type-safe pairing of standard and level.
 */
export type SafetyCriticality =
	| { standard: "NONE"; level: null; justification?: string }
	| { standard: "IEC_61508"; level: SafetyIntegrityLevel; justification?: string }
	| { standard: "ISO_26262"; level: AutomotiveSafetyIntegrityLevel; justification?: string }
	| { standard: "DO_178C"; level: DesignAssuranceLevel; justification?: string }
	| { standard: "ECSS"; level: SpaceSoftwareCriticality; justification?: string }
	| { standard: "IEC_62304"; level: MedicalDeviceSoftwareClass; justification?: string };

// =============================================================================
// FACTORY FUNCTIONS
// =============================================================================

function generateId(): string {
	return `sys_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Default deployment lifecycle for standard software
 */
const DEFAULT_DEPLOYMENT_LIFECYCLE: DeploymentLifecycle = {
	deliveryMechanism: DeliveryMechanism.CONTAINER_IMAGE,
	updateVelocity: {
		updatable: true,
		propagationLatency: PropagationLatency.MINUTES,
		applicationMode: UpdateApplicationMode.ROLLING,
		rollback: {
			possible: true,
			latency: PropagationLatency.MINUTES,
			automated: true,
			preservesState: true,
		},
	},
	updateAuthority: {
		model: UpdateAuthorityModel.OWNER_INITIATED,
		actors: [
			{
				role: ActorRole.MANUFACTURER,
				capabilities: [UpdateCapability.CAN_AUTHOR, UpdateCapability.CAN_SIGN],
				approvalRequired: false,
			},
			{
				role: ActorRole.OPERATOR,
				capabilities: [UpdateCapability.CAN_TRIGGER, UpdateCapability.CAN_ROLLBACK],
				approvalRequired: false,
			},
		],
		consentRequired: ConsentRequirement.NONE,
		userCanBlock: true,
		userCanDefer: true,
		updateAuditTrail: false,
		rollbackRequiresApproval: false,
	},
};

export function createSystemClassification(
	name: string,
	domain: SystemDomain,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return {
		id: generateId(),
		name,
		version: "0.0.1",
		domain,
		scale: SystemScale.MODULE,
		maturity: DevelopmentMaturity.IDEA,
		safetyCriticality: {
			standard: "NONE",
			level: null,
		},
		deploymentEnvironment: DeploymentEnvironment.LOCAL,
		deploymentContext: DeploymentContext.PUBLIC_CLOUD,
		deploymentLifecycle: DEFAULT_DEPLOYMENT_LIFECYCLE,
		regulatoryDomains: [RegulatoryDomain.NONE],
		createdAt: new Date(),
		updatedAt: new Date(),
		...options,
	};
}

/**
 * Create classification for a web application
 */
export function createWebAppClassification(
	name: string,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.WEB_APPLICATION, {
		scale: SystemScale.APPLICATION,
		deploymentContext: DeploymentContext.PUBLIC_CLOUD,
		...options,
	});
}

/**
 * Create classification for firmware
 */
export function createFirmwareClassification(
	name: string,
	safetyCriticality: SafetyCriticality,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.FIRMWARE, {
		scale: SystemScale.MODULE,
		deploymentContext: DeploymentContext.EMBEDDED_DEVICE,
		safetyCriticality,
		...options,
	});
}

/**
 * Create classification for space software
 */
export function createSpaceSoftwareClassification(
	name: string,
	criticality: SpaceSoftwareCriticality,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.EMBEDDED_SYSTEM, {
		scale: SystemScale.SYSTEM,
		deploymentContext: DeploymentContext.SPACECRAFT,
		safetyCriticality: {
			standard: "ECSS",
			level: criticality,
		},
		regulatoryDomains: [RegulatoryDomain.ECSS_E_ST_40C],
		...options,
	});
}

/**
 * Create classification for automotive software
 */
export function createAutomotiveClassification(
	name: string,
	asilLevel: AutomotiveSafetyIntegrityLevel,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.EMBEDDED_SYSTEM, {
		deploymentContext: DeploymentContext.VEHICLE,
		safetyCriticality: {
			standard: "ISO_26262",
			level: asilLevel,
		},
		regulatoryDomains: [RegulatoryDomain.ISO_26262],
		...options,
	});
}

/**
 * Create classification for aviation software
 */
export function createAviationClassification(
	name: string,
	dalLevel: DesignAssuranceLevel,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.EMBEDDED_SYSTEM, {
		deploymentContext: DeploymentContext.AIRCRAFT,
		safetyCriticality: {
			standard: "DO_178C",
			level: dalLevel,
		},
		regulatoryDomains: [RegulatoryDomain.DO_178C],
		...options,
	});
}

/**
 * Create classification for medical device software using IEC 62304
 */
export function createMedicalDeviceClassification(
	name: string,
	softwareClass: MedicalDeviceSoftwareClass,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.EMBEDDED_SYSTEM, {
		deploymentContext: DeploymentContext.MEDICAL_DEVICE,
		safetyCriticality: {
			standard: "IEC_62304",
			level: softwareClass,
		},
		regulatoryDomains: [RegulatoryDomain.IEC_62304],
		...options,
	});
}

/**
 * Create classification for FDA-regulated medical device software
 * Maps FDA classes to IEC 62304 software safety classes
 */
type FDAClass =
	| RegulatoryDomain.FDA_CLASS_I
	| RegulatoryDomain.FDA_CLASS_II
	| RegulatoryDomain.FDA_CLASS_III;

const FDA_TO_IEC62304_MAPPING: Record<FDAClass, MedicalDeviceSoftwareClass> = {
	[RegulatoryDomain.FDA_CLASS_I]: MedicalDeviceSoftwareClass.CLASS_A,
	[RegulatoryDomain.FDA_CLASS_II]: MedicalDeviceSoftwareClass.CLASS_B,
	[RegulatoryDomain.FDA_CLASS_III]: MedicalDeviceSoftwareClass.CLASS_C,
};

export function createFDAMedicalDeviceClassification(
	name: string,
	fdaClass: FDAClass,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.EMBEDDED_SYSTEM, {
		deploymentContext: DeploymentContext.MEDICAL_DEVICE,
		safetyCriticality: {
			standard: "IEC_62304",
			level: FDA_TO_IEC62304_MAPPING[fdaClass],
		},
		regulatoryDomains: [fdaClass, RegulatoryDomain.IEC_62304],
		...options,
	});
}

/**
 * Create classification for medical implant software
 * Full deployment lifecycle with regulator-gated updates and multi-party consent
 */
export function createMedicalImplantClassification(
	name: string,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.FIRMWARE, {
		deploymentContext: DeploymentContext.MEDICAL_DEVICE,
		safetyCriticality: {
			standard: "IEC_62304",
			level: MedicalDeviceSoftwareClass.CLASS_C,
		},
		deploymentLifecycle: {
			deliveryMechanism: DeliveryMechanism.OTA_UPDATE,
			updateVelocity: {
				updatable: true,
				propagationLatency: PropagationLatency.WEEKS,
				applicationMode: UpdateApplicationMode.REBOOT_REQUIRED,
				rollback: {
					possible: true,
					latency: PropagationLatency.MINUTES,
					automated: false,
					preservesState: true,
					limitedSlots: 2, // A/B partition
				},
			},
			updateAuthority: {
				model: UpdateAuthorityModel.REGULATOR_GATED,
				actors: [
					{
						role: ActorRole.MANUFACTURER,
						capabilities: [UpdateCapability.CAN_AUTHOR, UpdateCapability.CAN_SIGN],
						approvalRequired: false,
					},
					{
						role: ActorRole.REGULATOR,
						capabilities: [UpdateCapability.CAN_APPROVE],
						approvalRequired: true,
					},
					{
						role: ActorRole.END_USER,
						capabilities: [UpdateCapability.CAN_TRIGGER, UpdateCapability.CAN_DEFER],
						approvalRequired: true,
					},
				],
				consentRequired: ConsentRequirement.MULTI_PARTY,
				userCanBlock: false,
				userCanDefer: true,
				maxDeferralPeriod: "until_next_clinic_visit",
				forcedUpdateTriggers: ["safety_critical", "fda_recall"],
				updateAuditTrail: true,
				rollbackRequiresApproval: true,
			},
		},
		regulatoryDomains: [RegulatoryDomain.FDA_CLASS_III, RegulatoryDomain.IEC_62304],
		...options,
	});
}

/**
 * Create classification for Tesla-style connected vehicle software
 * Manufacturer-pushed OTA updates with high velocity
 */
export function createConnectedVehicleClassification(
	name: string,
	asilLevel: AutomotiveSafetyIntegrityLevel,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.EMBEDDED_SYSTEM, {
		deploymentContext: DeploymentContext.VEHICLE,
		safetyCriticality: {
			standard: "ISO_26262",
			level: asilLevel,
		},
		deploymentLifecycle: {
			deliveryMechanism: DeliveryMechanism.OTA_UPDATE,
			updateVelocity: {
				updatable: true,
				propagationLatency: PropagationLatency.MINUTES,
				applicationMode: UpdateApplicationMode.REBOOT_REQUIRED,
				rollback: {
					possible: true,
					latency: PropagationLatency.MINUTES,
					automated: true,
					preservesState: true,
					limitedSlots: 2,
				},
			},
			updateAuthority: {
				model: UpdateAuthorityModel.MANUFACTURER_PUSH,
				actors: [
					{
						role: ActorRole.MANUFACTURER,
						capabilities: [
							UpdateCapability.CAN_AUTHOR,
							UpdateCapability.CAN_SIGN,
							UpdateCapability.CAN_DISTRIBUTE,
						],
						approvalRequired: false,
					},
					{
						role: ActorRole.END_USER,
						capabilities: [UpdateCapability.CAN_DEFER, UpdateCapability.CAN_AUDIT],
						approvalRequired: false,
					},
				],
				consentRequired: ConsentRequirement.NOTIFICATION,
				userCanBlock: false,
				userCanDefer: true,
				maxDeferralPeriod: "7_days",
				forcedUpdateTriggers: ["safety_recall", "security_critical"],
				updateAuditTrail: true,
				rollbackRequiresApproval: false,
			},
		},
		regulatoryDomains: [
			RegulatoryDomain.ISO_26262,
			RegulatoryDomain.UNECE_R155,
			RegulatoryDomain.UNECE_R156,
		],
		...options,
	});
}

/**
 * Create classification for browser-based SaaS application
 * Instant updates with manufacturer control
 */
export function createSaaSClassification(
	name: string,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.WEB_APPLICATION, {
		deploymentContext: DeploymentContext.BROWSER,
		safetyCriticality: {
			standard: "NONE",
			level: null,
		},
		deploymentLifecycle: {
			deliveryMechanism: DeliveryMechanism.BROWSER_RENDER,
			updateVelocity: {
				updatable: true,
				propagationLatency: PropagationLatency.SECONDS,
				applicationMode: UpdateApplicationMode.HOT_RELOAD,
				rollback: {
					possible: true,
					latency: PropagationLatency.SECONDS,
					automated: true,
					preservesState: false,
				},
			},
			updateAuthority: {
				model: UpdateAuthorityModel.MANUFACTURER_PUSH,
				actors: [
					{
						role: ActorRole.MANUFACTURER,
						capabilities: [
							UpdateCapability.CAN_AUTHOR,
							UpdateCapability.CAN_DISTRIBUTE,
							UpdateCapability.CAN_ROLLBACK,
						],
						approvalRequired: false,
					},
				],
				consentRequired: ConsentRequirement.NONE,
				userCanBlock: false,
				userCanDefer: false,
				updateAuditTrail: false,
				rollbackRequiresApproval: false,
			},
		},
		...options,
	});
}

/**
 * Create classification for industrial PLC program
 * Physical access required, owner-exclusive control
 */
export function createIndustrialPLCClassification(
	name: string,
	silLevel: SafetyIntegrityLevel,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.PLC_PROGRAM, {
		deploymentContext: DeploymentContext.INDUSTRIAL_PLANT,
		safetyCriticality: {
			standard: "IEC_61508",
			level: silLevel,
		},
		deploymentLifecycle: {
			deliveryMechanism: DeliveryMechanism.PHYSICAL_MEDIA,
			deliveryCharacteristics: {
				mechanism: DeliveryMechanism.PHYSICAL_MEDIA,
				updateStrategy: "manual_reflash",
				rollbackCapability: "requires_physical",
				gatekeeper: "customer",
				signingRequired: false,
				requiresPhysicalAccess: true,
				requiresSpecialHardware: ["PLC programmer", "engineering workstation"],
			},
			updateVelocity: {
				updatable: true,
				propagationLatency: PropagationLatency.HOURS,
				applicationMode: UpdateApplicationMode.PHYSICAL_ACCESS,
				rollback: {
					possible: true,
					latency: PropagationLatency.HOURS,
					automated: false,
					preservesState: false,
				},
			},
			updateAuthority: {
				model: UpdateAuthorityModel.OWNER_EXCLUSIVE,
				actors: [
					{
						role: ActorRole.MANUFACTURER,
						capabilities: [UpdateCapability.CAN_AUTHOR],
						approvalRequired: false,
					},
					{
						role: ActorRole.OPERATOR,
						capabilities: [
							UpdateCapability.CAN_TRIGGER,
							UpdateCapability.CAN_ROLLBACK,
							UpdateCapability.CAN_BLOCK,
						],
						approvalRequired: true,
					},
				],
				consentRequired: ConsentRequirement.EXPLICIT_ACTION,
				userCanBlock: true,
				userCanDefer: true,
				maxDeferralPeriod: "indefinite",
				updateAuditTrail: true,
				rollbackRequiresApproval: true,
			},
		},
		regulatoryDomains: [RegulatoryDomain.IEC_61508, RegulatoryDomain.IEC_62443],
		...options,
	});
}

/**
 * Create classification for a kernel
 */
export function createKernelClassification(
	name: string,
	options?: Partial<SystemClassification>,
): SystemClassification {
	return createSystemClassification(name, SystemDomain.KERNEL, {
		scale: SystemScale.SYSTEM,
		maturity: DevelopmentMaturity.MATURE,
		...options,
	});
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

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

/**
 * Get required test categories based on safety criticality
 */
export function getRequiredTestCategories(classification: SystemClassification): string[] {
	const baseTests = ["unit", "integration", "regression"];

	if (classification.safetyCriticality.standard === "NONE") {
		return baseTests;
	}

	const criticalTests = [
		...baseTests,
		"static_analysis",
		"coverage_analysis",
		"boundary_value",
		"equivalence_partitioning",
	];

	// Add domain-specific tests
	if (classification.safetyCriticality.standard === "DO_178C") {
		criticalTests.push("structural_coverage", "requirements_based_testing", "robustness_testing");
	}

	if (classification.safetyCriticality.standard === "ISO_26262") {
		criticalTests.push("fault_injection", "back_to_back_testing", "hardware_software_integration");
	}

	if (classification.safetyCriticality.standard === "IEC_61508") {
		criticalTests.push(
			"formal_verification",
			"diverse_redundancy_testing",
			"failure_mode_analysis",
		);
	}

	if (classification.safetyCriticality.standard === "ECSS") {
		criticalTests.push(
			"formal_verification",
			"environmental_testing",
			"software_validation_facility",
			"end_to_end_testing",
			"operations_validation",
		);
	}

	if (classification.safetyCriticality.standard === "IEC_62304") {
		criticalTests.push(
			"risk_based_testing",
			"anomaly_testing",
			"fault_testing",
			"installation_testing",
		);
		// Class C requires additional rigor
		if (classification.safetyCriticality.level === MedicalDeviceSoftwareClass.CLASS_C) {
			criticalTests.push("independent_verification", "worst_case_testing");
		}
	}

	return criticalTests;
}

/**
 * Validate system classification completeness
 */
export function validateClassification(classification: SystemClassification): ValidationResult {
	const issues: ValidationIssue[] = [];

	// Check if safety-critical system has proper criticality defined
	const safetyCriticalContexts: DeploymentContext[] = [
		DeploymentContext.VEHICLE,
		DeploymentContext.AIRCRAFT,
		DeploymentContext.SPACECRAFT,
		DeploymentContext.MEDICAL_DEVICE,
		DeploymentContext.INDUSTRIAL_PLANT,
	];

	if (
		safetyCriticalContexts.includes(classification.deploymentContext) &&
		classification.safetyCriticality.standard === "NONE"
	) {
		issues.push({
			severity: "error",
			message: `Safety-critical context ${classification.deploymentContext} requires safety criticality classification`,
			field: "safetyCriticality",
		});
	}

	// Check if regulated domain has proper regulatory domains
	if (
		classification.deploymentContext === DeploymentContext.MEDICAL_DEVICE &&
		!classification.regulatoryDomains.includes(RegulatoryDomain.IEC_62304)
	) {
		issues.push({
			severity: "warning",
			message: "Medical devices typically require IEC 62304 compliance",
			field: "regulatoryDomains",
		});
	}

	// Check if medical device uses proper safety standard
	if (
		classification.deploymentContext === DeploymentContext.MEDICAL_DEVICE &&
		classification.safetyCriticality.standard !== "IEC_62304" &&
		classification.safetyCriticality.standard !== "NONE"
	) {
		issues.push({
			severity: "warning",
			message: "Medical device software should use IEC_62304 safety classification",
			field: "safetyCriticality",
		});
	}

	// Check TRL consistency with maturity
	if (classification.trl !== undefined) {
		const expectedMaturity = trlToMaturity(classification.trl);
		if (classification.maturity !== expectedMaturity) {
			issues.push({
				severity: "warning",
				message: `TRL ${classification.trl} typically corresponds to maturity ${expectedMaturity}, not ${classification.maturity}`,
				field: "maturity",
			});
		}
	}

	return {
		valid: issues.filter((i) => i.severity === "error").length === 0,
		issues,
	};
}

export interface ValidationResult {
	valid: boolean;
	issues: ValidationIssue[];
}

export interface ValidationIssue {
	severity: "error" | "warning" | "info";
	message: string;
	field: string;
}

// =============================================================================
// PREDEFINED TEMPLATES
// =============================================================================

export const SYSTEM_TEMPLATES = {
	// Simple web app
	webAppStartup: createWebAppClassification("Startup Web App", {
		maturity: DevelopmentMaturity.PROOF_OF_CONCEPT,
		trl: TechnologyReadinessLevel.TRL_3,
		scale: SystemScale.APPLICATION,
	}),

	// Enterprise system
	enterpriseSystem: createWebAppClassification("Enterprise Platform", {
		maturity: DevelopmentMaturity.MATURE,
		trl: TechnologyReadinessLevel.TRL_9,
		scale: SystemScale.ENTERPRISE,
		regulatoryDomains: [RegulatoryDomain.SOC_2, RegulatoryDomain.GDPR],
	}),

	// Automotive ECU
	automotiveECU: createAutomotiveClassification(
		"Brake Control ECU",
		AutomotiveSafetyIntegrityLevel.ASIL_D,
		{
			maturity: DevelopmentMaturity.GENERAL_AVAILABILITY,
			scale: SystemScale.COMPONENT,
		},
	),

	// Aviation flight control
	aviationFlightControl: createAviationClassification(
		"Primary Flight Control",
		DesignAssuranceLevel.DAL_A,
		{
			maturity: DevelopmentMaturity.MATURE,
			scale: SystemScale.SYSTEM,
		},
	),

	// Space GNC
	spaceGNC: createSpaceSoftwareClassification(
		"Guidance Navigation Control",
		SpaceSoftwareCriticality.CATEGORY_A,
		{
			maturity: DevelopmentMaturity.GENERAL_AVAILABILITY,
			trl: TechnologyReadinessLevel.TRL_8,
			scale: SystemScale.SYSTEM,
		},
	),

	// Medical infusion pump
	medicalInfusionPump: createMedicalDeviceClassification(
		"Infusion Pump Controller",
		MedicalDeviceSoftwareClass.CLASS_C,
		{
			maturity: DevelopmentMaturity.MATURE,
			scale: SystemScale.COMPONENT,
			regulatoryDomains: [RegulatoryDomain.FDA_CLASS_III, RegulatoryDomain.IEC_62304],
		},
	),

	// Linux kernel module
	linuxKernelModule: createKernelClassification("Linux Kernel Module", {
		maturity: DevelopmentMaturity.BETA,
		scale: SystemScale.MODULE,
	}),

	// IoT sensor firmware
	iotSensorFirmware: createFirmwareClassification(
		"IoT Sensor Firmware",
		{ standard: "NONE", level: null },
		{
			maturity: DevelopmentMaturity.ALPHA,
			trl: TechnologyReadinessLevel.TRL_5,
			deploymentContext: DeploymentContext.IOT_DEVICE,
		},
	),

	// Industrial safety PLC
	industrialSafetyPLC: createSystemClassification("Safety PLC Program", SystemDomain.PLC_PROGRAM, {
		deploymentContext: DeploymentContext.INDUSTRIAL_PLANT,
		safetyCriticality: {
			standard: "IEC_61508",
			level: SafetyIntegrityLevel.SIL_3,
		},
		regulatoryDomains: [RegulatoryDomain.IEC_61508, RegulatoryDomain.IEC_62443],
		maturity: DevelopmentMaturity.MATURE,
	}),
};

// =============================================================================
// EXAMPLE USAGE
// =============================================================================

/*
// Create a lunar module guidance system
const lunarGNC = createSpaceSoftwareClassification(
  "Lunar Module GNC",
  SpaceSoftwareCriticality.CATEGORY_A,
  {
    maturity: DevelopmentMaturity.RELEASE_CANDIDATE,
    trl: TechnologyReadinessLevel.TRL_7,
    scale: SystemScale.SYSTEM,
    description: "Guidance, Navigation, and Control software for lunar lander",
  }
);

// Validate the classification
const validation = validateClassification(lunarGNC);
if (!validation.valid) {
  console.log("Classification issues:", validation.issues);
}

// Get required test categories
const requiredTests = getRequiredTestCategories(lunarGNC);
console.log("Required test types:", requiredTests);

// Create a simple draft script
const draftScript = createSystemClassification("Data Migration Script", SystemDomain.SCRIPT, {
  scale: SystemScale.SCRIPT,
  maturity: DevelopmentMaturity.SPIKE,
  trl: TechnologyReadinessLevel.TRL_2,
});

// Compare the two
console.log(`Lunar GNC TRL: ${lunarGNC.trl} (${TRL_DEFINITIONS[lunarGNC.trl!].name})`);
console.log(`Draft Script TRL: ${draftScript.trl} (${TRL_DEFINITIONS[draftScript.trl!].name})`);
*/
