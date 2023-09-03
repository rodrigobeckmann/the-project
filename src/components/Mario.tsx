import mario from '../assets/mario/mario';
import { useState, useEffect, useRef } from 'react'
import script from '../script';

export type ScriptType = {
    type: string,
    distance: number,
}

type MarioInitialPosition = {
    marioInitialPosition: {
        xAxisToSet: number,
        yAxisToSet: number,
    },
    pseudoFps: number,
    marioRef: any,
    collision: boolean,
}

export default function Mario({ marioInitialPosition, pseudoFps, marioRef, collision }: MarioInitialPosition) {

    const ref: any = useRef();

    const { xAxisToSet, yAxisToSet } = marioInitialPosition;

    useEffect(() => {
        setXAxis(xAxisToSet);
        setYAxis(yAxisToSet);
        // setXAxisTo(xAxisToSet);
        // setYAxisTo(yAxisToSet);
    }, [])


    const { walk1, walk2, walk3, stand, jump } = mario;

    // const [pseudoFps, setPseudoFps] = useState(0);
    const [sprite, setSprite] = useState(walk1);
    const [isRuning, setIsRuning] = useState(false);
    const [xAxis, setXAxis] = useState(0);
    const [xAxisTo, setXAxisTo] = useState(0);
    // const [yAxisTo, setYAxisTo] = useState(0);
    const [yAxis, setYAxis] = useState(0);
    const [scriptScene, setScriptScene] = useState(0);
    const [isJumpingIn, setIsJumpingIn] = useState(false);
    const [isJumpingOut, setIsJumpingOut] = useState(false);
    const [isStanding, setIsStanding] = useState(false);
    const [isGoingToRight, setIsGoingToRight] = useState(true);
    const [callNextScene, setCallNextScene] = useState(false);

    useEffect(() => {
        // if (pseudoFps === 0) {
        //     setInterval(() => {
        //         setPseudoFps((pseudoFps) => pseudoFps + 1)
        //     }, 50)
        // }
        const changeImg = () => {
            switch (sprite) {
                case walk1:
                    setSprite(walk2);
                    break;
                case walk2:
                    setSprite(walk3);
                    break;
                case walk3: setSprite(walk1);
                    break;
                default: setSprite(walk1);
            }
        }
        if (isRuning) {
            changeImg();
        }
        if (isJumpingIn || isJumpingOut) {
            setSprite(jump)
        }
        if (isStanding) {
            setSprite(stand)
        }
    }, [pseudoFps])

    useEffect(() => {
        switch (script[scriptScene].movType) {
            case 'turn': {
                setIsGoingToRight(!isGoingToRight);
            } break;
            case 'run': {
                setIsRuning(true);
                setXAxisTo(isGoingToRight ? xAxis + script[scriptScene].distance : xAxis - script[scriptScene].distance)
                ref.current = setInterval(() => { setXAxis((xAxis) => isGoingToRight ? xAxis + 0.15 : xAxis - 0.15) }, 1)
            } break;
            case 'jumpIn': {
                setIsJumpingIn(true);
                ref.current = setInterval(() => {
                    setYAxis((yAxis) => yAxis + 0.30)
                    setXAxis((xAxis) => isGoingToRight ? xAxis + 0.15 : xAxis - 0.15)
                }, 1)
            } break;
            case 'jumpOut': {
                setIsJumpingOut(true);
                ref.current = setInterval(() => {
                    setYAxis((yAxis) => yAxis - 0.30)
                    setXAxis((xAxis) => isGoingToRight ? xAxis + 0.15 : xAxis - 0.15)
                }, 1)
            } break;
            case 'finish': {
                setIsStanding(true);
            } break;
        }
        setCallNextScene(true)
    }, [scriptScene])

    useEffect(() => {
        if (xAxis >= xAxisTo && isRuning && isGoingToRight) {
            clearInterval(ref.current)
            setIsRuning(false)
            if (script.length - 1 !== scriptScene) {
                setScriptScene(scriptScene + 1)
            }
        }
        if (xAxis <= xAxisTo && isRuning && !isGoingToRight) {
            clearInterval(ref.current)
            setIsRuning(false)
            if (script.length - 1 !== scriptScene) {
                setScriptScene(scriptScene + 1)
            }
        }
        if (yAxis >= script[scriptScene].distance && isJumpingIn ||
            collision && isJumpingIn) {
            clearInterval(ref.current)
            setIsJumpingIn(false)
            if (script.length - 1 !== scriptScene) {
                setScriptScene(scriptScene + 1)
            }
        }
        if (yAxis <= script[scriptScene].distance && isJumpingOut) {
            clearInterval(ref.current)
            setIsJumpingOut(false)
            if (script.length - 1 !== scriptScene) {
                setScriptScene(scriptScene + 1)
            }
        }
        if (script.length - 1 !== scriptScene && script[scriptScene].movType === 'turn') {
            setScriptScene(scriptScene + 1)
        }
        setCallNextScene(false);
    }, [xAxis, yAxis, callNextScene])



    return <img ref={ marioRef } src={ sprite } style={ { width: '50px', height: '100px', position: 'absolute', bottom: `${yAxis}vh`, zIndex: '5', left: `${xAxis}vw`, transform: isGoingToRight ? 'scaleX(1)' : 'scaleX(-1)' } } />


}