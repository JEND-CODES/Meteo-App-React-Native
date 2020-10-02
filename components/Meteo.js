import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";

// Conseil si le simulateur Android-Expo plante : fermer les fenêtres ouvertes, aller ensuite vers Metro Bundler et cliquer sur le bouton Corbeille "Clear Log" -> Ensuite cliquer sur Run on Android

export default class Meteo extends React.Component {

constructor (props) {
    super(props)
        this.state = {
            city: '',
            
            weather: null,
            temperature: null,
            pressure: null,
            humidity: null
        }
           
    }

    // Permet de modifier le state de "city" après les entrées dans l'Input dédié (cela va permettre ensuite d'injecter le nom de la ville dans l'URL de l'API)
    setCity (city) {
        this.setState({
            city: city
        })
        
    } 

getData() {
    // Pour cette concaténation ne pas oublier le symbole $ !
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid={APIKEY}`)
      .then(response => {return response.json();})
      .then(responseData => {return responseData;})
      .then(data => {this.setState({
          weather: data['weather'][0]['main'],
          // La soustraction de 273.15 permet d'afficher la température en celcius
          temperature: Math.round(Number(data['main']['temp']) - 273),
          pressure: data['main']['pressure'],
          humidity: data['main']['humidity'],
          // icon: data['weather'][0]['icon']
        });})
  }

// Une autre méthode pour afficher les icons meteo consistera à reprendre les informations de cette page : https://openweathermap.org/weather-conditions
// On pourrait ainsi faire une concaténation des noms des icons qui s'affichent en résultat des requêtes vers l'API dans la partie "icon" => 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png'
// Voir Demo Codepen : https://codepen.io/danielwrobert/pen/qrxQjQ?editors=1010
// ça donnerait donc : return <Image source={require(https://openweathermap.org/img/w/${this.state.icon}.png)} />
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

weatherTemperature() {
    if (this.state.temperature != null) {
        return <Text style={{ fontSize: 20 }}>Température : {this.state.temperature} °C</Text>
    }
}

weatherPressure() {
    if (this.state.pressure != null) {
        return <Text style={{ fontSize: 20 }}>Pression : {this.state.pressure} hPa</Text>
    }
}

weatherHumidity() {
    if (this.state.humidity != null) {
        return <Text style={{ fontSize: 20 }}>Humidité : {this.state.humidity} %</Text>
    }
}

render () {
        return(
            <View style={style.view}>
                <TextInput
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setCity(text)}
                    style={{ height: 40, borderColor: 'grey', borderWidth: 1, padding:10, marginBottom:20 }}
                    value={this.state.city}
                    />

                {/* Bouton d'activation des requêtes vers l'API */}
                <Button onPress={() => this.getData()} title='Rechercher' />
                {/* Bouton coloré ! <Button onPress={() => this.getData()} title='Rechercher' color="#1E6738" /> */}

                <View style={style.weatherResults}>

                    {this.translateWeather()}

                    {this.displayImages()}
                    
                    {this.weatherTemperature()}

                    {this.weatherPressure()}

                    {this.weatherHumidity()}

                </View>
               

            </View>
        )
    }
}

const style = StyleSheet.create({
    view: {
        margin: 20,
        padding:40
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
