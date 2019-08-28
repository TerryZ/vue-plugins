import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { regularBase, regularWithHeader, regularMultipleLevel, regularGroup } from '@test/sample/menu/regular'
import sm from '@/components/v-selectmenu/SelectMenu'

const REGULAR = 'regular'

describe('v-selectmenu regular mode', () => {
  describe('The basic regular menu', () => {
    const wrapper = mount(sm, {
      propsData: {
        data: regularBase,
        type: REGULAR
      }
    })
    it('The number of menu items should be 9', () => {
      expect(wrapper.findAll('ul.sm-regular li').length).to.equal(9)
    })
    it('The number of menu divider should be 2', () => {
      expect(wrapper.findAll('ul.sm-regular .sm-divider').length).to.equal(2)
    })
    it('The number of menu disabled item should be 2', () => {
      expect(wrapper.findAll('ul.sm-regular .sm-disabled').length).to.equal(2)
    })
    it('The text in header bar of menu should be "SelectMenu"', () => {
      expect(wrapper.find('.sm-header h3').text()).to.equal('SelectMenu')
    })
    it('Click the callback menu item(last one), its should executed the function and created a DIV dom and its class name should be "v-selectmenu-callback"', () => {
      wrapper.findAll('ul.sm-regular li').at(8).find('a').trigger('click')
      // console.log(document.querySelector('.v-selectmenu-callback'))
      // console.log(wrapper.findAll('ul.sm-regular li').at(8).text())
      expect(typeof document.querySelector('.v-selectmenu-callback') !== 'undefined').to.equal(true)
    })
    it('Change regular menu data source, the number of header menu item should be 3', () => {
      const wrapperHeader = mount(sm, {
        propsData: {
          data: regularWithHeader,
          type: REGULAR
        }
      })
      expect(wrapperHeader.findAll('ul.sm-regular .sm-caption').length).to.equal(3)
    })
  })

  describe('The multiple level regular menu', () => {
    const wrapperMulti = mount(sm, {
      propsData: {
        data: regularMultipleLevel,
        type: REGULAR
      }
    })
  })

  describe('The regular menu with group type', () => {
    const wrapperGroup = mount(sm, {
      propsData: {
        data: regularGroup,
        type: REGULAR,
        activeGroup: 2,
        title: false
      }
    })
    it('The group tabs should be exist', () => {
      expect(wrapperGroup.find('.sm-tabs').exists()).to.equal(true)
    })
    it('The number of group tabs should be 4', () => {
      expect(wrapperGroup.findAll('.sm-tabs ul li').length).to.equal(4)
    })
    it('"activeGroup" option set to 2(index), the third group tab should be activated', () => {
      wrapperGroup.find('div.sm-caller-container').trigger('click')
      expect(wrapperGroup.findAll('.sm-tabs ul li').at(2).classes('active')).to.equal(true)
    })
    it('Switch to the fourth group tab, the number of menu item should be 2 and items content should be "Facebook" and "Twitter"', () => {
      wrapperGroup.findAll('.sm-tabs ul li').at(3).find('a').trigger('click')
      expect(wrapperGroup.findAll('ul.sm-regular li').length).to.equal(2)
      expect(wrapperGroup.findAll('ul.sm-regular li').at(0).text()).to.equal('Facebook')
      expect(wrapperGroup.findAll('ul.sm-regular li').at(1).text()).to.equal('Twitter')
    })
    it('"title" option set to false, the menu header bar should not exist', () => {
      expect(wrapperGroup.find('div.sm-header').exists()).to.equal(false)
    })
  })
})
