/**
 * Integrity Classification Theory
 *
 * A Domain-Agnostic Framework for Impact-Driven Constraint Derivation
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * ABSTRACT THEORY: ORDERED STRUCTURES AND MONOTONIC FUNCTORS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This module defines the ABSTRACT MATHEMATICAL THEORY independent of any
 * specific application domain. Safety standards, security classifications,
 * quality tiers, and other classification systems are all INSTANCES of this
 * theory.
 *
 * CORE INSIGHT:
 *   Many engineering disciplines use ordered classification systems where:
 *   (1) Higher levels indicate greater criticality/integrity requirements
 *   (2) Higher levels demand more stringent engineering constraints
 *   (3) Classification is determined by impact assessment
 *   (4) Systems compose according to specific rules
 *
 * This theory captures the COMMON STRUCTURE underlying all such systems.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * MATHEMATICAL FOUNDATIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * DEFINITION 1 (Integrity Lattice):
 *   An integrity lattice is a tuple L = (E, ≤, ⊥, ⊤) where:
 *   - E is a finite set of integrity levels
 *   - ≤ is a total order on E (reflexive, antisymmetric, transitive, total)
 *   - ⊥ ∈ E is the bottom element (minimum integrity)
 *   - ⊤ ∈ E is the top element (maximum integrity)
 *
 *   Since E is totally ordered, (E, ≤) forms a CHAIN, and the lattice
 *   operations are trivial: join(a,b) = max(a,b), meet(a,b) = min(a,b).
 *
 * DEFINITION 2 (Impact Space):
 *   An impact space is a tuple I = (D₁ × D₂ × ... × Dₙ, ⊕) where:
 *   - Each Dᵢ is a finite ordered set of impact dimensions
 *   - ⊕: D₁ × ... × Dₙ → ℝ₊ is an aggregation function
 *
 * DEFINITION 3 (Classification Functor):
 *   A classification functor Φ: I → L is a monotonic function that:
 *   - Maps impact assessments to integrity levels
 *   - Preserves order: if i₁ ≤ᵢ i₂ then Φ(i₁) ≤ₗ Φ(i₂)
 *
 * DEFINITION 4 (Constraint Space):
 *   A constraint space is a tuple C = (C, ≤c) where:
 *   - C is a set of engineering constraint bundles
 *   - ≤c is a partial order representing "more stringent than"
 *
 * DEFINITION 5 (Constraint Derivation Functor):
 *   A constraint derivation functor Ψ: L → C is a monotonic function that:
 *   - Maps integrity levels to constraint bundles
 *   - Preserves order: if ℓ₁ ≤ₗ ℓ₂ then Ψ(ℓ₁) ≤c Ψ(ℓ₂)
 *
 * THEOREM 1 (Composition):
 *   The composition Ψ ∘ Φ: I → C is monotonic.
 *   (Higher impact → higher integrity → more stringent constraints)
 *
 * THEOREM 2 (Galois Connection):
 *   If Φ has a right adjoint Φᴿ: L → I, then (Φ, Φᴿ) forms a Galois connection,
 *   enabling "best approximation" reasoning between impact and integrity.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * CROSS-DOMAIN MAPPING
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * DEFINITION 6 (Universal Ordinal Space):
 *   The universal ordinal space is U = ([0, 1], ≤, 0, 1).
 *   This is the "canonical" bounded chain into which all integrity lattices embed.
 *
 * DEFINITION 7 (Normalization Functor):
 *   For any integrity lattice L with k levels, the normalization functor
 *   ν: L → U is defined by:
 *     ν(ℓⱼ) = j / (k - 1)  for the j-th level (0-indexed)
 *
 *   This is order-preserving and maps ⊥ → 0, ⊤ → 1.
 *
 * THEOREM 3 (Universal Property):
 *   For any two integrity lattices L₁, L₂ with normalizations ν₁, ν₂,
 *   the induced cross-domain comparison ≤ᵤ defined by:
 *     a ≤ᵤ b ⟺ ν₁(a) ≤ ν₂(b)
 *   is reflexive and transitive on the union of elements.
 *
 * ⚠️ CRITICAL CAVEAT:
 *   The universal ordinal preserves ORDER but discards SEMANTIC content.
 *   "ν(SIL_3) = ν(ASIL_D)" does NOT mean they are interchangeable —
 *   only that they occupy the same ordinal position in their respective lattices.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * COMPOSITION RULES
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * DEFINITION 8 (System Composition):
 *   For subsystems s₁, s₂, ..., sₙ with integrity levels ℓ₁, ℓ₂, ..., ℓₙ,
 *   the system-level integrity ℓ_sys is determined by a composition operator ⊙.
 *
 *   Common composition rules:
 *   - SERIES (failure of any component causes system failure):
 *       ℓ_sys = max(ℓ₁, ℓ₂, ..., ℓₙ)  [join in the lattice]
 *   - PARALLEL (all components must fail for system failure):
 *       ℓ_sys = min(ℓ₁, ℓ₂, ..., ℓₙ)  [meet in the lattice]
 *   - ALLOCATED (distributing system-level requirement):
 *       ∀i: ℓᵢ ≥ ℓ_sys  [each subsystem must meet system requirement]
 *
 * THEOREM 4 (Decomposition):
 *   If system S has integrity requirement ℓ_sys and is decomposed into
 *   independent subsystems S₁, S₂, ..., Sₙ, then:
 *   - Conservative allocation: each Sᵢ gets ℓ_sys
 *   - Risk-distributed allocation: requires probabilistic analysis
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// =============================================================================
// SECTION 1: ABSTRACT LATTICE STRUCTURES
// =============================================================================

/**
 * Ordering relation result
 */
