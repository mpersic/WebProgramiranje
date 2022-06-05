import React, { useContext } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'

export const Products = () => {

    const { products } = useContext(ProductsContext);

    const { dispatch } = useContext(CartContext);

    let x = 0;
    let y = 0;

    const displayInfo = (productId) => {
        let infobox = document.getElementById(productId);

        let text = x > window.innerWidth / 4 * 3 ? "active-box-left" : "active-box-right"

        infobox.setAttribute("class", text);
        infobox.innerHTML="row1<br>row2<br>row3<br>roe4<br>row5";
    } 

    const hideInfo = (productId) => {
        let infobox = document.getElementById(productId);
        infobox.innerHTML="";
    } 

    const handleWindowMouseMove = event => {
        x = event.screenX;
        y = event.screenY;
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return (
        <>
            {products.length !== 0}
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img' onMouseEnter={() => displayInfo(product.ProductID)} onMouseLeave={() => hideInfo(product.ProductID)}>
                            <div className='img-wrapper hover-zoom'>
                                <img src={product.ProductImg} alt="not found"/>
                            </div> 
                            <div className='hover-zoom' id={product.ProductID}></div>
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            Kn {product.ProductPrice}.00
                    </div>
                        <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    )
}
