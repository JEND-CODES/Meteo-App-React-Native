import * as React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

// Installation des outils de navigation => voir : https://reactnative.dev/docs/navigation + https://reactnavigation.org/docs/tab-based-navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Meteo from './components/Meteo';
import Search from './components/Search';

// Onglet Affichage de la meteo à Paris
// Pour déclarer la navigation avec un bouton dans la fonction suivante, possibilité d'utiliser ces formats : 
// const HomeScreen = ({ navigation }) => {
// function HomeScreen({ navigation }) {
function HomeScreen() {  
  return (
    <View style={{ marginVertical:40 }}>
      <Search />

      {/* <Button title="Aller vers MONDE" onPress={() =>
        navigation.navigate('MeteoScreen')
      }/> */}
      
    </View>
  );
}

// Onglet Rechercher la meteo dans une ville
function MeteoScreen() {
  return (
    <View>
      <Meteo />
    </View>
  );
}

// Onglet A propos
function AboutScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>Réalisation : Jean-Eudes Nouaille-Degorce</Text>
      <Text style={{ fontSize: 16, color: 'black', marginTop: 10 }}>
        Développeur Full Stack
      </Text>
      <Text style={{ fontSize: 16, color: 'black', marginTop: 10 }}>
        jeaneudes.nd@gmail.com
      </Text>
      <Image
        style={{
          width: 150,
          height: 160,
          borderWidth: 5,
          borderColor: 'cornflowerblue',
          marginTop: 50,
          marginBottom: 50,
        }}
        resizeMode="contain"
        source={{
          uri: 'http://portfolio.planetcode.fr/img/portrait_small.jpg',
        }}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      
      tabBarOptions={{
        style:{
          height:65,
          backgroundColor: '#cfcfcf',
          color: 'white',
          borderColor: 'white',
          borderWidth: 2,
        }, 
        // Custom the menu labels (option 1)
        labelStyle: {
          fontSize: 20,
          margin: 20,
          padding: 0,
          color: 'white',
          borderColor:'white',
          borderWidth: 2
        },
      }}
      >

        <Tab.Screen
        name="HomeScreen" 
        component={HomeScreen} 
        // Custom the menu labels (option 2)
        options={{
          tabBarLabel:({ focused, color })=>(<Text style={{color:focused?"orangered":"#5c5c5c", fontSize: 16, margin: 20, }}>PARIS</Text>),
          }}
        />

        <Tab.Screen 
        name="MeteoScreen" 
        component={MeteoScreen} 
        // Custom the menu labels (option 2)
        options={{
        tabBarLabel:({ focused, color })=>(<Text style={{color:focused?"green":"#5c5c5c", fontSize: 16, margin: 20, }}>MONDE</Text>),
        }}
        />

        <Tab.Screen 
        name="AboutScreen" 
        component={AboutScreen} 
        // Custom the menu labels (option 2)
        options={{
        tabBarLabel:({ focused, color })=>(<Text style={{color:focused?"navy":"#5c5c5c", fontSize: 16, margin: 20, }}>A PROPOS</Text>),
        }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

