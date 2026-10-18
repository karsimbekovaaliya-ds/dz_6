import React from 'react'

// Это отдельный дочерний компонент для одного элемента списка покупок.
// Он принимает данные о товаре и функцию удаления через 'props' от родительского компонента App.
function ShoppingItem(props) {
  return (
    <li className="shopping-item">
      {/* Название товара получаем из props.name */}
      <span className="item-name">{props.name}</span>

      {/* Цену товара получаем из props.price */}
      <span className="item-price">{props.price} сом</span>

      {/* Кнопка для удаления: при клике вызывается функция props.onDelete */}
      <button 
        className="delete-btn" 
        onClick={props.onDelete}
        title="Удалить товар из списка"
      >
        Удалить
      </button>
    </li>
  )
}

export default ShoppingItem
