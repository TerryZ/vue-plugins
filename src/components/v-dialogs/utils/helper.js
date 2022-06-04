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
 * @export
 * @param {string} type
 * @returns
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
 * @param str [string] src string
 * @param n   [number] save string length
 * @returns string
 */
export function textTruncate (str, n) {
  if (typeof str !== 'string') return ''
  if (str.length <= n) return str
  return str.substring(0, n) + '...'
}
