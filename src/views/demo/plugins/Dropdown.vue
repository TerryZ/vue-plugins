<template>
    <div class="card">
        <div class="panel-body p-5">
            <h3 class="mb-5">v-page
                <button type="button" class="btn btn-outline-dark btn-sm" @click="$router.push({path: '/demo'});">Back to List</button>
            </h3>

        </div>
    </div>
</template>

<script>
	export default {
		name: "Dropdown"
	};
</script>

<style scoped>

</style>