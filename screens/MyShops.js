import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import { shopStyles,buttonStyles } from '../styles'
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
  

  useEffect(()=>{
    getShops()
  }, [])


  return isLoading ? (<LoadingBox/>) : (
    <SafeScreen>
      <View style={{flexDirection: 'row', margin: 10, alignItems:"center", justifyContent:"space-between"}}>
      <Text style={{fontWeight: 800}}>{' '}</Text>
      <TouchableOpacity style={buttonStyles.button} onPress={()=> navigation.navigate('new-shop')}>
        <Button icon="arrow-right" textColor='white'>
          Create Shop
        </Button>
      </TouchableOpacity>
      </View>
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
                      navigation.navigate('new-shop', {
                        shop: item
                      })
                    }}
                    />
                <Text>{item.quantity}</Text>
                </View>
            <Image source={{uri: item.logo}}
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
            <Button icon="trash-can" textColor='black'/>
        </View>}
        keyExtractor={(item) => item._id}
      />
    </SafeScreen>
  )
}

export default MyShops
