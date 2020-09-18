/* eslint-disable*/
import React, { useContext, useState } from 'react';
// or less ideally
import { Navbar, Nav, NavDropdown, Jumbotron, Button } from 'react-bootstrap';
import './App.css';
import Data from './data';

import {Link, Route, Switch} from 'react-router-dom';
import Detail from './Detail';
import axios from 'axios';

export const stockContext = React.createContext();

function App() {
  let [shoes, setShoes] = useState(Data);
  const [stock, setStock] = useState([10,11,12]);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg" className="">
        <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/"><Link to="/">Home</Link></Nav.Link>
            
            <Nav.Link as={Link} to="/detail"><Link to="/detail">Detail</Link></Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    
  <Switch>
    <Route path="/" exact>
      <Jumbotron className="background">
        <h1>20% season OFF</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
      <div className="container">

        <stockContext.Provider value={stock}>
          <div className="row">
            {
              shoes.map((undified, i) => {
                return <Card shoes={shoes[i]} shoesNum={i} key={i}/>
              })
            }
          </div>
        </stockContext.Provider>
        <button className="btn btn-primary" onClick={() =>{
          //1. axios.get(데이터 요청할 url)
          axios.get('https://codingapple1.github.io/shop/data2.json')
          //2. 성공하면 .then()
          .then((result) =>{
            setShoes([...shoes, ...result.data])
          })
          //3. 실패하면 .catch()
          .catch(() => {
            console.log('실패했어요');
          })
        }}>더보기</button>
      </div>
    </Route>

    <Route path="/detail/:id">
        <Detail shoes={shoes} stock={stock} setStock={setStock}/>
    </Route>

    <Route path="/:id">
      <div>아무거나 적었을때 이거 보여주셈</div>
    </Route>
  </Switch>


    </div>
  );
}


const Card = (props) => {

const stock = useContext(stockContext);

  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.shoesNum+1}.jpg`} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
      {stock[props.shoesNum]}
    </div>
  )
}


export default App;