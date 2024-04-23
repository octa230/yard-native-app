import React, { useState, useCallback } from 'react'
import { View, Text,ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { DatePickerModal } from 'react-native-paper-dates';
import { buttonStyles, FormStyles } from '../styles';
import { Button } from 'react-native-paper';

const CreateTrip = () => {
  const [availableWeight, setAvailableWeight] = useState('')
  const [weightPrice, setweightPrice] = useState('')
  const [ticketCopy, setTicketCopy] = useState('')
  const [visaCopy, setVisaCopy] = useState('')
  const [date, setDate] = useState({})
  const [open, setOpen ] = useState(false)


  const onDismiss = useCallback(()=> {
    setOpen(false)
  }, [setOpen, setDate])

  const onConfirm = useCallback(({startDate, endDate})=> {
    setDate(false)
    setDate({startDate, endDate})
  })

  const handleSubmit=async()=>{
    console.log(
      availableWeight,
      weightPrice,
    ticketCopy,
    visaCopy,
    date,
    )
  }
  return (
    <ScrollView>
        <View style={FormStyles.Form}>
                <Text style={FormStyles.FormHeader}>Create Trip</Text>
                <Text>Total Trip KGs</Text>

                <TextInput type="text" style={FormStyles.Input} 
                  value={availableWeight}
                  onChangeText={text => setAvailableWeight(text)}
                
                  />
                <Text>KG Price In UGX</Text>
                <TextInput style={FormStyles.Input} type="text"
                  value={weightPrice}
                  onChangeText={text => setweightPrice(text)}
                  />
                <Text>TicketCopy</Text>
                <TextInput style={FormStyles.Input} type="Text"
                  value={ticketCopy}
                  onChangeText={text => setTicketCopy(text)}
                  />
                <Text>visaCopy</Text>
                <TextInput style={FormStyles.Input} type="text"
                  value={visaCopy}
                  onChangeText={text => setVisaCopy(text)}
                  />
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                  <TouchableOpacity style={buttonStyles.button} onPress={() => setOpen(true)}>
                    <Button>
                      <Text style={{color: "white"}}>Select Date</Text>
                    </Button>
                  </TouchableOpacity>
                <DatePickerModal
                  locale="en-GB"
                  mode='range'
                  visible={open}
                  onDismiss={onDismiss}
                  startDate={date.startDate}
                  endDate={date.endDate}
                  onConfirm={onConfirm}
                />
                </View>
                <TouchableOpacity style={FormStyles.button} onPress={handleSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
          </View>

    </ScrollView>
  )
}

export default CreateTrip
