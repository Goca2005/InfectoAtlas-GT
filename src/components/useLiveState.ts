import { useEffect, useState } from 'react';
import { emptyLiveState, LIVE_EVENT, LiveRepository } from '../services/liveService';
import type { LiveState } from '../types/live';
import type { LiveAlertsState } from '../services/liveAlerts';

export function useLiveState() {
  const [state, setState] = useState<LiveState>(emptyLiveState);
  const [storageError, setStorageError] = useState('');
  const [alerts, setAlerts] = useState<LiveAlertsState>({ version: 1, alerts: [], seenKeys: [] });
  const refresh = () => {
    try { const repository = new LiveRepository(localStorage); setState(repository.read()); setAlerts(repository.readAlerts()); setStorageError(''); }
    catch (error) { setStorageError(error instanceof Error ? error.message : 'No se pudo leer el historial local.'); }
  };
  useEffect(() => {
    refresh();
    window.addEventListener(LIVE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => { window.removeEventListener(LIVE_EVENT, refresh); window.removeEventListener('storage', refresh); };
  }, []);
  const toggleFollow = (id: string) => {
    try { new LiveRepository(localStorage).toggleFollow(id); window.dispatchEvent(new Event(LIVE_EVENT)); }
    catch (error) { setStorageError(error instanceof Error ? error.message : 'No se pudo guardar el seguimiento.'); }
  };
  const markAlertsRead = (ids: string[], read = true) => {
    try { new LiveRepository(localStorage).markAlertsRead(ids, read); window.dispatchEvent(new Event(LIVE_EVENT)); }
    catch (error) { setStorageError(error instanceof Error ? error.message : 'No se pudo guardar la lectura.'); }
  };
  return { state, alerts, storageError, toggleFollow, markAlertsRead };
}
