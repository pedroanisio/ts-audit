// =============================================================================
// Mathematical Foundations for Cross-Standard Requirements Decomposition
// CypherQL Graph Representation
// =============================================================================

// -----------------------------------------------------------------------------
// CLEAR EXISTING DATA (optional - uncomment if needed)
// -----------------------------------------------------------------------------
// MATCH (n) DETACH DELETE n;

// =============================================================================
// CONSTRAINTS (Run first to ensure data integrity)
// =============================================================================

CREATE CONSTRAINT framework_abbreviation IF NOT EXISTS 
FOR (f:Framework) REQUIRE f.abbreviation IS UNIQUE;

CREATE CONSTRAINT hypothesis_id IF NOT EXISTS 
FOR (h:Hypothesis) REQUIRE h.id IS UNIQUE;

CREATE CONSTRAINT ukc_hypothesis_id IF NOT EXISTS 
FOR (h:UKCHypothesis) REQUIRE h.id IS UNIQUE;

CREATE CONSTRAINT paper_title IF NOT EXISTS 
FOR (p:Paper) REQUIRE p.title IS UNIQUE;

CREATE CONSTRAINT standard_name IF NOT EXISTS 
FOR (s:Standard) REQUIRE s.name IS UNIQUE;

CREATE CONSTRAINT tool_name IF NOT EXISTS 
FOR (t:Tool) REQUIRE t.name IS UNIQUE;

CREATE CONSTRAINT methodology_abbreviation IF NOT EXISTS 
FOR (m:Methodology) REQUIRE m.abbreviation IS UNIQUE;

CREATE CONSTRAINT organization_name IF NOT EXISTS 
FOR (o:Organization) REQUIRE o.name IS UNIQUE;

CREATE CONSTRAINT theory_name IF NOT EXISTS 
FOR (t:Theory) REQUIRE t.name IS UNIQUE;

CREATE CONSTRAINT venue_name IF NOT EXISTS 
FOR (v:Venue) REQUIRE v.name IS UNIQUE;

CREATE CONSTRAINT reasoner_name IF NOT EXISTS 
FOR (r:Reasoner) REQUIRE r.name IS UNIQUE;

// =============================================================================
// INDEXES (For query performance)
// =============================================================================

CREATE INDEX framework_name IF NOT EXISTS FOR (f:Framework) ON (f.name);
CREATE INDEX concept_framework IF NOT EXISTS FOR (c:Concept) ON (c.framework);
CREATE INDEX concept_name IF NOT EXISTS FOR (c:Concept) ON (c.name);
CREATE INDEX paper_topic IF NOT EXISTS FOR (p:Paper) ON (p.topic);
CREATE INDEX paper_venue IF NOT EXISTS FOR (p:Paper) ON (p.venue);
CREATE INDEX hypothesis_category IF NOT EXISTS FOR (h:Hypothesis) ON (h.category);
CREATE INDEX capability_name IF NOT EXISTS FOR (c:Capability) ON (c.name);
CREATE INDEX limitation_name IF NOT EXISTS FOR (l:Limitation) ON (l.name);
CREATE INDEX definition_theory IF NOT EXISTS FOR (d:Definition) ON (d.theory);
CREATE INDEX theorem_theory IF NOT EXISTS FOR (t:Theorem) ON (t.theory);
CREATE INDEX integrity_level_standard IF NOT EXISTS FOR (i:IntegrityLevel) ON (i.standard);
CREATE INDEX extraction_phase_order IF NOT EXISTS FOR (e:ExtractionPhase) ON (e.order);
CREATE INDEX research_domain_abbrev IF NOT EXISTS FOR (r:ResearchDomain) ON (r.abbreviation);
CREATE INDEX research_group_domain IF NOT EXISTS FOR (r:ResearchGroup) ON (r.domain);
CREATE INDEX ukc_layer_name IF NOT EXISTS FOR (l:UKCLayer) ON (l.name);
CREATE INDEX complexity_bound_logic IF NOT EXISTS FOR (c:ComplexityBound) ON (c.logic);

// Full-text search indexes for semantic queries
CREATE FULLTEXT INDEX concept_search IF NOT EXISTS 
FOR (c:Concept) ON EACH [c.name, c.definition, c.notation];

CREATE FULLTEXT INDEX paper_search IF NOT EXISTS 
FOR (p:Paper) ON EACH [p.title, p.contribution];

CREATE FULLTEXT INDEX hypothesis_search IF NOT EXISTS 
FOR (h:Hypothesis) ON EACH [h.name, h.formal_statement];

// =============================================================================
// NODE CREATION
// =============================================================================

// -----------------------------------------------------------------------------
// 1. MATHEMATICAL FRAMEWORKS (Core Entities)
// -----------------------------------------------------------------------------

CREATE (fca:Framework {
    name: "Formal Concept Analysis",
    abbreviation: "FCA",
    description: "Structural backbone for decomposing standards into atomic requirements and discovering relationships",
    core_structure: "Concept Lattice",
    complexity: "Polynomial for lattice construction"
})

CREATE (dl:Framework {
    name: "Description Logics",
    abbreviation: "DL",
    description: "Formal foundation of OWL providing precise semantics for requirement subsumption and equivalence",
    core_structure: "Knowledge Base (TBox + ABox)",
    complexity: "N2ExpTime-complete for SROIQ, ExpTime-complete for ALC"
})

CREATE (inst:Framework {
    name: "Institution Theory",
    abbreviation: "IT",
    description: "Mathematically cleanest abstraction for comparing standards in different logical frameworks",
    core_structure: "Institution = (Sign, Sen, Mod, ⊨)",
    complexity: "Depends on underlying logics"
})

CREATE (galois:Framework {
    name: "Galois Connections",
    abbreviation: "GC",
    description: "Rigorous machinery for abstraction-concretization relationships",
    core_structure: "Monotone Galois Connection (α, γ)",
    complexity: "Depends on poset structure"
})

CREATE (fm:Framework {
    name: "Feature Models",
    abbreviation: "FM",
    description: "Well-established framework for variability modeling with propositional semantics",
    core_structure: "Feature Diagram FD = (F, r, DE, CE, λ)",
    complexity: "NP-complete (SAT-based)"
})

CREATE (cat:Framework {
    name: "Category Theory",
    abbreviation: "CT",
    description: "Mathematical meta-framework underlying institution theory for specification composition",
    core_structure: "Category C = (Ob, Hom, ∘, id)",
    complexity: "Abstract - implementation dependent"
})

// -----------------------------------------------------------------------------
// 2. MATHEMATICAL CONCEPTS
// -----------------------------------------------------------------------------

// FCA Concepts
CREATE (formal_context:Concept {
    name: "Formal Context",
    notation: "K := (G, M, I)",
    definition: "Triple where G is objects, M is attributes, I ⊆ G × M is incidence relation",
    framework: "FCA"
})

CREATE (formal_concept:Concept {
    name: "Formal Concept",
    notation: "(A, B) where A' = B and B' = A",
    definition: "Pair where extent A contains all objects sharing exactly the attributes in intent B",
    framework: "FCA"
})

CREATE (concept_lattice:Concept {
    name: "Concept Lattice",
    notation: "(A₁, B₁) ≤ (A₂, B₂) ⟺ A₁ ⊆ A₂",
    definition: "Complete lattice of all formal concepts under inclusion ordering",
    framework: "FCA"
})

CREATE (derivation_operators:Concept {
    name: "Derivation Operators",
    notation: "A' := {m ∈ M | gIm ∀g ∈ A}, B' := {g ∈ G | gIm ∀m ∈ B}",
    definition: "Form an antitone Galois connection between power sets",
    framework: "FCA"
})

CREATE (canonical_basis:Concept {
    name: "Canonical Basis",
    notation: "Guigues-Duquenne basis",
    definition: "Irredundant set of implications from which all valid dependencies derive",
    framework: "FCA"
})

// Description Logic Concepts
CREATE (interpretation:Concept {
    name: "Interpretation",
    notation: "I = (Δ^I, ·^I)",
    definition: "Non-empty domain with interpretation function mapping concepts to subsets",
    framework: "DL"
})

CREATE (tbox:Concept {
    name: "TBox",
    notation: "Terminological axioms",
    definition: "Set of terminological axioms defining concept hierarchies (e.g., ASIL_D ⊑ SafetyRequirement)",
    framework: "DL"
})

CREATE (abox:Concept {
    name: "ABox",
    notation: "Assertional axioms",
    definition: "Assertions about specific individuals/requirements",
    framework: "DL"
})

CREATE (subsumption:Concept {
    name: "Subsumption",
    notation: "C ⊑_T D iff C^I ⊆ D^I for every model I of T",
    definition: "If R₁ ⊑ R₂, any system satisfying R₁ automatically satisfies R₂",
    framework: "DL"
})

CREATE (equivalence:Concept {
    name: "Equivalence",
    notation: "C ≡_T D iff C^I = D^I for every model I of T",
    definition: "Two concepts have identical extensions in all models",
    framework: "DL"
})

CREATE (dl_constructors:Concept {
    name: "DL Constructors",
    notation: "⊓, ⊔, ∃R.C, ∀R.C",
    definition: "Conjunction, disjunction, existential and universal restriction",
    framework: "DL"
})

// Institution Theory Concepts
CREATE (signature:Concept {
    name: "Signature",
    notation: "Sign (category)",
    definition: "Category of signatures/vocabularies",
    framework: "IT"
})

CREATE (sentence_functor:Concept {
    name: "Sentence Functor",
    notation: "Sen: Sign → Set",
    definition: "Functor assigning sentences to signatures",
    framework: "IT"
})

CREATE (model_functor:Concept {
    name: "Model Functor",
    notation: "Mod: Sign^op → Cat",
    definition: "Contravariant functor assigning model categories to signatures",
    framework: "IT"
})

CREATE (satisfaction_condition:Concept {
    name: "Satisfaction Condition",
    notation: "Mod(φ)(M') ⊨_Σ ρ ⟺ M' ⊨_Σ' Sen(φ)(ρ)",
    definition: "Truth is invariant under change of notation",
    framework: "IT"
})

CREATE (comorphism:Concept {
    name: "Institution Comorphism",
    notation: "I → I'",
    definition: "Embedding one logic into another while preserving satisfaction",
    framework: "IT"
})

CREATE (grothendieck:Concept {
    name: "Grothendieck Construction",
    notation: "∫",
    definition: "Flattens diagram of institutions into single heterogeneous institution",
    framework: "IT"
})

// Galois Connection Concepts
CREATE (abstraction:Concept {
    name: "Abstraction Function",
    notation: "α: C → A",
    definition: "Maps concrete domain to abstract domain",
    framework: "GC"
})

CREATE (concretization:Concept {
    name: "Concretization Function",
    notation: "γ: A → C",
    definition: "Maps abstract domain to concrete domain",
    framework: "GC"
})

CREATE (gc_property:Concept {
    name: "Galois Connection Property",
    notation: "α(c) ⊑ a ⟺ c ⊑ γ(a)",
    definition: "Fundamental adjunction property relating abstraction and concretization",
    framework: "GC"
})

CREATE (closure_operator:Concept {
    name: "Closure Operator",
    notation: "γ ∘ α",
    definition: "Composition forming closure operator with inflationarity property",
    framework: "GC"
})

CREATE (knaster_tarski:Concept {
    name: "Knaster-Tarski Theorem",
    notation: "Fixed point lattice",
    definition: "Monotone functions on complete lattices have complete lattices of fixed points",
    framework: "GC"
})

// Feature Model Concepts
CREATE (feature_diagram:Concept {
    name: "Feature Diagram",
    notation: "FD = (F, r, DE, CE, λ)",
    definition: "Features F, root r, decomposition edges DE, cross-tree constraints CE, type function λ",
    framework: "FM"
})

CREATE (valid_configuration:Concept {
    name: "Valid Configuration",
    notation: "Satisfying assignment of φ_FM",
    definition: "Assignment satisfying propositional formula encoding feature diagram",
    framework: "FM"
})

CREATE (fm_constraints:Concept {
    name: "Feature Model Constraints",
    notation: "mandatory, optional, OR, XOR, requires, excludes",
    definition: "Constraint types translated to propositional logic",
    framework: "FM"
})

// Category Theory Concepts
CREATE (category:Concept {
    name: "Category",
    notation: "C = (Ob(C), Hom, ∘, id)",
    definition: "Objects, morphisms, associative composition, identity morphisms",
    framework: "CT"
})

CREATE (functor:Concept {
    name: "Functor",
    notation: "F: C → D",
    definition: "Maps objects and morphisms preserving composition and identities",
    framework: "CT"
})

CREATE (natural_transformation:Concept {
    name: "Natural Transformation",
    notation: "η: F ⇒ G",
    definition: "Relates functors via component morphisms satisfying naturality",
    framework: "CT"
})

CREATE (colimit:Concept {
    name: "Colimit/Pushout",
    notation: "colim",
    definition: "Computes specification combination - putting widgets together to form super-widget",
    framework: "CT"
})

CREATE (adjunction:Concept {
    name: "Adjunction",
    notation: "L ⊣ R",
    definition: "Hom_D(L(C), D) ≅ Hom_C(C, R(D)) - captures translation-embedding relationships",
    framework: "CT"
})

CREATE (kan_extension:Concept {
    name: "Kan Extension",
    notation: "Lan, Ran",
    definition: "Computes best fit translations between categories - All Concepts Are Kan Extensions",
    framework: "CT"
})

// -----------------------------------------------------------------------------
// 3. CAPABILITIES
// -----------------------------------------------------------------------------

CREATE (cap_decomposition:Capability {
    name: "Decomposition",
    description: "Breaking down standards/requirements into atomic units"
})

CREATE (cap_equivalence:Capability {
    name: "Equivalence Detection",
    description: "Determining when two requirements are semantically identical"
})

CREATE (cap_subsumption:Capability {
    name: "Subsumption Reasoning",
    description: "Determining when one requirement implies another"
})

CREATE (cap_cross_standard:Capability {
    name: "Cross-Standard Comparison",
    description: "Comparing requirements across different standards"
})

CREATE (cap_delta:Capability {
    name: "Delta Computation",
    description: "Computing differences between standards or requirements"
})

CREATE (cap_consistency:Capability {
    name: "Consistency Checking",
    description: "Verifying logical consistency of requirement sets"
})

CREATE (cap_classification:Capability {
    name: "Automated Classification",
    description: "Automatically computing hierarchies and taxonomies"
})

CREATE (cap_implication:Capability {
    name: "Implication Discovery",
    description: "Finding logical dependencies between requirements"
})

// -----------------------------------------------------------------------------
// 4. LIMITATIONS
// -----------------------------------------------------------------------------

CREATE (lim_temporal:Limitation {
    name: "Temporal Aspects",
    description: "Cannot model temporal/versioning aspects of requirements"
})

CREATE (lim_quantitative:Limitation {
    name: "Quantitative Constraints",
    description: "Cannot directly model numerical thresholds and coverage percentages"
})

CREATE (lim_owa:Limitation {
    name: "Open World Assumption",
    description: "Absence of information is not evidence of absence"
})

CREATE (lim_complexity:Limitation {
    name: "Computational Complexity",
    description: "High complexity for reasoning (ExpTime to N2ExpTime)"
})

CREATE (lim_formalization:Limitation {
    name: "Formalization Effort",
    description: "Requires significant effort to formalize prose standards"
})

CREATE (lim_partial_mapping:Limitation {
    name: "Partial Mappings",
    description: "No native support for fuzzy or partial mappings"
})

CREATE (lim_natural_language:Limitation {
    name: "Natural Language",
    description: "Cannot directly process natural language requirements"
})

// -----------------------------------------------------------------------------
// 5. SAFETY STANDARDS
// -----------------------------------------------------------------------------

CREATE (iec61508:Standard {
    name: "IEC 61508",
    domain: "Generic Functional Safety",
    description: "Functional safety of electrical/electronic/programmable electronic safety-related systems",
    current_version: "Edition 2.0",
    first_published: 1998,
    last_updated: 2010,
    next_revision_expected: 2026,
    integrity_levels: ["SIL 1", "SIL 2", "SIL 3", "SIL 4"]
})

CREATE (iso26262:Standard {
    name: "ISO 26262",
    domain: "Automotive",
    description: "Road vehicles - Functional safety",
    current_version: "2nd Edition",
    first_published: 2011,
    last_updated: 2018,
    next_revision_expected: 2026,
    integrity_levels: ["QM", "ASIL-A", "ASIL-B", "ASIL-C", "ASIL-D"]
})

CREATE (do178c:Standard {
    name: "DO-178C",
    domain: "Avionics",
    description: "Software Considerations in Airborne Systems and Equipment Certification",
    current_version: "DO-178C",
    first_published: 1982,
    last_updated: 2011,
    previous_version: "DO-178B (1992)",
    integrity_levels: ["DAL E", "DAL D", "DAL C", "DAL B", "DAL A"]
})

// -----------------------------------------------------------------------------
// 6. TOOLS AND IMPLEMENTATIONS
// -----------------------------------------------------------------------------

CREATE (owl:Tool {
    name: "OWL 2",
    full_name: "Web Ontology Language 2",
    type: "Specification Language",
    based_on: "SROIQ Description Logic"
})

CREATE (shacl:Tool {
    name: "SHACL",
    full_name: "Shapes Constraint Language",
    type: "Validation Language",
    purpose: "Closed-world validation complementing OWL"
})

CREATE (casl:Tool {
    name: "CASL",
    full_name: "Common Algebraic Specification Language",
    type: "Specification Language",
    layers: ["basic", "structured", "architectural"]
})

CREATE (hets:Tool {
    name: "Hets",
    full_name: "Heterogeneous Tool Set",
    type: "Proof Management System",
    purpose: "Multi-logic proof management using institution comorphisms"
})

CREATE (sacm:Tool {
    name: "SACM",
    full_name: "Structured Assurance Case Metamodel",
    type: "OMG Metamodel",
    purpose: "Representing assurance cases"
})

CREATE (ears:Tool {
    name: "EARS",
    full_name: "Easy Approach to Requirements Syntax",
    type: "Requirements Pattern",
    pattern: "While <precondition>, When <trigger>, the <system> shall <response>",
    adopters: ["Bosch", "Rolls-Royce", "NASA", "Siemens"]
})

// -----------------------------------------------------------------------------
// 7. KEY REFERENCES
// -----------------------------------------------------------------------------

CREATE (ref_wille1982:Reference {
    authors: "Wille, R.",
    year: 1982,
    title: "Restructuring Lattice Theory: An Approach Based on Hierarchies of Concepts",
    venue: "Ordered Sets, NATO Science Series C, Vol. 83",
    pages: "445-470",
    publisher: "Reidel"
})

CREATE (ref_ganter1999:Reference {
    authors: "Ganter, B. & Wille, R.",
    year: 1999,
    title: "Formal Concept Analysis: Mathematical Foundations",
    publisher: "Springer"
})

CREATE (ref_baader2003:Reference {
    authors: "Baader, F., Calvanese, D., McGuinness, D., Nardi, D. & Patel-Schneider, P.",
    year: 2003,
    title: "The Description Logic Handbook",
    publisher: "Cambridge University Press"
})

CREATE (ref_horrocks2006:Reference {
    authors: "Horrocks, I., Kutz, O. & Sattler, U.",
    year: 2006,
    title: "The Even More Irresistible SROIQ",
    venue: "KR 2006",
    publisher: "AAAI Press"
})

CREATE (ref_goguen1992:Reference {
    authors: "Goguen, J. & Burstall, R.",
    year: 1992,
    title: "Institutions: Abstract Model Theory for Specification and Programming",
    venue: "Journal of the ACM",
    volume: "39(1)",
    pages: "95-146"
})

CREATE (ref_diaconescu2008:Reference {
    authors: "Diaconescu, R.",
    year: 2008,
    title: "Institution-independent Model Theory",
    publisher: "Birkhäuser"
})

CREATE (ref_cousot1977:Reference {
    authors: "Cousot, P. & Cousot, R.",
    year: 1977,
    title: "Abstract Interpretation: A Unified Lattice Model for Static Analysis of Programs",
    venue: "POPL",
    pages: "238-252"
})

CREATE (ref_kang1990:Reference {
    authors: "Kang, K. et al.",
    year: 1990,
    title: "Feature-Oriented Domain Analysis (FODA) Feasibility Study",
    venue: "SEI Technical Report CMU/SEI-90-TR-021"
})

CREATE (ref_batory2005:Reference {
    authors: "Batory, D.",
    year: 2005,
    title: "Feature Models, Grammars, and Propositional Formulas",
    venue: "SPLC 2005, LNCS 3714",
    pages: "7-20"
})

CREATE (ref_goguen1991:Reference {
    authors: "Goguen, J.",
    year: 1991,
    title: "A Categorical Manifesto",
    venue: "Mathematical Structures in Computer Science",
    volume: "1(1)",
    pages: "49-67"
})

CREATE (ref_antonino2014:Reference {
    authors: "Antonino, P. et al.",
    year: 2014,
    title: "The Safety Requirements Decomposition Pattern",
    concepts: ["AFSR", "CFSR"]
})

CREATE (ref_okoh2024:Reference {
    authors: "Okoh & Myklebust",
    year: 2024,
    title: "Systematic mapping from ISO 26262 to IEC 61508",
    finding: "No consensus criteria for requalifying ISO 26262 elements for IEC 61508 reuse"
})

// -----------------------------------------------------------------------------
// 8. REQUIREMENT CONCEPTS
// -----------------------------------------------------------------------------

CREATE (afsr:RequirementType {
    name: "Atomic Functional Safety Requirement",
    abbreviation: "AFSR",
    definition: "FSR with only one failure cause - cannot be further decomposed"
})

CREATE (cfsr:RequirementType {
    name: "Composite Functional Safety Requirement",
    abbreviation: "CFSR",
    definition: "FSR that can be decomposed into multiple AFSRs"
})

CREATE (form:RequirementType {
    name: "Form",
    definition: "Atomic requirement unit enabling cross-standard comparison"
})

// =============================================================================
// RELATIONSHIP CREATION
// =============================================================================

// -----------------------------------------------------------------------------
// Framework -> Concept relationships (DEFINES)
// -----------------------------------------------------------------------------

MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (c:Concept) WHERE c.framework = "FCA"
CREATE (fca)-[:DEFINES]->(c);

MATCH (dl:Framework {abbreviation: "DL"})
MATCH (c:Concept) WHERE c.framework = "DL"
CREATE (dl)-[:DEFINES]->(c);

MATCH (inst:Framework {abbreviation: "IT"})
MATCH (c:Concept) WHERE c.framework = "IT"
CREATE (inst)-[:DEFINES]->(c);

MATCH (galois:Framework {abbreviation: "GC"})
MATCH (c:Concept) WHERE c.framework = "GC"
CREATE (galois)-[:DEFINES]->(c);

MATCH (fm:Framework {abbreviation: "FM"})
MATCH (c:Concept) WHERE c.framework = "FM"
CREATE (fm)-[:DEFINES]->(c);

MATCH (cat:Framework {abbreviation: "CT"})
MATCH (c:Concept) WHERE c.framework = "CT"
CREATE (cat)-[:DEFINES]->(c);

// -----------------------------------------------------------------------------
// Framework -> Capability relationships (CAPTURES)
// -----------------------------------------------------------------------------

// FCA capabilities
MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (cap:Capability {name: "Decomposition"})
CREATE (fca)-[:CAPTURES {mechanism: "as attributes"}]->(cap);

MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (cap:Capability {name: "Implication Discovery"})
CREATE (fca)-[:CAPTURES {mechanism: "canonical basis"}]->(cap);

MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (cap:Capability {name: "Cross-Standard Comparison"})
CREATE (fca)-[:CAPTURES {mechanism: "via shared context"}]->(cap);

MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (cap:Capability {name: "Delta Computation"})
CREATE (fca)-[:CAPTURES {mechanism: "via lattice difference"}]->(cap);

// DL capabilities
MATCH (dl:Framework {abbreviation: "DL"})
MATCH (cap:Capability {name: "Decomposition"})
CREATE (dl)-[:CAPTURES {mechanism: "via TBox"}]->(cap);

MATCH (dl:Framework {abbreviation: "DL"})
MATCH (cap:Capability {name: "Equivalence Detection"})
CREATE (dl)-[:CAPTURES {mechanism: "C ≡ D"}]->(cap);

MATCH (dl:Framework {abbreviation: "DL"})
MATCH (cap:Capability {name: "Subsumption Reasoning"})
CREATE (dl)-[:CAPTURES {mechanism: "C ⊑ D"}]->(cap);

MATCH (dl:Framework {abbreviation: "DL"})
MATCH (cap:Capability {name: "Automated Classification"})
CREATE (dl)-[:CAPTURES {mechanism: "automated reasoning"}]->(cap);

MATCH (dl:Framework {abbreviation: "DL"})
MATCH (cap:Capability {name: "Consistency Checking"})
CREATE (dl)-[:CAPTURES {mechanism: "satisfiability checking"}]->(cap);

MATCH (dl:Framework {abbreviation: "DL"})
MATCH (cap:Capability {name: "Delta Computation"})
CREATE (dl)-[:CAPTURES {mechanism: "via unsat cores"}]->(cap);

// Institution Theory capabilities
MATCH (inst:Framework {abbreviation: "IT"})
MATCH (cap:Capability {name: "Decomposition"})
CREATE (inst)-[:CAPTURES {mechanism: "via sentences"}]->(cap);

MATCH (inst:Framework {abbreviation: "IT"})
MATCH (cap:Capability {name: "Equivalence Detection"})
CREATE (inst)-[:CAPTURES {mechanism: "via isomorphism"}]->(cap);

