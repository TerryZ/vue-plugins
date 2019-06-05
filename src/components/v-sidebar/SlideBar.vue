<template>
    <div v-show="container">
        <div class="slide-bar-container">
            <div class="slide-bar__dialog" @click.stop="outSideClick">
                <transition name="slide-bar--fade-right">
                <div class="slide-bar__content" :class="themeClass" v-show="show" :style="{width:dialogWidth+'px'}">
                    <div class="slide-bar__title">
                        <div class="slide-bar__title-content" v-text="title" v-if="title"></div>
                        <div class="slide-bar__title-close" @click.stop="close">
                            <i class="el-icon-close"></i>
                        </div>
                    </div>
                    <div class="slide-bar__body">
                        <slot></slot>
                    </div>
                </div>
                </transition>
            </div>
        </div>
        <transition name="slide-bar--fade">
            <div class="slide-bar__overlay" v-if="backdrop" v-show="show"></div>
        </transition>
    </div>
</template>

<script>
    import './slide.scss';
    import mixins from './mixins';
	export default {
		name: "SlideBar",
        mixins: [mixins]
	};
</script>