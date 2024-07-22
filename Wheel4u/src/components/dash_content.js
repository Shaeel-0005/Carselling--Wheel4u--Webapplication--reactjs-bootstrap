import React from 'react';
import Product_handle from '../components/product_handle';
import Cart from '../components/cart';
const MainContent = ({ activeTab }) => {
  return (
    <div className="p-3">
      {activeTab === 'home' && <h2>Home Content</h2>}



      {activeTab === 'Add_Product' &&
      <> 
      <div className='m-5'>
      <h2 style={{color:'black'}}>Add New Product</h2>
      <Product_handle/>
      </div>
      </>
      }



      {activeTab === 'Cart' && 
      <>
      <Cart/>
      </>
      }
    </div>
  );
};

export default MainContent;
