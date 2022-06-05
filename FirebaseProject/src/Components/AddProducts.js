import React, { useState, useEffect } from 'react'
import { auth, storage, db } from '../Config/Config'
import { Navbar } from './Navbar'
import { useHistory } from 'react-router-dom'


export const AddProducts = ({ user }) => {

    const [productName, setProductName] = useState('');
    const [productLocation, setProductLocation] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productSeller, setProductSeller] = useState('');
    const [productSellerEmail, setProductSellerEmail] = useState('');
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const history = useHistory();

    const types = ['image/png', 'image/jpeg']; // image types

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).onSnapshot(snapshot => {
                    setProductSeller(snapshot.data().Name);
                    setProductSellerEmail(snapshot.data().Email);
                })
            }
            else {
                history.push('/login')
            }
        })
    })

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    

    // add product
    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url,
                        ProductLocation: productLocation,
                        ProductSeller: productSeller,
                        ProductSellerEmail : productSellerEmail
                    }).then(() => {
                        setProductName('');
                        setProductPrice(0);
                        setProductImg('');
                        setError('');
                        setProductLocation('');
                        setProductSeller('');
                        document.getElementById('file').value = '';
                        setSuccessMsg('Your item has been uploaded successfully. You will be redirected to home page after 5 seconds');
                        setTimeout(() => {
                        history.push('/')
                    }, 5000)
                    }).catch(err => setError(err.message))
                })
            })
    }

    return (
        <>
        <Navbar user={user} />

        <div className='container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="name">Seller User Name</label>
                    <input type="text" className='form-control' required
                        value={productSeller} disabled />
                    <br />
                <label htmlFor="name">Seller Email</label>
                    <input type="text" className='form-control' required
                        value={productSellerEmail} disabled />
                    <br />
                <label htmlFor="product-name">Product Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />
                <label htmlFor="product-location">Product Location</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductLocation(e.target.value)} value={productLocation} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br />
                <label htmlFor="product-img">Product Image</label>
                <input type="file" className='form-control' id="file" required
                    onChange={productImgHandler} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
        </>
    )
}
