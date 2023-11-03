
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Component/Header';
import Home from './Component/Home';
import Product from './Component/Product';
import Cart from './Component/Cart';
import Payment from './Component/Payment';
import { useState } from 'react';


function App() {

  const [amout, setAmout] = useState()
  const cart = (data) => {
    setAmout(data)
  }

  return (
    <div className="App" >
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/products/:id' element={<Product />} />
        <Route exact path='cart' element={<Cart cart={cart} />} />
        <Route exact path='payment' element={<Payment amount={amout} />} />
      </Routes>
    </div>
  );
}

export default App;
