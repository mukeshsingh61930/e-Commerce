import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Product() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [product, setProduct] = useState({})
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data = await response.json();
            setProduct(data)
        }
        fetchProduct()
    }, [])

    const handleCart = (product, redirect) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isProductExist = cart.find(item => item.id === product.id)
        if (isProductExist) {
            const updatedCart = cart.map(item => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item
            })
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        } else {
            localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity: 1 }]))
            navigate("/cart")
        }
        alert("product added to cart")
        if (redirect) {
            navigate("/cart")
        }
    }

    !Object.keys(product).length > 0 && <div>Product not found</div>
    return (
        <div className="card mb-3" style={{
            width: "600px", height: "350px"
        }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={product?.image} className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title fw-lighter">{product?.category}</h5>
                        <h4 className="card-title">{product?.title}</h4>
                        <p className="card-text">{product?.description}</p>
                        <h3 className="card-text" style={{ float: "left" }}>{product?.price}</h3>
                        <button style={{ margin: "0 20px", backgroundColor: "blue" }} onClick={() => handleCart(product, true)}>buy it</button>
                        <button style={{ backgroundColor: "blue" }} onClick={() => handleCart(product)}>add to cart</button>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Product