MATCH (inst:Framework {abbreviation: "IT"})
MATCH (cap:Capability {name: "Subsumption Reasoning"})
CREATE (inst)-[:CAPTURES {mechanism: "via morphisms"}]->(cap);

MATCH (inst:Framework {abbreviation: "IT"})
MATCH (cap:Capability {name: "Cross-Standard Comparison"})
CREATE (inst)-[:CAPTURES {mechanism: "via comorphisms"}]->(cap);

MATCH (inst:Framework {abbreviation: "IT"})
MATCH (cap:Capability {name: "Delta Computation"})
CREATE (inst)-[:CAPTURES {mechanism: "via kernel"}]->(cap);

// Galois Connection capabilities
MATCH (galois:Framework {abbreviation: "GC"})
MATCH (cap:Capability {name: "Decomposition"})
CREATE (galois)-[:CAPTURES {mechanism: "via closure"}]->(cap);

MATCH (galois:Framework {abbreviation: "GC"})
MATCH (cap:Capability {name: "Equivalence Detection"})
CREATE (galois)-[:CAPTURES {mechanism: "via bijectivity"}]->(cap);

MATCH (galois:Framework {abbreviation: "GC"})
MATCH (cap:Capability {name: "Subsumption Reasoning"})
CREATE (galois)-[:CAPTURES {mechanism: "via ordering"}]->(cap);

MATCH (galois:Framework {abbreviation: "GC"})
MATCH (cap:Capability {name: "Delta Computation"})
CREATE (galois)-[:CAPTURES {mechanism: "via residual"}]->(cap);

// Feature Model capabilities
MATCH (fm:Framework {abbreviation: "FM"})
MATCH (cap:Capability {name: "Decomposition"})
CREATE (fm)-[:CAPTURES {mechanism: "as features"}]->(cap);

MATCH (fm:Framework {abbreviation: "FM"})
MATCH (cap:Capability {name: "Equivalence Detection"})
CREATE (fm)-[:CAPTURES {mechanism: "via formula equivalence"}]->(cap);

MATCH (fm:Framework {abbreviation: "FM"})
MATCH (cap:Capability {name: "Consistency Checking"})
CREATE (fm)-[:CAPTURES {mechanism: "via SAT solvers"}]->(cap);

MATCH (fm:Framework {abbreviation: "FM"})
MATCH (cap:Capability {name: "Delta Computation"})
CREATE (fm)-[:CAPTURES {mechanism: "via formula diff"}]->(cap);

// Category Theory capabilities
MATCH (cat:Framework {abbreviation: "CT"})
MATCH (cap:Capability {name: "Cross-Standard Comparison"})
CREATE (cat)-[:CAPTURES {mechanism: "via functors"}]->(cap);

// -----------------------------------------------------------------------------
// Framework -> Limitation relationships (DOES_NOT_CAPTURE)
// -----------------------------------------------------------------------------

// FCA limitations
MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (lim:Limitation {name: "Temporal Aspects"})
CREATE (fca)-[:DOES_NOT_CAPTURE]->(lim);

MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (lim:Limitation {name: "Quantitative Constraints"})
CREATE (fca)-[:DOES_NOT_CAPTURE {note: "ASIL levels require conceptual scaling"}]->(lim);

// DL limitations
MATCH (dl:Framework {abbreviation: "DL"})
MATCH (lim:Limitation {name: "Open World Assumption"})
CREATE (dl)-[:DOES_NOT_CAPTURE {note: "not specified means not required is problematic"}]->(lim);

MATCH (dl:Framework {abbreviation: "DL"})
MATCH (lim:Limitation {name: "Computational Complexity"})
CREATE (dl)-[:DOES_NOT_CAPTURE {note: "N2ExpTime for SROIQ"}]->(lim);

MATCH (dl:Framework {abbreviation: "DL"})
MATCH (lim:Limitation {name: "Quantitative Constraints"})
CREATE (dl)-[:DOES_NOT_CAPTURE]->(lim);

// Institution Theory limitations
MATCH (inst:Framework {abbreviation: "IT"})
MATCH (lim:Limitation {name: "Formalization Effort"})
CREATE (inst)-[:DOES_NOT_CAPTURE {note: "highly abstract"}]->(lim);

MATCH (inst:Framework {abbreviation: "IT"})
MATCH (lim:Limitation {name: "Partial Mappings"})
CREATE (inst)-[:DOES_NOT_CAPTURE {note: "morphisms are exact"}]->(lim);

// Galois Connection limitations
MATCH (galois:Framework {abbreviation: "GC"})
MATCH (lim:Limitation {name: "Partial Mappings"})
CREATE (galois)-[:DOES_NOT_CAPTURE {note: "requires compatible posets"}]->(lim);

MATCH (galois:Framework {abbreviation: "GC"})
MATCH (lim:Limitation {name: "Quantitative Constraints"})
CREATE (galois)-[:DOES_NOT_CAPTURE]->(lim);

// Feature Model limitations
MATCH (fm:Framework {abbreviation: "FM"})
MATCH (lim:Limitation {name: "Temporal Aspects"})
CREATE (fm)-[:DOES_NOT_CAPTURE {note: "no versioning support"}]->(lim);

// Category Theory limitations
MATCH (cat:Framework {abbreviation: "CT"})
MATCH (lim:Limitation {name: "Natural Language"})
CREATE (cat)-[:DOES_NOT_CAPTURE {note: "too abstract for informal documents"}]->(lim);

MATCH (cat:Framework {abbreviation: "CT"})
MATCH (lim:Limitation {name: "Quantitative Constraints"})
CREATE (cat)-[:DOES_NOT_CAPTURE {note: "no degree of difference"}]->(lim);

// -----------------------------------------------------------------------------
// Framework -> Use Case relationships (BEST_FOR)
// -----------------------------------------------------------------------------

// Framework -> Use Case relationships using MERGE pattern
MERGE (uc_clusters:UseCase {name: "Discovering requirement clusters"})
WITH uc_clusters
MATCH (fca:Framework {abbreviation: "FCA"})
CREATE (fca)-[:BEST_FOR]->(uc_clusters);

MERGE (uc_subsumption:UseCase {name: "Computing subsumption hierarchies"})
WITH uc_subsumption
MATCH (dl:Framework {abbreviation: "DL"})
CREATE (dl)-[:BEST_FOR]->(uc_subsumption);

MERGE (uc_hetero:UseCase {name: "Heterogeneous formalism translation"})
WITH uc_hetero
MATCH (inst:Framework {abbreviation: "IT"})
CREATE (inst)-[:BEST_FOR]->(uc_hetero);

MERGE (uc_abstraction:UseCase {name: "Abstraction level relationships"})
WITH uc_abstraction
MATCH (galois:Framework {abbreviation: "GC"})
CREATE (galois)-[:BEST_FOR]->(uc_abstraction);

MERGE (uc_config:UseCase {name: "Configuration validity"})
WITH uc_config
MATCH (fm:Framework {abbreviation: "FM"})
CREATE (fm)-[:BEST_FOR]->(uc_config);

MERGE (uc_compositional:UseCase {name: "Compositional structure"})
WITH uc_compositional
MATCH (cat:Framework {abbreviation: "CT"})
CREATE (cat)-[:BEST_FOR]->(uc_compositional);

// -----------------------------------------------------------------------------
// Inter-Framework relationships
// -----------------------------------------------------------------------------

// FCA uses Galois Connections internally
MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (galois:Framework {abbreviation: "GC"})
CREATE (fca)-[:USES {mechanism: "derivation operators form antitone Galois connection"}]->(galois);

// Category Theory underlies Institution Theory
MATCH (cat:Framework {abbreviation: "CT"})
MATCH (inst:Framework {abbreviation: "IT"})
CREATE (cat)-[:UNDERLIES]->(inst);

// Institution Theory uses Category Theory concepts
MATCH (inst:Framework {abbreviation: "IT"})
MATCH (cat:Framework {abbreviation: "CT"})
CREATE (inst)-[:USES {mechanism: "categories, functors for signatures and models"}]->(cat);

// Feature Models use propositional logic (relation to DL)
MATCH (fm:Framework {abbreviation: "FM"})
MATCH (dl:Framework {abbreviation: "DL"})
CREATE (fm)-[:RELATED_TO {relationship: "propositional fragment"}]->(dl);

// -----------------------------------------------------------------------------
// Framework -> Reference relationships (FOUNDED_BY)
// -----------------------------------------------------------------------------

MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (r:Reference {authors: "Wille, R."})
CREATE (fca)-[:FOUNDED_BY]->(r);

MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (r:Reference {authors: "Ganter, B. & Wille, R."})
CREATE (fca)-[:DEFINITIVE_TREATMENT]->(r);

MATCH (dl:Framework {abbreviation: "DL"})
MATCH (r:Reference) WHERE r.title = "The Description Logic Handbook"
CREATE (dl)-[:FOUNDED_BY]->(r);

MATCH (dl:Framework {abbreviation: "DL"})
MATCH (r:Reference) WHERE r.title = "The Even More Irresistible SROIQ"
CREATE (dl)-[:FORMALIZES_OWL2]->(r);

MATCH (inst:Framework {abbreviation: "IT"})
MATCH (r:Reference {authors: "Goguen, J. & Burstall, R."})
CREATE (inst)-[:FOUNDED_BY]->(r);

MATCH (inst:Framework {abbreviation: "IT"})
MATCH (r:Reference {authors: "Diaconescu, R."})
CREATE (inst)-[:COMPREHENSIVE_TREATMENT]->(r);

MATCH (galois:Framework {abbreviation: "GC"})
MATCH (r:Reference {authors: "Cousot, P. & Cousot, R."})
CREATE (galois)-[:APPLIED_BY]->(r);

MATCH (fm:Framework {abbreviation: "FM"})
MATCH (r:Reference) WHERE r.title CONTAINS "FODA"
CREATE (fm)-[:FOUNDED_BY]->(r);

MATCH (fm:Framework {abbreviation: "FM"})
MATCH (r:Reference {authors: "Batory, D."})
CREATE (fm)-[:FORMAL_SEMANTICS]->(r);

MATCH (cat:Framework {abbreviation: "CT"})
MATCH (r:Reference) WHERE r.title = "A Categorical Manifesto"
CREATE (cat)-[:KEY_REFERENCE]->(r);

// -----------------------------------------------------------------------------
// Tool -> Framework relationships (IMPLEMENTS)
// -----------------------------------------------------------------------------

MATCH (owl:Tool {name: "OWL 2"})
MATCH (dl:Framework {abbreviation: "DL"})
CREATE (owl)-[:IMPLEMENTS]->(dl);

MATCH (shacl:Tool {name: "SHACL"})
MATCH (dl:Framework {abbreviation: "DL"})
CREATE (shacl)-[:COMPLEMENTS {purpose: "closed-world validation"}]->(dl);

MATCH (casl:Tool {name: "CASL"})
MATCH (inst:Framework {abbreviation: "IT"})
CREATE (casl)-[:IMPLEMENTS]->(inst);

MATCH (casl:Tool {name: "CASL"})
MATCH (cat:Framework {abbreviation: "CT"})
CREATE (casl)-[:IMPLEMENTS]->(cat);

MATCH (hets:Tool {name: "Hets"})
MATCH (inst:Framework {abbreviation: "IT"})
CREATE (hets)-[:IMPLEMENTS {mechanism: "institution comorphisms"}]->(inst);

// -----------------------------------------------------------------------------
// Standard relationships
// -----------------------------------------------------------------------------

// ISO 26262 (Automotive) derived from IEC 61508 (Generic)
MATCH (iso:Standard {name: "ISO 26262"})
MATCH (iec:Standard {name: "IEC 61508"})
CREATE (iso)-[:DERIVED_FROM {
    specialization: "automotive sector",
    year: 2011,
    note: "Sector-specific adaptation"
}]->(iec);

MATCH (iso:Standard {name: "ISO 26262"})
MATCH (iec:Standard {name: "IEC 61508"})
CREATE (iec)-[:ABSTRACTION_OF {framework: "Galois Connection"}]->(iso);

// DO-178C (Avionics) - historically independent but functionally related
MATCH (do178:Standard {name: "DO-178C"})
MATCH (iec:Standard {name: "IEC 61508"})
CREATE (do178)-[:FUNCTIONALLY_EQUIVALENT_TO {
    note: "Independent development but similar rigor levels",
    comparison_source: "CG2E Working Group"
}]->(iec);

// -----------------------------------------------------------------------------
// Requirement Type relationships
// -----------------------------------------------------------------------------

MATCH (cfsr:RequirementType {abbreviation: "CFSR"})
MATCH (afsr:RequirementType {abbreviation: "AFSR"})
CREATE (cfsr)-[:DECOMPOSES_TO]->(afsr);

MATCH (form:RequirementType {name: "Form"})
MATCH (afsr:RequirementType {abbreviation: "AFSR"})
CREATE (form)-[:CORRESPONDS_TO]->(afsr);

// -----------------------------------------------------------------------------
// Research Gap nodes
// -----------------------------------------------------------------------------

CREATE (gap1:ResearchGap {
    name: "Comprehensive Formal Model",
    description: "No comprehensive formal model mapping all IEC 61508 family requirements to atomic units"
})

CREATE (gap2:ResearchGap {
    name: "Automated Delta Tools",
    description: "No automated tools for computing requirement-level deltas between standards"
})

CREATE (gap3:ResearchGap {
    name: "Standard Ontology",
    description: "No standard ontology for safety requirements across domains"
})

CREATE (gap4:ResearchGap {
    name: "Cross-Standard Traceability",
    description: "Cross-standard traceability remains largely manual"
});

// =============================================================================
// USEFUL QUERIES
// =============================================================================

// Query 1: Find all capabilities of a framework
// MATCH (f:Framework)-[r:CAPTURES]->(c:Capability)
// WHERE f.abbreviation = "FCA"
// RETURN f.name, r.mechanism, c.name;

// Query 2: Find frameworks that can handle subsumption
// MATCH (f:Framework)-[:CAPTURES]->(c:Capability {name: "Subsumption Reasoning"})
// RETURN f.name, f.description;

// Query 3: Find mathematical concepts defined by each framework
// MATCH (f:Framework)-[:DEFINES]->(c:Concept)
// RETURN f.name, collect(c.name) AS concepts;

// Query 4: Find inter-framework dependencies
// MATCH (f1:Framework)-[r:USES|UNDERLIES|RELATED_TO]->(f2:Framework)
// RETURN f1.name, type(r), r.mechanism, f2.name;

// Query 5: Find limitations shared across frameworks
// MATCH (f:Framework)-[:DOES_NOT_CAPTURE]->(l:Limitation)
// RETURN l.name, collect(f.name) AS frameworks_with_limitation;

// Query 6: Full capability matrix
// MATCH (f:Framework)
// OPTIONAL MATCH (f)-[:CAPTURES]->(c:Capability)
// RETURN f.name, collect(c.name) AS capabilities
// ORDER BY f.name;

// Query 7: Recommended architecture path
// MATCH path = (fca:Framework {abbreviation: "FCA"})-[*1..2]-(other)
// WHERE other:Framework OR other:Capability
// RETURN path;

// =============================================================================
// LATTICE-THEORY.TS IMPLEMENTATION
// =============================================================================
// Integrity Classification Theory: A Domain-Agnostic Framework for 
// Impact-Driven Constraint Derivation
// =============================================================================

// -----------------------------------------------------------------------------
// 1. THE THEORY ITSELF
// -----------------------------------------------------------------------------

CREATE (ict:Theory {
    name: "Integrity Classification Theory",
    description: "A domain-agnostic framework for impact-driven constraint derivation",
    file: "lattice-theory.ts",
    core_insight: "Many engineering disciplines use ordered classification systems where higher levels indicate greater criticality and demand more stringent constraints",
    language: "TypeScript"
})

// -----------------------------------------------------------------------------
// 2. MATHEMATICAL DEFINITIONS (from theory)
// -----------------------------------------------------------------------------

CREATE (def1:Definition {
    number: 1,
    name: "Integrity Lattice",
    notation: "L = (E, ≤, ⊥, ⊤)",
    formal: "E is finite set of integrity levels, ≤ is total order, ⊥ is bottom, ⊤ is top",
    note: "Since E is totally ordered, forms a CHAIN: join(a,b) = max(a,b), meet(a,b) = min(a,b)",
    theory: "ICT"
})

CREATE (def2:Definition {
    number: 2,
    name: "Impact Space",
    notation: "I = (D₁ × D₂ × ... × Dₙ, ⊕)",
    formal: "Each Dᵢ is finite ordered set of impact dimensions, ⊕ is aggregation function",
    theory: "ICT"
})

CREATE (def3:Definition {
    number: 3,
    name: "Classification Functor",
    notation: "Φ: I → L",
    formal: "Monotonic function mapping impact assessments to integrity levels",
    property: "Order preserving: if i₁ ≤ᵢ i₂ then Φ(i₁) ≤ₗ Φ(i₂)",
    theory: "ICT"
})

CREATE (def4:Definition {
    number: 4,
    name: "Constraint Space",
    notation: "C = (C, ≤c)",
    formal: "C is set of engineering constraint bundles, ≤c is partial order (more stringent than)",
    theory: "ICT"
})

CREATE (def5:Definition {
    number: 5,
    name: "Constraint Derivation Functor",
    notation: "Ψ: L → C",
    formal: "Monotonic function mapping integrity levels to constraint bundles",
    property: "Order preserving: if ℓ₁ ≤ₗ ℓ₂ then Ψ(ℓ₁) ≤c Ψ(ℓ₂)",
    theory: "ICT"
})

CREATE (def6:Definition {
    number: 6,
    name: "Universal Ordinal Space",
    notation: "U = ([0, 1], ≤, 0, 1)",
    formal: "The canonical bounded chain into which all integrity lattices embed",
    theory: "ICT"
})

CREATE (def7:Definition {
    number: 7,
    name: "Normalization Functor",
    notation: "ν: L → U",
    formal: "ν(ℓⱼ) = j / (k - 1) for j-th level in lattice with k levels",
    property: "Order-preserving, maps ⊥ → 0, ⊤ → 1",
    theory: "ICT"
})

CREATE (def8:Definition {
    number: 8,
    name: "System Composition",
    notation: "⊙",
    formal: "For subsystems s₁...sₙ with levels ℓ₁...ℓₙ, system-level ℓ_sys determined by composition operator",
    rules: "SERIES: max (join), PARALLEL: min (meet), ALLOCATED: each ≥ system",
    theory: "ICT"
})

// -----------------------------------------------------------------------------
// 3. THEOREMS
// -----------------------------------------------------------------------------

CREATE (thm1:Theorem {
    number: 1,
    name: "Composition Theorem",
    statement: "The composition Ψ ∘ Φ: I → C is monotonic",
    meaning: "Higher impact → higher integrity → more stringent constraints",
    theory: "ICT"
})

CREATE (thm2:Theorem {
    number: 2,
    name: "Galois Connection Theorem",
    statement: "If Φ has a right adjoint Φᴿ: L → I, then (Φ, Φᴿ) forms a Galois connection",
    meaning: "Enables best approximation reasoning between impact and integrity",
    theory: "ICT"
})

CREATE (thm3:Theorem {
    number: 3,
    name: "Universal Property Theorem",
    statement: "For lattices L₁, L₂ with normalizations ν₁, ν₂: a ≤ᵤ b ⟺ ν₁(a) ≤ ν₂(b) is reflexive and transitive",
    caveat: "Preserves ORDER but discards SEMANTIC content - same position ≠ interchangeable",
    theory: "ICT"
})

CREATE (thm4:Theorem {
    number: 4,
    name: "Decomposition Theorem",
    statement: "If system S with requirement ℓ_sys decomposes into independent S₁...Sₙ",
    options: "Conservative: each Sᵢ gets ℓ_sys. Risk-distributed: requires probabilistic analysis",
    theory: "ICT"
})

// -----------------------------------------------------------------------------
// 4. TYPESCRIPT INTERFACES
// -----------------------------------------------------------------------------

CREATE (ts_ordering:TSInterface {
    name: "Ordering",
    type: "enum",
    values: ["LESS = -1", "EQUAL = 0", "GREATER = 1", "INCOMPARABLE = NaN"],
    description: "Ordering relation result for partial orders"
})

CREATE (ts_ordered_element:TSInterface {
    name: "OrderedElement",
    type: "interface",
    properties: ["id: string", "ordinal: number", "name: string"],
    description: "Abstract element in an ordered set"
})

CREATE (ts_bounded_lattice:TSInterface {
    name: "BoundedLattice<E>",
    type: "interface",
    properties: ["id: string", "name: string", "elements: readonly E[]", "bottom: E", "top: E"],
    methods: ["compare(a, b): Ordering", "join(a, b): E", "meet(a, b): E", "leq(a, b): boolean", "fromOrdinal(n): E", "normalize(e): number"],
    description: "A bounded lattice (specifically a chain/total order for integrity levels)"
})

CREATE (ts_impact_dimension:TSInterface {
    name: "ImpactDimension<T>",
    type: "interface",
    properties: ["id: string", "name: string", "description: string", "values: BoundedLattice<T>", "weight?: number"],
    description: "An abstract dimension in the impact space"
})

CREATE (ts_impact_assessment:TSInterface {
    name: "ImpactAssessment",
    type: "interface",
    properties: ["dimensions: Record<string, number>"],
    description: "A point in the impact space (concrete assessment)"
})

CREATE (ts_aggregation_strategy:TSInterface {
    name: "AggregationStrategy",
    type: "type",
    variants: ["max", "weighted_sum", "product", "custom"],
    description: "Strategy for combining impact dimensions"
})

CREATE (ts_impact_space:TSInterface {
    name: "ImpactSpace",
    type: "interface",
    properties: ["dimensions: ImpactDimension[]", "aggregation: AggregationStrategy"],
    description: "Complete impact space definition"
})

CREATE (ts_classification_functor:TSInterface {
    name: "ClassificationFunctor<E, L>",
    type: "interface",
    properties: ["impactSpace: ImpactSpace", "integrityLattice: L", "thresholds: number[]"],
    methods: ["classify(assessment): E"],
    description: "Maps impact assessments to integrity levels"
})

CREATE (ts_constraint_bundle:TSInterface {
    name: "ConstraintBundle",
    type: "interface",
    properties: ["id: string", "level: number", "description: string"],
    description: "Abstract constraint bundle for domain-specific constraints"
})

CREATE (ts_constraint_derivation:TSInterface {
    name: "ConstraintDerivation<E, C>",
    type: "interface",
    properties: ["integrityLattice: BoundedLattice<E>"],
    methods: ["derive(level): C"],
    description: "Maps integrity levels to constraints"
})

CREATE (ts_universal_ordinal:TSInterface {
    name: "UniversalOrdinal",
    type: "interface",
    extends: "OrderedElement",
    properties: ["normalizedValue: number", "sourceLattice: string", "sourceElement: string"],
    description: "Universal ordinal element normalized to [0, 1]"
})

CREATE (ts_cross_lattice_mapping:TSInterface {
    name: "CrossLatticeMapping<E1, E2>",
    type: "interface",
    properties: ["source: E1", "sourceLattice", "target: E2", "targetLattice", "approximationQuality"],
    quality_values: ["exact", "lower_bound", "upper_bound", "nearest"],
    description: "Result of mapping between different lattices"
})

CREATE (ts_composition_strategy:TSInterface {
    name: "CompositionStrategy",
    type: "type",
    variants: ["series", "parallel", "allocated"],
    description: "Strategy for combining subsystem integrity levels"
})

CREATE (ts_decomposition_result:TSInterface {
    name: "DecompositionResult<E>",
    type: "interface",
    properties: ["systemLevel: E", "subsystemLevels: E[]", "strategy", "valid: boolean", "rationale: string"],
    description: "Result of decomposing system requirement to subsystems"
})

CREATE (ts_lattice_homomorphism:TSInterface {
    name: "LatticeHomomorphism<E1, E2>",
    type: "interface",
    properties: ["source: BoundedLattice<E1>", "target: BoundedLattice<E2>", "preservesJoin: boolean", "preservesMeet: boolean"],
    methods: ["map(element): E2"],
    description: "Order and operation preserving map between lattices"
})

CREATE (ts_galois_connection:TSInterface {
    name: "GaloisConnection<A, B>",
    type: "interface",
    properties: ["sourceA: BoundedLattice<A>", "sourceB: BoundedLattice<B>"],
    methods: ["lower(a): B", "upper(b): A"],
    description: "Galois connection capturing best approximation properties",
    property: "F(a) ≤ b ⟺ a ≤ G(b)"
})

CREATE (ts_lattice_registry:TSInterface {
    name: "LatticeRegistry",
    type: "class",
    methods: ["register(lattice)", "get(id)", "registerHomomorphism()", "getHomomorphism()", "listLattices()"],
    description: "Registry for lattice instances across domains"
})

// -----------------------------------------------------------------------------
// 5. TYPESCRIPT FUNCTIONS
// -----------------------------------------------------------------------------

CREATE (fn_create_bounded_lattice:TSFunction {
    name: "createBoundedLattice",
    signature: "<E>(id, name, elements) => BoundedLattice<E>",
    description: "Create a bounded lattice from an array of elements (bottom to top)"
})

CREATE (fn_aggregate_impact:TSFunction {
    name: "aggregateImpact",
    signature: "(space, assessment) => number",
    description: "Aggregate impact dimensions into single score using space's strategy"
})

