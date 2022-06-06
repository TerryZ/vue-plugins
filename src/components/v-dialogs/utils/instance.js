import Vue from 'vue'
import Container from '../Container'
import { ALERT, defaultAlertOptions, alertIconClass } from '../constants'
import { argumentsParse } from './options'
import { getTitle, getAlertSize } from './helper'

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

export function DialogModal (component, params) {
  if (!component) return
  // params = merge(params)
  params.component = component
  return getInstance().addModal(params)
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

export function DialogToast () {

}

export function DialogMask () {

}

export function DialogDrawer () {

}
