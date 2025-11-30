/**
 * Tests for Formal Concept Analysis Theory
 *
 * These tests verify the mathematical properties of FCA operations.
 */

import { describe, it, expect } from "vitest";
import {
	createFormalContextBuilder,
	createFormalContextFromMatrix,
	deriveAttributes,
	deriveObjects,
	closureObjects,
	closureAttributes,
	conceptFromExtent,
	conceptFromIntent,
	isValidConcept,
	compareConcepts,
	computeConceptLattice,
	holdsImplication,
	computeAttributeDelta,
	computeAttributeSymmetricDelta,
	computeSharedAttributes,
	contextToCrossTable,
	describeConcept,
	describeConceptLattice,
	validateContext,
	validateConceptLattice,
	subcontext,
	apposition,
	subposition,
} from "@shared/fca-theory";
import { Ordering } from "@shared/lattice-theory";

// =============================================================================
// TEST FIXTURES
// =============================================================================

/**
 * Classic FCA example: Living beings
 *
 * Objects: animals
 * Attributes: properties
 *
 *            | needs_water | lives_in_water | lives_on_land | has_limbs | monocotyledon | dicotyledon | can_move
 * -----------|-------------|----------------|---------------|-----------|---------------|-------------|----------
 * leech      |      ×      |       ×        |       ×       |           |               |             |     ×
 * bream      |      ×      |       ×        |               |     ×     |               |             |     ×
 * frog       |      ×      |       ×        |       ×       |     ×     |               |             |     ×
 * dog        |      ×      |                |       ×       |     ×     |               |             |     ×
 * spike_weed |      ×      |       ×        |               |           |       ×       |             |
 * reed       |      ×      |       ×        |       ×       |           |       ×       |             |
 * bean       |      ×      |                |       ×       |           |               |      ×      |
 * maize      |      ×      |                |       ×       |           |       ×       |             |
 */
function createLivingBeingsContext() {
	return createFormalContextFromMatrix(
		"living_beings",
		"Living Beings",
		["leech", "bream", "frog", "dog", "spike_weed", "reed", "bean", "maize"],
		["needs_water", "lives_in_water", "lives_on_land", "has_limbs", "monocotyledon", "dicotyledon", "can_move"],
		[
			[true, true, true, false, false, false, true], // leech
			[true, true, false, true, false, false, true], // bream
			[true, true, true, true, false, false, true], // frog
			[true, false, true, true, false, false, true], // dog
			[true, true, false, false, true, false, false], // spike_weed
			[true, true, true, false, true, false, false], // reed
			[true, false, true, false, false, true, false], // bean
			[true, false, true, false, true, false, false], // maize
		]
	);
}

/**
 * Simple integrity levels context for testing requirements
 *
 * Objects: integrity levels (L0, L1, L2, L3)
 * Attributes: requirements (Forms)
 */
function createIntegrityContext() {
	const builder = createFormalContextBuilder<string, string>("integrity", "Integrity Levels");

	// L0: No special requirements
	builder.addObjectAttributes("L0", []);

	// L1: Basic requirements
	builder.addObjectAttributes("L1", ["unit_test", "code_review"]);

	// L2: Standard requirements (includes L1)
	builder.addObjectAttributes("L2", ["unit_test", "code_review", "integration_test", "static_analysis"]);

	// L3: High requirements (includes L2)
	builder.addObjectAttributes("L3", [
		"unit_test",
		"code_review",
		"integration_test",
		"static_analysis",
		"formal_review",
		"coverage_80",
		"fault_injection",
	]);

	return builder.build();
}

// =============================================================================
// SECTION 1: FORMAL CONTEXT TESTS
// =============================================================================

