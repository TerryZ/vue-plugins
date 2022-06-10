import languages from '../language'
import {
  messageTypes,
  toastConstants,
  ALERT_HEIGHT,
  ALERT_HEIGHT_LARGE,
  ALERT_HEIGHT_NO_HEADER,
  ALERT_WIDTH,
  ALERT_WIDTH_LARGE,
  ALERT_MAX_CONTENT_LENGTH
} from '../constants'

const { warning, error, success, confirm } = messageTypes

/**
 * Get message type text in i18n resources
 *
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
 * Get Alert dialog size
 * @param {object} option - dialog options
 * @returns {object} dialog size
 */
export function getAlertSize (option) {
  const { message, title } = option
  const isLargeText = message.length > ALERT_MAX_CONTENT_LENGTH

  if (isLargeText) {
    return { width: ALERT_WIDTH_LARGE, height: ALERT_HEIGHT_LARGE }
  }

  const isHaveHeader = typeof title === 'string' || typeof title === 'undefined'
  const height = isHaveHeader ? ALERT_HEIGHT : ALERT_HEIGHT_NO_HEADER
  return { width: ALERT_WIDTH, height }
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
    case warning:
    case error:
    case success:
      return contentClass[type]
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

/**
 * Calculate the top of the dialog
 * @param {number} height - dialog height
 */
export function calculateDialogTop (height) {
  const browserHeight = window.innerHeight || document.documentElement.clientHeight
  return (browserHeight - height) / 2
}

export function isDocumentBodyOverflowing () {
  return document.body.scrollHeight > window.innerHeight
}
