// @ts-ignore
import style from "./style.module.scss"
import { GoogleColor } from "../../../utils/enum/color"

type BadgeProps = {
    color?: GoogleColor,
    children?: React.ReactNode,
}
export default function Badge({ color, children }: BadgeProps) {
    const badgeClassName = `badge_${color}`
    return <div className={style[badgeClassName]}>{children}</div>
}