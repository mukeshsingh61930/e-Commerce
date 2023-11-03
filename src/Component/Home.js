import React, { useEffect, useState } from 'react'
import Products from './Products'


function Home() {

    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products?limit=18')
            const data = await response.json();
            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
        <>
            <h1>Products</h1>
            {
                products.length > 0 ? <Products products={products} />
                    :
                    <div>Loading....</div>
            }
        </>
    )
}

export default Home
