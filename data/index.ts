import {EmailIcon, GithubIcon, LinkedinIcon} from "@/components/Icons";
import {SocialLink, SOCIAL_LINK_TYPE} from '@/types'


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
]