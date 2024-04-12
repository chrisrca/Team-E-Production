import React, { useState } from "react";
import { DBNode } from "common/src/types";

interface NodeEditorProps {
    node: DBNode | null;
    onSave: (updatedNode: DBNode) => void;
    onCancel: () => void;
}

export default function NodeEditor({
    node,
    onSave,
    onCancel,
}: NodeEditorProps) {
    const [editedNode, setEditedNode] = useState<DBNode | null>(node);
    const [blockedEdges, setBlockedEdges] = useState<string[]>([]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setEditedNode((prevNode) => ({
            ...prevNode!,
            [name]: value,
        }));
    }

    function handleEdgeCheckboxChange(
        e: React.ChangeEvent<HTMLInputElement>,
        edgeID: string,
    ) {
        const isChecked = e.target.checked;

        setBlockedEdges((prev) => {
            if (isChecked) {
                // Add edgeID to the blocked list
                return [...prev, edgeID];
            } else {
                // Remove edgeID from the blocked list
                return prev.filter((id) => id !== edgeID);
            }
        });
    }

   /* function handleSubmit() {
        if (editedNode) {
            // Filter out blocked edges from the edited node's edges
            const updatedEdges = editedNode.edges.filter(
                (edge) => !blockedEdges.includes(edge.edgeID),
            );
            const updatedNode = { ...editedNode, edges: updatedEdges };

            onSave(updatedNode);
        }
    }
*/
    if (!editedNode) return null;

    return (
        <div className="node-editor">
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
                    Floor:
                    <input
                        type="text"
                        name="floor"
                        value={editedNode.floor}
                        onChange={handleInputChange}
                        disabled
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
                        disabled
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
                        disabled
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

            {/* Display checkboxes for blocking connections
            <h4>Block Connections</h4>
            {editedNode.edges.map((edge) => (
                <div key={edge.edgeID}>
                    <label>
                        <input
                            type="checkbox"
                            checked={blockedEdges.includes(edge.edgeID)}
                            onChange={(e) =>
                                handleEdgeCheckboxChange(e, edge.edgeID)
                            }
                        />
                        Block connection to {edge.end}
                    </label>
                </div>
            ))}

            <button onClick={handleSubmit}>Save</button> */}
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
