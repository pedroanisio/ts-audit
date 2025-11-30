# System Classification Model

> **A Theoretical Framework for Unified Safety Integrity Analysis**

## 🎯 What Is This?

This is my **conceptual proposal** for a unified mathematical model that captures the common structure across industrial safety standards. It is **not** an official standard, nor a claim about what standards say—it's an intellectual framework for thinking about safety integrity levels across domains.

### The Core Insight

All major safety standards share a common mathematical structure:

- **Total ordering**: Levels are fully comparable (SIL 1 < SIL 2 < SIL 3 < SIL 4)
- **Bounded**: There's a bottom (no requirements) and top (maximum integrity)
- **Monotonic composition**: Combining systems doesn't reduce criticality

This framework formalizes these properties using **lattice theory**, providing a normalized ordinal space [0,1] for rough comparison across standards.

---

## 📐 Mathematical Foundation

### The Safety Integrity Lattice

A Safety Integrity Lattice is a structure **𝕃 = (L, ⊥, ⊤, ⊔, ⊓, ≤)** where:

| Symbol | Meaning |
|--------|---------|
| L | Carrier set of integrity levels |
| ⊥ | Bottom element (no requirements) |
| ⊤ | Top element (maximum integrity) |
| ⊔ | Join operation (least upper bound) |
| ⊓ | Meet operation (greatest lower bound) |
| ≤ | Partial order (criticality ordering) |

### Key Properties

```
AXIOM 1: Total Order
∀ a, b ∈ L: (a ≤ b) ∨ (b ≤ a)

AXIOM 2: Bounded
∀ x ∈ L: ⊥ ≤ x ≤ ⊤

AXIOM 3: Join = Max (for simple composition)
a ⊔ b = max(a, b)

AXIOM 4: Monotonic Composition
Integrity(System) = ⊔ { Integrity(Subsystem_i) }
```

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
| Cross-standard mapping | ⚠️ **Approximate only** |
| Universal risk equation | ⚠️ **Theoretical** |

---

## 💡 Usage Examples

### Basic Lattice Operations

```typescript
import { SIL_LATTICE, ASIL_LATTICE, Ordering } from './system-classification';

// Compare integrity levels
const comparison = SIL_LATTICE.compare(SIL_2, SIL_3);
// Returns: Ordering.LESS

// Compose systems (takes maximum)
const composed = SIL_LATTICE.join(SIL_2, SIL_3);
// Returns: SIL_3

// Convert to universal space for cross-standard comparison
const universal = SIL_LATTICE.toUniversal(SIL_3);
// Returns: { ordinal: 0.75, failureProbability: {...}, ... }
```

### Cross-Standard Translation (with caveats!)

```typescript
import { translateIntegrity, getMappingConfidence } from './system-classification';

// ⚠️ This logs a warning about approximate mapping
const equivalent = translateIntegrity("SIL_3", "IEC_61508", "ISO_26262");
// Returns: "ASIL_C" (approximate!)

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
} from './system-classification';

// Create a classified system
const brakeECU = createAutomotiveClassification(
  "Brake Control ECU",
  AutomotiveSafetyIntegrityLevel.ASIL_D
);

// Medical implant with full deployment lifecycle
const pacemaker = createMedicalImplantClassification("Cardiac Pacemaker");
// Includes: regulator-gated updates, multi-party consent, audit trail
```

### Composition with Redundancy

```typescript
import { composeWithContext, SIL_LATTICE } from './system-classification';

// Redundant, independent components can achieve higher system integrity
const result = composeWithContext(
  SIL_LATTICE,
  [SIL_1, SIL_1],
  {
    redundant: true,
    independent: true,
    commonCauseFreedom: 0.95,
    diverseImplementation: true,
  }
);
// May return SIL_2 with synthesis applied (per IEC 61508 rules)
```

---

## ⚠️ Critical Caveats

### What This Framework Is **NOT**

1. **Not an official standard** — No standards body endorses this
2. **Not a compliance tool** — Never use for certification claims
3. **Not probability equivalence** — Cross-standard mappings are ordinal only

### Known Limitations

| Issue | Impact |
|-------|--------|
| **ASIL A has no probability target** | Cannot map to probability bands |
| **ASIL B and C share same PMHF** | Differ only in SPFM/LFM, not probability |
| **DO-178C is process-based** | Probability targets come from AC 25.1309, not DO-178C |
| **ECSS prohibits probabilistic SW assessment** | Software criticality is severity-only |
| **Consequence scales differ** | DAL A (aircraft) ≠ ASIL D (vehicle) ≠ SIL 4 (plant) |

### The Risk Equation Warning

The "universal risk equation" in this file:

```
R = P_hazard × P_exposure × P_unavoidable × W_severity
```

Is a **theoretical construct**. Actual standards use:
- **IEC 61508**: Risk graph with discrete parameters (not multiplication)
- **ISO 26262**: Qualitative S×E×C lookup table
- **DO-178C**: Failure condition severity → AC 25.1309 probability

---

## ✅ What This Framework Is Good For

| Use Case | Suitability |
|----------|-------------|
| **Education** | Understanding common structure across safety standards |
| **Initial scoping** | Rough ballpark for "what level of rigor?" |
| **Cross-domain communication** | Helping teams from different industries understand each other |
| **Tooling foundation** | Building classification/tracking systems |
| **Research** | Exploring formal foundations for safety engineering |

## ❌ What This Framework Should **NOT** Be Used For

| Anti-Pattern | Why |
|--------------|-----|
| **Compliance decisions** | Always consult the actual standard |
| **Certification claims** | "We're SIL 3 equivalent" is not valid |
| **Legal documentation** | Standards bodies don't recognize cross-mappings |
| **Replacing domain expertise** | Each domain has unique requirements |

---

## 📚 References

### Primary Standards
- IEC 61508:2010 — Functional Safety of E/E/PE Safety-Related Systems
- ISO 26262:2018 — Road Vehicles Functional Safety
- DO-178C (RTCA, 2011) — Software Considerations in Airborne Systems
- ECSS-E-ST-40C (ESA, 2009) — Space Engineering: Software
- IEC 62304:2006/Amd.1:2015 — Medical Device Software Lifecycle

### Related Documents
- AC 25.1309-1A — System Design and Analysis (FAA)
- SAE ARP4754A — Development of Civil Aircraft and Systems
- SAE ARP4761 — Guidelines for Conducting Safety Assessment Process
- IEC TR 61508-6-1 (Expected 2025) — Cross-standard recognition guidance

### Academic Background
- Contract Theory Extensions (Westman & Nyberg, 2015)
- Contracts for System Design (Benveniste et al., 2012-2018)

---

## 🔬 Research Gap

This framework represents an attempt to formalize something that lacks rigorous mathematical foundation in published literature:

> "The practical 'take the maximum SIL' composition rule used in industry lacks rigorous mathematical foundation in published literature. No category-theoretic, pure order-theoretic, or algebraic unification across standards has been formally published."

This could be a contribution to the safety engineering community—if published with appropriate disclaimers.

---

## 📄 License

This conceptual framework is part of the ts-audit project.

---

*This is a theoretical framework representing my ideas for unifying safety concepts. Use responsibly.*

