import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import list from '@test/sample/nba-teams'
import sm from '@/components/v-selectmenu/SelectMenu'

describe('v-selectmenu basic options', () => {
  const wrapper = mount(sm, {
    propsData: {
      data: list,
      disabled: true,
      placeholder: 'This is test placeholder text',
      title: 'v-selectmenu test title'
    }
  })
  it('"disabled" option set to true, the dropdown container is not allowed to be opened ', () => {
    wrapper.find('div.sm-caller-container').trigger('click')
    expect(wrapper.find('div.v-dropdown-container').isVisible()).to.equal(false)
  })
  it('"align" option set to "left", the dropdown container should be aligned to the left', () => {
    wrapper.setProps({ disabled: false, align: 'left' })
    expect(wrapper.vm.align).to.equal('left')
  })
  it('"align" option set to "center", the dropdown container should be aligned to the center', () => {
    wrapper.setProps({ disabled: false, align: 'center' })
    expect(wrapper.vm.align).to.equal('center')
  })
  it('"align" option set to "right", the dropdown container should be aligned to the right', () => {
    wrapper.setProps({ disabled: false, align: 'right' })
    expect(wrapper.vm.align).to.equal('right')
  })
  describe('"embed" option set to true', () => {
    wrapper.setProps({ embed: true })
    it('The menu caller should be not exist', () => {})
    it('The menu should be embedded to the page/component and displayed by default', () => {})
  })
  it('the placeholder text should be "This is test placeholder text"', () => {
    expect(wrapper.find('span.sp-placeholder').text()).to.equal('This is test placeholder text')
  })
  it('"pagination" set to false, pagination bar should be not exist', () => {
    wrapper.setProps({ pagination: false })
    expect(wrapper.find('div.sp-pagination').exists()).to.equal(false)
  })
  it('the title text in selectmenu should be "v-selectmenu test title"', () => {
    expect(wrapper.find('div.sp-header > h3').text()).to.equal('v-selectmenu test title')
  })
  it('enter query keyword "sa", the result list should only have 2 items', () => {
    wrapper.setProps({ disabled: false, pagination: true })
    wrapper.find('.sp-search-input').setValue('sa')
    /**
     * simulate keyboard enter, because in the real case "populate" method will trigger by keyup event
     */
    wrapper.vm.populate()
    expect(wrapper.findAll('ul.sp-results li').length).to.equal(2)
  })
})
