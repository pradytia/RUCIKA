import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavbarComp from './component/Navbar';
import CustomerPage from './pages/customer/CustomerPage';
import LoginPage from './pages/auth/LoginPage';
import OrderPage from './pages/order/OrderPage';
import ProductPage from './pages/product/ProductPage';
import ProfilePages from './pages/profile/ProfiePages';
import SupplierPage from './pages/supplier/SupplierPage';

function App() {
  return (
    <div className="App">
      <NavbarComp/>
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/profile" component={ProfilePages} exact />
        <Route path="/supplier" component={SupplierPage} exact />
        <Route path="/product" component={ProductPage} exact />
        <Route path="/order" component={OrderPage} exact />
        <Route path="/customer" component={CustomerPage} exact />
      </Switch>
    </div>
  );
}

export default App;