describe("FormalContext", () => {
	describe("creation", () => {
		it("should create context from builder", () => {
			const context = createIntegrityContext();

			expect(context.objects).toHaveLength(4);
			expect(context.attributes).toContain("unit_test");
			expect(context.hasAttribute("L1", "unit_test")).toBe(true);
			expect(context.hasAttribute("L0", "unit_test")).toBe(false);
		});

		it("should create context from matrix", () => {
			const context = createLivingBeingsContext();

			expect(context.objects).toHaveLength(8);
			expect(context.attributes).toHaveLength(7);
			expect(context.hasAttribute("dog", "has_limbs")).toBe(true);
			expect(context.hasAttribute("leech", "has_limbs")).toBe(false);
		});

		it("should correctly report attributesOf", () => {
			const context = createIntegrityContext();

			const l2Attrs = context.attributesOf("L2");
			expect(l2Attrs.has("unit_test")).toBe(true);
			expect(l2Attrs.has("integration_test")).toBe(true);
			expect(l2Attrs.has("fault_injection")).toBe(false);
		});

		it("should correctly report objectsHaving", () => {
			const context = createIntegrityContext();

			const withUnitTest = context.objectsHaving("unit_test");
			expect(withUnitTest.has("L1")).toBe(true);
			expect(withUnitTest.has("L2")).toBe(true);
			expect(withUnitTest.has("L3")).toBe(true);
			expect(withUnitTest.has("L0")).toBe(false);
		});
	});

	describe("validation", () => {
		it("should validate a correct context", () => {
			const context = createIntegrityContext();
			const result = validateContext(context);

			expect(result.valid).toBe(true);
			expect(result.errors).toHaveLength(0);
		});
	});
});

// =============================================================================
// SECTION 2: DERIVATION OPERATORS TESTS
// =============================================================================

describe("Derivation Operators", () => {
	describe("deriveAttributes (A')", () => {
		it("should return all attributes for empty object set", () => {
			const context = createIntegrityContext();
			const result = deriveAttributes(context, new Set());

			expect(result.size).toBe(context.attributes.length);
		});

		it("should return attributes common to all objects in set", () => {
			const context = createIntegrityContext();

			// L1 and L2 both have unit_test and code_review
			const result = deriveAttributes(context, new Set(["L1", "L2"]));

			expect(result.has("unit_test")).toBe(true);
			expect(result.has("code_review")).toBe(true);
			// L2 has integration_test but L1 doesn't
			expect(result.has("integration_test")).toBe(false);
		});

		it("should return single object's attributes", () => {
			const context = createIntegrityContext();
			const result = deriveAttributes(context, new Set(["L2"]));

			expect(result.has("unit_test")).toBe(true);
			expect(result.has("integration_test")).toBe(true);
			expect(result.has("fault_injection")).toBe(false);
		});
	});

	describe("deriveObjects (B')", () => {
		it("should return all objects for empty attribute set", () => {
			const context = createIntegrityContext();
			const result = deriveObjects(context, new Set());

			expect(result.size).toBe(context.objects.length);
		});

		it("should return objects having all specified attributes", () => {
			const context = createIntegrityContext();

			// Only L2 and L3 have both unit_test and integration_test
			const result = deriveObjects(context, new Set(["unit_test", "integration_test"]));

			expect(result.has("L2")).toBe(true);
			expect(result.has("L3")).toBe(true);
			expect(result.has("L1")).toBe(false);
			expect(result.has("L0")).toBe(false);
		});
	});

	describe("closure operators", () => {
		it("should compute closure correctly (A'' ⊇ A)", () => {
			const context = createIntegrityContext();

			const original = new Set(["L1"]);
			const closed = closureObjects(context, original);

			// Closure should contain original
			for (const g of original) {
				expect(closed.has(g)).toBe(true);
			}
		});

		it("should be idempotent (A'''' = A'')", () => {
			const context = createIntegrityContext();

			const original = new Set(["L1", "L2"]);
			const firstClosure = closureObjects(context, original);
			const secondClosure = closureObjects(context, firstClosure);

			expect(firstClosure.size).toBe(secondClosure.size);
			for (const g of firstClosure) {
				expect(secondClosure.has(g)).toBe(true);
			}
		});
	});
});

// =============================================================================
// SECTION 3: FORMAL CONCEPT TESTS
// =============================================================================

