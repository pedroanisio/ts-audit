// =============================================================================
// RESEARCH FOUNDATIONS KNOWLEDGE GRAPH
// Version: 1.0
// Description: Core research assets - References, Mathematics, Theories, 
//              Hypotheses, and Product Opportunities
// =============================================================================

// =============================================================================
// PART 0: SCHEMA (Constraints & Indexes)
// =============================================================================

// -----------------------------------------------------------------------------
// 0.1 CONSTRAINTS
// -----------------------------------------------------------------------------

CREATE CONSTRAINT framework_abbreviation IF NOT EXISTS 
FOR (f:Framework) REQUIRE f.abbreviation IS UNIQUE;

CREATE CONSTRAINT theory_name IF NOT EXISTS 
FOR (t:Theory) REQUIRE t.name IS UNIQUE;

CREATE CONSTRAINT hypothesis_id IF NOT EXISTS 
FOR (h:Hypothesis) REQUIRE h.id IS UNIQUE;

CREATE CONSTRAINT reference_title IF NOT EXISTS 
FOR (r:Reference) REQUIRE r.title IS UNIQUE;

CREATE CONSTRAINT paper_title IF NOT EXISTS 
FOR (p:Paper) REQUIRE p.title IS UNIQUE;

CREATE CONSTRAINT definition_name IF NOT EXISTS 
FOR (d:Definition) REQUIRE d.name IS UNIQUE;

CREATE CONSTRAINT theorem_name IF NOT EXISTS 
FOR (t:Theorem) REQUIRE t.name IS UNIQUE;

CREATE CONSTRAINT product_name IF NOT EXISTS 
FOR (p:Product) REQUIRE p.name IS UNIQUE;

CREATE CONSTRAINT protocol_name IF NOT EXISTS 
FOR (p:Protocol) REQUIRE p.name IS UNIQUE;

CREATE CONSTRAINT system_name IF NOT EXISTS 
FOR (s:System) REQUIRE s.name IS UNIQUE;

CREATE CONSTRAINT venue_name IF NOT EXISTS 
FOR (v:Venue) REQUIRE v.name IS UNIQUE;

CREATE CONSTRAINT research_group_name IF NOT EXISTS 
FOR (rg:ResearchGroup) REQUIRE rg.name IS UNIQUE;

CREATE CONSTRAINT research_domain_abbrev IF NOT EXISTS 
FOR (rd:ResearchDomain) REQUIRE rd.abbreviation IS UNIQUE;

CREATE CONSTRAINT research_thread_id IF NOT EXISTS 
FOR (rt:ResearchThread) REQUIRE rt.id IS UNIQUE;

CREATE CONSTRAINT research_direction_name IF NOT EXISTS 
FOR (rd:ResearchDirection) REQUIRE rd.name IS UNIQUE;

CREATE CONSTRAINT hypothesis_category_name IF NOT EXISTS 
FOR (hc:HypothesisCategory) REQUIRE hc.name IS UNIQUE;

CREATE CONSTRAINT theoretical_barrier_id IF NOT EXISTS 
FOR (tb:TheoreticalBarrier) REQUIRE tb.id IS UNIQUE;

CREATE CONSTRAINT theoretical_impossibility_id IF NOT EXISTS 
FOR (ti:TheoreticalImpossibility) REQUIRE ti.id IS UNIQUE;

CREATE CONSTRAINT achievable_capability_id IF NOT EXISTS 
FOR (ac:AchievableCapability) REQUIRE ac.id IS UNIQUE;

CREATE CONSTRAINT foundational_premise_id IF NOT EXISTS 
FOR (fp:FoundationalPremise) REQUIRE fp.id IS UNIQUE;

CREATE CONSTRAINT fundamental_limitation_id IF NOT EXISTS 
FOR (fl:FundamentalLimitation) REQUIRE fl.id IS UNIQUE;

// -----------------------------------------------------------------------------
// 0.2 INDEXES
// -----------------------------------------------------------------------------

CREATE INDEX framework_name IF NOT EXISTS FOR (f:Framework) ON (f.name);
CREATE INDEX concept_framework IF NOT EXISTS FOR (c:Concept) ON (c.framework);
CREATE INDEX concept_name IF NOT EXISTS FOR (c:Concept) ON (c.name);
CREATE INDEX hypothesis_category IF NOT EXISTS FOR (h:Hypothesis) ON (h.category);
CREATE INDEX paper_topic IF NOT EXISTS FOR (p:Paper) ON (p.topic);
CREATE INDEX paper_venue IF NOT EXISTS FOR (p:Paper) ON (p.venue);
CREATE INDEX definition_theory IF NOT EXISTS FOR (d:Definition) ON (d.theory);
CREATE INDEX theorem_theory IF NOT EXISTS FOR (t:Theorem) ON (t.theory);
CREATE INDEX research_group_domain IF NOT EXISTS FOR (rg:ResearchGroup) ON (rg.domain);
CREATE INDEX research_direction_category IF NOT EXISTS FOR (rd:ResearchDirection) ON (rd.category);
CREATE INDEX theoretical_barrier_type IF NOT EXISTS FOR (tb:TheoreticalBarrier) ON (tb.type);
CREATE INDEX fundamental_limitation_category IF NOT EXISTS FOR (fl:FundamentalLimitation) ON (fl.category);

// Full-text search indexes
CREATE FULLTEXT INDEX concept_search IF NOT EXISTS 
FOR (c:Concept) ON EACH [c.name, c.definition, c.notation];

CREATE FULLTEXT INDEX paper_search IF NOT EXISTS 
FOR (p:Paper) ON EACH [p.title, p.contribution];

CREATE FULLTEXT INDEX hypothesis_search IF NOT EXISTS 
FOR (h:Hypothesis) ON EACH [h.name, h.formal_statement];

// =============================================================================
// PART 1: REFERENCES & CITATIONS
// =============================================================================

// -----------------------------------------------------------------------------
// 1.1 FOUNDATIONAL REFERENCES
// -----------------------------------------------------------------------------

// Formal Concept Analysis
CREATE (ref_wille1982:Reference {
    authors: "Wille, R.",
    year: 1982,
    title: "Restructuring Lattice Theory: An Approach Based on Hierarchies of Concepts",
    venue: "Ordered Sets",
    significance: "Founded Formal Concept Analysis"
})

CREATE (ref_ganter1999:Reference {
    authors: "Ganter, B. & Wille, R.",
    year: 1999,
    title: "Formal Concept Analysis: Mathematical Foundations",
    publisher: "Springer",
    significance: "Definitive treatment of FCA"
})

// Description Logics
CREATE (ref_handbook2003:Reference {
    authors: "Baader, F., Calvanese, D., McGuinness, D., Nardi, D. & Patel-Schneider, P.",
    year: 2003,
    title: "The Description Logic Handbook",
    publisher: "Cambridge University Press",
    significance: "Comprehensive DL reference"
})

CREATE (ref_horrocks2006:Reference {
    authors: "Horrocks, I., Kutz, O. & Sattler, U.",
    year: 2006,
    title: "The Even More Irresistible SROIQ",
    venue: "KR 2006",
    significance: "Formalizes OWL 2 semantics"
})

// Institution Theory
CREATE (ref_goguen1992:Reference {
    authors: "Goguen, J. & Burstall, R.",
    year: 1992,
    title: "Institutions: Abstract Model Theory for Specification and Programming",
    venue: "Journal of the ACM",
    volume: "39(1)",
    pages: "95-146",
    significance: "Founded Institution Theory"
})

CREATE (ref_diaconescu2008:Reference {
    authors: "Diaconescu, R.",
    year: 2008,
    title: "Institution-independent Model Theory",
    publisher: "Birkhäuser",
    significance: "Comprehensive Institution Theory treatment"
})

// Galois Connections & Abstract Interpretation
CREATE (ref_cousot1977:Reference {
    authors: "Cousot, P. & Cousot, R.",
    year: 1977,
    title: "Abstract Interpretation: A Unified Lattice Model for Static Analysis of Programs",
    venue: "POPL",
    pages: "238-252",
    significance: "Applied Galois connections to program analysis"
})

// Feature Models
CREATE (ref_kang1990:Reference {
    authors: "Kang, K. et al.",
    year: 1990,
    title: "Feature-Oriented Domain Analysis (FODA) Feasibility Study",
    venue: "SEI Technical Report CMU/SEI-90-TR-021",
    significance: "Founded Feature Modeling"
})

CREATE (ref_batory2005:Reference {
    authors: "Batory, D.",
    year: 2005,
    title: "Feature Models, Grammars, and Propositional Formulas",
    venue: "SPLC 2005, LNCS 3714",
    pages: "7-20",
    significance: "Formal semantics of Feature Models"
})

// Category Theory
CREATE (ref_goguen1991:Reference {
    authors: "Goguen, J.",
    year: 1991,
    title: "A Categorical Manifesto",
    venue: "Mathematical Structures in Computer Science",
    volume: "1(1)",
    pages: "49-67",
    significance: "Category Theory for specification"
})

CREATE (ref_jacobs1999:Reference {
    authors: "Jacobs, B.",
    year: 1999,
    title: "Categorical Logic and Type Theory",
    publisher: "Elsevier",
    significance: "Connects category theory and type theory"
})

// Belief Revision & Epistemic Logic
CREATE (ref_agm1985:Reference {
    authors: "Alchourrón, C., Gärdenfors, P. & Makinson, D.",
    year: 1985,
    title: "On the Logic of Theory Change: Partial Meet Contraction and Revision Functions",
    venue: "Journal of Symbolic Logic",
    volume: "50(2)",
    significance: "Founded AGM belief revision"
})

CREATE (ref_kripke1963:Reference {
    authors: "Kripke, S.",
    year: 1963,
    title: "Semantical Considerations on Modal Logic",
    venue: "Acta Philosophica Fennica",
    volume: "16",
    significance: "Founded Kripke semantics"
})

