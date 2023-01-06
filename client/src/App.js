import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='add' element={<AddProduct />} />
        <Route path='update/:id' element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