CREATE (fn_create_classification_functor:TSFunction {
    name: "createClassificationFunctor",
    signature: "<E>(impactSpace, integrityLattice, thresholds?) => ClassificationFunctor<E>",
    description: "Create classification functor with linear thresholds"
})

CREATE (fn_to_universal_ordinal:TSFunction {
    name: "toUniversalOrdinal",
    signature: "<E>(lattice, element) => UniversalOrdinal",
    description: "Convert lattice element to universal ordinal space"
})

CREATE (fn_compare_across_lattices:TSFunction {
    name: "compareAcrossLattices",
    signature: "<E1, E2>(lattice1, element1, lattice2, element2) => Ordering",
    description: "Compare elements from different lattices via universal ordinal"
})

CREATE (fn_find_nearest_equivalent:TSFunction {
    name: "findNearestEquivalent",
    signature: "<E1, E2>(sourceLattice, sourceElement, targetLattice) => CrossLatticeMapping",
    description: "Find nearest equivalent element in another lattice"
})

CREATE (fn_compose_integrity_levels:TSFunction {
    name: "composeIntegrityLevels",
    signature: "<E>(lattice, levels, strategy) => E",
    description: "Compose multiple integrity levels according to series/parallel/allocated strategy"
})

CREATE (fn_decompose_requirement:TSFunction {
    name: "decomposeRequirement",
    signature: "<E>(lattice, systemLevel, subsystemCount, strategy) => DecompositionResult",
    description: "Decompose system requirement to subsystems"
})

CREATE (fn_create_nearest_homomorphism:TSFunction {
    name: "createNearestHomomorphism",
    signature: "<E1, E2>(source, target) => LatticeHomomorphism",
    description: "Create homomorphism via nearest-neighbor mapping"
})

CREATE (fn_create_galois_connection:TSFunction {
    name: "createGaloisConnection",
    signature: "<A, B>(latticeA, latticeB) => GaloisConnection",
    description: "Create Galois connection between two lattices via rounding"
})

CREATE (fn_check_galois_property:TSFunction {
    name: "checkGaloisProperty",
    signature: "<A, B>(connection, a) => {inflated, original, roundTrip}",
    description: "Verify round-trip inflation property: G(F(a)) ≥ a"
})

CREATE (fn_describe_lattice:TSFunction {
    name: "describeLattice",
    signature: "<E>(lattice) => string",
    description: "Pretty-print a lattice with normalized values"
})

CREATE (fn_validate_lattice:TSFunction {
    name: "validateLattice",
    signature: "<E>(lattice) => {valid, errors}",
    description: "Validate lattice is well-formed (ordinals, bounds, operations)"
})

// -----------------------------------------------------------------------------
// 6. RELATIONSHIPS: Theory -> Definitions
// -----------------------------------------------------------------------------

MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (d:Definition) WHERE d.theory = "ICT"
CREATE (ict)-[:DEFINES]->(d);

// -----------------------------------------------------------------------------
// 7. RELATIONSHIPS: Theory -> Theorems
// -----------------------------------------------------------------------------

MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (t:Theorem) WHERE t.theory = "ICT"
CREATE (ict)-[:PROVES]->(t);

// -----------------------------------------------------------------------------
// 8. RELATIONSHIPS: Definitions -> TypeScript Interfaces
// -----------------------------------------------------------------------------

MATCH (def1:Definition {name: "Integrity Lattice"})
MATCH (ts:TSInterface {name: "BoundedLattice<E>"})
CREATE (ts)-[:IMPLEMENTS]->(def1);

MATCH (def2:Definition {name: "Impact Space"})
MATCH (ts:TSInterface {name: "ImpactSpace"})
CREATE (ts)-[:IMPLEMENTS]->(def2);

MATCH (def3:Definition {name: "Classification Functor"})
MATCH (ts:TSInterface {name: "ClassificationFunctor<E, L>"})
CREATE (ts)-[:IMPLEMENTS]->(def3);

MATCH (def4:Definition {name: "Constraint Space"})
MATCH (ts:TSInterface {name: "ConstraintBundle"})
CREATE (ts)-[:IMPLEMENTS]->(def4);

MATCH (def5:Definition {name: "Constraint Derivation Functor"})
MATCH (ts:TSInterface {name: "ConstraintDerivation<E, C>"})
CREATE (ts)-[:IMPLEMENTS]->(def5);

MATCH (def6:Definition {name: "Universal Ordinal Space"})
MATCH (ts:TSInterface {name: "UniversalOrdinal"})
CREATE (ts)-[:IMPLEMENTS]->(def6);

MATCH (def8:Definition {name: "System Composition"})
MATCH (ts:TSInterface {name: "CompositionStrategy"})
CREATE (ts)-[:IMPLEMENTS]->(def8);

// -----------------------------------------------------------------------------
// 9. RELATIONSHIPS: Theorems -> TypeScript Functions
// -----------------------------------------------------------------------------

MATCH (thm2:Theorem {name: "Galois Connection Theorem"})
MATCH (fn:TSFunction {name: "createGaloisConnection"})
CREATE (fn)-[:IMPLEMENTS]->(thm2);

MATCH (thm2:Theorem {name: "Galois Connection Theorem"})
MATCH (fn:TSFunction {name: "checkGaloisProperty"})
CREATE (fn)-[:VERIFIES]->(thm2);

MATCH (thm4:Theorem {name: "Decomposition Theorem"})
MATCH (fn:TSFunction {name: "decomposeRequirement"})
CREATE (fn)-[:IMPLEMENTS]->(thm4);

// -----------------------------------------------------------------------------
// 10. RELATIONSHIPS: Theory -> Mathematical Frameworks (from original document)
// -----------------------------------------------------------------------------

MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (galois:Framework {abbreviation: "GC"})
CREATE (ict)-[:BUILDS_ON {aspect: "abstraction-concretization via Galois connections"}]->(galois);

MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (fca:Framework {abbreviation: "FCA"})
CREATE (ict)-[:BUILDS_ON {aspect: "lattice structures and derivation operators"}]->(fca);

MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (cat:Framework {abbreviation: "CT"})
CREATE (ict)-[:BUILDS_ON {aspect: "functors for classification and constraint derivation"}]->(cat);

// -----------------------------------------------------------------------------
// 11. RELATIONSHIPS: TypeScript constructs -> Framework Concepts
// -----------------------------------------------------------------------------

MATCH (ts:TSInterface {name: "BoundedLattice<E>"})
MATCH (c:Concept {name: "Concept Lattice"})
CREATE (ts)-[:RELATED_TO {note: "implements chain/total order specialization"}]->(c);

MATCH (ts:TSInterface {name: "GaloisConnection<A, B>"})
MATCH (c:Concept {name: "Galois Connection Property"})
CREATE (ts)-[:IMPLEMENTS]->(c);

MATCH (ts:TSInterface {name: "LatticeHomomorphism<E1, E2>"})
MATCH (c:Concept {name: "Functor"})
CREATE (ts)-[:RELATED_TO {note: "homomorphisms are structure-preserving maps like functors"}]->(c);

MATCH (ts:TSFunction {name: "composeIntegrityLevels"})
MATCH (c:Concept {name: "Colimit/Pushout"})
CREATE (ts)-[:RELATED_TO {note: "composition of levels analogous to categorical composition"}]->(c);

// -----------------------------------------------------------------------------
// 12. RELATIONSHIPS: Theory -> Safety Standards
// -----------------------------------------------------------------------------

MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (iec:Standard {name: "IEC 61508"})
CREATE (ict)-[:APPLICABLE_TO {example: "SIL levels as integrity lattice"}]->(iec);

MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (ict)-[:APPLICABLE_TO {example: "ASIL levels as integrity lattice"}]->(iso);

// -----------------------------------------------------------------------------
// 13. RELATIONSHIPS: TypeScript Interface Dependencies
// -----------------------------------------------------------------------------

MATCH (ts1:TSInterface {name: "BoundedLattice<E>"})
MATCH (ts2:TSInterface {name: "OrderedElement"})
CREATE (ts1)-[:REQUIRES]->(ts2);

MATCH (ts1:TSInterface {name: "ImpactDimension<T>"})
MATCH (ts2:TSInterface {name: "BoundedLattice<E>"})
CREATE (ts1)-[:USES]->(ts2);

MATCH (ts1:TSInterface {name: "ClassificationFunctor<E, L>"})
MATCH (ts2:TSInterface {name: "ImpactSpace"})
CREATE (ts1)-[:USES]->(ts2);

MATCH (ts1:TSInterface {name: "ClassificationFunctor<E, L>"})
MATCH (ts2:TSInterface {name: "BoundedLattice<E>"})
CREATE (ts1)-[:USES]->(ts2);

MATCH (ts1:TSInterface {name: "ConstraintDerivation<E, C>"})
MATCH (ts2:TSInterface {name: "BoundedLattice<E>"})
CREATE (ts1)-[:USES]->(ts2);

MATCH (ts1:TSInterface {name: "ConstraintDerivation<E, C>"})
MATCH (ts2:TSInterface {name: "ConstraintBundle"})
CREATE (ts1)-[:USES]->(ts2);

MATCH (ts1:TSInterface {name: "UniversalOrdinal"})
MATCH (ts2:TSInterface {name: "OrderedElement"})
CREATE (ts1)-[:EXTENDS]->(ts2);

MATCH (ts1:TSInterface {name: "GaloisConnection<A, B>"})
MATCH (ts2:TSInterface {name: "BoundedLattice<E>"})
CREATE (ts1)-[:USES]->(ts2);

MATCH (ts1:TSInterface {name: "LatticeHomomorphism<E1, E2>"})
MATCH (ts2:TSInterface {name: "BoundedLattice<E>"})
CREATE (ts1)-[:USES]->(ts2);

// -----------------------------------------------------------------------------
// 14. RELATIONSHIPS: Functions -> Interfaces
// -----------------------------------------------------------------------------

MATCH (fn:TSFunction {name: "createBoundedLattice"})
MATCH (ts:TSInterface {name: "BoundedLattice<E>"})
CREATE (fn)-[:RETURNS]->(ts);

MATCH (fn:TSFunction {name: "createClassificationFunctor"})
MATCH (ts:TSInterface {name: "ClassificationFunctor<E, L>"})
CREATE (fn)-[:RETURNS]->(ts);

MATCH (fn:TSFunction {name: "toUniversalOrdinal"})
MATCH (ts:TSInterface {name: "UniversalOrdinal"})
CREATE (fn)-[:RETURNS]->(ts);

MATCH (fn:TSFunction {name: "findNearestEquivalent"})
MATCH (ts:TSInterface {name: "CrossLatticeMapping<E1, E2>"})
CREATE (fn)-[:RETURNS]->(ts);

MATCH (fn:TSFunction {name: "decomposeRequirement"})
MATCH (ts:TSInterface {name: "DecompositionResult<E>"})
CREATE (fn)-[:RETURNS]->(ts);

MATCH (fn:TSFunction {name: "createNearestHomomorphism"})
MATCH (ts:TSInterface {name: "LatticeHomomorphism<E1, E2>"})
CREATE (fn)-[:RETURNS]->(ts);

MATCH (fn:TSFunction {name: "createGaloisConnection"})
MATCH (ts:TSInterface {name: "GaloisConnection<A, B>"})
CREATE (fn)-[:RETURNS]->(ts);

// -----------------------------------------------------------------------------
// 15. CAVEAT NODE
// -----------------------------------------------------------------------------

CREATE (caveat:Caveat {
    name: "Universal Ordinal Semantic Loss",
    warning: "The universal ordinal preserves ORDER but discards SEMANTIC content",
    example: "ν(SIL_3) = ν(ASIL_D) does NOT mean they are interchangeable",
    implication: "Only indicates same ordinal position in respective lattices"
})

MATCH (def6:Definition {name: "Universal Ordinal Space"})
MATCH (caveat:Caveat {name: "Universal Ordinal Semantic Loss"})
CREATE (def6)-[:HAS_CAVEAT]->(caveat);

// =============================================================================
// ADDITIONAL QUERIES FOR LATTICE-THEORY
// =============================================================================

// Query 8: Find all TypeScript implementations of mathematical definitions
// MATCH (ts:TSInterface)-[:IMPLEMENTS]->(d:Definition)
// RETURN ts.name AS implementation, d.name AS definition, d.notation;

// Query 9: Trace from Framework to TypeScript implementation
// MATCH path = (f:Framework)-[:DEFINES]->(c:Concept)<-[:RELATED_TO|IMPLEMENTS]-(ts)
// WHERE ts:TSInterface OR ts:TSFunction
// RETURN path;

// Query 10: Find all theorems and their implementations
// MATCH (t:Theorem)<-[:IMPLEMENTS|VERIFIES]-(fn:TSFunction)
// RETURN t.name, t.statement, collect(fn.name) AS implementations;

// Query 11: Get the full dependency graph for a TypeScript interface
// MATCH path = (ts:TSInterface {name: "ClassificationFunctor<E, L>"})-[:USES|REQUIRES*1..3]->(dep)
// RETURN path;

// Query 12: Find how ICT theory connects to the original frameworks
// MATCH (ict:Theory)-[r:BUILDS_ON]->(f:Framework)
// RETURN ict.name, r.aspect, f.name;
// =============================================================================
// ADDITIONS FROM: Extracting Atomic Requirements from Safety Standards: 
//                 A Methodological Synthesis
// =============================================================================

// =============================================================================
// NEW NODE TYPES AND INSTANCES
// =============================================================================

// -----------------------------------------------------------------------------
// 1. EXTRACTION METHODOLOGIES
// -----------------------------------------------------------------------------

CREATE (srdp:Methodology {
    name: "Safety Requirements Decomposition Pattern",
    abbreviation: "SRDP",
    source: "Fraunhofer IESE",
    authors: "Pablo Oliveira Antonino et al.",
    venue: "SAFECOMP 2015",
    atomicity_criterion: "One failure cause per requirement",
    validation: "Lifemed Automated External Defibrillator system",
    domains: ["automotive", "avionics", "medical"]
})

CREATE (ears_method:Methodology {
    name: "Easy Approach to Requirements Syntax",
    abbreviation: "EARS",
    source: "Rolls-Royce",
    authors: "Alistair Mavin et al.",
    venue: "IEEE RE 2009",
    atomicity_criterion: "One trigger-response pair per requirement",
    adoption: "Widest industrial adoption of any structured requirements methodology"
})

CREATE (nlp_extraction:Methodology {
    name: "NLP-based Requirements Extraction",
    abbreviation: "NLP-RE",
    maturity: "Academic - limited industrial validation",
    industrial_validation_rate: "7%",
    best_f1_classification: 0.96,
    best_f1_extraction: 0.86,
    best_f1_ner: 0.92,
    limitation: "No public benchmarks for IEC 61508, ISO 26262, DO-178C"
})

CREATE (contract_design:Methodology {
    name: "Contract-Based Design",
    abbreviation: "CBD",
    structure: "Assume-Guarantee pairs",
    operations: ["composition", "refinement checking", "merging", "quotient"],
    atomicity_criterion: "Single assume-guarantee contract"
})

CREATE (okoh_method:Methodology {
    name: "Okoh-Myklebust Cross-Standard Mapping",
    abbreviation: "OKM",
    source: "Okoh and Myklebust (2024)",
    steps: ["artefact mapping", "supporting process mapping", "technique/measure comparison", "validation"],
    key_finding: "No direct 1-to-1 mapping between ASIL and SIL"
})

CREATE (formal_spec:Methodology {
    name: "Formal Specification Methods",
    includes: ["Z Notation", "Event-B", "Linear Temporal Logic"],
    atomicity_criterion: "Structural constraints and proof obligations"
})

// -----------------------------------------------------------------------------
// 2. EARS PATTERNS
// -----------------------------------------------------------------------------

CREATE (ears_ubiquitous:EARSPattern {
    name: "Ubiquitous",
    template: "The <system> shall <response>",
    use_case: "Always-active properties",
    keywords: ["shall"]
})

CREATE (ears_event:EARSPattern {
    name: "Event-driven",
    template: "WHEN <trigger>, the <system> shall <response>",
    use_case: "Triggered behaviors",
    keywords: ["WHEN", "shall"]
})

CREATE (ears_state:EARSPattern {
    name: "State-driven",
    template: "WHILE <state>, the <system> shall <response>",
    use_case: "State-dependent behaviors",
    keywords: ["WHILE", "shall"]
})

CREATE (ears_unwanted:EARSPattern {
    name: "Unwanted behavior",
    template: "IF <unwanted condition>, THEN the <system> shall <response>",
    use_case: "Error handling, safety",
    keywords: ["IF", "THEN", "shall"]
})

CREATE (ears_optional:EARSPattern {
    name: "Optional feature",
    template: "WHERE <feature included>, the <system> shall <response>",
    use_case: "Product line variability",
    keywords: ["WHERE", "shall"]
})

CREATE (ears_complex:EARSPattern {
    name: "Complex",
    template: "WHILE <precondition>, WHEN <trigger>, the <system> shall <response>",
    use_case: "Combined conditions",
    keywords: ["WHILE", "WHEN", "shall"]
})

// -----------------------------------------------------------------------------
// 3. ATOMICITY CRITERIA
// -----------------------------------------------------------------------------

CREATE (crit_failure_cause:AtomicityCriterion {
    name: "Single Failure Cause",
    source: "Antonino et al. SRDP",
    definition: "Requirement addresses exactly one failure cause from hazard analysis",
    type: "semantic",
    objectivity: "high"
})

CREATE (crit_singular:AtomicityCriterion {
    name: "Singular (IEEE 29148)",
    source: "IEEE Standard 29148",
    definition: "Requirement statement includes only one requirement with no use of conjunctions",
    type: "syntactic",
    objectivity: "medium"
})

CREATE (crit_self_contained:AtomicityCriterion {
    name: "Self-contained",
    source: "IEEE Standard 29148",
    definition: "Capable of being understood independently",
    type: "semantic",
    objectivity: "low"
})

CREATE (crit_indivisible:AtomicityCriterion {
    name: "Indivisible",
    source: "IEEE Standard 29148",
    definition: "Cannot be meaningfully decomposed further",
    type: "semantic",
    objectivity: "low"
})

CREATE (crit_testable:AtomicityCriterion {
    name: "Testable",
    source: "IEEE Standard 29148",
    definition: "Testing should fully exercise the capability and either 100% pass or fail",
    type: "verification",
    objectivity: "high"
})

CREATE (crit_trigger_response:AtomicityCriterion {
    name: "Single Trigger-Response",
    source: "EARS",
    definition: "One stimulus produces one response",
    type: "structural",
    objectivity: "high"
})

// -----------------------------------------------------------------------------
// 4. QUALITY FRAMEWORKS
// -----------------------------------------------------------------------------

CREATE (incose_guide:QualityFramework {
    name: "INCOSE Guide to Writing Requirements",
    rules_count: 42,
    characteristics_count: 15,
    individual_properties: ["Necessary", "Implementation-free", "Unambiguous", "Consistent", 
                           "Complete", "Singular", "Feasible", "Traceable", "Verifiable"],
    set_properties: ["Complete", "Consistent", "Feasible", "Comprehensible", "Able to be Validated"]
})

CREATE (incose_r6:QualityRule {
    id: "R6",
    name: "Explicit Units",
    description: "Use explicit units of measure",
    framework: "INCOSE"
})

CREATE (incose_r7:QualityRule {
    id: "R7",
    name: "Avoid Vague Terms",
    description: "Avoid vague terms: some, several, many, approximately",
    framework: "INCOSE"
})

CREATE (incose_r15:QualityRule {
    id: "R15",
    name: "Logical Expression Conventions",
    description: "Define logical expression conventions [X AND Y], [X OR Y]",
    framework: "INCOSE"
})

CREATE (incose_r16:QualityRule {
    id: "R16",
    name: "Avoid Negation",
    description: "Avoid use of 'not' where possible",
    framework: "INCOSE"
})

CREATE (incose_r24:QualityRule {
    id: "R24",
    name: "Avoid Ambiguous Pronouns",
    description: "Avoid pronouns that create ambiguity",
    framework: "INCOSE"
})

// -----------------------------------------------------------------------------
// 5. VALIDATION TECHNIQUES
// -----------------------------------------------------------------------------

CREATE (formal_inspection:ValidationTechnique {
    name: "Formal Inspection",
    defect_detection_rate: "70-80%",
    formality: "high"
})

CREATE (expert_review:ValidationTechnique {
    name: "Expert Review",
    defect_detection_rate: "60-70%",
    formality: "medium"
})

CREATE (walkthrough:ValidationTechnique {
    name: "Walk-through",
    defect_detection_rate: "40-50%",
    formality: "low"
})

// -----------------------------------------------------------------------------
// 6. ADDITIONAL TOOLS
// -----------------------------------------------------------------------------

CREATE (ibm_doors:Tool {
    name: "IBM DOORS",
    type: "Requirements Management",
    features: ["Database-centric", "strict link rules", "bidirectional traceability", "ReqIF support"],
    domain: "Safety-critical systems"
})

CREATE (polarion:Tool {
    name: "Siemens Polarion",
    type: "Requirements Management",
    certification: "TÜV certified",
    templates: ["DO-178C", "ISO 26262", "IEC 62304"],
    features: ["LiveDocs", "collaborative specification"]
})

CREATE (jama_connect:Tool {
    name: "Jama Connect",
    type: "Requirements Management",
    certification: "TÜV SÜD certified for ISO 26262 (ASIL D), IEC 61508 (SIL 3)",
    features: ["preconfigured automotive frameworks"]
})

CREATE (ldra:Tool {
    name: "LDRA tool suite",
    type: "Safety-Critical Verification",
    history: "50 years",
    features: ["bidirectional traceability", "MC/DC coverage", "full SDLC support"]
})

CREATE (kompozition:Tool {
    name: "Kompozition",
    type: "NLP Requirements Analysis",
    features: ["knowledge graph generation", "functional decomposition", "uncertainty identification"],
    maturity: "Commercial"
})

CREATE (gate:Tool {
    name: "GATE",
    full_name: "General Architecture for Text Engineering",
    type: "NLP Framework",
    features: ["JAPE patterns"],
    maturity: "Research"
})

CREATE (fret:Tool {
    name: "NASA FRET",
    full_name: "Formal Requirements Elicitation Tool",
    type: "Formal Methods",
    features: ["temporal logic generation"],
    source: "NASA",
    maturity: "Research"
})

CREATE (arsenal:Tool {
    name: "ARSENAL",
    type: "Semantic Analysis",
    maturity: "Research"
})

CREATE (ears_ctrl:Tool {
    name: "EARS-CTRL",
    type: "Formal Verification",
    venue: "NASA Formal Methods 2017",
    features: ["LTL translation", "controller synthesis", "realizability verification"],
    platform: "JetBrains MPS"
})

// -----------------------------------------------------------------------------
// 7. SAFETY ONTOLOGIES
// -----------------------------------------------------------------------------

CREATE (core_safety_ontology:Ontology {
    name: "Core Ontology of Safety Risk Concepts",
    source: "Springer 2016",
    standards_covered: ["IEC 61508", "ISO 26262", "EN 50126"],
    upper_ontology: "DOLCE",
    key_finding: "Core terms like 'Risk' defined differently across standards"
})

CREATE (hazop_ontology:Ontology {
    name: "HAZOP Ontology",
    concepts: ["Deviation", "Cause", "Consequence", "Safeguard"],
    guide_words: ["No", "Less", "More", "Part of", "As well as", "Reverse", "Other than"]
})

CREATE (fmea_ontology:Ontology {
    name: "FMEA Ontology",
    structure: "UML class diagram",
    purpose: "Validating failure mode analysis and determining component associations"
})

CREATE (ramss_ontology:Ontology {
    name: "Hybrid RAMSS Ontology",
    concepts: ["Reliability", "Availability", "Maintainability", "Safety", "Security"],
    domain: "Industrial control systems"
})

// -----------------------------------------------------------------------------
// 8. ADDITIONAL STANDARDS
// -----------------------------------------------------------------------------

CREATE (ieee29148:Standard {
    name: "IEEE 29148",
    domain: "Systems and Software Engineering",
    description: "Life cycle processes - Requirements engineering",
    current_version: "IEEE 29148-2018",
    first_published: 2011,
    last_updated: 2018,
    atomicity_criteria: ["Singular", "Self-contained", "Indivisible", "Testable"]
})

CREATE (iso21434:Standard {
    name: "ISO/SAE 21434",
    domain: "Automotive Cybersecurity",
    description: "Road vehicles - Cybersecurity engineering",
    current_version: "1st Edition",
    first_published: 2021,
    last_updated: 2021
})

CREATE (iso21448:Standard {
    name: "ISO/PAS 21448",
    abbreviation: "SOTIF",
    domain: "Automotive Safety",
    description: "Safety of the Intended Functionality",
    focus: "Autonomous system safety",
    current_version: "1st Edition",
    first_published: 2019,
    last_updated: 2022,
    note: "Promoted from PAS to full ISO standard in 2022"
})

CREATE (en50126:Standard {
    name: "EN 50126",
    domain: "Railway",
    description: "Railway Applications - RAMS specification and demonstration",
    current_version: "EN 50126-1:2017",
    first_published: 1999,
    last_updated: 2017
})

CREATE (iec62304:Standard {
    name: "IEC 62304",
    domain: "Medical Devices",
    description: "Medical device software - Software life cycle processes",
    current_version: "Edition 1.1",
    first_published: 2006,
    last_updated: 2015,
    integrity_levels: ["Class A", "Class B", "Class C"]
})

// -----------------------------------------------------------------------------
// 9. NLP ENTITY TYPES FOR REQUIREMENTS
// -----------------------------------------------------------------------------

