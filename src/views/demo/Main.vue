<template>
    <div class="card p-5 main-container">
        <h2 class="text-center mb-5">功能</h2>
        <h3 class="page-header">表单相关组件</h3>
        <p>
            <router-link to="/demo/form" class="btn btn-outline-secondary">Form validate</router-link>
            <router-link to="/demo/datetime" class="btn btn-outline-secondary">DateTime picker</router-link>
            <router-link to="/demo/editor" class="btn btn-outline-secondary">Rich text editor</router-link>
            <router-link to="/demo/region" class="btn btn-dark">Region selector</router-link>
            <router-link to="/demo/upload" class="btn btn-outline-secondary">File Uploader</router-link>
        </p>

        <h3 class="page-header">功能组件</h3>
        <p>
            <router-link to="/demo/dropdown" class="btn btn-dark">Dropdown</router-link>
            <router-link to="/demo/page" class="btn btn-dark">Pagination</router-link>
            <router-link to="/demo/list" class="btn btn-dark">Search and Grid</router-link>
            <router-link to="/demo/gallery" class="btn btn-outline-secondary">Image gallery</router-link>
            <router-link to="/demo/selectMenu" class="btn btn-dark">SelectMenu</router-link>
            <router-link to="/demo/selectPage" class="btn btn-dark">SelectPage</router-link>
            <router-link to="/demo/tree" class="btn btn-outline-secondary">Tree</router-link>
            <router-link to="/demo/dialog" class="btn btn-dark">Dialogs</router-link>
            <router-link to="/demo/composite" class="btn btn-outline-secondary">Composite</router-link>
            <router-link to="/demo/video" class="btn btn-outline-secondary">Video</router-link>
            <router-link to="/demo/suggest" class="btn btn-dark">Suggest</router-link>
        </p>
    </div>
</template>

<style lang="scss">
    .main-container {
        .btn { margin-right: 0.3rem;margin-bottom: 0.3rem; }
    }
</style>