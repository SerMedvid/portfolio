'use client'

import {Canvas} from '@react-three/fiber';
import Experience from './Experience';

export default function CanvasContainer({headlineText}: {headlineText: string}) {
  return (
    <div className='h-[90vh] sm:h-[100svh]'>
      <Canvas
          className='touch-none'
          camera={ {
              fov: 45,
              near: 0.1,
              far: 2000,
              position: [ -3, 1.5, 4 ]
          } }
      >
          <Experience headlineText={headlineText} />
      </Canvas>
    </div>
      
  )
}
