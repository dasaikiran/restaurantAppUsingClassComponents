import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import CartContext from './context/CartContext'
import Home from './components/Home'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
    headingName: '',
  }

  onHeadingName = name => {
    this.setState({
      headingName: name,
    })
  }

  addCartItem = obj => {
    const {cartList} = this.state
    const oldObj = cartList.find(item => item.dishId === obj.dishId)
    if (oldObj === undefined) {
      const newObj = {...obj, quantity: 1}
      this.setState({
        cartList: [...cartList, newObj],
      })
    } else {
      const newList = cartList.map(item => {
        if (item.dishId === obj.dishId) {
          const quat = item.quantity + 1
          return {
            ...item,
            quantity: quat,
          }
        }
        return item
      })
      this.setState({
        cartList: newList,
      })
    }
  }

  deleteCartItem = obj => {
    const {cartList} = this.state
    const oldObj = cartList.find(item => item.dishId === obj.dishId)
    if (oldObj !== undefined) {
      if (oldObj.quantity === 1) {
        const newList = cartList.filter(item => item.dishId !== obj.dishId)
        this.setState({
          cartList: newList,
        })
      } else {
        const newList = cartList.map(item => {
          if (item.dishId === obj.dishId) {
            const quant = item.quantity - 1
            return {
              ...item,
              quantity: quant,
            }
          }
          return item
        })
        this.setState({
          cartList: newList,
        })
      }
    }
  }

  render() {
    const {cartList, headingName} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          deleteCartItem: this.deleteCartItem,
          headingName,
          onHeadingName: this.onHeadingName,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
