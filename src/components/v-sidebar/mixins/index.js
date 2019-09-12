export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: [String,Boolean],
      default: 'Slide-bar'
    },
    width: Number,
    theme: {
      type: String,
      default: ''
    },
    backdrop: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      container: this.value,
      show: this.value
    };
  },
  watch: {
    value(val){
      if(val) {
        this.show = val;
        this.container = val;
      }else this.close();
    }
  },
  computed: {
    themeClass(){
      switch(this.theme){
        case 'dark': return 'slide-bar--dark';
        default: return '';
      }
    },
    dialogWidth(){
      const MIN_WIDTH = 400;
      return this.width && this.width > MIN_WIDTH ? this.width : MIN_WIDTH;
    }
  },
  methods:{
    close(){
      this.show = false;
      setTimeout(()=>{
        this.container = false;
        this.$emit('input', false);
      },200);
    },
    outSideClick(e){
      if(!e.path.some(val=>val.className && typeof val.className === 'string' &&
        val.className.includes('slide-bar__content'))) {
        this.close();
      }
    }
  }
};
