import React, { useRef, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { WebGLRenderer, TextureLoader, Vector3, Euler, PCFSoftShadowMap } from 'three';
import { OrbitControls } from '@react-three/drei';
import { THREE } from 'aframe';
import img from "./blankImages/00_thelowerlevel1.png";
import Stairs from './objects/Stairs';
import Borders from './objects/Borders';
import Rooms from './objects/Rooms';
import RoomOutlines from './objects/RoomOutlines';
import GraphMesh from './objects/dataGraph';
import Elevator from './objects/Elevator';
// import { TextGeometry } from 'three-stdlib';
import Building from './objects/Building';

const MapCanvas: React.FC<{ pathNodes: DBNode[], level: number, nodes: DBNode[] }> = ({ pathNodes, level, nodes }) => {
    const renderer = new WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(TextureLoader, img);
    const aspectRatio = 5000 / 3400;
    const width = 100;
    const height = width / aspectRatio;
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(new Vector3(0, 0, 0));
    const [rotation] = useState(new Euler(-Math.PI / 2, 0, 0));

    const handlePointerDown = (event: { stopPropagation: () => void; }) => {
        setIsDragging(true);
        event.stopPropagation(); 
    };

    const handlePointerMove = (event: { movementX: number; movementY: number; stopPropagation: () => void; }) => {
        if (isDragging && meshRef.current) {
            const deltaX = event.movementX;
            const deltaZ = -event.movementY;
            
            if ((position.x + deltaX * 0.013 > 28) || (position.x + deltaX * 0.013 < -40)) {
                if ((position.z - deltaZ * 0.013 < -28) || (position.z - deltaZ * 0.013 > 25)) {
                    setPosition(prev => new Vector3(prev.x, prev.y, prev.z));
                } else {
                    setPosition(prev => new Vector3(prev.x, prev.y, prev.z - deltaZ * 0.013));
                }
            } else if ((position.z - deltaZ * 0.013 < -28) || (position.z - deltaZ * 0.013 > 25)) {
                setPosition(prev => new Vector3(prev.x + deltaX * 0.013, prev.y, prev.z));
            } else {
                setPosition(prev => new Vector3(prev.x + deltaX * 0.013, prev.y, prev.z - deltaZ * 0.013));
            }
            
        }
        event.stopPropagation();
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    return (
        <>
            <mesh
                ref={meshRef}
                position={position}
                rotation={rotation}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerOut={handlePointerUp}
            >
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial map={texture} />
            </mesh>
            <>
                <Building position={position}/>
                <Rooms position={position}/>
                <Borders position={position}/>
                <RoomOutlines position={position}/>
                <Stairs position={position}/>
                <Elevator position={position}/>
                <GraphMesh position={position} pathNodes={pathNodes} level={level} nodes={nodes}/>
            </>
            {/* <Text
                position={[(position.x), 1, (position.z)]}
                color="white" // Default color
                anchorX="center" // Center the text horizontally
                anchorY="middle" // Center the text vertically
                fontSize={2}
            >
                Test
            </Text> */}
        </>
    );
};

const Map3d: React.FC<{ pathNodes: DBNode[], level: number, nodes: DBNode[]}> = ({ pathNodes, level, nodes }) => {
    return (
        <div className='map-container'>
            <Canvas camera={{ fov: 75, position: new Vector3(0, 5, 5), near: 1, far: 1000 }} style={{ height: '100vh', width: '100vw' }}>
                <directionalLight position={new Vector3(0, 5, 0)} castShadow={true} intensity={1}/>
                <directionalLight position={new Vector3(-5, 0, 0)} castShadow={true} intensity={0.5}/>
                <directionalLight position={new Vector3(0, 0, 5)} castShadow={true} intensity={0.25}/>
                <directionalLight position={new Vector3(0, 0, -5)} castShadow={true} intensity={0.15}/>
                <directionalLight position={new Vector3(5, 0, 0)} castShadow={true} intensity={0.15}/>
                <OrbitControls enableRotate={false} enableZoom={false} enablePan={false}/>
                <MapCanvas pathNodes={pathNodes} level={level} nodes={nodes}/>
            </Canvas>
        </div>
    );
};

export default Map3d;
