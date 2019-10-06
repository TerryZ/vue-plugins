import { mount } from '@vue/test-utils'
import { expect } from 'chai'

import Region from '@/components/v-region/Region'

describe('v-region Text 纯文本模式', () => {
  const w = mount(Region, {
    propsData: {
      type: 'text',
      value: {
        province: '350000',
        city: '350100',
        area: '350103',
        town: '350103012'
      }
    }
  })
  it('使用数据初始化插件后，输出的文本内容应为："福建省福州市台江区"', () => {
    window.setTimeout(() => {
      expect(w.find('.v-region').text()).to.equal('福建省福州市台江区')
    }, 1000)
  })
  it('"town" prop 设置为 true，输出的纯文本内容应为："福建省福州市台江区宁化街道"', () => {
    w.setProps({
      town: true
    })
    window.setTimeout(() => {
      expect(w.find('.v-region').text()).to.equal('福建省福州市台江区宁化街道')
    }, 1000)
  })
})
