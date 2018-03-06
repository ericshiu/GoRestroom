/**
 * @Date:   2018-03-03T15:38:59+08:00
 * @Last modified time: 2018-03-04T16:14:08+08:00
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
    } from 'react-native';
import TWebView from './webview';
class ToiletPage extends Component{
  render(){
    return(
      <View style={styles.container}>
        <TWebView  url="C:/Users/as110/Desktop/Font/toiletApp/my-app/html/nearby.html" isNearBy={true}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    text:{
        fontSize:60
    }
});

module.exports = ToiletPage;
