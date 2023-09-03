import { useState, useEffect } from 'react'
import box from './assets/box.png'
import { Floor } from './styles'
import Header from './components/Header'
import Mario from './components/Mario'
import MarioKey from './components/MarioKey'
import { useRef } from 'react'

function App() {

  const ref: any = useRef();
  const boxRef: any = useRef();

  const [pseudoFps, setPseudoFps] = useState(0);
  const [boxTopPosition, setBoxTopPosition] = useState(65)
  const [boxWidth, setBoxWidth] = useState(40)
  const [boxHeight, setBoxHeight] = useState(40)
  const [boxLeftPosition, setBoxLeftPosition] = useState(49);
  const [isBoxIn, setIsBoxIn] = useState(false);
  const [collision, setCollision] = useState(false);

  useEffect(() => {
    if (pseudoFps === 0) {
      setInterval(() => {
        setPseudoFps((pseudoFps) => pseudoFps + 1)
      }, 50)
    }
  }, [])

  useEffect(() => {
    // console.log('vw' ,ref.current.style.left.split('vw')[0].split('.')[0])
    // console.log('vh' ,ref.current.style.bottom.split('vh')[0])

    // const marioPxToVh = ((100 * 100) / document.documentElement.clientWidth);
    // console.log('pxWidth', marioPxToVh)
    // const marioPxToVw = ((100 * 50) / document.documentElement.clientHeight);
    // console.log('pxHeight', marioPxToVw)
    // const boxPxToVh = ((100 * boxHeight) / document.documentElement.clientWidth);
    // console.log('boxPxToVh', boxPxToVh)
    // const boxPxToVw = ((100 * boxWidth) / document.documentElement.clientHeight);
    // console.log('boxPxToVw', boxPxToVw)
    const marioLeftPosition = ref.current.offsetLeft;
    const marioBottomPosition = ref.current.offsetTop;
    const leftBoxPosition = boxRef.current.offsetLeft;
    const bottomBoxPosition = boxRef.current.offsetTop;
    if (marioLeftPosition + 50 >= leftBoxPosition &&
      marioLeftPosition <= leftBoxPosition + boxWidth &&
      marioBottomPosition + 100 >= bottomBoxPosition &&
      marioBottomPosition <= bottomBoxPosition + boxHeight) {
      const boxIn = setInterval(() => { setBoxTopPosition((position) => position + 0.1) }, 1)
      setCollision(true);
      setTimeout(() => {
        clearInterval(boxIn)
        const boxOut = setInterval(() => { setBoxTopPosition((position) => position - 0.1) }, 1)
        setTimeout(() => {
          clearInterval(boxOut)
        }, 70);
      }, 70);

      console.log('box')
    }
  }, [pseudoFps])

  return (
    <>

      <Mario marioRef={ ref } marioInitialPosition={ { xAxisToSet: 0, yAxisToSet: 20 } } pseudoFps={ pseudoFps } collision={ collision } />


      { !isBoxIn && <img ref={ boxRef } src={ box } style={ { position: 'absolute', height: `${boxHeight}px`, width: `${boxWidth}px`, left: `${boxLeftPosition}vw`, bottom: `${boxTopPosition}vh` } } /> }
      { isBoxIn && <Header /> }
      <Floor />

      <h2></h2>
    </>
  )
}

export default App