export enum Ordering {
	LESS = -1,
	EQUAL = 0,
	GREATER = 1,
	// biome-ignore lint/style/useLiteralEnumMembers: NaN is required for partial order incomparability
	INCOMPARABLE = Number.NaN,
}

/**
 * Abstract element in an ordered set
 */
export interface OrderedElement {
	/** Unique identifier within the lattice */
	readonly id: string;
	/** Ordinal position (0 = bottom, increasing upward) */
	readonly ordinal: number;
	/** Human-readable name */
	readonly name: string;
}

/**
 * A bounded lattice (specifically a chain/total order for integrity levels)
 *
 * Type parameter E represents the element type.
 */
export interface BoundedLattice<E extends OrderedElement> {
	/** Unique identifier for this lattice */
	readonly id: string;
	/** Human-readable name */
	readonly name: string;
	/** All elements in order from bottom to top */
	readonly elements: readonly E[];
	/** Bottom element (minimum integrity) */
	readonly bottom: E;
	/** Top element (maximum integrity) */
	readonly top: E;

	/** Compare two elements */
	compare(a: E, b: E): Ordering;
	/** Lattice join (least upper bound) - for chains, this is max */
	join(a: E, b: E): E;
	/** Lattice meet (greatest lower bound) - for chains, this is min */
	meet(a: E, b: E): E;
	/** Check if a ≤ b */
	leq(a: E, b: E): boolean;
	/** Get element by ordinal */
	fromOrdinal(ordinal: number): E | undefined;
	/** Normalize to [0, 1] interval */
	normalize(e: E): number;
}

/**
 * Create a bounded lattice from an array of elements
 * Elements must be provided in order from bottom to top
 */
export function createBoundedLattice<E extends OrderedElement>(
	id: string,
	name: string,
	elements: readonly E[],
): BoundedLattice<E> {
	if (elements.length === 0) {
		throw new Error("Lattice must have at least one element");
	}

	const bottom = elements[0]!;
	const top = elements[elements.length - 1]!;
	const maxOrdinal = top.ordinal;

	return {
		id,
		name,
		elements,
		bottom,
		top,

		compare(a: E, b: E): Ordering {
			if (a.ordinal < b.ordinal) return Ordering.LESS;
			if (a.ordinal > b.ordinal) return Ordering.GREATER;
			return Ordering.EQUAL;
		},

		join(a: E, b: E): E {
			return a.ordinal >= b.ordinal ? a : b;
		},

		meet(a: E, b: E): E {
			return a.ordinal <= b.ordinal ? a : b;
		},

		leq(a: E, b: E): boolean {
			return a.ordinal <= b.ordinal;
		},

		fromOrdinal(ordinal: number): E | undefined {
			return elements.find((e) => e.ordinal === ordinal);
		},

		normalize(e: E): number {
			if (maxOrdinal === 0) return 0;
			return e.ordinal / maxOrdinal;
		},
	};
}

