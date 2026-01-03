"use client"

import { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Loader2, ShieldCheck, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

// Define the shape of the window.solana object
declare global {
  interface Window {
    solana: any;
  }
}

interface ReputeGateProps {
  children: ReactNode;
  criteria?: string; // e.g. "power-user"
}

export function ReputeGate({ children, criteria = "power-user" }: ReputeGateProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const checkAccess = async () => {
    if (!window.solana || !window.solana.isPhantom) {
        toast({ title: "Wallet not found", variant: "destructive" });
        return;
    }

    try {
        setIsLoading(true);
        // 1. Connect (or just get address if already connected)
        await window.solana.connect();
        const address = window.solana.publicKey.toString();

        // 2. Ask Repute API if this user is verified
        const res = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address })
        });

        const data = await res.json();

        if (data.verified) {
            setHasAccess(true);
            toast({ 
                title: "Access Granted", 
                description: "Reputation Badge confirmed.",
                className: "bg-green-100 border-green-500 text-green-900"
            });
        } else {
            setHasAccess(false);
            toast({ 
                title: "Access Denied", 
                description: "You do not hold the required Reputation Badge.",
                variant: "destructive"
            });
        }
    } catch (e) {
        console.error(e);
        toast({ title: "Error", description: "Verification failed", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  // If access is granted, render the protected content
  if (hasAccess) {
    return (
        <div className="relative">
            <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-3 h-3" /> Verified
            </div>
            {children}
        </div>
    );
  }

  // Otherwise, render the Gate UI
  return (
    <Card className="p-8 border-dashed border-2 border-muted-foreground/25 bg-muted/5 text-center space-y-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold">Reputation Gated Content</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
            This content is exclusive to <strong>{criteria === "power-user" ? "Jupiter Power Users" : criteria}</strong>. 
            Please verify your badge to enter.
        </p>
        
        <div className="flex flex-col gap-3 justify-center items-center pt-2">
            <Button onClick={checkAccess} disabled={isLoading} size="lg" className="w-full max-w-xs">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                Verify Badge
            </Button>
            
            <a href="/" className="text-sm text-primary hover:underline flex items-center gap-1">
                Don't have a badge? Mint one here <ExternalLink className="w-3 h-3" />
            </a>
        </div>
    </Card>
  );
}