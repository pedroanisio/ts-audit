# System Classification Model

> **A Categorical Framework for Cross-Standard Safety Communication**

## 🎯 What Is This?

This is my **conceptual proposal** for a unified mathematical model that enables cross-standard communication about safety integrity levels. It is **not** an official standard, nor a claim about equivalence—it's a **constructed representation** that deliberately trades domain-specific detail for ordinal comparability.

### The Core Insight

We construct a **common representation** (the universal ordinal space) not by claiming the standards are equivalent, but by defining **explicit functors** from each standard's integrity lattice to a shared codomain. These functors preserve order structure but are explicitly **lossy** — they quotient away domain-specific dimensions (controllability, exposure, architectural requirements) in favor of ordinal comparability.

This is exactly the approach of **Goguen's institution theory**: formalizing the informal to enable "working in-the-large" while respecting that logical systems differ.

---

## 📐 Mathematical Foundation

### The Safety Integrity Lattice

Within each standard, integrity levels form a **bounded total order (chain)**:

**𝕃 = (L, ⊥, ⊤, ⊔, ⊓, ≤)** where:

| Symbol | Meaning |
|--------|---------|
| L | Carrier set of integrity levels |
| ⊥ | Bottom element (no requirements) |
| ⊤ | Top element (maximum integrity) |
| ⊔ | Join operation (least upper bound = max) |
| ⊓ | Meet operation (greatest lower bound = min) |
| ≤ | Total order (criticality ordering) |

### What's Preserved by the Functor

```
✅ Ordinal ordering (higher = more stringent)
✅ Lattice operations (join = max, meet = min)
✅ Probability bounds (where they exist)
```

### What's Quotient'd Away (Lost)

```
❌ ISO 26262: S×E×C decomposition (why a level was assigned)
❌ IEC 61508: Demand mode distinction (low-demand vs continuous)
❌ DO-178C: Objective counts and independence requirements
❌ ECSS: Compensating provisions context
❌ All: Domain-specific consequence scales
```

### The Key Distinction

| Claim Type | This Framework Says |
|------------|---------------------|
| **Discovered Property** | ❌ NOT this — we don't claim standards are equivalent |
| **Constructed Functor** | ✅ YES — we define mappings that enable comparison |

---

## 🏗️ Standards Covered

| Standard | Domain | Methodology | Levels |
|----------|--------|-------------|--------|
| **IEC 61508** | Industrial | Quantitative (PFH/PFD) | SIL 0-4 |
| **ISO 26262** | Automotive | Qualitative (S×E×C matrix) | QM, ASIL A-D |
| **DO-178C** | Aviation | Process-based | DAL E-A |
| **ECSS-E-ST-40C** | Space | Severity-based | Category D-A |
| **IEC 62304** | Medical | Harm severity-based | Class A-C |

### Verification Status

| Claim | Status |
|-------|--------|
| IEC 61508 PFH/PFD thresholds | ✅ Verified per Tables 2 & 3 |
| ISO 26262 PMHF targets | ✅ Verified per Part 5, Table 6 |
| DO-178C objectives | ✅ Verified (71/69/62/26/0 for A/B/C/D/E) |
| Lattice total order property | ✅ Verified (each standard forms a chain) |
| Cross-standard mapping | ⚠️ **Constructed functor (ordinal only)** |
| Universal risk equation | ⚠️ **Pedagogical abstraction** |

### Scholarly Notes

| Issue | Source |
|-------|--------|
| ASIL D ≈ SIL 3 in practice | Verhulst et al., SAFECOMP 2013 |
| ECSS advises against probabilistic SW assessment | ECSS-Q-HB-80-03A (guidance handbook) |
| No official cross-standard mapping exists | ISO 26262 states "no normative mapping to SIL" |

---

## 💡 Usage Examples

### Basic Lattice Operations

