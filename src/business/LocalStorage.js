import { AsyncStorage } from 'react-native';

class LocalStorage {
  static async setItem(name, value) {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  }

  static async getItem(name) {
    return JSON.parse(await AsyncStorage.getItem(name));
  }

  static async removeItem(name) {
    return AsyncStorage.removeItem(name);
  }
}

export default LocalStorage;
