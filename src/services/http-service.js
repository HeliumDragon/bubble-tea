class HttpService {
  constructor(baseUrl) {
    this.uri = baseUrl;
  }

  baseRequest = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  async get(path) {
    const res = await fetch(`${this.uri}${path}`);
    return res.json();
  }

  async post(path, data = {}) {
    const res = await fetch(`${this.uri}${path}`, {
      ...this.baseRequest,
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.json();
  }

  async put(path, data = {}) {
    const res = await fetch(`${this.uri}${path}`, {
      ...this.baseRequest,
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.json();
  }

  async delete(path) {
    const res = await fetch(`${this.uri}${path}`, {
      ...this.baseRequest,
      method: 'DELETE'
    });
    return res.json();
  }
}

export default new HttpService('http://localhost:5050/');
