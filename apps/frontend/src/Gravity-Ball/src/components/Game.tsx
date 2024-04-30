import dynamic from "next/dynamic";
import { RecoilRoot } from "recoil";
import { KeyboardControlsRoot } from "./KeyboardControls";
import { UI } from "./UI";
import { HUD } from "./HUD";
import { DisablePageScroll } from "./DisablePageScroll";
import { JoystickControlsRoot } from "./JoystickControls";

const CanvasRootLazy = dynamic(() =>
    import("./CanvasRoot").then((mod) => mod.CanvasRoot),
);

export const Game = () => {
    return (
        <RecoilRoot>
            <DisablePageScroll />
            <div className="h-screen">
                <JoystickControlsRoot>
                    <UI />
                    <HUD />
                    <KeyboardControlsRoot>
                        <CanvasRootLazy />
                    </KeyboardControlsRoot>
                </JoystickControlsRoot>
            </div>
        </RecoilRoot>
    );
};
