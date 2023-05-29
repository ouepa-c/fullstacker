class Cache {
  storage: Storage

  constructor() {
    this.storage = localStorage
  }

  save(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  get(key: string) {
    return JSON.parse(this.storage.getItem(key) as string)
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }

  has(key: string) {
    return !!this.get(key)
  }
}

export default new Cache