```typescript
import { SIL_LATTICE, ASIL_LATTICE, Ordering } from './shared';

// Compare integrity levels (within a standard - fully supported)
const comparison = SIL_LATTICE.compare(SIL_2, SIL_3);
// Returns: Ordering.LESS

// Compose systems (takes maximum)
const composed = SIL_LATTICE.join(SIL_2, SIL_3);
// Returns: SIL_3

// Convert to universal space for cross-standard communication
// ⚠️ This is a lossy projection (functor application)
const universal = SIL_LATTICE.toUniversal(SIL_3);
// Returns: { ordinal: 0.75, failureProbability: {...}, ... }
```

### Cross-Standard Translation (with strong caveats!)

```typescript
import { translateIntegrity, getMappingConfidence } from './shared';

// ⚠️ WARNING: This is ordinal correspondence, NOT equivalence
// The function logs a warning about approximate mapping
const approximate = translateIntegrity("SIL_3", "IEC_61508", "ISO_26262");
// Returns: "ASIL_C" (ordinal position match, not probability equivalence!)

// Check confidence of a specific mapping
const confidence = getMappingConfidence("SIL_3", "IEC_61508", "DAL_B", "DO_178C");
// Returns: { confidence: "medium", verified: true }
```

### System Classification

```typescript
import { 
  createAutomotiveClassification,
  createMedicalImplantClassification,
  AutomotiveSafetyIntegrityLevel 
} from './shared';

// Create a classified system
const brakeECU = createAutomotiveClassification(
  "Brake Control ECU",
  AutomotiveSafetyIntegrityLevel.ASIL_D
);

// Medical implant with full deployment lifecycle
const pacemaker = createMedicalImplantClassification("Cardiac Pacemaker");
// Includes: regulator-gated updates, multi-party consent, audit trail
```

---

## ⚠️ Critical Caveats

### The Quotient Semantics

Two hazards with the **same ASIL** may have arrived via different S×E×C paths with genuinely **incomparable risk profiles**:

| Hazard | S×E×C | ASIL | Universal Ordinal |
|--------|-------|------|-------------------|
| A | S3, E2, C2 | C | 0.75 |
| B | S2, E4, C2 | C | 0.75 |

Hazard A is high-severity/low-exposure; Hazard B is lower-severity/high-exposure. When we map both to ordinal 0.75, this **dimensional information is lost**. This is a **deliberate design choice** enabling cross-standard communication, not a claim about inherent equivalence.

### Methodological Incompatibility

| Standard | Methodology | Implication |
|----------|-------------|-------------|
| IEC 61508 | Quantitative (PFH/PFD) | Probability is primary metric |
| ISO 26262 | Qualitative (S×E×C matrix) | ASIL A has NO probability target |
| DO-178C | Process-based | Probability comes from AC 25.1309, not DO-178C |
| ECSS | Severity-based | Advises against probabilistic SW assessment |
| IEC 62304 | Harm severity-based | No probability thresholds |

### Consequence Scales Differ

| Level | Domain | Typical Consequence |
|-------|--------|---------------------|
| DAL A | Aviation | Catastrophic aircraft loss (~hundreds dead) |
| ASIL D | Automotive | Loaded passenger vehicle (~6 people max) |
| SIL 4 | Industrial | Plant with defined exposure zones |

### The Risk Equation is Pedagogical

The "universal risk equation" in this file:

```
R = P_hazard × P_exposure × P_unavoidable × W_severity
```

Is a **pedagogical abstraction**. Actual standards use:
- **IEC 61508**: Risk graph with discrete parameters (not multiplication)
- **ISO 26262**: Qualitative S×E×C lookup table
- **DO-178C**: Failure condition severity → AC 25.1309 probability

---

## ✅ What This Framework Is Good For

| Use Case | Suitability |
|----------|-------------|
| **Education** | Understanding common structure across safety standards |
| **Cross-domain communication** | "ASIL D is roughly the same position as DAL A" (not same risk!) |
| **Initial scoping** | Rough ballpark for "what level of rigor?" |
| **Tooling foundation** | Building classification/tracking systems |
| **Research** | Exploring formal foundations for safety engineering |

