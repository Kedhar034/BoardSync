import Image from "next/image";

export const EmptySearch = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Image
                src="/empty.jpg"
                height={220}
                width={220}
                alt="No results found"
            />
            <h2 className="text-2xl font-semibold mt-6">
                No Results found
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try Searching for something else
            </p>
        </div>
    );
};