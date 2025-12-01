/**
 * Formal Concept Analysis (FCA) Theory
 *
 * Mathematical Foundations for Requirement Decomposition and Cross-Standard Comparison
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * FORMAL CONCEPT ANALYSIS: DISCOVERING STRUCTURE IN DATA
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * REFERENCES:
 *   - Wille, R. (1982). "Restructuring Lattice Theory: An Approach Based on
 *     Hierarchies of Concepts." Ordered Sets, NATO ASI Series C, Vol. 83.
 *   - Ganter, B. & Wille, R. (1999). "Formal Concept Analysis: Mathematical
 *     Foundations." Springer.
 *
 * CORE INSIGHT:
 *   FCA provides a mathematically rigorous way to discover natural clusters
 *   of co-occurring properties (attributes) across objects. For safety standards:
 *   - Objects (G) = Safety integrity levels (SIL 1, ASIL A, DAL C, ...)
 *   - Attributes (M) = Atomic requirements ("Forms")
 *   - Incidence (I) = "Level g requires Form m"
 *
 *   The resulting concept lattice reveals which requirements naturally cluster
 *   together and which are shared across standards.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * MATHEMATICAL FOUNDATIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * DEFINITION 1 (Formal Context):
 *   A formal context is a triple K = (G, M, I) where:
 *   - G is a finite set of objects
 *   - M is a finite set of attributes
 *   - I ⊆ G × M is an incidence relation (gIm means "object g has attribute m")
 *
 * DEFINITION 2 (Derivation Operators):
 *   For A ⊆ G and B ⊆ M, the derivation operators (·)' are:
 *   - A' = {m ∈ M | ∀g ∈ A: gIm}  — attributes common to ALL objects in A
 *   - B' = {g ∈ G | ∀m ∈ B: gIm}  — objects having ALL attributes in B
 *
 *   These form an antitone Galois connection between (℘(G), ⊇) and (℘(M), ⊇).
 *
 * DEFINITION 3 (Formal Concept):
 *   A formal concept is a pair (A, B) where A ⊆ G and B ⊆ M such that:
 *   - A' = B (the attributes shared by A are exactly B)
 *   - B' = A (the objects having all of B are exactly A)
 *
 *   A is called the extent (objects), B is called the intent (attributes).
 *
 * DEFINITION 4 (Concept Lattice):
 *   The set of all formal concepts B(K) forms a complete lattice under:
 *   - (A₁, B₁) ≤ (A₂, B₂) ⟺ A₁ ⊆ A₂ ⟺ B₁ ⊇ B₂
 *
 *   Join: (A₁, B₁) ∨ (A₂, B₂) = ((A₁ ∪ A₂)'', A₁' ∩ A₂')
 *   Meet: (A₁, B₁) ∧ (A₂, B₂) = (A₁ ∩ A₂, (B₁ ∪ B₂)'')
 *
 * THEOREM 1 (Main Theorem of FCA):
 *   B(K) is a complete lattice with:
 *   - Infimum: ⋀{(Aₜ, Bₜ)} = (⋂Aₜ, (⋃Bₜ)'')
 *   - Supremum: ⋁{(Aₜ, Bₜ)} = ((⋃Aₜ)'', ⋂Bₜ)
 *   - Top: (G, G')
 *   - Bottom: (M', M)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * ATTRIBUTE IMPLICATIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * DEFINITION 5 (Implication):
 *   An implication X → Y (where X, Y ⊆ M) holds in context K iff:
 *   X' ⊆ Y' (every object having all of X also has all of Y)
 *
 * DEFINITION 6 (Guigues-Duquenne Basis):
 *   The canonical (minimum) set of implications from which all valid
 *   implications can be derived via Armstrong's axioms.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * APPLICATION: REQUIREMENT DELTA COMPUTATION
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Given two integrity levels g₁ (baseline) and g₂ (target):
 *   - Delta(g₂, g₁) = {g₂}' \ {g₁}' = attributes required by g₂ but not g₁
 *
 * This directly answers: "What additional requirements does Level X have
 * compared to Level Y?"
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { Ordering } from "./lattice-theory";

// =============================================================================
// SECTION 1: FORMAL CONTEXT
// =============================================================================

/**
 * A formal context K = (G, M, I)
 *
 * Type parameters:
 * - G: Type for object identifiers
 * - M: Type for attribute identifiers
 */
