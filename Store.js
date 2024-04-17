import React, {useReducer, createContext, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';



export const Store =  createContext()


/*  const initialState = {
    userInfo: async()=> await AsyncStorage.getItem('userInfo')
    ? JSON.parse(AsyncStorage.getItem('userInfo'))
    : null,

    cart: {
       cartItems: async()=> AsyncStorage.getItem('cartItems')
       ? JSON.parse(AsyncStorage.getItem('cartItems'))
       : [],

       paymentMethod: async()=> AsyncStorage.getItem('cartItem')
       ? JSON.parse(EncryptedStorage.getItem('paymentMethod'))
       : '',


    }
}  */

 const initialState ={
    userInfo: null,
    cart: {
       cartItems: [],
       paymentMethod: '',
       shippingAddress: {}
    }
} 


function reducer (state, action){
    switch(action.type){

        case "SAVE_USER":
            return {...state, userInfo: action.payload}

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

        case "ADD_CART_ITEM":
            const newItem = action.payload;
            const existItemIndex = state.cart.cartItems.findIndex(
                (item) => item._id === newItem._id
            );
        
            let updatedCartItems;
            if (existItemIndex !== -1) {
                // If item exists, update it
                updatedCartItems = [...state.cart.cartItems];
                updatedCartItems[existItemIndex] = newItem;
            } else {
                // If item doesn't exist, add it to cart
                updatedCartItems = [...state.cart.cartItems, newItem];
            }
        
            // AsyncStorage operation
            const updateAsyncStorage = async () => {
                try {
                    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                } catch (error) {
                    console.log('Error storing cartItems in AsyncStorage:', error);
                }
            };
        
            updateAsyncStorage(); // Call the async function
        
            return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
            
        default:
            return state;

    }
}

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let newState = { ...initialState };

                // Fetch userInfo from AsyncStorage
                const userInfo = await AsyncStorage.getItem('userInfo');
                if (userInfo) {
                    newState.userInfo = JSON.parse(userInfo);
                }

                // Fetch cartItems from AsyncStorage
                const cartItems = await AsyncStorage.getItem('cartItems');
                if (cartItems) {
                    newState.cart.cartItems = JSON.parse(cartItems);
                }

                // Fetch paymentMethod from AsyncStorage
                const paymentMethod = await AsyncStorage.getItem('paymentMethod');
                if (paymentMethod) {
                    newState.cart.paymentMethod = JSON.parse(paymentMethod);
                }

                // Fetch shippingAddress from AsyncStorage
                const shippingAddress = await AsyncStorage.getItem('shippingAddress');
                if (shippingAddress) {
                    newState.cart.shippingAddress = JSON.parse(shippingAddress);
                }

                dispatch({ type: 'SET_STATE', payload: newState });
            } catch (error) {
                console.log('Error fetching data from AsyncStorage:', error);
            }
        };

        fetchData();
    }, []);

    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}
