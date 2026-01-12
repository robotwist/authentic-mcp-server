/**
 * HEURISTICS - Deterministic Logic (The "Intern")
 * Pure regex/pattern matching for fast, local analysis without LLM calls.
 */
/**
 * BIAS_INDICATORS
 * Keyword patterns for detecting bias in text
 * Extracted from legacy analyzeBiasBasic (lines 182-186)
 */
export declare const BIAS_INDICATORS: {
    political: string[];
    emotional: string[];
    loaded: string[];
};
/**
 * FALLACY_PATTERNS
 * Regex patterns for detecting logical fallacies
 * Extracted from legacy detectFallaciesBasic (lines 262-268)
 */
export declare const FALLACY_PATTERNS: {
    ad_hominem: RegExp;
    straw_man: RegExp;
    false_dilemma: RegExp;
    appeal_to_emotion: RegExp;
    hasty_generalization: RegExp;
};
export interface FallacyDetection {
    type: string;
    confidence: number;
    description: string;
    quote?: string;
}
export interface BiasAnalysis {
    scores: Record<string, number>;
    overall: 'high' | 'medium' | 'low';
    rating: string;
    indicators: Array<[string, number]>;
}
/**
 * detectFallaciesHeuristic
 * Detect logical fallacies using regex patterns
 * Extracted from legacy detectFallaciesBasic
 */
export declare function detectFallaciesHeuristic(text: string): FallacyDetection[];
/**
 * analyzeBiasHeuristic
 * Analyze bias using keyword counting
 * Extracted from legacy analyzeBiasBasic
 */
export declare function analyzeBiasHeuristic(text: string): BiasAnalysis;
//# sourceMappingURL=heuristics.d.ts.map