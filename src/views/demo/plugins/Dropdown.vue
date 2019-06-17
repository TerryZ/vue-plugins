<template>
    <div class="card">
        <div class="panel-body p-5">
            <h3 class="mb-5">v-page
                <button type="button" class="btn btn-outline-dark btn-sm" @click="$router.push({path: '/demo'});">Back to List</button>
            </h3>

            <h5 class="mt-5 mb-3">默认</h5>
            <p>
                <dropdown>
                    <template #caller>
                        <button type="button">abc</button>
                    </template>
                    <div>123</div>
                    <div>456</div>
                    <div>789</div>
                </dropdown>
            </p>
        </div>
    </div>
</template>

<script>
    import dropdown from '@/components/v-dropdown/Dropdown';
	export default {
		name: "Dropdown",
        components: { dropdown }
	};
</script>

<style >

</style>