<script>
    import mixins from '../mixins';

	/**
     * plain text only
	 */
	export default {
        name: "TextRegion",
        mixins: [mixins],
        inheritAttrs: false,
        render(h){
        	return h('span', this.selectedText);
        },
        methods: {
            provinceChange(newVal, oldVal){
                this.baseProvinceChange(newVal, oldVal);
            },
            cityChange(newVal, oldVal){
                this.baseCityChange(newVal, oldVal);
            },
            areaChange(newVal, oldVal){
                this.baseAreaChange(newVal, oldVal);
            },
            townChange(newVal, oldVal){
                this.baseTownChange(newVal, oldVal);
            }
        }
    }
</script>