## ❌ What This Framework Should **NOT** Be Used For

| Anti-Pattern | Why |
|--------------|-----|
| **Compliance decisions** | Always consult the actual standard |
| **Certification claims** | "We're SIL 3 equivalent" is not legally valid |
| **Legal documentation** | Standards bodies don't recognize cross-mappings |
| **Replacing domain expertise** | Each domain has unique requirements |
| **Probability substitution** | ASIL C ≠ SIL 2 in failure probability |

---

## 📚 References

### Primary Standards
- IEC 61508:2010 — Functional Safety of E/E/PE Safety-Related Systems
- ISO 26262:2018 — Road Vehicles Functional Safety
- DO-178C (RTCA, 2011) — Software Considerations in Airborne Systems
- ECSS-E-ST-40C (ESA, 2009) — Space Engineering: Software
- ECSS-Q-HB-80-03A — Software Product Assurance Handbook
- IEC 62304:2006/Amd.1:2015 — Medical Device Software Lifecycle

### Related Documents
- AC 25.1309-1A — System Design and Analysis (FAA)
- SAE ARP4754A — Development of Civil Aircraft and Systems
- SAE ARP4761 — Guidelines for Conducting Safety Assessment Process
- IEC TR 61508-6-1 (Expected 2025) — Cross-standard recognition guidance

### Academic Background
- Goguen & Burstall (1992) — Institutions: Abstract Model Theory
- Contract Theory Extensions (Westman & Nyberg, 2015)
- Contracts for System Design (Benveniste et al., 2012-2018)
- Verhulst et al. (SAFECOMP 2013) — ASIL D ≈ SIL 3 analysis

---

## 🔬 Research Program

### The Driving Observation

Multiple industrial safety standards developed independently, yet practitioners routinely speak of "SIL 3 equivalent" systems and map ASIL to DAL. If these standards are truly incommensurable, why does cross-standard communication work at all?

### Formal Hypothesis

**Hypothesis (Cross-Standard Ordinal Coherence):**

Let $\mathfrak{U} = \{\mathcal{S}_1, \ldots, \mathcal{S}_n\}$ be a universe of safety standards, each forming a bounded chain.

1. **Claim (Structural):** Each standard is a *bounded distributive lattice* under join = max, meet = min
2. **Claim (Universal):** There exists a universal receiving lattice $\mathcal{U} = ([0,1], \leq)$ and lattice homomorphisms $\{\phi_i\}$
3. **Claim (Pragmatic):** The induced equivalence aligns with practitioner intuitions about "equivalent rigor"

### Thesis

Although safety standards are methodologically heterogeneous, they share a common algebraic structure — a bounded total order with join-semilattice composition. This structure is sufficient to define a meaningful universal ordinal space, even though probability semantics are NOT preserved.

### Methodological Position

**Constructivist:** The universal ordinal is a *deliberate construction* that sacrifices semantic richness for comparability. This is analogous to dimensional analysis in physics or type erasure in programming.

### Research Gap Addressed

> "No published work applies lattice theory, category theory, or algebraic structures to unify safety integrity levels across industrial standards."

**Prior Art:**
- Goguen's institution theory — logical system interoperability (not safety-specific)
- Contract-based design (Westman & Nyberg) — component contracts, not cross-standard mapping

**This Framework:**
1. Each standard forms a bounded total order (lattice) — **verified**
2. Construct functors to a universal ordinal space — **proposed**
3. Acknowledge lossiness explicitly — **key contribution**

📖 **See [THEORY.md](./THEORY.md) for full mathematical formalization.**

---

## 📄 License

This conceptual framework is part of the ts-audit project.

---

*A Categorical Framework for Cross-Standard Safety Communication*

*This is a theoretical framework representing my ideas for enabling cross-domain discussion of safety concepts while respecting their fundamental differences. The universal ordinal is a constructed abstraction, not a discovered equivalence. Use responsibly.*