// =============================================================================
// SECTION 2: IMPACT DIMENSIONS (Abstract)
// =============================================================================

/**
 * An abstract dimension in the impact space
 */
export interface ImpactDimension<T extends OrderedElement = OrderedElement> {
	/** Unique identifier */
	readonly id: string;
	/** Human-readable name */
	readonly name: string;
	/** Description of what this dimension measures */
	readonly description: string;
	/** Possible values as a bounded lattice */
	readonly values: BoundedLattice<T>;
	/** Weight in aggregation (optional) */
	readonly weight?: number;
}

/**
 * A point in the impact space (concrete assessment)
 */
export interface ImpactAssessment {
	/** Map from dimension ID to assessed value ordinal */
	readonly dimensions: Record<string, number>;
}

/**
 * Aggregation strategy for combining impact dimensions
 */
export type AggregationStrategy =
	| { type: "max" } // Take maximum dimension
	| { type: "weighted_sum"; weights: Record<string, number> } // Weighted sum
	| { type: "product" } // Product (multiplicative)
	| { type: "custom"; fn: (dims: Record<string, number>) => number };

/**
 * Complete impact space definition
 */
export interface ImpactSpace {
	/** All dimensions in this impact space */
	readonly dimensions: ImpactDimension[];
	/** How to aggregate dimensions into a single risk score */
	readonly aggregation: AggregationStrategy;
}

/**
 * Aggregate impact dimensions into a single score
 */
export function aggregateImpact(space: ImpactSpace, assessment: ImpactAssessment): number {
	const values = space.dimensions.map((d) => ({
		id: d.id,
		value: assessment.dimensions[d.id] ?? 0,
		weight: d.weight ?? 1,
		max: d.values.top.ordinal,
	}));

	switch (space.aggregation.type) {
		case "max":
			// Normalize each dimension and take max
			return Math.max(...values.map((v) => (v.max > 0 ? v.value / v.max : 0)));

		case "weighted_sum": {
			const weights = space.aggregation.weights;
			let sum = 0;
			let totalWeight = 0;
			for (const v of values) {
				const w = weights[v.id] ?? v.weight;
				sum += (v.max > 0 ? v.value / v.max : 0) * w;
				totalWeight += w;
			}
			return totalWeight > 0 ? sum / totalWeight : 0;
		}

		case "product": {
			let product = 1;
			for (const v of values) {
				product *= (v.max > 0 ? v.value / v.max : 0) + 0.1; // Add small offset to avoid zero
			}
			return Math.min(1, product);
		}

		case "custom":
			return space.aggregation.fn(assessment.dimensions);
	}
}

// =============================================================================
// SECTION 3: CLASSIFICATION FUNCTOR
// =============================================================================

/**
 * A classification functor maps impact assessments to integrity levels
 */
export interface ClassificationFunctor<
	E extends OrderedElement,
	L extends BoundedLattice<E> = BoundedLattice<E>,
> {
	/** The impact space (domain) */
	readonly impactSpace: ImpactSpace;
	/** The integrity lattice (codomain) */
	readonly integrityLattice: L;
	/** Classification thresholds (normalized scores that trigger each level) */
	readonly thresholds: number[];

	/** Classify an impact assessment */
	classify(assessment: ImpactAssessment): E;
}

/**
 * Create a classification functor with linear thresholds
 *
 * @param impactSpace - The impact space
 * @param integrityLattice - The target integrity lattice
 * @param thresholds - Optional custom thresholds (default: evenly spaced)
 */
