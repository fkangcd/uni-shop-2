<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item, i) in cateList" :key="i">
					<view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item, i) in cateLevel2" :key="i">
				    <view class="cate-lv2-title">/ {{item.cat_name}} /</view>
					<view class="cate-lv3-list">
					      <!-- 三级分类 Item 项 -->
					      <view class="cate-lv3-item" v-for="(subitem, i) in item.children" :key="i" @click="gotoGoodsList(subitem)">
					        <!-- 图片 -->
					        <image :src="subitem.cat_icon"></image>
					        <!-- 文本 -->
					        <text>{{subitem.cat_name}}</text>
					      </view>
					    </view>
				  </view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,
				cateList: [],
				cateLevel2: [],
				active: 0,
				scrollTop: 0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()
		},
		methods: {
			async getCateList() {
				// 发起请求
				    const { data: res } = await uni.$http.get('/api/public/v1/categories')
				    // 判断是否获取失败
				    if (res.meta.status !== 200) return uni.$showMsg()
				    // 转存数据
				    this.cateList = res.message
					this.cateLevel2 = res.message[0].children
			},
			activeChanged(i) {
			    this.active = i
				this.cateLevel2 = this.cateList[i].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			  },
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			gotoSearch() {
			     uni.navigateTo({
			       url: '/subpkg/search/search'
			     })
			   }
		}
	}
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}
</style>
