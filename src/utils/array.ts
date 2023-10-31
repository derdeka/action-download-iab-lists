/**
 * Create an array of numbers from 1 to `length`.
 *
 * @param length - The length of the array.
 * @returns An array of numbers.
 */
export const createNumberArray = (length: number): number[] => Array.from({ length }, (_, i) => i + 1);
