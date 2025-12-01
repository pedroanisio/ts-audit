/**
 * Tests for Forms - Atomic Requirements
 */

import {
	ASSURANCE_CASE,
	CODE_REVIEW,
	FAULT_INJECTION,
	FORMS,
	// Form definitions
	FormCategory,
	MCDC_COV_100,
	REDUNDANCY_VOTING,
	STMT_COV_80,
	UNIT_TESTING,
	// Context and lattice
	buildIntegrityFormsContext,
	// Delta operations
	computeFormsDelta,
	computeFormsSymmetricDelta,
	computeSharedForms,
	extractAllForms,
	extractArchitectureForms,
	extractProcessForms,
	// Extraction functions
	extractTestingForms,
	generateDeltaReport,
	// Reporting
	generateFormReport,
	getDeltaFormsWithMetadata,
	getFormsForLevel,
	getIntegrityFormsContext,
	getIntegrityFormsLattice,
} from "@shared/forms";
import { describe, expect, it } from "vitest";

import {
	IntegrityLevel,
	deriveArchitectureConstraints,
	deriveProcessConstraints,
	deriveTestingConstraints,
} from "@shared/risk-assessment";

// =============================================================================
// SECTION 1: FORM DEFINITION TESTS
// =============================================================================

describe("Form Definitions", () => {
	it("should have all forms registered in FORMS registry", () => {
		expect(FORMS[UNIT_TESTING.id]).toBe(UNIT_TESTING);
		expect(FORMS[FAULT_INJECTION.id]).toBe(FAULT_INJECTION);
		expect(FORMS[ASSURANCE_CASE.id]).toBe(ASSURANCE_CASE);
	});

	it("should have correct categories for forms", () => {
		expect(UNIT_TESTING.category).toBe(FormCategory.TESTING);
		expect(REDUNDANCY_VOTING.category).toBe(FormCategory.ARCHITECTURE);
		expect(CODE_REVIEW.category).toBe(FormCategory.PROCESS);
		expect(ASSURANCE_CASE.category).toBe(FormCategory.DOCUMENTATION);
	});

	it("should have thresholds for threshold-based forms", () => {
		expect(STMT_COV_80.threshold).toBeDefined();
		expect(STMT_COV_80.threshold?.metric).toBe("statementCoverage");
		expect(STMT_COV_80.threshold?.value).toBe(80);
	});

	it("should not have thresholds for boolean forms", () => {
		expect(UNIT_TESTING.threshold).toBeUndefined();
		expect(FAULT_INJECTION.threshold).toBeUndefined();
	});
});

// =============================================================================
// SECTION 2: FORM EXTRACTION TESTS
// =============================================================================

