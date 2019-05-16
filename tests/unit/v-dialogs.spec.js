import { shallowMount, mount } from '@vue/test-utils';
import dialogs from '@/components/v-dialogs/Container';
import demo from '@/views/demo/Profile';

describe('v-dialogs', function() {
    describe('open all type dialogs', ()=>{
		const wapper = mount(dialogs, {
		    attachToDocument: true
        });
		it('open a Modal dialog', ()=>{
            wapper.vm.addModal({
                component: demo
            });
			expect(wapper.find('.v-dialog-modal').exists()).to.be.true;
		});
		it('open a Alert dialog', ()=>{
			wapper.vm.addAlert({
				message: 'a alert dialog',
				language: 'cn',
				callback: ()=>{}
			});
			expect(wapper.find('.v-dialog-alert').exists()).to.be.true;
		});
		it('open a Mask dialog', ()=>{
			wapper.vm.addMask({
				message: 'loading...',
				callback: ()=>{}
			});
			expect(wapper.find('.v-dialog-mask__container').exists()).to.be.true;
		});
		it('open a Toast dialog', ()=>{
			wapper.vm.addToast({
				language: 'cn',
				message: 'a toast dialog',
				callback: ()=>{}
			});
			expect(wapper.find('.v-dialog-toast__container').exists()).to.be.true;
		});
		it('close all opened dialog', ()=>{
			wapper.vm.closeAll();
			expect(wapper.find('.v-dialog-container').isEmpty()).to.be.true;
		})
	});
});