import Vue from 'vue'
import Container from '../Container'
import {
  MODAL,
  ALERT,
  MASK,
  TOAST,
  defaultModalOptions,
  defaultAlertOptions,
  defaultMaskOptions,
  defaultToastOptions,
  alertIconClass,
  toastConstants
} from '../constants'
import { argumentsParse } from './options'
import { getTitle, getAlertSize, toastTheme } from './helper'
import { getLanguage } from '../language'

/**
 * Get v-dialogs container instance, if not exist, create a new one
 * @returns {object} the v-dialogs container instance
 */
export function getInstance () {
  const container = document.querySelector('.v-dialogs-container')
  if (container && container.__vue__) {
    return container.__vue__
  }

  const DialogContainer = Vue.extend(Container)
  const div = document.body.appendChild(document.createElement('div'))
  return new DialogContainer().$mount(div)
}

/**
 * Open a Modal dialog
 * @param {VNode} component - vue component
 * @param {object} params - modal parameters
 * @returns {string} new dialog key
 */
export function DialogModal (component, params) {
  if (!component) return
  const option = { ...defaultModalOptions, ...params }
  option.type = MODAL
  option.component = component
  return getInstance().addDialog(option)
}

/**
 * Open a message alert dialog, types including
 *
 * - info(default)
 * - warning
 * - error
 * - success
 * - confirm
 *
 * @param {string} message - message content
 * @param {function} [callback] - callback function
 * @param {object} [option] - options
 * @returns {string} new dialog key
 */
export function DialogAlert () {
  const option = Object.assign({}, defaultAlertOptions, argumentsParse(arguments))
  option.type = ALERT
  const { messageType, icon } = option

  if ('title' in option === false) {
    option.title = getTitle(messageType, option.language)
  }
  if (icon) {
    option.iconClassName = alertIconClass[messageType]
  }
  const { width, height } = getAlertSize(option)
  option.width = width
  option.height = height
  return getInstance().addDialog(option)
}

/**
 * Open a Toast dialog (corner dialog)
 *
 * @see DialogAlert
 *
 * position option accept items:
 *
 * - 'topLeft'
 * - 'topCenter'
 * - 'topRight'
 * - 'bottomLeft'
 * - 'bottomCenter'
 * - 'bottomRight'
 */
export function DialogToast () {
  const option = Object.assign({}, defaultToastOptions, argumentsParse(arguments))
  const { messageType, icon } = option
  option.type = TOAST
  option.width = 300
  option.height = 80
  if (icon) {
    option.iconClassName = toastConstants.iconClass[messageType]
  }
  option.title = getTitle(messageType, option.language)
  option.contentClass = toastTheme(messageType)

  return getInstance().addDialog(option)
}

/**
 * Open a full screen mask
 *
 * @see DialogAlert
 */
export function DialogMask () {
  const option = Object.assign({}, defaultMaskOptions, argumentsParse(arguments))

  option.type = MASK
  const i18n = getLanguage(option.language)
  option.message = option.message || i18n.maskText
  option.width = 300
  option.height = 80
  option.backdrop = true

  return getInstance().addDialog(option)
}

export function DialogDrawer () {

}

export const DialogHelper = {
  close (key) {
    getInstance().close(key)
  },
  closeAll (callback) {
    getInstance().closeAll(callback)
  }
}

export const instanceApi = {
  modal () {
    return DialogModal(...arguments)
  },
  alert () {
    return DialogAlert(...arguments)
  },
  mask () {
    return DialogMask(...arguments)
  },
  toast () {
    return DialogToast(...arguments)
  },
  close (key) {
    DialogHelper.close(key)
  },
  closeAll (callback) {
    DialogHelper.closeAll(callback)
  }
}
