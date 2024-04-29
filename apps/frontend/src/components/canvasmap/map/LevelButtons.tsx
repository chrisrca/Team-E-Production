import { Button } from "../../ui/button.tsx";

interface LevelButtonProps {
    levelProps: [level: number, setLevel: (level: number) => void];
}

function LevelButtons(levelProps: LevelButtonProps) {
    const level = levelProps.levelProps[0];
    const updateLevel = levelProps.levelProps[1];

    function handleLevel(level: number) {
        updateLevel(level);
    }

    // Function to determine button style
    function getButtonStyle(activelevel: number) {
        return {
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: level === activelevel ? "#082c5c" : "white",
            color: level === activelevel ? "white" : "black",
            margin: "5px",
            border: "none",
            cursor: "pointer",
        };
    }

    return (
        <div className="absolute z-10 top-24 right-0 p-5 flex flex-col space-y-2">
            <Button onClick={() => handleLevel(4)} style={getButtonStyle(4)}>
                3
            </Button>
            <Button onClick={() => handleLevel(3)} style={getButtonStyle(3)}>
                2
            </Button>
            <Button onClick={() => handleLevel(2)} style={getButtonStyle(2)}>
                1
            </Button>
            <Button onClick={() => handleLevel(1)} style={getButtonStyle(1)}>
                L1
            </Button>
            <Button onClick={() => handleLevel(0)} style={getButtonStyle(0)}>
                L2
            </Button>
        </div>
    );
}
export default LevelButtons;
