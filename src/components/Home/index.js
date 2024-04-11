import {Component} from 'react'

import MenuTabs from '../MenuTabs'
import DishItem from '../DishItem'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {menuList: [], activeMenuId: ''}

  componentDidMount = () => {
    this.getApiDetails()
  }

  getApiDetails = async () => {
    try {
      const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
      const response = await fetch(url)
      const data = await response.json()
      if (data) {
        const menuList = data[0].table_menu_list.map(item => ({
          categoryDishes: item.category_dishes.map(item1 => ({
            addonCat: item1.addonCat,
            dishType: item1.dish_Type,
            dishCalories: item1.dish_calories,
            dishCurrency: item1.dish_currency,
            dishDescription: item1.dish_description,
            dishAvailability: item1.dish_Availability,
            dishId: item1.dish_id,
            dishImage: item1.dish_image,
            dishName: item1.dish_name,
            dishPrice: item1.dish_price,
          })),
          menuCategory: item.menu_category,
          menuCategoryId: item.menu_category_id,
          menuCategoryImage: item.menu_category_image,
        }))

        this.setState({
          menuList,
          activeMenuId: menuList[0].menuCategoryId,
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  onMenuTabClick = id => {
    this.setState({
      activeMenuId: id,
    })
  }

  getMenuFunc = () => {
    const {menuList, activeMenuId} = this.state
    return (
      <ul className="menu-tab-container">
        {menuList.map(item => (
          <MenuTabs
            key={item.menuCategoryId}
            item={item}
            activeMenu={item.menuCategoryId === activeMenuId}
            onMenuTabClick={this.onMenuTabClick}
          />
        ))}
      </ul>
    )
  }

  getMenuDishes = () => {
    const {activeMenuId, menuList} = this.state
    const dishObj = menuList.find(item => item.menuCategoryId === activeMenuId)
    if (menuList.length === 0 || !activeMenuId) {
      console.log('MenuList is empty or activeMenuId is not set')
      return null
    }
    if (dishObj === undefined) {
      console.log('MenuObj is not present')
      return null
    }
    const {categoryDishes} = dishObj
    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(item => (
          <DishItem key={item.dishId} item={item} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <>
        <Header />
        {this.getMenuFunc()}
        {this.getMenuDishes()}
      </>
    )
  }
}

export default Home
