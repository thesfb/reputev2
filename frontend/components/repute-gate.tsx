"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Lock, AlertCircle, Loader2, ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ReputeGateProps {
  children: React.ReactNode;
  criteria?: string;
  mintUrl?: string; // NEW: Where to send unverified users
}

export function ReputeGate({ 
  children, 
  criteria = "power-user",
  mintUrl = "/launch" // Defaults to your internal launch page
}: ReputeGateProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { toast } = useToast();

  const checkAccess = async () => {
    // 1. Check Wallet Presence
    if (!window.solana || !window.solana.isPhantom) {
        toast({ title: "Wallet Not Found", description: "Please connect Phantom.", variant: "destructive" });
        return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
        // 2. Silent Connect (if trusted) or Popup
        const response = await window.solana.connect();
        const address = response.publicKey.toString();

        // 3. Verify via API
        const res = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address, criteria })
        });

        const data = await res.json();

        if (res.ok && data.verified) {
            setHasAccess(true);
            toast({ 
                title: "Access Granted", 
                description: "Reputation verified.",
                className: "bg-green-100 border-green-500 text-green-900" 
            });
        } else {
            setHasAccess(false);
            setErrorMsg("Badge Missing"); // Simple internal flag
            toast({ 
                title: "Access Denied", 
                description: "You need a Reputation Badge to enter.",
                variant: "destructive" 
            });
        }
    } catch (e) {
        console.error(e);
        toast({ title: "Error", description: "Verification failed.", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  // ✅ STATE 1: ACCESS GRANTED
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

  // ❌ STATE 2: ACCESS DENIED (SHOW MINT CTA)
  return (
    <div className="p-8 border-dashed border-2 border-muted-foreground/25 bg-muted/5 rounded-xl text-center space-y-6">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto relative">
            <Lock className="w-8 h-8 text-muted-foreground" />
            {errorMsg && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background" />
            )}
        </div>
        
        <div className="space-y-2">
            <h3 className="font-bold text-xl">
                {errorMsg ? "Badge Required" : "Restricted Access"}
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                This content is gated for <strong>{criteria}</strong> holders. 
                {errorMsg ? " Your connected wallet does not have this badge." : " Please verify your status."}
            </p>
        </div>

        <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
            {/* Main Action: Verify */}
            <Button onClick={checkAccess} disabled={isLoading} size="lg" className="w-full">
                {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Checking...</> : "Check Access"}
            </Button>

            {/* Secondary Action: MINT (Only shows if check failed or by default) */}
            <Link href={mintUrl} target="_blank" className="w-full">
                <Button variant="outline" className="w-full group">
                    Get Verified <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
            
            <p className="text-[10px] text-muted-foreground mt-2">
                Powered by Repute Protocol
            </p>
        </div>
    </div>
  );
}