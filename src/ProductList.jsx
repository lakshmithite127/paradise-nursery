import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892284-113331b262f2", cost: "$15", description: "Produces oxygen at night." },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313f0761d76a", cost: "$12", description: "Filters indoor air effectively." },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355", cost: "$18", description: "Removes toxins from air." },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b", cost: "$14", description: "Great natural humidifier." },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42", cost: "$20", description: "Striking dark glossy leaves." },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09", cost: "$10", description: "Healing soothing gel properties." }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a", cost: "$16", description: "Calming floral fragrance." },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592417817098-8f3d692ad4c5", cost: "$22", description: "Sweet night-blooming scent." },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5", cost: "$12", description: "Fragrant culinary herb." },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d6270478cad", cost: "$8", description: "Refreshing aromatic leaves." },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc", cost: "$25", description: "Refreshing spa-like aroma." },
        { name: "Geranium", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d", cost: "$14", description: "Citrusy scented foliage." }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207579277-2200ef673197", cost: "$18", description: "Thrives in low light." },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1597055181300-e3633d7f3e86", cost: "$10", description: "Nearly impossible to kill." },
        { name: "Cactus", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9", cost: "$9", description: "Requires minimal water." },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a", cost: "$15", description: "Compact and hardy." },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952", cost: "$24", description: "Extremely resilient." },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b", cost: "$14", description: "Symbol of good luck." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Paradise Nursery</div>
        <div className="navbar-links">
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)}>
            🛒 Cart <span className="cart-badge">{totalCartCount}</span>
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2>{categoryObj.category}</h2>
              <div className="plant-list">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-img" />
                    <h3>{plant.name}</h3>
                    <p className="plant-cost">{plant.cost}</p>
                    <p>{plant.description}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;