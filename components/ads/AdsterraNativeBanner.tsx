'use client';
import { useEffect, useRef } from 'react';

export function AdsterraNativeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = '1';
    const s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.src = 'https://pl29147342.profitablecpmratenetwork.com/242a0609166f305f25104ce0c05d00c0/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return <div ref={ref} id="container-242a0609166f305f25104ce0c05d00c0" style={{ margin: '1.5rem 0', minHeight: '90px' }} />;
}
