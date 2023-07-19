import CanvasContainer from '@/components/CanvasContainer'
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  const headlineText = t('headline');

  return (
    <main className='fixed h-full w-full top-0 left-0'>
      <CanvasContainer headlineText={headlineText} />
    </main>
  )
}
