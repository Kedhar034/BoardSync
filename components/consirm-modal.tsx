"use client";

import {
    AlertDialog,
AlertDialogHeader,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogTitle,
AlertDialogTrigger

} from "@/components/ui/alert-dialog";


interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () =>void;
    disabled?: boolean;
    header: string;
    description?: string;

}

export const ConfirmModal = ({
    children,
    onConfirm,
    disabled,
    header,
    description,

}:ConfirmModalProps) =>{

    const handleConfirm = ( ) => {
        onConfirm();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger> 
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {header}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        disabled={disabled}
                        onClick ={handleConfirm}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}