import React from 'react';
import {  MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer } from 'mdbreact';
import {Button} from 'react-bootstrap'
import Axios from 'axios';
import { db } from '../../data-dummy/db';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { urlApi } from '../../helper/url';

function OrderPage(){

    const [orderID, setOrderID] = React.useState("");
    const [customerName] = React.useState("");
    const [productName, setProductName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [quantity, setquantity] = React.useState("");
    const [listOrder, setListOrder] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [inputOrderID, setInputOrderID] = React.useState('');
    const [inputProductName, setInputProductName] = React.useState('');
    const [inputCustomerName, setInputCustomerName] = React.useState('');
    const [inputOrderDate, setInputOrderDate] = React.useState('');
    const [inputPrice, setInputPrice] = React.useState('');
    const [inputQuantity, setInputQuantity] = React.useState('');
    const [editOrderID, setEditOrderID]= React.useState('');
    const [editProductName, setEditProductName] = React.useState('');
    const [editCustomerName, setEditCustomerName] = React.useState('');
    const [editOrderDate, setEditOrderDate] = React.useState('');
    const [editPrice, setEditPrice] = React.useState('');
    const [editQuantity, setEditQuantity] = React.useState('');

    const columns = [
        { dataField: 'order_id', text: 'Order Id', sort: true},
        { dataField: 'product_name', text: 'Product Name'},
        { dataField: 'customer_name', text: 'Customer Name' },
        { dataField: 'order_date', text: 'Order Date' },
        { dataField: 'price', text: 'Price' },
        { dataField: 'quantity', text: 'Quantity' },
        { dataField: 'status', text: 'Status' },
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
                    onClick={() => onBtnDelete(row.order_id)}
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

    //     getListOrder();
    // }, [])

    const clickEdit = (value) => {
        setEditOrderID(value.order_id)
        setEditProductName(value.product_name)
        setEditCustomerName(value.customer_name)
        setEditOrderDate(value.order_date)
        setEditPrice(value.price);
        setEditQuantity(value.quantity);
        setModalEdit(true);
    }

    const getListOrder = () => {

        Axios.get(urlApi + '/api/order/get-list')
        .then(res => {
            setListOrder(res.data);
            console.log(res.data)
        }).catch(err => console.log(err));
    };

   
    const onBtnAddNew = () => {

        let data = {};
        data["order_id"] = inputOrderID;
        data["product_name"] = inputProductName;
        data["customer_name"] = inputCustomerName;
        data["order_date"] = inputOrderDate;
        data["price"] = inputPrice;
        data["quantity"] = inputQuantity;

        Axios.post(urlApi + '/api/order/add', data)
        .then(res => {
            alert('Insert Berhasil')
            setModal(false);
            getListOrder();
        })
        .catch(err => console.log(err))
    }

    const onBtnDelete = (id) => {
        let data = {};
        data["id"] = id;
        if(window.confirm('Yakin Mau Hapus ?')){
            Axios.post(urlApi + '/api/order/delete' , data)
            .then(res => {
                alert('Delete Berhasil')
                getListOrder();
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    const onBtnSaveEdit = () => {

        let data = {};

        data["product_name"] = editProductName;
        data["customer_name"] = editCustomerName;
        data["order_date"] = editOrderDate;
        data["price"] = editPrice;
        data["quantity"] = editQuantity;

        Axios.put(urlApi + '/api/order/edit/' + editOrderID, data)
        .then(res => {
            setModalEdit(false);
            alert('Edit Berhasil');
            getListOrder();
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
        <div className="container mt-5">
            <h1 className="text-center">Order Management</h1>
        <div className="row mt-5">
            <div className="col">
                <MDBBtn onClick={()=> setModal(true)} style={{float : 'right'}}>New</MDBBtn>
                <BootstrapTable
                 keyField='id' 
                 data={db.order} 
                 columns={columns} defaultSorted={defaultSorted}  pagination={pagination} striped bordered={true}
                 wrapperClasses="table-responsive" />          
            </div>
        </div>
        </div>

        {/* modal */}

        <MDBContainer>
            <MDBModal isOpen={modal} toggle={()=> setModal(false)}>
                <MDBModalHeader toggle={()=> setModal(false)}>Add Order</MDBModalHeader>
                    <MDBModalBody>
                        <div className="form-group">
                            <label>Order ID</label>
                            <input type="text" className="form-control" placeholder="Order ID" onChange={(e) => setInputOrderID(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Product Name</label>
                            <input type="text" className="form-control" placeholder="Product Name" onChange={(e) => setInputProductName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Customer Name</label>
                            <input type="text" className="form-control" placeholder="Customer Name" onChange={(e) => setInputCustomerName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Order Date</label>
                            <input type="text" className="form-control" placeholder="Order Date" onChange={(e) => setInputOrderDate(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="number" className="form-control" placeholder="Price" onChange={(e) => setInputPrice(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input type="number" className="form-control" placeholder="Quantity" onChange={(e) => setInputQuantity(e.target.value)}/>
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
                <MDBModalHeader toggle={()=> setModalEdit(false)}>Edit Order</MDBModalHeader>
                    <MDBModalBody>
                        <div class="form-group">
                            <label>Order ID</label>
                            <input type="text" className="form-control" placeholder={editOrderID} disabled/>
                        </div>
                        <div class="form-group">
                            <label>Product Name</label>
                            <input type="text" className="form-control" placeholder={editProductName} disabled/>
                        </div>
                        <div class="form-group">
                            <label>Customer Name</label>
                            <input type="text" className="form-control" placeholder={editCustomerName} disabled/>
                        </div>
                        <div class="form-group">
                            <label>Order Date</label>
                            <input type="text" className="form-control" placeholder={editOrderDate} onChange={(e)=> setEditOrderDate(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label>Price</label>
                            <input type="number" className="form-control" placeholder={editPrice} disabled/>
                        </div>
                        <div class="form-group">
                            <label>Quantity</label>
                            <input type="number" className="form-control" value={editQuantity} onChange={(e)=> setEditQuantity(e.target.value)}/>
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

export default OrderPage;