import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import { View, ScrollView, Text } from 'react-native'

const CategoriesBar = ({categories, navigation}) => {

    const [subcategories, setSubcategories] = useState([])
    const [selectedCategory, setselectedCategory] = useState('')

    const showSubcategories = (category)=> {
        if(category){
          setselectedCategory(category._id)
          setSubcategories(category.subcategories || [])
        }
    }
  return (
    <View>
    <ScrollView horizontal style={{ padding: 5, borderBottomWidth: 1, backgroundColor: "'#e0e0e0'" }}>
        {categories.map((category) => (
            <Button onPress={() => showSubcategories(category)} key={category._id}>
                <Text style={{fontWeight: 700, fontSize: 20}}>{category.name}</Text>
            </Button>
        ))}
    </ScrollView>
    <ScrollView horizontal style={{ backgroundColor: "green" }}>
        {subcategories.map((item, index) => (
            <Button key={index} textColor='#e0e0e0' onPress={() => {
                navigation.navigate('Filter', {
                    //category: selectedCategory._id,
                    subcategory: item
                });
            }}>
            <Text style={{fontSize: 13, fontWeight: 500}}>{item}</Text>
            </Button>
        ))}
    </ScrollView>
</View>
  )
}

export default CategoriesBar
