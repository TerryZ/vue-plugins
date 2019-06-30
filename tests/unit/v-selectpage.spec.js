import { mount } from '@vue/test-utils';
import list from '@test/sample/nba-teams';
import sp from '@/components/v-selectpage/SelectPage';

describe('v-selectpage', function() {
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
    });
    describe('close pagination bar', ()=>{
        const wrapper = mount(sp, {
            propsData: {
                data: list,
                pagination: false
            }
        });
        it('pagination bar should be not exist', ()=>{
            expect(wrapper.find('div.sp-pagination').exists()).to.equal(false);
        });
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
		})
	});
});