CREATE (ent_actor:NLPEntityType {
    name: "Actor/Subject",
    description: "Entity performing the action"
})

CREATE (ent_action:NLPEntityType {
    name: "Action/Predicate",
    description: "The verb or action being performed"
})

CREATE (ent_object:NLPEntityType {
    name: "Object",
    description: "Entity receiving the action"
})

CREATE (ent_condition:NLPEntityType {
    name: "Condition",
    description: "Preconditions or triggers"
})

CREATE (ent_constraint:NLPEntityType {
    name: "Constraint",
    description: "Limitations or bounds"
})

CREATE (ent_performance:NLPEntityType {
    name: "Performance Parameter",
    description: "Quantitative performance specifications"
})

CREATE (ent_component:NLPEntityType {
    name: "System Component",
    description: "Referenced system parts"
})

CREATE (ent_crossref:NLPEntityType {
    name: "Cross-Reference",
    description: "References to other requirements or sections"
})

// -----------------------------------------------------------------------------
// 10. SAFETY INTEGRITY LEVEL MAPPINGS
// -----------------------------------------------------------------------------

CREATE (asil_d:IntegrityLevel {
    name: "ASIL D",
    standard: "ISO 26262",
    severity: "highest",
    calculation: "Severity × Exposure × Controllability"
})

CREATE (asil_c:IntegrityLevel {
    name: "ASIL C",
    standard: "ISO 26262",
    calculation: "Severity × Exposure × Controllability"
})

CREATE (asil_b:IntegrityLevel {
    name: "ASIL B",
    standard: "ISO 26262",
    calculation: "Severity × Exposure × Controllability"
})

CREATE (asil_a:IntegrityLevel {
    name: "ASIL A",
    standard: "ISO 26262",
    severity: "lowest ASIL",
    calculation: "Severity × Exposure × Controllability"
})

CREATE (qm:IntegrityLevel {
    name: "QM",
    standard: "ISO 26262",
    description: "Quality Management - no safety requirement"
})

CREATE (sil_3:IntegrityLevel {
    name: "SIL 3",
    standard: "IEC 61508",
    calculation: "PFH (Probability of Failure per Hour)"
})

CREATE (sil_2:IntegrityLevel {
    name: "SIL 2",
    standard: "IEC 61508",
    calculation: "PFH"
})

CREATE (sil_1:IntegrityLevel {
    name: "SIL 1",
    standard: "IEC 61508",
    calculation: "PFH"
})

// -----------------------------------------------------------------------------
// 11. FORM EXTRACTION PHASES
// -----------------------------------------------------------------------------

CREATE (phase1:ExtractionPhase {
    name: "Structural Preprocessing",
    order: 1,
    activities: ["Parse document hierarchy", "Identify shall statements (RFC 2119)", 
                 "Resolve cross-references", "Extract glossary terms"]
})

CREATE (phase2:ExtractionPhase {
    name: "EARS Pattern Classification",
    order: 2,
    activities: ["NLP classification by EARS pattern", "Extract structural components",
                 "Flag non-conforming requirements for review"]
})

CREATE (phase3:ExtractionPhase {
    name: "Atomicity Analysis",
    order: 3,
    activities: ["Conjunction test", "Failure-cause test", "Single testable behavior verification",
                 "Independence verification"]
})

CREATE (phase4:ExtractionPhase {
    name: "Expert Validation",
    order: 4,
    activities: ["INCOSE 42 rules checklist", "Domain expert verification",
                 "Cross-reference to hazard analysis", "Consistency checking"]
})

CREATE (phase5:ExtractionPhase {
    name: "Cross-Standard Mapping",
    order: 5,
    activities: ["Okoh-Myklebust methodology", "Terminology alignment glossary",
                 "Gap identification", "Document mapping rationale"]
})

// -----------------------------------------------------------------------------
// 12. ADDITIONAL REFERENCES
// -----------------------------------------------------------------------------

CREATE (ref_antonino2015:Reference {
    authors: "Antonino, P.O. et al.",
    year: 2015,
    title: "Safety Requirements Decomposition Pattern",
    venue: "SAFECOMP 2015",
    institution: "Fraunhofer IESE"
})

CREATE (ref_mavin2009:Reference {
    authors: "Mavin, A. et al.",
    year: 2009,
    title: "Easy Approach to Requirements Syntax (EARS)",
    venue: "IEEE RE 2009",
    institution: "Rolls-Royce"
})

CREATE (ref_okoh2024:Reference {
    authors: "Okoh & Myklebust",
    year: 2024,
    title: "ISO 26262 to IEC 61508 Mapping Methodology",
    key_finding: "No direct 1-to-1 mapping between ASIL and SIL"
})

CREATE (ref_machrouh2012:Reference {
    authors: "Machrouh et al.",
    year: 2012,
    title: "CG2E Working Group Cross-Domain Comparison",
    domains: ["civil aviation", "automotive", "space", "nuclear", "railway", "industrial automation"]
})

CREATE (ref_verhulst2013:Reference {
    authors: "Verhulst et al.",
    year: 2013,
    title: "ASIL-SIL Correspondence Validation"
})

// -----------------------------------------------------------------------------
// 13. RESEARCH GAPS (from methodological synthesis)
// -----------------------------------------------------------------------------

CREATE (gap_nlp_validation:ResearchGap {
    name: "NLP Industrial Validation",
    description: "Only 7% of 130 NLP4RE tools validated in industrial settings",
    statistic: "7%"
})

CREATE (gap_safety_benchmarks:ResearchGap {
    name: "Safety Standards NLP Benchmarks",
    description: "No public benchmark datasets for IEC 61508, ISO 26262, or DO-178C"
})

CREATE (gap_cross_references:ResearchGap {
    name: "Cross-Reference Extraction",
    description: "Nested and multi-layered references show comparatively higher error rates"
})

CREATE (gap_implicit_req:ResearchGap {
    name: "Implicit Requirements",
    description: "Making implicit safety requirements explicit requires contract-based formalization"
})

CREATE (gap_unified_ontology:ResearchGap {
    name: "Unified Safety Ontology",
    description: "No unified ontology spanning all safety domains"
})

CREATE (gap_ml_safety:ResearchGap {
    name: "AI/ML System Safety",
    description: "ISO 26262 assumes deterministic systems - missing AI/ML concepts"
})

CREATE (gap_llm_ner:ResearchGap {
    name: "LLM NER Performance",
    description: "ChatGPT/Gemini achieve only 0.25-0.36 F1 on NER vs 0.92 for fine-tuned models"
})

// -----------------------------------------------------------------------------
// 14. ORGANIZATIONS
// -----------------------------------------------------------------------------

CREATE (fraunhofer:Organization {
    name: "Fraunhofer IESE",
    type: "Research Institute",
    contribution: "AFSR/CFSR Pattern, Safety Requirements Decomposition"
})

CREATE (rolls_royce:Organization {
    name: "Rolls-Royce",
    type: "Industry",
    contribution: "EARS methodology development and validation"
})

CREATE (incose:Organization {
    name: "INCOSE",
    full_name: "International Council on Systems Engineering",
    type: "Standards Body",
    contribution: "Guide to Writing Requirements - 42 rules, 15 characteristics"
})

CREATE (nasa:Organization {
    name: "NASA",
    type: "Government Agency",
    contribution: "FRET, EARS-CTRL adoption"
})

CREATE (cg2e:Organization {
    name: "CG2E Working Group",
    type: "Cross-Domain Consortium",
    domains: ["civil aviation", "automotive", "space", "nuclear", "railway", "industrial automation"]
})

// =============================================================================
// RELATIONSHIP CREATION
// =============================================================================

// -----------------------------------------------------------------------------
// Methodology relationships
// -----------------------------------------------------------------------------

// SRDP defines AFSR/CFSR
MATCH (srdp:Methodology {abbreviation: "SRDP"})
MATCH (afsr:RequirementType {abbreviation: "AFSR"})
CREATE (srdp)-[:DEFINES]->(afsr);

MATCH (srdp:Methodology {abbreviation: "SRDP"})
MATCH (cfsr:RequirementType {abbreviation: "CFSR"})
CREATE (srdp)-[:DEFINES]->(cfsr);

// EARS defines its patterns
MATCH (ears:Methodology {abbreviation: "EARS"})
MATCH (p:EARSPattern)
CREATE (ears)-[:DEFINES]->(p);

// Methodology -> Atomicity Criterion
MATCH (srdp:Methodology {abbreviation: "SRDP"})
MATCH (c:AtomicityCriterion {name: "Single Failure Cause"})
CREATE (srdp)-[:USES_CRITERION]->(c);

MATCH (ears:Methodology {abbreviation: "EARS"})
MATCH (c:AtomicityCriterion {name: "Single Trigger-Response"})
CREATE (ears)-[:USES_CRITERION]->(c);

// Methodology -> Organization
MATCH (srdp:Methodology {abbreviation: "SRDP"})
MATCH (f:Organization {name: "Fraunhofer IESE"})
CREATE (srdp)-[:DEVELOPED_BY]->(f);

MATCH (ears:Methodology {abbreviation: "EARS"})
MATCH (rr:Organization {name: "Rolls-Royce"})
CREATE (ears)-[:DEVELOPED_BY]->(rr);

// EARS industrial adopters - using MERGE to prevent duplicates
MERGE (airbus:Organization {name: "Airbus"}) 
ON CREATE SET airbus.type = "Industry"
WITH airbus
MATCH (ears:Methodology {abbreviation: "EARS"})
CREATE (ears)-[:ADOPTED_BY]->(airbus);

MERGE (bosch:Organization {name: "Bosch"}) 
ON CREATE SET bosch.type = "Industry"
WITH bosch
MATCH (ears:Methodology {abbreviation: "EARS"})
CREATE (ears)-[:ADOPTED_BY]->(bosch);

MERGE (daimler:Organization {name: "Daimler"}) 
ON CREATE SET daimler.type = "Industry"
WITH daimler
MATCH (ears:Methodology {abbreviation: "EARS"})
CREATE (ears)-[:ADOPTED_BY]->(daimler);

MERGE (dyson:Organization {name: "Dyson"}) 
ON CREATE SET dyson.type = "Industry"
WITH dyson
MATCH (ears:Methodology {abbreviation: "EARS"})
CREATE (ears)-[:ADOPTED_BY]->(dyson);

MERGE (honeywell:Organization {name: "Honeywell"}) 
ON CREATE SET honeywell.type = "Industry"
WITH honeywell
MATCH (ears:Methodology {abbreviation: "EARS"})
CREATE (ears)-[:ADOPTED_BY]->(honeywell);

MERGE (intel:Organization {name: "Intel"}) 
ON CREATE SET intel.type = "Industry"
WITH intel
MATCH (ears:Methodology {abbreviation: "EARS"})
CREATE (ears)-[:ADOPTED_BY]->(intel);

MATCH (ears:Methodology {abbreviation: "EARS"})
MATCH (nasa:Organization {name: "NASA"})
CREATE (ears)-[:ADOPTED_BY]->(nasa);

MERGE (siemens:Organization {name: "Siemens"}) 
ON CREATE SET siemens.type = "Industry"
WITH siemens
MATCH (ears:Methodology {abbreviation: "EARS"})
CREATE (ears)-[:ADOPTED_BY]->(siemens);

// -----------------------------------------------------------------------------
// Tool relationships
// -----------------------------------------------------------------------------

// EARS-CTRL extends EARS
MATCH (ctrl:Tool {name: "EARS-CTRL"})
MATCH (ears:Methodology {abbreviation: "EARS"})
CREATE (ctrl)-[:EXTENDS]->(ears);

// Tools implement methodologies
MATCH (fret:Tool {name: "NASA FRET"})
MATCH (formal:Methodology {name: "Formal Specification Methods"})
CREATE (fret)-[:IMPLEMENTS]->(formal);

