import { useState } from 'react'
import './App.css'

// Пример использования переменной окружения (задаётся в настройках Vercel)
const API_KEY = import.meta.env.VITE_API_KEY || 'не задан'

function App() {
  const [tasks, setTasks] = useState([])
  const [value, setValue] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    setTasks([...tasks, { id: Date.now(), text: value, done: false }])
    setValue('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <div className="app">
      <h1>TodoList</h1>
      <form onSubmit={addTask} className="form">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Новая задача..."
        />
        <button type="submit">Добавить</button>
      </form>
      <ul className="list">
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            <button onClick={() => removeTask(task.id)}>×</button>
          </li>
        ))}
      </ul>
      <p className="env-status">
        Статус переменной окружения API_KEY: {API_KEY === 'не задан' ? 'не задан' : 'задан'}
      </p>
    </div>
  )
}

export default App
