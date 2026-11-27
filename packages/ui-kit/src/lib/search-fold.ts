const ASCII_ONLY = /^[\x00-\x7f]*$/;
// Accents only. The supplement block is taken up to U+1DCF: after it come combining letters
// (U+1DE0 is a small "n" written above), which are part of the word, not an accent on it.
const ACCENTS = /[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dcf\ufe20-\ufe2f]/g;

/**
 * The form in which the search fields compare text: `Command`, `DataTable`, `MultiSelectFilter` and
 * `SearchableSelect` fold the query and the text they search with it, so the four cannot drift.
 *
 * Case and accents are dropped, so "sao" finds "São Paulo". The lower-casing is locale-independent on
 * purpose: toLocaleLowerCase() follows the browser language, and in Turkish and Azerbaijani it turns
 * "I" into a dotless "ı", so the label "OpenAI" never matched the query "openai". Dotted and dotless
 * i both fold to a plain "i" here, and the two lower-case Greek sigmas to one.
 */
export function foldSearchText(text: string) {
  const lower = text.toLowerCase();
  // ASCII has no accent and no dotless i to fold. DataTable folds every searchable cell of every row
  // on each keystroke, and most of them are ASCII.
  if (ASCII_ONLY.test(lower)) return lower;
  // Composed again after the accents are gone: decomposed, the Hangul syllable "가" would be a prefix
  // of "각". The final sigma that toLowerCase() writes at the end of a word folds to the plain one, so
  // "ΟΣ" still finds "ΟΣΑ".
  // Only the combining diacritical marks, which carry the accents of Latin, Greek and Cyrillic: the
  // main block, the extended and half-mark blocks, and the accents of the supplement block. Every mark (\p{M}) would also take
  // the vowel signs of Devanagari, Arabic or Thai, which tell one word from another.
  return lower.normalize("NFD").replace(ACCENTS, "").normalize("NFC").replace(/ı/g, "i").replace(/ς/g, "σ");
}