describe("FormalConcept", () => {
	describe("creation", () => {
		it("should create valid concept from extent", () => {
			const context = createIntegrityContext();
			const concept = conceptFromExtent(context, new Set(["L2", "L3"]));

			// Both L2 and L3 have these attributes
			expect(concept.intent.has("unit_test")).toBe(true);
			expect(concept.intent.has("integration_test")).toBe(true);

			// The extent should be the closure
			expect(concept.extent.has("L2")).toBe(true);
			expect(concept.extent.has("L3")).toBe(true);
		});

		it("should create valid concept from intent", () => {
			const context = createIntegrityContext();
			const concept = conceptFromIntent(context, new Set(["unit_test"]));

			// All levels with unit_test
			expect(concept.extent.has("L1")).toBe(true);
			expect(concept.extent.has("L2")).toBe(true);
			expect(concept.extent.has("L3")).toBe(true);
			expect(concept.extent.has("L0")).toBe(false);
		});

		it("should validate that A' = B and B' = A", () => {
			const context = createIntegrityContext();
			const concept = conceptFromExtent(context, new Set(["L1", "L2", "L3"]));

			expect(isValidConcept(context, new Set(concept.extent), new Set(concept.intent))).toBe(true);
		});
	});

	describe("comparison", () => {
		it("should correctly compare concepts", () => {
			const context = createIntegrityContext();

			const c1 = conceptFromIntent(context, new Set(["unit_test", "fault_injection"]));
			const c2 = conceptFromIntent(context, new Set(["unit_test"]));

			// c1 has more attributes (smaller extent), so c1 < c2
			const cmp = compareConcepts(c1, c2);
			expect(cmp).toBe(Ordering.LESS);
		});

		it("should detect equal concepts", () => {
			const context = createIntegrityContext();

			const c1 = conceptFromExtent(context, new Set(["L2", "L3"]));
			const c2 = conceptFromExtent(context, new Set(["L2", "L3"]));

			expect(compareConcepts(c1, c2)).toBe(Ordering.EQUAL);
		});

		it("should detect incomparable concepts", () => {
			const context = createLivingBeingsContext();

			// Dog: land animal with limbs
			// Spike_weed: water plant
			const c1 = conceptFromExtent(context, new Set(["dog"]));
			const c2 = conceptFromExtent(context, new Set(["spike_weed"]));

			// These should be incomparable (neither is subset of other)
			expect(compareConcepts(c1, c2)).toBe(Ordering.INCOMPARABLE);
		});
	});
});

// =============================================================================
// SECTION 4: CONCEPT LATTICE TESTS
// =============================================================================

describe("ConceptLattice", () => {
	describe("computation", () => {
		it("should compute all concepts", () => {
			const context = createIntegrityContext();
			const lattice = computeConceptLattice(context);

			expect(lattice.concepts.length).toBeGreaterThan(0);
			expect(lattice.top).toBeDefined();
			expect(lattice.bottom).toBeDefined();
		});

		it("should have top containing all objects", () => {
			const context = createIntegrityContext();
			const lattice = computeConceptLattice(context);

			expect(lattice.top.extent.size).toBe(context.objects.length);
		});

		it("should have bottom with all attributes in closure", () => {
			const context = createIntegrityContext();
			const lattice = computeConceptLattice(context);

			// Bottom concept has the smallest extent (possibly empty) and largest intent
			expect(lattice.bottom).toBeDefined();
		});

		it("should pass validation", () => {
			const context = createIntegrityContext();
			const lattice = computeConceptLattice(context);
			const result = validateConceptLattice(lattice);

			expect(result.valid).toBe(true);
		});
	});

	describe("navigation", () => {
		it("should find subconcepts", () => {
			const context = createIntegrityContext();
			const lattice = computeConceptLattice(context);

			const subs = lattice.subconcepts(lattice.top);
			expect(subs.length).toBeGreaterThan(0);

			// All subconcepts should have smaller extent
			for (const sub of subs) {
				expect(sub.extent.size).toBeLessThan(lattice.top.extent.size);
			}
		});

		it("should find superconcepts", () => {
			const context = createIntegrityContext();
			const lattice = computeConceptLattice(context);

			const supers = lattice.superconcepts(lattice.bottom);
			expect(supers.length).toBeGreaterThan(0);

			// All superconcepts should have larger extent
			for (const sup of supers) {
				expect(sup.extent.size).toBeGreaterThan(lattice.bottom.extent.size);
			}
		});
	});

	describe("operations", () => {
		it("should compute join correctly", () => {
			const context = createIntegrityContext();
			const lattice = computeConceptLattice(context);

			const c1 = conceptFromExtent(context, new Set(["L1"]));
			const c2 = conceptFromExtent(context, new Set(["L2"]));
			const joined = lattice.join(c1, c2);

			// Join should contain both L1 and L2
			expect(joined.extent.has("L1")).toBe(true);
			expect(joined.extent.has("L2")).toBe(true);
		});

		it("should compute meet correctly", () => {
			const context = createIntegrityContext();
			const lattice = computeConceptLattice(context);

			const c1 = conceptFromIntent(context, new Set(["unit_test"]));
			const c2 = conceptFromIntent(context, new Set(["code_review"]));
			const met = lattice.meet(c1, c2);

			// Meet should have intersection of extents
			expect(met.extent.size).toBeLessThanOrEqual(Math.min(c1.extent.size, c2.extent.size));
		});
	});
});

