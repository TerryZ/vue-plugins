import { mount } from '@vue/test-utils';
import list from '@test/sample/nba-teams';
import sp from '@/components/v-selectpage/SelectPage';

describe('v-selectpage', function() {
    describe('list view, single select', ()=>{
        const wapper = mount(sp, {
            propsData: {
                data: list
            }
        });

        it('select first item, that item name should be "Chicago Bulls"', ()=>{
            wapper.find('div.sp-input-container').trigger('click');
            wapper.vm.next();
			wapper.find('li.sp-over').trigger('click');
            expect(wapper.vm.picked[0].name).to.equal('Chicago Bulls');
        });
        it('click "x" icon to clear selected items, value should be empty', ()=>{
			wapper.find('div.sp-clear').trigger('click');
			expect(wapper.vm.picked.length).to.equal(0);
		});
    });
	describe('list view, multiple select', ()=>{
		const wapper = mount(sp, {
			propsData: {
				data: list,
				multiple: true
			}
		});

		it('click select current page icon, go next page and click icon again, the selected item length should be 20', ()=>{
			wapper.find('div.sp-input-container').trigger('click');
			wapper.find('button.sp-select-all-btn').trigger('click');
			wapper.find('li.sp-page-next a').trigger('click');
			wapper.find('button.sp-select-all-btn').trigger('click');
			expect(wapper.vm.picked.length).to.equal(20);
		});
		it('click clear current page icon, the selected item length should be 10', ()=>{
			wapper.find('button.sp-remove-all-btn').trigger('click');
			expect(wapper.vm.picked.length).to.equal(10);
		})
	});
});