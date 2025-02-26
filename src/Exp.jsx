import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import Portal from './Components/Portal'
import Planets from './Components/Planets';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { easing } from "maath"
import { isMobile } from 'react-device-detect';
const Exp = ({ explore3D, isMouseDown }) => {
    const [rigDampSpeed, setRigSpeed] = useState(1.5)
    const initialCameraPosition = { x: 0, y: 0, z: 8 }
    const [cameraPosition, setCameraPosition] = useState(initialCameraPosition)

    function Rig() {
        setTimeout(() => {
            setRigSpeed(0.5)
        }, 4000)
        return useFrame((state, delta) => { 
            state.camera.lookAt(0, 3, 0)
            easing.damp3(state.camera.position, [cameraPosition.x + state.mouse.x / 1, cameraPosition.y + state.mouse.y / 1, cameraPosition.z], rigDampSpeed, delta)
        })
    }

    

    useEffect(() => {
        // console.log(explore3D)
        if (explore3D) {

        }
    }, [explore3D])




    function MobileController() {

        useFrame((state, delta) => {
            // console.log(state.camera.position)
            // if(!isMouseDown){
            state.camera.lookAt(0, 10, 0)
            easing.damp3(state.camera.position, [-3, 0, 20], 2, delta)
            //   setSnpped(true)
            // }
        })



        return <OrbitControls
            minAzimuthAngle={(-Math.PI / 180) * 30}
            maxAzimuthAngle={(Math.PI / 180) * 30}
            minPolarAngle={(Math.PI / 180) * 60}
            maxPolarAngle={(Math.PI / 180) * 80}
            // enableZoom={isMobile ? false : true}
            enableZoom={false}
            enableDamping
            enablePan={false}
            makeDefault
        />
    }

    function PCOrbitController() {
        let stopDamp = false;
        setTimeout(() => {
            stopDamp = true;
        }, 3000)
        useFrame((state, delta) => {
            // console.log(state.camera.position)
            // if(!isSnapped){
            state.camera.lookAt(0, 5, 0)
            !stopDamp && easing.damp3(state.camera.position, [2,-5,0], 2, delta)

            // {x: 15.464951184826836, y: 12.210116761292216, z: 13.56001786712231, __damp: {…}}
            //   setSnpped(true)
            // }
        })



        return <OrbitControls
            // minAzimuthAngle={(-Math.PI / 180) * 180}
            // maxAzimuthAngle={(Math.PI / 180) * 180}
            minPolarAngle={(Math.PI / 180) * 30}
            maxPolarAngle={(Math.PI / 180) * 80}
            // // enableZoom={isMobile ? false : true}
            // enableZoom={false}
            enableDamping
            maxDistance={250}
            minDistance={13}
        // enablePan={false}
        // makeDefault
        />
    }
    const [isPhone, setIsPhone] = useState(isMobile)

    useEffect(() => {
        setIsPhone(isMobile)
    }, [])

    function CamControlDispatcher() {
        // console.log(isPhone, "isPhone");
        if (explore3D) {
            // console.log("pcorbitcontroller")
            return <PCOrbitController />
        }
        if (isPhone) {
            // console.log("mobile controller")
            return <MobileController />

        } else {
            // console.log("rig")
            return <Rig />
        }
    }
    return (
        <>
            <Portal />
            <Planets />
            {/* <OrbitControls /> */}
            <ambientLight intensity={10} />
            <CamControlDispatcher />
        </>
    )
}

export default Exp