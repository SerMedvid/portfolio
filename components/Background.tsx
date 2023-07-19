import {background} from "@/data"
import {ChevronRightIcon} from "@/components/Icons"

import classes from "@/styles/background-list.module.css"


export default function Background() {
  return (
    <ul className="my-6">
        {background.map(({position, company, year}) => (
            <li
                key={`${position}-${company}`}
                className={`grid my-5 text-2xl ${classes.list}`}
            >
                <span className="pt-1"><ChevronRightIcon /></span>
                <article>
                    <h5 className="font-bold text-3xl" >{position}</h5>
                    <p>{company}</p>
                    <p>{`${year[0]} - ${year[1] ? year[1] : '...'}`}</p>
                </article>
            </li>
        ))}
    </ul>
  )
}