export interface FormalContext<G = string, M = string> {
	/** Unique identifier for this context */
	readonly id: string;

	/** Human-readable name */
	readonly name: string;

	/** Set of objects (as array for iteration) */
	readonly objects: readonly G[];

	/** Set of attributes (as array for iteration) */
	readonly attributes: readonly M[];

	/** Incidence relation: does object g have attribute m? */
	hasAttribute(object: G, attribute: M): boolean;

	/** Get all attributes of an object */
	attributesOf(object: G): Set<M>;

	/** Get all objects having an attribute */
	objectsHaving(attribute: M): Set<G>;
}

/**
 * Mutable context builder for constructing formal contexts
 */
export interface FormalContextBuilder<G = string, M = string> {
	/** Add an object */
	addObject(object: G): this;

	/** Add an attribute */
	addAttribute(attribute: M): this;

	/** Set incidence: object g has attribute m */
	setIncidence(object: G, attribute: M, value?: boolean): this;

	/** Add multiple incidences for an object */
	addObjectAttributes(object: G, attributes: Iterable<M>): this;

	/** Build the immutable context */
	build(): FormalContext<G, M>;
}

/**
 * Create a formal context builder
 */
export function createFormalContextBuilder<G = string, M = string>(
	id: string,
	name: string,
): FormalContextBuilder<G, M> {
	const objects = new Set<G>();
	const attributes = new Set<M>();
	const incidence = new Map<G, Set<M>>();

	return {
		addObject(object: G): FormalContextBuilder<G, M> {
			objects.add(object);
			if (!incidence.has(object)) {
				incidence.set(object, new Set());
			}
			return this;
		},

		addAttribute(attribute: M): FormalContextBuilder<G, M> {
			attributes.add(attribute);
			return this;
		},

		setIncidence(object: G, attribute: M, value = true): FormalContextBuilder<G, M> {
			this.addObject(object);
			this.addAttribute(attribute);
			if (value) {
				incidence.get(object)?.add(attribute);
			} else {
				incidence.get(object)?.delete(attribute);
			}
			return this;
		},

		addObjectAttributes(object: G, attrs: Iterable<M>): FormalContextBuilder<G, M> {
			this.addObject(object);
			for (const attr of attrs) {
				this.setIncidence(object, attr, true);
			}
			return this;
		},

		build(): FormalContext<G, M> {
			const frozenObjects = Object.freeze([...objects]);
			const frozenAttributes = Object.freeze([...attributes]);
			const frozenIncidence = new Map<G, Set<M>>();
			for (const [g, attrs] of incidence) {
				frozenIncidence.set(g, new Set(attrs));
			}

			return Object.freeze({
				id,
				name,
				objects: frozenObjects,
				attributes: frozenAttributes,

				hasAttribute(object: G, attribute: M): boolean {
					return frozenIncidence.get(object)?.has(attribute) ?? false;
				},

				attributesOf(object: G): Set<M> {
					return new Set(frozenIncidence.get(object) ?? []);
				},

				objectsHaving(attribute: M): Set<G> {
					const result = new Set<G>();
					for (const [g, attrs] of frozenIncidence) {
						if (attrs.has(attribute)) {
							result.add(g);
						}
					}
					return result;
				},
			});
		},
	};
}

/**
 * Create a formal context from a cross-table (matrix)
 *
 * @param id - Context identifier
 * @param name - Context name
 * @param objects - Array of object identifiers
 * @param attributes - Array of attribute identifiers
 * @param matrix - Boolean matrix where matrix[i][j] = true iff object i has attribute j
 */
export function createFormalContextFromMatrix<G = string, M = string>(
	id: string,
	name: string,
	objects: readonly G[],
	attributes: readonly M[],
	matrix: readonly (readonly boolean[])[],
): FormalContext<G, M> {
	const builder = createFormalContextBuilder<G, M>(id, name);

	for (let i = 0; i < objects.length; i++) {
		const obj = objects[i]!;
		builder.addObject(obj);
		for (let j = 0; j < attributes.length; j++) {
			if (matrix[i]?.[j]) {
				builder.setIncidence(obj, attributes[j]!);
			}
		}
	}

	// Ensure all attributes are added even if no object has them
	for (const attr of attributes) {
		builder.addAttribute(attr);
	}

	return builder.build();
}

