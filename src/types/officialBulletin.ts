import type { ExtractedPage } from './academicLibrary';
export type OfficialSourceId = 'mspas' | 'paho' | 'who';
export type BulletinStatus = 'pending' | 'reviewed' | 'discarded';
export interface BulletinReview {
  id: string; at: string; reviewer: string; action: BulletinStatus; note: string;
}
export interface OfficialBulletin {
  id: string; sourceId: OfficialSourceId; sourceUrl: string; title: string;
  publicationDate: string | null; referencePeriod: string; territory: string;
  departmentIds: string[]; relatedOrganismIds: string[];
  kind: 'bulletin' | 'alert' | 'update'; importedAt: string;
  evidence: { mode: 'pdf' | 'transcribed'; page: number | null; excerpt: string;
    fileName: string | null; fileSize: number | null; sha256: string | null; pages: ExtractedPage[] };
  status: BulletinStatus; reviews: BulletinReview[];
}
export type BulletinInput = Omit<OfficialBulletin, 'id' | 'importedAt' | 'status' | 'reviews'>;
export interface OfficialBulletinState { version: 1; bulletins: OfficialBulletin[] }
