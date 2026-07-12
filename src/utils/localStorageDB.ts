export class LocalStorageDB<T extends { id: string }> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  getAll(): T[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  getById(id: string): T | undefined {
    return this.getAll().find((item) => item.id === id);
  }

  create(item: T): T {
    const data = this.getAll();
    data.push(item);
    localStorage.setItem(this.key, JSON.stringify(data));
    return item;
  }

  update(id: string, updates: Partial<T>): T | undefined {
    let updatedItem: T | undefined;
    const data = this.getAll().map((item) => {
      if (item.id === id) {
        updatedItem = { ...item, ...updates };
        return updatedItem;
      }
      return item;
    });

    if (updatedItem) {
      localStorage.setItem(this.key, JSON.stringify(data));
    }
    return updatedItem;
  }

  delete(id: string): boolean {
    const data = this.getAll();
    const filteredData = data.filter((item) => item.id !== id);
    
    if (data.length !== filteredData.length) {
      localStorage.setItem(this.key, JSON.stringify(filteredData));
      return true;
    }
    return false;
  }

  setAll(items: T[]): void {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
