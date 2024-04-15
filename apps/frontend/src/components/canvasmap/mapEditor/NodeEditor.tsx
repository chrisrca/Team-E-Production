import React, { useState, useEffect } from "react";
import { DBNode } from "common/src/types";
import axios from "axios";

interface NodeEditorProps {
    node: DBNode | null;
}

async function sendNodeOrder(editedNode: DBNode) {
    axios.post("/api/mapeditor", editedNode).then((res) => {
        console.log(res);
    });
}

export default function NodeEditor({ node }: NodeEditorProps) {
    const [editedNode, setEditedNode] = useState<DBNode | null>(node);

    // Sync state when the node prop changes
    useEffect(() => {
        setEditedNode(node);
    }, [node]);

    // Function to handle blocking
    function handleBlock() {
        console.log("Block node logic here");
        setEditedNode((prevNode) => ({
            ...prevNode!,
            blocked: true,
        }));
    }
    // Function to handle form submission
    function handleSubmit() {
        if (editedNode != null) {
            sendNodeOrder(editedNode);
        }
        setEditedNode(null);
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
                <label>Node ID: {editedNode.nodeID}</label>
            </div>
            <div>
                <label>
                    Long Name:
                    <input
                        type="text"
                        name="longName"
                        value={editedNode.longName}
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                longName: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                nodeType: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                building: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                floor: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                xcoord: parseInt(e.target.value),
                            })
                        }
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
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                ycoord: parseInt(e.target.value),
                            })
                        }
                    />
                </label>
            </div>
            <div>
                <button onClick={handleBlock}>Block</button>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={handleCancel}>Cancel</button>{" "}
                {/* Use onCancel prop */}
            </div>
        </div>
    );
}
