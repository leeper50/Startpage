export class Fallback {
  data: object;
  constructor(starting_data: object) {
    this.data = starting_data;
  }
  hSet(k: string, v: MyURL) {
    this.data[k] = v;
  }
  hGetAll(key: string): Promise<MyURL> {
    return this.data[key];
  }
  del(key: string) {
    delete this.data[key];
  }
  exists(key: string) {
    return key in this.data;
  }
}

export interface MyURL {
    url: string,
    searchable: string
}