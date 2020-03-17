export default class DatabaseService {
  static urlBase = __DEV__
    ? 'http://localhost:5001/wreckers-dbac6/us-central1'
    : 'https://us-central1-wreckers-dbac6.cloudfunctions.net';
  static userId;
  static callbacks = [];

  static setUserId(uid) {
    this.userId = uid;
  }
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

  static massageBoutData(bouts) {
    return Object.values(bouts).sort((a, b) => b.boutId - a.boutId);
  }

  static async getEligibility() {
    return fetch(`${this.urlBase}/eligibility?uid=${this.userId}`)
      .then(res => res.json())
      .then(body => {
        const bouts = this.massageBoutData(body);
        this.callbacks.map(callback => callback(bouts));
        return bouts;
      });
    try {
    } catch (err) {
      alert(`Get Eligibility Error: ${message}`);
    }
  }
  static async postEligibility(boutId, data) {
    return fetch(`${this.urlBase}/eligibility`, {
      method: 'PUT',
      body: JSON.stringify({
        uid: this.userId,
        boutId,
        ...data,
      }),
    })
      .then(res => res.json())
      .then(body => {
        const bouts = this.massageBoutData(body);
        this.callbacks.map(callback => callback(bouts));
        return bouts;
      });
  }
}
