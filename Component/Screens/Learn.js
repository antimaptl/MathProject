import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Learn = () => {
  return (
   <View style={{flex:1}}>
       <Image
       style={{height:"100%",width:"auto",resizeMode:"cover"}}
          source={require('../Screens/Image/comingsoonpng.jpg')}
       />
       </View>
  )
}

export default Learn

const styles = StyleSheet.create({})