describe("Form Extraction", () => {
	describe("extractTestingForms", () => {
		it("should extract no forms for Level 0", () => {
			const constraints = deriveTestingConstraints(IntegrityLevel.LEVEL_0);
			const forms = extractTestingForms(constraints);
			expect(forms.size).toBe(0);
		});

		it("should extract basic forms for Level 1", () => {
			const constraints = deriveTestingConstraints(IntegrityLevel.LEVEL_1);
			const forms = extractTestingForms(constraints);

			expect(forms.has(UNIT_TESTING.id)).toBe(true);
			expect(forms.has(FAULT_INJECTION.id)).toBe(false);
		});

		it("should extract many forms for Level 4", () => {
			const constraints = deriveTestingConstraints(IntegrityLevel.LEVEL_4);
			const forms = extractTestingForms(constraints);

			expect(forms.has(UNIT_TESTING.id)).toBe(true);
			expect(forms.has(FAULT_INJECTION.id)).toBe(true);
			expect(forms.has(MCDC_COV_100.id)).toBe(true);
			expect(forms.has("STMT_COV_100")).toBe(true);
		});

		it("should include cumulative coverage thresholds", () => {
			const constraints = deriveTestingConstraints(IntegrityLevel.LEVEL_3);
			const forms = extractTestingForms(constraints);

			// If 90% coverage, should also have 60% and 80%
			if (forms.has("STMT_COV_90")) {
				expect(forms.has("STMT_COV_60")).toBe(true);
				expect(forms.has("STMT_COV_80")).toBe(true);
			}
		});
	});

	describe("extractArchitectureForms", () => {
		it("should extract no redundancy for Level 0", () => {
			const constraints = deriveArchitectureConstraints(IntegrityLevel.LEVEL_0);
			const forms = extractArchitectureForms(constraints);

			expect(forms.has(REDUNDANCY_VOTING.id)).toBe(false);
		});

		it("should extract voting redundancy for Level 4", () => {
			const constraints = deriveArchitectureConstraints(IntegrityLevel.LEVEL_4);
			const forms = extractArchitectureForms(constraints);

			expect(forms.has(REDUNDANCY_VOTING.id)).toBe(true);
		});
	});

	describe("extractProcessForms", () => {
		it("should not require code review for Level 0", () => {
			const constraints = deriveProcessConstraints(IntegrityLevel.LEVEL_0);
			const forms = extractProcessForms(constraints);

			expect(forms.has(CODE_REVIEW.id)).toBe(false);
		});

		it("should require code review for Level 1+", () => {
			const constraints = deriveProcessConstraints(IntegrityLevel.LEVEL_1);
			const forms = extractProcessForms(constraints);

			expect(forms.has(CODE_REVIEW.id)).toBe(true);
		});
	});

	describe("extractAllForms", () => {
		it("should return empty set for Level 0", () => {
			const forms = extractAllForms(IntegrityLevel.LEVEL_0);
			expect(forms.size).toBe(0);
		});

		it("should return increasing forms for higher levels", () => {
			const l1Forms = extractAllForms(IntegrityLevel.LEVEL_1);
			const l2Forms = extractAllForms(IntegrityLevel.LEVEL_2);
			const l3Forms = extractAllForms(IntegrityLevel.LEVEL_3);
			const l4Forms = extractAllForms(IntegrityLevel.LEVEL_4);

			expect(l2Forms.size).toBeGreaterThan(l1Forms.size);
			expect(l3Forms.size).toBeGreaterThan(l2Forms.size);
			expect(l4Forms.size).toBeGreaterThan(l3Forms.size);
		});

		it("should include forms from all categories for high levels", () => {
			const forms = extractAllForms(IntegrityLevel.LEVEL_4);
			const formObjects = [...forms].map((id) => FORMS[id]).filter(Boolean);

			const categories = new Set(formObjects.map((f) => f?.category));

			expect(categories.has(FormCategory.TESTING)).toBe(true);
			expect(categories.has(FormCategory.ARCHITECTURE)).toBe(true);
			expect(categories.has(FormCategory.PROCESS)).toBe(true);
			expect(categories.has(FormCategory.SCOPING)).toBe(true);
			expect(categories.has(FormCategory.DOCUMENTATION)).toBe(true);
		});
	});
});

// =============================================================================
// SECTION 3: FORMAL CONTEXT TESTS
// =============================================================================

describe("Formal Context", () => {
	describe("buildIntegrityFormsContext", () => {
		it("should create context with 5 objects (levels)", () => {
			const context = buildIntegrityFormsContext();
			expect(context.objects).toHaveLength(5);
			expect(context.objects).toContain("L0");
			expect(context.objects).toContain("L4");
		});

		it("should have forms as attributes", () => {
			const context = buildIntegrityFormsContext();
			expect(context.attributes.length).toBeGreaterThan(0);
		});

		it("should have correct incidence for L0", () => {
			const context = buildIntegrityFormsContext();
			const l0Forms = context.attributesOf("L0");
			expect(l0Forms.size).toBe(0);
		});

		it("should have correct incidence for L4", () => {
			const context = buildIntegrityFormsContext();
			const l4Forms = context.attributesOf("L4");
			expect(l4Forms.has(UNIT_TESTING.id)).toBe(true);
			expect(l4Forms.has(FAULT_INJECTION.id)).toBe(true);
		});
	});

	describe("getIntegrityFormsContext (cached)", () => {
		it("should return same instance on multiple calls", () => {
			const ctx1 = getIntegrityFormsContext();
			const ctx2 = getIntegrityFormsContext();
			expect(ctx1).toBe(ctx2);
		});
	});

	describe("getIntegrityFormsLattice", () => {
		it("should compute concept lattice", () => {
			const lattice = getIntegrityFormsLattice();
			expect(lattice.concepts.length).toBeGreaterThan(0);
		});

		it("should have top containing all levels", () => {
			const lattice = getIntegrityFormsLattice();
			expect(lattice.top.extent.size).toBe(5);
		});
	});
});

