export default class DatabaseService {
  static urlBase = __DEV__
    ? 'http://localhost:5001/wreckers-dbac6/us-central1'
    : 'https://us-central1-wreckers-dbac6.cloudfunctions.net';
  static async getEligibility(uid) {
    return fetch(`${this.urlBase}/eligibility?uid=${uid}`)
      .then((res) => res.json())
    try {
    } catch (err) {
      alert(`Get Eligibility Error: ${message}`);
    }
  }
}

