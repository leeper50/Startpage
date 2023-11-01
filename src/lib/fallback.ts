export class Fallback {
  data: object;
  constructor(starting_data: object) {
    this.data = starting_data;
  }
  hSet(k: string, v: MyURL | string) {
    this.data[k] = v;
  }
  hGetAll(k: string): Promise<MyURL | string> {
    return this.data[k];
  }
  set(k: string, v: string) {
    this.data[k] = v;
  }
  get(k: string): string {
    return this.data[k];
  }
  del(k: string) {
    delete this.data[k];
  }
  exists(k: string) {
    return k in this.data;
  }
}

export interface MyURL {
  url: string;
  searchable: string;
}
