import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = cartId => {
    const {cartList} = this.state
    const updateCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== cartId,
    )
    this.setState({cartList: updateCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productDecrease = cartList.find(eachItem => eachItem.id === id)

    if (productDecrease.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === productDecrease.id) {
            const updateQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updateQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  onItemQuantityIncrease = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const updateQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: updateQuantity}
        }
        return eachItem
      }),
    }))
  }

  removeAllCartItem = () => {
    this.setState({cartList: []})
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productItem = cartList.find(eachItem => eachItem.id === product.id)

    if (productItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === productItem.id) {
            const updateQuantity = eachCartItem.quantity + product.quantity
            return {...eachCartItem, quantity: updateQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      const updateCartList = [...cartList, product]
      this.setState({cartList: updateCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
