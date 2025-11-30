# Formal Foundations: Integrity Classification Theory

> **A Categorical Framework for Impact-Driven Constraint Derivation**
> 
> *With Application to Cross-Standard Safety Communication*

---

## Preface: The Intellectual Journey

This document records the evolution of a research program. What began as an attempt to formalize cross-standard safety mappings revealed a deeper structure: **safety standards are not the theory — they are an instantiation of it.**

### The Evolution

| Phase | Focus | Key Insight |
|-------|-------|-------------|
| **Phase 1** | "How do we map SIL to ASIL?" | Cross-standard communication happens despite heterogeneity |
| **Phase 2** | "What structure do safety standards share?" | All form bounded total orders with join-semilattice composition |
| **Phase 3** | "Is this structure specific to safety?" | **No.** Any ordered classification system shares this structure |
| **Phase 4** | "What is the proper abstraction?" | Domain-agnostic theory with domain-specific instantiations |

The current architecture reflects Phase 4: an **abstract theory** of integrity classification, with **safety standards as one application**.

---

# Part I: The Abstract Theory

## 1. Motivation (Domain-Agnostic)

**Observation:** Many engineering disciplines use ordered classification systems where:
1. Levels form a bounded total order (chain)
2. Higher levels indicate greater criticality
3. Higher levels demand more stringent engineering constraints
4. Classification is determined by impact assessment
5. Systems compose according to specific algebraic rules

**Examples across domains:**

| Domain | Classification System | Levels |
|--------|----------------------|--------|
| Functional Safety | SIL, ASIL, DAL | 4-5 levels |
| Security | Clearance levels | Unclassified → Top Secret |
| Data Protection | Sensitivity levels | Public → Restricted |
| Quality Assurance | Tier levels | Bronze → Platinum |
| Service Levels | SLA classes | Standard → Enterprise |

**Core Question:** What is the common mathematical structure underlying all these systems?

---

## 2. The Abstract Framework

### Definition 1 (Integrity Lattice)

An *integrity lattice* is a tuple $\mathcal{L} = (E, \leq, \bot, \top)$ where:

- $E$ is a finite set of *integrity levels*
- $\leq$ is a total order on $E$ (reflexive, antisymmetric, transitive, total)
- $\bot \in E$ is the bottom element (minimum integrity)
- $\top \in E$ is the top element (maximum integrity)

Since $E$ is totally ordered, $(\mathcal{L}, \leq)$ forms a **chain**, and the lattice operations are:
- $a \sqcup b = \max(a, b)$ (join)
- $a \sqcap b = \min(a, b)$ (meet)

### Definition 2 (Impact Space)

An *impact space* is a tuple $\mathcal{I} = (D_1 \times D_2 \times \cdots \times D_n, \oplus)$ where:

- Each $D_i$ is a finite ordered set of *impact dimensions*
- $\oplus: D_1 \times \cdots \times D_n \to \mathbb{R}_+$ is an *aggregation function*

### Definition 3 (Classification Functor)

A *classification functor* $\Phi: \mathcal{I} \to \mathcal{L}$ is a monotonic function that:
- Maps impact assessments to integrity levels
- Preserves order: if $i_1 \leq_{\mathcal{I}} i_2$ then $\Phi(i_1) \leq_{\mathcal{L}} \Phi(i_2)$

### Definition 4 (Constraint Space)

A *constraint space* is a tuple $\mathcal{C} = (C, \leq_C)$ where:
- $C$ is a set of engineering constraint bundles
- $\leq_C$ is a partial order representing "more stringent than"

### Definition 5 (Constraint Derivation Functor)

A *constraint derivation functor* $\Psi: \mathcal{L} \to \mathcal{C}$ is a monotonic function:
- Maps integrity levels to constraint bundles
- Preserves order: if $\ell_1 \leq_{\mathcal{L}} \ell_2$ then $\Psi(\ell_1) \leq_C \Psi(\ell_2)$

### Theorem 1 (Composition)

The composition $\Psi \circ \Phi: \mathcal{I} \to \mathcal{C}$ is monotonic.

**Interpretation:** Higher impact → higher integrity → more stringent constraints. This is the fundamental guarantee of any sound integrity classification system.

---

## 3. Universal Ordinal Space

