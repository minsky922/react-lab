import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { Nav } from 'react-bootstrap';
import { addItem } from "./../store.js";
import { useDispatch } from "react-redux";
// import { Context1 } from './../App.js'
// import './../App.module.css'

let Box = styled.div`
background : grey;
  padding : 20px;
`
let YellowBtn = styled.button`
  background : ${props => props.bg};
  color :  ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`

function Detail(props) {

    // let { 재고, shoes } = useContext(Context1)

    let { id } = useParams();
    let 찾은상품 = props.shoes.find(function (상품) { return 상품.id == id });
    let [count, setCount] = useState(0)
    let [alert, setAlert] = useState(true)
    let [탭, 탭변경] = useState(0)
    let dispatch = useDispatch()

    /* mount, update시 코드 실행해주는 useEffect */
    /* useEffect안에 적는 코드들은 어려운 연산,
    서버에서 데이터가져오는 작업,
    타이머 장착하는거
    */
    /* 이름이 effect인 이유: 
    side effect: 함수의 핵심기능과 상관없는 부가기능 */
    /*,[]: 빈배열추가하면 mount될때만 실행 */
    /*,[count]: count라는 state가 변할 때만 실행 */
    useEffect(() => {
        let a = setTimeout(() => { setAlert(false) }, 2000)
        /* 서버로 데이터 요청하는 코드 */

        /* useEffect 동작 전에 실행되는 return()=>{} (cleanup function) */
        return () => {
            clearTimeout(a)
            /* 기존 데이터 요청은 제거해주세요~ */
        }
    }, [count])
    return (
        <div className="container">
            {
                alert == true
                    ? <div className="alert alert-warning">
                        2초이내 구매시 할인
                    </div>
                    : null
            }
            {count}
            <button onClick={() => { setCount(count + 1) }}>증가</button>
            <Box>
                <YellowBtn bg="blue">버튼</YellowBtn>
                <YellowBtn bg="orange">버튼</YellowBtn>
            </Box>

            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem({ id: 1, name: 'Red knit', count: 1 }))
                    }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(2) }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭} />
        </div>
    )
}
// function TabContent(props) {
//     if (props.탭 == 0) {
//         return <div>내용0</div>
//     } else if (props.탭 == 1) {
//         return <div>내용1</div>
//     } else if (props.탭 == 2) {
//         return <div>내용2</div>
//     }
// }

function TabContent({ 탭 }) {

    let [fade, setFade] = useState('')
    // let { 재고 } = useContext(Context1)

    useEffect(() => {
        setTimeout(() => {
            setFade('end')
        }, 10)

        return () => {
            setFade('')
        }
    }, [탭])
    return <div className={'start ' + fade} >
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div >
}

export default Detail;