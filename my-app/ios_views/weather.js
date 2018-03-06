/**
 * @Date:   2018-03-03T15:38:59+08:00
 * @Last modified time: 2018-03-04T09:32:50+08:00
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
class Weather extends Component{
  render(){
    return(
        <TWebView url="C:/Users/as110/Desktop/Font/toiletApp/my-app/html/weather.html" isWeather={true}/>
    );
  }
}

const styles = StyleSheet.create({
});

module.exports = Weather;
