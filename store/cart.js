export default {
  namespaced: true,

  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),

  mutations: {
	  addToCart(state, goods) {
	        // 根据提交的商品的Id，查询购物车中是否存在这件商品
	        // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
	        const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
	  
	        if (!findResult) {
	          // 如果购物车中没有这件商品，则直接 push
	          state.cart.push(goods)
	        } else {
	          // 如果购物车中有这件商品，则只更新数量即可
	          findResult.goods_count++
	        }
			 uni.setStorageSync('cart', JSON.stringify(state.cart))
	      },
  },

  getters: {
	   // 统计购物车中商品的总数量
	     total(state) {
	        let c = 0
	        // 循环统计商品的数量，累加到变量 c 中
	        state.cart.forEach(goods => c += goods.goods_count)
	        return c
	     }
  },
}