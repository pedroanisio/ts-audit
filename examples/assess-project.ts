#!/usr/bin/env npx tsx
/**
 * Example: Self-Assess a Software Project
 *
 * Run with: npx tsx examples/assess-project.ts
 */

import {
	assessImpact,
	generateAssessmentReport,
	QUICK_ASSESSMENTS,
	HarmPotential,
	ExposureFrequency,
	Controllability,
	OperationalContext,
} from "../src/shared/assessment";

console.log("╔═══════════════════════════════════════════════════════════════════════════════╗");
console.log("║              SOFTWARE PROJECT SELF-ASSESSMENT FRAMEWORK                        ║");
console.log("╚═══════════════════════════════════════════════════════════════════════════════╝");
console.log();

// =============================================================================
// Example 1: Quick Assessment Templates
// =============================================================================

console.log("━━━ EXAMPLE 1: Quick Assessment for Common Project Types ━━━");
console.log();

const internalTool = QUICK_ASSESSMENTS.internalTool();
console.log(`📋 Internal Business Tool:`);
console.log(`   Recommended: ${internalTool.recommendations.integrityLevel}`);
console.log(`   Testing: ${internalTool.recommendations.testing.requiredTestTypes.slice(0, 3).join(", ")}`);
console.log();

const webApp = QUICK_ASSESSMENTS.publicWebApp();
console.log(`🌐 Public Web Application:`);
console.log(`   Recommended: ${webApp.recommendations.integrityLevel}`);
console.log(`   Testing: ${webApp.recommendations.testing.requiredTestTypes.join(", ")}`);
console.log();

const iotDevice = QUICK_ASSESSMENTS.iotActuator();
console.log(`🔌 IoT Actuator Device:`);
console.log(`   Recommended: ${iotDevice.recommendations.integrityLevel}`);
console.log(`   Architecture: ${iotDevice.recommendations.architecture.pattern}`);
console.log();

const medicalDevice = QUICK_ASSESSMENTS.medicalMonitor();
console.log(`🏥 Medical Monitoring Device:`);
console.log(`   Recommended: ${medicalDevice.recommendations.integrityLevel}`);
console.log(`   Domain: ${medicalDevice.domainSpecificLevel?.standard} → ${medicalDevice.domainSpecificLevel?.level}`);
console.log(`   Testing Independence: ${medicalDevice.recommendations.testing.independenceLevel}`);
console.log();

const automotive = QUICK_ASSESSMENTS.automotiveADAS();
console.log(`🚗 Automotive ADAS System:`);
console.log(`   Recommended: ${automotive.recommendations.integrityLevel}`);
console.log(`   Domain: ${automotive.domainSpecificLevel?.standard} → ${automotive.domainSpecificLevel?.level}`);
console.log(`   Architecture HFT: ${automotive.recommendations.architecture.hardwareFaultTolerance}`);
console.log();

// =============================================================================
// Example 2: Custom Assessment
// =============================================================================

console.log("━━━ EXAMPLE 2: Custom Assessment ━━━");
console.log();

// Scenario: Home automation system that controls door locks
const homeAutomation = assessImpact({
	harmPotential: HarmPotential.PROPERTY_DAMAGE, // Could leave home unsecured
	exposureFrequency: ExposureFrequency.FREQUENT, // People use locks daily
	controllability: Controllability.MOSTLY_CONTROLLABLE, // Users can use physical key
	operationalContext: OperationalContext.PERSONAL_USE,
	domain: "general",
});

console.log("🏠 Smart Home Door Lock Controller:");
console.log(`   Harm Potential: ${homeAutomation.input.harmPotential}`);
console.log(`   Recommended: ${homeAutomation.recommendations.integrityLevel}`);
console.log(`   Risk Reduction Factor: ${homeAutomation.riskReductionFactor.toFixed(0)}×`);
console.log();
console.log("   Architecture Recommendations:");
console.log(`   • Pattern: ${homeAutomation.recommendations.architecture.pattern}`);
console.log(`   • Techniques: ${homeAutomation.recommendations.architecture.techniques.join(", ")}`);
console.log();
console.log("   Testing Requirements:");
console.log(`   • Types: ${homeAutomation.recommendations.testing.requiredTestTypes.join(", ")}`);
if (homeAutomation.recommendations.testing.coverageTargets.statement) {
	console.log(`   • Statement Coverage: ≥${homeAutomation.recommendations.testing.coverageTargets.statement}%`);
}
console.log();