// =============================================================================
// SECTION 4: DELTA OPERATIONS TESTS
// =============================================================================

describe("Delta Operations", () => {
	describe("computeFormsDelta", () => {
		it("should return empty delta for same level", () => {
			const delta = computeFormsDelta(IntegrityLevel.LEVEL_2, IntegrityLevel.LEVEL_2);
			expect(delta.size).toBe(0);
		});

		it("should return empty delta when target is lower", () => {
			const delta = computeFormsDelta(IntegrityLevel.LEVEL_1, IntegrityLevel.LEVEL_3);
			expect(delta.size).toBe(0);
		});

		it("should return added forms when target is higher", () => {
			const delta = computeFormsDelta(IntegrityLevel.LEVEL_3, IntegrityLevel.LEVEL_2);
			expect(delta.size).toBeGreaterThan(0);
		});

		it("should include fault injection when going from L2 to L3", () => {
			const delta = computeFormsDelta(IntegrityLevel.LEVEL_3, IntegrityLevel.LEVEL_2);
			expect(delta.has(FAULT_INJECTION.id)).toBe(true);
		});
	});

	describe("computeFormsSymmetricDelta", () => {
		it("should show both added and removed", () => {
			const { added, removed } = computeFormsSymmetricDelta(
				IntegrityLevel.LEVEL_3,
				IntegrityLevel.LEVEL_2,
			);

			expect(added.size).toBeGreaterThan(0);
			expect(removed.size).toBe(0); // L2 is subset of L3
		});

		it("should be symmetric with reversed arguments", () => {
			const forward = computeFormsSymmetricDelta(IntegrityLevel.LEVEL_3, IntegrityLevel.LEVEL_2);
			const backward = computeFormsSymmetricDelta(IntegrityLevel.LEVEL_2, IntegrityLevel.LEVEL_3);

			expect(forward.added.size).toBe(backward.removed.size);
			expect(forward.removed.size).toBe(backward.added.size);
		});
	});

	describe("computeSharedForms", () => {
		it("should return all L1 forms when L1 is in set", () => {
			const shared = computeSharedForms([IntegrityLevel.LEVEL_1, IntegrityLevel.LEVEL_2]);
			const l1Forms = extractAllForms(IntegrityLevel.LEVEL_1);

			// Shared should be subset of L1 (since L1 ⊆ L2)
			for (const f of shared) {
				expect(l1Forms.has(f)).toBe(true);
			}
		});

		it("should return empty for L0 in set", () => {
			const shared = computeSharedForms([IntegrityLevel.LEVEL_0, IntegrityLevel.LEVEL_4]);
			expect(shared.size).toBe(0);
		});
	});

	describe("getFormsForLevel", () => {
		it("should return Form objects with metadata", () => {
			const forms = getFormsForLevel(IntegrityLevel.LEVEL_2);

			expect(forms.length).toBeGreaterThan(0);
			expect(forms[0]).toHaveProperty("id");
			expect(forms[0]).toHaveProperty("name");
			expect(forms[0]).toHaveProperty("category");
		});
	});

	describe("getDeltaFormsWithMetadata", () => {
		it("should return forms with category", () => {
			const delta = getDeltaFormsWithMetadata(IntegrityLevel.LEVEL_3, IntegrityLevel.LEVEL_2);

			expect(delta.length).toBeGreaterThan(0);
			expect(delta[0]).toHaveProperty("form");
			expect(delta[0]).toHaveProperty("category");
		});
	});
});

