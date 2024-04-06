import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const CanvasMap = () => {
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const image = new Image();
        image.src = '../../src/assets/00_thelowerlevel1.png';
        image.onload = () => {
            setImageSize({ width: image.width, height: image.height});
        };

        // Update container size on mount
        updateContainerSize();

        // Update container size on window resize
        window.addEventListener('resize', updateContainerSize);

        return () => {
            window.removeEventListener('resize', updateContainerSize);
        };
    }, []);

    // Function to update container size
    const updateContainerSize = () => {
        setContainerSize({
            width: window.outerWidth,
            height: window.outerHeight,
        });
    };

    // Function to handle panning stopped event
    const handlePanningStopped = (e) => {
        const transformComponent = e.target;
        const { x, y } = transformComponent.getTransformPosition();
        const { scaleX, scaleY } = transformComponent.getTransformScale();

        // If image is smaller than the container, center it
        if (imageSize.width * scaleX < containerSize.width) {
            transformComponent.setTransformPosition({
                x: (containerSize.width - imageSize.width * scaleX) / 2,
                y,
            });
        }
        if (imageSize.height * scaleY < containerSize.height) {
            transformComponent.setTransformPosition({
                x,
                y: (containerSize.height - imageSize.height * scaleY) / 2,
            });
        }
    };

    return (
        <TransformWrapper
            initialScale={1.5}
            centerOnInit={true}
            limitToBounds={true}
            minScale={1}
            maxScale={4}
            wheel={{ step: 0.5 }}
            options={{ limitToBounds: false }}
            doubleClick={{ disabled: false }}
            defaultPositionY={-100}
        >
            {() => (
                <React.Fragment>
                    <TransformComponent onPanningStopped={handlePanningStopped}>
                        <div
                            style={{
                                margin: '-7.5%',
                                width: '200vh',
                                height: '200vh',
                                backgroundImage: `url('../../src/assets/00_thelowerlevel1.png')`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    </TransformComponent>
                </React.Fragment>
            )}
        </TransformWrapper>
    );
};

export default CanvasMap;
