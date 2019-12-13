import { Facebook } from 'expo';
import { config } from '../config';
import { Firebase } from '../integrations/firebase';

export default class AuthService {
  static async loginWithFacebook() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      config.facebook.appId,
      { permissions: ['public_profile'] },
    );

    if (type === 'success' && token) {
      const credential = Firebase.auth.FacebookAuthProvider.credential(token);

      await Firebase.auth().signInAndRetrieveDataWithCredential(credential);
    }
  }

  static subscribeAuthChange(callback) {
    Firebase.auth().onAuthStateChanged(callback);
  }
}
