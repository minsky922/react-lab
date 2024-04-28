import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from './../store/userSlice.js';
import { addCount } from '../store.js';
import { memo, useMemo, useState } from 'react';

let Child = memo(function Child() {
    console.log('재랜더링됨')
    return <div>자식임</div>
})

// function 함수() {
//     return '반복문10억번돌린결과';
// }

function Cart() {

    // let result = useMemo(() => { return 함수() }, [])
    /*redux store에 있는 state 가져오기*/
    let state = useSelector((state) => { return state })
    // console.log(a.stock)
    let dispatch = useDispatch()
    let [count, setCount] = useState(0)

    return (
        <div>
            <Child count={count}></Child>
            <button onClick={() => { setCount(count + 1) }}>+</button>
            <h6>{state.user.name}{state.user.age}의 장바구니</h6>
            <button onClick={() => { dispatch(increase(100)) }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i) =>
                            <tr key={i}>
                                <td>1</td>
                                <td>{state.cart[i].name}</td>
                                <td>{state.cart[i].count}</td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(addCount(state.cart[i].id))
                                    }}>+</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart