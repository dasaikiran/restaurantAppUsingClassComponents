import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let count = 0
      if (cartList) {
        cartList.forEach(item => {
          count += item.quantity
        })
      }
      return (
        <nav className="navbar">
          <h1 className="nav-heading">UNI Resto Cafe</h1>
          <div className="nav-container">
            <h1 className="my-orders-heading">My Orders</h1>
            <AiOutlineShoppingCart className="cart-icon" />
            <div className="cart-value">
              <span className="span">{count}</span>
            </div>
          </div>
        </nav>
      )
    }}
  </CartContext.Consumer>
)

export default Header