// =============================================================================
// SECTION 5: IMPLICATION TESTS
// =============================================================================

describe("Implications", () => {
	describe("holdsImplication", () => {
		it("should verify valid implications", () => {
			const context = createIntegrityContext();

			// fault_injection → unit_test (everything with fault_injection has unit_test)
			const holds = holdsImplication(context, new Set(["fault_injection"]), new Set(["unit_test"]));
			expect(holds).toBe(true);
		});

		it("should reject invalid implications", () => {
			const context = createIntegrityContext();

			// unit_test → fault_injection does NOT hold (L1, L2 have unit_test but not fault_injection)
			const holds = holdsImplication(context, new Set(["unit_test"]), new Set(["fault_injection"]));
			expect(holds).toBe(false);
		});

		it("should handle empty premise (trivially true)", () => {
			const context = createIntegrityContext();

			// ∅ → X only holds if X is in every object (or X is empty)
			const holds = holdsImplication(context, new Set(), new Set(["unit_test"]));
			// Not all objects have unit_test (L0 doesn't), so this should be false
			expect(holds).toBe(false);
		});
	});
});

// =============================================================================
// SECTION 6: DELTA COMPUTATION TESTS
// =============================================================================

describe("Delta Computation", () => {
	describe("computeAttributeDelta", () => {
		it("should compute what target has that baseline doesn't", () => {
			const context = createIntegrityContext();

			// What does L2 require that L1 doesn't?
			const delta = computeAttributeDelta(context, "L2", "L1");

			expect(delta.has("integration_test")).toBe(true);
			expect(delta.has("static_analysis")).toBe(true);
			expect(delta.has("unit_test")).toBe(false); // Both have it
		});

		it("should return empty set when target has subset of baseline", () => {
			const context = createIntegrityContext();

			// What does L1 require that L2 doesn't?
			const delta = computeAttributeDelta(context, "L1", "L2");

			expect(delta.size).toBe(0);
		});

		it("should handle same object (empty delta)", () => {
			const context = createIntegrityContext();

			const delta = computeAttributeDelta(context, "L2", "L2");
			expect(delta.size).toBe(0);
		});
	});

	describe("computeAttributeSymmetricDelta", () => {
		it("should compute both added and removed", () => {
			const context = createIntegrityContext();

			const { added, removed } = computeAttributeSymmetricDelta(context, "L2", "L1");

			expect(added.has("integration_test")).toBe(true);
			expect(added.has("static_analysis")).toBe(true);
			expect(removed.size).toBe(0); // L1 is subset of L2
		});
	});

	describe("computeSharedAttributes", () => {
		it("should find attributes common to all specified objects", () => {
			const context = createIntegrityContext();

			const shared = computeSharedAttributes(context, new Set(["L1", "L2", "L3"]));

			expect(shared.has("unit_test")).toBe(true);
			expect(shared.has("code_review")).toBe(true);
			expect(shared.has("integration_test")).toBe(false); // L1 doesn't have it
		});
	});
});

// =============================================================================
// SECTION 7: CONTEXT OPERATIONS TESTS
// =============================================================================

