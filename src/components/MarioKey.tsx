import mario from '../assets/mario/mario';
import { useState, useEffect, useRef } from 'react'
import script from '../script';

export type ScriptType = {
    type: string,
    distance: number,
}

type MarioInitialPosition = {
    xAxisToSet: number,
    yAxisToSet: number,
}

let leftRunInterval: any;
let rightRunInterval: any;
let jumpInInterval: any;
let jumpOutInterval: any;

const INITIAL_ARROW = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}

const EMPTY_ARROW = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}

const RIGHT_ARROW = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: true,
}

const LEFT_ARROW = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: true,
    ArrowRight: false,
}


export default function MarioKey(marioInitialPosition: MarioInitialPosition) {

    const ref: any = useRef();

    const { xAxisToSet, yAxisToSet } = marioInitialPosition;

    useEffect(() => {
        setXAxis(xAxisToSet);
        setYAxis(yAxisToSet);
        setXAxisTo(xAxisToSet);
        setYAxisTo(yAxisToSet);
    }, [])


    const { walk1, walk2, walk3, stand, jump } = mario;

    const [pseudoFps, setPseudoFps] = useState(0);
    const [sprite, setSprite] = useState(walk1);
    const [isRuning, setIsRuning] = useState(false);
    const [xAxis, setXAxis] = useState(0);
    const [xAxisTo, setXAxisTo] = useState(0);
    const [yAxisTo, setYAxisTo] = useState(0);
    const [yAxis, setYAxis] = useState(0);
    const [scriptScene, setScriptScene] = useState(0);
    const [isJumpingIn, setIsJumpingIn] = useState(false);
    const [isJumpingOut, setIsJumpingOut] = useState(false);
    const [isStanding, setIsStanding] = useState(false);
    const [isGoingToRight, setIsGoingToRight] = useState(true);
    const [callNextScene, setCallNextScene] = useState(false);
    const [action, setAction] = useState('');
    const [keysPressed, setKeysPressed] = useState(INITIAL_ARROW);
    const [refreshListeners, setRefreshListeners] = useState(false);



    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            // switch (e.key) {
            //     case 'ArrowRight': {
            //         setAction('rightRun')
            //     } break;
            //     case 'ArrowLeft': {
            //         setAction('leftRun')
            //     } break;
            //     case 'ArrowUp': {
            //         setAction('jumpIn')
            //     } break;
            // }
            if (!keysPressed[e.key]) {
                setKeysPressed((Keys) => ({ ...Keys, [e.key]: true }))
            }
        })
        document.addEventListener('keyup', (e) => {
            // switch (e.key) {
            //     case 'ArrowRight': {
            //         setAction('stop')
            //     } break;
            //     case 'ArrowLeft': {
            //         setAction('stop')
            //     } break;
            //     case 'ArrowUp': {
            //         setAction('jumpOut')
            //     } break;
            // }
            setKeysPressed((Keys) => ({ ...Keys, [e.key]: false }))
        })
    }, [])

    useEffect(() => {
        if (pseudoFps === 0) {
            setInterval(() => {
                setPseudoFps((pseudoFps) => pseudoFps + 1)
            }, 50)
        }
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

        if (isJumpingOut) {
            if (yAxis <= marioInitialPosition.yAxisToSet) {
                setIsJumpingOut(false)
                clearInterval(jumpOutInterval)
                setYAxis(marioInitialPosition.yAxisToSet)
                setSprite(stand)
            }
        }

    }, [pseudoFps])

    useEffect(() => {
        console.log(keysPressed)
        switch (keysPressed) {
            case RIGHT_ARROW: {
                console.log('run')
                setIsGoingToRight(true);
                setIsRuning(true);
                rightRunInterval = setInterval(() => { setXAxis((xAxis) => xAxis > 97 ? 97 : xAxis + 0.15) }, 1)
            } break;
            case LEFT_ARROW: {
                setIsGoingToRight(false);
                setIsRuning(true);
                leftRunInterval = setInterval(() => { setXAxis((xAxis) => xAxis < 0 ? 0 : xAxis - 0.15) }, 1)
            } break;
            case EMPTY_ARROW: {
                setSprite(stand);
                setIsRuning(false);
                clearInterval(leftRunInterval);
                clearInterval(rightRunInterval);
            } break;
            // case 'jumpIn': {
            //     setIsJumpingIn(true);
            //     jumpInInterval = setInterval(() => { setYAxis((yAxis) => yAxis + 0.15) }, 1)
            // } break;
            // case 'jumpOut': {
            //     setIsJumpingIn(false);
            //     setIsJumpingOut(true);
            //     clearInterval(jumpInInterval);
            //     jumpOutInterval = setInterval(() => { setYAxis((yAxis) => yAxis - 0.15) }, 1)
            // } break;
            // case 'jumpIn': {
            //     setIsJumpingIn(true);
            //     ref.current = setInterval(() => {
            //         setYAxis((yAxis) => yAxis + 0.30)
            //         setXAxis((xAxis) => isGoingToRight ? xAxis + 0.15 : xAxis - 0.15)
            //     }, 1)
            // } break;
            // case 'jumpOut': {
            //     setIsJumpingOut(true);
            //     ref.current = setInterval(() => {
            //         setYAxis((yAxis) => yAxis - 0.30)
            //         setXAxis((xAxis) => isGoingToRight ? xAxis + 0.15 : xAxis - 0.15)
            //     }, 1)
            // } break;
            // case 'finish': {
            //     setIsStanding(true);
            // } break;
        }
    }, [keysPressed])

    useEffect(() => {
        // if (xAxis >= xAxisTo && isRuning && isGoingToRight) {
        //     clearInterval(ref.current)
        //     setIsRuning(false)
        //     if (script.length - 1 !== scriptScene) {
        //         setScriptScene(scriptScene + 1)
        //     }
        // }
        // if (xAxis <= yAxisTo && isRuning && !isGoingToRight) {
        //     clearInterval(ref.current)
        //     setIsRuning(false)
        //     if (script.length - 1 !== scriptScene) {
        //         setScriptScene(scriptScene + 1)
        //     }
        // }
        // if (yAxis >= script[scriptScene].distance && isJumpingIn) {
        //     clearInterval(ref.current)
        //     setIsJumpingIn(false)
        //     if (script.length - 1 !== scriptScene) {
        //         setScriptScene(scriptScene + 1)
        //     }
        // }
        // if (yAxis <= script[scriptScene].distance && isJumpingOut) {
        //     clearInterval(ref.current)
        //     setIsJumpingOut(false)
        //     if (script.length - 1 !== scriptScene) {
        //         setScriptScene(scriptScene + 1)
        //     }
        // }
        // if (script.length - 1 !== scriptScene && script[scriptScene].movType === 'turn') {
        //     setScriptScene(scriptScene + 1)
        // }
        // setCallNextScene(false);
    }, [])



    return <img src={ sprite } style={ { width: '50px', position: 'absolute', bottom: `${yAxis}vh`, zIndex: '5', left: `${xAxis}vw`, transform: isGoingToRight ? 'scaleX(1)' : 'scaleX(-1)' } } />


}