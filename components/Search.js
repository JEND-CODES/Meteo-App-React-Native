import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
// import axios from 'axios'

export default class Home extends React.Component {

constructor (props) {
    super(props)
        this.state = {
            city: 'Paris',
            weather: null,
            temperature: null,
            pressure: null,
            humidity: null
        }
        this.fetchWeather()   
    }

setCity (city) {
    this.setState({
        city: city
    })
}

fetchWeather() {
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Paris&appid={APIKEY}')
      .then(response => {return response.json();})
      .then(responseData => {return responseData;})
      .then(data => {this.setState({
          weather: data['weather'][0]['main'],
          // La soustraction de 273.15 permet d'afficher la température en celcius
          temperature: Math.round(Number(data['main']['temp']) - 273),
          pressure: data['main']['pressure'],
          humidity: data['main']['humidity'],
        });})
  }

  displayImages() {
    if (this.state.weather === 'Clouds') {
        return <Image style={style.weatherImage} source={require('../assets/cloudsIco.png')} />
      }
    if (this.state.weather === 'Rain') {
        return <Image style={style.weatherImage} source={require('../assets/rainIco.png')} />
      }
    if (this.state.weather === 'Clear') {
        return <Image style={style.weatherImage} source={require('../assets/sunnyIco.png')} />
      }
    if (this.state.weather === 'Thunderstorm') {
        return <Image style={style.weatherImage} source={require('../assets/thunderIco.png')} />
      }
    if (this.state.weather === 'Snow') {
        return <Image style={style.weatherImage} source={require('../assets/snowIco.png')} />
      }
}

translateWeather() {
    if (this.state.weather === 'Clouds') {
        return <Text style={{ fontSize: 24, margin: 20 }}>Nuageux</Text>
      }
    if (this.state.weather === 'Rain') {
        return <Text style={{ fontSize: 24, margin: 20 }}>Pluie</Text>
      }
    if (this.state.weather === 'Clear') {
        return <Text style={{ fontSize: 24, margin: 20 }}>Temps clair</Text>
      }
    if (this.state.weather === 'Thunderstorm') {
        return <Text style={{ fontSize: 24, margin: 20 }}>Orageux</Text>
      }
    if (this.state.weather === 'Snow') {
        return <Text style={{ fontSize: 24, margin: 20 }}>Neigeux</Text>
      }
}

render () {
        return(
            <View style={style.view}>

                <View style={style.weatherResults}>

                    <Text style={{ fontSize: 20 }}>Météo à Paris</Text>

                    {this.translateWeather()}
                    {/* <Text style={{ fontSize: 24, margin: 20 }}>Weather : {this.state.weather}</Text> */}

                    {this.displayImages()}
                    
                    <Text style={{ fontSize: 20 }}>Température : {this.state.temperature} °C</Text>
                    <Text style={{ fontSize: 20 }}>Pression : {this.state.pressure} hPa</Text>
                    <Text style={{ fontSize: 20 }}>Humidité : {this.state.humidity} %</Text>

                </View>
                
            </View>
        )
    }
}

const style = StyleSheet.create({
    view: {
        margin: 20,
    },
    weatherResults: {
        alignItems: 'center',
      }, 
    weatherImage: {
        width: 150,
        height: 100,
        alignSelf: 'center',
      }, 
})
