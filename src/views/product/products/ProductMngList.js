import React, { useState } from 'react'
import {
    CButton,
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,

    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const getBadge = status => {
    switch (status) {
        case 'Active':   return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending':  return 'warning'
        case 'Banned':   return 'danger'
        default:         return 'primary'
    }
}

const fields = ['name','department', 'category', 'registered', 'status', '']

const ProductMngList = props => {
    const [ danger, setDanger ] = useState(false)
    const [ IDitem, setIDitem ] = useState(0)

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        Products list
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={props.products}
                            fields={fields}
                            hover
                            striped
                            bordered
                            size="sm"
                            itemsPerPage={10}
                            pagination
                            scopedSlots = {{
                                'department':
                                (item)=>(
                                    <td>
                                        {props.departments.find(dep => dep.id.toString() === item.IDdepartment.toString()).name}
                                    </td>
                                ),

                                'category':
                                (item)=>(
                                    <td>
                                        {props.categories.find(cat => cat.id.toString() === item.IDcategory.toString()).name}
                                    </td>
                                ),

                                'status':
                                (item)=>(
                                    <td>
                                        <CBadge color={getBadge(item.status)}>
                                            {item.status}
                                        </CBadge>
                                    </td>
                                ),

                                '':
                                (item)=>(
                                    <td>
                                        <CButton variant="ghost" color="success" onClick={() => {props.editRow(item)}} className="mr-1">
                                            <CIcon name="cil-pencil" />
                                        </CButton>
                                        <CButton variant="ghost" color="danger"  onClick={() => {setIDitem(item.id); setDanger(!danger)}}>
                                            <CIcon name="cil-x" />
                                        </CButton>
                                    </td>
                                )
                            }}
                        />

                        <CModal
                            show={danger} 
                            onClose={() => setDanger(!danger)}
                            color="danger"
                            size="sm"
                        >
                            <CModalHeader closeButton>
                                <CModalTitle>Confirm Delete!</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                Do you want to delete this item?
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="danger"    onClick={() => {props.deleteProduct(IDitem); setDanger(!danger)}} className="mr-1">Delete</CButton>
                                <CButton color="secondary" onClick={() => setDanger(!danger)}>Cancel</CButton>
                            </CModalFooter>
                        </CModal>

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ProductMngList
