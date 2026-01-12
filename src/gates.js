/**
 * GATE MIDDLEWARE - Eco-Epistemic Circuit Breakers
 * These gates run BEFORE any heavy AI analysis to save compute and block unverifiable content.
 */
/**
 * runPowerGate
 * Simple power gate that checks text length against mode limits
 */
export function runPowerGate(text, mode) {
    if (mode === "eco" && text.length > 2000) {
        return {
            allowed: false,
            reason: `Power Gate: Text length ${text.length} exceeds 2000 char limit (eco mode)`,
        };
    }
    return { allowed: true };
}
/**
 * runTruthGate
 * Simple truth gate that blocks short subjective content
 */
export function runTruthGate(text) {
    const textLower = text.toLowerCase();
    const subjectiveWords = ["feel", "believe", "opinion"];
    if (text.length < 50) {
        const hasSubjectiveWord = subjectiveWords.some((word) => textLower.includes(word));
        if (hasSubjectiveWord) {
            return {
                allowed: false,
                reason: "Truth Gate: Text is too short and contains subjective language",
            };
        }
    }
    return { allowed: true };
}
/**
 * POWER GATE (Circuit Breaker)
 * Checks input length against a strict budget. Blocks oversized inputs in "eco" mode.
 */
export function powerGate(text, mode = "eco") {
    const ECO_MODE_LIMIT = 2000;
    const PERFORMANCE_MODE_LIMIT = 10000;
    const limit = mode === "eco" ? ECO_MODE_LIMIT : PERFORMANCE_MODE_LIMIT;
    const length = text.length;
    if (length > limit) {
        return {
            passed: false,
            reason: `Power Gate Limit Exceeded: ${length} chars exceeds ${limit} char limit (${mode} mode)`,
            metadata: {
                input_length: length,
                limit,
                mode,
            },
        };
    }
    return {
        passed: true,
        metadata: {
            input_length: length,
            limit,
            mode,
        },
    };
}
/**
 * TRUTH GATE (Boolean Filter)
 * Heuristic check for "Unfalsifiable Content" - pure opinion, gibberish, or dangerous content.
 * Returns false if the text appears to be subjective/garbage and should not be analyzed.
 */
export function truthGate(text) {
    const normalized = text.toLowerCase().trim();
    // Check for empty or whitespace-only content
    if (normalized.length === 0 || /^\s+$/.test(text)) {
        return {
            passed: false,
            reason: "Truth Gate: Empty or whitespace-only content",
        };
    }
    // Check for pure gibberish (high ratio of non-alphanumeric characters)
    const alphanumericRatio = (text.match(/[a-z0-9]/gi) || []).length / text.length;
    if (alphanumericRatio < 0.3 && text.length > 50) {
        return {
            passed: false,
            reason: "Truth Gate: Content appears to be gibberish (low alphanumeric ratio)",
            metadata: {
                alphanumeric_ratio: alphanumericRatio,
            },
        };
    }
    // Check for excessive repetition (likely spam or error)
    const words = normalized.split(/\s+/).filter((w) => w.length > 3);
    if (words.length > 10) {
        const uniqueWords = new Set(words);
        const repetitionRatio = uniqueWords.size / words.length;
        if (repetitionRatio < 0.2) {
            return {
                passed: false,
                reason: "Truth Gate: Content appears to be repetitive spam",
                metadata: {
                    repetition_ratio: repetitionRatio,
                },
            };
        }
    }
    // Check for dangerous patterns (basic heuristic - can be expanded)
    const dangerousPatterns = [
        /\b(password|secret|api[_-]?key)\s*[:=]\s*\w+/gi,
        /\b(eval|exec|system|shell)\s*\(/gi,
    ];
    for (const pattern of dangerousPatterns) {
        if (pattern.test(text)) {
            return {
                passed: false,
                reason: "Truth Gate: Content contains potentially dangerous patterns",
                metadata: {
                    matched_pattern: pattern.source,
                },
            };
        }
    }
    // Check for pure opinion markers (high density of opinion words)
    // This is a simple heuristic - can be refined
    const opinionMarkers = [
        /\b(i think|i feel|i believe|in my opinion|i'm sure|probably|maybe|perhaps)\b/gi,
    ];
    const opinionCount = opinionMarkers.reduce((count, pattern) => count + (text.match(pattern) || []).length, 0);
    const wordCount = normalized.split(/\s+/).filter((w) => w.length > 0).length;
    const opinionDensity = wordCount > 0 ? opinionCount / wordCount : 0;
    // If more than 30% of the content is opinion markers, it's likely pure opinion
    if (opinionDensity > 0.3 && wordCount > 10) {
        return {
            passed: false,
            reason: "Truth Gate: Content appears to be pure opinion (high opinion marker density)",
            metadata: {
                opinion_density: opinionDensity,
                word_count: wordCount,
            },
        };
    }
    return {
        passed: true,
        metadata: {
            word_count: wordCount,
            opinion_density: opinionDensity,
        },
    };
}
/**
 * MINUTE STOP (Hard Timeout Wrapper)
 * Wraps an async function with a 60-second hard timeout.
 * If the function takes longer, returns a fallback error to save battery.
 */
export async function withMinuteStop(fn, timeoutMs = 60000) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Minute Stop: Operation timed out after ${timeoutMs}ms`));
        }, timeoutMs);
    });
    return Promise.race([fn(), timeoutPromise]);
}
/**
 * Run all gates in sequence
 * Returns the first gate that fails, or success if all pass
 */
export function runGates(text, mode = "eco") {
    // Power Gate first (fastest check)
    const powerResult = powerGate(text, mode);
    if (!powerResult.passed) {
        return { passed: false, gate: "power", result: powerResult };
    }
    // Truth Gate second (heuristic check)
    const truthResult = truthGate(text);
    if (!truthResult.passed) {
        return { passed: false, gate: "truth", result: truthResult };
    }
    // All gates passed
    return { passed: true, result: { passed: true } };
}
//# sourceMappingURL=gates.js.map