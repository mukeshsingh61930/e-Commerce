import React from 'react'
import { Link } from 'react-router-dom';


function Products({ products = [] }) {

    return (
        <div className='container px-5 py-24 mx-auto'>
            <div className="row">
                {
                    products.map((element) => {
                        const { id, price, title, category, description, image } = element;
                        const halfLength = Math.ceil(title.length / 4);
                        const firstHalf = description.slice(0, halfLength);
                        return <div className="col-sm-2">
                            <div className="card" style={{ margin: "10px" }}>
                                <img src={image} className="card-img-top" alt="" style={{ width: "150px", height: "200px" }} />
                                <div className="card-body">
                                    <p className="card-title">{category}</p>
                                    <p className="card-title fw-bold">{firstHalf}</p>
                                    <p className="card-text">{price}</p>
                                    <Link to={`/products/${id}`} className="btn btn-primary">Buy Now</Link>
                                </div>
                            </div>
                        </div>

                    })
                }
            </div>
        </div >
    )
}

export default Products
