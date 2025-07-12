import Image from "next/image";

export const Loading =() =>{
    return (
        <div className="h-full w-full flex flex-col gay-y-4 justify-center items-center">
            <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={100}
                className="animate-spin duartion-600"
            />
        </div>
    )
}