// Causal Inference
CREATE (ref_pearl2000:Reference {
    authors: "Pearl, J.",
    year: 2000,
    title: "Causality: Models, Reasoning, and Inference",
    publisher: "Cambridge University Press",
    significance: "Definitive treatment of causal inference"
})

// Safety Standards
CREATE (ref_antonino2014:Reference {
    authors: "Antonino, P. et al.",
    year: 2014,
    title: "The Safety Requirements Decomposition Pattern",
    concepts: ["AFSR", "CFSR"],
    significance: "Atomic requirement decomposition"
})

CREATE (ref_okoh2024:Reference {
    authors: "Okoh & Myklebust",
    year: 2024,
    title: "Systematic mapping from ISO 26262 to IEC 61508",
    finding: "No consensus criteria for requalifying ISO 26262 elements for IEC 61508 reuse",
    significance: "Cross-standard mapping challenge"
})

// LLM & AI Research
CREATE (ref_xu2024:Reference {
    authors: "Xu, Z. et al.",
    year: 2024,
    title: "Hallucination is Inevitable: An Innate Limitation of Large Language Models",
    venue: "arXiv",
    significance: "Proves hallucinations are architecturally inevitable"
})

CREATE (ref_stanford2024:Reference {
    authors: "Stanford HAI",
    year: 2024,
    title: "Legal AI Hallucination Study",
    finding: "Lexis+ AI: ~17% hallucination despite 'hallucination-free' claim; Westlaw AI: ~33%",
    significance: "Empirical hallucination rates in production systems"
})

CREATE (ref_bengio2024:Reference {
    authors: "Bengio, Y. et al.",
    year: 2024,
    title: "Towards Guaranteed Safe AI",
    quote: "The goal is more like 'a safety case involving proofs' than 'a formal proof of safety'—probabilistic bounds rather than logical certainty",
    significance: "Expert perspective on AI safety limits"
})

// -----------------------------------------------------------------------------
// 1.2 KEY PAPERS (2023-2025)
// -----------------------------------------------------------------------------

// Neurosymbolic Integration
CREATE (paper_pot:Paper {
    title: "Proof of Thought: Neurosymbolic Program Synthesis",
    venue: "arXiv 2024",
    contribution: "JSON DSL for FOL conversion, theorem prover verification",
    topic: "Neurosymbolic Integration"
})

CREATE (paper_formal_llm:Paper {
    title: "Formal-LLM: Integrating Formal and Natural Language",
    venue: "arXiv 2024",
    contribution: "Pushdown automaton supervision, 100% constraint adherence",
    topic: "Neurosymbolic Integration",
    key_result: "100% constraint adherence"
})

CREATE (paper_nesy_review:Paper {
    title: "Neuro-Symbolic AI in 2024: Systematic Review",
    venue: "arXiv 2025",
    contribution: "167-paper PRISMA review of field",
    topic: "Neurosymbolic Integration"
})

// Ontology-Grounded Generation
CREATE (paper_og_rag:Paper {
    title: "OG-RAG: Ontology-Grounded RAG",
    venue: "EMNLP 2025",
    contribution: "+55% fact recall, +40% correctness via ontology hypergraphs",
    topic: "Ontology-Grounded Generation",
    improvements: {fact_recall: "+55%", correctness: "+40%"}
})

CREATE (paper_kg_construct:Paper {
    title: "LLM-empowered KG Construction Survey",
    venue: "arXiv 2025",
    contribution: "Taxonomy of schema-driven vs schema-free extraction",
    topic: "Ontology-Grounded Generation"
})

