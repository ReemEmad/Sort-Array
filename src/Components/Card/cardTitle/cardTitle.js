import React, { useState } from "react"
import Style from "./cardTitle.module.css"

const CardTitle = (props) => {
  const isRTL = document
    .getElementsByTagName("body")[0]
    .classList.contains("rtl")
  const [bodyClose, setBodyClose] = useState(false)

  const handelCloseBody = (e) => {
    setBodyClose(!bodyClose)
    window.localStorage.setItem("CloseCardBody", !bodyClose)
  }
  const ShowHideIcon = props.showhideIcon ? (
    <div className={Style.showHide} onClick={(e) => handelCloseBody(e)}>
      <i className="icon-chevron-down feather"></i>
    </div>
  ) : null
  return (
    <div className={isRTL ? Style.cardTitleAr : Style.cardTitle}>
      <h5>{props.children}</h5>
      {ShowHideIcon}
    </div>
  )
}
export default CardTitle
