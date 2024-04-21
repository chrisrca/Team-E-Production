import React, { useState } from "react";
import { Edge } from "common/src/types";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const defaultEdge = {
    edgeID: "",
    start: "",
    end: "",
};

async function sendEdgeCreateOrder(editedEdge: Edge) {
    axios.post("/api/mapeditorcreate/edges", editedEdge).then((res) => {
        console.log(res);
    });
}

interface EdgeCreatorProps {
    edgeID: string;
    startNodeID: string;
    endNodeID: string;
}

const EdgeCreator: React.FC<EdgeCreatorProps> = ({ edgeID, startNodeID, endNodeID }) => {
    const [editedEdge, setEditedEdge] = useState<Edge>({ edgeID: edgeID, start: startNodeID, end: endNodeID });

    // Function to handle form submission
    function handleSubmit() {
        if (editedEdge != null) {
            // Set the edgeID directly within editedEdge
            editedEdge.edgeID = edgeID;
            sendEdgeCreateOrder(editedEdge); // Call the function with editedEdge
        }
        setEditedEdge(defaultEdge);
    }

    // Function to handle cancel action
    function handleCancel() {
        console.log("Cancel edge logic here");
        setEditedEdge(defaultEdge);
    }

    return (
        <div className="absolute bg-secondary rounded-lg p-5 space-y-2 z-50 top-[10vh] ml-10">
            <h3>Create Edge</h3>

            <div>
                <Label>
                    Edge ID:
                    <Input
                        type="text"
                        name="edgeID"
                        value={editedEdge.edgeID}
                        onChange={(e) =>
                            setEditedEdge({
                                ...editedEdge,
                                edgeID: e.target.value,
                            })
                        }
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Start Node ID:
                    <Input
                        type="text"
                        name="start"
                        value={startNodeID}
                    />
                </Label>
            </div>
            <div>
                <Label>
                    End Node ID:
                    <Input
                        type="text"
                        name="end"
                        value={endNodeID}
                    />
                </Label>
            </div>

            <div className="space-x-2">
                <Button onClick={handleSubmit}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    );
};

export default EdgeCreator;
