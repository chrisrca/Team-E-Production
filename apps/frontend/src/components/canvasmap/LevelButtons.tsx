import { Button } from "../ui/button";

function LevelButtons({
    updateLevel,
}: {
    updateLevel: (level: number) => void;
}) {
    function handleLevel(level: number) {
        updateLevel(level);
    }

    return (
        <div className="absolute z-10 top-0 right-0 p-5 flex flex-col space-y-2">
            <Button
                onClick={() => handleLevel(4)}
                className="size-12 shadow-xl"
            >
                3
            </Button>
            <Button
                onClick={() => handleLevel(3)}
                className="size-12 shadow-xl"
            >
                2
            </Button>
            <Button
                onClick={() => handleLevel(2)}
                className="size-12 shadow-xl"
            >
                1
            </Button>
            <Button
                onClick={() => handleLevel(1)}
                className="size-12 shadow-xl"
            >
                L1
            </Button>
            <Button
                onClick={() => handleLevel(0)}
                className="size-12 shadow-xl"
            >
                L2
            </Button>
        </div>
    );
}
export default LevelButtons;