// =============================================================================
// SECTION 2: DERIVATION OPERATORS
// =============================================================================

/**
 * Derivation operator A' for objects: get attributes common to ALL objects in A
 *
 * A' = {m ∈ M | ∀g ∈ A: gIm}
 *
 * If A is empty, returns all attributes (vacuous truth).
 */
export function deriveAttributes<G, M>(context: FormalContext<G, M>, objects: Set<G>): Set<M> {
	if (objects.size === 0) {
		// Empty set derives to all attributes (vacuous truth)
		return new Set(context.attributes);
	}

	let result: Set<M> | null = null;

	for (const g of objects) {
		const attrs = context.attributesOf(g);
		if (result === null) {
			result = new Set(attrs);
		} else {
			// Intersect: keep only attributes common to all objects
			for (const m of result) {
				if (!attrs.has(m)) {
					result.delete(m);
				}
			}
		}
	}

	return result ?? new Set();
}

/**
 * Derivation operator B' for attributes: get objects having ALL attributes in B
 *
 * B' = {g ∈ G | ∀m ∈ B: gIm}
 *
 * If B is empty, returns all objects (vacuous truth).
 */
export function deriveObjects<G, M>(context: FormalContext<G, M>, attributes: Set<M>): Set<G> {
	if (attributes.size === 0) {
		// Empty set derives to all objects (vacuous truth)
		return new Set(context.objects);
	}

	const result = new Set<G>();

	for (const g of context.objects) {
		let hasAll = true;
		for (const m of attributes) {
			if (!context.hasAttribute(g, m)) {
				hasAll = false;
				break;
			}
		}
		if (hasAll) {
			result.add(g);
		}
	}

	return result;
}

/**
 * Closure operator A'' (derive attributes, then derive objects back)
 *
 * This gives the largest extent containing A with the same intent.
 */
export function closureObjects<G, M>(context: FormalContext<G, M>, objects: Set<G>): Set<G> {
	const intent = deriveAttributes(context, objects);
	return deriveObjects(context, intent);
}

/**
 * Closure operator B'' (derive objects, then derive attributes back)
 *
 * This gives the largest intent contained in B with the same extent.
 */
export function closureAttributes<G, M>(context: FormalContext<G, M>, attributes: Set<M>): Set<M> {
	const extent = deriveObjects(context, attributes);
	return deriveAttributes(context, extent);
}

// =============================================================================
// SECTION 3: FORMAL CONCEPTS
// =============================================================================

/**
 * A formal concept (A, B) where A' = B and B' = A
 */
export interface FormalConcept<G = string, M = string> {
	/** Extent: the objects belonging to this concept */
	readonly extent: ReadonlySet<G>;

	/** Intent: the attributes characterizing this concept */
	readonly intent: ReadonlySet<M>;
}

/**
 * Create a formal concept from an extent (objects)
 * Computes the intent automatically as A'
 */
export function conceptFromExtent<G, M>(
	context: FormalContext<G, M>,
	extent: Set<G>,
): FormalConcept<G, M> {
	const intent = deriveAttributes(context, extent);
	// Verify closure: the closed extent should equal the original if it's valid
	const closedExtent = deriveObjects(context, intent);

	return {
		extent: closedExtent,
		intent,
	};
}

/**
 * Create a formal concept from an intent (attributes)
 * Computes the extent automatically as B'
 */
export function conceptFromIntent<G, M>(
	context: FormalContext<G, M>,
	intent: Set<M>,
): FormalConcept<G, M> {
	const extent = deriveObjects(context, intent);
	// Verify closure: the closed intent should equal the original if it's valid
	const closedIntent = deriveAttributes(context, extent);

	return {
		extent,
		intent: closedIntent,
	};
}

/**
 * Check if a pair (A, B) is a valid formal concept
 */
export function isValidConcept<G, M>(
	context: FormalContext<G, M>,
	extent: Set<G>,
	intent: Set<M>,
): boolean {
	const derivedIntent = deriveAttributes(context, extent);
	const derivedExtent = deriveObjects(context, intent);

	// Check A' = B
	if (derivedIntent.size !== intent.size) return false;
	for (const m of intent) {
		if (!derivedIntent.has(m)) return false;
	}

	// Check B' = A
	if (derivedExtent.size !== extent.size) return false;
	for (const g of extent) {
		if (!derivedExtent.has(g)) return false;
	}

	return true;
}

