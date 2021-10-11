export = replaceAll
/**
 * Modifies provided text with specified transformations.
 *
 * @param text base text
 * @param transformations descriptions of changes to the text
 */
declare function replaceAll(
  text: string,
  transformations: { offset: number; length: number; change: string }[],
): string
