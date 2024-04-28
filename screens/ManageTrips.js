import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, Text} from 'react-native'
import { url } from '../utils'
import { Store } from '../Store'
import Trip from '../components/Trip'
import LoadingBox from '../components/LoadingBox'
import { Button } from 'react-native-paper'





const ManageTrips = ({navigation}) => {

  const {state} = useContext(Store)
  const {userInfo} = state
  const [isLoading, setIsLoading] = useState(false)
  const [trips, setTrips] = useState([])

  const getTrips = async()=> {
    if(!userInfo){
      navigation.navigate('login')
    }else{
      setIsLoading(true)
      const {data} = await axios.get(`${url}/trips/mine`, {
      headers:{
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    //console.log(data)
    setTrips(data)
    setIsLoading(false)
    }
  }

  useEffect(()=> {
    getTrips()
  }, [userInfo])

  return isLoading ? (<LoadingBox/>):(
    <View>
      {!userInfo ? (
        <View style={{padding: 12, alignItems:"center"}}>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('profile-settings')
          }}
          style={{padding: 12, fontWeight: 800, borderWidth: 1, color:"white", margin: 12, backgroundColor: "white",
            borderColor:"#fefefe", borderRadius:6, backgroundColor: "green" }}
          >
            <Button textColor="white">FIRST ACTIVATE A TRANSPORTER ACCOUNT</Button>
          </TouchableOpacity>
        </View>
      ): (
        <FlatList data={trips}
        renderItem={({item})=> <Trip trip={item}/>}
        keyExtractor={(item)=> item._id}
      />
      )}
    </View>
  )
}

export default ManageTrips
