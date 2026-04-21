'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147340.profitablecpmratenetwork.com/e2/e7/c3/e2e7c361cfa3749db51ecb5d9f500c8f.js", "https://pl29147344.profitablecpmratenetwork.com/08/c0/bd/08c0bd441ed4575053fc96555ca165c9.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
