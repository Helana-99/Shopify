import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, incrementQuantity, decrementQuantity  } from '../../features/cartslice';
import './cart.css';


const Cart = () => {
  const items = useSelector((state) => state.cart.items || []);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity ||0);
  const totalPrice = useSelector((state) => state.cart.totalPrice ||0);
  const dispatch = useDispatch();

  return (
    <div className="container mt-5 ">
      <h2>Cart</h2>
      {totalQuantity === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table ">
            <thead>
              <tr>  
                <th>image</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Remove</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                 <td className="align-middle">
                    <img src={item.thumbnail} alt='' width="100"  />
                    </td>
                   <td className="align-middle">{item.title}</td>


                 <td className="align-middle">
                    <div className="input-group">
                      <button
                        className="btn btn-sm btn-outline-secondary w-25 "
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      >
                        -
                      </button>
                      <span className="input-group-text">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary w-25"
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </td>
                 <td className="align-middle">
                    <button
                      className="btn btn-danger btn-sm w-25"
                      onClick={() => dispatch(removeItemFromCart(item.id))}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                 <td className="align-middle">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total border border-secondary-subtle d-flex">
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;