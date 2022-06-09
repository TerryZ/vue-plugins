import { CN } from './language'
export const DIALOG_KEY_PREFIX = 'v-dialogs-'

export const ALERT_WIDTH = 450
export const ALERT_WIDTH_LARGE = 700
export const ALERT_HEIGHT = 210
export const ALERT_HEIGHT_NO_HEADER = 180
export const ALERT_HEIGHT_LARGE = 400
export const ALERT_MAX_CONTENT_LENGTH = 70

export const MASK_MAX_CONTENT_LENGTH = 65

export const TOAST_MAX_CONTENT_LENGTH = 56

export const [
  MODAL,
  ALERT,
  TOAST,
  DRAWER,
  MASK
] = ['modal', 'alert', 'toast', 'drawer', 'mask']

export const types = {
  MODAL: 'modal',
  ALERT: 'alert',
  MASK: 'mask',
  TOAST: 'toast'
}

export const messageTypes = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  confirm: 'confirm'
}

export const toastConstants = {
  contentClass: {
    info: '',
    warning: 'toast-warning',
    success: 'toast-success',
    error: 'toast-error'
  },
  iconClass: {
    info: 'dlg-icon-toast--info',
    warning: 'dlg-icon-toast--warn',
    success: 'dlg-icon-toast--success',
    error: 'dlg-icon-toast--error'
  }
}

export const alertIconClass = {
  info: 'alertInfo',
  warning: 'alertWarning',
  success: 'alertSuccess',
  error: 'alertError',
  confirm: 'alertConfirm'
}

export const commonConstants = {
  baseZIndex: 5100
}

const defaultOptionsCore = {
  language: CN,
  customClass: undefined,
  singletonKey: undefined
}

export const defaultModalOptions = {
  ...defaultOptionsCore,
  type: MODAL
}

export const defaultAlertOptions = {
  ...defaultOptionsCore,
  messageType: messageTypes.info,
  icon: true,
  shaking: true,
  closeTime: false,
  cancelCallback: false
}

export const defaultMaskOptions = {
  ...defaultOptionsCore,
  shaking: true,
  closeTime: false
}

export const defaultToastOptions = {
  ...defaultOptionsCore,
  messageType: messageTypes.info,
  icon: true,
  closeButton: true,
  closeTime: false,
  position: 'bottomRight'
}

export const defaultDrawerOptions = {
}
