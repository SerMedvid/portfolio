"use client";

import {Suspense, lazy} from "react"
import { 
    Environment,
    Float, 
    ContactShadows,
    Text,
    Bounds,
    // PresentationControls
 } from '@react-three/drei'

 import {PresentationControls} from "@/utils/PresentationControls"

const  Computer = lazy(() => import("./Computer")) 

export default function Experience({headlineText}: {headlineText: string})
{
    return <>
        <Environment preset='city' />

        <color args={['#241a1a']} attach={'background'} />

        <PresentationControls
            enabled
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            snap={{
                mass: 4,
                tension: 400
            }}
            config={{
                mass: 2,
                tension: 400,
                friction: 26
            }} 
        >
            <Bounds fit observe damping={6} margin={0.85}>
                <Float rotationIntensity={0.5}>
                    <rectAreaLight
                        width={2.5}
                        height={1.65}
                        intensity={65}
                        color={'#ff6900'}
                        rotation={[0.1, Math.PI, 0]}
                        position={[0, 0.55, -1.15]}
                    />
                    <Suspense fallback={null}>
                        <Computer />
                    </Suspense>
                
                    <Text
                        font='./bangers-v20-latin-regular.woff'
                        fontSize={0.75}
                        position={[2, 0.75, 0.25]}
                        rotation-y={ -1.25}
                        maxWidth={2}
                        textAlign='center'
                    >{headlineText}</Text>
                </Float>
            </Bounds>
        </PresentationControls>

        <ContactShadows 
            position-y={-1.4} 
            opacity={0.4}
            scale={5}
            blur={2.4}
        />
    </>
}