import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList} from 'react-native'
import { url } from '../utils'
import { Store } from '../Store'
import Trip from '../components/Trip'

const ManageTrips = () => {

  const {state} = useContext(Store)
  const {userInfo} = state

  const [trips, setTrips] = useState([])

  const getTrips = async()=> {
    const {data} = await axios.get(`${url}/trips/mine`, {
      headers:{
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    //console.log(data)
    setTrips(data)
  }

  useEffect(()=> {
  
    getTrips()
  }, [userInfo])

  return (
    <View>
      <FlatList data={trips}
        renderItem={({item})=> <Trip trip={item}/>}
        keyExtractor={(item)=> item._id}
      />
    </View>
  )
}

export default ManageTrips
