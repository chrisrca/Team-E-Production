import React, { useState } from "react";
import { Vector3 } from "three";
import { Line } from "@react-three/drei";
import { DBNode } from "common/src/types";

interface Edge {
    id: string;
    start: string;
    end: string;
}

const GraphMesh: React.FC<{
    position: Vector3;
    pathNodes: DBNode[];
    level: number;
    nodes: DBNode[];
    setHoverNode: (node: DBNode) => void;
    isDraggable: (draggable: boolean) => void;
}> = ({ position, pathNodes, level, nodes, setHoverNode, setIsDraggable }) => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const floor = ["L2", "L1", "1", "2", "3"];
    if (!nodes) return;

    // Generating edges from the path
    const edges: Edge[] = pathNodes
        .map((node, index) => ({
            id: `edge-${index}`,
            start: node.nodeID,
            end: pathNodes[index + 1]
                ? pathNodes[index + 1].nodeID
                : node.nodeID,
        }))
        .slice(0, -1);

    const getMeshByNodeType = (nodeType: string) => {
        switch (nodeType) {
            case "HALL":
                return {
                    mesh: <boxGeometry args={[1, 1, 1]} />,
                    color: "#0a2ce1",
                };
            case "CONF":
                return {
                    mesh: <boxGeometry args={[2, 1, 1]} />,
                    color: "#25982a",
                };
            case "DEPT":
                return {
                    mesh: <sphereGeometry args={[0.5, 32, 32]} />,
                    color: "#e04545",
                };
            case "ELEV":
                return {
                    mesh: <cylinderGeometry args={[0.5, 0.5, 1, 32]} />,
                    color: "#da8f08",
                };
            case "EXIT":
                return {
                    mesh: <cylinderGeometry args={[0.5, 0.5, 1, 6]} />,
                    color: "#ddde1f",
                };
            case "INFO":
                return {
                    mesh: <coneGeometry args={[0.5, 1, 3]} />,
                    color: "#1fe18a",
                };
            case "LABS":
                return {
                    mesh: <octahedronGeometry args={[1, 0]} />,
                    color: "#9608da",
                };
            case "REST":
                return {
                    mesh: <boxGeometry args={[1, 1, 1]} />,
                    color: "#5cdbda",
                }; // Parallelogram shape not directly available, using box for example
            case "BATH":
                return {
                    mesh: <boxGeometry args={[1, 1, 1]} />,
                    color: "#ce24d4",
                }; // Trapezoid shape not directly available, using box for example
            case "RETL":
                return {
                    mesh: <cylinderGeometry args={[0.5, 0.5, 1, 8]} />,
                    color: "#0b6009",
                };
            case "STAI":
                return {
                    mesh: <cylinderGeometry args={[0.5, 0.5, 1, 5]} />,
                    color: "#82a7f6",
                };
            case "SERV":
                return {
                    mesh: <cylinderGeometry args={[0.5, 0.5, 1, 7]} />,
                    color: "#67c537",
                };
            default:
                return {
                    mesh: <boxGeometry args={[0.5, 0.5, 0.5]} />,
                    color: "gray",
                };
        }
    };

    return (
        <>
            {nodes.map((node, index) => {
                if (node.floor == floor[level]) {
                    const { mesh, color } = getMeshByNodeType(node.nodeType);
                    return (
                        <mesh
                            key={index}
                            position={[
                                position.x - 50 + node.xcoord / 50,
                                0.1,
                                position.z - 34 + node.ycoord / 50,
                            ]}
                            scale={
                                hoveredNode === node.nodeID
                                    ? [0.25, 0.25, 0.25]
                                    : [0.15, 0.15, 0.15]
                            }
                            onPointerOver={() => {
                                setHoveredNode(node.nodeID);
                                setIsDraggable(false);
                            }}
                            onPointerOut={() => {
                                setHoveredNode(null);
                                setIsDraggable(true);
                            }}
                            onClick={() => {
                                setHoverNode(node);
                            }}
                            onPointerDown={() => {
                                setHoverNode(node);
                            }}
                        >
                            {mesh}
                            <meshBasicMaterial color={color} />
                        </mesh>
                    );
                }
            })}
            {edges.map((edge, index) => {
                const startNode = nodes.find(
                    (node) => node.nodeID === edge.start,
                );
                const endNode = nodes.find((node) => node.nodeID === edge.end);
                if (
                    startNode &&
                    endNode &&
                    startNode.floor == floor[level] &&
                    endNode.floor == floor[level]
                ) {
                    return (
                        <Line
                            key={index}
                            points={[
                                [
                                    position.x - 50 + startNode.xcoord / 50,
                                    0,
                                    position.z - 34 + startNode.ycoord / 50,
                                ],
                                [
                                    position.x - 50 + endNode.xcoord / 50,
                                    0,
                                    position.z - 34 + endNode.ycoord / 50,
                                ],
                            ]}
                            color="orange"
                            lineWidth={10}
                        />
                    );
                } else {
                    return null;
                }
            })}
        </>
    );
};

export default GraphMesh;
