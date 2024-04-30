import React, { useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, SafeAreaView} from 'react-native'
import { Button } from 'react-native-paper'
import axios from 'axios'
import { url } from '../utils'
import LoadingBox from '../components/LoadingBox'
import { buttonStyles } from '../styles'
import Trip from '../components/Trip'


const TripScreen = ({navigation}) => {
  const [trips, setTrips] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  

  useEffect(()=> {
    try{
      setIsLoading(true)
      const getData = async()=> {
        const {data} = await axios.get(`${url}/trips`)
        setTrips(data)
        console.log(data.length)
      }
      getData()
      setIsLoading(false)

    }catch(error){
      console.error(error)
    }
  }, [])

  //console.log(trips)
  return isLoading ? (<LoadingBox/>) : 
  (     
      <SafeAreaView>
        <FlatList data={trips} 
          renderItem={({item})=> <Trip trip={item.trip}/>}
          keyExtractor={(item)=> item._id}
        />
      </SafeAreaView>
  )
}

export default TripScreen
