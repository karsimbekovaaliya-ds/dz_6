import { useState } from 'react'
import ShoppingItem from './components/ShoppingItem'
import './App.css'

function App() {
  // 1. Состояние (state) для хранения списка товаров
  // Начинаем с нескольких базовых товаров для примера
  const [items, setItems] = useState([
    { id: 1, name: 'Хлеб', price: 45 },
    { id: 2, name: 'Молоко', price: 80 },
    { id: 3, name: 'Яблоки', price: 120 }
  ])

  // 2. Состояния (state) для полей ввода формы
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')

  // Функция добавления нового товара
  const handleAddItem = (e) => {
    e.preventDefault() // предотвращаем перезагрузку страницы при отправке формы

    // Простая проверка: название не должно быть пустым, а цена должна быть больше 0
    if (itemName.trim() === '' || itemPrice === '') {
      alert('Пожалуйста, введите название и цену товара!')
      return
    }

    const numericPrice = Number(itemPrice)
    if (isNaN(numericPrice) || numericPrice <= 0) {
      alert('Цена должна быть положительным числом!')
      return
    }

    // Создаем объект нового товара
    const newItem = {
      id: Date.now(), // уникальный id на основе текущего времени
      name: itemName,
      price: numericPrice
    }

    // Добавляем новый товар в существующий массив с помощью оператора spread (...)
    setItems([...items, newItem])

    // Очищаем поля ввода
    setItemName('')
    setItemPrice('')
  }

  // Функция удаления товара по его id
  const handleDeleteItem = (idToDelete) => {
    // Оставляем только те товары, id которых не совпадает с удаляемым
    const updatedItems = items.filter((item) => item.id !== idToDelete)
    setItems(updatedItems)
  }

  // Считаем общую стоимость всех покупок
  // Метод reduce проходит по массиву и складывает все цены
  const totalPrice = items.reduce((sum, currentItem) => sum + currentItem.price, 0)

  return (
    <div className="app-container">
      <h1>🛒 Мой список покупок</h1>

      {/* Форма для добавления нового товара */}
      <form className="add-form" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Название товара (например, Сыр)"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Цена (сом)"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          min="0"
          step="any"
        />
        <button type="submit" className="add-btn">
          Добавить
        </button>
      </form>

      {/* Список товаров */}
      <div className="list-wrapper">
        <h2>Список товаров ({items.length}):</h2>

        {items.length === 0 ? (
          <p className="empty-message">Список покупок пока пуст. Добавьте первый товар!</p>
        ) : (
          <ul className="shopping-list">
            {/* Перебираем массив товаров и для каждого отрисовываем отдельный компонент ShoppingItem */}
            {items.map((item) => (
              <ShoppingItem
                key={item.id}
                name={item.name}
                price={item.price}
                onDelete={() => handleDeleteItem(item.id)}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Блок с общей суммой */}
      <div className="total-box">
        <span>Общая стоимость:</span>
        <strong className="total-amount">{totalPrice} сом</strong>
      </div>
    </div>
  )
}

export default App
