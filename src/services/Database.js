export default class DatabaseService {
  static urlBase = __DEV__
    ? 'http://localhost:5001/wreckers-dbac6/us-central1'
    : 'https://us-central1-wreckers-dbac6.cloudfunctions.net';
  static userId;
  static callbacks = [];

  static subscribe(callback) {
    this.callbacks.push(callback);
    return this.unsubscribe(callback);
  }
  static unsubscribe(callbackRef) {
    return () => {
      const index = this.callbacks.indexOf(callbackRef);
      this.callbacks.splice(index, 1);
    };
  }
  static async getEligibility(uid) {
    this.userId = uid;
    return fetch(`${this.urlBase}/eligibility?uid=${uid}`)
      .then(res => res.json())
      .then(body => {
        this.callbacks.map(callback => callback(body));
        return body;
      });
    try {
    } catch (err) {
      alert(`Get Eligibility Error: ${message}`);
    }
  }
  static async postEligibility(boutDate, data) {
    return fetch(`${this.urlBase}/eligibility`, {
      method: 'PUT',
      body: JSON.stringify({
        uid: this.userId,
        boutDate,
        ...data,
      }),
    })
      .then(res => res.json())
      .then(body => {
        this.callbacks.map(callback => callback(body));
        return body;
      });
  }
}

