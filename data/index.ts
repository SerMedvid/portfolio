import {EmailIcon, GithubIcon, LinkedinIcon} from "@/components/Icons";
import {SocialLink, WorkPosition, SOCIAL_LINK_TYPE} from '@/types'


export const socialLinks: SocialLink[] = [
    {
        name: 'Linkedin',
        type: SOCIAL_LINK_TYPE.LINK,
        url: 'https://www.linkedin.com/in/sergii-medvid/',
        Icon: LinkedinIcon
    },
    {
        name: 'GitHub',
        type: SOCIAL_LINK_TYPE.LINK,
        url: 'https://github.com/SerMedvid',
        Icon: GithubIcon
    },
    {
        name: 'mr.medvid@gmail.com',
        type: SOCIAL_LINK_TYPE.EMAIL,
        url: 'mr.medvid@gmail.com',
        Icon: EmailIcon
    }
];

export const stack: string[] = [
    'React',
    'JavaScript',
    'ExpressJS',
    'NextJS',
    'Magento 2',
    'Magento PWA',
    'ThreeJS',
    'MySQL',
    'React Three Fiber'
]

export const background: WorkPosition[] = [
    {
        company: 'Default Value',
        position: 'Team Lead',
        year: ['02/2022', '07/2023']
    },
    {
        company: 'Default Value',
        position: 'Software Engineer',
        year: ['02/2019', '07/2023']
    },
    {
        company: 'SPD-Ukraine (internship)',
        position: 'Frontend Developer',
        year: ['03/2020', '05/2020']
    },
    {
        company: 'Freelancer',
        position: 'Frontend Developer',
        year: ['02/2019', '11/2019']
    },
]