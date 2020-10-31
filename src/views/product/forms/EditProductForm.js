import React, { useState, useEffect } from 'react'
import {
    CAlert,
    CButton,
    CForm,
} from '@coreui/react' 

import ProductForm from './ProductForm'

const EditProductForm = props => {
    const [ product, setProduct ] = useState(props.currentProduct)

    useEffect(() => 
        {
            setProduct(props.currentProduct)
        },
        [ props ]
    )

    return (
        <CForm action="" method="post" className="form-horizontal"
            onSubmit={event => {
                event.preventDefault()

                product.IDdepartment = event.nativeEvent.target.department.value
                product.IDcategory   = event.nativeEvent.target.category.value

                props.updateProduct(product)
            }}
        >
            <ProductForm
                departments={props.departments}
                categories={props.categories}
                product={product}
                setProduct={setProduct}
            />

            <CButton type="submit" variant="outline" size="sm" color="primary" className="mr-1">Update product</CButton>
            <CButton               variant="outline" size="sm" color="dark" onClick={() => props.setEditing(false)}>
                Cancel
            </CButton>
            <CAlert
                color="info"
                className="float-right"
                closeButton
            >
                {props.message}
            </CAlert>
        </CForm>
    )
}

export default EditProductForm
