import { shallowMount } from '@vue/test-utils';
import list from '@test/sample/nba-teams';
import sg from '@/components/v-suggest/Suggest';

describe('v-suggest', function() {
    describe('javascript sourced data(Array[Object])', function() {
		const wapper = shallowMount(sg, {
			propsData: {
				data: list,
				showField: 'name',
				value: 'b'
			}
		});
        it('enter "b" in input element, the suggestion list should have 6 items', function() {
        	wapper.vm.populate();
        	expect(wapper.vm.list.length).to.equal(6);
        });
        it('do next item 3 times(down arrow key), the 3rd item should have "sg-over" class', function(){
        	wapper.vm.next();
			wapper.vm.next();
			wapper.vm.next();
			expect(wapper.findAll('li').at(2).classes('sg-over')).to.equal(true);
		});
        it('click "x" icon(the clear input button), the suggestion list length should be 0', function(){
        	wapper.vm.clear();
			expect(wapper.vm.list.length).to.equal(0);
		});
    });
});