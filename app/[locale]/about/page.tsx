import Section from "@/components/Section";
import SocialLinks from "@/components/SocialLinks";
import StackList from "@/components/StackList"
import Background from "@/components/Background"
import {useTranslations} from 'next-intl';
import Image from "next/image";

import avatar from '@/assets/fotor.jpg'

import classes from "@/styles/about-page.module.css";

export default function About() {
    const t = useTranslations('About');

    return (
        <main className={`grid bg-gradient-page min-h-[100vh] px-6 py-8 grid-cols-3 gap-x-8	${classes.main}`}>
            <section className="col-span-2">
                <h2 className="text-8xl font-bold">{t('name')}</h2>
                <h4 className="text-5xl mt-2 mb-5">
                    {t.rich('position', {
                        span: chunk => <span className="text-white font-bold">{chunk}</span>
                    })}
                </h4>
            </section>
            <div className="hidden lg:block col-span-1 row-span-full col-start-3	">
                <Image 
                    src={avatar} 
                    alt={t('name')} 
                    className="shadow-card-shadow"
                />
            </div>

            <Section title={t('stack')} className="col-span-2">
                <StackList />
            </Section>

            <Section title={t('socialLinks')} className="col-span-3">
                <SocialLinks />
            </Section>

            <Section title={t('experience')} className="col-span-3">
                <Background />
            </Section>
        </main>
    )
}