// =============================================================================
// SECTION 5: MONOTONICITY TESTS
// =============================================================================

describe("Monotonicity Property", () => {
	it("should satisfy: L0 ⊆ L1 ⊆ L2 ⊆ L3 ⊆ L4 in terms of Forms", () => {
		const levels = [
			IntegrityLevel.LEVEL_0,
			IntegrityLevel.LEVEL_1,
			IntegrityLevel.LEVEL_2,
			IntegrityLevel.LEVEL_3,
			IntegrityLevel.LEVEL_4,
		];

		for (let i = 0; i < levels.length - 1; i++) {
			const lowerForms = extractAllForms(levels[i]!);
			const higherForms = extractAllForms(levels[i + 1]!);

			// Every form in lower should be in higher
			for (const f of lowerForms) {
				expect(higherForms.has(f)).toBe(true);
			}
		}
	});

	it("should have strictly more forms at each higher level (except L0→L1 could be equal)", () => {
		const l1 = extractAllForms(IntegrityLevel.LEVEL_1);
		const l2 = extractAllForms(IntegrityLevel.LEVEL_2);
		const l3 = extractAllForms(IntegrityLevel.LEVEL_3);
		const l4 = extractAllForms(IntegrityLevel.LEVEL_4);

		expect(l2.size).toBeGreaterThan(l1.size);
		expect(l3.size).toBeGreaterThan(l2.size);
		expect(l4.size).toBeGreaterThan(l3.size);
	});
});

// =============================================================================
// SECTION 6: REPORTING TESTS
// =============================================================================

describe("Reporting", () => {
	describe("generateFormReport", () => {
		it("should generate readable report", () => {
			const report = generateFormReport(IntegrityLevel.LEVEL_2);

			expect(report).toContain("Integrity Level 2");
			expect(report).toContain("TESTING");
			expect(report).toContain("Total Forms:");
		});

		it("should list forms by category", () => {
			const report = generateFormReport(IntegrityLevel.LEVEL_4);

			expect(report).toContain("TESTING");
			expect(report).toContain("ARCHITECTURE");
			expect(report).toContain("PROCESS");
		});
	});

	describe("generateDeltaReport", () => {
		it("should show added forms", () => {
			const report = generateDeltaReport(IntegrityLevel.LEVEL_3, IntegrityLevel.LEVEL_2);

			expect(report).toContain("Level 2 → Level 3");
			expect(report).toContain("ADDED");
			expect(report).toContain("+");
		});

		it("should show no difference for same level", () => {
			const report = generateDeltaReport(IntegrityLevel.LEVEL_2, IntegrityLevel.LEVEL_2);

			expect(report).toContain("No difference");
		});
	});
});

// =============================================================================
// SECTION 7: INTEGRATION WITH FCA
// =============================================================================

describe("FCA Integration", () => {
	it("should produce valid formal context", () => {
		const context = getIntegrityFormsContext();

		// Check derivation operators work
		const l3Attrs = context.attributesOf("L3");
		expect(l3Attrs.size).toBeGreaterThan(0);

		const unitTestObjects = context.objectsHaving(UNIT_TESTING.id);
		expect(unitTestObjects.has("L1")).toBe(true);
		expect(unitTestObjects.has("L0")).toBe(false);
	});

	it("should have valid concept lattice", () => {
		const lattice = getIntegrityFormsLattice();

		// Verify top concept
		expect(lattice.top.extent.has("L0")).toBe(true);
		expect(lattice.top.extent.has("L4")).toBe(true);

		// Top intent should be empty (no form common to all including L0)
		// Unless all levels share some form, which L0 doesn't
		expect(lattice.top.intent.size).toBe(0);
	});
});
