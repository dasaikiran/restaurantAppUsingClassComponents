import './index.css'

const MenuTabs = props => {
  const {item, activeMenu, onMenuTabClick} = props
  const {menuCategory, menuCategoryId} = item
  const onTabClick = () => {
    onMenuTabClick(menuCategoryId)
  }
  const classNewName = activeMenu ? 'active-class' : 'normal-class'
  return (
    <li className="menu-tab">
      <button
        onClick={onTabClick}
        className={`${classNewName} tab-button`}
        type="button"
      >
        <p className="menu-name">{menuCategory}</p>
      </button>
    </li>
  )
}

export default MenuTabs
