
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { enableScreens } from 'react-native-screens';
import routes from './routes';
import 'react-native-gesture-handler';
import ScreenLoader, { loaderRef } from './Src/Components/Loader/ScreenLoader';
import * as firebase from 'firebase'
import { getToken } from './Src/Storage/Users';
import messaging from '@react-native-firebase/messaging';

var firebaseConfig = {
  apiKey: "AIzaSyBOJfO3onN9shb3ZqyLgucuqGleA3ywGGw",
  projectId: "scrum-fddcc",
  messagingSenderId: "556246402870",
  appId: "1:556246402870:android:33140f9899067d2d37d597",
};

const Stack = createStackNavigator();
export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    getToken()
    .then(result => {
      if(result) {
        messaging().onTokenRefresh(token => {
          postData(UDPATE_TOKEN, null, {Token : token})
          .then(result => {
              
          })
          .catch(err => {

          })
        })
      }
    })
  }


  // const conf = {
  //   animation: 'spring',
  //   config : {
  //     stiffness:1000,
  //     damping:500,
  //     mass:3,
  //     overshootClamping:true,
  //     restDisplacementThreshold:0.01,
  //     restSpeedThreshold:0.01
  //   }
  // }

  const conf = {
    animation: 'timing',
    config : {
      duration:250,
    
    }
  }
  // enableScreens();
  // return <TaskScreen/>
  return <NavigationContainer>
    <ScreenLoader ref={loaderRef} />
      <Stack.Navigator
        screenOptions={{headerShown:false, gestureEnabled: false, transitionSpec: {open:conf,close:conf} }}
        initialRouteName="SplashScreen"
      >
        {routes.map((e, i) => {
          return <Stack.Screen key={e.name}
          name={e.name}
          component={e.component}
                     
          // getComponent={e.component}
          //1,5,3,2,4, 6
        />
        })} 
      </Stack.Navigator>
    </NavigationContainer>  
}
    