/**
 * Compare two concepts by subconcept ordering
 *
 * (A₁, B₁) ≤ (A₂, B₂) ⟺ A₁ ⊆ A₂ ⟺ B₁ ⊇ B₂
 */
export function compareConcepts<G, M>(c1: FormalConcept<G, M>, c2: FormalConcept<G, M>): Ordering {
	// Check if c1.extent ⊆ c2.extent
	let c1SubsetC2 = true;
	for (const g of c1.extent) {
		if (!c2.extent.has(g)) {
			c1SubsetC2 = false;
			break;
		}
	}

	// Check if c2.extent ⊆ c1.extent
	let c2SubsetC1 = true;
	for (const g of c2.extent) {
		if (!c1.extent.has(g)) {
			c2SubsetC1 = false;
			break;
		}
	}

	if (c1SubsetC2 && c2SubsetC1) {
		return Ordering.EQUAL;
	}
	if (c1SubsetC2) {
		return Ordering.LESS;
	}
	if (c2SubsetC1) {
		return Ordering.GREATER;
	}
	return Ordering.INCOMPARABLE;
}

// =============================================================================
// SECTION 4: CONCEPT LATTICE
// =============================================================================

/**
 * The concept lattice B(K) of a formal context K
 */
export interface ConceptLattice<G = string, M = string> {
	/** The underlying formal context */
	readonly context: FormalContext<G, M>;

	/** All concepts in the lattice */
	readonly concepts: readonly FormalConcept<G, M>[];

	/** The top concept (G, G') — contains all objects */
	readonly top: FormalConcept<G, M>;

	/** The bottom concept (M', M) — has all attributes */
	readonly bottom: FormalConcept<G, M>;

	/** Get direct subconcepts (immediate predecessors) */
	subconcepts(concept: FormalConcept<G, M>): FormalConcept<G, M>[];

	/** Get direct superconcepts (immediate successors) */
	superconcepts(concept: FormalConcept<G, M>): FormalConcept<G, M>[];

	/** Find the concept with a given extent (or undefined) */
	findByExtent(extent: Set<G>): FormalConcept<G, M> | undefined;

	/** Find the concept with a given intent (or undefined) */
	findByIntent(intent: Set<M>): FormalConcept<G, M> | undefined;

	/** Join of two concepts */
	join(c1: FormalConcept<G, M>, c2: FormalConcept<G, M>): FormalConcept<G, M>;

	/** Meet of two concepts */
	meet(c1: FormalConcept<G, M>, c2: FormalConcept<G, M>): FormalConcept<G, M>;
}

/**
 * Compute all formal concepts of a context using the Basic Algorithm
 *
 * This is O(|G| × |M| × |B(K)|) — efficient for small to medium contexts.
 * For large contexts, use InClose or similar optimized algorithms.
 */
