import React from 'react';
import {  MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer } from 'mdbreact';
import {Button} from 'react-bootstrap'
import Axios from 'axios';
import { urlApi } from '../../helper/url';
import { db } from '../../data-dummy/db';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

function SupplierPage(){

    const [supplierID, setSupplierID] = React.useState("");
    const [supplierName, setSupplierName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [listSupplier, setListSupplier] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [inputSupplierID, setInputSupplierID] = React.useState('');
    const [inputSupplierName, setInputSupplierName] = React.useState('');
    const [inputAddress, setInputAddress] = React.useState('');
    const [editID, setEditID]= React.useState('');
    const [editSupplierID, setEditSupplierID] = React.useState('');
    const [editSupplierName, setEditSupplierName] = React.useState('');
    const [editAddress, setEditAddress] = React.useState('');
    
    const columns = [
        { dataField: 'supplier_id', text: 'Supplier Id', sort: true },
        { dataField: 'supplier_name', text: 'Supplier Name', sort: true },
        { dataField: 'address', text: 'Address' },
        {
            text: 'Action',
            formatter: (cellContent, row) => {
                return (
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => clickEdit(row)}
                  >
                    Edit
                  </Button>
                );
              },
        },
        {
            text: 'Action',
            formatter: (cellContent, row) => {
                return (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onBtnDelete(row.supplier_id)}
                  >
                    Delete
                  </Button>
                );
              },
        }
      ];

      const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
      }];

      const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        // showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
        }
      });

    React.useEffect(()=> {

        getListSupplier();
    }, [])

    const clickEdit = (value) => {
        setEditSupplierID(value.supplier_id);
        setEditSupplierName(value.supplier_name);
        setEditAddress(value.address)
        setModalEdit(true);
    }

    const getListSupplier = () => {

        Axios.get(urlApi + '/supplier')
        .then(res => {
            console.log(res.data)
            setListSupplier(res.data);
        }).catch(err => console.log(err));
    };


    const onBtnAddNew = () => {

        let data = {};
        data["supplier_id"] = inputSupplierID;
        data["supplier_name"] = inputSupplierName;
        data["address"] = inputAddress;

        Axios.post(urlApi + '/api/supplier/add', data)
        .then(res => {
            alert('Insert Berhasil')
            setModal(false);
            getListSupplier();
        })
        .catch(err => console.log(err))
    }

    const onBtnDelete = (id) => {
        let data = {};
        data["id"] = id;
        if(window.confirm('Yakin Mau Hapus ?')){
            Axios.post(urlApi + '/api/supplier/delete' , data)
            .then(res => {
                alert('Delete Berhasil')
                getListSupplier();
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    const onBtnSaveEdit = () => {

        let data = {};

        data["supplier_name"] = inputSupplierName;
        data["address"] = inputAddress;

        Axios.put(urlApi + '/api/supplier/edit/' + editID, data)
        .then(res => {
            setModalEdit(false);
            alert('Edit Berhasil');
            getListSupplier();
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
        <div className="container mt-5">
            <h1 className="text-center">Supplier Management</h1>
        <div className="row mt-5">
            <div className="col">
                <MDBBtn onClick={()=> setModal(true)} style={{float : 'right'}}>New</MDBBtn>
                <BootstrapTable 
                keyField='id' 
                data={db.supplier} columns={columns} 
                defaultSorted={defaultSorted} 
                pagination={pagination} striped bordered={true}
                wrapperClasses="table-responsive"/>
            </div>
        </div>
        </div>

        {/* modal */}

        <MDBContainer>
            <MDBModal isOpen={modal} toggle={()=> setModal(false)}>
                <MDBModalHeader toggle={()=> setModal(false)}>Add Supplier</MDBModalHeader>
                    <MDBModalBody>
                        <div class="form-group">
                            <label>Supplier ID</label>
                            <input type="text" className="form-control" placeholder="Supplier ID" onChange={(e)=> setInputSupplierID}/>
                        </div>
                        <div class="form-group">
                            <label>Supplier Name</label>
                            <input type="text" class="form-control" placeholder="Supplier Name" onChange={(e)=> setInputSupplierName}/>
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" class="form-control" placeholder="Address" onChange={(e)=> setInputAddress}/>
                        </div>
                    </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="primary" onClick={onBtnAddNew}>Submit</MDBBtn>
                    <MDBBtn color="danger" onClick={()=> setModal(false)}>Cancel</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>

        {/* modal edit */}

        <MDBContainer>
            <MDBModal isOpen={modalEdit} toggle={()=> setModalEdit(false)}>
                <MDBModalHeader toggle={()=> setModalEdit(false)}>Edit Supplier</MDBModalHeader>
                    <MDBModalBody>
                        <div class="form-group">
                            <label>Supplier ID</label>
                            <input type="text" className="form-control" placeholder={editSupplierID} disabled/>
                        </div>
                        <div class="form-group">
                            <label>Supplier Name</label>
                            <input type="text" className="form-control" value={editSupplierName}  onChange={(e)=> setEditSupplierName(e.target.value)}/>
                        </div>              
                        <div class="form-group">
                            <label >Address</label>
                            <input type="text" className="form-control" value={editAddress} onChange={(e)=> setAddress(e.target.value)}/>
                        </div>
                    </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="primary" onClick={onBtnSaveEdit}>Save</MDBBtn>
                    <MDBBtn color="danger" onClick={()=> setModalEdit(false)}>Cancel</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>

        </div>
    )

}

export default SupplierPage;