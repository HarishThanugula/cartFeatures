import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachItem => {
        total += eachItem.price * eachItem.quantity
      })

      return (
        <div className="summary-container">
          <h1 className="total-price">
            <span className="order-total">Order Total: </span>
            Rs {total}/-
          </h1>
          <p className="items-count">{cartList.length} items in cart</p>
          <button type="button" className="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
