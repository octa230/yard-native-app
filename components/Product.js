import React, { useContext, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View, Text, Image, Modal, Button as RNButton } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { url } from '../utils';
import { Store } from '../Store';
import { productStyles } from '../styles';
import axios from 'axios';

const Product = React.memo(({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const addToCartHandler = async (item) => {
    try {
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`${url}/products/${item._id}`);
      if (data.inStock < quantity) {
        Alert.alert('Sorry. Product is out of stock');
        return;
      }
      ctxDispatch({
        type: 'ADD_CART_ITEM',
        payload: { ...item, quantity },
      });
      Alert.alert('DONE! VIEW CART');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity style={productStyles.container} onLongPress={toggleModal}>
      <Card elevation={4} style={productStyles.card}>
        <View style={{
          borderRadius: 10,
          overflow: 'hidden',
          padding: 10, 
        }}>
        <Image source={{ uri: product.image }} style={{
          width: "100%", 
          height:200, 
          resizeMode:"contain",
        }} />
        </View>
        <Card.Content>
          <Text style={productStyles.cardHeader}>{product.name}</Text>
          <View style={productStyles.cardDetails}>
            <Text style={productStyles.cardDetailText}>Brand: {product.brand}</Text>
            <Text style={productStyles.cardDetailText}>Available: {product.inStock}</Text>
          </View>
          <View style={productStyles.cardDetails}>
            <Text style={productStyles.cardDetailText}>AED: {product.aed}</Text>
            <Text style={productStyles.cardDetailText}>UGX: {product.ugx}</Text>
          </View>
          <Button mode="contained" onPress={() => addToCartHandler(product)} style={productStyles.addButton}>
            Add to Cart
          </Button>
        </Card.Content>
      </Card>
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
  <View style={productStyles.modalContainer}>
    <ScrollView>
      <View style={productStyles.modalContent}>
        <Text style={productStyles.modalHeader}>{product.name}</Text>
        <Text style={productStyles.modalText}>Category: {product.category}</Text>
        <Text style={productStyles.modalText}>Description: {product.description}</Text>
        <Image source={{ uri: image || "none" }} style={productStyles.modalImage} />
        <ScrollView horizontal>
          {product.images?.length > 0 ? (
            product.images?.map((image) => (
              <TouchableOpacity key={image} onPress={() => setImage(image)}>
                <Image source={{ uri: image || product.image }} style={productStyles.thumbnailImage} />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No Additional Photos</Text>
          )}
        </ScrollView>
        <RNButton title="Close" onPress={toggleModal} />
      </View>
    </ScrollView>
  </View>
</Modal>
    </TouchableOpacity>
  );
});

export default Product;