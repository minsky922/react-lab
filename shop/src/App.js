import { lazy, Suspense, useDeferredValue, useEffect, useState, useTransition } from 'react';
import { Button, Nav, Navbar, Container } from 'react-bootstrap';
import './App.module.css';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const Detail = lazy(() => import('./routes/detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));

let a = new Array(5000).fill(0)

function App() {

  let [name, setName] = useState('')
  let [isPending, 늦게처리] = useTransition() //성능개선
  let state = useDeferredValue(name)

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  return (
    <div className="App">
      <input onChange={(e) => {
        늦게처리(() => {
          setName(e.target.value)
        })
      }} />
      {
        isPending ? '로딩중' :
          a.map(() => {
            return <div>{state}</div>
          })
      }

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate("/") }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate("/cart") }}>cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route path='/' element={
            <>
              <div className='main-bg'></div>
              <div className="container">
                <div className="row">
                  {/* <Card shoes={shoes[0]} i={1}></Card>
            <Card shoes={shoes[1]} i={2}></Card>
            <Card shoes={shoes[2]} i={3}></Card> */}
                  {
                    shoes.map((a, i) => {
                      return (
                        <Card shoes={shoes[i]} i={i + 1} key={i}></Card>
                      )
                    }
                    )}
                </div>
              </div>

              <button onClick={() => {
                axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((결과) => {
                    console.log(결과.data)
                    let copy = [...shoes, ...결과.data];
                    setShoes(copy);
                  })
                  .catch(() => {
                    console.log('실패')
                  })

                // fetch('URL')
                // .then(결과 => 결과.json())
                // .then((결과) => { console.log(결과) } )
              }}>더보기</button>
            </>} />
          <Route path='/detail/:id' element={
            <Detail shoes={shoes} />
          } />

          <Route path="/cart" element={<Cart />} />

        /*nested route*/
          <Route path='/about' element={<About />}>
            <Route path='member' element={<div>멤버임</div>} />
            <Route path='location' element={<div>위치정보임</div>} />
          </Route>

          <Route path="*" element={<div>없는페이지요</div>} />
        </Routes>
      </Suspense>
    </div >
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
