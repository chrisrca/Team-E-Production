import React, { useState, useEffect } from "react";
import { DBNode } from "common/src/types";

interface NodeEditorProps {
    node: DBNode | null;
}

export default function NodeEditor({ node }: NodeEditorProps) {
    const [editedNode, setEditedNode] = useState<DBNode | null>(node);

    // Sync state when the node prop changes
    useEffect(() => {
        setEditedNode(node);
    }, [node]);

    // Function to handle input changes
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setEditedNode((prevNode) => ({
            ...prevNode!,
            [name]: value,
        }));
    }

    // Function to handle form submission
    function handleSubmit() {
        console.log("Save node logic here");
    }

    // Function to handle cancel action
    function handleCancel() {
        console.log("Cancel node logic here");
        setEditedNode(null);
    }

    // If no node is provided, return null
    if (!editedNode) return null;

    return (
        <div
            className="node-editor"
            style={{
                position: "fixed",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                padding: "10px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "5px",
                zIndex: 1000,
            }}
        >
            <h3>Edit Node</h3>
            <div>
                <label>
                    Node ID:
                    <input
                        type="text"
                        name="nodeID"
                        value={editedNode.nodeID}
                        onChange={handleInputChange}
                        disabled
                    />
                </label>
            </div>
            <div>
                <label>
                    Long Name:
                    <input
                        type="text"
                        name="longName"
                        value={editedNode.longName}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Node Type:
                    <input
                        type="text"
                        name="nodeType"
                        value={editedNode.nodeType}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Building:
                    <input
                        type="text"
                        name="building"
                        value={editedNode.building}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Floor:
                    <input
                        type="text"
                        name="floor"
                        value={editedNode.floor}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    X Coordinate:
                    <input
                        type="number"
                        name="xcoord"
                        value={editedNode.xcoord}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Y Coordinate:
                    <input
                        type="number"
                        name="ycoord"
                        value={editedNode.ycoord}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={handleCancel}>Cancel</button>{" "}
                {/* Use onCancel prop */}
            </div>
        </div>
    );
}