export function computeConceptLattice<G, M>(context: FormalContext<G, M>): ConceptLattice<G, M> {
	const concepts: FormalConcept<G, M>[] = [];
	const conceptMap = new Map<string, FormalConcept<G, M>>();

	// Helper to create a unique key for an extent
	function extentKey(extent: ReadonlySet<G>): string {
		return [...extent].sort().join(",");
	}

	// Helper to create a unique key for an intent
	function intentKey(intent: ReadonlySet<M>): string {
		return [...intent].sort().join(",");
	}

	// Generate all concepts by iterating through object subsets
	// Using the "next closure" approach (simplified)
	function generateConcepts(): void {
		// Start with concept from empty extent (gives all attributes)
		const visited = new Set<string>();

		function visit(extent: Set<G>): void {
			const key = extentKey(extent);
			if (visited.has(key)) return;

			const closedExtent = closureObjects(context, extent);
			const closedKey = extentKey(closedExtent);

			if (!visited.has(closedKey)) {
				visited.add(closedKey);
				const intent = deriveAttributes(context, closedExtent);
				const concept: FormalConcept<G, M> = {
					extent: closedExtent,
					intent,
				};
				concepts.push(concept);
				conceptMap.set(closedKey, concept);

				// Generate subconcepts by adding each possible object
				for (const g of context.objects) {
					if (!closedExtent.has(g)) {
						const newExtent = new Set(closedExtent);
						newExtent.add(g);
						visit(newExtent);
					}
				}
			}
		}

		// Start with all objects (top concept)
		visit(new Set(context.objects));

		// Also start with empty set (bottom concept)
		visit(new Set());

		// And start with each single object
		for (const g of context.objects) {
			visit(new Set([g]));
		}
	}

	generateConcepts();

	// Sort concepts by extent size (smaller extents first = lower in lattice)
	concepts.sort((a, b) => a.extent.size - b.extent.size);

	// Find top and bottom
	const top = concepts.find((c) => c.extent.size === context.objects.length)!;
	const bottom = concepts.find((c) => c.intent.size === context.attributes.length) ?? concepts[0]!;

	return {
		context,
		concepts: Object.freeze(concepts),
		top,
		bottom,

		subconcepts(concept: FormalConcept<G, M>): FormalConcept<G, M>[] {
			const result: FormalConcept<G, M>[] = [];
			for (const c of concepts) {
				if (compareConcepts(c, concept) === Ordering.LESS) {
					// Check if it's immediate (no concept between them)
					let isImmediate = true;
					for (const other of concepts) {
						if (other !== c && other !== concept) {
							if (
								compareConcepts(c, other) === Ordering.LESS &&
								compareConcepts(other, concept) === Ordering.LESS
							) {
								isImmediate = false;
								break;
							}
						}
					}
					if (isImmediate) {
						result.push(c);
					}
				}
			}
			return result;
		},

		superconcepts(concept: FormalConcept<G, M>): FormalConcept<G, M>[] {
			const result: FormalConcept<G, M>[] = [];
			for (const c of concepts) {
				if (compareConcepts(concept, c) === Ordering.LESS) {
					// Check if it's immediate
					let isImmediate = true;
					for (const other of concepts) {
						if (other !== c && other !== concept) {
							if (
								compareConcepts(concept, other) === Ordering.LESS &&
								compareConcepts(other, c) === Ordering.LESS
							) {
								isImmediate = false;
								break;
							}
						}
					}
					if (isImmediate) {
						result.push(c);
					}
				}
			}
			return result;
		},

		findByExtent(extent: Set<G>): FormalConcept<G, M> | undefined {
			return conceptMap.get(extentKey(extent));
		},

		findByIntent(intent: Set<M>): FormalConcept<G, M> | undefined {
			const key = intentKey(intent);
			for (const c of concepts) {
				if (intentKey(c.intent) === key) {
					return c;
				}
			}
			return undefined;
		},

		join(c1: FormalConcept<G, M>, c2: FormalConcept<G, M>): FormalConcept<G, M> {
			// Join: ((A₁ ∪ A₂)'', A₁' ∩ A₂')
			const unionExtent = new Set([...c1.extent, ...c2.extent]);
			return conceptFromExtent(context, unionExtent);
		},

		meet(c1: FormalConcept<G, M>, c2: FormalConcept<G, M>): FormalConcept<G, M> {
			// Meet: (A₁ ∩ A₂, (B₁ ∪ B₂)'')
			const intersectExtent = new Set<G>();
			for (const g of c1.extent) {
				if (c2.extent.has(g)) {
					intersectExtent.add(g);
				}
			}
			return conceptFromExtent(context, intersectExtent);
		},
	};
}

// =============================================================================
// SECTION 5: ATTRIBUTE IMPLICATIONS
// =============================================================================

/**
 * An attribute implication X → Y
 *
 * Reads: "Every object having all attributes in X also has all attributes in Y"
 */
export interface AttributeImplication<M = string> {
	/** Premise (antecedent) */
	readonly premise: ReadonlySet<M>;

	/** Conclusion (consequent) */
	readonly conclusion: ReadonlySet<M>;

	/** Support: fraction of objects where premise holds */
	readonly support: number;

	/** Confidence: always 1.0 for valid implications */
	readonly confidence: number;
}

/**
 * Check if an implication X → Y holds in a context
 *
 * X → Y holds iff X' ⊆ Y' (objects having X also have Y)
 * Equivalently: X'' ⊇ Y (closure of X includes Y)
 */
