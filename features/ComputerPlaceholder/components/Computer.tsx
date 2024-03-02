import React from 'react'
import { 
    useGLTF, 
    Html
 } from '@react-three/drei'

export default function Computer() {
    const laptop = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')

    return (
        <primitive object={laptop.scene} position-y={-1.2} >
            <Html
                transform
                distanceFactor={1.17}
                position={[0, 1.56, -1.4]}
                rotation-x={-0.256}
            >
                <iframe 
                    src='/about'
                    className='w-[1024px] h-[670px] border-0 rounded-2xl bg-black'
                />
            </Html>
        </primitive> 
    )
}
