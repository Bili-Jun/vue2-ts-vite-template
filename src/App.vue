<template>
  <div class="main">
    <h2>Hello {{ user?.name }}</h2>

    <div style="margin: 1rem 0">
      <PiniaLogo />
    </div>

    <form @submit.prevent="addItemToCart" data-testid="add-items">
      <input type="text" v-model="itemName" />
      {{ itemName }}
      <button>Add</button>
    </form>

    <form @submit.prevent="buy">
      <ul data-testid="items">
        <li v-for="item in cart.items" :key="item.name">
          {{ item.name }} ({{ item.amount }})
          <button @click="cart.removeItem(item.name)" type="button">X</button>
        </li>
      </ul>

      <button :disabled="!user.name">Buy</button>
      <button
        :disabled="!cart.items.length"
        @click="clearCart"
        type="button"
        data-testid="clear"
      >
        Clear the cart
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import PiniaLogo from '@/components/PiniaLogo.vue'

import { useUserStore } from './stores/user'
import { useCartStore } from './stores/cart'

export default defineComponent({
  components: { PiniaLogo },
  setup() {
    const user = useUserStore()
    const cart = useCartStore()

    const itemName = ref('')

    function addItemToCart() {
      if (!itemName.value) return
      cart.addItem(itemName.value)
      itemName.value = ''
    }

    function clearCart() {
      if (window.confirm('Are you sure you want to clear the cart?')) {
        cart.rawItems = []
      }
    }

    onMounted(() => {
      user.login('vue 2', 'vue2')
    })
    

    async function buy() {
      const n = await cart.purchaseItems()

      console.log(`Bought ${n} items`)

      cart.rawItems = []
    }

    return {
      itemName,
      addItemToCart,
      cart,
      user,
      buy,
      clearCart,
    }
  },
})
</script>

<style lang="less" scoped>
.main {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

img {
  width: 200px;
}

button,
input {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
