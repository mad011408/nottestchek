"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface PricingDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PricingDialog({ isOpen, onClose }: PricingDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Pricing Plans</DialogTitle>
                    <DialogDescription>
                        Pricing details are coming soon.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <p>This feature is not yet available.</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