export function createClassificationFunctor<E extends OrderedElement>(
	impactSpace: ImpactSpace,
	integrityLattice: BoundedLattice<E>,
	thresholds?: number[],
): ClassificationFunctor<E> {
	const k = integrityLattice.elements.length;

	// Default: evenly spaced thresholds
	const actualThresholds = thresholds ?? Array.from({ length: k }, (_, i) => i / (k - 1 || 1));

	return {
		impactSpace,
		integrityLattice,
		thresholds: actualThresholds,

		classify(assessment: ImpactAssessment): E {
			const score = aggregateImpact(impactSpace, assessment);

			// Find the highest level whose threshold is <= score
			let level = integrityLattice.bottom;
			for (let i = 0; i < integrityLattice.elements.length; i++) {
				if (score >= (actualThresholds[i] ?? 0)) {
					level = integrityLattice.elements[i]!;
				}
			}
			return level;
		},
	};
}

// =============================================================================
// SECTION 4: CONSTRAINT SPACE (Abstract)
// =============================================================================

/**
 * Abstract constraint bundle
 * Concrete implementations will specify domain-specific constraints
 */
export interface ConstraintBundle {
	/** Unique identifier */
	readonly id: string;
	/** Associated integrity level ordinal */
	readonly level: number;
	/** Human-readable description */
	readonly description: string;
}

/**
 * Constraint derivation functor maps integrity levels to constraints
 */
export interface ConstraintDerivation<E extends OrderedElement, C extends ConstraintBundle> {
	/** The integrity lattice (domain) */
	readonly integrityLattice: BoundedLattice<E>;
	/** Derive constraints for a level */
	derive(level: E): C;
}

// =============================================================================
// SECTION 5: UNIVERSAL ORDINAL SPACE
// =============================================================================

/**
 * Universal ordinal element (normalized to [0, 1])
 */
export interface UniversalOrdinal extends OrderedElement {
	/** The normalized value in [0, 1] */
	readonly normalizedValue: number;
	/** Source lattice ID */
	readonly sourceLattice: string;
	/** Original element ID */
	readonly sourceElement: string;
}

/**
 * Create a universal ordinal from a lattice element
 */
export function toUniversalOrdinal<E extends OrderedElement>(
	lattice: BoundedLattice<E>,
	element: E,
): UniversalOrdinal {
	const normalized = lattice.normalize(element);
	return {
		id: `${lattice.id}:${element.id}`,
		ordinal: normalized,
		name: `${element.name} (${lattice.name})`,
		normalizedValue: normalized,
		sourceLattice: lattice.id,
		sourceElement: element.id,
	};
}

/**
 * Compare elements from different lattices via universal ordinal
 */
export function compareAcrossLattices<E1 extends OrderedElement, E2 extends OrderedElement>(
	lattice1: BoundedLattice<E1>,
	element1: E1,
	lattice2: BoundedLattice<E2>,
	element2: E2,
): Ordering {
	const u1 = lattice1.normalize(element1);
	const u2 = lattice2.normalize(element2);

	if (u1 < u2) return Ordering.LESS;
	if (u1 > u2) return Ordering.GREATER;
	return Ordering.EQUAL;
}

/**
 * Cross-lattice mapping result
 */
export interface CrossLatticeMapping<E1 extends OrderedElement, E2 extends OrderedElement> {
	source: E1;
	sourceLattice: BoundedLattice<E1>;
	target: E2;
	targetLattice: BoundedLattice<E2>;
	/** How well does the target approximate the source? */
	approximationQuality: "exact" | "lower_bound" | "upper_bound" | "nearest";
}

/**
 * Find the nearest equivalent in another lattice
 */
