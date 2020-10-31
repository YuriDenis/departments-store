import React, { Fragment, useState, useEffect } from 'react'
import {
    CCol,
    CFormGroup,
    CInput,
    CLabel,
    CSelect,
} from '@coreui/react'

const ProductForm = props => {
    const filterCategories = IDdepartment => {
        return IDdepartment ? props.categories.filter(item => item.IDdepartment.toString() === IDdepartment.toString()) : []
    }

    const product = props.product
    const [ categoriesDepartment, setCategories ] = useState([])
    const [                     , forceUpdate]    = useState(0)
    
    useEffect(() => 
        {
            setCategories(filterCategories(product.IDdepartment))
        },
        [ props ]
    )

	const handleInputChange = event => {
		const { name, value } = event.target

		props.setProduct({ ...product, [name]: value })
	}

	const handleDepartpentChange = event => {
		let value = event.nativeEvent.target.value

        product.IDdepartment = value

        return setCategories(filterCategories(value))
	}

	const handleCategoryChange = event => {
		let value = event.nativeEvent.target.value

        product.IDcategory = value
        
        return forceUpdate(n => !n)
	}

    return (
		<Fragment>
			<CFormGroup row>
				<CCol md="3">
                    <CLabel htmlFor="name">Name</CLabel>
				</CCol>
				<CCol xs="12" md="9">
                    <CInput type="text" name="name" placeholder="Enter product name" value={product.name} onChange={handleInputChange} />
				</CCol>
			</CFormGroup>

			<CFormGroup row>
				<CCol md="3">
					<CLabel htmlFor="department">Department</CLabel>
				</CCol>
				<CCol xs="12" md="9">
                    <CSelect custom name="department" id="department"
                        value={product.IDdepartment}
                        onChange={handleDepartpentChange}
                    >
                        {props.departments.length > 0 ? (
                            <Fragment>
                                <option value={0}>Select a department</option>
                                {props.departments.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </Fragment>
                        ) : (
                            <option>No departments</option>
                        )}
                    </CSelect>
				</CCol>
			</CFormGroup>

			<CFormGroup row>
				<CCol md="3">
					<CLabel htmlFor="category">Category</CLabel>
				</CCol>
				<CCol xs="12" md="9">
                {console.log(product.IDcategory)}
                    <CSelect custom name="category" id="category"
                        value={product.IDcategory}
                        onChange={handleCategoryChange}
                    >
                        {categoriesDepartment.length > 0 ? (
                            <Fragment>
                                <option value={0}>Select a category</option>
                                {categoriesDepartment.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </Fragment>
                        ) : (
                            <option>No categories</option>
                        )}
                    </CSelect>
				</CCol>
			</CFormGroup>
		</Fragment>
	)
}

export default ProductForm
