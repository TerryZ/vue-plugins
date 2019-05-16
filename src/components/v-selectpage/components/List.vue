<template>
    <ul class="sp-results" @mouseleave="highlight(-1)" >
        <li v-for="(row,index) in list" :key="index"
            :title="row[showField]"
            :class="rowClass(row, index)"
            v-html="renderCell(row)"
            @click.stop="click(row)"
            @mouseenter="highlight(!picked.includes(row)?index:-1)" ></li>
    </ul>
</template>

<script>
    import view from '../mixins/view';
    export default {
        name: "SelectPageList",
        mixins: [view]
    }
</script>