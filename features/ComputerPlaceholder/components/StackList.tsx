import {stack} from "@/data"

import classes from "@/styles/stack-list.module.css"

export default function StackList() {
  return (
    <ul className="flex flex-wrap gap-4 my-6 text-2xl">
        {
            stack.map(item => (
                <li
                    key={item} 
                    data-item={item}
                    className={`border-2 py-2 px-4 relative border-black ${classes.item}`}
                >
                    <span>{item}</span>
                    <span className={`absolute bg-black w-0 h-full top-0 left-0 transition-all ease-in-out duration-300 overflow-hidden text-white whitespace-nowrap   ${classes.hoverLabel}`}>{item}</span>
                </li>
            ))
        }
    </ul>
    
  )
}
