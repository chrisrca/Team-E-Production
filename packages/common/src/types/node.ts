import { Coords } from "./coords";
import { Edge } from "./edge";
export interface Node {
  nodeID: string;
  coords: Coords;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
  edges: Edge[];
}
