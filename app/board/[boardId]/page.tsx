import { CanvasLoading } from "./_components/canvas-loading";
import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";


interface BoardIdPageProps {
    params: Promise<{
        boardId: string;
    }>
}

const BoardIdPage = async ({
    params
}: BoardIdPageProps) => {
    const { boardId } = await params;

    return (
        <div>
            <Room roomId={boardId} fallback={<CanvasLoading/>}>
                <Canvas boardId={boardId}/>
            </Room>
            
        </div>
    )
}

export default BoardIdPage;