export function findNearestEquivalent<E1 extends OrderedElement, E2 extends OrderedElement>(
	sourceLattice: BoundedLattice<E1>,
	sourceElement: E1,
	targetLattice: BoundedLattice<E2>,
): CrossLatticeMapping<E1, E2> {
	const sourceNormalized = sourceLattice.normalize(sourceElement);

	let nearest: E2 = targetLattice.bottom;
	let nearestDistance = Math.abs(targetLattice.normalize(nearest) - sourceNormalized);

	for (const target of targetLattice.elements) {
		const targetNormalized = targetLattice.normalize(target);
		const distance = Math.abs(targetNormalized - sourceNormalized);

		if (distance < nearestDistance) {
			nearest = target;
			nearestDistance = distance;
		}
	}

	const nearestNormalized = targetLattice.normalize(nearest);
	let quality: "exact" | "lower_bound" | "upper_bound" | "nearest";

	if (nearestNormalized === sourceNormalized) {
		quality = "exact";
	} else if (nearestNormalized < sourceNormalized) {
		quality = "lower_bound";
	} else if (nearestNormalized > sourceNormalized) {
		quality = "upper_bound";
	} else {
		quality = "nearest";
	}

	return {
		source: sourceElement,
		sourceLattice,
		target: nearest,
		targetLattice,
		approximationQuality: quality,
	};
}

// =============================================================================
// SECTION 6: COMPOSITION OPERATORS
// =============================================================================

/**
 * Composition strategy for combining subsystem integrity levels
 */
export type CompositionStrategy =
	| "series" // All components in series: system level = max(component levels)
	| "parallel" // All components in parallel: system level = min(component levels)
	| "allocated"; // System level allocated to all components

/**
 * Compose multiple integrity levels according to a strategy
 */
export function composeIntegrityLevels<E extends OrderedElement>(
	lattice: BoundedLattice<E>,
	levels: E[],
	strategy: CompositionStrategy,
): E {
	if (levels.length === 0) {
		return lattice.bottom;
	}

	switch (strategy) {
		case "series":
			// Take the join (max) - any component failure is system failure
			return levels.reduce((acc, level) => lattice.join(acc, level), lattice.bottom);

		case "parallel":
			// Take the meet (min) - all components must fail for system failure
			return levels.reduce((acc, level) => lattice.meet(acc, level), lattice.top);

		case "allocated":
			// For allocation, the system level IS the requirement
			// All components must meet it, so return the max (join)
			return levels.reduce((acc, level) => lattice.join(acc, level), lattice.bottom);
	}
}

/**
 * Decompose a system-level requirement into subsystem requirements
 */
export interface DecompositionResult<E extends OrderedElement> {
	/** The system-level requirement */
	systemLevel: E;
	/** Allocated levels for each subsystem */
	subsystemLevels: E[];
	/** Decomposition strategy used */
	strategy: DecompositionStrategy;
	/** Whether this decomposition is valid */
	valid: boolean;
	/** Explanation */
	rationale: string;
}

export type DecompositionStrategy =
	| "conservative" // Each subsystem gets full system requirement
	| "equal_split"; // Attempt to split requirement (not always valid)

/**
 * Decompose a system requirement to subsystems
 */
export function decomposeRequirement<E extends OrderedElement>(
	_lattice: BoundedLattice<E>,
	systemLevel: E,
	subsystemCount: number,
	strategy: DecompositionStrategy = "conservative",
): DecompositionResult<E> {
	switch (strategy) {
		case "conservative":
			// Each subsystem gets the full requirement (always valid)
			return {
				systemLevel,
				subsystemLevels: Array(subsystemCount).fill(systemLevel),
				strategy,
				valid: true,
				rationale: `Each of ${subsystemCount} subsystems allocated full system requirement`,
			};

		case "equal_split":
			// This is generally NOT valid without probabilistic analysis
			// For safety standards, SIL/ASIL decomposition has specific rules
			return {
				systemLevel,
				subsystemLevels: Array(subsystemCount).fill(systemLevel),
				strategy,
				valid: false,
				rationale: "Equal split requires domain-specific rules (e.g., ASIL decomposition table)",
			};
	}
}

// =============================================================================
// SECTION 7: LATTICE HOMOMORPHISMS
// =============================================================================

/**
 * A lattice homomorphism preserves order and lattice operations
 */
