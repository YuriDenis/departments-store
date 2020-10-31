import React, { Fragment, useState, useEffect } from 'react'
import AddProductForm from '../forms/AddProductForm'
import EditProductForm from '../forms/EditProductForm'
import ProductMngList from './ProductMngList'
import './products.css'

import ProductDataService from "../../../services/ProductService";

const Products = props => {
	// Data

	const initialFormState = { id: null, name: '', IDdepartment: undefined, IDcategory: undefined, registered: '', status: '' }

	// Setting state
	const [ products,       setProducts       ] = useState([])
	const [ departments,    setDepartments    ] = useState([])
	const [ categories,     setCategories     ] = useState([])
    const [ currentProduct, setCurrentProduct ] = useState(initialFormState)
	const [ editing,        setEditing        ] = useState(false)
    const [ message,        setMessage        ] = useState("")

    useEffect(() => {
        retrieveDepartments()
        retrieveCategories()
        retrieveProducts()
    }, [])

    const retrieveDepartments = () => {
        ProductDataService.getDepartments()
            .then(response => {
                setDepartments(response.data)
        })
            .catch(e => {
            console.log(e)
        })
    }

    const retrieveCategories = () => {
        ProductDataService.getCategories()
            .then(response => {
                setCategories(response.data)
        })
            .catch(e => {
            console.log(e)
        })
    }

    const retrieveProducts = () => {
        ProductDataService.getProducts()
            .then(response => {
                setProducts(response.data)
            })
                .catch(e => {
                console.log(e)
            })
    }

    const refreshList = () => {
        retrieveProducts()
        setCurrentProduct(null)
    };
    
	// CRUD operations
	const addProduct = product => {
        product.id = products.length + 1

        ProductDataService.create(product)
            .then(response => {
                setProducts([ ...products, product ])

                refreshList()
                setMessage("The product was added successfully!");
            })
            .catch(e => {
                console.log(e)
            });
	}

	const deleteProduct = id => {
        ProductDataService.remove(id)
            .then(response => {
                setEditing(false)

                refreshList()
                setMessage("The product was deleted successfully!")
            })
            .catch(e => {
                console.log(e)
            });
  	}

	const updateProduct = (updatedProduct) => {
        ProductDataService.update(updatedProduct.id, updatedProduct)
            .then(response => {
                setEditing(false)

                refreshList()
                setMessage("The product was updated successfully!");
            })
            .catch(e => {
                console.log(e)
            });
	}

	const editRow = product => {
		setEditing(true)

        setCurrentProduct({
            id:           product.id,
            name:         product.name,
            IDdepartment: product.IDdepartment,
            IDcategory:   product.IDcategory,
            registered:   product.registered,
            status:       product.status,
        })
	}

	return (
        <div>
            <div>
                {editing ? (
                    <Fragment>
                        <h2>Edit product</h2>
                        <EditProductForm
                            departments={departments}
                            categories={categories}
                            editing={editing}
                            message={message} 
                            setEditing={setEditing}
                            currentProduct={currentProduct}
                            updateProduct={updateProduct}
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        <h2>Add product</h2>
                        <AddProductForm
                            departments={departments}
                            categories={categories}
                            addProduct={addProduct}
                            message={message}
                            initialFormState={initialFormState}/>
                    </Fragment>
                )}

            </div>
            <div className="flex-large">
                <h2>View products</h2>
                <ProductMngList
                    departments={departments}
                    categories={categories}
                    products={products}
                    editRow={editRow}
                    deleteProduct={deleteProduct}
                />
            </div>
        </div>
	)
}

export default Products
