import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import nbaTeams from '@test/sample/nba-teams'
import { advancedGroup } from '@test/sample/menu/advanced'
import sm from '@/components/v-selectmenu/SelectMenu'

describe('v-selectmenu advanced mode', () => {
  describe('basic advanced menu', () => {
    const w = mount(sm, {
      propsData: {
        data: nbaTeams,
        title: false,
        query: false
      }
    })
    it('"title" option set to false, the menu header bar should not exist', () => {
      expect(w.find('div.sm-header').exists()).to.equal(false)
    })
    it('"query" option set to false, the search bar should not exist', () => {
      expect(w.find('div.sm-search').exists()).to.equal(false)
    })
    w.setProps({ value: '7' })
    it('"value/v-model" option set value "7", the chosen item should be "Boston Celtics"', () => {
      // the emitted results will sourround with [[]]
      // for example in this case, got "values" emitted result is [[[{id:1,name:'xxx',desc:'xxx'}]]]
      const picked = w.emitted().values[0][0]
      expect(picked.length).to.equal(1)
      expect(picked[0].name).to.equal('Boston Celtics')
    })
    it('The selected and highlight item in results list should be one and "Boston Celtics"', () => {
      const picked = w.findAll('.sm-results li.sm-selected')
      expect(picked.length).to.equal(1)
      expect(picked.at(0).find('.sm-item-text').text()).to.equal('Boston Celtics')
    })
    it('Click the selected item(Boston Celtics), the item should be canceled selected', () => {
      w.find('div.sm-caller-container').trigger('click')
      w.find('.sm-results li.sm-selected').trigger('click')
      expect(w.find('.sm-results li.sm-selected').exists()).to.equal(false)
    })
  })
  describe('multiple selection advanced menu', () => {
    const w = mount(sm, {
      propsData: {
        data: nbaTeams,
        multiple: true,
        showField: function (row) {
          return `${row.name}(${row.desc})`
        }
      }
    })
    it('"showField" option set to a function, then text of the first item text in the list should be "Chicago Bulls(芝加哥公牛)"', () => {
      expect(w.find('.sm-results li').find('.sm-item-text').text()).to.equal('Chicago Bulls(芝加哥公牛)')
    })
    it('Click the first item, its should be selected', () => {
      w.find('div.sm-caller-container').trigger('click')
      w.findAll('.sm-results li').at(0).trigger('click')
      expect(w.find('.sm-results li.sm-selected').find('.sm-item-text').text()).to.equal('Chicago Bulls(芝加哥公牛)')
    })
    it('After "Clear all" icon button click, should no item is selected', () => {
      w.find('div.sm-caller-container').trigger('click')
      w.find('span.sm-removeall-button').trigger('click')
      expect(w.vm.picked.length).to.equal(0)
    })
    it('Click "Select all" icon button, all of items should be selected ', () => {
      w.find('div.sm-caller-container').trigger('click')
      w.find('span.sm-selectall-button').trigger('click')
      expect(w.vm.picked.length).to.equal(30)
    })
    it('enter query keyword "sa", the result list should only have 2 items("Sacramento Kings(萨克拉门托国王)" and "San Antonio Spurs(圣安东尼奥马刺)")', () => {
      w.setProps({ disabled: false, pagination: true })
      w.find('.sm-search input').setValue('sa')
      /**
       * simulate keyboard enter, because in the real case "processKey" method will trigger by keyup event
       */
      w.vm.processKey()
      const items = w.findAll('ul.sm-results li')
      expect(items.length).to.equal(2)
      expect(items.at(0).find('.sm-item-text').text()).to.equal('Sacramento Kings(萨克拉门托国王)')
      expect(items.at(1).find('.sm-item-text').text()).to.equal('San Antonio Spurs(圣安东尼奥马刺)')
    })
  })
  describe('advanced menu with group type', () => {
    const w = mount(sm, {
      propsData: {
        data: advancedGroup,
        multiple: true,
        maxSelected: 3
      }
    })
    it('The group tabs should be exist', () => {
      expect(w.find('.sm-tabs').exists()).to.equal(true)
    })
    it('The number of group tabs should be 2', () => {
      expect(w.findAll('.sm-tabs ul li').length).to.equal(2)
    })
  })
})
