import { types } from '../constants'

const { MODAL, ALERT, MASK, TOAST } = types

/**
 * merge user option and type default option
 * @param {object} option - dialog option
 * @param {number} index - dialog index
 * @param {function} close - the function of close dialog
 * @returns {object} - merged dialog object
 */
export function generateDialogOption (option, index, close) {
  const { type } = option
  const options = {
    key: option.dialogKey,
    props: {
      type,
      dialogIndex: index,
      dialogKey: option.dialogKey,
      width: option.width,
      height: option.height,
      closeTime: option.closeTime,
      backdrop: option.backdrop,
      backdropClose: option.backdropClose,
      shaking: option.shaking,
      titleBar: option.title
    },
    on: {
      close
    }
  }
  if (option.customClass) options.class = option.customClass
  if (option.singletonKey) options.props.singletonKey = option.singletonKey
  if (type !== MODAL) {
    options.props.message = option.message
    options.props.icon = option.icon
  }
  if (type !== MASK) {
    options.props.cancelCallback = option.cancelCallback
  }
  switch (type) {
    case MODAL:
      options.props = {
        ...options.props,
        component: option.component,
        params: option.params,
        fullWidth: option.fullWidth,
        closeButton: option.closeButton,
        maxButton: option.maxButton
      }
      break
    case MASK:
      options.props.backdrop = true
      break
    case ALERT:
      options.props.i18n = option.i18n
    // eslint-disable-next-line no-fallthrough
    case TOAST:
      options.props.iconClassName = option.iconClassName
      options.props.messageType = option.messageType
      if (type === TOAST) {
        options.props.position = option.position
        options.props.contentClass = option.contentClass
      }
      break
  }
  return options
}
