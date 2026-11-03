/**
 * Ties the last two words of a string together with a non-breaking space, so a line
 * never ends with a single stranded word. CSS `text-wrap: pretty` handles most cases;
 * this covers the ones it cannot, where the final word is long enough to fill a line
 * on its own.
 */
export function noWidow(text: string): string {
  return text.replace(/\s+(\S+)\s*$/, " $1");
}

/** Applies noWidow to every string in an array. */
export const noWidows = (items: readonly string[]): string[] => items.map(noWidow);
