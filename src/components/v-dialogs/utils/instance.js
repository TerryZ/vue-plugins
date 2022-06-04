import Vue from 'vue'
import Container from '../Container'
import { defaultAlertOptions, alertIconClass } from '../constants'
import { argumentsParse } from './options'
import { getTitle } from './helper'

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

export function DialogModel (component, params) {
  if (!component) return
  // params = merge(params)
  params.component = component
  return getInstance().addModal(params)
}

export function DialogAlert () {
  const option = argumentsParse(arguments)
  const MAX_CONTENT_LENGTH = 70

  if ('title' in option === false || option.title !== false) {
    option.title = getTitle(option.messageType, option.language)
  }
  option.iconClassName = alertIconClass[option.messageType]
  option.width = option.message.length > MAX_CONTENT_LENGTH ? 700 : 450
  option.height = option.message.length > MAX_CONTENT_LENGTH
    ? 400
    : typeof option.title === 'string' || typeof option.title === 'undefined'
      ? 210
      : 180
}

export function DialogToast () {

}

export function DialogMask () {

}

export function DialogDrawer () {

}
