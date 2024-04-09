import { Button } from "../ui/button";

function LevelButtons() {
    return (
        <div className="absolute z-10 top-0 right-0 p-5 flex flex-col space-y-2">
            <Button className="size-12 shadow-xl">3</Button>
            <Button className="size-12 shadow-xl">2</Button>
            <Button className="size-12 shadow-xl">L2</Button>
            <Button className="size-12 shadow-xl">L1</Button>
        </div>
    );
}
export default LevelButtons;