export function holdsImplication<G, M>(
	context: FormalContext<G, M>,
	premise: Set<M>,
	conclusion: Set<M>,
): boolean {
	const premiseExtent = deriveObjects(context, premise);
	const conclusionExtent = deriveObjects(context, conclusion);

	// X' ⊆ Y' means every object with all of X has all of Y
	for (const g of premiseExtent) {
		if (!conclusionExtent.has(g)) {
			return false;
		}
	}
	return true;
}

/**
 * Compute attribute implications with support threshold
 *
 * @param context - The formal context
 * @param minSupport - Minimum support (0-1) for including an implication
 * @returns Array of implications that hold in the context
 */
export function computeImplications<G, M>(
	context: FormalContext<G, M>,
	minSupport = 0,
): AttributeImplication<M>[] {
	const implications: AttributeImplication<M>[] = [];
	const lattice = computeConceptLattice(context);

	// For each concept, check implications from its intent
	for (const concept of lattice.concepts) {
		const intent = concept.intent;
		const support = concept.extent.size / context.objects.length;

		if (support >= minSupport) {
			// Find attributes implied by the intent but not in it
			const closedIntent = closureAttributes(context, new Set(intent));

			// If closure is larger, we have an implication
			if (closedIntent.size > intent.size) {
				const newAttributes = new Set<M>();
				for (const m of closedIntent) {
					if (!intent.has(m)) {
						newAttributes.add(m);
					}
				}

				if (newAttributes.size > 0) {
					implications.push({
						premise: intent,
						conclusion: newAttributes,
						support,
						confidence: 1.0,
					});
				}
			}
		}
	}

	return implications;
}

/**
 * Compute the stem base (pseudo-intents) for implications
 *
 * This is a simplified version; full Guigues-Duquenne requires
 * more sophisticated pseudo-intent computation.
 */
export function computeStemBase<G, M>(context: FormalContext<G, M>): AttributeImplication<M>[] {
	return computeImplications(context, 0).filter((impl) => impl.premise.size > 0);
}

// =============================================================================
// SECTION 6: DELTA COMPUTATION
// =============================================================================

/**
 * Compute the attribute delta between two objects
 *
 * Delta(target, baseline) = target' \ baseline'
 * = attributes required by target but not by baseline
 */
export function computeAttributeDelta<G, M>(
	context: FormalContext<G, M>,
	target: G,
	baseline: G,
): Set<M> {
	const targetAttrs = context.attributesOf(target);
	const baselineAttrs = context.attributesOf(baseline);

	const delta = new Set<M>();
	for (const m of targetAttrs) {
		if (!baselineAttrs.has(m)) {
			delta.add(m);
		}
	}
	return delta;
}

/**
 * Compute the symmetric difference between two objects
 *
 * Returns { added, removed } where:
 * - added = target' \ baseline' (new requirements)
 * - removed = baseline' \ target' (dropped requirements)
 */
export function computeAttributeSymmetricDelta<G, M>(
	context: FormalContext<G, M>,
	target: G,
	baseline: G,
): { added: Set<M>; removed: Set<M> } {
	const targetAttrs = context.attributesOf(target);
	const baselineAttrs = context.attributesOf(baseline);

	const added = new Set<M>();
	const removed = new Set<M>();

	for (const m of targetAttrs) {
		if (!baselineAttrs.has(m)) {
			added.add(m);
		}
	}

	for (const m of baselineAttrs) {
		if (!targetAttrs.has(m)) {
			removed.add(m);
		}
	}

	return { added, removed };
}

/**
 * Compute attributes shared by a set of objects
 *
 * This is simply the derivation operator A' for the set.
 */
export function computeSharedAttributes<G, M>(
	context: FormalContext<G, M>,
	objects: Set<G>,
): Set<M> {
	return deriveAttributes(context, objects);
}

/**
 * Find objects that have all of the specified attributes
 *
 * This is simply the derivation operator B' for the set.
 */
export function findObjectsWithAttributes<G, M>(
	context: FormalContext<G, M>,
	attributes: Set<M>,
): Set<G> {
	return deriveObjects(context, attributes);
}

// =============================================================================
// SECTION 7: CONTEXT OPERATIONS
// =============================================================================

/**
 * Subcontext: restrict to a subset of objects and/or attributes
 */
