<template>
	<div id="index">
		<index-header/>
		<swiper-container/>
	</div>
</template>

<script>
import indexHeader from './component/index_header'
import swiperContainer from './component/swiperContainer'
import {mapActions} from 'vuex'
export default {
	components: {
		indexHeader, swiperContainer
	},
	methods: {
		...mapActions('index', [
			'get_indexColumn_data'
		])
	},
	created() {
		this.get_indexColumn_data()
	}
}
</script>
<style lang='stylus'>
#index {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>