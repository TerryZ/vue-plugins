<template>
    <div class="card">
        <div class="panel-body p-5">
            <h3 class="mb-5">v-page
                <button type="button" class="btn btn-outline-dark btn-sm" @click="$router.push({path: '/demo'});">Back to List</button>
            </h3>

            <h5 class="mt-5 mb-3">默认</h5>
            <p>
                <dropdown>
                    <button type="button"></button>
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