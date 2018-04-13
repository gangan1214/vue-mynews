<template>
	<div id="indexHeader">
		<header>
			<div class="top_bar">
				<div class="abs_l"></div>
				<div class="abs_m">
					<!-- @click 是 v-on:click 的缩写-->
					<a class="title" @click.stop="goTop"></a>
				</div>
				<div class="abs_r">
					<!--TODO slot="right" 用意？ -->
					<a class="search_btn" slot="right" @click.stop="$router.push('search')"></a>
				</div>
			</div>
		</header>
		<nav>
			<div class="nav_ul">
				<a href="javascript:;" v-for="(item, index) in indexColumn" 
				:class='{active: indexActive == item.classpath}'
				@click.stop="navClick(item.classpath)" :key="index">{{item.classname}}</a>
			</div>
		</nav>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
	computed: {
		...mapState('index', [
			'indexActive',
			'indexColumn'
		]),
		...mapGetters('index', [
			'activeMeta'
		])
	},
	watch: {
		indexActive() {
			this.slideTo(this.activeMeta.index);
		}
	},
	methods: {
		...mapMutations('index', ['set_indexActive']),
		slideTo(index) {
			//vue api-$nextTick 等数据变化，dom更新之后调用
			this.$nextTick(()=>{
				
			})
		},
		scrollRecover() {

		},
		navClick(type) {
			this.set_indexActive(type);
		},
		goTo() {
			$(`#indx .$(this.indexActive)`).animate({scrollTop: 0})
		}
	}
}
</script>


<style lang='stylus'>
	#indexHeader {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		overflow: hidden;
		header {
			height: 44px;
			background-color: #00939c;
			.top_bar {
				position: relative;
				height: 44px;
			}

			.abs_l, .abs_m, .abs_r {
				position: absolute;
				top: 0;
				width: 44px;
				height: 100%;
				text-align: center
			}
			.abs_l {
				left: 0;
				z-index: 1000;
			}
			.abs_m {
				width: 100%;
				z-index: 999;
			}
			.abs_r {
				right: 0;
				z-index: 1000;
			}
			a.title {
				display: inline-block;
				background-size: 145px;
				width: 100px;
				height: 44px;
				background: url('~@/assets/img/news_logo.png') no-repeat center center;
				background-size: contain;
			}
			a.search_btn {
				display: inline-block;
				width: 100%;
				height: 100%;
				background: url('~@/assets/img/search.png')no-repeat center center;
				background-size: 24px;
			}
		}
	}
</style>