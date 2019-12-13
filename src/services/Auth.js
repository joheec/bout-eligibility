import * as Facebook from 'expo-facebook';
import { config } from '../config';
import { Firebase } from '../integrations/firebase';

export default class AuthService {
  static async loginWithFacebook() {
    console.log({ config, appId: config.facebook.appId });
    console.log(Facebook);
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(config.facebook.appId, {
        permissions: ['public_profile']
      });

      if (type === 'success' && token) {
        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        const credential = Firebase.auth.FacebookAuthProvider.credential(token);
        await Firebase.auth().signInAndRetrieveDataWithCredential(credential);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  static subscribeAuthChange(callback) {
    Firebase.auth().onAuthStateChanged(callback);
  }
}
