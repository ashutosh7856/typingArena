/**
 * Professional Typing Metrics Calculator
 * Implements industry-standard WPM calculations with smoothing
 */

/**
 * Calculate Words Per Minute (WPM)
 * Standard: 1 word = 5 characters (including spaces)
 * 
 * @param {number} correctCharacters - Number of correctly typed characters
 * @param {number} elapsedSeconds - Time elapsed in seconds
 * @param {number} minTimeSeconds - Minimum time before calculating (prevents inflated early WPM)
 * @returns {number} WPM rounded to nearest integer
 */
export const calculateWPM = (correctCharacters, elapsedSeconds, minTimeSeconds = 2) => {
    // Don't calculate WPM until minimum time has passed
    if (elapsedSeconds < minTimeSeconds) {
        return 0;
    }

    const timeInMinutes = elapsedSeconds / 60;
    const wordsTyped = correctCharacters / 5;
    const wpm = wordsTyped / timeInMinutes;

    return Math.round(wpm);
};

/**
 * Calculate Raw WPM (includes all characters typed, mistakes included)
 * 
 * @param {number} totalCharacters - Total characters typed (correct + incorrect)
 * @param {number} elapsedSeconds - Time elapsed in seconds
 * @param {number} minTimeSeconds - Minimum time before calculating
 * @returns {number} Raw WPM
 */
export const calculateRawWPM = (totalCharacters, elapsedSeconds, minTimeSeconds = 2) => {
    if (elapsedSeconds < minTimeSeconds) {
        return 0;
    }

    const timeInMinutes = elapsedSeconds / 60;
    const wordsTyped = totalCharacters / 5;
    const rawWpm = wordsTyped / timeInMinutes;

    return Math.round(rawWpm);
};

/**
 * Calculate Net WPM (Raw WPM - error penalty)
 * Standard typing test formula
 * 
 * @param {number} totalCharacters - Total characters typed
 * @param {number} mistakes - Number of incorrect characters
 * @param {number} elapsedSeconds - Time elapsed in seconds
 * @param {number} minTimeSeconds - Minimum time before calculating
 * @returns {number} Net WPM
 */
export const calculateNetWPM = (totalCharacters, mistakes, elapsedSeconds, minTimeSeconds = 2) => {
    if (elapsedSeconds < minTimeSeconds) {
        return 0;
    }

    const timeInMinutes = elapsedSeconds / 60;
    const rawWords = totalCharacters / 5;
    const errorPenalty = mistakes / 5;
    const netWords = rawWords - errorPenalty;
    const netWpm = netWords / timeInMinutes;

    // Net WPM shouldn't go negative
    return Math.max(0, Math.round(netWpm));
};

/**
 * Calculate Accuracy Percentage
 * 
 * @param {number} correctCharacters - Number of correct characters
 * @param {number} totalCharacters - Total characters typed
 * @returns {number} Accuracy as percentage (0-100)
 */
export const calculateAccuracy = (correctCharacters, totalCharacters) => {
    if (totalCharacters === 0) {
        return 100;
    }

    const accuracy = (correctCharacters / totalCharacters) * 100;
    return Math.round(accuracy);
};

/**
 * Calculate smoothed WPM using exponential moving average
 * Prevents jumpy WPM display
 * 
 * @param {number} currentWPM - Current WPM calculation
 * @param {number} previousWPM - Previous smoothed WPM
 * @param {number} alpha - Smoothing factor (0-1, higher = more responsive)
 * @returns {number} Smoothed WPM
 */
export const smoothWPM = (currentWPM, previousWPM, alpha = 0.3) => {
    if (previousWPM === 0) {
        return currentWPM;
    }

    const smoothed = alpha * currentWPM + (1 - alpha) * previousWPM;
    return Math.round(smoothed);
};

/**
 * Calculate typing consistency score (0-100)
 * Measures how stable typing speed is over time
 * 
 * @param {number[]} wpmHistory - Array of WPM values over time
 * @returns {number} Consistency score (0-100, higher is better)
 */
export const calculateConsistency = (wpmHistory) => {
    if (wpmHistory.length < 2) {
        return 100;
    }

    // Calculate standard deviation
    const mean = wpmHistory.reduce((sum, wpm) => sum + wpm, 0) / wpmHistory.length;
    const variance = wpmHistory.reduce((sum, wpm) => sum + Math.pow(wpm - mean, 2), 0) / wpmHistory.length;
    const stdDev = Math.sqrt(variance);

    // Convert to consistency score (lower std dev = higher consistency)
    // Cap at 100
    const consistency = Math.max(0, 100 - (stdDev / mean) * 100);
    return Math.round(consistency);
};

/**
 * Get all typing metrics at once
 * 
 * @param {Object} params - Typing data
 * @param {number} params.correctCharacters - Correct characters typed
 * @param {number} params.totalCharacters - Total characters typed
 * @param {number} params.mistakes - Number of mistakes
 * @param {number} params.elapsedSeconds - Time elapsed in seconds
 * @param {number} params.previousWPM - Previous WPM for smoothing
 * @returns {Object} All metrics
 */
export const getAllMetrics = ({
    correctCharacters,
    totalCharacters,
    mistakes,
    elapsedSeconds,
    previousWPM = 0,
}) => {
    const wpm = calculateWPM(correctCharacters, elapsedSeconds);
    const rawWpm = calculateRawWPM(totalCharacters, elapsedSeconds);
    const netWpm = calculateNetWPM(totalCharacters, mistakes, elapsedSeconds);
    const accuracy = calculateAccuracy(correctCharacters, totalCharacters);
    const smoothedWpm = smoothWPM(wpm, previousWPM);

    return {
        wpm: smoothedWpm,      // Use smoothed WPM for display
        rawWpm,
        netWpm,
        accuracy,
        mistakes,
    };
};
