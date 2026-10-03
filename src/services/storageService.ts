import { Microorganism } from '../types/microorganism';
import { INITIAL_MICROORGANISMS } from '../data/microorganisms';

/**
 * Storage Service Interface
 * Modular architecture prepared for seamless Firebase Firestore plug-in.
 */
export interface IStorageRepository {
  getMicroorganisms(): Promise<Microorganism[]>;
  getMicroorganismById(id: string): Promise<Microorganism | undefined>;
  saveMicroorganism(item: Microorganism): Promise<void>;
  getBookmarks(): string[];
  toggleBookmark(id: string): boolean;
  isBookmarked(id: string): boolean;
}

class LocalStorageRepository implements IStorageRepository {
  private memoryCache: Microorganism[] = [...INITIAL_MICROORGANISMS];
  private readonly BOOKMARKS_KEY = 'infectoatlas_bookmarks_v1';

  async getMicroorganisms(): Promise<Microorganism[]> {
    return this.memoryCache;
  }

  async getMicroorganismById(id: string): Promise<Microorganism | undefined> {
    return this.memoryCache.find(m => m.id === id);
  }

  async saveMicroorganism(item: Microorganism): Promise<void> {
    const idx = this.memoryCache.findIndex(m => m.id === item.id);
    if (idx >= 0) {
      this.memoryCache[idx] = item;
    } else {
      this.memoryCache.push(item);
    }
  }

  getBookmarks(): string[] {
    try {
      const raw = localStorage.getItem(this.BOOKMARKS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  toggleBookmark(id: string): boolean {
    try {
      const current = this.getBookmarks();
      const exists = current.includes(id);
      const updated = exists ? current.filter(x => x !== id) : [...current, id];
      localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(updated));
      return !exists;
    } catch {
      return false;
    }
  }

  isBookmarked(id: string): boolean {
    return this.getBookmarks().includes(id);
  }
}

// Single instance export for application consumption
export const storageService = new LocalStorageRepository();
