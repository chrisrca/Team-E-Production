import { expect, test, describe } from "vitest";
import runBFS from "../src/algos/BFS.ts";
import runASTAR from "../src/algos/ASTAR.ts";
import runDFS from "../src/algos/DFS.ts";
import { convertNodeID } from "../src/algos/graphData.ts";

describe("BFS Algorithm Tests", () => {
    test("Traverses the same floor between two rooms", async () => {
        const path = await runBFS("ADEPT00101", "ADEPT00301");
        expect(convertNodeID(path)).toStrictEqual([
            "ADEPT00101",
            "AHALL00401",
            "AHALL00501",
            "AHALL00701",
            "ADEPT00301",
        ]);
    });
    test("Traverses the between two adjacent floors", async () => {
        const path = await runBFS("CLABS001L1", "GLABS003L2");
        expect(convertNodeID(path)).toStrictEqual([
            "CLABS001L1",
            "WELEV00ML1",
            "WELEV00ML2",
            "CHALL005L2",
            "WHALL001L2",
            "WHALL002L2",
            "GHALL001L2",
            "GLABS003L2",
        ]);
    });
    test("Path differs from ASTAR path (less nodes but more distance)", async () => {
        const path1 = await runBFS("CDEPT002L1", "CLABS005L1");
        const path2 = await runASTAR("CDEPT002L1", "CLABS005L1");
        expect(convertNodeID(path1)).toStrictEqual([
            "CDEPT002L1",
            "CHALL013L1",
            "CHALL012L1",
            "CRETL001L1",
            "CHALL009L1",
            "WELEV00KL1",
            "CHALL008L1",
            "CDEPT004L1",
            "CHALL002L1",
            "CCONF003L1",
            "CHALL003L1",
            "CLABS005L1",
        ]);
        expect(
            convertNodeID(path1).toString() == convertNodeID(path2).toString(),
        ).toBe(false);
    });
    test("Starts in elevator going to different floor immediately", async () => {
        const path = await runBFS("WELEV00J03", "BDEPT00402");
        expect(convertNodeID(path)).toStrictEqual([
            "WELEV00J03",
            "WELEV00J02",
            "BHALL00502",
            "BDEPT00402",
        ]);
    });
    test("Starts on stairs going to different floor immediately", async () => {
        const path = await runBFS("ASTAI00101", "ACONF00102");
        expect(convertNodeID(path)).toStrictEqual([
            "ASTAI00101",
            "ASTAI00102",
            "AHALL00202",
            "AHALL00102",
            "ACONF00102",
        ]);
    });
    test("Starts at a node and ends immediately at that node", async () => {
        const path = await runBFS("BDEPT00402", "BDEPT00402");
        expect(convertNodeID(path)).toStrictEqual(["BDEPT00402"]);
    });
});
describe("A* Algorithm Tests", () => {
    test("Traverses the same floor between two rooms", async () => {
        const path = await runASTAR("ADEPT00101", "ADEPT00301");
        expect(convertNodeID(path)).toStrictEqual([
            "ADEPT00101",
            "AHALL00401",
            "AHALL00501",
            "AHALL00701",
            "ADEPT00301",
        ]);
    });
    test("Traverses the between two adjacent floors", async () => {
        const path = await runASTAR("CLABS001L1", "GLABS003L2");
        expect(convertNodeID(path)).toStrictEqual([
            "CLABS001L1",
            "WELEV00ML1",
            "WELEV00ML2",
            "CHALL005L2",
            "WHALL001L2",
            "WHALL002L2",
            "GHALL001L2",
            "GLABS003L2",
        ]);
    });
    test("Path differs from BFS path (more nodes but less distance)", async () => {
        const path1 = await runASTAR("CDEPT002L1", "CLABS005L1");
        const path2 = await runBFS("CDEPT002L1", "CLABS005L1");
        expect(convertNodeID(path1)).toStrictEqual([
            "CDEPT002L1",
            "CHALL013L1",
            "CHALL012L1",
            "CRETL001L1",
            "CHALL009L1",
            "WELEV00KL1",
            "CHALL008L1",
            "CDEPT004L1",
            "CHALL002L1",
            "CSERV001L1",
            "CCONF002L1",
            "WELEV00HL1",
            "CHALL004L1",
            "CREST004L1",
            "CLABS005L1",
        ]);
        expect(
            convertNodeID(path1).toString() == convertNodeID(path2).toString(),
        ).toBe(false);
    });
    test("Starts in elevator going to different floor immediately", async () => {
        const path = await runASTAR("WELEV00J03", "BDEPT00402");
        expect(convertNodeID(path)).toStrictEqual([
            "WELEV00J03",
            "WELEV00J02",
            "BHALL00502",
            "BDEPT00402",
        ]);
    });
    test("Starts on stairs going to different floor immediately", async () => {
        const path = await runASTAR("ASTAI00101", "ACONF00102");
        expect(convertNodeID(path)).toStrictEqual([
            "ASTAI00101",
            "ASTAI00102",
            "AHALL00202",
            "AHALL00102",
            "ACONF00102",
        ]);
    });
    test("Starts at a node and ends immediately at that node", async () => {
        const path = await runASTAR("BDEPT00402", "BDEPT00402");
        expect(convertNodeID(path)).toStrictEqual(["BDEPT00402"]);
    });
});
describe("DFS Algorithm Tests", () => {
    test("Traverses the same floor between two rooms", async () => {
        const path = await runDFS("ADEPT00101", "ADEPT00301");
        expect(convertNodeID(path)).toStrictEqual([
            "ADEPT00101",
            "AHALL00401",
            "AHALL00501",
            "AHALL00701",
            "ADEPT00301",
        ]);
    });
    test("Starts in elevator going to different floor immediately", async () => {
        const path = await runDFS("WELEV00J03", "BDEPT00402");
        expect(convertNodeID(path)).toStrictEqual([
            "WELEV00J03",
            "WELEV00J02",
            "BHALL00502",
            "BDEPT00402",
        ]);
    });
    test("Starts on stairs going to different floor immediately", async () => {
        const path = await runDFS("FSTAI00101", "BSTAI00102");
        expect(convertNodeID(path)).toStrictEqual([
            "FSTAI00101",
            "HSTAI00102",
            "HHALL00302",
            "WHALL00302",
            "WHALL00402",
            "BSTAI00102",
        ]);
    });
    test("Starts at a node and ends immediately at that node", async () => {
        const path = await runDFS("BDEPT00402", "BDEPT00402");
        expect(convertNodeID(path)).toStrictEqual(["BDEPT00402"]);
    });
});
