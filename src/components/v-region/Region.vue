<template>
    <div>
        <!-- plain text only -->
        <v-text-region v-if="text && !ui" v-bind="$attrs" ></v-text-region>
        <!-- select elements mode -->
        <v-select-group v-if="!text && !ui" v-bind="$attrs" v-on="$listeners"></v-select-group>
        <!-- selector mode -->
        <v-tab-selector v-if="ui && !column && !cityPicker" v-bind="$attrs" v-on="$listeners">
            <slot></slot>
        </v-tab-selector>
        <!-- column group mode -->
        <v-column-group v-if="ui && column && !cityPicker" v-bind="$attrs" v-on="$listeners">
            <slot></slot>
        </v-column-group>
        <!-- city picker -->
        <v-city-picker v-if="ui && !column && cityPicker" v-bind="$attrs" v-on="$listeners">
            <slot></slot>
        </v-city-picker>
    </div>
</template>

<script>
    import './region.scss';
    import selectGroup from './components/SelectGroup';
    import tabSelector from './components/TabSelector';
    import columnGroup from './components/ColumnGroup';
    import textRegion from './components/TextRegion';
    import cityPicker from './components/CityPicker';
    export default {
        name: "v-region",
        components: {
            'v-select-group': selectGroup,
            'v-text-region': textRegion,
            'v-tab-selector': tabSelector,
            'v-column-group': columnGroup,
            'v-city-picker': cityPicker
        },
        props:{
            ui: {
                type: Boolean,
                default: false
            },
            column: {
                type: Boolean,
                default: false
            },
            text: {
                type: Boolean,
                default: false
            },
            cityPicker: {
                type: Boolean,
                default: false
            }
        },
        mounted(){
            this.className = this.$el.className;
            this.$el.className = 'v-region';
        }
    }
</script>