// =============================================================================
// Example 3: Full Report
// =============================================================================

console.log("━━━ EXAMPLE 3: Full Assessment Report ━━━");
console.log();

// Scenario: Industrial robot controller
const robotController = assessImpact({
	harmPotential: HarmPotential.SERIOUS_INJURY, // Robot can injure workers
	exposureFrequency: ExposureFrequency.COMMON, // Workers near robot regularly
	controllability: Controllability.SOMETIMES_CONTROLLABLE, // E-stop available
	operationalContext: OperationalContext.CRITICAL_INFRASTRUCTURE,
	domain: "industrial",
});

console.log(generateAssessmentReport(robotController));

// =============================================================================
// Example 4: Comparison Table
// =============================================================================

console.log();
console.log("━━━ SUMMARY COMPARISON ━━━");
console.log();
console.log("┌────────────────────────────┬──────────────┬─────────────────────────────────────────┐");
console.log("│ Project Type               │ SIL Level    │ Key Constraints                         │");
console.log("├────────────────────────────┼──────────────┼─────────────────────────────────────────┤");
console.log(`│ Internal Tool              │ ${internalTool.requiredSIL.padEnd(12)} │ Standard practices                      │`);
console.log(`│ Public Web App             │ ${webApp.requiredSIL.padEnd(12)} │ Error handling, input validation        │`);
console.log(`│ IoT Actuator               │ ${iotDevice.requiredSIL.padEnd(12)} │ Defensive programming, self-diagnostics │`);
console.log(`│ Medical Monitor            │ ${medicalDevice.requiredSIL.padEnd(12)} │ Independent V&V, formal reviews         │`);
console.log(`│ Automotive ADAS            │ ${automotive.requiredSIL.padEnd(12)} │ Redundant architecture, formal methods  │`);
console.log(`│ Industrial Robot           │ ${robotController.requiredSIL.padEnd(12)} │ Fail-safe design, coverage testing      │`);
console.log("└────────────────────────────┴──────────────┴─────────────────────────────────────────┘");
console.log();

// =============================================================================
// Your Turn: Assess Your Project
// =============================================================================

console.log("━━━ ASSESS YOUR OWN PROJECT ━━━");
console.log();
console.log("To assess your project, answer these questions:");
console.log();
console.log("1. HARM POTENTIAL - What's the worst outcome if your software fails?");
console.log("   Options: none, minor_inconvenience, financial_loss, property_damage,");
console.log("            minor_injury, serious_injury, permanent_disability,");
console.log("            single_fatality, multiple_fatalities, catastrophic");
console.log();
console.log("2. EXPOSURE - How often are users exposed to the potential hazard?");
console.log("   Options: rare (<1%), occasional (1-10%), common (10-50%),");
console.log("            frequent (>50%), continuous (always)");
console.log();
console.log("3. CONTROLLABILITY - Can users prevent harm if software fails?");
console.log("   Options: fully_controllable, mostly_controllable,");
console.log("            sometimes_controllable, rarely_controllable, uncontrollable");
console.log();
console.log("4. CONTEXT - What's the operational context?");
console.log("   Options: personal_use, small_team, enterprise, public_facing,");
console.log("            critical_infrastructure, life_sustaining");
console.log();
console.log("Example code:");
console.log(`
import { assessImpact, HarmPotential, ExposureFrequency, 
         Controllability, OperationalContext } from './assessment';

const result = assessImpact({
  harmPotential: HarmPotential.MINOR_INJURY,
  exposureFrequency: ExposureFrequency.COMMON,
  controllability: Controllability.MOSTLY_CONTROLLABLE,
  operationalContext: OperationalContext.ENTERPRISE,
  domain: 'industrial', // optional
});

console.log(result.recommendations);
`);

