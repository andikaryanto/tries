import AsyncStorage  from "@react-native-community/async-storage";


export const setToken = async (token) => {
    try {
        await AsyncStorage.setItem(
          'sessionToken',
          token
        );
        return true;
    } catch (error) {
    // Error saving data
        // console.log(error);
        return false;
    }
}; 

export const getToken = async () => {
    try {
        let token = await AsyncStorage.getItem(
          'sessionToken'
        );
        return token;
    } catch (error) {
    // Error saving data
        return "";
    }
}; 


export const removeToken = async () => {
    try {
        let token = await AsyncStorage.removeItem(
          'sessionToken'
        );
        return true;
    } catch (error) {
    // Error saving data
        return false;
    }
}; 

export const setUsername = async (username) => {
    try {
        await AsyncStorage.setItem(
          'username',
          username
        );
        return true;
    } catch (error) {
    // Error saving data
        // console.log(error);
        return false;
    }
}; 

export const getUsername = async () => {
    try {
        return await AsyncStorage.getItem(
          'username'
        );
        // return true;
    } catch (error) {
    // Error saving data
        // console.log(error);
        return "";
    }
}; 

export const setPhoto  = async (photo) => {
    try {
        await AsyncStorage.setItem(
          'photo',
          photo
        );
        return true;
    } catch (error) {
    // Error saving data
        // console.log(error);
        return false;
    }
}

export const getPhoto = async () => {
    try {
        return await AsyncStorage.getItem(
          'photo'
        );
        // return true;
    } catch (error) {
    // Error saving data
        // console.log(error);
        return "";
    }
}; 

export const setPosition  = async (position) => {
    try {
        await AsyncStorage.setItem(
          'position',
          position
        );
        return true;
    } catch (error) {
    // Error saving data
        // console.log(error);
        return false;
    }
}

export const getPosition = async () => {
    try {
        return await AsyncStorage.getItem(
          'position'
        );
        // return true;
    } catch (error) {
    // Error saving data
        // console.log(error);
        return "";
    }
}; 


export const getDataUser = async () => {
    try{
        return await AsyncStorage.multiGet(['sessionToken', 'username', 'photo'])
    } catch(err) {
        return [];
    }
}