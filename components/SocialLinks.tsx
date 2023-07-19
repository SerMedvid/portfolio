import {socialLinks} from "@/data"
import { SocialLink } from "@/types"

import classes from "@/styles/social-links.module.css"

export default function SocialLinks() {
  return (
    <ul className="flex gap-x-24 gap-y-5  flex-wrap my-6">
        {socialLinks.map(({type, name, Icon, url}: SocialLink) => (
            <li
                className={`text-2xl hover:text-white transition-all duration-300 leading-none ${classes.link}`}
                key={name}
                title={name}>
                    <a href={url} target="_blank" className="flex items-end gap-2">
                        <span className={classes.icon}><Icon /></span>    
                        <span>{name}</span>
                    </a>
                </li>
        ))}
    </ul>
  )
}