// Validation & Verification
CREATE (paper_xpshacl:Paper {
    title: "xpSHACL: Explainable SHACL Validation with RAG+LLMs",
    venue: "arXiv 2025",
    contribution: "Human-readable violation explanations",
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

// Safety & Verification
CREATE (paper_roboguard:Paper {
    title: "RoboGuard: Safety Guardrails for LLM Robots",
    venue: "arXiv 2025",
    contribution: "Temporal logic synthesis, <2.5% unsafe execution",
    topic: "AI Safety",
    unsafe_reduction: "92% to <2.5%"
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

// -----------------------------------------------------------------------------
// 1.3 EXPERT QUOTES
// -----------------------------------------------------------------------------

CREATE (quote_bengio:ExpertQuote {
    expert: "Yoshua Bengio",
    credentials: "Turing Award",
    quote: "I see this problem boiling down to our inability to provide to the AI a formal and complete specification of what is unacceptable... There are fundamental scientific reasons why this is a hard problem, maybe even unsolvable."
})

CREATE (quote_karpathy:ExpertQuote {
    expert: "Andrej Karpathy",
    credentials: "OpenAI, Tesla AI",
    quote: "In some sense, hallucination is all LLMs do. They are dream machines... It's only when the dreams go into deemed factually incorrect territory that we label it a hallucination."
})

CREATE (quote_marcus:ExpertQuote {
    expert: "Gary Marcus",
    credentials: "NYU, AI Critic",
    quote: "The only way you can kill hallucinations is to not run the system."
})

// -----------------------------------------------------------------------------
// 1.4 RESEARCH GROUPS
// -----------------------------------------------------------------------------

CREATE (group_dresden:ResearchGroup {
    name: "TU Dresden ICCL",
    focus: "Description logics, Datalog",
    key_researcher: "Markus Krötzsch",
    domain: "KRR"
})

CREATE (group_oxford:ResearchGroup {
    name: "University of Oxford KRR",
    focus: "OWL 2 architecture, semantic entropy",
    key_researchers: ["Ian Horrocks", "Boris Motik", "Yarin Gal"],
    domain: "KRR/NLP"
})

CREATE (group_stanford_marabou:ResearchGroup {
    name: "Stanford Marabou Team",
    focus: "Neural network verification",
    key_researchers: ["Clark Barrett", "Guy Katz"],
    domain: "Formal Verification"
})

CREATE (group_ibm_nesy:ResearchGroup {
    name: "IBM Research Neuro-Symbolic",
    focus: "Neuro-Symbolic AI Toolkit",
    domain: "Neuro-Symbolic"
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

// -----------------------------------------------------------------------------
// 1.5 ACADEMIC VENUES
// -----------------------------------------------------------------------------

CREATE (venue_iswc:Venue {
    name: "ISWC",
    full_name: "International Semantic Web Conference",
    focus: "Knowledge graphs, ontologies, semantic technologies",
    frequency: "Annual, November"
})

CREATE (venue_kr:Venue {
    name: "KR",
    full_name: "Knowledge Representation and Reasoning",
    focus: "Description logics, reasoning",
    frequency: "Biennial"
})

CREATE (venue_aaai:Venue {
    name: "AAAI",
    full_name: "Association for the Advancement of Artificial Intelligence",
    focus: "Broad AI",
    frequency: "Annual, February"
})

CREATE (venue_neurips:Venue {
    name: "NeurIPS",
    full_name: "Neural Information Processing Systems",
    focus: "Machine learning, neural networks",
    frequency: "Annual, December"
})

CREATE (venue_acl:Venue {
    name: "ACL",
    full_name: "Association for Computational Linguistics",
    focus: "NLP, language models",
    frequency: "Annual, July"
})

// =============================================================================
// PART 2: MATHEMATICAL FRAMEWORKS & CONCEPTS
// =============================================================================

// -----------------------------------------------------------------------------
// 2.1 MATHEMATICAL FRAMEWORKS
// -----------------------------------------------------------------------------

CREATE (fca:Framework {
    name: "Formal Concept Analysis",
    abbreviation: "FCA",
    description: "Structural backbone for decomposing standards into atomic requirements and discovering relationships",
    core_structure: "Concept Lattice",
    complexity: "Polynomial for lattice construction",
    key_operations: ["Derivation operators", "Implication discovery", "Canonical basis"],
    application: "Requirements decomposition and clustering"
})

CREATE (dl:Framework {
    name: "Description Logics",
    abbreviation: "DL",
    description: "Formal foundation of OWL providing precise semantics for requirement subsumption and equivalence",
    core_structure: "Knowledge Base (TBox + ABox)",
    complexity: "N2ExpTime-complete for SROIQ, ExpTime-complete for ALC",
    key_operations: ["Subsumption", "Classification", "Consistency checking"],
    application: "Ontology reasoning and semantic validation"
})

CREATE (inst:Framework {
    name: "Institution Theory",
    abbreviation: "IT",
    description: "Mathematically cleanest abstraction for comparing standards in different logical frameworks",
    core_structure: "Institution = (Sign, Sen, Mod, ⊨)",
    complexity: "Depends on underlying logics",
    key_operations: ["Comorphisms", "Grothendieck construction"],
    application: "Cross-framework translation"
})

CREATE (galois:Framework {
    name: "Galois Connections",
    abbreviation: "GC",
    description: "Rigorous machinery for abstraction-concretization relationships",
    core_structure: "Monotone Galois Connection (α, γ)",
    complexity: "Depends on poset structure",
    key_property: "α(c) ⊑ a ⟺ c ⊑ γ(a)",
    application: "Best approximation reasoning"
})

CREATE (fm:Framework {
    name: "Feature Models",
    abbreviation: "FM",
    description: "Well-established framework for variability modeling with propositional semantics",
    core_structure: "Feature Diagram FD = (F, r, DE, CE, λ)",
    complexity: "NP-complete (SAT-based)",
    application: "Configuration and variability"
})

CREATE (cat:Framework {
    name: "Category Theory",
    abbreviation: "CT",
    description: "Mathematical meta-framework underlying institution theory for specification composition",
    core_structure: "Category C = (Ob, Hom, ∘, id)",
    complexity: "Abstract - implementation dependent",
    key_constructions: ["Functors", "Natural transformations", "Adjunctions", "Limits/Colimits"],
    application: "Compositional semantics and verification"
})

// -----------------------------------------------------------------------------
// 2.2 MATHEMATICAL CONCEPTS BY FRAMEWORK
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
    definition: "Set of terminological axioms defining concept hierarchies",
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

// Category Theory Concepts
CREATE (category_def:Concept {
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

CREATE (adjunction:Concept {
    name: "Adjunction",
    notation: "L ⊣ R",
    definition: "Hom_D(L(C), D) ≅ Hom_C(C, R(D)) - captures translation-embedding relationships",
    framework: "CT"
})

CREATE (lcc:Concept {
    name: "Locally Cartesian Closed Category",
    notation: "LCC",
    definition: "Category where every slice category C/A is cartesian closed",
    framework: "CT",
    significance: "Provides semantics for dependent type theory"
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

// Kripke Semantics Concepts
CREATE (kripke_frame:Concept {
    name: "Kripke Frame",
    notation: "F = (W, R)",
    definition: "Set of worlds W with accessibility relation R ⊆ W × W",
    framework: "Kripke"
})

CREATE (kripke_model:Concept {
    name: "Kripke Model",
    notation: "M = (W, R, V)",
    definition: "Frame with valuation V: Prop → P(W) assigning propositions to worlds",
    framework: "Kripke"
})

CREATE (satisfaction_relation:Concept {
    name: "Satisfaction Relation",
    notation: "M, w ⊨ φ",
    definition: "Formula φ is true at world w in model M",
    framework: "Kripke"
})

// =============================================================================
// PART 3: THEORIES
// =============================================================================

// -----------------------------------------------------------------------------
// 3.1 INTEGRITY CLASSIFICATION THEORY (ICT)
// -----------------------------------------------------------------------------

CREATE (ict:Theory {
    name: "Integrity Classification Theory",
    abbreviation: "ICT",
    description: "A domain-agnostic framework for impact-driven constraint derivation",
    core_insight: "Many engineering disciplines use ordered classification systems where higher levels indicate greater criticality and demand more stringent constraints",
    mathematical_structure: "Impact Space (I) --Φ--> Integrity Lattice (L) --Ψ--> Constraint Space (C)",
    applications: ["Safety standards mapping", "Cross-domain integrity comparison", "Requirement decomposition"],
    implementation: "lattice-theory.ts"
})

// ICT Definitions
CREATE (def_integrity_lattice:Definition {
    name: "Integrity Lattice",
    number: 1,
    notation: "L = (E, ≤, ⊥, ⊤)",
    formal: "E is finite set of integrity levels, ≤ is total order, ⊥ is bottom, ⊤ is top",
    note: "Since E is totally ordered, forms a CHAIN: join(a,b) = max(a,b), meet(a,b) = min(a,b)",
    theory: "ICT"
})

CREATE (def_impact_space:Definition {
    name: "Impact Space",
    number: 2,
    notation: "I = (D₁ × D₂ × ... × Dₙ, ⊕)",
    formal: "Each Dᵢ is finite ordered set of impact dimensions, ⊕ is aggregation function",
    theory: "ICT"
})

CREATE (def_classification_functor:Definition {
    name: "Classification Functor",
    number: 3,
    notation: "Φ: I → L",
    formal: "Monotonic function mapping impact assessments to integrity levels",
    property: "Order preserving: if i₁ ≤ᵢ i₂ then Φ(i₁) ≤ₗ Φ(i₂)",
    theory: "ICT"
})

CREATE (def_constraint_space:Definition {
    name: "Constraint Space",
    number: 4,
    notation: "C = (C, ≤c)",
    formal: "C is set of engineering constraint bundles, ≤c is partial order (more stringent than)",
    theory: "ICT"
})

CREATE (def_constraint_derivation:Definition {
    name: "Constraint Derivation Functor",
    number: 5,
    notation: "Ψ: L → C",
    formal: "Monotonic function mapping integrity levels to constraint bundles",
    property: "Order preserving: if ℓ₁ ≤ₗ ℓ₂ then Ψ(ℓ₁) ≤c Ψ(ℓ₂)",
    theory: "ICT"
})

CREATE (def_universal_ordinal:Definition {
    name: "Universal Ordinal Space",
    number: 6,
    notation: "U = ([0, 1], ≤, 0, 1)",
    formal: "The canonical bounded chain into which all integrity lattices embed",
    theory: "ICT"
})

CREATE (def_normalization_functor:Definition {
    name: "Normalization Functor",
    number: 7,
    notation: "ν: L → U",
    formal: "ν(ℓⱼ) = j / (k - 1) for j-th level in lattice with k levels",
    property: "Order-preserving, maps ⊥ → 0, ⊤ → 1",
    theory: "ICT"
})

CREATE (def_system_composition:Definition {
    name: "System Composition",
    number: 8,
    notation: "⊙",
    formal: "For subsystems s₁...sₙ with levels ℓ₁...ℓₙ, system-level ℓ_sys determined by composition operator",
    rules: ["SERIES: max (join)", "PARALLEL: min (meet)", "ALLOCATED: each ≥ system"],
    theory: "ICT"
})

// ICT Theorems
CREATE (thm_composition:Theorem {
    name: "Composition Theorem",
    number: 1,
    statement: "The composition Ψ ∘ Φ: I → C is monotonic",
    meaning: "Higher impact → higher integrity → more stringent constraints",
    theory: "ICT"
})

CREATE (thm_galois:Theorem {
    name: "Galois Connection Theorem",
    number: 2,
    statement: "If Φ has a right adjoint Φᴿ: L → I, then (Φ, Φᴿ) forms a Galois connection",
    meaning: "Enables best approximation reasoning between impact and integrity",
    theory: "ICT"
})

CREATE (thm_universal:Theorem {
    name: "Universal Property Theorem",
    number: 3,
    statement: "For lattices L₁, L₂ with normalizations ν₁, ν₂: a ≤ᵤ b ⟺ ν₁(a) ≤ ν₂(b) is reflexive and transitive",
    caveat: "Preserves ORDER but discards SEMANTIC content - same position ≠ interchangeable",
    theory: "ICT"
})

CREATE (thm_decomposition:Theorem {
    name: "Decomposition Theorem",
    number: 4,
    statement: "If system S with requirement ℓ_sys decomposes into independent S₁...Sₙ",
    options: ["Conservative: each Sᵢ gets ℓ_sys", "Risk-distributed: requires probabilistic analysis"],
    theory: "ICT"
})

// -----------------------------------------------------------------------------
// 3.2 AGM BELIEF REVISION
// -----------------------------------------------------------------------------

CREATE (agm:Theory {
    name: "AGM Belief Revision",
    abbreviation: "AGM",
    description: "Foundational theory for rational belief change",
    authors: "Alchourrón, Gärdenfors, Makinson",
    year: 1985,
    operations: ["Expansion (K + φ)", "Contraction (K - φ)", "Revision (K * φ)"],
    key_postulates: ["Success", "Consistency", "Inclusion", "Vacuity", "Recovery"]
})

CREATE (agm_expansion:Concept {
    name: "Belief Expansion",
    notation: "K + φ",
    definition: "Add formula φ to belief set K without removing anything",
    framework: "AGM"
})

CREATE (agm_contraction:Concept {
    name: "Belief Contraction",
    notation: "K - φ",
    definition: "Remove formula φ from belief set K with minimal change",
    framework: "AGM"
})

CREATE (agm_revision:Concept {
    name: "Belief Revision",
    notation: "K * φ",
    definition: "Consistently incorporate φ into K (Levi identity: (K - ¬φ) + φ)",
    framework: "AGM"
})

// -----------------------------------------------------------------------------
// 3.3 DYNAMIC EPISTEMIC LOGIC
// -----------------------------------------------------------------------------

CREATE (del:Theory {
    name: "Dynamic Epistemic Logic",
    abbreviation: "DEL",
    description: "Models how knowledge changes through actions like announcements and observations",
    key_structures: ["Action Models", "Product Updates", "Event Models"]
})

CREATE (action_model:Concept {
    name: "Action Model",
    notation: "A = (E, pre, post, ~_a)",
    definition: "Events E, preconditions pre, postconditions post, agent observability relations",
    framework: "DEL"
})

CREATE (public_announcement:Concept {
    name: "Public Announcement",
    notation: "[φ!]ψ",
    definition: "After publicly announcing φ, ψ holds (all agents observe truthfully)",
    framework: "DEL"
})

CREATE (product_update:Concept {
    name: "Product Update",
    notation: "M ⊗ A",
    definition: "Epistemic model M updated with action model A",
    framework: "DEL"
})

// -----------------------------------------------------------------------------
// 3.4 STRUCTURAL CAUSAL MODELS
// -----------------------------------------------------------------------------

CREATE (scm:Theory {
    name: "Structural Causal Models",
    abbreviation: "SCM",
    description: "Pearl's framework for causal reasoning with do-calculus",
    reference: "Pearl (2000) - Causality"
})

CREATE (causal_graph:Concept {
    name: "Causal Graph",
    notation: "G = (V, E)",
    definition: "Directed acyclic graph where edges represent causal relationships",
    framework: "SCM"
})

CREATE (intervention:Concept {
    name: "Intervention",
    notation: "do(X = x)",
    definition: "Set variable X to value x, breaking incoming causal links",
    framework: "SCM"
})

CREATE (counterfactual:Concept {
    name: "Counterfactual Query",
    notation: "P(Y_x | E)",
    definition: "Probability of Y if X had been x, given evidence E",
    framework: "SCM"
})

// -----------------------------------------------------------------------------
// 3.5 KRIPKE SEMANTICS
// -----------------------------------------------------------------------------

CREATE (kripke_theory:Theory {
    name: "Kripke Semantics",
    abbreviation: "Kripke",
    description: "Possible world semantics for modal and epistemic logic",
    reference: "Kripke (1963)",
    applications: ["Modal logic", "Epistemic logic", "Temporal logic"]
})

// =============================================================================
// PART 4: HYPOTHESES
// =============================================================================

// -----------------------------------------------------------------------------
// 4.1 ARCHITECTURAL NECESSITY HYPOTHESES
// -----------------------------------------------------------------------------

CREATE (h1:Hypothesis {
    id: "H1",
    name: "Feedback Loop Necessity Hypothesis",
    category: "Architectural Necessity",
    formal_statement: "For LLM-generated outputs requiring conformance to a formal ontology O, iterative validation with feedback produces significantly higher conformance rates than single-pass generation",
    formula: "P(valid | iterative) > P(valid | one-shot)",
    testable_prediction: "One-shot LLM generation will fail ontology validation at rate r₁, while iterative feedback-guided generation will achieve validation at rate r₂, where r₂ >> r₁",
    supporting_evidence: "Stanford study (2024): 96% reduction in hallucinations with RAG + RLHF + guardrails",
    status: "supported"
})

CREATE (h2:Hypothesis {
    id: "H2",
    name: "Dual-Layer Validation Hypothesis",
    category: "Architectural Necessity",
    formal_statement: "Effective ontology validation requires two complementary formal mechanisms operating jointly: SHACL (structural, closed-world) and OWL Reasoner (logical, open-world)",
    formula: "Valid(o, O) ⟺ SHACL_pass(o) ∧ OWL_consistent(o, O)",
    testable_prediction: "Systems using only SHACL will miss logical inconsistencies; systems using only OWL will miss structural violations",
    critical_distinction: "OWL: 'Not stated ≠ false'; SHACL: 'If not there, violation'",
    status: "supported"
})

CREATE (h3:Hypothesis {
    id: "H3",
    name: "Tripartite Feedback Architecture Hypothesis",
    category: "Architectural Necessity",
    formal_statement: "Effective ontology-constrained LLM output requires three jointly necessary components: Violation Detection (V), Explanation Generation (E), and Constrained Regeneration (R)",
    formula: "Convergence ⟹ (V ∧ E ∧ R)",
    testable_prediction: "Removing any single component will significantly degrade convergence rates",
    supporting_evidence: "xpSHACL (July 2025), OL-KGC method (2025) shows 9.5-12% accuracy improvement",
    status: "supported"
})

// -----------------------------------------------------------------------------
// 4.2 BOTTLENECK HYPOTHESES
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// 4.3 THEORETICAL IMPOSSIBILITY HYPOTHESES
// -----------------------------------------------------------------------------

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
    supporting_evidence: ["Xu et al. (2024) mathematical proof", "Karpathy quote", "Marcus quote"]
})

// -----------------------------------------------------------------------------
// 4.4 EMPIRICAL REALITY HYPOTHESES
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// 4.5 ACHIEVABILITY HYPOTHESES
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// 4.6 KNOWLEDGE ACQUISITION HYPOTHESES
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// 4.7 UKC HYPOTHESES
// -----------------------------------------------------------------------------

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
    current_evidence: "LogicLLaMA (ACL 2024) achieves GPT-4 level on NL-to-FOL; Zhang et al. DMR 2024 shows accuracy declines on complex discourse"
})

CREATE (ukc_h3:Hypothesis:UKCHypothesis {
    id: "UKC-H3",
    name: "Feedback Loop Efficacy Hypothesis",
    category: "UKC",
    formal_statement: "Let H₀ be baseline hallucination rate. A formal validation system V with feedback loop F produces outputs with rate H₁ such that H₁/H₀ ≤ ε for acceptably small ε",
    current_evidence: "OG-RAG: +55% recall, +40% correctness; Amazon Bedrock: 99% accuracy claim; RoboGuard: 92% to <2.5% unsafe execution"
})

CREATE (ukc_h4:Hypothesis:UKCHypothesis {
    id: "UKC-H4",
    name: "Computational Tractability Hypothesis",
    category: "UKC",
    formal_statement: "For knowledge base K of size n and LLM output O of size m, validation V(K,O) completes in time T ≤ f(n,m) where f is polynomial and T meets real-time requirements (<100-300ms)",
    current_evidence: "SNOMED-CT classified by ELK in ~5s; Graphiti achieves ~300ms latency; Formal-LLM achieves 100% constraint adherence"
})

// =============================================================================
// PART 4B: HYPOTHESIS CATEGORIES
// =============================================================================

CREATE (cat_arch:HypothesisCategory {
    name: "Architectural Necessity",
    description: "Hypotheses about required system architecture for effective validation",
    hypotheses: ["H1", "H2", "H3"]
})

CREATE (cat_bottle:HypothesisCategory {
    name: "Bottleneck",
    description: "Hypotheses identifying fundamental bottlenecks limiting system performance",
    hypotheses: ["H4", "H5", "H6", "H7"]
})

CREATE (cat_impossible:HypothesisCategory {
    name: "Theoretical Impossibility",
    description: "Hypotheses establishing what cannot be achieved due to fundamental limits",
    hypotheses: ["H8", "H9"]
})

CREATE (cat_empirical:HypothesisCategory {
    name: "Empirical Reality",
    description: "Hypotheses grounded in observed system behavior and benchmarks",
    hypotheses: ["H10", "H11", "H12"]
})

CREATE (cat_achieve:HypothesisCategory {
    name: "Achievability",
    description: "Hypotheses defining what can realistically be achieved",
    hypotheses: ["H13", "H14", "H15"]
})

CREATE (cat_knowledge:HypothesisCategory {
    name: "Knowledge Acquisition",
    description: "Hypotheses about limits of knowledge formalization",
    hypotheses: ["H16", "H17"]
})

CREATE (cat_ukc:HypothesisCategory {
    name: "Universal Knowledge Compilation",
    description: "Hypotheses specific to the UKC research program",
    hypotheses: ["UKC-H1", "UKC-H2", "UKC-H3", "UKC-H4"]
})

// =============================================================================
// PART 4C: THEORETICAL BARRIERS
// =============================================================================

CREATE (barrier_np:TheoreticalBarrier {
    id: "TB1",
    name: "NP-Completeness Barrier",
    type: "Computational Complexity",
    formal_statement: "Constraint satisfaction problems are NP-complete in general",
    implication: "No polynomial-time algorithm exists unless P=NP",
    citation: "Bulatov & Zhuk (2017), CSP Dichotomy Theorem"
})

CREATE (barrier_undecidable:TheoreticalBarrier {
    id: "TB2",
    name: "Undecidability Barrier",
    type: "Decidability",
    formal_statement: "First-order logic satisfiability is undecidable (Church-Turing)",
    implication: "Must restrict to decidable fragments (DL, propositional)",
    citation: "Church (1936), Turing (1936)"
})

CREATE (barrier_turing:TheoreticalBarrier {
    id: "TB3",
    name: "Turing Completeness Barrier",
    type: "Expressiveness",
    formal_statement: "Full programming language verification is undecidable",
    implication: "Static analysis must over-approximate or be incomplete",
    citation: "Rice's Theorem"
})

CREATE (barrier_mechanism:TheoreticalBarrier {
    id: "TB4",
    name: "Mechanism Identity Barrier",
    type: "Architectural",
    formal_statement: "LLMs generate truth and falsehood through identical mechanisms",
    implication: "Cannot distinguish hallucination from correct output by mechanism alone",
    citation: "Karpathy, Marcus observations"
})

CREATE (barrier_semantic:TheoreticalBarrier {
    id: "TB5",
    name: "Semantic Gap Barrier",
    type: "Representation",
    formal_statement: "Gap between neural representations and symbolic knowledge is not fully bridgeable",
    implication: "Neuro-symbolic integration has inherent limitations",
    citation: "Neuro-Symbolic AI literature"
})

CREATE (barrier_godel:TheoreticalBarrier {
    id: "TB6",
    name: "Gödelian Incompleteness Barrier",
    type: "Logical",
    formal_statement: "Any consistent formal system containing arithmetic is incomplete",
    implication: "Some true statements cannot be proven within the system",
    citation: "Gödel (1931)"
})

CREATE (barrier_greenalffont:TheoreticalBarrier {
    id: "TB7",
    name: "Green-Laffont Barrier",
    type: "Game Theoretic",
    formal_statement: "No mechanism can simultaneously achieve efficiency, incentive compatibility, and budget balance",
    implication: "Trade-offs unavoidable in multi-agent verification systems",
    citation: "Green & Laffont theorem"
})

// =============================================================================
// PART 4D: THEORETICAL IMPOSSIBILITIES
// =============================================================================

CREATE (impossible_nn_verify:TheoreticalImpossibility {
    id: "TI1",
    name: "Complete Neural Network Verification",
    claim: "Complete verification of production-scale neural networks",
    barriers: ["NP-completeness", "undecidability", "architectural hallucination"],
    scalability_gap: "10^7 (verifiable ~100K neurons vs LLM ~10^12 parameters)",
    citations: ["Katz 2017", "Sälzer 2022", "Nourizadeh 2025"]
})

CREATE (impossible_zero_hallucination:TheoreticalImpossibility {
    id: "TI2",
    name: "Zero Hallucination Rate",
    claim: "Achieving zero hallucination rate in LLMs",
    barrier: "Identical generation mechanism for truth/falsehood",
    citations: ["Karpathy", "Marcus", "Xu et al. 2024 (arXiv 2506.06382)"]
})

CREATE (impossible_complete_nn:TheoreticalImpossibility {
    id: "TI3",
    name: "Complete Verification of Neural Networks at Scale",
    claim: "Fully verifying billion-parameter networks",
    barriers: ["10^7 scalability gap", "NExpTime complexity"],
    citations: ["α,β-CROWN limits", "Marabou limits"]
})

CREATE (impossible_full_formalization:TheoreticalImpossibility {
    id: "TI4",
    name: "Full Domain Knowledge Formalization",
    claim: "Complete formalization of all domain knowledge",
    barrier: "Expressiveness-decidability tradeoff",
    citations: ["OWL DL theory", "Gödel incompleteness"]
})

CREATE (impossible_universal_alignment:TheoreticalImpossibility {
    id: "TI5",
    name: "Perfect Ontology Alignment",
    claim: "100% automatic alignment of heterogeneous ontologies",
    barrier: "15 years of OAEI research shows plateau at 80-90%",
    citation: "Euzenat & Shvaiko (2013), OAEI campaigns 2004-2024"
})

// =============================================================================
// PART 4E: ACHIEVABLE CAPABILITIES
// =============================================================================

CREATE (achievable_syntactic:AchievableCapability {
    id: "AC1",
    name: "Syntactic Correctness Guarantees",
    capability: "Guaranteeing syntactic correctness of LLM outputs",
    mechanism: "Constrained decoding (DOMINO, Outlines, Guidance)",
    performance: "~100% for defined grammars",
    limitation: "Syntactic only, not semantic"
})

CREATE (achievable_high_precision:AchievableCapability {
    id: "AC2",
    name: "High Precision for Narrow Domains",
    capability: "Achieving very high precision in restricted domains",
    mechanism: "Verify-or-abstain strategy",
    performance: ">99% precision",
    tradeoff: "Reduced recall"
})

CREATE (achievable_risk_reduction:AchievableCapability {
    id: "AC3",
    name: "Significant Risk Reduction",
    capability: "Meaningful reduction in hallucination risk",
    mechanism: "Layered mitigation (RAG + RLHF + guardrails)",
    performance: "42-96% reduction",
    limitation: "Cannot eliminate residual risk"
})

CREATE (achievable_probabilistic:AchievableCapability {
    id: "AC4",
    name: "Probabilistic Safety Bounds",
    capability: "Providing probabilistic rather than absolute guarantees",
    mechanism: "Compositional architectures with measured error rates",
    performance: "Meaningful but not absolute bounds",
    citation: "Bengio et al. 2024"
})

CREATE (achievable_epistemic:AchievableCapability {
    id: "AC5",
    name: "Epistemic Transparency",
    capability: "Explicitly flagging uncertain or unvalidatable outputs",
    mechanism: "Validation with explicit rejection reasons",
    performance: "Validated ∨ Flagged guarantee",
    formula: "∀ output o: Valid(o, O) ∨ Flagged(o, reason)"
})

CREATE (achievable_structural:AchievableCapability {
    id: "AC6",
    name: "Structural Hallucination Reduction",
    capability: "Reducing hallucinations through ontological grounding",
    mechanism: "Ontology-grounded RAG, knowledge graph integration",
    performance: "60-80% reduction in domain-specific hallucinations",
    limitation: "Bounded by ontology coverage"
})

// =============================================================================
// PART 4F: FOUNDATIONAL PREMISES
// =============================================================================

CREATE (premise_zero_trust:FoundationalPremise {
    id: "P1",
    name: "Zero Trust of LLM Outputs",
    statement: "All LLM outputs are untrusted until independently verified",
    rationale: "LLMs predict plausible text, not guarantee correctness; hallucinations are architecturally inevitable",
    implication: "Treat LLM as proposal generator, not authority",
    supports_hypotheses: ["H8", "H9"]
})

CREATE (premise_third_party:FoundationalPremise {
    id: "P2",
    name: "Verification Must Be Third-Party",
    statement: "The verifier must be a separate computational actor that does NOT rely on the LLM to verify itself",
    rationale: "Self-consistency checks can be systematically fooled; asking LLM 'are you sure?' gets another hallucination",
    implication: "Use external formal methods (SMT solvers, type checkers) that make zero LLM API calls during verification",
    supports_hypotheses: ["H2", "H3"]
})

CREATE (premise_correctness_first:FoundationalPremise {
    id: "P3",
    name: "Correctness Before Convenience",
    statement: "System design prioritizes correctness over throughput or latency",
    rationale: "In safety-critical systems, one error can be catastrophic; rejection is success when it prevents incorrect ingestion",
    implication: "Accept 30-70% rejection rates and 100ms-10s latencies",
    supports_hypotheses: ["H10", "H13"]
})

CREATE (premise_formal_limits:FoundationalPremise {
    id: "P4",
    name: "Formal Methods Have Limits",
    statement: "Not all problems are decidable or tractable",
    rationale: "Gödel's incompleteness theorems; constraint satisfaction is often NP-complete; ontology alignment plateaus at 80-90%",
    implication: "Provide partial verification with explicit limitations, not universal guarantees",
    supports_hypotheses: ["H6", "H8", "H17"]
})

CREATE (premise_gradualism:FoundationalPremise {
    id: "P5",
    name: "Gradualism Over Absolutism",
    statement: "Different applications need different rigor levels",
    rationale: "Chat applications don't need theorem provers; medical devices do need formal verification",
    implication: "Define graduated verification levels (L0-L3)",
    supports_hypotheses: ["H14", "H15"]
})

// =============================================================================
// PART 4G: FUNDAMENTAL LIMITATIONS
// =============================================================================

CREATE (limit_godel:FundamentalLimitation {
    id: "FL1",
    name: "Gödelian Incompleteness",
    category: "logical",
    issue: "Cannot achieve universal semantic completeness",
    formal_basis: "Any formal system containing arithmetic is incomplete - there exist true statements that cannot be proven",
    impact: [
        "Some valid reasoning chains will be rejected",
        "Not all correct programs can be verified",
        "Undecidable problems require timeouts"
    ],
    mitigation: [
        "Focus on decidable fragments (QF_LIA, QF_NIA)",
        "Accept incompleteness as fundamental",
        "Use timeouts gracefully"
    ],
    citation: "Gödel (1931)"
})

CREATE (limit_hallucination:FundamentalLimitation {
    id: "FL2",
    name: "Architectural Hallucination Inevitability",
    category: "architectural",
    issue: "Cannot eliminate hallucinations completely",
    formal_basis: "Xu et al. (2024) proved mathematically that LLMs cannot learn all computable functions",
    impact: [
        "20-40% base hallucination rate persists",
        "Ontological grounding reduces but doesn't eliminate",
        "Edge cases will always exist"
    ],
    mitigation: [
        "Structural reduction (60-80% improvement)",
        "Human oversight for critical decisions",
        "Multi-layer defense"
    ],
    citation: "Xu et al. (2024), 'Hallucination is Inevitable'"
})

CREATE (limit_ontology_alignment:FundamentalLimitation {
    id: "FL3",
    name: "Ontology Alignment Plateau",
    category: "knowledge engineering",
    issue: "Cannot achieve perfect automatic ontology alignment",
    formal_basis: "15 years of OAEI research shows F-measures plateau at 80-90% for well-structured domains",
    impact: [
        "Manual ontology engineering required",
        "Cross-domain reasoning has inherent limits",
        "Upper ontology cannot be universal"
    ],
    mitigation: [
        "Focus on single-domain applications",
        "Manual curation of critical alignments",
        "Accept 10-20% error rate"
    ],
    citation: "Euzenat & Shvaiko (2013), OAEI campaigns 2004-2024"
})

CREATE (limit_np_complete:FundamentalLimitation {
    id: "FL4",
    name: "Constraint Satisfaction Intractability",
    category: "computational",
    issue: "Verification is computationally intractable at scale",
    formal_basis: "CSP dichotomy theorem - most real-world cases are NP-complete",
    impact: [
        "Verification time grows exponentially with complexity",
        "Timeouts necessary for undecidable cases",
        "Cannot handle arbitrarily complex constraints"
    ],
    mitigation: [
        "Complexity budgets (100ms/1s/10s)",
        "Graduated fallback (L2 → L1 → L0)",
        "Focus on tractable fragments"
    ],
    citation: "Bulatov & Zhuk (2017), CSP Dichotomy Theorem"
})

CREATE (limit_knowledge_bottleneck:FundamentalLimitation {
    id: "FL5",
    name: "Knowledge Formalization Bottleneck",
    category: "human resources",
    issue: "Knowledge formalization rate is bounded by scarcity of dual-expertise practitioners",
    formal_basis: "Creating formal ontologies requires simultaneous domain expertise AND ontological engineering expertise",
    impact: [
        "Ontology development is slow and expensive",
        "Coverage gaps persist in all domains",
        "Automated ontology learning produces inferior results"
    ],
    mitigation: [
        "LLM-assisted ontology construction",
        "Focus on high-value domains first",
        "Accept incomplete coverage"
    ],
    citation: "ACM Computing Surveys 2024"
})

// =============================================================================
// PART 4H: HYPOTHESIS RELATIONSHIPS
// =============================================================================

// Link hypotheses to categories
MATCH (h:Hypothesis), (c:HypothesisCategory)
WHERE h.id IN c.hypotheses
CREATE (h)-[:BELONGS_TO]->(c);

// Link theoretical barriers to hypotheses they support
MATCH (barrier:TheoreticalBarrier {id: "TB1"})
MATCH (h:Hypothesis {id: "H8"})
CREATE (barrier)-[:SUPPORTS]->(h);

MATCH (barrier:TheoreticalBarrier {id: "TB2"})
MATCH (h:Hypothesis {id: "H6"})
CREATE (barrier)-[:SUPPORTS]->(h);

MATCH (barrier:TheoreticalBarrier {id: "TB4"})
MATCH (h:Hypothesis {id: "H9"})
CREATE (barrier)-[:SUPPORTS]->(h);

MATCH (barrier:TheoreticalBarrier {id: "TB6"})
MATCH (h:Hypothesis {id: "H17"})
CREATE (barrier)-[:SUPPORTS]->(h);

// Link impossibilities to hypotheses they prove
MATCH (impossible:TheoreticalImpossibility {id: "TI1"})
MATCH (h:Hypothesis {id: "H8"})
CREATE (h)-[:PROVES]->(impossible);

MATCH (impossible:TheoreticalImpossibility {id: "TI2"})
MATCH (h:Hypothesis {id: "H9"})
CREATE (h)-[:PROVES]->(impossible);

MATCH (impossible:TheoreticalImpossibility {id: "TI4"})
MATCH (h:Hypothesis {id: "H17"})
CREATE (h)-[:PROVES]->(impossible);

// Link achievable capabilities to hypotheses
MATCH (achievable:AchievableCapability {id: "AC1"})
MATCH (h:Hypothesis {id: "H12"})
CREATE (h)-[:ENABLES]->(achievable);

MATCH (achievable:AchievableCapability {id: "AC3"})
MATCH (h:Hypothesis {id: "H14"})
CREATE (h)-[:QUANTIFIES]->(achievable);

MATCH (achievable:AchievableCapability {id: "AC5"})
MATCH (h:Hypothesis {id: "H13"})
CREATE (h)-[:ENABLES]->(achievable);

// Link fundamental limitations to barriers
MATCH (limit:FundamentalLimitation {id: "FL1"})
MATCH (barrier:TheoreticalBarrier {id: "TB6"})
CREATE (limit)-[:GROUNDED_IN]->(barrier);

MATCH (limit:FundamentalLimitation {id: "FL2"})
MATCH (barrier:TheoreticalBarrier {id: "TB4"})
CREATE (limit)-[:GROUNDED_IN]->(barrier);

MATCH (limit:FundamentalLimitation {id: "FL4"})
MATCH (barrier:TheoreticalBarrier {id: "TB1"})
CREATE (limit)-[:GROUNDED_IN]->(barrier);

// =============================================================================
// PART 5: PRODUCTS & SYSTEMS
// =============================================================================

// -----------------------------------------------------------------------------
// 5.1 PROTOCOLS
// -----------------------------------------------------------------------------

CREATE (msrcp:Protocol:Product {
    name: "MSRCP",
    full_name: "Multi-Agent Symbolic Reasoning Communication Protocol",
    version: "0.1.0",
    description: "Foundation library for multi-agent symbolic reasoning with type-theoretic and categorical foundations",
    type: "Protocol",
    core_pillars: ["Type System", "Logic System", "Category Theory", "Kripke Semantics", "Reasoning Engines"],
    language: "Python/TypeScript",
    status: "Core complete, reasoning engines in progress",
    unique_value: "Formal semantics rigorous enough for safety-critical systems while expressive enough for multi-agent AI reasoning",
    differentiator: "Unlike pure theorem provers or pure ML systems, MSRCP bridges the gap with categorical foundations that scale"
})

CREATE (frrp:Protocol:Product {
    name: "FRRP",
    full_name: "Formal Request-Response Protocol",
    version: "0.2.0",
    description: "Type-safe, formally verified LLM integration for critical systems through 3rd-party verification",
    type: "Protocol",
    core_innovation: "3rd-party verification system operating independently from the LLM",
    key_insight: "System remains safe even when LLM hallucinates 30-70% of the time because independent verifier catches errors",
    verification_levels: ["L0: Fast Filtering (<100ms)", "L1: Structural Validation (<1s)", "L2: Formal Verification (<10s)", "L3: Semantic Reasoning (<60s)"],
    status: "ACM paper validation complete"
})

CREATE (fps:Protocol:Product {
    name: "FPS",
    full_name: "Fundamental Protocol System",
    version: "4.0",
    description: "A minimal type system for universal reasoning with built-in validation",
    type: "Protocol",
    core_principle: "Everything decomposes to Atoms connected by Relations",
    design_philosophy: "Minimalism with mandatory self-validation",
    key_insight: "Two primitives (Atom, Relation) suffice for universal reasoning when combined with rigorous validation",
    status: "Specification complete"
})

// -----------------------------------------------------------------------------
// 5.2 SYSTEMS
// -----------------------------------------------------------------------------

CREATE (ukc:System:Product {
    name: "Universal Knowledge Compiler",
    abbreviation: "UKC",
    description: "System that validates LLM outputs against compiled domain knowledge",
    type: "System",
    core_finding: "Partial implementations are production-ready today, but universal coverage faces fundamental expressivity-tractability barriers",
    architecture: ["Knowledge Base", "NL→Logic Parser", "Validation Engine", "Feedback Loop"],
    status: "Research prototype"
})

// -----------------------------------------------------------------------------
// 5.3 PRODUCT OPPORTUNITIES (What Can Be Built)
// -----------------------------------------------------------------------------

CREATE (prod_safety_validator:ProductOpportunity {
    name: "Cross-Standard Safety Requirement Validator",
    description: "Tool that validates requirements against multiple safety standards simultaneously",
    enables: "Automated compliance checking for ISO 26262, IEC 61508, DO-178C",
    foundation_theories: ["ICT", "DL"],
    foundation_protocols: ["MSRCP", "FRRP"],
    market: "Safety-critical systems (automotive, aerospace, medical)",
    differentiation: "First tool to provide formal cross-standard traceability",
    research_threads: ["T1", "T2", "T3"]
})

CREATE (prod_llm_guardrail:ProductOpportunity {
    name: "Ontology-Grounded LLM Guardrails",
    description: "Production system for validating LLM outputs against domain ontologies",
    enables: "Verified AI outputs for regulated industries",
    foundation_theories: ["AGM", "DEL"],
    foundation_protocols: ["FRRP", "FPS"],
    market: "Legal AI, Medical AI, Financial AI",
    differentiation: "Formal verification with explainable rejection reasons",
    research_threads: ["T4", "T5"]
})

CREATE (prod_requirement_decomposer:ProductOpportunity {
    name: "Automated Requirement Decomposer",
    description: "Tool that automatically decomposes composite requirements into atomic units",
    enables: "Systematic requirements engineering with formal traceability",
    foundation_theories: ["ICT", "FCA"],
    foundation_frameworks: ["FCA", "DL"],
    market: "Requirements engineering tools",
    differentiation: "Mathematically proven decomposition with lattice-theoretic foundations",
    research_threads: ["T1", "T3"]
})

CREATE (prod_multiagent_reasoner:ProductOpportunity {
    name: "Multi-Agent Epistemic Reasoner",
    description: "System for reasoning about knowledge and beliefs in multi-agent settings",
    enables: "Formal verification of multi-agent AI systems",
    foundation_theories: ["DEL", "AGM", "Kripke"],
    foundation_protocols: ["MSRCP"],
    market: "Multi-agent AI, Autonomous systems",
    differentiation: "Full epistemic and causal reasoning with compositional verification",
    research_threads: ["T5"]
})

CREATE (prod_integrity_mapper:ProductOpportunity {
    name: "Universal Integrity Level Mapper",
    description: "Tool for mapping integrity levels across different safety standards",
    enables: "Cross-domain safety certification reuse",
    foundation_theories: ["ICT"],
    key_capability: "Universal ordinal normalization for any integrity lattice",
    market: "Cross-industry safety certification",
    differentiation: "First mathematically rigorous cross-standard mapping",
    research_threads: ["T2", "T3"]
})

// -----------------------------------------------------------------------------
// 5.4 VALUE PROPOSITIONS
// -----------------------------------------------------------------------------

CREATE (value_prop:ValueProposition {
    achievable: "Validated-conformant ∨ Explicitly-flagged-with-reason: We will either give you a validated answer that conforms to formal domain knowledge, or we will tell you we couldn't validate it—we won't silently hallucinate.",
    not_achievable: "Mathematical correctness guarantees for all outputs",
    key_insight: "The gap between 'significantly safer AI' and 'mathematically guaranteed AI' is not merely wide—it is theoretically unbridgeable for general-purpose language models."
})

// =============================================================================
// PART 6: RESEARCH ARCHITECTURE
// =============================================================================

// -----------------------------------------------------------------------------
// 6.1 RESEARCH THREADS
// -----------------------------------------------------------------------------

CREATE (thread1:ResearchThread {
    id: "T1",
    name: "Mathematical Foundations for Requirements Decomposition",
    core_question: "How do we rigorously decompose, compare, and compose requirements across different logical frameworks?",
    status: "active",
    frameworks_involved: ["FCA", "DL", "IT", "GC", "FM", "CT"],
    capabilities_enabled: ["Decomposition", "Equivalence Detection", "Cross-Standard Comparison", "Delta Computation"],
    msrcp_connection: "Type System relates to FCA lattices; Logic System extends DL semantics"
})

CREATE (thread2:ResearchThread {
    id: "T2",
    name: "Integrity Classification Theory",
    core_question: "How do we map impact assessments to integrity levels to engineering constraints in a domain-agnostic way?",
    status: "active",
    mathematical_structure: "Impact Space (I) --Φ--> Integrity Lattice (L) --Ψ--> Constraint Space (C)",
    key_theorems: ["Composition Theorem", "Galois Connection Theorem", "Decomposition Theorem", "Universal Property Theorem"],
    implementation: "lattice-theory.ts"
})

CREATE (thread3:ResearchThread {
    id: "T3",
    name: "Safety Standards Research",
    core_question: "How do we extract, formalize, and map requirements across safety-critical domains?",
    status: "active",
    standards_covered: ["IEC 61508", "ISO 26262", "DO-178C", "EN 50126", "IEC 62304", "ISO/SAE 21434", "ISO/PAS 21448"],
    methodological_pipeline: ["Structural Preprocessing", "EARS Pattern Classification", "Atomicity Analysis", "Expert Validation", "Cross-Standard Mapping"]
})

CREATE (thread4:ResearchThread {
    id: "T4",
    name: "Neuro-Symbolic AI / Universal Knowledge Compilation",
    core_question: "How do we combine LLM capabilities with formal knowledge representations for reliable, verifiable AI?",
    status: "active",
    research_topics: ["Neurosymbolic Integration", "Ontology-Grounded RAG", "SHACL/OWL Validation", "Constrained Decoding", "Hallucination Detection"]
})

CREATE (thread5:ResearchThread {
    id: "T5",
    name: "Modal, Epistemic, and Causal Reasoning",
    core_question: "How do we formalize multi-agent knowledge, belief revision, temporal properties, and causal inference?",
    status: "active",
    operator_categories: ["Modal", "Epistemic", "Doxastic", "Causal", "Meta"],
    underlying_theories: ["Kripke Semantics", "Dynamic Epistemic Logic", "AGM Belief Revision", "Structural Causal Models"]
})

// -----------------------------------------------------------------------------
// 6.2 RESEARCH DIRECTIONS
// -----------------------------------------------------------------------------

CREATE (rd1:ResearchDirection {
    name: "Formalize ICT as Institution",
    category: "Theoretical Consolidation",
    threads_involved: ["T1", "T2"],
    description: "Express ICT within Institution Theory framework for rigorous cross-framework comparison",
    expected_outcome: "ICT institution with signatures, sentences, models, and satisfaction relation",
    priority: "high",
    status: "proposed"
})

CREATE (rd2:ResearchDirection {
    name: "Domain-Specific DL Profiles",
    category: "Theoretical Consolidation",
    threads_involved: ["T1", "T3"],
    description: "Develop Description Logic profiles optimized for each safety standard domain",
    expected_outcome: "DL-Safety_ISO26262, DL-Safety_DO178C, etc. with complexity guarantees",
    priority: "high",
    status: "proposed"
})

CREATE (rd3:ResearchDirection {
    name: "Complete DEL/SCM Reasoning Engines",
    category: "Implementation",
    threads_involved: ["T5"],
    description: "Finish MSRCP reasoning engines for Dynamic Epistemic Logic and Structural Causal Model integration",
    deliverables: ["Action model implementation", "Product update operator", "do-calculus evaluator"],
    priority: "high",
    status: "in_progress"
})

CREATE (rd4:ResearchDirection {
    name: "Benchmark MSRCP on FOLIO/LogicNLI",
    category: "Implementation",
    threads_involved: ["T4", "T5"],
    description: "Evaluate MSRCP logic system against standard NL-to-FOL benchmarks",
    datasets: ["FOLIO", "LogicNLI", "RuleTaker", "ProofWriter"],
    priority: "medium",
    status: "proposed"
})

CREATE (rd5:ResearchDirection {
    name: "ICT + Safety Standards Paper",
    category: "Publication",
    threads_involved: ["T2", "T3"],
    working_title: "Lattice-Theoretic Foundations for Cross-Standard Traceability",
    target_venues: ["SAFECOMP", "RE Conference", "IEEE TSE"],
    contribution: "First unified lattice-theoretic treatment of cross-standard integrity mapping",
    priority: "high",
    status: "proposed"
})

CREATE (rd6:ResearchDirection {
    name: "MSRCP + Constrained Decoding Paper",
    category: "Publication",
    threads_involved: ["T4", "T5"],
    working_title: "Category-Theoretic Constraints for Verified LLM Reasoning",
    target_venues: ["NeurIPS", "AAAI", "ICML"],
    contribution: "Novel application of categorical semantics to LLM output verification",
    priority: "high",
    status: "proposed"
})

CREATE (rd7:ResearchDirection {
    name: "Unified Safety Ontology Paper",
    category: "Publication",
    threads_involved: ["T1", "T3"],
    working_title: "Toward a Unified Ontology for Functional Safety Across Domains",
    target_venues: ["ISWC", "FOIS", "IEEE Access"],
    contribution: "First OWL ontology unifying IEC 61508, ISO 26262, DO-178C requirement structures",
    priority: "medium",
    status: "proposed"
})

// -----------------------------------------------------------------------------
// 6.3 INTEGRATION LAYER
// -----------------------------------------------------------------------------

CREATE (integration:IntegrationLayer {
    name: "MSRCP Integration Hub",
    description: "MSRCP serves as the integration point where mathematical foundations meet practical requirements engineering and AI safety",
    layer_stack: [
        "L5-Applications: Safety-critical systems, neuro-symbolic AI",
        "L4-Verification: Compositional proofs via functor laws",
        "L3-Logic Systems: Multi-sorted modal logic with causal & meta-operators",
        "L2-Type Theory: Dependent types with modal/epistemic extensions",
        "L1-Foundations: Category-theoretic semantics unifying FCA, DL, IT, GC"
    ],
    implementation_status: "Core complete, reasoning engines in progress"
})

// -----------------------------------------------------------------------------
// 6.4 CONTRIBUTION SUMMARY
// -----------------------------------------------------------------------------

CREATE (contrib:ContributionSummary {
    name: "Unified AI Reasoning Program",
    foundations: "Category-theoretic semantics unifying FCA, DL, IT, GC",
    type_theory: "Dependent types with modal/epistemic extensions (Π, Σ, □, K)",
    logic_systems: "Multi-sorted modal logic with causal (do) & meta (⌜⌝) operators",
    verification: "Compositional proofs via functor laws - O(1) per operation",
    applications: ["Safety-critical systems", "Neuro-symbolic AI", "Cross-standard compliance"],
    unique_value: "MSRCP provides formal semantics rigorous enough for safety-critical systems while expressive enough for multi-agent AI reasoning",
    differentiator: "Unlike pure theorem provers or pure ML systems, MSRCP bridges the gap with categorical foundations that scale"
})

// =============================================================================
// PART 7: RELATIONSHIPS
// =============================================================================

// -----------------------------------------------------------------------------
// 7.1 Framework → Concept
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

MATCH (cat:Framework {abbreviation: "CT"})
MATCH (c:Concept) WHERE c.framework = "CT"
CREATE (cat)-[:DEFINES]->(c);

// -----------------------------------------------------------------------------
// 7.2 Theory → Definitions/Theorems
// -----------------------------------------------------------------------------

MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (d:Definition) WHERE d.theory = "ICT"
CREATE (ict)-[:DEFINES]->(d);

MATCH (ict:Theory {name: "Integrity Classification Theory"})
MATCH (t:Theorem) WHERE t.theory = "ICT"
CREATE (ict)-[:PROVES]->(t);

// -----------------------------------------------------------------------------
// 7.3 Framework → Reference (Foundational)
// -----------------------------------------------------------------------------

MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (r:Reference) WHERE r.authors = "Wille, R."
CREATE (fca)-[:FOUNDED_BY]->(r);

MATCH (fca:Framework {abbreviation: "FCA"})
MATCH (r:Reference) WHERE r.authors = "Ganter, B. & Wille, R."
CREATE (fca)-[:DEFINITIVE_TREATMENT]->(r);

MATCH (dl:Framework {abbreviation: "DL"})
MATCH (r:Reference) WHERE r.title = "The Description Logic Handbook"
CREATE (dl)-[:FOUNDED_BY]->(r);

MATCH (inst:Framework {abbreviation: "IT"})
MATCH (r:Reference) WHERE r.authors = "Goguen, J. & Burstall, R."
CREATE (inst)-[:FOUNDED_BY]->(r);

MATCH (galois:Framework {abbreviation: "GC"})
MATCH (r:Reference) WHERE r.authors = "Cousot, P. & Cousot, R."
CREATE (galois)-[:APPLIED_BY]->(r);

// -----------------------------------------------------------------------------
// 7.4 Theory → Framework
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
// 7.5 Hypothesis Dependencies
// -----------------------------------------------------------------------------

MATCH (h1:Hypothesis {id: "H1"})
MATCH (h2:Hypothesis {id: "H2"})
CREATE (h2)-[:SUPPORTS]->(h1);

MATCH (h2:Hypothesis {id: "H2"})
MATCH (h3:Hypothesis {id: "H3"})
CREATE (h3)-[:DEPENDS_ON]->(h2);

MATCH (h4:Hypothesis {id: "H4"})
MATCH (h:Hypothesis)
WHERE h.id IN ["H1", "H2", "H3"]
CREATE (h4)-[:LIMITS]->(h);

MATCH (h5:Hypothesis {id: "H5"})
MATCH (h13:Hypothesis {id: "H13"})
CREATE (h5)-[:CONSTRAINS]->(h13);

MATCH (h6:Hypothesis {id: "H6"})
MATCH (h7:Hypothesis {id: "H7"})
CREATE (h6)-[:EXPLAINS]->(h7);

// -----------------------------------------------------------------------------
// 7.6 Product → Foundation
// -----------------------------------------------------------------------------

MATCH (msrcp:Protocol {name: "MSRCP"})
MATCH (ict:Theory {name: "Integrity Classification Theory"})
CREATE (msrcp)-[:IMPLEMENTS]->(ict);

MATCH (msrcp:Protocol {name: "MSRCP"})
MATCH (agm:Theory {name: "AGM Belief Revision"})
CREATE (msrcp)-[:IMPLEMENTS]->(agm);

MATCH (msrcp:Protocol {name: "MSRCP"})
MATCH (del:Theory {name: "Dynamic Epistemic Logic"})
CREATE (msrcp)-[:IMPLEMENTS]->(del);

MATCH (msrcp:Protocol {name: "MSRCP"})
MATCH (scm:Theory {name: "Structural Causal Models"})
CREATE (msrcp)-[:IMPLEMENTS]->(scm);

MATCH (msrcp:Protocol {name: "MSRCP"})
MATCH (kripke:Theory {name: "Kripke Semantics"})
CREATE (msrcp)-[:IMPLEMENTS]->(kripke);

// Protocol relationships
MATCH (frrp:Protocol {name: "FRRP"})
MATCH (msrcp:Protocol {name: "MSRCP"})
CREATE (frrp)-[:COMPLEMENTARY_TO {
    relationship: "FRRP provides verification layer; MSRCP provides reasoning foundations"
}]->(msrcp);

MATCH (fps:Protocol {name: "FPS"})
MATCH (msrcp:Protocol {name: "MSRCP"})
CREATE (fps)-[:COMPLEMENTARY_TO {
    relationship: "FPS provides minimal self-validation; MSRCP provides rich reasoning"
}]->(msrcp);

// -----------------------------------------------------------------------------
// 7.7 Research Thread Relationships
// -----------------------------------------------------------------------------

// Thread interconnections
MATCH (t1:ResearchThread {id: "T1"})
MATCH (t2:ResearchThread {id: "T2"})
CREATE (t1)-[:ENABLES {via: "FCA lattices provide formal basis for ICT integrity lattices"}]->(t2);

MATCH (t1:ResearchThread {id: "T1"})
MATCH (t3:ResearchThread {id: "T3"})
CREATE (t1)-[:ENABLES {via: "DL subsumption enables safety requirement reasoning"}]->(t3);

MATCH (t2:ResearchThread {id: "T2"})
MATCH (t3:ResearchThread {id: "T3"})
CREATE (t2)-[:MAPS_TO {via: "Universal ordinal for cross-standard integrity comparison"}]->(t3);

MATCH (t3:ResearchThread {id: "T3"})
MATCH (t4:ResearchThread {id: "T4"})
CREATE (t3)-[:IDENTIFIES_GAPS_IN {via: "NLP extraction challenges reveal UKC research gaps"}]->(t4);

MATCH (t4:ResearchThread {id: "T4"})
MATCH (t5:ResearchThread {id: "T5"})
CREATE (t4)-[:CONSTRAINED_BY {via: "Modal logic constrains LLM decoding"}]->(t5);

// All threads integrate through MSRCP
MATCH (t:ResearchThread)
MATCH (p:Protocol {name: "MSRCP"})
CREATE (t)-[:INTEGRATES_VIA]->(p);

// Thread → Framework connections
MATCH (t1:ResearchThread {id: "T1"})
MATCH (fca:Framework {abbreviation: "FCA"})
CREATE (t1)-[:USES_FRAMEWORK]->(fca);

MATCH (t1:ResearchThread {id: "T1"})
MATCH (dl:Framework {abbreviation: "DL"})
CREATE (t1)-[:USES_FRAMEWORK]->(dl);

MATCH (t1:ResearchThread {id: "T1"})
MATCH (it:Framework {abbreviation: "IT"})
CREATE (t1)-[:USES_FRAMEWORK]->(it);

MATCH (t1:ResearchThread {id: "T1"})
MATCH (ct:Framework {abbreviation: "CT"})
CREATE (t1)-[:USES_FRAMEWORK]->(ct);

// Thread → Theory connections
MATCH (t2:ResearchThread {id: "T2"})
MATCH (ict:Theory {name: "Integrity Classification Theory"})
CREATE (t2)-[:DEVELOPS]->(ict);

MATCH (t5:ResearchThread {id: "T5"})
MATCH (kripke:Theory {name: "Kripke Semantics"})
CREATE (t5)-[:DEVELOPS]->(kripke);

MATCH (t5:ResearchThread {id: "T5"})
MATCH (del:Theory {name: "Dynamic Epistemic Logic"})
CREATE (t5)-[:DEVELOPS]->(del);

MATCH (t5:ResearchThread {id: "T5"})
MATCH (agm:Theory {name: "AGM Belief Revision"})
CREATE (t5)-[:DEVELOPS]->(agm);

MATCH (t5:ResearchThread {id: "T5"})
MATCH (scm:Theory {name: "Structural Causal Models"})
CREATE (t5)-[:DEVELOPS]->(scm);

// Thread → System connections
MATCH (t4:ResearchThread {id: "T4"})
MATCH (ukc:System {name: "Universal Knowledge Compiler"})
CREATE (t4)-[:DEVELOPS]->(ukc);

// Research direction → Thread connections
MATCH (rd:ResearchDirection)
MATCH (t:ResearchThread)
WHERE t.id IN rd.threads_involved
CREATE (rd)-[:ADVANCES]->(t);

// Integration layer connections
MATCH (il:IntegrationLayer {name: "MSRCP Integration Hub"})
MATCH (p:Protocol {name: "MSRCP"})
CREATE (il)-[:REALIZED_BY]->(p);

MATCH (il:IntegrationLayer {name: "MSRCP Integration Hub"})
MATCH (t:ResearchThread)
CREATE (il)-[:UNIFIES]->(t);

// Contribution summary connection
MATCH (contrib:ContributionSummary)
MATCH (p:Protocol {name: "MSRCP"})
CREATE (contrib)-[:SUMMARIZES]->(p);

// =============================================================================
// PART 8: USEFUL QUERIES
// =============================================================================

// Query: Get all hypotheses by category
// MATCH (h:Hypothesis)
// RETURN h.category, collect({id: h.id, name: h.name, status: h.status}) AS hypotheses
// ORDER BY h.category;

// Query: Get all theories with their frameworks
// MATCH (t:Theory)-[:BUILDS_ON]->(f:Framework)
// RETURN t.name, collect(f.abbreviation) AS frameworks;

// Query: Get product opportunities with their foundations
// MATCH (p:ProductOpportunity)
// RETURN p.name, p.foundation_theories, p.foundation_protocols, p.market;

// Query: Get research threads and their connections
// MATCH (t1:ResearchThread)-[r]->(t2:ResearchThread)
// RETURN t1.name AS source, type(r) AS relationship, r.via AS mechanism, t2.name AS target;

// Query: Get research directions by priority
// MATCH (rd:ResearchDirection)
// RETURN rd.priority, rd.category, rd.name, rd.status
// ORDER BY rd.priority, rd.category;

// Query: Find all papers by topic
// MATCH (p:Paper)
// RETURN p.topic, collect(p.title) AS papers
// ORDER BY p.topic;

// Query: Get protocol comparison
// MATCH (p:Protocol)
// RETURN p.name, p.description, p.core_innovation, p.status;

// Query: Full hypothesis dependency chain
// MATCH path = (h1:Hypothesis)-[:DEPENDS_ON|SUPPORTS|LIMITS|CONSTRAINS*]->(h2:Hypothesis)
// RETURN path;

// Query: Get ICT theory with all definitions and theorems
// MATCH (ict:Theory {name: "Integrity Classification Theory"})
// OPTIONAL MATCH (ict)-[:DEFINES]->(d:Definition)
// OPTIONAL MATCH (ict)-[:PROVES]->(t:Theorem)
// RETURN ict.name, collect(DISTINCT d.name) AS definitions, collect(DISTINCT t.name) AS theorems;

// Query: Research thread → Framework → MSRCP flow
// MATCH (t:ResearchThread)
// OPTIONAL MATCH (t)-[:USES_FRAMEWORK]->(f:Framework)
// OPTIONAL MATCH (t)-[:DEVELOPS]->(theory:Theory)
// OPTIONAL MATCH (t)-[:INTEGRATES_VIA]->(p:Protocol)
// RETURN t.name AS thread, 
//        collect(DISTINCT f.abbreviation) AS frameworks,
//        collect(DISTINCT theory.name) AS theories,
//        p.name AS integration_point;

// Query: Get all products (protocols + systems + opportunities)
// MATCH (p) WHERE p:Protocol OR p:System OR p:ProductOpportunity
// RETURN labels(p)[0] AS type, p.name, p.description;

// Query: Get hypotheses with their categories
// MATCH (h:Hypothesis)-[:BELONGS_TO]->(c:HypothesisCategory)
// RETURN c.name AS category, collect({id: h.id, name: h.name}) AS hypotheses
// ORDER BY c.name;

// Query: Get theoretical barriers and what they support
// MATCH (b:TheoreticalBarrier)
// OPTIONAL MATCH (b)-[:SUPPORTS]->(h:Hypothesis)
// RETURN b.name, b.type, collect(h.id) AS supports_hypotheses;

// Query: Get impossibilities and their proofs
// MATCH (h:Hypothesis)-[:PROVES]->(i:TheoreticalImpossibility)
// RETURN h.id, h.name, i.name AS proves, i.barriers;

// Query: Get achievable capabilities
// MATCH (a:AchievableCapability)
// RETURN a.name, a.mechanism, a.performance, a.limitation;

// Query: Get foundational premises with supported hypotheses
// MATCH (p:FoundationalPremise)
// RETURN p.id, p.name, p.statement, p.supports_hypotheses;

// Query: Get fundamental limitations with mitigations
// MATCH (l:FundamentalLimitation)
// RETURN l.name, l.category, l.issue, l.mitigation;

// Query: What can vs cannot be achieved (summary view)
// MATCH (a:AchievableCapability)
// RETURN "Achievable" AS type, a.name AS capability, a.performance
// UNION ALL
// MATCH (i:TheoreticalImpossibility)
// RETURN "Impossible" AS type, i.name AS capability, i.barrier AS performance;

// Query: Full hypothesis ecosystem
// MATCH (h:Hypothesis)
// OPTIONAL MATCH (h)-[:BELONGS_TO]->(cat:HypothesisCategory)
// OPTIONAL MATCH (h)-[:PROVES]->(impossible:TheoreticalImpossibility)
// OPTIONAL MATCH (h)-[:ENABLES]->(achievable:AchievableCapability)
// OPTIONAL MATCH (barrier:TheoreticalBarrier)-[:SUPPORTS]->(h)
// RETURN h.id, h.name, h.category,
//        cat.name AS category_node,
//        collect(DISTINCT impossible.name) AS proves_impossible,
//        collect(DISTINCT achievable.name) AS enables_achievable,
//        collect(DISTINCT barrier.name) AS supported_by_barriers;

// Query: Limitation → Barrier → Hypothesis chain
// MATCH (l:FundamentalLimitation)-[:GROUNDED_IN]->(b:TheoreticalBarrier)-[:SUPPORTS]->(h:Hypothesis)
// RETURN l.name AS limitation, b.name AS barrier, h.id AS hypothesis;
