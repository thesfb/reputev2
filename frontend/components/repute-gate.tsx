"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Lock, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

interface ReputeGateProps {
  children: React.ReactNode;
  criteria?: string;
}

export function ReputeGate({ children, criteria = "power-user" }: ReputeGateProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { toast } = useToast();

  const checkAccess = async () => {
    // 1. Check Wallet
    if (!window.solana || !window.solana.isPhantom) {
        toast({ title: "Wallet Not Found", description: "Please connect Phantom.", variant: "destructive" });
        return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
        // 2. Get Address
        const response = await window.solana.connect();
        const address = response.publicKey.toString();

        // 3. Call API
        const res = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address, criteria })
        });

        const data = await res.json();

        // 4. Handle Response
        if (res.ok && data.verified) {
            setHasAccess(true);
            toast({ 
                title: "Access Granted", 
                description: "Identity verified successfully.",
                className: "bg-green-100 border-green-500 text-green-900" 
            });
        } else {
            // HANDLE 401 / NOT VERIFIED
            setHasAccess(false);
            setErrorMsg("Not Verified. Access Denied.");
            toast({ 
                title: "Not Verified", 
                description: "Access Denied. You do not hold the required badge.",
                variant: "destructive" 
            });
        }
    } catch (e) {
        console.error(e);
        setErrorMsg("Connection Error");
        toast({ title: "System Error", description: "Could not verify reputation.", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  // If Access Granted -> Show Content
  if (hasAccess) {
      return (
        <div className="relative animate-in fade-in zoom-in duration-300">
            <div className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center shadow-sm z-10">
                <ShieldCheck className="w-3 h-3 mr-1" /> VERIFIED
            </div>
            {children}
        </div>
      );
  }

  // If Locked -> Show Gate UI
  return (
    <div className="p-8 border-dashed border-2 border-muted-foreground/25 bg-muted/5 rounded-xl text-center space-y-6">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
            <h3 className="font-bold text-xl">Restricted Access</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
                This content is gated for <strong>{criteria}</strong> holders only.
            </p>
        </div>

        <div className="flex flex-col items-center gap-3">
            <Button onClick={checkAccess} disabled={isLoading} size="lg" className="w-full max-w-xs">
                {isLoading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</>
                ) : (
                    "Verify Badge Access"
                )}
            </Button>

            {/* ERROR MESSAGE DISPLAY */}
            {errorMsg && (
                <div className="flex items-center text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errorMsg}
                </div>
            )}
        </div>
    </div>
  );
}