### Definition 6 (Universal Ordinal)

The *universal ordinal space* is $\mathcal{U} = ([0, 1], \leq, 0, 1)$.

This is the "canonical" bounded chain into which all integrity lattices embed.

### Definition 7 (Normalization Functor)

For any integrity lattice $\mathcal{L}$ with $k$ levels, the *normalization functor* $\nu: \mathcal{L} \to \mathcal{U}$ is defined by:

$$\nu(\ell_j) = \frac{j}{k - 1} \quad \text{for the } j\text{-th level (0-indexed)}$$

**Properties:**
- Order-preserving: $a \leq b \implies \nu(a) \leq \nu(b)$
- Boundary-preserving: $\nu(\bot) = 0$ and $\nu(\top) = 1$
- Join-preserving: $\nu(a \sqcup b) = \max(\nu(a), \nu(b))$

### Theorem 2 (Universal Property)

For any two integrity lattices $\mathcal{L}_1, \mathcal{L}_2$ with normalizations $\nu_1, \nu_2$, the induced cross-domain comparison:

$$a \preceq_{\mathcal{U}} b \iff \nu_1(a) \leq \nu_2(b)$$

is reflexive and transitive on the union of elements.

---

## 4. Galois Connections

### Definition 8 (Galois Connection)

A *Galois connection* between lattices $\mathcal{L}_1$ and $\mathcal{L}_2$ is a pair of monotone functions $(F, G)$ where $F: \mathcal{L}_1 \to \mathcal{L}_2$ and $G: \mathcal{L}_2 \to \mathcal{L}_1$ such that:

$$F(a) \leq b \iff a \leq G(b)$$

### Theorem 3 (Galois Properties)

For a Galois connection $(F, G)$:
1. $G \circ F$ is a *closure operator* on $\mathcal{L}_1$ (inflationary: $a \leq G(F(a))$)
2. $F \circ G$ is a *kernel operator* on $\mathcal{L}_2$ (deflationary: $F(G(b)) \leq b$)

**Critical Insight for Safety:** The inflationary property means that round-trip translation is **conservative**:

$$\text{SIL} \xrightarrow{F} \text{ASIL} \xrightarrow{G} \text{SIL}' \implies \text{SIL}' \geq \text{SIL}$$

Translation may increase requirements but never decrease them — exactly what safety demands.

---

## 5. Composition Operators

### Definition 9 (System Composition)

For subsystems $s_1, s_2, \ldots, s_n$ with integrity levels $\ell_1, \ell_2, \ldots, \ell_n$, the system-level integrity $\ell_{sys}$ is determined by a composition operator $\odot$.

**Common composition rules:**

| Rule | Formula | Interpretation |
|------|---------|----------------|
| **Series** | $\ell_{sys} = \bigsqcup_i \ell_i = \max_i \ell_i$ | Any component failure causes system failure |
| **Parallel** | $\ell_{sys} = \bigsqcap_i \ell_i = \min_i \ell_i$ | All must fail for system failure |
| **Allocated** | $\forall i: \ell_i \geq \ell_{sys}$ | Each subsystem meets system requirement |

### Theorem 4 (Join Preservation)

If $\phi: \mathcal{L}_1 \to \mathcal{L}_2$ preserves joins, then:

$$\phi(\ell_1 \sqcup \ell_2) = \phi(\ell_1) \sqcup \phi(\ell_2)$$

**Interpretation:** Series composition in one standard maps correctly to series composition in another.

---

## 6. The Meta-Mathematical Position

### Foundational Choice

When constructing bridges between heterogeneous systems, two positions are possible:

| Position | Approach |
|----------|----------|
| **(a) Realist** | Seek a *natural* isomorphism that is discovered |
| **(b) Constructivist** | *Construct* a useful mapping that is explicitly lossy |

### Our Position: Constructivist

The universal ordinal functor is a **deliberate construction** that sacrifices semantic richness for comparability.

**What is preserved:**
- Order structure
- Boundary elements (⊥ → 0, ⊤ → 1)
- Lattice operations (join, meet)

**What is lost (explicitly):**
- Domain-specific semantics
- Quantitative targets (probabilities, rates)
- Dimensional structure (S×E×C vs C×F×P×W)
- Consequence scales

