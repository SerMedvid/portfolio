export enum SOCIAL_LINK_TYPE {
    LINK = 'link',
    EMAIL = 'email'
}

export type SocialLink = {
    name: string,
    type: SOCIAL_LINK_TYPE,
    url: string,
    Icon: () => JSX.Element
}

export type WorkPosition = {
    position: string,
    company: string,
    year: [string, string?]
}