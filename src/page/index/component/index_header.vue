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
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('index', ['indexActive', 'indexColumn']),
    ...mapGetters('index', ['activeMeta'])
  },
  watch: {
    indexActive() {
      this.slideTo(this.activeMeta.index)
    }
  },
  methods: {
    ...mapMutations('index', ['set_indexActive']),
    slideTo(index) {
      // vue api-$nextTick 等数据变化，dom更新之后调用
      this.$nextTick(() => {})
    },
    scrollRecover() {},
    navClick(type) {
      this.set_indexActive(type)
    },
    goTo() {
      $(`#indx .$(this.indexActive)`).animate({ scrollTop: 0 })
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
			text-align: center;
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
			background: url('~@/assets/img/search.png') no-repeat center center;
			background-size: 24px;
		}
	}

	nav {
		position: relative;
		height: 36px;
		line-height: 36px;
		background-color: #f4f5f6;
		border-bottom: 1px solid #ddd;

		/* 更多栏目 */
		/* padding-right: 40px; */
		.nav_ul {
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
			white-space: nowrap;
			font-size: 0;

			&::-webkit-scrollbar {
				width: 0px;
				height: 0px;
			}

			a {
				display: inline-block;
				padding-left: 10px;
				padding-right: 10px;
				margin-left: 5px;
				height: 36px;
				line-height: 36px;
				font-size: 17px;
				color: #505050;
				white-space: nowrap;
				-webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
				text-decoration: none;

				&:last-child {
					margin-right: 5px;
				}

				&.active {
					color: #00939c;
					border-bottom: 2px solid #00939c;
				}
			}
		}

		.nav_menu {
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;

			.shadow {
				position: absolute;
				width: 10px;
				height: 100%;
				left: -10px;
				background-size: contain;
				background-color: rgba(244, 245, 246, 0.3);
			}

			.more_btn {
				display: block;
				width: 40px;
				height: 100%;
				background-size: 20px;
				background-color: #f4f5f6;
			}
		}
	}
}
</style>