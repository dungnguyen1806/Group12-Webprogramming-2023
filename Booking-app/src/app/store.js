import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../screens/admin/redux/authSlice';
import destinationReducer from '../redux/destinationSlice';
import roomReducer from '../redux/roomSlice';
import managerReducer from '../redux/userSlice';
import serviceReducer from '../redux/serviceSlice';
import searchReducer from '../redux/searchSlice';
import statisticalReducer from '../redux/statisticalSlice';

const rootReducer = {
    auth: authReducer,
    destination: destinationReducer,
    room: roomReducer,
    manager: managerReducer,
    service: serviceReducer,
    search: searchReducer,
    statistical: statisticalReducer
}

const store = configureStore({
    reducer: rootReducer
})

export default store;