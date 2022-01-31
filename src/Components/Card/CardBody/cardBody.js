import React from "react"
import Style from "./cardBody.module.css"
const CardBody = (props) => {
  // console.log(props.show)
  // const SlideHide = props.show ? [Style.cardBody , Style.animateSlide].join(' ') : Style.cardBody ;
  return <div className={Style.cardBody}>{props.children}</div>
}
export default CardBody
