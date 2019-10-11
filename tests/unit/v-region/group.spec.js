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
  it('应有 4 个行政级别选项卡', () => {
    expect(w.findAll('.rg-level-tabs li').length).to.equal(4)
  })
  it('当前行政级别应为 “省”', () => {
    expect(w.findAll('.rg-level-tabs li').at(0).classes('active')).to.equal(true)
  })
  it('当前应有 34 个省级项目', () => {
    expect(w.findAll('.rg-results li').length).to.equal(34)
  })
})
