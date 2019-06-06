import { shallowMount } from '@vue/test-utils';
import page from '@/components/v-page/Page';

describe('v-page', function() {
    describe('page-numbers', function() {
        it('the page numbers should be [2,3,4,5,6] in page 4', function() {
        	const env = {
				totalPage: 10,
				pageNumberSize: 5,
				currentPage: 4
			}, values = page.computed.pageNumbers.call(env);
            expect(values.sort().join('')).to.equal([2,3,4,5,6].sort().join(''));
        });
    });

    describe('dom operation test, click page number 5 item', ()=>{
		const wapper = shallowMount(page, {
			propsData: {
				totalRow: 100
			}
		});

		it('after click, the page 5 <li> item class name should be "active"', ()=>{
			wapper.findAll('a').at(8).trigger('click');
			// console.log(wapper.html());
			//expect(wapper.props('totalRow')).to.equal(100);
			//expect(wapper.is('div')).equal(true);
			expect(wapper.findAll('li').at(6).classes('active')).to.equal(true);
		});
		it('the current page data should be 5', ()=>{
			expect(wapper.vm.currentPage).to.equal(5);
		});
		it('the page numbers should be [3,4,5,6,7]', ()=>{
			expect(wapper.vm.pageNumbers.sort().join('')).to.equal([3,4,5,6,7].sort().join(''));
		});
		it('the current page should be 1 when change page size in list', ()=>{
			//设置下拉列表选择第三个项目（每页50条）
			wapper.find('select').findAll('option').at(2).setSelected();
			expect(wapper.vm.currentPage).to.equal(1);
		});
		it('after page size change, the total pages should be 2', ()=>{
			expect(wapper.vm.totalPage).to.equal(2);
		})
	});
});