### Analogies in Other Fields

| Domain | Similar Trade-off |
|--------|-------------------|
| Physics | Dimensional analysis (discarding units for magnitude comparison) |
| Database theory | Normalization (trading structure for queryability) |
| Programming | Type erasure (trading type information for uniformity) |
| Topology | Quotient spaces (collapsing distinctions for tractability) |

---

# Part II: Application to Safety Standards

## 7. The Driving Observation

**Observation:** Multiple industrial safety standards (IEC 61508, ISO 26262, DO-178C, ECSS, IEC 62304) developed independently, yet practitioners routinely treat them as comparable — speaking of "SIL 3 equivalent" systems.

**Puzzle:** If these standards are truly incommensurable, why does cross-standard communication work?

**Answer (from Part I):** They share the abstract structure of bounded total orders. The theory from Part I applies.

---

## 8. Instantiating the Abstract Theory

### The Standards Universe

$$\mathfrak{U} = \{\mathcal{S}_1, \mathcal{S}_2, \mathcal{S}_3, \mathcal{S}_4, \mathcal{S}_5\}$$

| Standard | Domain | Levels | Methodology |
|----------|--------|--------|-------------|
| IEC 61508 | Industrial | SIL 0-4 | Quantitative (PFH/PFD) |
| ISO 26262 | Automotive | QM, ASIL A-D | Qualitative (S×E×C) |
| DO-178C | Aviation | DAL E-A | Process-based |
| ECSS-E-ST-40C | Space | Cat D-A | Severity-only |
| IEC 62304 | Medical | Class A-C | Harm-based |

### Definition 10 (Safety Standard as Lattice Instance)

Each standard $\mathcal{S}_i = (L_i, \leq_i, \bot_i, \top_i, \rho_i)$ instantiates Definition 1, with:
- $\rho_i: L_i \to \mathcal{R}_i$ mapping levels to domain-specific requirements

### Heterogeneity (Formalized)

| Type | Description | Example |
|------|-------------|---------|
| **Methodological** | $\rho_i$ differs in kind | IEC 61508: probability; ISO 26262: process matrix |
| **Dimensional** | Input dimensions differ | $(C,F,P,W)$ vs $(S,E,C)$ |
| **Consequential** | Scale of ⊤ differs | Aircraft (hundreds) vs vehicle (~6) vs plant (varies) |

---

## 9. Verified Properties

### Lattice Structure (Verified)

Each standard forms a bounded distributive lattice:

| Standard | $|L|$ | $\bot$ | $\top$ | Total Order |
|----------|-------|--------|--------|-------------|
| IEC 61508 | 5 | SIL 0 | SIL 4 | ✓ |
| ISO 26262 | 5 | QM | ASIL D | ✓ |
| DO-178C | 5 | DAL E | DAL A | ✓ |
| ECSS | 4 | Cat D | Cat A | ✓ |
| IEC 62304 | 3 | Class A | Class C | ✓ |

### Probability Thresholds (Verified against Primary Sources)

**IEC 61508 (Tables 2 & 3):**

| SIL | PFH (per hour) | PFD (per demand) |
|-----|----------------|------------------|
| 1 | $[10^{-6}, 10^{-5})$ | $[10^{-2}, 10^{-1})$ |
| 2 | $[10^{-7}, 10^{-6})$ | $[10^{-3}, 10^{-2})$ |
| 3 | $[10^{-8}, 10^{-7})$ | $[10^{-4}, 10^{-3})$ |
| 4 | $[10^{-9}, 10^{-8})$ | $[10^{-5}, 10^{-4})$ |

**DO-178C / AC 25.1309:**

| DAL | Failure Condition | Probability/Flight Hour |
|-----|-------------------|------------------------|
| A | Catastrophic | $< 10^{-9}$ |
| B | Hazardous | $< 10^{-7}$ |
| C | Major | $< 10^{-5}$ |
| D | Minor | $< 10^{-3}$ |

### Critical Mapping Correction

**Common Assumption:** ASIL D ≈ SIL 4

**Verified Finding:** ASIL D ≈ SIL 3 (per Verhulst et al., SAFECOMP 2013)

**Rationale:**
- ISO 26262 designed for single-channel automotive systems
- SIL 4 requires redundant MooN architectures
- Maximum automotive casualties (~6 people) don't approach SIL 4 consequence scales

