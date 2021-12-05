import React from 'react';
import {  MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer } from 'mdbreact';
import {Button} from 'react-bootstrap'
import Axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { db } from '../../data-dummy/db';
import './tablecustom.css'
import { urlApi } from '../../helper/url';

function CustomerPage(){

    const [listCustomer, setListCustomer] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [inputCustomerID, setInputCustomerID] = React.useState('');
    const [inputCustomerName, setCustomerName] = React.useState('');
    const [inputPhone, setPhone] = React.useState('');
    const [inputAddress, setAddress] = React.useState('');
    const [inputCity, setCity] = React.useState('');
    const [inputProvince, setProvince] = React.useState('');
    const [customerID, setcustomerID]= React.useState('');
    const [editCustomerName, setEditCustomerName] = React.useState('');
    const [editPhone, setEditPhone] = React.useState('');
    const [editAdress, setEditAdress] = React.useState('');
    const [editCity, setEditCity] = React.useState('');
    const [editProvince, setEditProvince] = React.useState('');

    const columns = [
        { dataField: 'customer_id', text: 'Customer Id', sort : true },
        { dataField: 'customer_name', text: 'Customer Name' },
        { dataField: 'phone', text: 'Phone' },
        { dataField: 'address', text: 'Address' },
        { dataField: 'city', text: 'City' },
        { dataField: 'province', text: 'Province' },
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
                    onClick={() => onBtnDelete(row.customer_id)}
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

      
    // React.useEffect(()=> {

    //     getListCustomer();
    // }, [])

    const clickEdit = (value) => {
        setModalEdit(true);
        setcustomerID(value.customer_id);
        setEditCustomerName(value.customer_name);
        setEditPhone(value.phone);
        setEditAdress(value.address);
        setEditCity(value.city);
        setEditProvince(value.province);
    }

    const getListCustomer = () => {

        Axios.get(urlApi + '/api/customer/get-list')
        .then(res => {
            setListCustomer(res.data);
        }).catch(err => console.log(err));
    };


    const onBtnAddNew = () => {

        let data = {};
        data["customer_id"] = inputCustomerID;
        data["customer_name"] = inputCustomerName;
        data["phone"] = inputPhone;
        data["address"] = inputAddress;
        data["city"] = inputCity;
        data["province"] = inputProvince;

        Axios.post(urlApi + '/api/customer/add', data)
        .then(res => {
            alert('Insert Berhasil')
            setModal(false);
            getListCustomer();
        })
        .catch(err => console.log(err))
    }

    const onBtnDelete = (id) => {
        let data = {};
        data["id"] = id;
        if(window.confirm('Yakin Mau Hapus ?')){
            Axios.post(urlApi + '/api/customer/delete' , data)
            .then(res => {
                alert('Delete Berhasil')
                getListCustomer();
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    const onBtnSaveEdit = () => {

        let data = {};

        data["customer_name"] = editCustomerName;
        data["phone"] = editPhone;
        data["address"] = editAdress;
        data["city"] = editCity;
        data["province"] = editProvince;

        Axios.put( urlApi + '/api/customer/edit/' + customerID, data)
        .then(res => {
            setModalEdit(false);
            alert('Edit Berhasil');
            getListCustomer();
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
        <div className="container mt-5">
            <h1 className="text-center">Customer Management</h1>
        <div className="row mt-5">
            <div className="col">
                <MDBBtn onClick={()=> setModal(true)} style={{float : 'right'}}>New</MDBBtn>
                <BootstrapTable 
                    bootstrap4
                    keyField='customer_id' 
                    data={db.customer} 
                    columns={columns}
                    defaultSorted={defaultSorted} 
                    pagination={pagination} 
                    striped bordered={true}
                    wrapperClasses="table-responsive" 
                />      
            </div>
        </div>
        </div>

        {/* modal */}

        <MDBContainer>
            <MDBModal isOpen={modal} toggle={()=> setModal(false)}>
                <MDBModalHeader toggle={()=> setModal(false)}>Add Customer</MDBModalHeader>
                <MDBModalBody>
                    <div class="form-group">
                        <label>Customer ID</label>
                        <input type="text" className="form-control" placeholder="Customer ID" onChange={(e) => setInputCustomerID(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Customer Name</label>
                        <input type="text" class="form-control" placeholder="Customer Name" onChange={(e) => setCustomerName(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="number" class="form-control" placeholder="Phone" onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" class="form-control" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" class="form-control" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Province</label>
                        <input type="text" class="form-control" placeholder="Province" onChange={(e) => setProvince(e.target.value)}/>
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
                <MDBModalHeader toggle={()=> setModalEdit(false)}>Edit Customer</MDBModalHeader>
                <MDBModalBody>
                    <div class="form-group">
                        <label>Customer ID</label>
                        <input type="text" className="form-control" placeholder={customerID} disabled/>
                    </div>
                    <div class="form-group">
                        <label>Customer Name</label>
                        <input type="text" className="form-control"  value={editCustomerName} onChange={(e)=> setEditCustomerName(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="text" className="form-control"  value={editPhone} onChange={(e)=> setEditPhone(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control"  value={editAdress} onChange={(e)=> setEditAdress(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" className="form-control"  value={editCity} onChange={(e)=> setEditCity(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Province</label>
                        <input type="text" className="form-control"  value={editProvince} onChange={(e)=> setEditProvince(e.target.value)}/>
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

export default CustomerPage;