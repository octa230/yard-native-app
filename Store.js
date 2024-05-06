import React, {useReducer, createContext, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';



export const Store =  createContext()

  const initialState ={
    userInfo: null,
    cart: {
       cartItems: [],
       paymentMethod: 'cash',
       shippingAddress: {},
       trip:{}
    }
} 
 

function reducer (state, action){
    switch(action.type){

    case "LOGIN_USER":
        const userInfo = action.payload; 
        //console.log(userInfo);
        const saveUser = async () => {
        try {
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            await AsyncStorage.getItem('userInfo');
            //console.log({"saved user": JSON.parse(savedUser)})
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    saveUser();
    return { ...state, userInfo: userInfo }; 
        case "UPDATE_USER":
            const updatedUserData = action.payload
            const updateUser =async()=> {
                try{
                    await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserData))
                    const savedUser = await AsyncStorage.getItem('userInfo')
                    //console.log(savedUser)
                }catch(error){
                    console.log(error)
                }

            }
            updateUser()
            return {...state, userInfo: updatedUserData}
            
        case "LOGOUT_USER":
            const removeUser = async()=> {
                try{
                    await AsyncStorage.removeItem('userInfo')
                }catch(error){
                    console.log(error)
                }
            }
            removeUser()
            return {...state, userInfo: null}
            
        case "PAYMENT_METHOD_SAVE":
            const method = action.payload
            const updatePaymentMethod = async()=> {
                try{
                    await AsyncStorage.setItem('paymentMethod', JSON.stringify(method))
                }catch(error){
                    console.log(error)
                }
            }
            updatePaymentMethod()
            return {...state, cart: {...state.cart, paymentMethod: method}}

        case "SAVE_ADDRESS":
            const ShippingAddress = action.payload
            const updateAddress =async()=> {
                try{
                    await AsyncStorage.setItem('shippingAddress', JSON.stringify(ShippingAddress))
                }catch(error){
                    console.log(error)
                }
            }
            updateAddress()
            return {...state, cart: {...state.cart, shippingAddress: ShippingAddress}}

        case "CART_REMOVE_ITEM":
            const itemIdToRemove = action.payload;
            const updateCartItems = state.cart.cartItems.filter(item => item._id !== itemIdToRemove);
            
            // Update AsyncStorage
            const updateStorage = async () => {
                try {
                        await AsyncStorage.setItem('cartItems', JSON.stringify(updateCartItems));
                    } catch (error) {
                        console.log('Error storing cartItems in AsyncStorage:', error);
                    }
                };
            
            updateStorage(); // Call the async function
            
            return { ...state, cart: { ...state.cart, cartItems: updateCartItems } };
        case 'EMPTY_CART':
            const removeCartItems = async()=>{
                try{
                    await AsyncStorage.removeItem('cartitems')
                }catch(error){
                    console.log(error)
                }
            }
            removeCartItems()
            return {...state, cart:{ ...state.cart, cartItems: []}}

        case "BOOK_TRIP":
            const newTrip = action.payload;
            const existingTrip = state.cart.trip;
            
                // Check if the trip already exists in cart
            if (existingTrip && existingTrip._id === newTrip._id) {
                // If trip already exists in cart, update bookedWeight
                const updatedTrip = {
                    ...existingTrip,
                    bookedWeight: (existingTrip.bookedWeight || 0) + parseInt(newTrip.quantity)
                };
            
                // Update AsyncStorage for the trip
                const bookTrip = async () => {
                    try {
                        await AsyncStorage.setItem('trip', JSON.stringify(updatedTrip));
                    } catch (error) {
                        console.log(error);
                    }
                }
                bookTrip();
            
                return { ...state, cart: { ...state.cart, trip: updatedTrip } };
            } else {
                    // If trip does not exist in cart, add it with the bookedWeight
                const updatedTrip = {
                    ...newTrip,
                    bookedWeight: parseInt(newTrip.quantity)
                };
            
                // Update AsyncStorage for the trip
                const bookTrip = async () => {
                    try {
                        await AsyncStorage.setItem('trip', JSON.stringify(updatedTrip));
                    } catch (error) {
                        console.log(error);
                    }
                }
                bookTrip();
            
                return { ...state, cart: { ...state.cart, trip: updatedTrip } };
            }
        case "UNBOOK_TRIP":
            const removeTrip=async()=>{
                try{
                    await AsyncStorage.removeItem('trip')
                }catch(error){
                    console.log(error)
                }
            }
            removeTrip()
            return{...state, cart:{...state.cart, trip:{}}}
            
        case "ADD_CART_ITEM":
                const newItem = action.payload;
                const existItemIndex = state.cart.cartItems.findIndex(
                    (item) => item._id === newItem._id
                );
            
                let updatedCartItems;
                if (existItemIndex !== -1) {
                    // If item exists, update it
                    updatedCartItems = [...state.cart.cartItems];
                    updatedCartItems[existItemIndex] = { ...newItem };
                } else {
                    // If item doesn't exist, add it to cart
                    updatedCartItems = [...state.cart.cartItems, newItem];
                }
            
                // Update total price
                const totalUGX = updatedCartItems.reduce((total, item) => {
                    return total + (item.ugx || item.price * item.quantity);
                }, 0);
            
                // AsyncStorage operation
                const updateAsyncStorage = async () => {
                    try {
                        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                    } catch (error) {
                        console.log('Error storing cartItems in AsyncStorage:', error);
                    }
                };
            
                updateAsyncStorage(); // Call the async function
            
                return { ...state, cart: { ...state.cart, cartItems: updatedCartItems, itemsPrice: totalUGX } };
        case "SET_STATE":
            return {...action.payload}
            
        default:
            return state;

    }
}

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch userInfo from AsyncStorage
                const userInfo = await AsyncStorage.getItem('userInfo');
                const cartItems = await AsyncStorage.getItem('cartItems');
                const paymentMethod = await AsyncStorage.getItem('paymentMethod');
                const shippingAddress = await AsyncStorage.getItem('shippingAddress');
                const trip = await AsyncStorage.getItem('trip')
                
                const newState = {
                    userInfo: userInfo ? JSON.parse(userInfo) : null,
                    cart: {
                        cartItems: cartItems ? JSON.parse(cartItems) : [],
                        paymentMethod: paymentMethod ? JSON.parse(paymentMethod) : '',
                        shippingAddress: shippingAddress ? JSON.parse(shippingAddress) : {},
                        trip: trip ? JSON.parse(trip) : {}
                    }
                };

                dispatch({ type: 'SET_STATE', payload: newState });
                //console.log({"new state": newState})
            } catch (error) {
                console.log('Error fetching data from AsyncStorage:', error);
            }
        };

        fetchData();
    }, []);

    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}
