import { EpidemiologicalNotificationReport } from '../types/guatemala';

export type ReportListener = (report: EpidemiologicalNotificationReport) => void;

class EpidemiologySurveillanceService {
  private reports: EpidemiologicalNotificationReport[] = [
    {
      id: 'rep-gt-2024-01',
      timestamp: '2024-11-04T08:30:00Z',
      source: 'MSPAS_SIGSA',
      departmentId: 'gt-esc',
      diseaseId: 'virus-del-dengue',
      pathogenScientificName: 'Dengue virus (Serotipos 2 y 3)',
      syndromeCategory: 'Febril Agudo / Arbovirosis',
      eventDescription: 'Alerta epidemiológica por incremento atípico de casos de Dengue con Signos de Alarma en municipios costeros de Escuintla.',
      verifiedStatus: 'Alerta Epidemiológica',
      referenceWeek: 'SE-44 2024'
    },
    {
      id: 'rep-gt-2024-02',
      timestamp: '2024-02-12T14:15:00Z',
      source: 'CNE_Vigilancia',
      departmentId: 'gt-suc',
      diseaseId: 'campylobacter-jejuni',
      pathogenScientificName: 'Campylobacter jejuni / Síndrome Postinfeccioso',
      syndromeCategory: 'Enfermedad Diarreica Aguda',
      eventDescription: 'Vigilancia activa e intensificada de casos de parálisis flácida aguda compatible con Síndrome de Guillain-Barré tras cuadros diarreicos en Suchitepéquez y Retalhuleu.',
      verifiedStatus: 'Oficial Confirmado',
      referenceWeek: 'SE-06 2024'
    },
    {
      id: 'rep-gt-2024-03',
      timestamp: '2024-08-20T11:00:00Z',
      source: 'Laboratorio_Nacional_Salud',
      departmentId: 'gt-chq',
      diseaseId: 'triatoma-dimidiata',
      pathogenScientificName: 'Trypanosoma cruzi',
      syndromeCategory: 'Zoonosis / Vectorial',
      eventDescription: 'Índice de infestación intradomiciliaria de Triatoma dimidiata superior al 8% en comunidades rurales de Olopa y Jocotán.',
      verifiedStatus: 'Oficial Confirmado',
      referenceWeek: 'SE-33 2024'
    }
  ];

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
