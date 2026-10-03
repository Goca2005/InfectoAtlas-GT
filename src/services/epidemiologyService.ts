import { EpidemiologicalNotificationReport } from '../types/guatemala';

export type ReportListener = (report: EpidemiologicalNotificationReport) => void;

class EpidemiologySurveillanceService {
  // No verified source documents were provided for the old example reports.
  // Keep the surveillance API, with no synthetic official alerts at startup.
  private reports: EpidemiologicalNotificationReport[] = [];

  private listeners: Set<ReportListener> = new Set();

  getReports(): EpidemiologicalNotificationReport[] {
    return [...this.reports];
  }

  getReportsByDepartment(departmentId: string): EpidemiologicalNotificationReport[] {
    return this.reports.filter(r => r.departmentId === departmentId);
  }

  subscribe(listener: ReportListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Broadcast a new real-time report (ready for websocket, Firestore snapshot listener or user submission)
   */
  broadcastReport(report: EpidemiologicalNotificationReport): void {
    this.reports.unshift(report);
    this.listeners.forEach(fn => {
      try {
        fn(report);
      } catch (err) {
        console.error('Error broadcasting report:', err);
      }
    });
  }
}

export const epidemiologyService = new EpidemiologySurveillanceService();