export interface LatticeHomomorphism<E1 extends OrderedElement, E2 extends OrderedElement> {
	/** Source lattice */
	readonly source: BoundedLattice<E1>;
	/** Target lattice */
	readonly target: BoundedLattice<E2>;
	/** The mapping function */
	map(element: E1): E2;
	/** Does this preserve joins? φ(a ⊔ b) = φ(a) ⊔ φ(b) */
	readonly preservesJoin: boolean;
	/** Does this preserve meets? φ(a ⊓ b) = φ(a) ⊓ φ(b) */
	readonly preservesMeet: boolean;
}

/**
 * Create a homomorphism via nearest-neighbor mapping
 */
export function createNearestHomomorphism<E1 extends OrderedElement, E2 extends OrderedElement>(
	source: BoundedLattice<E1>,
	target: BoundedLattice<E2>,
): LatticeHomomorphism<E1, E2> {
	return {
		source,
		target,
		map(element: E1): E2 {
			return findNearestEquivalent(source, element, target).target;
		},
		// Nearest-neighbor generally preserves operations for chains
		preservesJoin: true,
		preservesMeet: true,
	};
}

// =============================================================================
// SECTION 8: GALOIS CONNECTIONS
// =============================================================================

/**
 * A Galois connection between two ordered sets
 *
 * (F, G) where F: A → B and G: B → A such that:
 *   F(a) ≤ b  ⟺  a ≤ G(b)
 *
 * This captures "best approximation" properties.
 */
export interface GaloisConnection<A extends OrderedElement, B extends OrderedElement> {
	/** The lower adjoint F: A → B */
	lower: (a: A) => B;
	/** The upper adjoint G: B → A */
	upper: (b: B) => A;
	/** Source lattice */
	sourceA: BoundedLattice<A>;
	/** Target lattice */
	sourceB: BoundedLattice<B>;
}

/**
 * Create a Galois connection between two lattices via rounding
 */
export function createGaloisConnection<A extends OrderedElement, B extends OrderedElement>(
	latticeA: BoundedLattice<A>,
	latticeB: BoundedLattice<B>,
): GaloisConnection<A, B> {
	return {
		sourceA: latticeA,
		sourceB: latticeB,

		// Lower adjoint: round UP (ceiling) - gives smallest B ≥ normalized(a)
		lower(a: A): B {
			const normalized = latticeA.normalize(a);
			let result = latticeB.top;
			for (const b of latticeB.elements) {
				const bNorm = latticeB.normalize(b);
				if (bNorm >= normalized && bNorm <= latticeB.normalize(result)) {
					result = b;
				}
			}
			return result;
		},

		// Upper adjoint: round DOWN (floor) - gives largest A ≤ normalized(b)
		upper(b: B): A {
			const normalized = latticeB.normalize(b);
			let result = latticeA.bottom;
			for (const a of latticeA.elements) {
				const aNorm = latticeA.normalize(a);
				if (aNorm <= normalized && aNorm >= latticeA.normalize(result)) {
					result = a;
				}
			}
			return result;
		},
	};
}

/**
 * Key property: Round-trip through Galois connection is inflationary/deflationary
 *
 * G(F(a)) ≥ a  (round-trip via lower adjoint inflates)
 * F(G(b)) ≤ b  (round-trip via upper adjoint deflates)
 *
 * For safety: SIL → ASIL → SIL always gives SIL ≥ original (conservative)
 */
export function checkGaloisProperty<A extends OrderedElement, B extends OrderedElement>(
	connection: GaloisConnection<A, B>,
	a: A,
): { inflated: boolean; original: A; roundTrip: A } {
	const b = connection.lower(a);
	const roundTrip = connection.upper(b);

	return {
		inflated: connection.sourceA.leq(a, roundTrip),
		original: a,
		roundTrip,
	};
}

// =============================================================================
// SECTION 9: INSTANCE REGISTRY
// =============================================================================

/**
 * Registry for lattice instances
 * Allows domains to register their specific lattices
 */
