import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Store'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Switch} from 'react-native-paper'
import axios from 'axios'
import { url } from '../utils'
import SafeScreen from '../components/SafeScreen'

const ManageProfile = ({navigation}) => {
    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {userInfo} = state

    //console.log(userInfo)

    const [seller, setSeller] = useState(userInfo?.seller || false)
    const [transporter, setTransporter] = useState(userInfo?.transporter || false)


    const updateAccount = async()=> {
      const {data} = await axios.put(`${url}/users/profile`, {
        seller: seller,
        transporter: transporter
      },{
        headers: {Authorization: `Bearer ${userInfo.token}`}
      })
      ctxDispatch({type: "UPDATE_USER", payload: data})
    }


    
    useEffect(()=> {
        if(!userInfo){
          navigation.navigate('login')
        }else{
          updateAccount()
        }
    }, [seller, transporter])

    //add userInfo to effect array

    
  return (
    <SafeScreen>
      <View style={{padding: 12, flexDirection: "column", flex: 1}}>
      <Text style={{
        padding: 8, fontWeight: 800, borderWidth: 1, margin: 4, borderColor:"#fefefe", borderRadius:8, margin: 4, backgroundColor: "white", padding:12}}>

          EMAIL: {userInfo?.email}
          </Text>
      <Text style={{
        padding: 8, fontWeight: 800, borderWidth: 1, margin: 4, borderColor:"#fefefe", borderRadius:8, margin: 4, backgroundColor: "white", padding:12}}>

          NAME: {userInfo?.name}
          </Text>
      <Text style={{
        padding: 12, fontWeight: 800, borderWidth: 1, color:"white", margin: 12, backgroundColor: "white",
        borderColor:"#fefefe", borderRadius:6, backgroundColor: "green" }}>

          YOU CAN'T UNDO THESE ACTIONS 
          </Text>

      <View style={{justifyContent: "space-between", flexDirection: "row", alignItems:"center", padding: 3, 
        fontWeight: 800, borderWidth: 1, borderColor:"#fefefe", borderRadius:8, margin: 4, backgroundColor: "white"}}
        >
      <Text style={{maxWidth: 100}}>SELLER: {userInfo?.seller ? "YES" : "NO"}</Text>
      <Switch value={seller} onValueChange={()=> setSeller(!seller)}/>
      {userInfo?.seller && (
        <TouchableOpacity style={{
          padding: 12, fontWeight: 800, borderWidth: 1, backgroundColor: "white",
          borderColor:"#fefefe", borderRadius:8, backgroundColor: "green" }}
          onPress={()=> navigation.navigate('new-shop')}
        >
            <Text style={{color:"white"}}>CREATE SHOP</Text>
        </TouchableOpacity>
      )}
      </View>

      <View style={{justifyContent: "space-between", flexDirection: "row", alignItems:"center", padding: 3, 
        fontWeight: 800, borderWidth: 1, borderColor:"#fefefe", borderRadius:8, margin: 4, backgroundColor: "white"}}
        >
      <Text style={{maxWidth: 100}}>TRANSPORTER: {userInfo?.transporter ? "YES" : "NO"}</Text>
      <Switch value={transporter} onValueChange={()=> setTransporter(!transporter)}/>

      {userInfo?.transporter && (
        <TouchableOpacity style={{
          padding: 12, fontWeight: 800, borderWidth: 1, color:"white", backgroundColor: "white",
          borderColor:"#fefefe", borderRadius:8, backgroundColor: "green" }}
          onPress={()=> navigation.navigate("transporter-profile")}
        >
            <Text style={{color:"white"}}>EDIT PROFILE</Text>
        </TouchableOpacity>
      )}
      </View>
    </View>
    </SafeScreen>
  )
}

export default ManageProfile
