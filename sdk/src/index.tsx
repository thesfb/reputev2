import React, { useState, useEffect, ReactNode } from 'react';

// The Hook
export function useRepute(criteria: string = "power-user") {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const check = async () => {
    // @ts-ignore
    if (!window.solana) return;
    setIsLoading(true);
    try {
      // @ts-ignore
      const address = window.solana.publicKey.toString();
      // Point this to your DEPLOYED Vercel URL later
      const res = await fetch('http://localhost:3000/api/verify', {
        method: 'POST',
        body: JSON.stringify({ address, criteria })
      });
      const data = await res.json();
      setIsVerified(data.verified);
    } catch (e) {
      console.error(e);
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { check(); }, []);

  return { isVerified, isLoading, checkReputation: check };
}

// The Component
export const ReputeGate = ({ children, criteria, fallback }: any) => {
  const { isVerified, isLoading } = useRepute(criteria);

  if (isLoading) return <div>Verifying Reputation...</div>;
  if (isVerified) return <>{children}</>;
  return <>{fallback || <div>Access Denied. Mint Badge at Repute.xyz</div>}</>;
};