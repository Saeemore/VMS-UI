// src/hooks/useDrawer.js
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const DrawerContext = createContext(null);

export function DrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(null); // which panel to show, e.g. 'missedVisits'
  const openerRef = useRef(null); // for focus restore

  const open = useCallback((nextView, options = {}) => {
    openerRef.current = options.opener || null;
    setView(nextView || null);
    setIsOpen(true);
    // lock scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setView(null);
    // unlock scroll
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    // restore focus
    if (openerRef.current && typeof openerRef.current.focus === 'function') {
      openerRef.current.focus();
    }
  }, []);

  const value = useMemo(() => ({ isOpen, view, open, close }), [isOpen, view, open, close]);
  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error('useDrawer must be used within a DrawerProvider');
  return ctx;
}
