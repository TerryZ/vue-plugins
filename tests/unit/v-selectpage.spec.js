import { mount } from '@vue/test-utils';
import list from '@test/sample/nba-teams';
import table from '@test/sample/countries';
import sp from '@/components/v-selectpage/SelectPage';

describe('v-selectpage', function() {
	describe('basic options', ()=>{
		const wrapper = mount(sp, {
			propsData: {
				data: list,
				disabled: true,
				placeholder: 'This is test placeholder text',
				title: 'v-selectpage test title'
			}
		});
		it('"disabled" option set to true, the dropdown is not allowed to be opened ', ()=>{
			wrapper.find('div.sp-input-container').trigger('click');
			expect(wrapper.find('div.v-dropdown-container').isVisible()).to.equal(false);
		});
		it('the placeholder text should be "This is test placeholder text"', ()=>{
			expect(wrapper.find('span.sp-placeholder').text()).to.equal('This is test placeholder text');
		});
		it('"pagination" set to false, pagination bar should be not exist', ()=>{
			wrapper.setProps({ pagination: false });
			expect(wrapper.find('div.sp-pagination').exists()).to.equal(false);
		});
		it('the title text in selectpage should be "v-selectpage test title"', ()=>{
			expect(wrapper.find('div.sp-header > h3').text()).to.equal('v-selectpage test title');
		});
	});
    describe('list view, single select mode', ()=>{
        const wrapper = mount(sp, {
            propsData: {
                data: list
            }
        });

        it('select first item, that item name should be "Chicago Bulls"', ()=>{
            wrapper.find('div.sp-input-container').trigger('click');
            wrapper.vm.next();
			wrapper.find('li.sp-over').trigger('click');
            expect(wrapper.vm.picked[0].name).to.equal('Chicago Bulls');
        });
        it('click "x" icon to clear selected items, value should be empty', ()=>{
			wrapper.find('div.sp-clear').trigger('click');
			expect(wrapper.vm.picked.length).to.equal(0);
		});
        it('v-model/value content modify to "22", the selected item name should be "Los Angeles Clippers"', ()=>{
            wrapper.setProps({ value: '22' });
            expect(wrapper.vm.picked[0].name).to.equal('Los Angeles Clippers');
        })
    });
	describe('list view, multiple select mode', ()=>{
		const wrapper = mount(sp, {
			propsData: {
				data: list,
				multiple: true
			}
		});

		it('click "select current page" icon, go next page and click icon again, the selected item length should be 20', ()=>{
			wrapper.find('div.sp-input-container').trigger('click');
			wrapper.find('button.sp-select-all-btn').trigger('click');
			wrapper.find('div.sp-pagination').findAll('a').at(3).trigger('click');
			wrapper.find('button.sp-select-all-btn').trigger('click');
			expect(wrapper.vm.picked.length).to.equal(20);
		});
		it('click "clear current page" icon, the selected item length should be 10', ()=>{
			wrapper.find('button.sp-remove-all-btn').trigger('click');
			expect(wrapper.vm.picked.length).to.equal(10);
		});
        it('v-model/value content modify to "3,5,7", the selected item name should be "Detroit Pistons,Milwaukee Bucks,Boston Celtics"', ()=>{
            wrapper.setProps({ value: '3,5,7' });
            expect(wrapper.vm.picked.map(val=>val.name).join(',')).to.equal('Detroit Pistons,Milwaukee Bucks,Boston Celtics');
        });

        const limit = mount(sp, {
            propsData:{
                data: list,
                multiple: true,
                maxSelectLimit: 3
            }
        });

        it('"maxSelectLimit" options set to 3, click "select current page" icon and the picked items should be 3', ()=>{
            limit.find('div.sp-input-container').trigger('click');
            limit.find('button.sp-select-all-btn').trigger('click');
            expect(limit.vm.picked.length).to.equal(3);
        });
		it('click "Clear all selected" icon, all picked items should be clear', ()=>{
            limit.find('div.sp-input-container').trigger('click');
            limit.find('button.sp-clear-all-btn').trigger('click');
            expect(limit.vm.picked.length).to.equal(0);
        });
	});
    describe('table view, single select mode', ()=>{
        const wrapper = mount(sp, {
            propsData: {
                data: table,
                tbColumns: [
                    {title: 'id',data: 'id'},
                    {title: 'name',data: 'name'},
                    {title: 'desc',data: 'desc'}
                ]
            }
        });
        it('have table view container', ()=>{
            expect(wrapper.find('table.sp-table').exists()).to.equal(true);
        });
        it('have 3 table column', ()=>{
            expect(wrapper.find('table.sp-table > thead > tr').findAll('th').length).to.equal(3);
        });
    });
});