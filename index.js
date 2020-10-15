
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import reducers from './Src/Store/Index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MAIN, GREY, MAIN_CONTRAST, MAIN_FOURTH, MAIN_SECOND, MAIN_THIRD } from './Src/Const/Colors';
import {Provider} from 'react-redux';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: MAIN_THIRD,
    accent: MAIN_CONTRAST,
    text :GREY,
    placeholder:GREY,
    background:GREY
  },
};

const store = createStore(reducers, applyMiddleware(thunk));
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
export default function Main() {
    return (
      
    <Provider store={store}>

      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
    );
  }
  
AppRegistry.registerComponent('main', () => Main);
