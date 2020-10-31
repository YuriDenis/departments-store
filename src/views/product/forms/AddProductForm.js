import React, { useState } from 'react'
import {
    CAlert,
    CButton,
    CForm,
} from '@coreui/react'

import ProductForm from './ProductForm'

const AddProductForm = props => {
	const [ product, setProduct ] = useState(props.initialFormState)

    return (
		<CForm action="" method="post" className="form-horizontal"
			onSubmit={event => {
                event.preventDefault()
                
                product.IDdepartment = event.nativeEvent.target.department.value
                product.IDcategory   = event.nativeEvent.target.category.value

				if (!product.name || !product.IDdepartment || !product.IDcategory) return

                props.addProduct(product)

                setProduct(props.initialFormState)
			}}
		>
            <ProductForm
                departments={props.departments}
                categories ={props.categories}
                product    ={product}
                setProduct ={setProduct}
            />

			<CButton type="submit" variant="outline" size="sm" color="primary">Add new product</CButton>

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

export default AddProductForm
