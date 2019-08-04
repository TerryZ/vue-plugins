<template>
    <div class="card p-5 main-container">
        <h1 class="text-center mb-5 display-4">Vue 插件/组件</h1>
        <h2 class="">表单相关组件</h2>
        <p>
            <router-link to="/demo/form" class="btn btn-outline-secondary">Form validate</router-link>
            <router-link to="/demo/datetime" class="btn btn-outline-secondary">DateTime picker</router-link>
            <router-link to="/demo/editor" class="btn btn-outline-secondary">Rich text editor</router-link>
            <!-- <router-link to="/demo/region" class="btn btn-dark">Region selector</router-link> -->
            <!-- <router-link to="/demo/upload" class="btn btn-outline-secondary">File Uploader</router-link> -->
        </p>

        <h2 class="mt-5">功能组件</h2>
        <!-- <p>
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
        </p> -->

        <h4 class="mt-3">基础组件</h4>
        <div class="w-50 mb-5">
            <div class="list-group shadow-sm">
                <router-link to="/demo/dropdown" class="list-group-item list-group-item-action">
                    <h5>Dropdown</h5>
                    <p>下拉层</p>
                    <small>v-dropdown</small>
                </router-link>
            </div>
        </div>

        <h4>二次封装组件</h4>
        <div class="w-50 mb-5">
            <div class="list-group shadow-sm">
                <router-link to="/demo/gallery" class="list-group-item list-group-item-action">
                    <h5>Image gallery</h5>
                    <p>画廊模式展示图片，全屏查看图片图片明细，以及多图循环播放的跑马灯模式</p>
                    <small>v-gallery</small>
                </router-link>
                <router-link to="/demo/tree" class="list-group-item list-group-item-action">
                    <h5>Tree</h5>
                    <p>zTree for vue2</p>
                    <small>v-tree</small>
                </router-link>
                <router-link to="/demo/video" class="list-group-item list-group-item-action">
                    <h5>Video</h5>
                    <p>简洁快速的视频播放器，目前建议使用 mp4 格式视频</p>
                    <small>v-playback</small>
                </router-link>
                <router-link to="/demo/upload" class="list-group-item list-group-item-action bg-primary text-white">
                    <h5>File Uploader</h5>
                    <p>文件上传组件，支持带预览的单文件模式，批量上传模式以及鼠标拖拽支持</p>
                    <small>v-uploader</small>
                </router-link>
            </div>
        </div>

        <h4>功能插件</h4>
        <div class="w-50 mb-5">
            <div class="list-group shadow-sm">
                <router-link to="/demo/page" class="list-group-item list-group-item-action">
                    <h5>Pagination</h5>
                    <p>分页栏</p>
                    <small>v-page</small>
                </router-link>
                <router-link to="/demo/list" class="list-group-item list-group-item-action bg-secondary text-white-50">
                    <h5>Search and Grid</h5>
                    <p>数据表格（未正式完成）</p>
                    <small>v-tablegrid</small>
                </router-link>
                <router-link to="/demo/selectmenu" class="list-group-item list-group-item-action bg-primary text-white">
                    <h5>SelectMenu</h5>
                    <p>多功能菜单插件，通过数据动态生成的菜单，它包含了常规菜单，上下文菜单（鼠标右键菜单），高级菜单，可多分组等功能</p>
                    <small>v-selectmenu</small>
                </router-link>
                <router-link to="/demo/selectpage" class="list-group-item list-group-item-action bg-primary text-white">
                    <h5>SelectPage</h5>
                    <p>下拉分页选择器</p>
                    <small>v-selectpage</small>
                </router-link>
                <router-link to="/demo/dialog" class="list-group-item list-group-item-action">
                    <h5>Dialogs</h5>
                    <p>弹出窗口</p>
                    <small>v-dialogs</small>
                </router-link>
                <router-link to="/demo/composite" class="list-group-item list-group-item-action">
                    <h5>Composite</h5>
                    <p>综合情况</p>
                    <small>none</small>
                </router-link>
                <router-link to="/demo/suggest" class="list-group-item list-group-item-action">
                    <h5>Suggest</h5>
                    <p>输入建议组件</p>
                    <small>v-suggest</small>
                </router-link>
                <router-link to="/demo/region" class="list-group-item list-group-item-action bg-primary text-white">
                    <h5>Region</h5>
                    <p>提供最多 4 级联动的行政区划选择器</p>
                    <small>v-region</small>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .main-container {
        .btn { margin-right: 0.3rem;margin-bottom: 0.3rem; }
    }
</style>