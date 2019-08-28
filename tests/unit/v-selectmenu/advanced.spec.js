import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import nbaTeams from '@test/sample/nba-teams'
import { advancedGroup } from '@test/sample/menu/advanced'
import sm from '@/components/v-selectmenu/SelectMenu'

describe('v-selectmenu advanced mode', () => {
  describe('basic advanced menu', () => {
    const wrapper = mount(sm, {
      propsData: {
        data: nbaTeams,
        title: false,
        query: false
      }
    })
    it('"title" option set to false, the menu header bar should not exist', () => {
      expect(wrapper.find('div.sm-header').exists()).to.equal(false)
    })
    it('"query" option set to false, the search bar should not exist', () => {
      expect(wrapper.find('div.sm-search').exists()).to.equal(false)
    })
    wrapper.setProps({ value: '7' })
    it('"value/v-model" option set value "7", the chosen item should be "Boston Celtics"', () => {
      // the emitted results will sourround with [[]]
      // for example in this case, got "values" emitted result is [[[{id:1,name:'xxx',desc:'xxx'}]]]
      const picked = wrapper.emitted().values[0][0]
      expect(picked.length).to.equal(1)
      expect(picked[0].name).to.equal('Boston Celtics')
    })
    it('The selected and highlight item in results list should be one and "Boston Celtics"', () => {
      const picked = wrapper.findAll('.sm-results li.sm-selected')
      expect(picked.length).to.equal(1)
      expect(picked.at(0).find('.sm-item-text').text()).to.equal('Boston Celtics')
    })
    it('Click the selected item(Boston Celtics), the item should be canceled selected', () => {
      wrapper.find('div.sm-caller-container').trigger('click')
      wrapper.find('.sm-results li.sm-selected').trigger('click')
      expect(wrapper.find('.sm-results li.sm-selected').exists()).to.equal(false)
    })
  })
  describe('multiple selection advanced menu', () => {
    const wrapper = mount(sm, {
      propsData: {
        data: nbaTeams,
        multiple: true
      }
    })

    // it('Click the first item(Chicago Bulls), its should be selected', () => {
    //   wrapper.find('div.sm-caller-container').trigger('click')
    //   wrapper.findAll('.sm-results li').at(0).trigger('click')
    //   expect(wrapper.find('.sm-results li.sm-selected').find('.sm-item-text').text()).to.equal('Chicago Bulls')
    // })
    // it('After "Clear all" icon button click, should no one item is selected', () => {
    //   wrapper.find('div.sm-caller-container').trigger('click')
    //   wrapper.find('span.sm-removeall-button').trigger('click')
    //   expect(wrapper.vm.picked.length).to.equal(0)
    // })
  })
  describe('advanced menu with group type', () => {
    const wrapper = mount(sm, {
      propsData: {
        data: advancedGroup,
        multiple: true,
        maxSelected: 3
      }
    })
    it('The group tabs should be exist', () => {
      expect(wrapper.find('.sm-tabs').exists()).to.equal(true)
    })
    it('The number of group tabs should be 2', () => {
      expect(wrapper.findAll('.sm-tabs ul li').length).to.equal(2)
    })
  })
})
