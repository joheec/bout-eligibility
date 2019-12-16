import * as Facebook from 'expo-facebook';
import { config } from '../config';
import { Firebase } from '../integrations/firebase';

export default class AuthService {
  static async loginWithFacebook() {
    try {
      await Facebook.initializeAsync(config.facebook.appId);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile']
      });

      if (type === 'success' && token) {
        const credential = Firebase.auth.FacebookAuthProvider.credential(token);
        await Firebase.auth().signInWithCredential(credential);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  static subscribeAuthChange(callback) {
    Firebase.auth().onAuthStateChanged(callback);
  }

  static async logout() {
    return Firebase.auth().signOut();
  }
}
