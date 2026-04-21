'use client';
import { useEffect, useRef } from 'react';

export function AdsterraDisplay() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = '1';
    const opt = document.createElement('script');
    opt.textContent = `atOptions = { 'key': '04f4f1fd9a38196595f10aabb4cdad5e', 'format': 'iframe', 'height': 60, 'width': 468, 'params': {} };`;
    ref.current.appendChild(opt);
    const invoke = document.createElement('script');
    invoke.src = 'https://www.highperformanceformat.com/04f4f1fd9a38196595f10aabb4cdad5e/invoke.js';
    ref.current.appendChild(invoke);
  }, []);
  return <div ref={ref} style={{ textAlign: 'center', overflow: 'hidden', margin: '1rem auto' }} />;
}
