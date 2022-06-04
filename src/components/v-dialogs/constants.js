import { CN } from './language'
export const DIALOG_KEY_PREFIX = 'v-dialogs-'

export const [
  MODEL,
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
  language: CN
}

export const defaultModalOptions = {
  ...defaultOptionsCore,
  type: MODEL
}

export const defaultAlertOptions = {
  ...defaultOptionsCore,
  type: ALERT,
  messageType: messageTypes.info
}

export const defaultMaskOptions = {
}

export const defaultToastOptions = {
}

export const defaultDrawerOptions = {
}
