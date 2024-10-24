import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import { shopStyles,buttonStyles, FormStyles } from '../styles'
import { url } from '../utils'
import { Store } from '../Store'
import LoadingBox from '../components/LoadingBox'
import { Button } from 'react-native-paper'
import SafeScreen from '../components/SafeScreen'

const MyShops = ({navigation}) => {

  const {state} = useContext(Store)
  const {userInfo} = state

  const [shops, setShops] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getShops=async()=>{

    if(!userInfo || !userInfo.seller){
      Alert.alert('ACTIVATE SELLER ACCOUNT FIRST')
      navigation.navigate('profile-settings')
      return
    }
    try{
      setIsLoading(true)
      const {data} = await axios.get(`${url}/shops/mine`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      setShops(data)
      //console.log(shops)
      setIsLoading(false)
    }catch(error){
      console.error(error)
    }
  }
  
  const handleDelete = async(shop)=>{
    await axios.put(`${url}/shops/delete-shop/${shop._id}`, {}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    Alert.alert('Scheduled For Deletion In 30 Days')
  }

  useEffect(()=>{
    getShops()
  }, [])


  return isLoading ? (<LoadingBox/>) : (
    <View>
      <FlatList
        data={shops}
        renderItem={({item})=> 
        <View style={shopStyles.container}>
            <View style={{maxWidth: 80, maxHeight: 30}}>
                <Text>{item.name}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-between', alignItems:"center", flexDirection: "row"}}>
                <Button icon="pen" textColor='green' 
                    onPress={()=> {
                      navigation.navigate('Create Shop', {
                        shop: item
                      })
                    }}
                    />
                <Text>{item.quantity}</Text>
                </View>
            <Image source={{uri: item.logo ? item.logo 
                  : "https://res.cloudinary.com/dxcnizqeq/image/upload/v1705585082/xyocibbonj5rbuqzf14m.png"}}
                style={
                  {
                    maxWidth: 70, 
                    height: 70, 
                    width: 70, 
                    borderWidth: 5.5, 
                    borderColor: "#fafafa", 
                    objectFit:"contain",
                    borderRadius: 50
                  }
                }
            />
            <Button icon="trash-can" textColor='black' onPress={()=> handleDelete(item)}/>
        </View>
        }
        keyExtractor={(item) => item._id}
        ListHeaderComponentStyle={{backgroundColor: "white"}}
        ListHeaderComponent={
        <Button icon="bolt" textColor='white' style={FormStyles.button}
          onPress={()=> navigation.navigate('Create Shop')}>
          CREATE SHOP
        </Button>
        }
      />
    </View>
  )
}

export default MyShops
