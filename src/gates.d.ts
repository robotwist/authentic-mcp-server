/**
 * GATE MIDDLEWARE - Eco-Epistemic Circuit Breakers
 * These gates run BEFORE any heavy AI analysis to save compute and block unverifiable content.
 */
export type PowerMode = "eco" | "performance";
export interface GateResult {
    passed: boolean;
    reason?: string;
    metadata?: Record<string, unknown>;
}
/**
 * runPowerGate
 * Simple power gate that checks text length against mode limits
 */
export declare function runPowerGate(text: string, mode: "eco" | "performance"): {
    allowed: boolean;
    reason?: string;
};
/**
 * runTruthGate
 * Simple truth gate that blocks short subjective content
 */
export declare function runTruthGate(text: string): {
    allowed: boolean;
    reason?: string;
};
/**
 * POWER GATE (Circuit Breaker)
 * Checks input length against a strict budget. Blocks oversized inputs in "eco" mode.
 */
export declare function powerGate(text: string, mode?: PowerMode): GateResult;
/**
 * TRUTH GATE (Boolean Filter)
 * Heuristic check for "Unfalsifiable Content" - pure opinion, gibberish, or dangerous content.
 * Returns false if the text appears to be subjective/garbage and should not be analyzed.
 */
export declare function truthGate(text: string): GateResult;
/**
 * MINUTE STOP (Hard Timeout Wrapper)
 * Wraps an async function with a 60-second hard timeout.
 * If the function takes longer, returns a fallback error to save battery.
 */
export declare function withMinuteStop<T>(fn: () => Promise<T>, timeoutMs?: number): Promise<T>;
/**
 * Run all gates in sequence
 * Returns the first gate that fails, or success if all pass
 */
export declare function runGates(text: string, mode?: PowerMode): {
    passed: boolean;
    gate?: string;
    result: GateResult;
};
//# sourceMappingURL=gates.d.ts.map