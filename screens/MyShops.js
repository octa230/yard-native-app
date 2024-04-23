import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import { shopStyles } from '../styles'
import { url } from '../utils'
import { Store } from '../Store'
import LoadingBox from '../components/LoadingBox'
import { Button } from 'react-native-paper'

const MyShops = () => {

  const {state} = useContext(Store)
  const {userInfo} = state

  const [shops, setShops] = useState([])
  const [selectedShop, setSelectedShop] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getShops=async()=>{
    try{
      setIsLoading(true)
      const {data} = await axios.get(`${url}/shops/mine`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      setShops(data)
      console.log(shops)
      setIsLoading(false)
    }catch(error){
      console.error(error)
    }
  }

  useEffect(()=>{
    getShops()
  }, [])


  return isLoading ? (<LoadingBox/>) : (
    <SafeAreaView>
      <FlatList
        data={shops}
        renderItem={({item})=> 
        <View style={shopStyles.container}>
            <View style={{maxWidth: 80, maxHeight: 30}}>
                <Text>{item.name}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-between', alignItems:"center", flexDirection: "row"}}>
                <Button icon="pen" textColor='green' 
                    onPress={()=> {}}
                    />
                <Text>{item.quantity}</Text>
                </View>
            <Image source={{uri: item.logo}}
                style={
                  {
                    maxWidth: 80, 
                    height: 80, 
                    width: 80, 
                    borderWidth: 1.5, 
                    borderColor: "grey", 
                    objectFit:"contain",
                    borderRadius: 50
                  }
                }
            />
            <Button icon="trash-can" textColor='black'/>
        </View>}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  )
}

export default MyShops
