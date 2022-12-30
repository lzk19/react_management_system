import './App.css';
import routes from './router/index'
import { useRoutes, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
function App() {
  const element = useRoutes(routes)
  return (
    <div className='App'>
      {element}
    </div>
  )
}
export default App;
