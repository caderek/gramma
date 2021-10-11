export = checkViaAPI
/**
 * Calls the provided LanguageTool API
 * and returns grammar checker suggestions.
 *
 * @param text text to check
 * @param options request config
 *
 * @returns grammar checker suggestions
 */
declare function checkViaAPI(
  text: any,
  options?: {
    api_url?: string
    api_key?: string
    language?: string
    rules?: { [ruleName: string]: boolean }
    dictionary?: string[]
    markdown?: boolean
  },
): Promise<{
  language: {
    name: string
    code: string
    [key: string]: any
  }
  matches: {
    message: string
    shortMessage: string
    replacements: { value: string; [key: string]: any }[]
    offset: number
    length: number
    context: { text: string; offset: number; length: number }
    sentence: string
    type: { typeName: string }
    rule: {
      id: string
      description: string
      issueType: string
      category: { id: string; name: string }
      isPremium: false
    }
    word: string
    [key: string]: any
  }[]
  [key: string]: any
}>
