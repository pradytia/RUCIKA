import React from 'react';
// import Axios from 'axios';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { db } from '../../data-dummy/db';

function LoginPage(){
    
    const[username, setUsername] = React.useState('');
    const[password, setPassword] = React.useState('');
    const [loader, setLoader] = React.useState(false);

    const onBtnLogin = (e) => {

        e.preventDefault();

        setLoader(true)

        if(username === db.users[0].username && password === db.users[0].password){
            localStorage.setItem("id",  db.users[0].id);
            localStorage.setItem("name", username);
            setTimeout(() => {
                setLoader(false)
                window.location = '/customer';
                }, 2000)
        }else if(username === db.users[0].username && password !== db.users[0].password){
            setTimeout(() => {
                setLoader(false)
                alert('password salah')
                }, 2000)
        }else if(username !== db.users[0].username && password === db.users[0].password){
            setTimeout(() => {
                setLoader(false)
                alert('user salah')
                }, 2000)
        }else{
            setTimeout(() => {
                setLoader(false)
                alert('user tidak dikenal')
                }, 2000)
        }
    }

    return(
        <Container>
            <Row className='justify-content-center mt-4 pt-4'>
                <Col md="5">
                    <form>
                    <p className="h4 text-center mb-4">Sign in</p>
                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                        Your Username
                    </label>
                    <input type="text" id="defaultFormLoginEmailEx" className="form-control" onChange={(e)=> setUsername(e.target.value)}/>
                    <br />
                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                        Your Password
                    </label>
                    <input type="password" id="defaultFormLoginPasswordEx" className="form-control"  onChange={(e)=> setPassword(e.target.value)}/>
                    <div className="text-center mt-4">
                    {
                        loader === true 
                        ?
                        <Button variant="primary" disabled>
                            <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />
                            Loading...
                        </Button>
                        :
                        <Button color="indigo" type="submit" onClick={(e)=>onBtnLogin(e)}>Login</Button>                    
                    }
                     </div>
                    </form>
                </Col>
            </Row>
      </Container>
    )
}

export default LoginPage;