// Tool certifications
MATCH (polarion:Tool {name: "Siemens Polarion"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (polarion)-[:CERTIFIED_FOR]->(iso);

MATCH (polarion:Tool {name: "Siemens Polarion"})
MATCH (do178:Standard {name: "DO-178C"})
CREATE (polarion)-[:SUPPORTS]->(do178);

MATCH (jama:Tool {name: "Jama Connect"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (jama)-[:CERTIFIED_FOR {level: "ASIL D"}]->(iso);

MATCH (jama:Tool {name: "Jama Connect"})
MATCH (iec:Standard {name: "IEC 61508"})
CREATE (jama)-[:CERTIFIED_FOR {level: "SIL 3"}]->(iec);

// -----------------------------------------------------------------------------
// Standard relationships
// -----------------------------------------------------------------------------

// Integrity level mappings (Verhulst et al. 2013)
MATCH (asil_d:IntegrityLevel {name: "ASIL D"})
MATCH (sil_3:IntegrityLevel {name: "SIL 3"})
CREATE (asil_d)-[:CORRESPONDS_TO {source: "Verhulst et al. 2013", type: "approximate"}]->(sil_3);

MATCH (asil_c:IntegrityLevel {name: "ASIL C"})
MATCH (sil_2:IntegrityLevel {name: "SIL 2"})
CREATE (asil_c)-[:CORRESPONDS_TO {source: "Verhulst et al. 2013", type: "approximate"}]->(sil_2);

MATCH (asil_b:IntegrityLevel {name: "ASIL B"})
MATCH (sil_1:IntegrityLevel {name: "SIL 1"})
CREATE (asil_b)-[:CORRESPONDS_TO {source: "Verhulst et al. 2013", type: "approximate"}]->(sil_1);

// Create "No SIL" level using MERGE to prevent duplicates
MERGE (no_sil:IntegrityLevel {name: "No SIL"})
ON CREATE SET no_sil.standard = "IEC 61508", no_sil.description = "No safety integrity level required"
WITH no_sil
MATCH (qm:IntegrityLevel {name: "QM"})
CREATE (qm)-[:CORRESPONDS_TO]->(no_sil);

// Standard defines integrity levels
MATCH (iso:Standard {name: "ISO 26262"})
MATCH (il:IntegrityLevel)
WHERE il.standard = "ISO 26262"
CREATE (iso)-[:DEFINES]->(il);

MATCH (iec:Standard {name: "IEC 61508"})
MATCH (il:IntegrityLevel)
WHERE il.standard = "IEC 61508"
CREATE (iec)-[:DEFINES]->(il);

// IEEE 29148 defines atomicity criteria
MATCH (ieee:Standard {name: "IEEE 29148"})
MATCH (c:AtomicityCriterion)
WHERE c.source = "IEEE Standard 29148"
CREATE (ieee)-[:DEFINES]->(c);

// Standard family relationships (complete derivation chains)
MATCH (iec62304:Standard {name: "IEC 62304"})
MATCH (iec61508:Standard {name: "IEC 61508"})
CREATE (iec62304)-[:DERIVED_FROM {
    specialization: "medical devices",
    note: "Software lifecycle processes for medical device software"
}]->(iec61508);

MATCH (en50126:Standard {name: "EN 50126"})
MATCH (iec61508:Standard {name: "IEC 61508"})
CREATE (en50126)-[:DERIVED_FROM {
    specialization: "railway",
    note: "RAMS specification for railway applications"
}]->(iec61508);

// ISO 21434 (Automotive Cybersecurity) relates to ISO 26262 (Automotive Safety)
MATCH (iso21434:Standard {name: "ISO/SAE 21434"})
MATCH (iso26262:Standard {name: "ISO 26262"})
CREATE (iso21434)-[:COMPLEMENTS {
    aspect: "cybersecurity",
    note: "Security counterpart to safety standard"
}]->(iso26262);

// ISO 21448 SOTIF complements ISO 26262
MATCH (iso21448:Standard {name: "ISO/PAS 21448"})
MATCH (iso26262:Standard {name: "ISO 26262"})
CREATE (iso21448)-[:COMPLEMENTS {
    aspect: "intended functionality",
    note: "Addresses safety beyond random hardware failures"
}]->(iso26262);

// -----------------------------------------------------------------------------
// Quality framework relationships
// -----------------------------------------------------------------------------

MATCH (incose_guide:QualityFramework {name: "INCOSE Guide to Writing Requirements"})
MATCH (r:QualityRule)
WHERE r.framework = "INCOSE"
CREATE (incose_guide)-[:CONTAINS]->(r);

MATCH (incose_guide:QualityFramework {name: "INCOSE Guide to Writing Requirements"})
MATCH (org:Organization {name: "INCOSE"})
CREATE (incose_guide)-[:PUBLISHED_BY]->(org);

// -----------------------------------------------------------------------------
// Extraction phase relationships
// -----------------------------------------------------------------------------

MATCH (p1:ExtractionPhase {order: 1})
MATCH (p2:ExtractionPhase {order: 2})
CREATE (p1)-[:FOLLOWED_BY]->(p2);

MATCH (p2:ExtractionPhase {order: 2})
MATCH (p3:ExtractionPhase {order: 3})
CREATE (p2)-[:FOLLOWED_BY]->(p3);

MATCH (p3:ExtractionPhase {order: 3})
MATCH (p4:ExtractionPhase {order: 4})
CREATE (p3)-[:FOLLOWED_BY]->(p4);

MATCH (p4:ExtractionPhase {order: 4})
MATCH (p5:ExtractionPhase {order: 5})
CREATE (p4)-[:FOLLOWED_BY]->(p5);

// Phases use methodologies
MATCH (p2:ExtractionPhase {name: "EARS Pattern Classification"})
MATCH (ears:Methodology {abbreviation: "EARS"})
CREATE (p2)-[:USES]->(ears);

MATCH (p3:ExtractionPhase {name: "Atomicity Analysis"})
MATCH (srdp:Methodology {abbreviation: "SRDP"})
CREATE (p3)-[:USES]->(srdp);

MATCH (p4:ExtractionPhase {name: "Expert Validation"})
MATCH (incose:QualityFramework {name: "INCOSE Guide to Writing Requirements"})
CREATE (p4)-[:USES]->(incose);

MATCH (p5:ExtractionPhase {name: "Cross-Standard Mapping"})
MATCH (okm:Methodology {abbreviation: "OKM"})
CREATE (p5)-[:USES]->(okm);

// -----------------------------------------------------------------------------
// Ontology relationships
// -----------------------------------------------------------------------------

MATCH (core:Ontology {name: "Core Ontology of Safety Risk Concepts"})
MATCH (iec:Standard {name: "IEC 61508"})
CREATE (core)-[:COVERS]->(iec);

MATCH (core:Ontology {name: "Core Ontology of Safety Risk Concepts"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (core)-[:COVERS]->(iso);

MATCH (core:Ontology {name: "Core Ontology of Safety Risk Concepts"})
MATCH (en:Standard {name: "EN 50126"})
CREATE (core)-[:COVERS]->(en);

// -----------------------------------------------------------------------------
// NLP methodology relationships
// -----------------------------------------------------------------------------

MATCH (nlp:Methodology {abbreviation: "NLP-RE"})
MATCH (ent:NLPEntityType)
CREATE (nlp)-[:EXTRACTS]->(ent);

// -----------------------------------------------------------------------------
// Reference relationships
// -----------------------------------------------------------------------------

MATCH (srdp:Methodology {abbreviation: "SRDP"})
MATCH (ref:Reference {authors: "Antonino, P.O. et al."})
CREATE (srdp)-[:PUBLISHED_IN]->(ref);

MATCH (ears:Methodology {abbreviation: "EARS"})
MATCH (ref:Reference {authors: "Mavin, A. et al."})
CREATE (ears)-[:PUBLISHED_IN]->(ref);

MATCH (okm:Methodology {abbreviation: "OKM"})
MATCH (ref:Reference {authors: "Okoh & Myklebust", year: 2024})
CREATE (okm)-[:PUBLISHED_IN]->(ref);

// -----------------------------------------------------------------------------
// Cross-links to existing Mathematical Frameworks
// -----------------------------------------------------------------------------

// Contract-based design relates to Description Logics
MATCH (cbd:Methodology {abbreviation: "CBD"})
MATCH (dl:Framework {abbreviation: "DL"})
CREATE (cbd)-[:FORMALIZABLE_IN]->(dl);

// Formal spec methods relate to Institution Theory
MATCH (formal:Methodology {name: "Formal Specification Methods"})
MATCH (inst:Framework {abbreviation: "IT"})
CREATE (formal)-[:RELATED_TO]->(inst);

// EARS-CTRL uses temporal logic (relates to formal methods)
// Create LTL concept using MERGE to prevent duplicates
MERGE (ltl:Concept {name: "Linear Temporal Logic"})
ON CREATE SET 
    ltl.abbreviation = "LTL",
    ltl.definition = "Modal logic for reasoning about time-dependent properties",
    ltl.framework = "Formal Methods"
WITH ltl
MATCH (ctrl:Tool {name: "EARS-CTRL"})
CREATE (ctrl)-[:USES]->(ltl);

// Failure-cause criterion relates to FCA (object-attribute analysis)
MATCH (crit:AtomicityCriterion {name: "Single Failure Cause"})
MATCH (fca:Framework {abbreviation: "FCA"})
CREATE (crit)-[:ANALYZABLE_WITH {
    mechanism: "Failure causes as attributes, requirements as objects"
}]->(fca);

// =============================================================================
// USEFUL QUERIES FOR METHODOLOGICAL CONTENT
// =============================================================================

// Query: Find all EARS patterns
// MATCH (p:EARSPattern)
// RETURN p.name, p.template, p.use_case;

// Query: Get extraction methodology pipeline
// MATCH path = (p1:ExtractionPhase)-[:FOLLOWED_BY*]->(pn:ExtractionPhase)
// WHERE p1.order = 1
// RETURN path;

// Query: Find atomicity criteria and their sources
// MATCH (c:AtomicityCriterion)
// RETURN c.name, c.source, c.definition, c.objectivity;

// Query: ASIL to SIL mapping
// MATCH (a:IntegrityLevel)-[r:CORRESPONDS_TO]->(s:IntegrityLevel)
// WHERE a.standard = "ISO 26262"
// RETURN a.name, s.name, r.type;

// Query: Find tools certified for specific standards
// MATCH (t:Tool)-[:CERTIFIED_FOR]->(s:Standard)
// RETURN t.name, s.name;

// Query: Find methodologies with industrial validation
// MATCH (m:Methodology)-[:ADOPTED_BY]->(o:Organization {type: "Industry"})
// RETURN m.name, collect(o.name) AS adopters;

// Query: Complete methodology ecosystem
// MATCH (m:Methodology)
// OPTIONAL MATCH (m)-[:USES_CRITERION]->(c:AtomicityCriterion)
// OPTIONAL MATCH (m)-[:DEVELOPED_BY]->(o:Organization)
// RETURN m.name, m.atomicity_criterion, c.name AS formal_criterion, o.name AS developer;
// =============================================================================
// ADDITIONS FROM: Formalized Hypotheses: Ontology-Guided LLM Validation
//                 Theoretical Foundations, Architectural Requirements, 
//                 and Fundamental Limits
// =============================================================================

// =============================================================================
// PART I: ARCHITECTURAL NECESSITY HYPOTHESES
// =============================================================================

CREATE (h1:Hypothesis {
    id: "H1",
    name: "Feedback Loop Necessity Hypothesis",
    category: "Architectural Necessity",
    formal_statement: "For LLM-generated outputs requiring conformance to a formal ontology O, iterative validation with feedback produces significantly higher conformance rates than single-pass generation",
    formula: "P(valid | iterative) > P(valid | one-shot)",
    testable_prediction: "One-shot LLM generation will fail ontology validation at rate r₁, while iterative feedback-guided generation will achieve validation at rate r₂, where r₂ >> r₁",
    supporting_evidence: "Stanford study (2024): 96% reduction in hallucinations with RAG + RLHF + guardrails"
})

CREATE (h2:Hypothesis {
    id: "H2",
    name: "Dual-Layer Validation Hypothesis",
    category: "Architectural Necessity",
    formal_statement: "Effective ontology validation requires two complementary formal mechanisms operating jointly: SHACL (structural, closed-world) and OWL Reasoner (logical, open-world)",
    formula: "Valid(o, O) ⟺ SHACL_pass(o) ∧ OWL_consistent(o, O)",
    testable_prediction: "Systems using only SHACL will miss logical inconsistencies; systems using only OWL will miss structural violations",
    critical_distinction: "OWL: 'Not stated ≠ false'; SHACL: 'If not there, violation'"
})

CREATE (h3:Hypothesis {
    id: "H3",
    name: "Tripartite Feedback Architecture Hypothesis",
    category: "Architectural Necessity",
    formal_statement: "Effective ontology-constrained LLM output requires three jointly necessary components: Violation Detection (V), Explanation Generation (E), and Constrained Regeneration (R)",
    formula: "Convergence ⟹ (V ∧ E ∧ R)",
    testable_prediction: "Removing any single component will significantly degrade convergence rates",
    supporting_evidence: "xpSHACL (July 2025), OL-KGC method (2025) shows 9.5-12% accuracy improvement"
})

// =============================================================================
// PART II: BOTTLENECK AND LIMITATION HYPOTHESES
// =============================================================================

CREATE (h4:Hypothesis {
    id: "H4",
    name: "Parsing Bottleneck Hypothesis",
    category: "Bottleneck",
    formal_statement: "The NL→RDF semantic parsing step is the primary source of validation failure, independent of ontology quality or reasoning completeness",
    formula: "Error_total = Error_parsing + Error_validation + Error_reasoning, where Error_parsing >> Error_validation + Error_reasoning",
    testable_prediction: "Given perfect parsing (oracle), validation accuracy approaches ceiling; given realistic parsing, accuracy bounded by parsing quality",
    rationale: "LLMs are statistically trained and do not enforce structure",
    research_priority: 1
})

CREATE (h5:Hypothesis {
    id: "H5",
    name: "Coverage Ceiling Hypothesis",
    category: "Bottleneck",
    formal_statement: "Validation accuracy is upper-bounded by ontology coverage κ, where empirically κ ≈ 0.04–0.30 for even best-formalized domains",
    formula: "P(validatable) ≤ κ",
    implication: "For claims outside ontology coverage (1 - κ), system can only classify as 'unvalidatable'",
    research_priority: 2
})

CREATE (h6:Hypothesis {
    id: "H6",
    name: "Expressiveness-Decidability Tradeoff Hypothesis",
    category: "Bottleneck",
    formal_statement: "There exists a fundamental tradeoff between ontology expressiveness and computational tractability that imposes hard limits on validatable constraint types",
    testable_prediction: "Complex regulatory logic will either exceed decidable fragments (verification impossible) or require expressiveness sacrifices",
    example_limitation: "OWL DL prohibits number restrictions on transitive properties"
})

CREATE (h7:Hypothesis {
    id: "H7",
    name: "Convergence Stratification Hypothesis",
    category: "Bottleneck",
    formal_statement: "Convergence behavior is stratified by constraint complexity class C",
    formula: "E[iterations(C₁)] < E[iterations(C₂)] ≤ ∞",
    supporting_evidence: "CRANE algorithm (2025): strict formal constraints diminish LLM reasoning capabilities",
    research_priority: 4
})

// =============================================================================
// PART III: THEORETICAL IMPOSSIBILITY HYPOTHESES
// =============================================================================

CREATE (h8:Hypothesis {
    id: "H8",
    name: "Verification Intractability Hypothesis",
    category: "Theoretical Impossibility",
    formal_statement: "Complete formal verification of neural network outputs is computationally intractable for production-scale LLMs",
    scalability_gap: "GPT-4 parameters / Verifiable network size = 1.8×10¹² / 10⁵ ≈ 10⁷",
    testable_prediction: "No polynomial-time algorithm will achieve complete verification; approximate methods lose precision with depth",
    tools_limit: "α,β-CROWN, Marabou handle ~100K neurons; LLMs exceed by 4-7 orders of magnitude"
})

CREATE (h9:Hypothesis {
    id: "H9",
    name: "Architectural Hallucination Hypothesis",
    category: "Theoretical Impossibility",
    formal_statement: "Hallucination is architecturally intrinsic to LLMs, not a correctable defect",
    formula: "P(hallucination = 0) = 0 for any LLM architecture",
    critical_insight: "LLMs generate truth and falsehood through identical mechanisms",
    karpathy_quote: "In some sense, hallucination is all LLMs do. They are dream machines.",
    marcus_quote: "The only way you can kill hallucinations is to not run the system."
})

// =============================================================================
// PART IV: EMPIRICAL REALITY HYPOTHESES
// =============================================================================

CREATE (h10:Hypothesis {
    id: "H10",
    name: "Guarantee-Performance Incompatibility Hypothesis",
    category: "Empirical Reality",
    formal_statement: "Systems achieving high precision on validation do so through strategic abstention, trading recall for reliability",
    formula: "Precision ↑ ⟹ Recall ↓",
    evidence: "AWS ARc claims >99% soundness explicitly at cost of recall; best factuality methods achieve 75-85% accuracy"
})

CREATE (h11:Hypothesis {
    id: "H11",
    name: "Claim-Performance Divergence Hypothesis",
    category: "Empirical Reality",
    formal_statement: "Commercial AI validation claims systematically overstate empirical performance by a factor of 2-10x",
    evidence_lexis: "Lexis+ AI claims 'hallucination-free' but empirical rate ~17%",
    evidence_westlaw: "Westlaw AI claims 'avoid hallucinations' but rate ~33%",
    benchmark_gap: "TruthfulQA: LLMs 70-75% vs Human 94%"
})

CREATE (h12:Hypothesis {
    id: "H12",
    name: "Syntactic-Semantic Validation Dichotomy",
    category: "Empirical Reality",
    formal_statement: "Current techniques provide strong guarantees for syntactic correctness but only soft constraints for semantic accuracy",
    syntactic_achievable: "DOMINO constrained decoding: ~100% JSON schema compliance",
    semantic_limitation: "Logic Tensor Networks: fuzzy truth values ∈ [0,1], not logical certainty"
})

// =============================================================================
// PART V: ACHIEVABILITY HYPOTHESES
// =============================================================================

CREATE (h13:Hypothesis {
    id: "H13",
    name: "Guarantee Transformation Hypothesis",
    category: "Achievability",
    formal_statement: "Iterative ontology validation transforms system guarantee from infeasibility to epistemic transparency",
    achievable_guarantee: "∀ output o: Valid(o, O) ∨ Flagged(o, reason)",
    flag_reasons: ["parsing_failure", "constraint_violation", "logical_inconsistency", "out_of_ontology", "non_convergence", "abstention"],
    impossible_guarantee: "Output is mathematically correct"
})

CREATE (h14:Hypothesis {
    id: "H14",
    name: "Layered Mitigation Efficacy Hypothesis",
    category: "Achievability",
    formal_statement: "Layered mitigation strategies achieve meaningful but bounded risk reduction",
    formula: "Risk_mitigated = Risk_baseline × Π(1 - εᵢ)",
    critical_bound: "No combination eliminates residual risk; 96% reduction still implies 4% residual hallucination"
})

CREATE (h15:Hypothesis {
    id: "H15",
    name: "Domain Restriction Efficacy Hypothesis",
    category: "Achievability",
    formal_statement: "Formal validation achieves highest efficacy in domains with enumerable rule space, complete formal specification, closed-world semantics, and static knowledge base",
    formula: "Efficacy(D) ∝ Enumerability(D) × Completeness(D) × Closure(D) × Stability(D)",
    high_efficacy_domains: ["Mortgage approval", "Insurance underwriting", "HR policy compliance", "Pharmaceutical regulatory"],
    low_efficacy_domains: ["Open-domain QA", "Legal reasoning", "Medical diagnosis", "Financial regulation"],
    research_priority: 5
})

// =============================================================================
// PART VI: KNOWLEDGE ACQUISITION HYPOTHESES
// =============================================================================

CREATE (h16:Hypothesis {
    id: "H16",
    name: "Knowledge Acquisition Bottleneck Hypothesis",
    category: "Knowledge Acquisition",
    formal_statement: "Even if verification were tractable, knowledge formalization rate is bounded by scarcity of dual-expertise practitioners",
    constraint: "Creating formal ontologies requires simultaneous domain expertise AND ontological engineering expertise",
    limitation: "Automated ontology learning produces results far from carefully crafted ontologies"
})

CREATE (h17:Hypothesis {
    id: "H17",
    name: "Incompleteness Unknowability Hypothesis",
    category: "Knowledge Acquisition",
    formal_statement: "For any knowledge base KB, determining the location and degree of incompleteness is itself an unsolved problem",
    quote: "The first problem is arguably to know whether and where the KB is incomplete in the first place, and to which degree.",
    source: "ACM Computing Surveys, 2024",
    implication: "Formal systems cannot reliably flag outputs as incorrect if relevant knowledge was never encoded"
})

// =============================================================================
// VALIDATION LAYERS
// =============================================================================

CREATE (shacl_layer:ValidationLayer {
    name: "SHACL Structural Validation",
    technology: "SHACL",
    function: "Constraint checking, cardinality, value ranges",
    world_assumption: "Closed World",
    behavior: "If not there, that's a violation"
})

CREATE (owl_layer:ValidationLayer {
    name: "OWL Logical Consistency",
    technology: "OWL Reasoner",
    function: "Inference, subsumption, contradiction detection",
    world_assumption: "Open World",
    behavior: "Not stated ≠ false"
})

// =============================================================================
// FEEDBACK ARCHITECTURE COMPONENTS
// =============================================================================

CREATE (violation_detection:ArchitectureComponent {
    name: "Violation Detection",
    abbreviation: "V",
    role: "SHACL/OWL identifies what's wrong",
    example: "Property 'treatedBy' expects a Doctor, got a string"
})

CREATE (explanation_gen:ArchitectureComponent {
    name: "Explanation Generation",
    abbreviation: "E",
    role: "Convert formal violation to natural language",
    example: "You said the patient is treated by 'aspirin' but treatments must reference a Doctor entity"
})

CREATE (constrained_regen:ArchitectureComponent {
    name: "Constrained Regeneration",
    abbreviation: "R",
    role: "LLM re-prompts with violation context",
    mechanism: "Prompt includes violation + ontology fragment"
})

// =============================================================================
// CONSTRAINT COMPLEXITY CLASSES
// =============================================================================

CREATE (c1:ConstraintClass {
    name: "C₁ - Simple Constraints",
    description: "Simple type/cardinality violations",
    convergence: "≤2 iterations",
    example: "Age must be integer 0-150"
})

CREATE (c2:ConstraintClass {
    name: "C₂ - Complex Constraints",
    description: "Complex logical inconsistencies",
    convergence: "May not converge; risk of incorrect convergence",
    example: "Transitive property restrictions"
})

CREATE (c3:ConstraintClass {
    name: "C₃ - Out-of-Ontology",
    description: "Claims beyond encoded knowledge",
    convergence: "Correctly flagged as unvalidatable",
    example: "Claims beyond encoded knowledge"
})

// =============================================================================
// OWL PROFILES (Expressiveness-Decidability Tradeoff)
// =============================================================================

CREATE (owl_el:OWLProfile {
    name: "OWL 2 EL",
    expressiveness: "Low",
    complexity: "P-time",
    practical_implication: "Tractable but cannot express many real-world constraints"
})

CREATE (owl_ql:OWLProfile {
    name: "OWL 2 QL",
    expressiveness: "Low",
    complexity: "NLogSpace",
    practical_implication: "Optimized for query answering only"
})

CREATE (owl_rl:OWLProfile {
    name: "OWL 2 RL",
    expressiveness: "Medium",
    complexity: "P-time",
    practical_implication: "Rule-based, limited expressiveness"
})

CREATE (owl_dl:OWLProfile {
    name: "OWL DL (SROIQ)",
    expressiveness: "High",
    complexity: "NExpTime-complete",
    practical_implication: "Decidable but computationally prohibitive at scale"
})

CREATE (full_fol:OWLProfile {
    name: "Full FOL+",
    expressiveness: "Full",
    complexity: "Undecidable",
    practical_implication: "Verification impossible even in principle"
})

// =============================================================================
// THEORETICAL BARRIERS
// =============================================================================

CREATE (barrier_np:TheoreticalBarrier {
    name: "ReLU Network NP-Completeness",
    citation: "Katz et al., CAV 2017 (CAV Award 2024)",
    implication: "Holds even for single hidden layer",
    type: "Computational Complexity"
})

CREATE (barrier_undecidable:TheoreticalBarrier {
    name: "GNN Output Reachability Undecidability",
    citation: "Sälzer & Lange, 2022",
    implication: "Unbounded inputs → undecidable",
    type: "Decidability"
})

CREATE (barrier_turing:TheoreticalBarrier {
    name: "Transformer Turing Completeness",
    citation: "Multiple results",
    implication: "Many verification properties undecidable",
    type: "Expressiveness"
})

CREATE (barrier_mechanism:TheoreticalBarrier {
    name: "Mechanism Design Impossibility",
    citation: "arXiv 2506.06382",
    implication: "No inference mechanism can simultaneously satisfy: truthful generation, semantic information conservation, relevant knowledge revelation, knowledge-constrained optimality",
    theorem: "Green-Laffont theorem"
})

CREATE (barrier_semantic:TheoreticalBarrier {
    name: "Semantic Boundary Dissolution",
    citation: "Nourizadeh (2025)",
    implication: "Rule-based systems enforce via syntactic boundaries; LLMs implement safety as probability mass shifts that dissolve under contextual pressure",
    type: "Architectural"
})

// =============================================================================
// ONTOLOGY COVERAGE EVIDENCE
// =============================================================================

CREATE (coverage_snomed:OntologyCoverage {
    name: "SNOMED CT",
    concepts: "~300K in EL++",
    coverage_issue: ">1/3 definitions contain modeling inconsistencies; epistemic intrusion persists",
    domain: "Medical"
})

CREATE (coverage_icd11:OntologyCoverage {
    name: "ICD-11",
    concepts: "~3,000/70,000 (~4%) formally defined",
    coverage_issue: "Ontology layer never completed; remainder uses SKOS broader-than",
    domain: "Medical"
})

CREATE (coverage_fhir:OntologyCoverage {
    name: "FHIR",
    concepts: "87 OWL classes",
    coverage_issue: "Less noticeable is a formal semantic data model",
    domain: "Healthcare Interoperability"
})

CREATE (coverage_legal:OntologyCoverage {
    name: "Legal (LKIF, LRI-Core)",
    concepts: "Lightweight",
    coverage_issue: "Cannot express deontic logic, defeasible reasoning",
    domain: "Legal"
})

CREATE (coverage_financial:OntologyCoverage {
    name: "Financial (Basel III)",
    concepts: "No official formal ontology exists",
    coverage_issue: "FIBO fragments without standardized adoption",
    domain: "Financial Regulation"
})

// =============================================================================
// VALIDATION CAPABILITY MATRIX
// =============================================================================

CREATE (cap_entity_exists:ValidationCapability {
    name: "Entities exist in ontology",
    validatable: true,
    refutable: true,
    outcome: "Binary"
})

CREATE (cap_shacl_conform:ValidationCapability {
    name: "Relationships conform to SHACL constraints",
    validatable: true,
    refutable: true,
    outcome: "Binary"
})

CREATE (cap_owl_axioms:ValidationCapability {
    name: "Assertions satisfy OWL axioms",
    validatable: true,
    refutable: true,
    outcome: "Binary"
})

CREATE (cap_nl_rdf:ValidationCapability {
    name: "NL→RDF conversion accuracy",
    validatable: false,
    refutable: false,
    outcome: "Unverifiable"
})

CREATE (cap_out_ontology:ValidationCapability {
    name: "Out-of-ontology claims",
    validatable: false,
    refutable: false,
    outcome: "Flagged only"
})

CREATE (cap_probabilistic:ValidationCapability {
    name: "Probabilistic/soft claims",
    validatable: false,
    refutable: false,
    outcome: "Outside scope"
})

CREATE (cap_temporal:ValidationCapability {
    name: "Temporal/contextual validity",
    validatable: false,
    refutable: false,
    outcome: "Outside scope"
})

CREATE (cap_factual:ValidationCapability {
    name: "General factual accuracy",
    validatable: false,
    refutable: false,
    outcome: "Theoretically impossible"
})

// =============================================================================
// RISK REDUCTION EVIDENCE
// =============================================================================

CREATE (risk_rag_rlhf:RiskReduction {
    approach: "RAG + RLHF + guardrails",
    reduction: "96%",
    source: "Stanford 2024"
})

CREATE (risk_constrained:RiskReduction {
    approach: "Constrained decoding (DOMINO)",
    reduction: "~100% for syntax",
    limitation: "Syntactic only"
})

CREATE (risk_kbert:RiskReduction {
    approach: "Knowledge grounding (K-BERT)",
    reduction: "213% recall improvement",
    source: "Benchmark studies"
})

CREATE (risk_olkgc:RiskReduction {
    approach: "Ontological constraints (OL-KGC)",
    reduction: "9.5-12% accuracy improvement",
    source: "2025 study"
})

CREATE (risk_posthoc:RiskReduction {
    approach: "Post-hoc verification (RefChecker, SAFE)",
    reduction: "75-85% detection accuracy",
    limitation: "Can flag but not prevent errors"
})

// =============================================================================
// EXPERT QUOTES
// =============================================================================

CREATE (quote_bengio:ExpertQuote {
    expert: "Yoshua Bengio",
    credentials: "Turing Award",
    quote: "I see this problem boiling down to our inability to provide to the AI a formal and complete specification of what is unacceptable... There are fundamental scientific reasons why this is a hard problem, maybe even unsolvable."
})

CREATE (quote_bengio2:ExpertQuote {
    expert: "Bengio et al.",
    source: "Towards Guaranteed Safe AI (2024)",
    quote: "The goal is more like 'a safety case involving proofs' than 'a formal proof of safety'—probabilistic bounds rather than logical certainty."
})

CREATE (quote_karpathy:ExpertQuote {
    expert: "Andrej Karpathy",
    credentials: "OpenAI",
    quote: "In some sense, hallucination is all LLMs do. They are dream machines... It's only when the dreams go into deemed factually incorrect territory that we label it a hallucination."
})

CREATE (quote_marcus:ExpertQuote {
    expert: "Gary Marcus",
    quote: "The only way you can kill hallucinations is to not run the system."
})

// =============================================================================
// BENCHMARK RESULTS
// =============================================================================

CREATE (bench_truthfulqa:Benchmark {
    name: "TruthfulQA",
    llm_performance: "70-75%",
    human_performance: "94%",
    gap: "19-24 percentage points"
})

CREATE (bench_simpleqa:Benchmark {
    name: "SimpleQA Verified (2025)",
    best_performance: "55.6 F1 (Gemini 2.5 Pro)",
    gap: "Substantial"
})

CREATE (bench_lexis:Benchmark {
    name: "Stanford Legal AI Study",
    platform: "Lexis+ AI",
    claim: "Hallucination-free",
    actual_rate: "~17%",
    divergence: "∞ (claimed 0%)"
})

CREATE (bench_westlaw:Benchmark {
    name: "Stanford Legal AI Study",
    platform: "Westlaw AI",
    claim: "Avoid hallucinations",
    actual_rate: "~33%",
    divergence: ">3x competitors"
})

// =============================================================================
// VERIFICATION TOOLS
// =============================================================================

// Verification tools with hierarchical labels (Tool:VerificationTool)
CREATE (tool_crown:Tool:VerificationTool {
    name: "α,β-CROWN",
    type: "Neural Network Verifier",
    capacity: "~100K neurons",
    limitation: "4-7 orders of magnitude below LLM scale"
})

CREATE (tool_marabou:Tool:VerificationTool {
    name: "Marabou",
    type: "Neural Network Verifier",
    capacity: "~100K neurons",
    limitation: "4-7 orders of magnitude below LLM scale"
})

CREATE (tool_domino:Tool:VerificationTool {
    name: "DOMINO",
    type: "Constrained Decoding",
    capability: "JSON schema compliance",
    performance: "1.42x throughput improvement",
    gsm8k_accuracy: "41.8% vs 41.5% baseline"
})

CREATE (tool_xpshacl:Tool:VerificationTool {
    name: "xpSHACL",
    type: "Explainable Validation",
    date: "July 2025",
    features: ["rule-based justification trees", "RAG integration"]
})

CREATE (tool_refchecker:Tool:VerificationTool {
    name: "RefChecker",
    type: "Post-hoc Verification",
    accuracy: "75-85%",
    limitation: "Cannot prevent errors, only flag"
})

CREATE (tool_safe:Tool:VerificationTool {
    name: "SAFE",
    type: "Post-hoc Verification",
    accuracy: "75-85%",
    limitation: "Cannot prevent errors, only flag"
})

CREATE (tool_ltn:Tool:VerificationTool {
    name: "Logic Tensor Networks",
    abbreviation: "LTN",
    type: "Neuro-symbolic",
    output: "Fuzzy truth values ∈ [0,1]",
    limitation: "Not logical certainty"
})

// =============================================================================
// RESEARCH PRIORITIES
// =============================================================================

CREATE (priority1:ResearchPriority {
    rank: 1,
    target_hypothesis: "H4",
    name: "Parsing Bottleneck",
    approach: "Improve NL→RDF semantic parsing",
    expected_yield: "Highest ROI; current primary failure mode"
})

CREATE (priority2:ResearchPriority {
    rank: 2,
    target_hypothesis: "H5",
    name: "Coverage Ceiling",
    approach: "Expand ontology coverage in high-value domains",
    expected_yield: "Increases validatable claim space"
})

CREATE (priority3:ResearchPriority {
    rank: 3,
    target_hypothesis: "H3",
    name: "Feedback Architecture",
    approach: "Optimize explanation generation",
    expected_yield: "Faster convergence, fewer iterations"
})

CREATE (priority4:ResearchPriority {
    rank: 4,
    target_hypothesis: "H7",
    name: "Convergence Stratification",
    approach: "Characterize C₂ non-convergence",
    expected_yield: "Enables reliable abstention decisions"
})

CREATE (priority5:ResearchPriority {
    rank: 5,
    target_hypothesis: "H15",
    name: "Domain Restriction",
    approach: "Identify optimal domain characteristics",
    expected_yield: "Focus investment on tractable applications"
})

// =============================================================================
// ACHIEVABILITY SUMMARY NODES
// =============================================================================

CREATE (impossible1:TheoreticalImpossibility {
    claim: "Mathematical correctness guarantees for LLM outputs",
    barriers: ["NP-completeness", "undecidability", "architectural hallucination"],
    citations: ["Katz 2017", "Sälzer 2022", "Nourizadeh 2025"]
})

CREATE (impossible2:TheoreticalImpossibility {
    claim: "Zero hallucination rate",
    barrier: "Identical generation mechanism for truth/falsehood",
    citations: ["Karpathy", "Marcus", "arXiv 2506.06382"]
})

CREATE (impossible3:TheoreticalImpossibility {
    claim: "Complete verification of neural networks",
    barriers: ["10⁷ scalability gap", "NExpTime complexity"],
    citations: ["α,β-CROWN limits"]
})

CREATE (impossible4:TheoreticalImpossibility {
    claim: "Full domain knowledge formalization",
    barrier: "Expressiveness-decidability tradeoff",
    citations: ["OWL DL theory"]
})

CREATE (achievable1:AchievableCapability {
    capability: "Syntactic correctness guarantees",
    mechanism: "Constrained decoding (DOMINO)",
    performance: "~100% for defined grammars"
})

CREATE (achievable2:AchievableCapability {
    capability: "High precision for narrow domains",
    mechanism: "Verify-or-abstain strategy",
    performance: ">99% precision, reduced recall"
})

CREATE (achievable3:AchievableCapability {
    capability: "Significant risk reduction",
    mechanism: "Layered mitigation (RAG + RLHF + guardrails)",
    performance: "42-96% reduction"
})

CREATE (achievable4:AchievableCapability {
    capability: "Probabilistic safety bounds",
    mechanism: "Compositional architectures",
    performance: "Meaningful but not absolute"
})

CREATE (achievable5:AchievableCapability {
    capability: "Epistemic transparency",
    mechanism: "Explicit flagging with reasons",
    performance: "Validated ∨ Flagged guarantee"
})

// =============================================================================
// VALUE PROPOSITION
// =============================================================================

CREATE (value_prop:ValueProposition {
    achievable: "Validated-conformant ∨ Explicitly-flagged-with-reason: We will either give you a validated answer that conforms to formal domain knowledge, or we will tell you we couldn't validate it—we won't silently hallucinate.",
    not_achievable: "Mathematical correctness guarantees for all outputs",
    key_insight: "The gap between 'significantly safer AI' and 'mathematically guaranteed AI' is not merely wide—it is theoretically unbridgeable for general-purpose language models."
})

// =============================================================================
// RELATIONSHIPS
// =============================================================================

// -----------------------------------------------------------------------------
// Hypothesis Category Relationships
// -----------------------------------------------------------------------------

// Create category nodes
CREATE (cat_arch:HypothesisCategory {name: "Architectural Necessity", hypotheses: ["H1", "H2", "H3"]})
CREATE (cat_bottle:HypothesisCategory {name: "Bottleneck", hypotheses: ["H4", "H5", "H6", "H7"]})
CREATE (cat_impossible:HypothesisCategory {name: "Theoretical Impossibility", hypotheses: ["H8", "H9"]})
CREATE (cat_empirical:HypothesisCategory {name: "Empirical Reality", hypotheses: ["H10", "H11", "H12"]})
CREATE (cat_achieve:HypothesisCategory {name: "Achievability", hypotheses: ["H13", "H14", "H15"]})
CREATE (cat_knowledge:HypothesisCategory {name: "Knowledge Acquisition", hypotheses: ["H16", "H17"]})

// Link hypotheses to categories
MATCH (h:Hypothesis), (c:HypothesisCategory)
WHERE h.category = c.name
CREATE (h)-[:BELONGS_TO]->(c);

// -----------------------------------------------------------------------------
// Hypothesis Dependencies
// -----------------------------------------------------------------------------

// H2 supports H1 (dual-layer enables effective feedback)
MATCH (h1:Hypothesis {id: "H1"})
MATCH (h2:Hypothesis {id: "H2"})
CREATE (h2)-[:SUPPORTS {
    degree: 1.0,
    rationale: "SHACL+OWL dual validation is necessary for effective feedback loops"
}]->(h1);

// H3 depends on H2 (tripartite requires dual-layer)
MATCH (h2:Hypothesis {id: "H2"})
MATCH (h3:Hypothesis {id: "H3"})
CREATE (h3)-[:DEPENDS_ON]->(h2);

// H4 limits H1-H3 (parsing bottleneck)
MATCH (h4:Hypothesis {id: "H4"})
MATCH (h:Hypothesis)
WHERE h.id IN ["H1", "H2", "H3"]
CREATE (h4)-[:LIMITS]->(h);

// H5 limits validation scope
MATCH (h5:Hypothesis {id: "H5"})
MATCH (h13:Hypothesis {id: "H13"})
CREATE (h5)-[:CONSTRAINS]->(h13);

// H6 explains H7
MATCH (h6:Hypothesis {id: "H6"})
MATCH (h7:Hypothesis {id: "H7"})
CREATE (h6)-[:EXPLAINS]->(h7);

// H8 and H9 prove impossibilities
MATCH (h8:Hypothesis {id: "H8"})
MATCH (i:TheoreticalImpossibility {claim: "Complete verification of neural networks"})
CREATE (h8)-[:PROVES]->(i);

MATCH (h9:Hypothesis {id: "H9"})
MATCH (i:TheoreticalImpossibility {claim: "Zero hallucination rate"})
CREATE (h9)-[:PROVES]->(i);

// H13 defines achievable guarantee
MATCH (h13:Hypothesis {id: "H13"})
MATCH (a:AchievableCapability {capability: "Epistemic transparency"})
CREATE (h13)-[:ENABLES]->(a);

// H14 quantifies mitigation
MATCH (h14:Hypothesis {id: "H14"})
MATCH (a:AchievableCapability {capability: "Significant risk reduction"})
CREATE (h14)-[:QUANTIFIES]->(a);

// -----------------------------------------------------------------------------
// Validation Layer Relationships
// -----------------------------------------------------------------------------

MATCH (h2:Hypothesis {id: "H2"})
MATCH (shacl:ValidationLayer {technology: "SHACL"})
CREATE (h2)-[:REQUIRES]->(shacl);

MATCH (h2:Hypothesis {id: "H2"})
MATCH (owl:ValidationLayer {technology: "OWL Reasoner"})
CREATE (h2)-[:REQUIRES]->(owl);

// Link to existing SHACL tool
MATCH (shacl_layer:ValidationLayer {technology: "SHACL"})
MATCH (shacl_tool:Tool {name: "SHACL"})
CREATE (shacl_layer)-[:IMPLEMENTED_BY]->(shacl_tool);

// -----------------------------------------------------------------------------
// Architecture Component Relationships
// -----------------------------------------------------------------------------

MATCH (h3:Hypothesis {id: "H3"})
MATCH (v:ArchitectureComponent {abbreviation: "V"})
CREATE (h3)-[:REQUIRES_COMPONENT]->(v);

MATCH (h3:Hypothesis {id: "H3"})
MATCH (e:ArchitectureComponent {abbreviation: "E"})
CREATE (h3)-[:REQUIRES_COMPONENT]->(e);

MATCH (h3:Hypothesis {id: "H3"})
MATCH (r:ArchitectureComponent {abbreviation: "R"})
CREATE (h3)-[:REQUIRES_COMPONENT]->(r);

// -----------------------------------------------------------------------------
// Constraint Class Relationships
// -----------------------------------------------------------------------------

MATCH (h7:Hypothesis {id: "H7"})
MATCH (c:ConstraintClass)
CREATE (h7)-[:STRATIFIES]->(c);

// -----------------------------------------------------------------------------
// OWL Profile Relationships
// -----------------------------------------------------------------------------

MATCH (h6:Hypothesis {id: "H6"})
MATCH (p:OWLProfile)
CREATE (h6)-[:DESCRIBES_TRADEOFF]->(p);

// Link OWL profiles to existing DL framework
MATCH (dl:Framework {abbreviation: "DL"})
MATCH (p:OWLProfile)
CREATE (dl)-[:HAS_PROFILE]->(p);

// -----------------------------------------------------------------------------
// Coverage Evidence Relationships
// -----------------------------------------------------------------------------

MATCH (h5:Hypothesis {id: "H5"})
MATCH (c:OntologyCoverage)
CREATE (h5)-[:EVIDENCED_BY]->(c);

// -----------------------------------------------------------------------------
// Barrier Relationships
// -----------------------------------------------------------------------------

MATCH (h8:Hypothesis {id: "H8"})
MATCH (b:TheoreticalBarrier)
WHERE b.type IN ["Computational Complexity", "Decidability", "Expressiveness"]
CREATE (h8)-[:CITES]->(b);

MATCH (h9:Hypothesis {id: "H9"})
MATCH (b:TheoreticalBarrier)
WHERE b.type = "Architectural" OR b.theorem = "Green-Laffont theorem"
CREATE (h9)-[:CITES]->(b);

// -----------------------------------------------------------------------------
// Research Priority Relationships
// -----------------------------------------------------------------------------

MATCH (p:ResearchPriority)
MATCH (h:Hypothesis)
WHERE h.id = p.target_hypothesis
CREATE (p)-[:TARGETS]->(h);

// -----------------------------------------------------------------------------
// Tool Relationships
// -----------------------------------------------------------------------------

MATCH (h8:Hypothesis {id: "H8"})
MATCH (t:VerificationTool)
WHERE t.name IN ["α,β-CROWN", "Marabou"]
CREATE (h8)-[:REFERENCES_TOOL]->(t);

MATCH (h12:Hypothesis {id: "H12"})
MATCH (t:VerificationTool {name: "DOMINO"})
CREATE (h12)-[:REFERENCES_TOOL]->(t);

MATCH (h3:Hypothesis {id: "H3"})
MATCH (t:VerificationTool {name: "xpSHACL"})
CREATE (h3)-[:SUPPORTED_BY]->(t);

// -----------------------------------------------------------------------------
// Cross-links to Existing Graph Elements
// -----------------------------------------------------------------------------

// Link validation layers to existing Description Logics framework
MATCH (owl_layer:ValidationLayer {technology: "OWL Reasoner"})
MATCH (dl:Framework {abbreviation: "DL"})
CREATE (owl_layer)-[:BASED_ON]->(dl);

// Link ontology coverage to research gaps
MATCH (h5:Hypothesis {id: "H5"})
MATCH (g:ResearchGap {name: "Unified Safety Ontology"})
CREATE (h5)-[:RELATES_TO]->(g);

// Link knowledge acquisition to existing gap
MATCH (h16:Hypothesis {id: "H16"})
MATCH (g:ResearchGap {name: "Comprehensive Formal Model"})
CREATE (h16)-[:EXPLAINS]->(g);

// Link parsing bottleneck to NLP methodology
MATCH (h4:Hypothesis {id: "H4"})
MATCH (nlp:Methodology {abbreviation: "NLP-RE"})
CREATE (h4)-[:CRITIQUES]->(nlp);

// Link convergence stratification to atomicity criteria
MATCH (h7:Hypothesis {id: "H7"})
MATCH (crit:AtomicityCriterion {name: "Single Failure Cause"})
CREATE (h7)-[:AFFECTS_VALIDATION_OF]->(crit);

// Link achievable guarantee to INCOSE quality framework
MATCH (h13:Hypothesis {id: "H13"})
MATCH (incose:QualityFramework {name: "INCOSE Guide to Writing Requirements"})
CREATE (h13)-[:COMPLEMENTS]->(incose);

// Link domain restriction to extraction phases
MATCH (h15:Hypothesis {id: "H15"})
MATCH (p5:ExtractionPhase {name: "Cross-Standard Mapping"})
CREATE (h15)-[:INFORMS]->(p5);

// =============================================================================
// USEFUL QUERIES FOR HYPOTHESIS CONTENT
// =============================================================================

// Query: Get all hypotheses by category
// MATCH (h:Hypothesis)-[:BELONGS_TO]->(c:HypothesisCategory)
// RETURN c.name AS category, collect(h.id + ": " + h.name) AS hypotheses
// ORDER BY c.name;

// Query: Find theoretical impossibilities and their proofs
// MATCH (h:Hypothesis)-[:PROVES]->(i:TheoreticalImpossibility)
// RETURN h.id, h.name, i.claim, i.barriers;

// Query: Get research priorities with target hypotheses
// MATCH (p:ResearchPriority)-[:TARGETS]->(h:Hypothesis)
// RETURN p.rank, p.name, h.id, h.name, p.expected_yield
// ORDER BY p.rank;

// Query: Find validation capability matrix
// MATCH (c:ValidationCapability)
// RETURN c.name, c.validatable, c.refutable, c.outcome;

// Query: Get OWL profiles and their tradeoffs
// MATCH (p:OWLProfile)
// RETURN p.name, p.expressiveness, p.complexity, p.practical_implication;

// Query: Find ontology coverage gaps
// MATCH (c:OntologyCoverage)
// RETURN c.name, c.domain, c.coverage_issue;

// Query: Get risk reduction evidence
// MATCH (r:RiskReduction)
// RETURN r.approach, r.reduction, r.source, r.limitation;

// Query: Find hypothesis dependency chain
// MATCH path = (h1:Hypothesis)-[:DEPENDS_ON|SUPPORTS|LIMITS*]->(h2:Hypothesis)
// RETURN path;

// Query: Get achievable vs impossible capabilities
// MATCH (a:AchievableCapability)
// RETURN "Achievable" AS type, a.capability, a.mechanism, a.performance
// UNION
// MATCH (i:TheoreticalImpossibility)
// RETURN "Impossible" AS type, i.claim AS capability, i.barrier AS mechanism, null AS performance;
// =============================================================================
// ADDITIONS FROM: Universal Knowledge Compiler: Research Landscape and
//                 Formal Hypothesis Analysis
// =============================================================================

// =============================================================================
// UNIVERSAL KNOWLEDGE COMPILER CONCEPT
// =============================================================================

CREATE (ukc:System {
    name: "Universal Knowledge Compiler",
    description: "System that validates LLM outputs against compiled domain knowledge",
    core_finding: "Partial implementations are production-ready today, but universal coverage faces fundamental expressivity-tractability barriers",
    sources_analyzed: "167+ papers from 2020-2025"
})

// =============================================================================
// UKC HYPOTHESES (H1-H4)
// Hierarchical labels: Hypothesis:UKCHypothesis for unified querying
// =============================================================================

CREATE (ukc_h1:Hypothesis:UKCHypothesis {
    id: "UKC-H1",
    name: "Knowledge Compilation Hypothesis",
    category: "UKC",
    formal_statement: "For any domain D with finite, expressible knowledge K_D, there exists a formal representation F(K_D) in some logic L such that entailment queries Q can be decided by a mechanical procedure",
    assumptions: [
        "Domain knowledge is bounded and can be enumerated or described finitely",
        "A formal logic L exists with sufficient expressivity without becoming undecidable",
        "Subject matter experts can articulate knowledge amenable to formalization",
        "Compilation preserves semantic content without information loss"
    ],
    falsifiers: [
        "Proof that essential domain knowledge requires undecidable logics",
        "Empirical demonstration that expert knowledge contains irreducibly tacit components",
        "Evidence that knowledge compilation bottleneck scales superlinearly with domain complexity"
    ],
    current_evidence: "SNOMED-CT (350K+ concepts), LKIF (200+ classes), FIBO (700+ classes) - but no domain claims comprehensive coverage"
})

CREATE (ukc_h2:Hypothesis:UKCHypothesis {
    id: "UKC-H2",
    name: "NL-to-Logic Parsing Hypothesis",
    category: "UKC",
    formal_statement: "For LLM output O in natural language NL, there exists a parsing function P: NL → L that maps O to logical statements with accuracy A ≥ threshold T sufficient for downstream verification",
    assumptions: [
        "Natural language has recoverable logical structure (compositional semantics)",
        "LLM outputs are sufficiently well-formed for systematic parsing",
        "Parsing errors can be bounded and do not introduce systematic biases",
        "Target logic L can express semantic content of arbitrary LLM statements"
    ],
    falsifiers: [
        "LLM outputs contain irreducible ambiguity exceeding parser resolution",
        "Parsing error rates compound to unacceptable levels",
        "Critical semantic content lost in NL→FOL translation"
    ],
    current_evidence: "LogicLLaMA (ACL 2024) achieves GPT-4 level on NL-to-FOL; Zhang et al. DMR 2024 shows accuracy declines on complex discourse"
})

CREATE (ukc_h3:Hypothesis:UKCHypothesis {
    id: "UKC-H3",
    name: "Feedback Loop Efficacy Hypothesis",
    category: "UKC",
    formal_statement: "Let H₀ be baseline hallucination rate. A formal validation system V with feedback loop F produces outputs with rate H₁ such that H₁/H₀ ≤ ε for acceptably small ε",
    assumptions: [
        "Hallucinations produce logically inconsistent or factually incorrect outputs detectable by formal methods",
        "Formal knowledge base is complete enough to detect hallucinations",
        "Feedback signals from validation improve subsequent generation",
        "Latency of validation is acceptable for the application"
    ],
    falsifiers: [
        "Hallucinations cluster in knowledge-base gaps, evading formal detection",
        "Feedback loops create adversarial dynamics where LLMs learn to evade validators",
        "Semantic entropy problem persists—confabulations detected but systematic errors undetectable"
    ],
    current_evidence: "OG-RAG: +55% recall, +40% correctness; Amazon Bedrock: 99% accuracy claim; RoboGuard: 92% to <2.5% unsafe execution"
})

CREATE (ukc_h4:Hypothesis:UKCHypothesis {
    id: "UKC-H4",
    name: "Computational Tractability Hypothesis",
    category: "UKC",
    formal_statement: "For knowledge base K of size n and LLM output O of size m, validation V(K,O) completes in time T ≤ f(n,m) where f is polynomial and T meets real-time requirements (<100-300ms)",
    assumptions: [
        "Tractable logic profiles (OWL 2 EL/QL/RL) are sufficiently expressive",
        "Pre-computation and caching can amortize expensive reasoning",
        "Incremental reasoning avoids full recomputation on updates",
        "Hardware advances continue improving throughput"
    ],
    falsifiers: [
        "Meaningful validation requires logics with inherently exponential or worse complexity",
        "Caching hit rates too low for production latency",
        "Incremental reasoning introduces unsoundness or incompleteness"
    ],
    current_evidence: "SNOMED-CT classified by ELK in ~5s; Graphiti achieves ~300ms latency; Formal-LLM achieves 100% constraint adherence"
})

// =============================================================================
// RESEARCH DOMAINS
// =============================================================================

CREATE (domain_krr:ResearchDomain {
    name: "Knowledge Representation & Reasoning",
    abbreviation: "KRR",
    key_questions: [
        "Maximal tractable fragments for specific applications",
        "How approximate reasoning provides quality guarantees",
        "Bridging neural representations and symbolic knowledge"
    ],
    state_of_art: "Description logics with complexity bounds P-complete (EL++) to 2ExpTime (SROIQ); mature reasoners (ELK, HermiT, Pellet)"
})

CREATE (domain_dl_owl:ResearchDomain {
    name: "Description Logics and OWL/SHACL",
    abbreviation: "DL-OWL",
    key_questions: [
        "Expressiveness while remaining tractable",
        "SHACL vs OWL validation capabilities",
        "Combining open-world (OWL) and closed-world (SHACL) assumptions"
    ],
    state_of_art: "OWL 2 provides three tractable profiles: EL, QL, RL; SHACL enables ~100ms validation; OWL for inference, SHACL for validation",
    key_distinction: "OWL for inference, SHACL for validation"
})

CREATE (domain_onto_eng:ResearchDomain {
    name: "Ontology Engineering",
    abbreviation: "OE",
    key_questions: [
        "LLM automation of ontology construction while maintaining quality",
        "Methodologies that scale to enterprise-wide knowledge",
        "Ontology evolution with changing domain knowledge"
    ],
    state_of_art: "METHONTOLOGY, NeOn, TOVE methodologies; LLM-assisted (OntoGPT, ODKE+) achieve 98.8% precision but require human validation"
})

CREATE (domain_formal_verify:ResearchDomain {
    name: "Formal Verification and Automated Reasoning",
    abbreviation: "FV",
    key_questions: [
        "Can formal verification scale to billion-parameter networks",
        "Specification languages for AI safety properties",
        "Probabilistic vs formal guarantees"
    ],
    state_of_art: "NN verification NP-complete for ReLU, undecidable for general; Marabou, α,β-CROWN struggle beyond ~10K neurons; only approximate verification feasible for LLMs"
})

CREATE (domain_neurosym:ResearchDomain {
    name: "Neuro-Symbolic AI",
    abbreviation: "NeSy",
    key_questions: [
        "Efficient injection of symbolic constraints into neural generation",
        "Architectures for bidirectional neural-symbolic communication",
        "Sample efficiency vs pure neural approaches"
    ],
    state_of_art: "Publications 53 (2020) → 236 (2023); Logic Tensor Networks, Neural Theorem Provers, hybrid LLM+reasoner; Formal-LLM 100% constraint adherence"
})

CREATE (domain_nlp:ResearchDomain {
    name: "Natural Language Processing",
    abbreviation: "NLP",
    key_questions: [
        "Reliability of NL to formal logic parsing",
        "Fundamental limits of compositional generalization",
        "High precision hallucination detection without extensive grounding"
    ],
    state_of_art: "LogicLLaMA, Flan-T5-XXL match GPT-4 on NL-FOL; semantic entropy AUROC 0.7-0.85; best fact-checkers F1 ~0.63"
})

CREATE (domain_llm:ResearchDomain {
    name: "Large Language Models",
    abbreviation: "LLM",
    key_questions: [
        "Constrained decoding with formal guarantees without excessive latency",
        "Prompting strategies for formally verifiable outputs",
        "Reliable following of complex constraint specifications"
    ],
    state_of_art: "Outlines, Guidance, SGLang for constrained decoding; DOMINO 2× speedup; semantic constraints beyond syntax remain challenging"
})

CREATE (domain_kg:ResearchDomain {
    name: "Knowledge Graphs",
    abbreviation: "KG",
    key_questions: [
        "Completeness and accuracy of auto-constructed KGs",
        "Optimal LLM-KG integration architecture",
        "Temporal knowledge and KG evolution"
    ],
    state_of_art: "Wikidata ~100M entities; LLM-assisted construction (GraphRAG, KGGen); no single KG is comprehensive"
})

CREATE (domain_complexity:ResearchDomain {
    name: "Computational Complexity Theory",
    abbreviation: "CCT",
    key_questions: [
        "Tight complexity bounds for validation over different representations",
        "Approximation algorithms with useful guarantees",
        "Parameterized complexity for practical system design"
    ],
    state_of_art: "DL Complexity Navigator catalogs results; ALC PSpace-complete, SHOIQ NExpTime-complete, EL++ polynomial"
})

// =============================================================================
// RESEARCH GROUPS
// =============================================================================

CREATE (group_dresden:ResearchGroup {
    name: "TU Dresden ICCL",
    focus: "Description logics, Datalog",
    key_researcher: "Markus Krötzsch",
    domain: "KRR"
})

CREATE (group_oxford:ResearchGroup {
    name: "University of Oxford",
    focus: "OWL 2 architecture, semantic entropy",
    key_researchers: ["Ian Horrocks", "Boris Motik", "Yarin Gal"],
    domain: "KRR/NLP"
})

CREATE (group_bozen:ResearchGroup {
    name: "KRDB Bozen-Bolzano",
    focus: "OBDA (Ontology-Based Data Access)",
    key_researcher: "Diego Calvanese",
    domain: "KRR"
})

CREATE (group_toulouse:ResearchGroup {
    name: "IRIT Toulouse",
    focus: "Argumentation, belief revision",
    domain: "KRR"
})

CREATE (group_stanford_marabou:ResearchGroup {
    name: "Stanford Marabou Team",
    focus: "Neural network verification",
    key_researchers: ["Clark Barrett", "Guy Katz"],
    domain: "Formal Verification"
})

CREATE (group_eth_eran:ResearchGroup {
    name: "ETH Zurich ERAN",
    focus: "Abstract interpretation for neural networks",
    domain: "Formal Verification"
})

CREATE (group_ucla_statai:ResearchGroup {
    name: "UCLA StatAI Lab",
    focus: "Probabilistic circuits",
    key_researcher: "Guy Van den Broeck",
    domain: "Neuro-Symbolic"
})

CREATE (group_rutgers_agi:ResearchGroup {
    name: "Rutgers AGI Research",
    focus: "Formal-LLM",
    key_researcher: "Yongfeng Zhang",
    domain: "Neuro-Symbolic"
})

CREATE (group_ibm_nesy:ResearchGroup {
    name: "IBM Research Neuro-Symbolic",
    focus: "Neuro-Symbolic AI Toolkit",
    domain: "Neuro-Symbolic"
})

CREATE (group_stanford_nlp:ResearchGroup {
    name: "Stanford NLP",
    focus: "Semantic parsing foundations",
    domain: "NLP"
})

CREATE (group_monash:ResearchGroup {
    name: "Monash University",
    focus: "LogicLLaMA",
    key_researcher: "Ehsan Shareghi",
    domain: "NLP"
})

CREATE (group_groningen:ResearchGroup {
    name: "Groningen PMB",
    focus: "Discourse representation",
    domain: "NLP"
})

CREATE (group_stanford_bmir:ResearchGroup {
    name: "Stanford BMIR",
    focus: "Protégé, biomedical ontologies",
    domain: "Ontology Engineering"
})

CREATE (group_monarch:ResearchGroup {
    name: "Monarch Initiative",
    focus: "OntoGPT, SPIRES",
    domain: "Ontology Engineering"
})

CREATE (group_obo:ResearchGroup {
    name: "OBO Foundry",
    focus: "Coordinated biomedical ontologies",
    domain: "Ontology Engineering"
})

CREATE (group_zju_kg:ResearchGroup {
    name: "ZJU-KG (Zhejiang University)",
    focus: "LLM-KG integration",
    github: "zjukg/KG-LLM-Papers",
    domain: "Knowledge Graphs"
})

CREATE (group_mannheim:ResearchGroup {
    name: "Mannheim/KIT",
    focus: "KG quality, MELT framework",
    domain: "Knowledge Graphs"
})

CREATE (group_ms_graphrag:ResearchGroup {
    name: "Microsoft Research GraphRAG",
    focus: "GraphRAG, structured generation",
    domain: "Knowledge Graphs/LLM"
})

CREATE (group_epfl_west:ResearchGroup {
    name: "EPFL West Group",
    focus: "Grammar-constrained decoding",
    domain: "LLM"
})

// =============================================================================
// KEY PAPERS 2023-2025
// =============================================================================

// Neurosymbolic Integration
CREATE (paper_pot:Paper {
    title: "Proof of Thought: Neurosymbolic Program Synthesis",
    venue: "arXiv 2024",
    contribution: "JSON DSL for FOL conversion, theorem prover verification",
    topic: "Neurosymbolic Integration"
})

CREATE (paper_llm_nesy:Paper {
    title: "Large Language Models Are Neurosymbolic Reasoners",
    venue: "AAAI 2024",
    contribution: "LLM agents + external symbolic modules",
    topic: "Neurosymbolic Integration"
})

CREATE (paper_nesy_review:Paper {
    title: "Neuro-Symbolic AI in 2024: Systematic Review",
    venue: "arXiv 2025",
    contribution: "167-paper PRISMA review of field",
    topic: "Neurosymbolic Integration"
})

CREATE (paper_formal_llm:Paper {
    title: "Formal-LLM: Integrating Formal and Natural Language",
    venue: "arXiv 2024",
    contribution: "Pushdown automaton supervision, 100% constraint adherence",
    topic: "Neurosymbolic Integration",
    key_result: "100% constraint adherence"
})

// Ontology-grounded Generation
CREATE (paper_og_rag:Paper {
    title: "OG-RAG: Ontology-Grounded RAG",
    venue: "EMNLP 2025",
    contribution: "+55% fact recall, +40% correctness via ontology hypergraphs",
    topic: "Ontology-Grounded Generation",
    fact_recall_improvement: "+55%",
    correctness_improvement: "+40%"
})

CREATE (paper_onto_gen:Paper {
    title: "Ontology Generation using LLMs",
    venue: "arXiv 2025",
    contribution: "Ontogenia prompting outperforms novice engineers",
    topic: "Ontology-Grounded Generation"
})

CREATE (paper_kg_construct:Paper {
    title: "LLM-empowered KG Construction Survey",
    venue: "arXiv 2025",
    contribution: "Taxonomy of schema-driven vs schema-free extraction",
    topic: "Ontology-Grounded Generation"
})

// SHACL/OWL Validation
CREATE (paper_xpshacl:Paper {
    title: "xpSHACL: Explainable SHACL Validation with RAG+LLMs",
    venue: "arXiv 2025",
    contribution: "Human-readable violation explanations",
    topic: "SHACL/OWL Validation"
})

CREATE (paper_textual_shacl:Paper {
    title: "Automated Validation of Textual Constraints via SHACL",
    venue: "arXiv 2025",
    contribution: "LLM translates natural language rules to SHACL",
    topic: "SHACL/OWL Validation"
})

CREATE (paper_evee:Paper {
    title: "EVEE: Explaining OWL Reasoning Results",
    venue: "KR 2024",
    contribution: "Proof generation for OWL 2 DL/EL",
    topic: "SHACL/OWL Validation"
})

// Constrained Decoding
CREATE (paper_domino:Paper {
    title: "DOMINO: Fast Non-Invasive Constrained Generation",
    venue: "ICML 2024",
    contribution: "2× speedup via speculative decoding",
    topic: "Constrained Decoding",
    speedup: "2x"
})

CREATE (paper_grammar_constrained:Paper {
    title: "Grammar-Constrained Decoding for Structured NLP",
    venue: "EMNLP 2023",
    contribution: "Input-dependent grammars, unified framework",
    topic: "Constrained Decoding"
})

CREATE (paper_correct_code:Paper {
    title: "Correctness-Guaranteed Code Generation",
    venue: "arXiv 2025",
    contribution: "Semantic feedback during generation",
    topic: "Constrained Decoding"
})

// Knowledge Graph Completion
CREATE (paper_kopa:Paper {
    title: "KoPA: Knowledge Prefix Adapter",
    venue: "ACM MM 2024",
    contribution: "Structural-aware reasoning for KGC",
    topic: "KG Completion"
})

CREATE (paper_kggen:Paper {
    title: "KGGen",
    venue: "arXiv 2025",
    contribution: "Two-stage extraction outperforms GraphRAG",
    topic: "KG Completion"
})

CREATE (paper_cok:Paper {
    title: "Chain-of-Knowledge",
    venue: "ICLR 2024",
    contribution: "Dynamic grounding across heterogeneous sources",
    topic: "KG Completion"
})

// Hallucination Detection
CREATE (paper_semantic_entropy:Paper {
    title: "Detecting Hallucinations using Semantic Entropy",
    venue: "Nature 2024",
    contribution: "Clusters semantic equivalents, AUROC 0.7-0.85",
    topic: "Hallucination Detection",
    auroc: "0.7-0.85"
})

CREATE (paper_ragtruth:Paper {
    title: "RAGTruth: Hallucination Corpus",
    venue: "ACL 2024",
    contribution: "Word-level annotation enables fine-tuned detection",
    topic: "Hallucination Detection"
})

CREATE (paper_redeep:Paper {
    title: "ReDeEP: Decoupling FFNs from Copying Heads",
    venue: "ICLR 2025",
    contribution: "Internal mechanism detection",
    topic: "Hallucination Detection"
})

// Automated Reasoning for Safety
CREATE (paper_roboguard:Paper {
    title: "RoboGuard: Safety Guardrails for LLM Robots",
    venue: "arXiv 2025",
    contribution: "Temporal logic synthesis, <2.5% unsafe execution",
    topic: "AI Safety",
    unsafe_reduction: "92% to <2.5%"
})

CREATE (paper_veriplan:Paper {
    title: "VeriPlan: Model Checking + LLM Planning",
    venue: "CHI 2025",
    contribution: "User-defined constraint verification",
    topic: "AI Safety"
})

CREATE (paper_astrogator:Paper {
    title: "Astrogator: Formal Verification of LLM Code",
    venue: "arXiv 2025",
    contribution: "83% verification success, 92% error identification",
    topic: "AI Safety"
})

// Semantic Parsing
CREATE (paper_logicllama:Paper {
    title: "LogicLLaMA: NL to FOL Translation",
    venue: "ACL 2024",
    contribution: "7B model matches GPT-4 with FOL verifier reward",
    topic: "Semantic Parsing",
    model_size: "7B"
})

CREATE (paper_folio:Paper {
    title: "FOLIO: FOL Reasoning Benchmark",
    venue: "EMNLP 2024",
    contribution: "Expert-written, challenges GPT-4",
    topic: "Semantic Parsing"
})

CREATE (paper_neural_parsing:Paper {
    title: "Gaining More Insight into Neural Semantic Parsing",
    venue: "DMR 2024",
    contribution: "Documents compositional generalization failures",
    topic: "Semantic Parsing"
})

// Foundational Papers
CREATE (paper_dl_handbook:Paper {
    title: "The Description Logic Handbook",
    venue: "Cambridge 2007",
    authors: "Baader et al.",
    contribution: "Foundational DL reference",
    topic: "Foundations"
})

CREATE (paper_sroiq:Paper {
    title: "The even more irresistible SROIQ",
    venue: "KR 2006",
    authors: "Horrocks et al.",
    contribution: "OWL 2 DL foundations",
    topic: "Foundations"
})

CREATE (paper_pan_roadmap:Paper {
    title: "Unifying LLMs and Knowledge Graphs: A Roadmap",
    venue: "IEEE TKDE 2024",
    authors: "Pan et al.",
    contribution: "700+ citations, LLM-KG integration taxonomy",
    topic: "Survey",
    citations: "700+"
})

// =============================================================================
// RESEARCH GAPS (UKC-specific)
// =============================================================================

CREATE (gap_expressivity:UKCResearchGap {
    name: "Expressivity-Tractability Barrier",
    description: "Meaningful domain knowledge often requires logics more expressive than tractable OWL 2 profiles, yet full OWL 2 DL is NEXPTIME-complete",
    type: "Theoretical",
    unsolved: "No theory identifies sweet spot fragments for specific domains"
})

CREATE (gap_parsing_theory:UKCResearchGap {
    name: "Semantic Parsing Completeness",
    description: "No formal analysis bounds the space of NL statements that can be reliably parsed vs those with irreducible ambiguity",
    type: "Theoretical"
})

CREATE (gap_hallucination_coverage:UKCResearchGap {
    name: "Hallucination Detection Coverage",
    description: "Semantic entropy detects confabulations but not systematic errors from training data; no theoretical framework characterizes which types detectable by which methods",
    type: "Theoretical"
})

CREATE (gap_knowledge_bottleneck:UKCResearchGap {
    name: "Knowledge Compilation Bottleneck",
    description: "Creating comprehensive domain ontologies requires extensive expert effort; SNOMED-CT took decades; automated approaches leave systematic gaps",
    type: "Engineering",
    significance: "Most significant barrier to UKC deployment"
})

CREATE (gap_llm_latency:UKCResearchGap {
    name: "LLM-in-the-Loop Latency",
    description: "Production requires <100-300ms but LLM calls add 500ms-2s; requires pre-computing or distilled models",
    type: "Engineering"
})

CREATE (gap_feedback_stability:UKCResearchGap {
    name: "Feedback Loop Stability",
    description: "Long-term dynamics uncharacterized—whether LLMs learn to evade validators or genuinely improve lacks empirical study",
    type: "Engineering"
})

CREATE (gap_nn_scale:UKCResearchGap {
    name: "Neural Network Verification Scale",
    description: "Current tools handle ~10K neurons; GPT-4 has ~1.8T parameters; direct formal verification infeasible",
    type: "Scalability",
    gap_magnitude: "10^7"
})

CREATE (gap_abox_scale:UKCResearchGap {
    name: "ABox Reasoning Scale",
    description: "Reasoning over millions of instance facts requires careful optimization; challenging for complex queries",
    type: "Scalability"
})

CREATE (gap_incremental:UKCResearchGap {
    name: "Incremental Reasoning",
    description: "Many systems require full recomputation on updates, creating latency issues; solutions sacrifice completeness",
    type: "Scalability"
})

// =============================================================================
// ACADEMIC VENUES
// =============================================================================

// Semantic Web
CREATE (venue_iswc:Venue {
    name: "ISWC",
    full_name: "International Semantic Web Conference",
    focus: "Knowledge graphs, ontologies, semantic technologies",
    frequency: "Annual, November",
    stats_2024: "44 papers from 155 submissions"
})

CREATE (venue_eswc:Venue {
    name: "ESWC",
    full_name: "Extended Semantic Web Conference",
    focus: "European, practical applications",
    frequency: "Annual, May-June"
})

CREATE (venue_kcap:Venue {
    name: "K-CAP",
    full_name: "Knowledge Capture Conference",
    focus: "Knowledge acquisition, ontology engineering",
    frequency: "Biennial"
})

CREATE (venue_oaei:Venue {
    name: "OAEI",
    full_name: "Ontology Alignment Evaluation Initiative",
    focus: "Ontology matching competition",
    frequency: "Annual",
    stats_2024: "13 tracks, 13 participants"
})

// KR Conferences
CREATE (venue_kr:Venue {
    name: "KR",
    full_name: "Knowledge Representation and Reasoning",
    focus: "Description logics, non-monotonic reasoning",
    frequency: "Biennial (next 2026)"
})

CREATE (venue_aaai:Venue {
    name: "AAAI",
    full_name: "Association for Advancement of AI",
    focus: "Broad AI with strong KR track",
    frequency: "Annual, February"
})

CREATE (venue_ijcai:Venue {
    name: "IJCAI",
    full_name: "International Joint Conference on AI",
    focus: "Broad AI, international",
    frequency: "Annual, August"
})

// NLP Conferences
CREATE (venue_acl:Venue {
    name: "ACL",
    full_name: "Association for Computational Linguistics",
    focus: "Premier NLP venue",
    frequency: "Annual, July-August"
})

CREATE (venue_emnlp:Venue {
    name: "EMNLP",
    full_name: "Empirical Methods in NLP",
    focus: "Empirical NLP approaches",
    frequency: "Annual, November-December"
})

CREATE (venue_naacl:Venue {
    name: "NAACL",
    full_name: "North American ACL",
    focus: "Regional ACL",
    frequency: "Annual, June"
})

// ML Conferences
CREATE (venue_neurips:Venue {
    name: "NeurIPS",
    full_name: "Neural Information Processing Systems",
    focus: "Premier ML, growing neuro-symbolic track",
    frequency: "Annual, December"
})

CREATE (venue_icml:Venue {
    name: "ICML",
    full_name: "International Conference on Machine Learning",
    focus: "Foundational ML",
    frequency: "Annual, July"
})

// Formal Methods
CREATE (venue_cav:Venue {
    name: "CAV",
    full_name: "Computer-Aided Verification",
    focus: "Neural network verification emerging",
    frequency: "Annual, July"
})

CREATE (venue_fm:Venue {
    name: "FM",
    full_name: "Formal Methods",
    focus: "Broad formal methods",
    frequency: "Biennial"
})

CREATE (venue_cade:Venue {
    name: "CADE/IJCAR",
    full_name: "Automated Deduction",
    focus: "Theorem proving, automated reasoning",
    frequency: "Annual"
})

// Domain-Specific
CREATE (venue_amia:Venue {
    name: "AMIA",
    full_name: "American Medical Informatics Association",
    focus: "Medical AI, clinical NLP, EHR",
    frequency: "Annual symposium + summit",
    stat: "903+ FDA-authorized AI medical devices (Oct 2024)"
})

CREATE (venue_medinfo:Venue {
    name: "MedInfo",
    full_name: "World Congress on Medical Informatics",
    focus: "International medical informatics",
    frequency: "Triennial"
})

CREATE (venue_jurix:Venue {
    name: "JURIX",
    full_name: "Legal Knowledge and Information Systems",
    focus: "Legal AI, formal legal reasoning",
    frequency: "Annual",
    edition_2025: "38th (Turin)"
})

CREATE (venue_icail:Venue {
    name: "ICAIL",
    full_name: "International Conference on AI and Law",
    focus: "Legal AI",
    frequency: "Biennial"
})

// Journals
CREATE (journal_jair:Journal {
    name: "JAIR",
    full_name: "Journal of Artificial Intelligence Research",
    focus: "Open access, broad AI"
})

CREATE (journal_aij:Journal {
    name: "AIJ",
    full_name: "Artificial Intelligence Journal",
    focus: "Foundational AI theory"
})

CREATE (journal_swj:Journal {
    name: "Semantic Web Journal",
    publisher: "IOS Press",
    focus: "Semantic technologies"
})

CREATE (journal_jamia:Journal {
    name: "JAMIA",
    full_name: "Journal of AMIA",
    focus: "Medical informatics"
})

CREATE (journal_ailaw:Journal {
    name: "Artificial Intelligence and Law",
    publisher: "Springer",
    focus: "Legal AI"
})

// =============================================================================
// UKC ARCHITECTURE LAYERS
// =============================================================================

CREATE (layer1:UKCLayer {
    name: "Layer 1: Production-Ready",
    technologies: ["OWL 2 EL/RL", "SHACL"],
    approach: "Pre-compile domain ontologies, cache inferences",
    latency: "<100ms validation",
    status: "Production-ready today"
})

CREATE (layer2:UKCLayer {
    name: "Layer 2: Near-Term Research",
    technologies: ["Constrained decoding", "Ontology-grounded RAG"],
    improvement: "40-55% factual accuracy improvement",
    latency: "~300ms",
    status: "Near-term"
})

CREATE (layer3:UKCLayer {
    name: "Layer 3: Active Research Frontier",
    technologies: ["NL-to-FOL parsing", "Theorem prover verification"],
    status: "Domain-dependent accuracy; compositional generalization failures need attention"
})

CREATE (layer4:UKCLayer {
    name: "Layer 4: Open Problems",
    challenge: "Full semantic verification of arbitrary LLM outputs against comprehensive domain knowledge",
    barriers: ["Expressivity-tractability tradeoffs", "Neural verification scalability", "Knowledge compilation bottleneck"],
    status: "Unsolved"
})

// =============================================================================
// DOMAIN-SPECIFIC APPLICATIONS
// =============================================================================

CREATE (app_medical:DomainApplication {
    name: "Medical Informatics",
    key_resource: "SNOMED-CT",
    classification_time: "~5 seconds by ELK",
    production_system: "Snowstorm terminology server",
    regulatory: "903+ FDA-authorized AI devices (Oct 2024)",
    key_venue: "AMIA"
})

CREATE (app_legal:DomainApplication {
    name: "Legal Informatics",
    key_resource: "LKIF",
    classes: "200+ legal concept classes",
    challenge: "Defeasible reasoning for legal exceptions",
    key_venue: "JURIX",
    papers_2024: "21 hybrid symbolic-neural papers"
})

CREATE (app_financial:DomainApplication {
    name: "Financial Regulation",
    key_resource: "FIBO",
    classes: "700+ finance classes",
    standardization: "OMG",
    use_cases: ["Regulatory reporting", "Risk analysis"],
    challenge: "Real-time validation with millisecond latency"
})

// =============================================================================
// COMPLEXITY BOUNDS (explicit nodes)
// =============================================================================

CREATE (complex_el:ComplexityBound {
    logic: "OWL 2 EL",
    complexity: "P-complete",
    tractable: true,
    use_case: "SNOMED-CT"
})

CREATE (complex_ql:ComplexityBound {
    logic: "OWL 2 QL",
    complexity: "NLogSpace",
    tractable: true,
    use_case: "Query answering"
})

CREATE (complex_rl:ComplexityBound {
    logic: "OWL 2 RL",
    complexity: "P-complete",
    tractable: true,
    use_case: "Rule-based systems"
})

CREATE (complex_alc:ComplexityBound {
    logic: "ALC",
    complexity: "PSpace-complete",
    tractable: false
})

CREATE (complex_shoiq:ComplexityBound {
    logic: "SHOIQ",
    complexity: "NExpTime-complete",
    tractable: false
})

CREATE (complex_sroiq:ComplexityBound {
    logic: "SROIQ (OWL 2 DL)",
    complexity: "N2ExpTime",
    tractable: false,
    note: "Theoretical worst-case"
})

CREATE (complex_nn:ComplexityBound {
    logic: "ReLU Neural Networks",
    complexity: "NP-complete",
    tractable: false,
    source: "Katz et al."
})

// =============================================================================
// TOOLS AND REASONERS
// =============================================================================

// Reasoners with hierarchical labels (Tool:Reasoner for query flexibility)
CREATE (tool_elk:Tool:Reasoner {
    name: "ELK",
    profile: "OWL 2 EL",
    performance: "SNOMED-CT in ~5 seconds",
    type: "Production reasoner"
})

CREATE (tool_hermit:Tool:Reasoner {
    name: "HermiT",
    profile: "OWL 2 DL",
    type: "Tableau reasoner"
})

CREATE (tool_pellet:Tool:Reasoner {
    name: "Pellet",
    profile: "OWL 2 DL",
    type: "Production reasoner"
})

CREATE (tool_graphiti:Tool {
    name: "Graphiti",
    source: "Zep AI, 2025",
    capability: "Hybrid semantic/graph queries with incremental updates",
    latency: "~300ms"
})

CREATE (tool_outlines:Tool {
    name: "Outlines",
    type: "Constrained decoding library",
    constraints: ["regex", "JSON schema", "CFG"]
})

CREATE (tool_guidance:Tool {
    name: "Guidance",
    source: "Microsoft Research",
    type: "Structured generation",
    constraints: ["regex", "JSON schema", "CFG"]
})

CREATE (tool_sglang:Tool {
    name: "SGLang",
    type: "Constrained decoding library",
    constraints: ["regex", "JSON schema", "CFG"]
})

CREATE (tool_ontogpt:Tool {
    name: "OntoGPT",
    source: "Monarch Initiative",
    type: "LLM-assisted ontology construction",
    precision: "~98%"
})

CREATE (tool_odke:Tool {
    name: "ODKE+",
    source: "Apple",
    type: "Ontology construction",
    precision: "98.8% on 19M facts"
})

CREATE (tool_snowstorm:Tool {
    name: "Snowstorm",
    type: "Production terminology server",
    ontology: "SNOMED-CT"
})

// =============================================================================
// RELATIONSHIPS
// =============================================================================

// -----------------------------------------------------------------------------
// UKC System Relationships
// -----------------------------------------------------------------------------

// UKC hypotheses
MATCH (ukc:System {name: "Universal Knowledge Compiler"})
MATCH (h:UKCHypothesis)
CREATE (ukc)-[:BASED_ON_HYPOTHESIS]->(h);

// UKC layers
MATCH (ukc:System {name: "Universal Knowledge Compiler"})
MATCH (l:UKCLayer)
CREATE (ukc)-[:HAS_LAYER]->(l);

// Layer progression
MATCH (l1:UKCLayer {name: "Layer 1: Production-Ready"})
MATCH (l2:UKCLayer {name: "Layer 2: Near-Term Research"})
CREATE (l1)-[:ENABLES]->(l2);

MATCH (l2:UKCLayer {name: "Layer 2: Near-Term Research"})
MATCH (l3:UKCLayer {name: "Layer 3: Active Research Frontier"})
CREATE (l2)-[:ENABLES]->(l3);

MATCH (l3:UKCLayer {name: "Layer 3: Active Research Frontier"})
MATCH (l4:UKCLayer {name: "Layer 4: Open Problems"})
CREATE (l3)-[:BLOCKED_BY]->(l4);

// -----------------------------------------------------------------------------
// UKC Hypothesis to Existing Hypotheses Mapping
// -----------------------------------------------------------------------------

// UKC-H1 relates to H16 (Knowledge Acquisition Bottleneck)
MATCH (ukc_h1:UKCHypothesis {id: "UKC-H1"})
MATCH (h16:Hypothesis {id: "H16"})
CREATE (ukc_h1)-[:CONSTRAINED_BY]->(h16);

// UKC-H2 relates to H4 (Parsing Bottleneck)
MATCH (ukc_h2:UKCHypothesis {id: "UKC-H2"})
MATCH (h4:Hypothesis {id: "H4"})
CREATE (ukc_h2)-[:EQUIVALENT_TO]->(h4);

// UKC-H3 relates to H1 (Feedback Loop Necessity) and H3 (Tripartite Architecture)
MATCH (ukc_h3:UKCHypothesis {id: "UKC-H3"})
MATCH (h1:Hypothesis {id: "H1"})
CREATE (ukc_h3)-[:EXTENDS]->(h1);

MATCH (ukc_h3:UKCHypothesis {id: "UKC-H3"})
MATCH (h3:Hypothesis {id: "H3"})
CREATE (ukc_h3)-[:RELATED_TO]->(h3);

// UKC-H4 relates to H6 (Expressiveness-Decidability Tradeoff)
MATCH (ukc_h4:UKCHypothesis {id: "UKC-H4"})
MATCH (h6:Hypothesis {id: "H6"})
CREATE (ukc_h4)-[:CONSTRAINED_BY]->(h6);

// -----------------------------------------------------------------------------
// Inter-UKC Hypothesis Relationships (dependency chain)
// -----------------------------------------------------------------------------

// UKC-H2 (NL→Logic Parsing) feeds into UKC-H3 (Feedback Loop)
// Parsing must work before feedback loops can be effective
MATCH (ukc_h2:UKCHypothesis {id: "UKC-H2"})
MATCH (ukc_h3:UKCHypothesis {id: "UKC-H3"})
CREATE (ukc_h2)-[:ENABLES {rationale: "Parsing quality bounds feedback loop efficacy"}]->(ukc_h3);

// UKC-H4 (Tractability) constrains UKC-H1 (Knowledge Compilation)
// Tractable reasoning limits what knowledge can be effectively compiled
MATCH (ukc_h4:UKCHypothesis {id: "UKC-H4"})
MATCH (ukc_h1:UKCHypothesis {id: "UKC-H1"})
CREATE (ukc_h4)-[:CONSTRAINS {rationale: "Tractable logics limit compilable knowledge"}]->(ukc_h1);

// UKC-H1 (Knowledge Compilation) enables UKC-H3 (Feedback Loop)
// Compiled knowledge is prerequisite for formal validation
MATCH (ukc_h1:UKCHypothesis {id: "UKC-H1"})
MATCH (ukc_h3:UKCHypothesis {id: "UKC-H3"})
CREATE (ukc_h1)-[:ENABLES {rationale: "Formal KB required for feedback-based validation"}]->(ukc_h3);

// UKC-H4 (Tractability) constrains UKC-H3 (Feedback Loop)
// Real-time validation requires tractable reasoning
MATCH (ukc_h4:UKCHypothesis {id: "UKC-H4"})
MATCH (ukc_h3:UKCHypothesis {id: "UKC-H3"})
CREATE (ukc_h4)-[:CONSTRAINS {rationale: "Latency requirements demand tractable reasoning"}]->(ukc_h3);

// -----------------------------------------------------------------------------
// Research Domain Relationships
// -----------------------------------------------------------------------------

// Link domains to existing frameworks
MATCH (domain_krr:ResearchDomain {abbreviation: "KRR"})
MATCH (dl:Framework {abbreviation: "DL"})
CREATE (domain_krr)-[:USES_FRAMEWORK]->(dl);

MATCH (domain_krr:ResearchDomain {abbreviation: "KRR"})
MATCH (fca:Framework {abbreviation: "FCA"})
CREATE (domain_krr)-[:USES_FRAMEWORK]->(fca);

MATCH (domain_dl_owl:ResearchDomain {abbreviation: "DL-OWL"})
MATCH (dl:Framework {abbreviation: "DL"})
CREATE (domain_dl_owl)-[:SPECIALIZES]->(dl);

MATCH (domain_neurosym:ResearchDomain {abbreviation: "NeSy"})
MATCH (dl:Framework {abbreviation: "DL"})
CREATE (domain_neurosym)-[:INTEGRATES]->(dl);

// Domain interdependencies
MATCH (krr:ResearchDomain {abbreviation: "KRR"})
MATCH (dl_owl:ResearchDomain {abbreviation: "DL-OWL"})
CREATE (krr)-[:FOUNDATIONAL_FOR]->(dl_owl);

MATCH (dl_owl:ResearchDomain {abbreviation: "DL-OWL"})
MATCH (oe:ResearchDomain {abbreviation: "OE"})
CREATE (dl_owl)-[:ENABLES]->(oe);

MATCH (nlp:ResearchDomain {abbreviation: "NLP"})
MATCH (nesy:ResearchDomain {abbreviation: "NeSy"})
CREATE (nlp)-[:CONTRIBUTES_TO]->(nesy);

MATCH (fv:ResearchDomain {abbreviation: "FV"})
MATCH (nesy:ResearchDomain {abbreviation: "NeSy"})
CREATE (fv)-[:CONTRIBUTES_TO]->(nesy);

MATCH (kg:ResearchDomain {abbreviation: "KG"})
MATCH (llm:ResearchDomain {abbreviation: "LLM"})
CREATE (kg)-[:INTEGRATES_WITH]->(llm);

// -----------------------------------------------------------------------------
// Research Group Relationships
// -----------------------------------------------------------------------------

MATCH (g:ResearchGroup)
MATCH (d:ResearchDomain)
WHERE g.domain CONTAINS d.abbreviation OR g.domain = d.name
CREATE (g)-[:RESEARCHES]->(d);

// -----------------------------------------------------------------------------
// Paper Relationships
// -----------------------------------------------------------------------------

// Papers to topics/domains
MATCH (p:Paper {topic: "Neurosymbolic Integration"})
MATCH (d:ResearchDomain {abbreviation: "NeSy"})
CREATE (p)-[:CONTRIBUTES_TO]->(d);

MATCH (p:Paper {topic: "SHACL/OWL Validation"})
MATCH (d:ResearchDomain {abbreviation: "DL-OWL"})
CREATE (p)-[:CONTRIBUTES_TO]->(d);

MATCH (p:Paper {topic: "Semantic Parsing"})
MATCH (d:ResearchDomain {abbreviation: "NLP"})
CREATE (p)-[:CONTRIBUTES_TO]->(d);

MATCH (p:Paper {topic: "Constrained Decoding"})
MATCH (d:ResearchDomain {abbreviation: "LLM"})
CREATE (p)-[:CONTRIBUTES_TO]->(d);

MATCH (p:Paper {topic: "KG Completion"})
MATCH (d:ResearchDomain {abbreviation: "KG"})
CREATE (p)-[:CONTRIBUTES_TO]->(d);

MATCH (p:Paper {topic: "Hallucination Detection"})
MATCH (d:ResearchDomain {abbreviation: "NLP"})
CREATE (p)-[:CONTRIBUTES_TO]->(d);

// Key papers to hypotheses
// Paper -> Hypothesis relationships with evidence strength
MATCH (p:Paper {title: "OG-RAG: Ontology-Grounded RAG"})
MATCH (h:UKCHypothesis {id: "UKC-H3"})
CREATE (p)-[:SUPPORTS {
    degree: 1.0,
    evidence_type: "empirical",
    metrics: "+55% fact recall, +40% correctness",
    year: 2025
}]->(h);

MATCH (p:Paper {title: "LogicLLaMA: NL to FOL Translation"})
MATCH (h:UKCHypothesis {id: "UKC-H2"})
CREATE (p)-[:SUPPORTS {
    degree: 0.85,
    evidence_type: "empirical",
    metrics: "7B model matches GPT-4 with FOL verifier reward",
    year: 2024
}]->(h);

MATCH (p:Paper {title: "Formal-LLM: Integrating Formal and Natural Language"})
MATCH (h:UKCHypothesis {id: "UKC-H4"})
CREATE (p)-[:SUPPORTS {
    degree: 1.0,
    evidence_type: "empirical",
    metrics: "100% constraint adherence",
    year: 2024
}]->(h);

MATCH (p:Paper {title: "Detecting Hallucinations using Semantic Entropy"})
MATCH (h:UKCHypothesis {id: "UKC-H3"})
CREATE (p)-[:SUPPORTS {
    degree: 0.5,
    evidence_type: "empirical",
    metrics: "AUROC 0.7-0.85",
    limitation: "Detects confabulations only, not systematic errors",
    year: 2024
}]->(h);

// -----------------------------------------------------------------------------
// Venue Relationships
// -----------------------------------------------------------------------------

// Papers to venues
MATCH (p:Paper)
WHERE p.venue CONTAINS "AAAI"
MATCH (v:Venue {name: "AAAI"})
CREATE (p)-[:PUBLISHED_AT]->(v);

MATCH (p:Paper)
WHERE p.venue CONTAINS "ACL" AND NOT p.venue CONTAINS "NAACL"
MATCH (v:Venue {name: "ACL"})
CREATE (p)-[:PUBLISHED_AT]->(v);

MATCH (p:Paper)
WHERE p.venue CONTAINS "EMNLP"
MATCH (v:Venue {name: "EMNLP"})
CREATE (p)-[:PUBLISHED_AT]->(v);

MATCH (p:Paper)
WHERE p.venue CONTAINS "ICML"
MATCH (v:Venue {name: "ICML"})
CREATE (p)-[:PUBLISHED_AT]->(v);

MATCH (p:Paper)
WHERE p.venue CONTAINS "ICLR"
MATCH (v:Venue {name: "NeurIPS"})  // ICLR not explicitly created, link to related
CREATE (p)-[:RELATED_VENUE]->(v);

MATCH (p:Paper)
WHERE p.venue CONTAINS "KR"
MATCH (v:Venue {name: "KR"})
CREATE (p)-[:PUBLISHED_AT]->(v);

MATCH (p:Paper)
WHERE p.venue CONTAINS "Nature"
MATCH (j:Journal {name: "AIJ"})
CREATE (p)-[:HIGH_IMPACT_PUBLICATION]->(j);

// -----------------------------------------------------------------------------
// Complexity Bound Relationships
// -----------------------------------------------------------------------------

// Link to existing OWL profiles
MATCH (c:ComplexityBound {logic: "OWL 2 EL"})
MATCH (p:OWLProfile {name: "OWL 2 EL"})
CREATE (c)-[:DESCRIBES]->(p);

MATCH (c:ComplexityBound {logic: "OWL 2 QL"})
MATCH (p:OWLProfile {name: "OWL 2 QL"})
CREATE (c)-[:DESCRIBES]->(p);

MATCH (c:ComplexityBound {logic: "OWL 2 RL"})
MATCH (p:OWLProfile {name: "OWL 2 RL"})
CREATE (c)-[:DESCRIBES]->(p);

MATCH (c:ComplexityBound {logic: "SROIQ (OWL 2 DL)"})
MATCH (p:OWLProfile {name: "OWL DL (SROIQ)"})
CREATE (c)-[:DESCRIBES]->(p);

// Link to existing barriers
MATCH (c:ComplexityBound {logic: "ReLU Neural Networks"})
MATCH (b:TheoreticalBarrier {name: "ReLU Network NP-Completeness"})
CREATE (c)-[:FORMALIZES]->(b);

// -----------------------------------------------------------------------------
// Tool Relationships
// -----------------------------------------------------------------------------

// Reasoners to OWL profiles
MATCH (r:Reasoner {profile: "OWL 2 EL"})
MATCH (p:OWLProfile {name: "OWL 2 EL"})
CREATE (r)-[:IMPLEMENTS]->(p);

MATCH (r:Reasoner {profile: "OWL 2 DL"})
MATCH (p:OWLProfile {name: "OWL DL (SROIQ)"})
CREATE (r)-[:IMPLEMENTS]->(p);

// Tools to UKC layers
MATCH (t:Reasoner {name: "ELK"})
MATCH (l:UKCLayer {name: "Layer 1: Production-Ready"})
CREATE (t)-[:ENABLES]->(l);

MATCH (t:Tool {name: "Graphiti"})
MATCH (l:UKCLayer {name: "Layer 2: Near-Term Research"})
CREATE (t)-[:ENABLES]->(l);

MATCH (t:Tool {name: "Outlines"})
MATCH (l:UKCLayer {name: "Layer 2: Near-Term Research"})
CREATE (t)-[:ENABLES]->(l);

// -----------------------------------------------------------------------------
// Domain Application Relationships
// -----------------------------------------------------------------------------

MATCH (app:DomainApplication {name: "Medical Informatics"})
MATCH (v:Venue {name: "AMIA"})
CREATE (app)-[:KEY_VENUE]->(v);

MATCH (app:DomainApplication {name: "Legal Informatics"})
MATCH (v:Venue {name: "JURIX"})
CREATE (app)-[:KEY_VENUE]->(v);

// Link to existing ontology coverage
MATCH (app:DomainApplication {name: "Medical Informatics"})
MATCH (c:OntologyCoverage {name: "SNOMED CT"})
CREATE (app)-[:USES]->(c);

MATCH (app:DomainApplication {name: "Legal Informatics"})
MATCH (c:OntologyCoverage {name: "Legal (LKIF, LRI-Core)"})
CREATE (app)-[:USES]->(c);

MATCH (app:DomainApplication {name: "Financial Regulation"})
MATCH (c:OntologyCoverage {name: "Financial (Basel III)"})
CREATE (app)-[:USES]->(c);

// -----------------------------------------------------------------------------
// Research Gap Relationships
// -----------------------------------------------------------------------------

// UKC gaps to existing gaps
MATCH (g:UKCResearchGap {name: "Knowledge Compilation Bottleneck"})
MATCH (h:Hypothesis {id: "H16"})
CREATE (g)-[:RELATES_TO]->(h);

MATCH (g:UKCResearchGap {name: "Expressivity-Tractability Barrier"})
MATCH (h:Hypothesis {id: "H6"})
CREATE (g)-[:RELATES_TO]->(h);

MATCH (g:UKCResearchGap {name: "Neural Network Verification Scale"})
MATCH (h:Hypothesis {id: "H8"})
CREATE (g)-[:RELATES_TO]->(h);

MATCH (g:UKCResearchGap {name: "Hallucination Detection Coverage"})
MATCH (h:Hypothesis {id: "H9"})
CREATE (g)-[:RELATES_TO]->(h);

// Gaps block UKC layers
MATCH (g:UKCResearchGap {name: "Expressivity-Tractability Barrier"})
MATCH (l:UKCLayer {name: "Layer 4: Open Problems"})
CREATE (g)-[:BLOCKS]->(l);

MATCH (g:UKCResearchGap {name: "Knowledge Compilation Bottleneck"})
MATCH (l:UKCLayer {name: "Layer 4: Open Problems"})
CREATE (g)-[:BLOCKS]->(l);

MATCH (g:UKCResearchGap {name: "Neural Network Verification Scale"})
MATCH (l:UKCLayer {name: "Layer 4: Open Problems"})
CREATE (g)-[:BLOCKS]->(l);

// -----------------------------------------------------------------------------
// Cross-links to Existing Graph
// -----------------------------------------------------------------------------

// Link UKC to existing validation approach
MATCH (ukc:System {name: "Universal Knowledge Compiler"})
MATCH (shacl:ValidationLayer {technology: "SHACL"})
CREATE (ukc)-[:USES]->(shacl);

MATCH (ukc:System {name: "Universal Knowledge Compiler"})
MATCH (owl:ValidationLayer {technology: "OWL Reasoner"})
CREATE (ukc)-[:USES]->(owl);

// Link to value proposition
MATCH (ukc:System {name: "Universal Knowledge Compiler"})
MATCH (vp:ValueProposition)
CREATE (ukc)-[:ACHIEVES]->(vp);

// Link constrained decoding papers to existing tools
MATCH (p:Paper {title: "DOMINO: Fast Non-Invasive Constrained Generation"})
MATCH (t:VerificationTool {name: "DOMINO"})
CREATE (p)-[:DESCRIBES]->(t);

// Link semantic entropy to existing benchmark
MATCH (p:Paper {title: "Detecting Hallucinations using Semantic Entropy"})
MATCH (b:Benchmark {name: "TruthfulQA"})
CREATE (p)-[:EVALUATED_ON]->(b);

// =============================================================================
// ADDITIONAL RELATIONSHIPS: Discovered Overlaps and Connections
// =============================================================================

// -----------------------------------------------------------------------------
// 1. Research Group → Paper Authorship
// -----------------------------------------------------------------------------

// Oxford produced semantic entropy paper (Yarin Gal's group)
MATCH (g:ResearchGroup {name: "University of Oxford"})
MATCH (p:Paper {title: "Detecting Hallucinations using Semantic Entropy"})
CREATE (g)-[:AUTHORED]->(p);

// Monash produced LogicLLaMA
MATCH (g:ResearchGroup {name: "Monash University"})
MATCH (p:Paper {title: "LogicLLaMA: NL to FOL Translation"})
CREATE (g)-[:AUTHORED]->(p);

// Rutgers produced Formal-LLM
MATCH (g:ResearchGroup {name: "Rutgers AGI Research"})
MATCH (p:Paper {title: "Formal-LLM: Integrating Formal and Natural Language"})
CREATE (g)-[:AUTHORED]->(p);

// Microsoft GraphRAG team
MATCH (g:ResearchGroup {name: "Microsoft Research GraphRAG"})
MATCH (p:Paper {title: "KGGen"})
CREATE (g)-[:RELATED_TO {note: "Similar approach to GraphRAG"}]->(p);

// Stanford Marabou team produced verification foundations
MATCH (g:ResearchGroup {name: "Stanford Marabou Team"})
MATCH (t:Tool:VerificationTool {name: "Marabou"})
CREATE (g)-[:DEVELOPED]->(t);

// -----------------------------------------------------------------------------
// 2. FCA ↔ Galois Connection Concept Overlap
// -----------------------------------------------------------------------------

// FCA derivation operators ARE a Galois connection (explicit cross-framework link)
MATCH (deriv:Concept {name: "Derivation Operators"})
MATCH (gc_prop:Concept {name: "Galois Connection Property"})
CREATE (deriv)-[:INSTANTIATES {
    note: "FCA derivation operators (A', B') form an antitone Galois connection"
}]->(gc_prop);

// Closure operator in FCA relates to GC closure
MATCH (fca_closure:Concept {name: "Canonical Basis"})
MATCH (gc_closure:Concept {name: "Closure Operator"})
CREATE (fca_closure)-[:USES_CONCEPT]->(gc_closure);

// -----------------------------------------------------------------------------
// 3. Category Theory ↔ Institution Theory Overlap
// -----------------------------------------------------------------------------

// Functors in CT are core to IT structure
MATCH (ct_functor:Concept {name: "Functor"})
MATCH (it_sen:Concept {name: "Sentence Functor"})
CREATE (it_sen)-[:SPECIALIZED_FROM]->(ct_functor);

MATCH (ct_functor:Concept {name: "Functor"})
MATCH (it_mod:Concept {name: "Model Functor"})
CREATE (it_mod)-[:SPECIALIZED_FROM]->(ct_functor);

// Natural transformations relate to satisfaction
MATCH (nat_trans:Concept {name: "Natural Transformation"})
MATCH (sat_cond:Concept {name: "Satisfaction Condition"})
CREATE (sat_cond)-[:USES_CONCEPT]->(nat_trans);

// -----------------------------------------------------------------------------
// 4. Methodology → Standard Applicability
// -----------------------------------------------------------------------------

// SRDP applicable to these standards
MATCH (srdp:Methodology {abbreviation: "SRDP"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (srdp)-[:APPLICABLE_TO {domain: "automotive"}]->(iso);

MATCH (srdp:Methodology {abbreviation: "SRDP"})
MATCH (do178:Standard {name: "DO-178C"})
CREATE (srdp)-[:APPLICABLE_TO {domain: "avionics"}]->(do178);

MATCH (srdp:Methodology {abbreviation: "SRDP"})
MATCH (iec62304:Standard {name: "IEC 62304"})
CREATE (srdp)-[:APPLICABLE_TO {domain: "medical"}]->(iec62304);

// EARS applicable to safety-critical standards
MATCH (ears:Methodology {abbreviation: "EARS"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (ears)-[:APPLICABLE_TO {adoption: "Bosch, Daimler"}]->(iso);

MATCH (ears:Methodology {abbreviation: "EARS"})
MATCH (do178:Standard {name: "DO-178C"})
CREATE (ears)-[:APPLICABLE_TO {adoption: "Rolls-Royce, Airbus"}]->(do178);

// Okoh-Myklebust specifically maps these two standards
MATCH (okm:Methodology {abbreviation: "OKM"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (okm)-[:MAPS_FROM]->(iso);

MATCH (okm:Methodology {abbreviation: "OKM"})
MATCH (iec:Standard {name: "IEC 61508"})
CREATE (okm)-[:MAPS_TO]->(iec);

// -----------------------------------------------------------------------------
// 5. Safety Ontology → Standard Coverage
// -----------------------------------------------------------------------------

// Core Safety Ontology covers these standards (explicit links)
MATCH (onto:Ontology {name: "Core Ontology of Safety Risk Concepts"})
MATCH (iec:Standard {name: "IEC 61508"})
CREATE (onto)-[:FORMALIZES_CONCEPTS_FROM]->(iec);

MATCH (onto:Ontology {name: "Core Ontology of Safety Risk Concepts"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (onto)-[:FORMALIZES_CONCEPTS_FROM]->(iso);

MATCH (onto:Ontology {name: "Core Ontology of Safety Risk Concepts"})
MATCH (en:Standard {name: "EN 50126"})
CREATE (onto)-[:FORMALIZES_CONCEPTS_FROM]->(en);

// HAZOP ontology relates to hazard analysis in IEC 61508
MATCH (hazop:Ontology {name: "HAZOP Ontology"})
MATCH (iec:Standard {name: "IEC 61508"})
CREATE (hazop)-[:SUPPORTS_ANALYSIS_IN]->(iec);

// FMEA ontology relates to failure analysis
MATCH (fmea:Ontology {name: "FMEA Ontology"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (fmea)-[:SUPPORTS_ANALYSIS_IN]->(iso);

// -----------------------------------------------------------------------------
// 6. Safety Ontology → DL Framework (Implementation)
// -----------------------------------------------------------------------------

// Safety ontologies are implemented using Description Logics
MATCH (onto:Ontology {name: "Core Ontology of Safety Risk Concepts"})
MATCH (dl:Framework {abbreviation: "DL"})
CREATE (onto)-[:IMPLEMENTED_USING {upper_ontology: "DOLCE"}]->(dl);

// RAMSS ontology uses OWL
MATCH (ramss:Ontology {name: "Hybrid RAMSS Ontology"})
MATCH (owl:Tool {name: "OWL 2"})
CREATE (ramss)-[:IMPLEMENTED_IN]->(owl);

// -----------------------------------------------------------------------------
// 7. NLP Entity Types → EARS Pattern Components
// -----------------------------------------------------------------------------

// EARS patterns use specific NLP entity types
MATCH (ent_actor:NLPEntityType {name: "Actor/Subject"})
MATCH (ears_ubiq:EARSPattern {name: "Ubiquitous"})
CREATE (ears_ubiq)-[:USES_ENTITY_TYPE {role: "system"}]->(ent_actor);

MATCH (ent_condition:NLPEntityType {name: "Condition"})
MATCH (ears_event:EARSPattern {name: "Event-driven"})
CREATE (ears_event)-[:USES_ENTITY_TYPE {role: "trigger"}]->(ent_condition);

MATCH (ent_condition:NLPEntityType {name: "Condition"})
MATCH (ears_state:EARSPattern {name: "State-driven"})
CREATE (ears_state)-[:USES_ENTITY_TYPE {role: "state"}]->(ent_condition);

MATCH (ent_action:NLPEntityType {name: "Action/Predicate"})
MATCH (ears_ubiq:EARSPattern {name: "Ubiquitous"})
CREATE (ears_ubiq)-[:USES_ENTITY_TYPE {role: "response"}]->(ent_action);

// -----------------------------------------------------------------------------
// 8. INCOSE Quality Rules → Atomicity Criteria Overlap
// -----------------------------------------------------------------------------

// INCOSE "Singular" rule relates to atomicity
MATCH (incose:QualityFramework {name: "INCOSE Guide to Writing Requirements"})
MATCH (crit:AtomicityCriterion {name: "Singular (IEEE 29148)"})
CREATE (incose)-[:ALIGNS_WITH]->(crit);

// Logical expression conventions (R15) relate to trigger-response criterion
MATCH (r15:QualityRule {id: "R15"})
MATCH (crit:AtomicityCriterion {name: "Single Trigger-Response"})
CREATE (r15)-[:SUPPORTS_CRITERION]->(crit);

// -----------------------------------------------------------------------------
// 9. Tool → Framework Implementation (Additional Links)
// -----------------------------------------------------------------------------

// NASA FRET implements temporal logic (formal methods)
MATCH (fret:Tool {name: "NASA FRET"})
MATCH (ltl:Concept {name: "Linear Temporal Logic"})
CREATE (fret)-[:IMPLEMENTS]->(ltl);

// IBM DOORS supports traceability for safety standards
MATCH (doors:Tool {name: "IBM DOORS"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (doors)-[:SUPPORTS_COMPLIANCE_WITH]->(iso);

MATCH (doors:Tool {name: "IBM DOORS"})
MATCH (do178:Standard {name: "DO-178C"})
CREATE (doors)-[:SUPPORTS_COMPLIANCE_WITH]->(do178);

// Kompozition uses NLP for requirements
MATCH (komp:Tool {name: "Kompozition"})
MATCH (nlp:Methodology {abbreviation: "NLP-RE"})
CREATE (komp)-[:IMPLEMENTS]->(nlp);

// GATE is foundation for NLP requirements extraction
MATCH (gate:Tool {name: "GATE"})
MATCH (nlp:Methodology {abbreviation: "NLP-RE"})
CREATE (gate)-[:ENABLES]->(nlp);

// -----------------------------------------------------------------------------
// 10. ICT Theory → Safety Standards (Instantiation)
// -----------------------------------------------------------------------------

// ICT theory applies to integrity level lattices in standards
MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (iec:Standard {name: "IEC 61508"})
CREATE (ict)-[:MODELS_INTEGRITY_LEVELS_OF]->(iec);

MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (ict)-[:MODELS_INTEGRITY_LEVELS_OF]->(iso);

MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (do178:Standard {name: "DO-178C"})
CREATE (ict)-[:MODELS_INTEGRITY_LEVELS_OF]->(do178);

// -----------------------------------------------------------------------------
// 11. Validation Technique → Standard Requirements
// -----------------------------------------------------------------------------

// Standards require specific validation techniques
MATCH (formal_insp:ValidationTechnique {name: "Formal Inspection"})
MATCH (do178:Standard {name: "DO-178C"})
CREATE (do178)-[:REQUIRES {for_dal: "DAL A, DAL B"}]->(formal_insp);

MATCH (expert_rev:ValidationTechnique {name: "Expert Review"})
MATCH (iso:Standard {name: "ISO 26262"})
CREATE (iso)-[:REQUIRES {for_asil: "ASIL C, ASIL D"}]->(expert_rev);

// -----------------------------------------------------------------------------
// 12. Cross-Hypothesis Capability Overlaps
// -----------------------------------------------------------------------------

// H4 (Parsing Bottleneck) relates to NLP-RE methodology
MATCH (h4:Hypothesis {id: "H4"})
MATCH (nlp:Methodology {abbreviation: "NLP-RE"})
CREATE (h4)-[:IDENTIFIES_LIMITATION_IN]->(nlp);

// H5 (Coverage Ceiling) relates to ontology coverage gaps
MATCH (h5:Hypothesis {id: "H5"})
MATCH (gap:UKCResearchGap {name: "Knowledge Compilation Bottleneck"})
CREATE (h5)-[:QUANTIFIES]->(gap);

// H6 (Expressiveness-Decidability) relates to OWL profiles
MATCH (h6:Hypothesis {id: "H6"})
MATCH (el:OWLProfile {name: "OWL 2 EL"})
CREATE (h6)-[:EXPLAINS_TRADEOFF_FOR]->(el);

MATCH (h6:Hypothesis {id: "H6"})
MATCH (dl:OWLProfile {name: "OWL DL (SROIQ)"})
CREATE (h6)-[:EXPLAINS_TRADEOFF_FOR]->(dl);

// -----------------------------------------------------------------------------
// 13. Reasoner → Ontology Coverage Evidence
// -----------------------------------------------------------------------------

// ELK reasons over SNOMED-CT (explicit connection)
MATCH (elk:Reasoner {name: "ELK"})
MATCH (snomed:OntologyCoverage {name: "SNOMED CT"})
CREATE (elk)-[:REASONS_OVER {performance: "~5 seconds classification"}]->(snomed);

// -----------------------------------------------------------------------------
// 14. Feature Models ↔ Requirements Decomposition
// -----------------------------------------------------------------------------

// Feature Model constraints relate to requirement decomposition patterns
MATCH (fm_const:Concept {name: "Feature Model Constraints"})
MATCH (cfsr:RequirementType {abbreviation: "CFSR"})
CREATE (fm_const)-[:ANALOGOUS_TO {
    mapping: "mandatory=all required, optional=conditional, XOR=alternatives"
}]->(cfsr);

// Valid configuration relates to consistent requirement sets
MATCH (valid_config:Concept {name: "Valid Configuration"})
MATCH (cap_consistency:Capability {name: "Consistency Checking"})
CREATE (valid_config)-[:ENABLES]->(cap_consistency);

// -----------------------------------------------------------------------------
// 15. DL Concepts ↔ Safety Requirement Concepts
// -----------------------------------------------------------------------------

// TBox models requirement taxonomies
MATCH (tbox:Concept {name: "TBox"})
MATCH (afsr:RequirementType {abbreviation: "AFSR"})
CREATE (tbox)-[:CAN_FORMALIZE]->(afsr);

// Subsumption models requirement implication
MATCH (subsum:Concept {name: "Subsumption"})
MATCH (cap_subsump:Capability {name: "Subsumption Reasoning"})
CREATE (subsum)-[:PROVIDES]->(cap_subsump);

// -----------------------------------------------------------------------------
// 16. Extraction Phase → Tool Relationships
// -----------------------------------------------------------------------------

// Phase 1 uses NLP tools
MATCH (p1:ExtractionPhase {name: "Structural Preprocessing"})
MATCH (gate:Tool {name: "GATE"})
CREATE (p1)-[:CAN_USE]->(gate);

// Phase 2 (EARS classification) uses EARS-CTRL
MATCH (p2:ExtractionPhase {name: "EARS Pattern Classification"})
MATCH (ctrl:Tool {name: "EARS-CTRL"})
CREATE (p2)-[:CAN_USE]->(ctrl);

// Phase 4 uses requirements management tools
MATCH (p4:ExtractionPhase {name: "Expert Validation"})
MATCH (doors:Tool {name: "IBM DOORS"})
CREATE (p4)-[:CAN_USE]->(doors);

MATCH (p4:ExtractionPhase {name: "Expert Validation"})
MATCH (polarion:Tool {name: "Siemens Polarion"})
CREATE (p4)-[:CAN_USE]->(polarion);

// =============================================================================
// USEFUL QUERIES FOR UKC CONTENT
// =============================================================================

// Query: Get UKC architecture layers with status
// MATCH (l:UKCLayer)
// RETURN l.name, l.technologies, l.latency, l.status
// ORDER BY l.name;

// Query: Find research domains and their relationships
// MATCH (d1:ResearchDomain)-[r]->(d2:ResearchDomain)
// RETURN d1.name, type(r), d2.name;

// Query: Get all papers by topic
// MATCH (p:Paper)
// RETURN p.topic, collect(p.title) AS papers
// ORDER BY p.topic;

// Query: Find complexity bounds for tractable logics
// MATCH (c:ComplexityBound)
// WHERE c.tractable = true
// RETURN c.logic, c.complexity, c.use_case;

// Query: Get research groups by domain
// MATCH (g:ResearchGroup)
// RETURN g.domain, collect(g.name) AS groups
// ORDER BY g.domain;

// Query: Find gaps blocking UKC Layer 4
// MATCH (g:UKCResearchGap)-[:BLOCKS]->(l:UKCLayer {name: "Layer 4: Open Problems"})
// RETURN g.name, g.description, g.type;

// Query: Get UKC hypothesis evidence
// MATCH (h:UKCHypothesis)
// RETURN h.id, h.name, h.current_evidence;

// Query: Find papers supporting UKC hypotheses (with evidence strength)
// MATCH (p:Paper)-[r:SUPPORTS]->(h:UKCHypothesis)
// RETURN h.id, p.title, p.venue, r.degree AS support_degree, 
//        r.metrics, r.limitation
// ORDER BY r.degree DESC;

// Query: Get all venues by type
// MATCH (v:Venue)
// RETURN v.focus, collect(v.name) AS venues;

// Query: Complete research landscape
// MATCH (d:ResearchDomain)
// OPTIONAL MATCH (d)<-[:RESEARCHES]-(g:ResearchGroup)
// OPTIONAL MATCH (d)<-[:CONTRIBUTES_TO]-(p:Paper)
// RETURN d.name, d.state_of_art, collect(DISTINCT g.name) AS groups, count(DISTINCT p) AS papers;
