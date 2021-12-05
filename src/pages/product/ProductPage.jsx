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

function ProductPage(){

    const [listProduct, setListProduct] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [inputProductID, setInputProductID] = React.useState('');
    const [inputProductName, setInputProductName] = React.useState('');
    const [inputSupplierName, setInputSupplierName] = React.useState('');
    const [inputProductPrice, setInputProductPrice] = React.useState('');
    const [inputStock, setInputStock] = React.useState('');
    const [editProductID, setEditProductID]= React.useState('');
    const [editProductName, setEditProductName] = React.useState('');
    const [editSupplierName, setEditSupplierName] = React.useState('');
    const [editProductPrice, setEditProductPrice] = React.useState('');
    const [editStock, setEditStock] = React.useState('');

    const columns = [
        { dataField: 'product_id', text: 'Product Id', sort: true },
        { dataField: 'product_name', text: 'Product Name'},
        { dataField: 'supplier_name', text: 'Supplier Name' },
        { dataField: 'product_price', text: 'Product Price' },
        { dataField: 'stock', text: 'Stock' },
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
                    onClick={() => onBtnDelete(row.product_id)}
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

    //     getListProduct();
    // }, [])

    const clickEdit = (value) => {
        setModalEdit(true);
        setEditProductID(value.product_id);
        setEditProductName(value.product_name);
        setEditSupplierName(value.supplier_name);
        setEditProductPrice(value.product_price);
        setEditStock(value.stock)
    }

    const getListProduct = () => {

        Axios.get(urlApi + '/api/product/get-list')
        .then(res => {
            setListProduct(res.data);
        }).catch(err => console.log(err));
    };

    const onBtnAddNew = () => {

        let data = {};
        data["product_id"] = inputProductID;
        data["product_name"] = inputProductName;
        data["supplier_name"] = inputSupplierName;
        data["product_price"] = inputProductPrice;
        data["stock"] = inputStock;

        Axios.post(urlApi + '/api/product/add', data)
        .then(res => {
            alert('Insert Berhasil')
            setModal(false);
            getListProduct();
        })
        .catch(err => console.log(err))
    }

    const onBtnDelete = (id) => {
        let data = {};
        data["id"] = id;
        if(window.confirm('Yakin Mau Hapus ?')){
            Axios.post( urlApi + '/api/product/delete' , data)
            .then(res => {
                alert('Delete Berhasil')
                getListProduct();
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    const onBtnSaveEdit = () => {

        let data = {};

        data["product_name"] = editProductName;
        data["supplier_name"] = editSupplierName;
        data["product_price"] = editProductPrice;
        data["stock"] = editStock;

        Axios.put(urlApi + 'api/product/edit/' + editProductID, data)
        .then(res => {
            setModalEdit(false);
            alert('Edit Berhasil');
            getListProduct();
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
        <div className="container mt-5">
            <h1 className="text-center">Product Management</h1>
        <div className="row mt-5">
            <div className="col">
            <MDBBtn onClick={()=> setModal(true)} style={{float : 'right'}}>New</MDBBtn>

            <BootstrapTable 
                keyField='id' 
                data={db.products} 
                columns={columns} 
                defaultSorted={defaultSorted} 
                pagination={pagination} 
                striped bordered={true}
                wrapperClasses="table-responsive"/>
                
            </div>
        </div>
        </div>

        {/* modal */}

        <MDBContainer>
            <MDBModal isOpen={modal} toggle={()=> setModal(false)}>
                <MDBModalHeader toggle={()=> setModal(false)}>Add Product</MDBModalHeader>
                <MDBModalBody>
                    <div class="form-group">
                        <label>Product ID</label>
                        <input type="text" className="form-control" placeholder="Product ID" onChange={(e) => setInputProductID(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Product Name</label>
                        <input type="text" className="form-control" placeholder="Product Name" onChange={(e) => setInputProductName(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Supplier Name</label>
                        <input type="text" className="form-control" placeholder="Supplier Name" onChange={(e) => setInputSupplierName(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Product Price</label>
                        <input type="number" class="form-control" placeholder="Product Price" onChange={(e) => setInputProductPrice(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Stock</label>
                        <input type="number" class="form-control"  placeholder="Stock" onChange={(e) => setInputStock(e.target.value)}/>
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
                <MDBModalHeader toggle={()=> setModalEdit(false)}>Edit Product</MDBModalHeader>
                <MDBModalBody>
                    <div class="form-group">
                        <label>Product ID</label>
                        <input type="text" className="form-control" placeholder={editProductID} disabled/>
                    </div>
                    <div class="form-group">
                        <label>Product Name</label>
                        <input type="text" className="form-control" value={editProductName} onChange={(e)=> setEditProductName(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Supplier Name</label>
                        <input type="text" className="form-control" value={editSupplierName} onChange={(e)=> setEditSupplierName(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label >Product Price</label>
                        <input type="number" className="form-control" value={editProductPrice} onChange={(e)=> setEditProductPrice(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label >Stock</label>
                        <input type="number" className="form-control" value={editStock} onChange={(e)=> setEditStock(e.target.value)}/>
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

export default ProductPage;