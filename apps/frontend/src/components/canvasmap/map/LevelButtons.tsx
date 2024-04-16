import { Button } from "../../ui/button.tsx";
import React, { useState } from "react"; // Make sure to import useState

function LevelButtons({
    updateLevel,
}: {
    updateLevel: (level: number) => void;
}) {
    const [activeLevel, setActiveLevel] = useState<number>(1);

    function handleLevel(level: number) {
        updateLevel(level);
        setActiveLevel(level); // Update the active level state
    }

    // Function to determine button style
    function getButtonStyle(level: number) {
        return {
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: activeLevel === level ? "#082c5c" : "white",
            color: activeLevel === level ? "white" : "black",
            margin: "5px",
            border: "none",
            cursor: "pointer",
        };
    }

    return (
        <div className="absolute z-10 top-0 right-0 p-5 flex flex-col space-y-2">
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