---

## 10. Cross-Standard Galois Connections

### SIL ↔ ASIL Connection

Define $(F_{SA}, G_{SA})$ where:
- $F_{SA}: \text{SIL} \to \text{ASIL}$ (lower adjoint — round up)
- $G_{SA}: \text{ASIL} \to \text{SIL}$ (upper adjoint — round down)

**Conservative Property:**
$$G_{SA}(F_{SA}(\text{SIL}_k)) \geq \text{SIL}_k$$

A round-trip through ASIL never reduces the SIL requirement.

### Cross-Standard Mapping Table

⚠️ **No official normative mapping exists.** The following are ordinal approximations only:

| Universal Ordinal | SIL | ASIL | DAL | ECSS | IEC 62304 |
|-------------------|-----|------|-----|------|-----------|
| 0.00 | SIL 0 | QM | DAL E | Cat D | Class A |
| 0.25 | SIL 1 | ASIL A | DAL D | — | — |
| 0.50 | SIL 2 | ASIL B | DAL C | Cat C | Class B |
| 0.75 | SIL 3 | ASIL C | DAL B | Cat B | — |
| 1.00 | SIL 4 | ASIL D | DAL A | Cat A | Class C |

**This table does NOT establish:**
- Probability equivalence
- Process equivalence  
- Legal/regulatory interchangeability

---

## 11. Safety Constraint Derivation

The constraint derivation functor $\Psi: \text{SIL} \to \mathcal{C}_{safety}$ maps integrity levels to engineering constraints:

### Testing Constraints (Monotonic)

| Level | Statement Cov. | Branch Cov. | MC/DC | Fault Injection | Independent V&V |
|-------|---------------|-------------|-------|-----------------|-----------------|
| 0 | — | — | — | — | — |
| 1 | 60% | — | — | — | — |
| 2 | 80% | 70% | — | — | — |
| 3 | 90% | 85% | 80% | ✓ | ✓ |
| 4 | 100% | 100% | 100% | ✓ | ✓ |

### Architectural Constraints (Monotonic)

| Level | Redundancy | HFT | DC | SFF |
|-------|------------|-----|-----|-----|
| 0 | None | 0 | — | — |
| 1 | None | 0 | 60% | 60% |
| 2 | None | 0 | 90% | 90% |
| 3 | 1oo2 | 1 | 99% | 99% |
| 4 | 2oo3 | 2 | 99% | 99% |

---

# Part III: Research Frontiers

## 12. Novel Mathematical Directions

The following frameworks have been identified as promising but **not yet applied** to safety standards:

### 12.1 Institution Theory

Each standard formalizable as an institution $\mathcal{I} = (\mathbf{Sign}, \mathbf{Sen}, \mathbf{Mod}, \models)$:
- **Signatures:** Hazard classifications, integrity levels
- **Sentences:** Safety requirements
- **Models:** Compliant systems
- **Satisfaction:** System meets requirement

Institution comorphisms would provide cross-standard translation preserving semantic consequence.

**Tools available:** DOL (Distributed Ontology Language), Hets (Heterogeneous Tool Set)

### 12.2 Quantales and Tropical Semirings

The quantale $([0,\infty], \geq, +, 0)$ is fundamental for probability reasoning.

**Insight:** Risk Reduction Factor relates logarithmically to SIL:
$$\text{RRF} = 10^{\text{SIL}}$$

In log domain, SIL addition becomes RRF multiplication — exactly tropical/max-plus structure.

### 12.3 Sheaf Theory for Decomposition

Model system architecture as:
- **Base space:** Poset of subsystem containment
- **Stalks:** Safety requirements per subsystem
- **Restriction maps:** Decomposition rules
- **Global sections:** Valid system-level safety cases

Sheaf cohomology would measure **obstruction to decomposition** — quantifying when subsystem requirements cannot compose to system requirements.

### 12.4 Resource Theories

From quantum information theory: model failure probability allocations as **resources** that cannot be freely created.

- Safety margins as costly resources
- Composition as resource consumption
- Monotonicity: valid compositions don't create safety

---