export function subcontext<G, M>(
	context: FormalContext<G, M>,
	objects?: Set<G>,
	attributes?: Set<M>,
): FormalContext<G, M> {
	const filteredObjects = objects
		? [...objects].filter((g) => context.objects.includes(g))
		: [...context.objects];

	const filteredAttributes = attributes
		? [...attributes].filter((m) => context.attributes.includes(m))
		: [...context.attributes];

	const builder = createFormalContextBuilder<G, M>(
		`${context.id}_sub`,
		`${context.name} (subcontext)`,
	);

	for (const g of filteredObjects) {
		builder.addObject(g);
		for (const m of filteredAttributes) {
			if (context.hasAttribute(g, m)) {
				builder.setIncidence(g, m);
			}
		}
	}

	for (const m of filteredAttributes) {
		builder.addAttribute(m);
	}

	return builder.build();
}

/**
 * Apposition: combine two contexts with the same objects
 *
 * K₁ | K₂ where objects are shared but attributes are disjoint union
 */
export function apposition<G, M1, M2>(
	context1: FormalContext<G, M1>,
	context2: FormalContext<G, M2>,
): FormalContext<G, M1 | M2> {
	// Verify same objects
	const objects1 = new Set(context1.objects);
	const objects2 = new Set(context2.objects);
	if (objects1.size !== objects2.size || ![...objects1].every((g) => objects2.has(g))) {
		throw new Error("Apposition requires contexts with identical object sets");
	}

	const builder = createFormalContextBuilder<G, M1 | M2>(
		`${context1.id}|${context2.id}`,
		`${context1.name} | ${context2.name}`,
	);

	for (const g of context1.objects) {
		builder.addObject(g);

		for (const m of context1.attributes) {
			if (context1.hasAttribute(g, m)) {
				builder.setIncidence(g, m);
			}
		}

		for (const m of context2.attributes) {
			if (context2.hasAttribute(g, m)) {
				builder.setIncidence(g, m);
			}
		}
	}

	return builder.build();
}

/**
 * Subposition: combine two contexts with the same attributes
 *
 * K₁ / K₂ where attributes are shared but objects are disjoint union
 */
export function subposition<G1, G2, M>(
	context1: FormalContext<G1, M>,
	context2: FormalContext<G2, M>,
): FormalContext<G1 | G2, M> {
	const builder = createFormalContextBuilder<G1 | G2, M>(
		`${context1.id}/${context2.id}`,
		`${context1.name} / ${context2.name}`,
	);

	// Add all attributes
	for (const m of context1.attributes) {
		builder.addAttribute(m);
	}
	for (const m of context2.attributes) {
		builder.addAttribute(m);
	}

	// Add objects from context1
	for (const g of context1.objects) {
		builder.addObject(g);
		for (const m of context1.attributes) {
			if (context1.hasAttribute(g, m)) {
				builder.setIncidence(g, m);
			}
		}
	}

	// Add objects from context2
	for (const g of context2.objects) {
		builder.addObject(g);
		for (const m of context2.attributes) {
			if (context2.hasAttribute(g, m)) {
				builder.setIncidence(g, m);
			}
		}
	}

	return builder.build();
}

// =============================================================================
// SECTION 8: VISUALIZATION AND DEBUGGING
// =============================================================================

/**
 * Generate a cross-table representation of a context
 */
export function contextToCrossTable<G, M>(
	context: FormalContext<G, M>,
	options?: { objectFormatter?: (g: G) => string; attributeFormatter?: (m: M) => string },
): string {
	const formatObject = options?.objectFormatter ?? String;
	const formatAttribute = options?.attributeFormatter ?? String;

	const objectStrs = context.objects.map(formatObject);
	const attrStrs = context.attributes.map(formatAttribute);

	// Calculate column widths
	const objWidth = Math.max(...objectStrs.map((s) => s.length), 6);
	const attrWidth = Math.max(...attrStrs.map((s) => s.length), 1);

	const lines: string[] = [];

	// Header row
	const header = `${" ".repeat(objWidth)} │ ${attrStrs.map((a) => a.padEnd(attrWidth)).join(" ")}`;
	lines.push(header);

	// Separator
	lines.push(`${"─".repeat(objWidth)}─┼─${"─".repeat((attrWidth + 1) * attrStrs.length - 1)}`);

	// Data rows
	for (let i = 0; i < context.objects.length; i++) {
		const obj = context.objects[i]!;
		const objStr = objectStrs[i]?.padEnd(objWidth);
		const cells: string[] = [];

		for (const attr of context.attributes) {
			const mark = context.hasAttribute(obj, attr) ? "×" : "·";
			cells.push(mark.padStart(Math.floor(attrWidth / 2) + 1).padEnd(attrWidth));
		}

		lines.push(`${objStr} │ ${cells.join(" ")}`);
	}

	return lines.join("\n");
}

