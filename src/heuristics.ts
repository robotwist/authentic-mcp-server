/**
 * HEURISTICS - Deterministic Logic (The "Intern")
 * Pure regex/pattern matching for fast, local analysis without LLM calls.
 */

/**
 * BIAS_INDICATORS
 * Keyword patterns for detecting bias in text
 * Extracted from legacy analyzeBiasBasic (lines 182-186)
 */
export const BIAS_INDICATORS = {
  political: ['democrat', 'republican', 'liberal', 'conservative', 'left-wing', 'right-wing'],
  emotional: ['amazing', 'terrible', 'shocking', 'outrageous', 'incredible', 'horrific'],
  loaded: ['obviously', 'clearly', 'undoubtedly', 'certainly', 'definitely', 'everyone knows']
};

/**
 * FALLACY_PATTERNS
 * Regex patterns for detecting logical fallacies
 * Extracted from legacy detectFallaciesBasic (lines 262-268)
 */
export const FALLACY_PATTERNS = {
  ad_hominem: /\b(you are|they are|he is|she is)\s+(stupid|idiot|moron|dumb|incompetent)\b/i,
  straw_man: /\b(they claim|people say|some believe)\s+that\s+.{10,}but\s+(that's|this is)\s+(not true|wrong|false)/i,
  false_dilemma: /\b(either|you must)\s+.{5,}\s+or\s+.{5,}(no other|only two)/i,
  appeal_to_emotion: /\b(think of|imagine|consider)\s+(the children|your family|innocent|victims)/i,
  hasty_generalization: /\b(all|every|always|never)\s+.{3,}\s+(are|is|will|do)\b/i
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
export function detectFallaciesHeuristic(text: string): FallacyDetection[] {
  if (!text) return [];
  
  const detected: FallacyDetection[] = [];
  
  Object.entries(FALLACY_PATTERNS).forEach(([type, pattern]) => {
    const match = text.match(pattern);
    if (match) {
      detected.push({
        type: type.replace('_', ' '),
        confidence: 0.5,
        description: `Potential ${type.replace('_', ' ')} detected by heuristic analysis`,
        quote: match[0]
      });
    }
  });

  return detected;
}

/**
 * analyzeBiasHeuristic
 * Analyze bias using keyword counting
 * Extracted from legacy analyzeBiasBasic
 */
export function analyzeBiasHeuristic(text: string): BiasAnalysis {
  const scores: { political: number; emotional: number; loaded: number } = {
    political: 0,
    emotional: 0,
    loaded: 0,
  };
  const textLower = (text || '').toLowerCase();

  Object.entries(BIAS_INDICATORS).forEach(([type, indicators]) => {
    if (type === 'political' || type === 'emotional' || type === 'loaded') {
      scores[type] = indicators.reduce((count, indicator) => {
        return count + (textLower.split(indicator).length - 1);
      }, 0);
    }
  });

  const totalScore = scores.political + scores.emotional + scores.loaded;
  
  return {
    scores,
    overall: totalScore > 5 ? 'high' : totalScore > 2 ? 'medium' : 'low',
    rating: 'center', // Default to center without AI analysis
    indicators: Object.entries(scores).filter(([_, count]) => count > 0) as Array<[string, number]>
  };
}