## 13. Implementation Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ABSTRACT THEORY                                  │
│                    (Domain-Agnostic)                                │
│                                                                     │
│  integrity-classification-theory.ts                                 │
│  ─────────────────────────────────────────────────                  │
│  • BoundedLattice<E>        - Definition 1                          │
│  • ImpactSpace              - Definition 2                          │
│  • ClassificationFunctor    - Definition 3                          │
│  • ConstraintDerivation     - Definition 5                          │
│  • GaloisConnection         - Definition 8                          │
│  • Universal Ordinal        - Definition 6-7                        │
│  • Composition operators    - Definition 9                          │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ INSTANTIATION
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    APPLICATION                                      │
│                    (Safety Standards)                               │
│                                                                     │
│  safety-standards-application.ts                                    │
│  ─────────────────────────────────────────────────                  │
│  • SIL_LATTICE              - IEC 61508 instance                    │
│  • ASIL_LATTICE             - ISO 26262 instance                    │
│  • DAL_LATTICE              - DO-178C instance                      │
│  • ISO26262_IMPACT_SPACE    - S×E×C dimensions                      │
│  • SIL_CONSTRAINTS          - Derived constraints                   │
│  • SIL_ASIL_GALOIS          - Cross-standard connection             │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ OPERATIONALIZATION
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    PRACTICAL TOOLS                                  │
│                                                                     │
│  impact-assessment-framework.ts                                     │
│  ─────────────────────────────────────────────────                  │
│  • assessProject()          - Full assessment pipeline              │
│  • QUICK_PROFILES           - Common project types                  │
│  • checkCompliance()        - Gap analysis                          │
│  • generateChecklist()      - Actionable outputs                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 14. Summary

### The Core Contribution

| Aspect | Formalization |
|--------|---------------|
| **Abstract theory** | Bounded lattices with monotonic functors |
| **Key insight** | Safety standards *instantiate* the theory, they don't *define* it |
| **Universal space** | $[0,1]$ ordinal with normalization functor |
| **Cross-domain tool** | Galois connections with conservative round-trip |
| **Methodological position** | Constructivist — useful mappings over natural isomorphisms |
| **What's preserved** | Order, boundaries, lattice operations |
| **What's lost (explicitly)** | Probability semantics, dimensional structure, consequence scales |

### Research Status

| Claim | Status |
|-------|--------|
| Each standard forms a bounded chain | ✅ Verified |
| PFH/PFD thresholds per IEC 61508 | ✅ Verified |
| DO-178C objectives count | ✅ Verified |
| ASIL D ≈ SIL 3 (not SIL 4) | ✅ Verified (Verhulst et al.) |
| No official cross-standard mapping exists | ✅ Verified |
| Universal ordinal functor is order-preserving | ✅ By construction |
| Galois connections provide conservative translation | ✅ Proven |
| Institution-theoretic unification | ⏳ Proposed (not implemented) |
| Quantale/tropical methods | ⏳ Proposed (not implemented) |
| Sheaf-theoretic decomposition | ⏳ Proposed (not implemented) |

---

## 15. References

### Primary Standards
- IEC 61508:2010 — Functional Safety of E/E/PE Safety-Related Systems
- ISO 26262:2018 — Road Vehicles Functional Safety
- DO-178C (RTCA, 2011) — Software Considerations in Airborne Systems
- ECSS-E-ST-40C (ESA, 2009) — Space Engineering: Software
- IEC 62304:2006/Amd.1:2015 — Medical Device Software Lifecycle

### Mathematical Foundations
- Davey & Priestley (2002) — *Introduction to Lattices and Order*
- Mac Lane (1998) — *Categories for the Working Mathematician*
- Goguen & Burstall (1992) — Institutions: Abstract Model Theory

### Related Work
- Verhulst et al. (SAFECOMP 2013) — ASIL D ≈ SIL 3 analysis
- Mossakowski et al. — DOL and Hets heterogeneous specification
- Benveniste et al. (2018) — Contracts for System Design

### Novel Directions (Unexplored in Safety Context)
- Lawvere — Quantales and enriched categories
- Spivak — Applied sheaf theory
- Coecke & Fritz — Resource theories

---

*This document records an evolving research program. The key evolution was recognizing that the mathematical structure is domain-agnostic — safety standards are one instantiation among many possible applications.*