import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  headingName: '',
  onHeadingName: () => {},
})

export default CartContext
