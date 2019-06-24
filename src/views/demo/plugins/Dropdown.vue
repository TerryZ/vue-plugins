<template>
    <div class="card">
        <div class="panel-body p-5">
            <h3 class="mb-5">v-dropdown
                <button type="button" class="btn btn-outline-dark btn-sm" @click="$router.push({path: '/demo'});">Back to List</button>
            </h3>

            <h5 class="mt-5 mb-3">默认</h5>
            <p>
                <dropdown>
                    <template #caller>
                        <button type="button" class="btn btn-secondary">dropdown</button>
                    </template>
                    <div class="p-5">
                        <div>0123456789</div>
                        <div>0123456789</div>
                        <div>0123456789</div>
                    </div>
                </dropdown>
            </p>

            <h5 class="mt-5 mb-3">关闭循环切换</h5>
            <p>
                <dropdown :toggle="false">
                    <template #caller>
                        <input type="text" class="form-control">
                    </template>
                    <div class="p-5">
                        <div>0123456789</div>
                        <div>0123456789</div>
                        <div>0123456789</div>
                    </div>
                </dropdown>
            </p>

            <h5 class="mt-5 mb-3">禁用</h5>
            <p>
                <dropdown :disabled="true">
                    <template #caller>
                        <button type="button" class="btn btn-secondary">dropdown</button>
                    </template>
                    <div class="p-5">
                        <div>0123456789</div>
                        <div>0123456789</div>
                        <div>0123456789</div>
                    </div>
                </dropdown>
            </p>

            <h5 class="mt-5 mb-3">手动显示/关闭 dropdown</h5>
            <p>
                <dropdown :manual="true" @show="showChange" ref="dropdown">
                    <template #caller>
                        <input type="text" class="form-control" v-model="query" placeholder="try enter 3">
                    </template>
                    <div class="p-5">
                        <div v-for="item in list" v-text="item"></div>
                    </div>
                </dropdown>
            </p>

            <h5 class="mt-5 mb-3">对齐方向</h5>
            <div class="row">
                <div class="col-md-4">
                    <div>左对齐</div>
                    <dropdown>
                        <template #caller>
                            <button type="button" class="btn btn-secondary">dropdown</button>
                        </template>
                        <div class="p-5">
                            <div>0123456789</div>
                            <div>0123456789</div>
                            <div>0123456789</div>
                        </div>
                    </dropdown>
                </div>
                <div class="col-md-4">
                    <div>居中对齐</div>
                    <dropdown align="center">
                        <template #caller>
                            <button type="button" class="btn btn-secondary">dropdown</button>
                        </template>
                        <div class="p-5">
                            <div>0123456789</div>
                            <div>0123456789</div>
                            <div>0123456789</div>
                        </div>
                    </dropdown>
                </div>
                <div class="col-md-4">
                    <div>右对齐</div>
                    <dropdown align="right">
                        <template #caller>
                            <button type="button" class="btn btn-secondary">dropdown</button>
                        </template>
                        <div class="p-5">
                            <div>0123456789</div>
                            <div>0123456789</div>
                            <div>0123456789</div>
                        </div>
                    </dropdown>
                </div>
            </div>

            <h5 class="mt-5 mb-3">嵌入页面</h5>
            <p>
                <dropdown :embed="true">
                    <template #caller>
                        <button type="button" class="btn btn-secondary">dropdown</button>
                    </template>
                    <div class="p-5">
                        <div>0123456789</div>
                        <div>0123456789</div>
                        <div>0123456789</div>
                    </div>
                </dropdown>
            </p>

            <h5 class="mt-5 mb-3">鼠标右键</h5>
            <dropdown :right-click="true" :full-width="true">
                <template #caller>
                    <div class="card text-center bg-light text-secondary justify-content-center"
                         style="height: 20rem;font-size: 30px;">鼠标右键点击</div>
                </template>
                <div class="p-5">
                    <div>0123456789</div>
                    <div>0123456789</div>
                    <div>0123456789</div>
                </div>
            </dropdown>

            <h5 class="mt-5 mb-3">指定宽度</h5>
            <div>
                <dropdown :width="350">
                    <template #caller>
                        <button type="button" class="btn btn-secondary">dropdown</button>
                    </template>
                    <div class="p-5">
                        <div>0123456789</div>
                        <div>0123456789</div>
                        <div>0123456789</div>
                    </div>
                </dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import dropdown from '@/components/v-dropdown/Dropdown';
	export default {
		name: "Dropdown",
        components: { dropdown },
        data(){
			return {
			    show: false,
                query: '',
                list: [1,2,3,4,5,6,7,8,9,10]
            }
        },
        methods: {
		    showChange(state){
                this.show = state;
            }
        },
        watch: {
			query(val){
				if(val === '3'){
					console.log(val)
					this.$refs.dropdown.visible();
                }else{
                    if(this.show) this.$refs.dropdown.visible();
                }
            }
        }
	};
</script>

<style >

</style>