export class LatticeRegistry {
	private lattices: Map<string, BoundedLattice<OrderedElement>> = new Map();
	private homomorphisms: Map<string, LatticeHomomorphism<OrderedElement, OrderedElement>> =
		new Map();

	register<E extends OrderedElement>(lattice: BoundedLattice<E>): void {
		this.lattices.set(lattice.id, lattice as BoundedLattice<OrderedElement>);
	}

	get<E extends OrderedElement>(id: string): BoundedLattice<E> | undefined {
		return this.lattices.get(id) as BoundedLattice<E> | undefined;
	}

	registerHomomorphism<E1 extends OrderedElement, E2 extends OrderedElement>(
		sourceId: string,
		targetId: string,
		homomorphism: LatticeHomomorphism<E1, E2>,
	): void {
		const key = `${sourceId}→${targetId}`;
		this.homomorphisms.set(
			key,
			homomorphism as LatticeHomomorphism<OrderedElement, OrderedElement>,
		);
	}

	getHomomorphism<E1 extends OrderedElement, E2 extends OrderedElement>(
		sourceId: string,
		targetId: string,
	): LatticeHomomorphism<E1, E2> | undefined {
		const key = `${sourceId}→${targetId}`;
		return this.homomorphisms.get(key) as LatticeHomomorphism<E1, E2> | undefined;
	}

	listLattices(): string[] {
		return Array.from(this.lattices.keys());
	}
}

/** Global registry instance */
export const globalRegistry = new LatticeRegistry();

// =============================================================================
// SECTION 10: UTILITY FUNCTIONS
// =============================================================================

/**
 * Pretty-print a lattice
 */
export function describeLattice<E extends OrderedElement>(lattice: BoundedLattice<E>): string {
	const lines: string[] = [
		`Lattice: ${lattice.name} (${lattice.id})`,
		`Elements (${lattice.elements.length}):`,
	];

	for (const e of lattice.elements) {
		const norm = lattice.normalize(e).toFixed(2);
		const marker = e === lattice.bottom ? " [⊥]" : e === lattice.top ? " [⊤]" : "";
		lines.push(`  ${e.ordinal}: ${e.name} (normalized: ${norm})${marker}`);
	}

	return lines.join("\n");
}

/**
 * Validate that a lattice is well-formed
 */
export function validateLattice<E extends OrderedElement>(
	lattice: BoundedLattice<E>,
): { valid: boolean; errors: string[] } {
	const errors: string[] = [];

	// Check non-empty
	if (lattice.elements.length === 0) {
		errors.push("Lattice has no elements");
	}

	// Check ordinals are strictly increasing
	for (let i = 1; i < lattice.elements.length; i++) {
		const prev = lattice.elements[i - 1]!;
		const curr = lattice.elements[i]!;
		if (curr.ordinal <= prev.ordinal) {
			errors.push(
				`Ordinals not strictly increasing: ${prev.name}(${prev.ordinal}) >= ${curr.name}(${curr.ordinal})`,
			);
		}
	}

	// Check bottom is minimum
	if (lattice.bottom !== lattice.elements[0]) {
		errors.push("Bottom element is not first element");
	}

	// Check top is maximum
	if (lattice.top !== lattice.elements[lattice.elements.length - 1]) {
		errors.push("Top element is not last element");
	}

	// Check join/meet properties
	for (const a of lattice.elements) {
		for (const b of lattice.elements) {
			const join = lattice.join(a, b);
			const meet = lattice.meet(a, b);

			// join should be max
			const expectedJoin = a.ordinal >= b.ordinal ? a : b;
			if (join !== expectedJoin) {
				errors.push(`Join(${a.name}, ${b.name}) = ${join.name}, expected ${expectedJoin.name}`);
			}

			// meet should be min
			const expectedMeet = a.ordinal <= b.ordinal ? a : b;
			if (meet !== expectedMeet) {
				errors.push(`Meet(${a.name}, ${b.name}) = ${meet.name}, expected ${expectedMeet.name}`);
			}
		}
	}

	return { valid: errors.length === 0, errors };
}
