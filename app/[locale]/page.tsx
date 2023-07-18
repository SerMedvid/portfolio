import Image from 'next/image'
import { Canvas } from '@react-three/fiber'
import CanvasContainer from '@/components/CanvasContainer'

export default function Home() {
  return (
    <main className='fixed h-full w-full top-0 left-0'>
      <CanvasContainer />
    </main>
  )
}
