import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import { View, ScrollView } from 'react-native'

const CategoriesBar = (props) => {
    const {categories} = props

    const [subcategories, setSubcategories] = useState([])

    const showSubcategories = (category)=> {
        if(category){
            setSubcategories(category.subcategories || [])
        }
    }
  return (
    <View>
    <ScrollView horizontal style={{padding: 5, borderBottomWidth: 1, backgroundColor:"#fefefe"}}>
      {categories.map((category)=> (
            <Button onPress={()=> showSubcategories(category)} key={category._id}
            >
            {category.name}
            </Button>
      ))}
    </ScrollView>
    <ScrollView horizontal style={{backgroundColor: "green"}}>
        {subcategories.map((item, index)=> (
            <Button key={index} textColor='white'>{item}</Button>
        ))}
    </ScrollView>
    </View>
  )
}

export default CategoriesBar
