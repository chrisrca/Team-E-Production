import { MeshStandardMaterial, Color, Vector3 } from "three";
import "./Background.css";

const Elevator: React.FC<{ position: Vector3, level: number }> = ({ position, level }) => {
    const customMaterial = new MeshStandardMaterial({
        color: new Color(0x2b5685),
    });

    switch (level) {
        case 0:
            return(<></>);
        case 1:
            return (
                <>
                    <mesh
                        position={[position.x - 6.2, 0.2, position.z - 14.41]}
                        material={customMaterial}
                    >
                        <boxGeometry args={[0.57, 0.57, 0.57]} />
                    </mesh>
                    <mesh
                        position={[position.x - 13.62, 0.2, position.z - 7.75]}
                        material={customMaterial}
                    >
                        <boxGeometry args={[0.57, 0.57, 0.57]} />
                    </mesh>
                    <mesh
                        position={[position.x - 13.62, 0.2, position.z - 7.75]}
                        material={customMaterial}
                    >
                        <boxGeometry args={[0.57, 0.57, 0.57]} />
                    </mesh>
                    <mesh
                        position={[position.x - 14.25, 0.2, position.z - 14.89]}
                        material={customMaterial}
                    >
                        <boxGeometry args={[0.57, 0.57, 0.57]} />
                    </mesh>
                    <mesh
                        position={[position.x - 14.25, 0.2, position.z - 16.1]}
                        material={customMaterial}
                    >
                        <boxGeometry args={[0.57, 0.57, 0.57]} />
                    </mesh>
                    <mesh
                        position={[position.x - 2.15, 0.2, position.z - 18]}
                        material={customMaterial}
                    >
                        <boxGeometry args={[0.57, 0.57, 0.57]} />
                    </mesh>
                    <mesh
                        position={[position.x - 3.4, 0.2, position.z - 18]}
                        material={customMaterial}
                    >
                        <boxGeometry args={[0.57, 0.57, 0.57]} />
                    </mesh>
                    <mesh
                        position={[position.x + 4.3, 0.2, position.z - 12.06]}
                        material={customMaterial}
                    >
                        <boxGeometry args={[0.57, 0.57, 0.57]} />
                    </mesh>
                    <mesh
                        position={[position.x - 17.85, 0.2, position.z + 8.31]}
                        material={customMaterial}
                    >
                        <boxGeometry args={[0.57, 0.57, 0.57]} />
                    </mesh>
                </>
            );
        case 2:
            return(<></>);
        case 3:
            return(<></>);
        case 4:
            return(<></>);
        default:
            return(<></>);
    }
};

export default Elevator;
