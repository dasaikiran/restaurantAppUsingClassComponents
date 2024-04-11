import CartContext from '../../context/CartContext'
import './index.css'

const DishItem = props => {
  const {item} = props
  const {
    addonCat,
    dishType,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishAvailability,
    dishId,
    dishImage,
    dishName,
    dishPrice,
  } = item
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, deleteCartItem, addCartItem} = value

        const getQuantity = () => {
          const cartItem = cartList.find(item1 => item1.dishId === dishId)
          return cartItem ? cartItem.quantity : 0
        }

        const onMinusClick = () => {
          deleteCartItem(item)
        }

        const onPlusClick = () => {
          addCartItem(item)
        }

        return (
          <li className="dish-item">
            <div className={`type-${dishType}-border`}>
              <div className={`type-${dishType}-circle`} />
            </div>
            <div className="dish-des-container">
              <h1 className="dish-name">{dishName}</h1>
              <div className="dish-cur-pr">
                <p className="dish-cur">
                  {dishCurrency} {dishPrice}
                </p>
              </div>
              <p className="dish-desc">{dishDescription}</p>
              {dishAvailability && (
                <div className="button-container">
                  <button
                    onClick={onMinusClick}
                    className="minus-button"
                    type="button"
                  >
                    -
                  </button>
                  <p className="value">{getQuantity()}</p>
                  <button
                    onClick={onPlusClick}
                    className="plus-button"
                    type="button"
                  >
                    +
                  </button>
                </div>
              )}
              {!dishAvailability && (
                <p className="not-available">Not available</p>
              )}
              {addonCat.length > 0 && (
                <p className="add-ons">Customizations available</p>
              )}
            </div>
            <div className="calories-container">
              <p className="calories">{dishCalories} calories</p>
            </div>
            <div className="dish-img-container">
              <img className="dish-image" src={dishImage} alt={dishName} />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
