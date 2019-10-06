import { mount } from '@vue/test-utils'
import { expect } from 'chai'

import Region from '@/components/v-region/Region'

describe('v-region Select 表单元素下拉列表模式', function () {
  const w = mount(Region, {
    propsData: {
      type: 'select'
    }
  })
  this.timeout(1000)

  it('不指定任何参数，默认可处理行政级别数量为 3 （省、市、区）', () => {
    expect(w.findAll('.rg-select').length).to.equal(3)
  })

  it('"town" prop 设置为 true，可处理行政级别数量为 4 （省、市、区、乡）', () => {
    w.setProps({ town: true })
    expect(w.findAll('.rg-select').length).to.equal(4)
  })

  it('"area" prop 设置为 false，可处理行政级别数量应为 2 （省、市）', () => {
    w.setProps({ area: false })
    expect(w.findAll('.rg-select').length).to.equal(2)
  })

  it('省级列表中选中 “河北省”，选择元素的显示文本应为 “河北省”', async () => {
    const cl = mount(Region, {
      propsData: {
        type: 'select'
      }
    })
    cl.findAll('.rg-select').at(0).trigger('click')
    cl.findAll('.rg-select__list').at(0).findAll('li').at(3).trigger('click')
    expect(cl.findAll('.rg-select__content').at(0).text()).to.equal('河北省')
    // window.setTimeout(() => {
    console.log(cl.emitted())
    expect(cl.emitted('input').province).to.equal('130000')
    expect(cl.emitted('values').province.key).to.equal('130000')
    // }, 1000)
  })

  it('"blank" prop 设置为 false，下拉列表中则没有 “请选择” 项目', () => {
    const wb = mount(Region, {
      propsData: {
        type: 'select',
        blank: false
      }
    })
    expect(wb.findAll('.rg-select__list').at(0).findAll('li').at(0).text()).to.not.equal('请选择')
  })

  it('"disabled" prop 设置为 true，禁用插件，所有下拉项目必须为禁用状态', () => {
    const wd = mount(Region, {
      propsData: {
        type: 'select',
        town: true,
        disabled: true
      }
    })
    expect(wd.findAll('.rg-select_el--disabled').length).to.equal(4)
  })
})
