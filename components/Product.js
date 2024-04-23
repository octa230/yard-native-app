import React, { useContext, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View, Text, Image, Modal, Button as RNButton } from 'react-native';
import { buttonStyles, productStyles } from '../styles';
import { Button } from 'react-native-paper';
import { url } from '../utils';
import { Store } from '../Store';
import axios from 'axios';









const Product = React.memo(({...props}) => {
  const { product } = props;

  const {state, dispatch: ctxDispatch} = useContext(Store)
  const { cart } = state

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('')

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };




  const addToCartHandler = async (item) => {
    try{
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`${url}/products/${item._id}`);
      if (data.inStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...item, quantity },
    });
    Alert.alert('DONE! VIEW CART')
    }catch(error){
      console.log(error)
    }
  };

  return (
    <TouchableOpacity style={productStyles.container} onLongPress={toggleModal}>
    <Text style={productStyles.cardHeader}>{product.name}</Text>
    <Image source={{ uri: product.image }} style={{ width: 300, height: 300, borderRadius: 5, objectFit: "contain" }} />
    <View style={productStyles.cardDetails}>
      <Text>Brand: {product.brand}</Text>
      <Text>Available: {product.inStock}</Text>
    </View>
    <View style={productStyles.cardDetails}>
      <Text>AED: {product.aed}</Text>
      <Text>UGX: {product.ugx}</Text>
    </View>
    <TouchableOpacity style={buttonStyles.button}>
      <Button textColor='white' icon="basket-plus" onPress={() => addToCartHandler(product)}>
        Add to cart
      </Button>
    </TouchableOpacity>
    <Text>****LONG PRESS FOR ADDITIONAL DETAILS****</Text>
    {/* Modal for additional details */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={productStyles.modalContainer}>
        <View style={productStyles.modalContent}>
          <Text style={productStyles.cardHeader}>{product.name}</Text>
          {/* Add additional details here */}
          <Text>Category: {product.category}</Text>
          <Text style={{ padding: 12, maxHeight: 200 }}>Description: {product.description}</Text>
          <Image source={{ uri: image || "none" }} 
            style={{ height: 200, borderWidth: 1, marginBottom: 12, objectFit: "contain", borderColor: "gray", borderRadius:8 }} 
          />
          <ScrollView horizontal>
            {product.images?.length > 0 ? (
              product.images?.map((image) => (
                <TouchableOpacity key={image} onPress={() => setImage(image)}>
                  <Image source={{ uri: image }} style={{ height: 80, width: 80 }} />
                </TouchableOpacity>
              ))
            ) : (
              <Text>NO ADDITIONAL PHOTOS</Text>
            )}
          </ScrollView>
          <RNButton
            title="Close"
            onPress={toggleModal}>
            Close
          </RNButton>
        </View>
      </View>
    </Modal>
  </TouchableOpacity>
);
});

export default Product;
