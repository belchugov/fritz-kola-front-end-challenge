import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Quontity from './Quontity';

function App() {
  const axios = require('axios').default;
  const url = 'https://fritz-kola-challenge.s3-eu-west-1.amazonaws.com/products.json';
  const [products, setProducts] = useState();
  const [total, setTotal] = useState(0);

  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.name === product.name);
    if (exist) {
      setCartItems(
        cartItems.map((x) => (x.name === product.name ? { ...exist, qty: exist.qty + 1 } : x)),
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) => (x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x)),
      );
    }
  };

  useEffect(() => {
    axios({
      method: 'get',
      url,
    })
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axios]);

  const productElement = products?.map((product) => (
    <div className="card" key={product.name}>
      <img className="special-image" src={product.image} alt={product.name} />
      <div className="card-body">
        <span className="price">
          {(product.price).toLocaleString('en-UK', {
            style: 'currency',
            currency: 'GBP',
          })}
        </span>
        <Quontity onAdd={onAdd} onRemove={onRemove} product={product} />
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="row row-cols-4 row-cols-md-3">
        {productElement}
      </div>
      <div>
        Total:
        <span>{total}</span>
      </div>
      <div>
        Number of items in card:
        {cartItems.length}
      </div>
    </div>
  );
}

export default App;
