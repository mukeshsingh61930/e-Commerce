import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Cart({ cart }) {

    const carts = JSON.parse(localStorage.getItem('cart')) || [];
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const total = carts.reduce((acc, item) => {
            return acc = (item.price * item.quantity)
        }, 0)
        setTotal(total)
        cart(total)
    }, [carts])
    const navigate = useNavigate()

    const handleInc = (id) => {
        const updatedCart = carts.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        navigate("/cart")
    }

    const handleDec = (id) => {
        const updatedCart = carts.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        navigate("/cart")
    }

    const removeProduct = (id) => {
        const updatedCart = carts.filter(item => item.id != id)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        navigate("/cart")
    }

    if (carts.length == 0) {
        return <div><h1>Cart is empty</h1></div >
    }


    return (
        <div className="cart">

            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row">
                        <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5" style={{ border: "1px solid black" }}>
                            <div className="table-responsive" >
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="border-0 bg-light">
                                                <div className="p-2 px-3 text-uppercase">Product</div>
                                            </th>

                                            <th scope="col" className="border-0 bg-light">
                                                <div className="py-2 text-uppercase">Price</div>
                                            </th>
                                            <th scope="col" className="border-0 bg-light">
                                                <div className="py-2 text-uppercase">Quantity</div>
                                            </th>
                                            <th scope="col" className="border-0 bg-light">
                                                <div className="py-2 text-uppercase">Total</div>
                                            </th>
                                            <th scope="col" className="border-0 bg-light">
                                                <div className="py-2 text-uppercase">Remove</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            carts?.map(cart => {
                                                return <tr>
                                                    <div>
                                                        <img src={cart?.image} alt="" width="70" className="img-fluid rounded shadow-sm" />
                                                        <div className="ms-3 d-inline-block align-middle">
                                                            <h5 className="mb-0"> <a href="#" className="text-dark d-inline-block align-middle">{cart?.title}</a></h5>
                                                        </div>
                                                    </div>
                                                    <td className="border-0 align-middle"><strong>{cart?.price}</strong></td>

                                                    <td className="border-0 align-middle"> <span onClick={() => handleDec(cart.id)}><RemoveIcon /></span><strong>{cart?.quantity}</strong><span onClick={() => handleInc(cart.id)}><AddIcon /></span></td>

                                                    <td className="border-0 align-middle"><strong>{cart?.price * cart?.quantity}</strong></td>

                                                    <td className="border-0 align-middle"><button className='btn btn-danger mx-2' onClick={() => removeProduct(cart?.id)}
                                                    >Delete</button></td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    <div className="row py-5 p-4 bg-white rounded shadow-sm">

                        <div className="col-lg-6">
                            <div className="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Order summary </div>
                            <div className="p-4">
                                <p className="mb-4"><em>Shipping and additional costs are calculated based on values you have entered.</em></p>
                                <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>${total}</strong></li>
                                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>10.00</strong></li>

                                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                        <h5 className="fw-bold">{(total + 10).toFixed(2)}</h5>
                                    </li>
                                </ul><Link to="/payment" className="btn btn-dark rounded-pill py-2 d-md-block">Procceed to checkout</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>

    );
}

export default Cart


