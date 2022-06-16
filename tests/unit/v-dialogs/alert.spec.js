import { mount } from '@vue/test-utils'
import { expect } from 'chai'

import Container from '@/components/v-dialogs/Container'
import { DialogAlert } from '@/components/v-dialogs'

describe('v-dialogs Alert 模式', () => {
  const w = mount(Container, {
    attachTo: document.body
  })

  it('DialogAlert() 无指定任何参数，应弹出默认形态窗口，信息内容为空', async () => {
    DialogAlert()
    await w.vm.$nextTick()
    expect(w.find('v-dialog-alert').exists()).to.equal(true)
  })
})
