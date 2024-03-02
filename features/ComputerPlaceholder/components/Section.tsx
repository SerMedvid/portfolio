import { ReactNode } from "react"

type SectionProps = {
    title: string,
    className?: string,
    children: ReactNode
}

export default function Section({title, className,  children} : SectionProps) {
    const composedStyles = `my-8 ${className ? className : ''}` ;

    return (
        <section className={composedStyles}>
            <h4 className="text-4xl font-bold">{title}</h4>
            {children}
        </section>
    )
}
