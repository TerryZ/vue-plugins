import { mount } from '@vue/test-utils'
import { expect } from 'chai'

import Group from '@/components/v-region/components/Group'

describe('v-region Group 多级别分组模式', function () {
  const w = mount(Group, {
    propsData: {
      town: true
    }
  })

  it('默认情况下，标题显示文本应为 “行政区划选择器”', () => {
    w.find('.rg-caller-container').trigger('click')
    expect(w.find('.rg-header').text()).to.equal('行政区划选择器')
  })
})
