import { expect, test, describe } from "vitest";
import runBFS from "../src/algos/BFS.ts";
import runASTAR from "../src/algos/ASTAR.ts";
import runDFS from "../src/algos/DFS.ts";
import { convertNodeID } from "../src/algos/graphData.ts";

describe("BFS Algorithm", () => {
    test("Starts in elevator going to different floor immediately", async () => {
        const path = await runBFS("WELEV00J03", "BDEPT00402");
        expect(convertNodeID(path)).toStrictEqual([
            "WELEV00J03",
            "WELEV00J02",
            "BHALL00502",
            "BDEPT00402",
        ]);
    });
});
describe("A* Algorithm", () => {
    test("Starts in elevator going to different floor immediately", async () => {
        const path = await runASTAR("WELEV00J03", "BDEPT00402");
        expect(convertNodeID(path)).toStrictEqual([
            "WELEV00J03",
            "WELEV00J02",
            "BHALL00502",
            "BDEPT00402",
        ]);
    });
});
describe("DFS Algorithm", () => {
    test("Starts in elevator going to different floor immediately", async () => {
        const path = await runDFS("WELEV00J03", "BDEPT00402");
        expect(convertNodeID(path)).toStrictEqual([
            "WELEV00J03",
            "WELEV00J02",
            "BHALL00502",
            "BDEPT00402",
        ]);
    });
});