describe("Context Operations", () => {
	describe("subcontext", () => {
		it("should create subcontext with specified objects", () => {
			const context = createIntegrityContext();
			const sub = subcontext(context, new Set(["L1", "L2"]));

			expect(sub.objects).toHaveLength(2);
			expect(sub.objects).toContain("L1");
			expect(sub.objects).toContain("L2");
		});

		it("should create subcontext with specified attributes", () => {
			const context = createIntegrityContext();
			const sub = subcontext(context, undefined, new Set(["unit_test", "code_review"]));

			expect(sub.attributes).toHaveLength(2);
			expect(sub.hasAttribute("L1", "unit_test")).toBe(true);
		});
	});

	describe("apposition", () => {
		it("should combine contexts with same objects", () => {
			const ctx1 = createFormalContextBuilder<string, string>("ctx1", "Context 1")
				.addObjectAttributes("A", ["x", "y"])
				.addObjectAttributes("B", ["x"])
				.build();

			const ctx2 = createFormalContextBuilder<string, string>("ctx2", "Context 2")
				.addObjectAttributes("A", ["p"])
				.addObjectAttributes("B", ["p", "q"])
				.build();

			const combined = apposition(ctx1, ctx2);

			expect(combined.objects).toHaveLength(2);
			expect(combined.hasAttribute("A", "x")).toBe(true);
			expect(combined.hasAttribute("A", "p")).toBe(true);
			expect(combined.hasAttribute("B", "q")).toBe(true);
		});
	});

	describe("subposition", () => {
		it("should combine contexts with same attributes", () => {
			const ctx1 = createFormalContextBuilder<string, string>("ctx1", "Context 1")
				.addObjectAttributes("A", ["x", "y"])
				.build();

			const ctx2 = createFormalContextBuilder<string, string>("ctx2", "Context 2")
				.addObjectAttributes("B", ["x", "z"])
				.addAttribute("y")
				.build();

			const combined = subposition(ctx1, ctx2);

			expect(combined.objects).toContain("A");
			expect(combined.objects).toContain("B");
			expect(combined.hasAttribute("A", "x")).toBe(true);
			expect(combined.hasAttribute("B", "x")).toBe(true);
		});
	});
});

// =============================================================================
// SECTION 8: VISUALIZATION TESTS
// =============================================================================

describe("Visualization", () => {
	describe("contextToCrossTable", () => {
		it("should generate readable cross-table", () => {
			const context = createIntegrityContext();
			const table = contextToCrossTable(context);

			expect(table).toContain("L0");
			expect(table).toContain("L1");
			expect(table).toContain("unit_test");
			expect(table).toContain("×"); // Has attribute marker
		});
	});

	describe("describeConcept", () => {
		it("should describe concept clearly", () => {
			const context = createIntegrityContext();
			const concept = conceptFromExtent(context, new Set(["L3"]));
			const desc = describeConcept(concept);

			expect(desc).toContain("L3");
			expect(desc).toContain("fault_injection");
		});
	});

	describe("describeConceptLattice", () => {
		it("should summarize lattice", () => {
			const context = createIntegrityContext();
			const lattice = computeConceptLattice(context);
			const desc = describeConceptLattice(lattice);

			expect(desc).toContain("Concept Lattice");
			expect(desc).toContain("Objects: 4");
			expect(desc).toContain("[⊤]"); // Top marker
		});
	});
});

// =============================================================================
// SECTION 9: GALOIS CONNECTION PROPERTY TESTS
// =============================================================================

describe("Galois Connection Properties", () => {
	it("should satisfy antitone property: A ⊆ B implies A' ⊇ B'", () => {
		const context = createIntegrityContext();

		const A = new Set(["L1"]);
		const B = new Set(["L1", "L2"]);

		const Aprime = deriveAttributes(context, A);
		const Bprime = deriveAttributes(context, B);

		// A ⊆ B, so A' ⊇ B'
		for (const m of Bprime) {
			expect(Aprime.has(m)).toBe(true);
		}
	});

	it("should satisfy extensivity: A ⊆ A''", () => {
		const context = createIntegrityContext();

		const A = new Set(["L1", "L2"]);
		const Adoubleprime = closureObjects(context, A);

		for (const g of A) {
			expect(Adoubleprime.has(g)).toBe(true);
		}
	});

	it("should satisfy idempotency: A'''' = A''", () => {
		const context = createIntegrityContext();

		const A = new Set(["L1"]);
		const Adoubleprime = closureObjects(context, A);
		const Aquadrupleprime = closureObjects(context, Adoubleprime);

		expect(Adoubleprime.size).toBe(Aquadrupleprime.size);
		for (const g of Adoubleprime) {
			expect(Aquadrupleprime.has(g)).toBe(true);
		}
	});
});