/**
 * Describe a concept in human-readable form
 */
export function describeConcept<G, M>(
	concept: FormalConcept<G, M>,
	options?: { objectFormatter?: (g: G) => string; attributeFormatter?: (m: M) => string },
): string {
	const formatObject = options?.objectFormatter ?? String;
	const formatAttribute = options?.attributeFormatter ?? String;

	const extentStr = [...concept.extent].map(formatObject).join(", ") || "∅";
	const intentStr = [...concept.intent].map(formatAttribute).join(", ") || "∅";

	return `({${extentStr}}, {${intentStr}})`;
}

/**
 * Generate a summary of the concept lattice
 */
export function describeConceptLattice<G, M>(
	lattice: ConceptLattice<G, M>,
	options?: { objectFormatter?: (g: G) => string; attributeFormatter?: (m: M) => string },
): string {
	const lines: string[] = [
		`Concept Lattice for "${lattice.context.name}"`,
		`Objects: ${lattice.context.objects.length}`,
		`Attributes: ${lattice.context.attributes.length}`,
		`Concepts: ${lattice.concepts.length}`,
		"",
		"Concepts (ordered by extent size):",
	];

	for (const concept of lattice.concepts) {
		const marker = concept === lattice.top ? " [⊤]" : concept === lattice.bottom ? " [⊥]" : "";
		lines.push(`  ${describeConcept(concept, options)}${marker}`);
	}

	return lines.join("\n");
}

// =============================================================================
// SECTION 9: VALIDATION
// =============================================================================

/**
 * Validate a formal context for correctness
 */
export function validateContext<G, M>(
	context: FormalContext<G, M>,
): { valid: boolean; errors: string[] } {
	const errors: string[] = [];

	// Check for duplicate objects
	const objectSet = new Set(context.objects);
	if (objectSet.size !== context.objects.length) {
		errors.push("Context has duplicate objects");
	}

	// Check for duplicate attributes
	const attrSet = new Set(context.attributes);
	if (attrSet.size !== context.attributes.length) {
		errors.push("Context has duplicate attributes");
	}

	// Check incidence consistency
	for (const g of context.objects) {
		const attrs = context.attributesOf(g);
		for (const m of attrs) {
			if (!context.attributes.includes(m)) {
				errors.push(`Object ${String(g)} has attribute ${String(m)} not in attribute set`);
			}
		}
	}

	return { valid: errors.length === 0, errors };
}

/**
 * Validate that a concept lattice is well-formed
 */
export function validateConceptLattice<G, M>(
	lattice: ConceptLattice<G, M>,
): { valid: boolean; errors: string[] } {
	const errors: string[] = [];

	// Check each concept is valid
	for (const concept of lattice.concepts) {
		if (!isValidConcept(lattice.context, new Set(concept.extent), new Set(concept.intent))) {
			errors.push(`Invalid concept: ${describeConcept(concept)}`);
		}
	}

	// Check top and bottom
	if (lattice.top.extent.size !== lattice.context.objects.length) {
		errors.push("Top concept should contain all objects");
	}

	// Check ordering is consistent
	for (const c1 of lattice.concepts) {
		for (const c2 of lattice.concepts) {
			const cmp = compareConcepts(c1, c2);
			if (cmp === Ordering.LESS) {
				// c1 < c2 means c1.extent ⊂ c2.extent and c1.intent ⊃ c2.intent
				let extentSubset = true;
				for (const g of c1.extent) {
					if (!c2.extent.has(g)) {
						extentSubset = false;
						break;
					}
				}
				if (!extentSubset) {
					errors.push(
						`Ordering inconsistency: ${describeConcept(c1)} < ${describeConcept(c2)} but extent not subset`,
					);
				}
			}
		}
	}

	return { valid: errors.length === 0, errors };
}
