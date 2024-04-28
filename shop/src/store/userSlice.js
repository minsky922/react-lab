import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    // name: 'state이름~~',
    // initialState: '값'
    name: 'user',
    initialState: { name: 'kim', age: 20 },
    reducers: {
        changeName(state) {
            state.name = 'park'
        },
        increase(state, a) {
            state.age += a.payload
        },

    }
})

export let { changeName, increase } = user.actions

export default user