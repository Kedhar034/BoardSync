import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,  
    DialogTrigger,

} from '@/components/ui/dialog';
import { CreateOrganization } from '@clerk/nextjs';

export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/ele.png"   
                alt="Empty Organization"
                width={200} 
                height={200}
                />
                <h2 className='text-2xl font-semibold mt-6'>Welcome To BoardSync</h2>
                <p className='test-muted-foreground text-sm mt-2'> 
                    Create an organization to get started with your boards.
                </p>
                <div className='mt-6'>
                    <Dialog>
                    <DialogTrigger asChild>
                        <Button className='mt-4 bg-emerald-700 hover:bg-green-900 text-white'>
                            Create Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                        <CreateOrganization/>
                    </DialogContent>
                </Dialog>
                </div>
                
        </div>

    );
}