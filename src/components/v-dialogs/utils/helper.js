import languages from '../language'
import { messageTypes, toastConstants } from '../constants'

const { warning, error, success, confirm } = messageTypes

/**
 * Get message type text in i18n resources
 *
 * @export
 * @param {string} type - message type
 * @param {string} language
 * @returns
 */
export function getTitle (type, language) {
  if (!type || !language) return ''
  const lang = languages[language]
  switch (type) {
    case warning: return lang.titleWarning
    case error: return lang.titleError
    case success: return lang.titleSuccess
    case confirm: return lang.titleConfirm
    default: return lang.titleInfo
  }
}
/**
 * Get toast theme class name
 *
 * @param {string} type - message type
 * @returns {string} class name
 */
export function toastTheme (type) {
  const { contentClass } = toastConstants
  switch (type) {
    case warning: return contentClass.warning
    case error: return contentClass.error
    case success: return contentClass.success
    default: return ''
  }
}

/**
 * Text truncation
 * @param {string} text - source string
 * @param {number} keepLength - save string length
 * @returns {string} truncated string
 */
export function textTruncate (text, keepLength) {
  if (typeof text !== 'string') return ''
  if (text.length <= keepLength) return text
  return text.substring(0, keepLength) + '...'
}
