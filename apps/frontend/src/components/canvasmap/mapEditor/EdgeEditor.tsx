import React, { useState, useEffect } from "react";
import { DBNode } from "common/src/types";
import { Button } from "@/components/ui/button.tsx";
import axios from "axios";

interface EdgeEditorProps {
    startNode: DBNode | null;
    endNode: DBNode | null;
    edgeID: string; // New prop for the edge ID
}

async function sendEdgeOrder(editedEdge: {
    startNode: DBNode | null;
    endNode: DBNode | null;
    edgeID: string;
}) {
    axios.post("/api/mapeditor/edges", editedEdge).then((res) => {
        console.log(res);
    });
}

async function sendEdgeDelOrder(editedEdge: {
    startNode: DBNode | null;
    endNode: DBNode | null;
    edgeID: string;
}) {
    axios.post("/api/mapeditordel/edges", editedEdge).then((res) => {
        console.log(res);
    });
}

const EdgeEditor: React.FC<EdgeEditorProps> = ({
    startNode,
    endNode,
    edgeID,
}) => {
    // State for the editable edge, initialized with the existing edge
    const [editedEdge, setEditedEdge] = useState<{
        startNode: DBNode | null;
        endNode: DBNode | null;
        edgeID: string;
    }>({ startNode, endNode, edgeID });

    // Sync state when the edge ID prop changes
    useEffect(() => {
        setEditedEdge({ startNode, endNode, edgeID });
    }, [startNode, endNode, edgeID]);

    // Function to handle form submission
    function handleSubmit() {
        sendEdgeOrder(editedEdge);
        setEditedEdge({ startNode: null, endNode: null, edgeID: "" });
    }

    // Function to handle cancel action
    function handleCancel() {
        setEditedEdge({ startNode: null, endNode: null, edgeID: "" });
    }

    function handleDelete() {
        sendEdgeDelOrder(editedEdge);
        setEditedEdge({ startNode: null, endNode: null, edgeID: "" });
    }

    return (
        <div
            style={{
                position: "fixed",
                top: "20px", // Adjust as needed for spacing from the top
                right: "20px", // Adjust as needed for spacing from the right
                backgroundColor: "#fff",
                padding: "20px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Add a box shadow
                zIndex: 9999, // Ensure it's above other elements
            }}
        >
            <h2>Edit Edge</h2>
            <div>
                <label htmlFor="edgeID">Edge ID:</label>
                <input
                    type="text"
                    id="edgeID"
                    value={editedEdge.edgeID} // Use the editedEdge state
                    onChange={(e) =>
                        setEditedEdge({ ...editedEdge, edgeID: e.target.value })
                    }
                />
            </div>
            <div>
                <p>Start Node ID: {startNode?.nodeID}</p>
                <p>End Node ID: {endNode?.nodeID}</p>
            </div>
            <div>
                <Button onClick={handleSubmit}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default EdgeEditor;
