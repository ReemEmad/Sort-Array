import React from "react"
import { NavLink } from "react-router-dom"
import Style from "./Breadcrumb.module.css"
import { connect } from "react-redux"

const Breadcurmb = (props) => {
  let Middle = props.middle ? (
    <li>
      <NavLink to={props.path} exact>
        {props.middle}
      </NavLink>
    </li>
  ) : null
  return (
    <React.Fragment>
      <ul className={Style.breadcrumb} id="breadcrumb">
        <li>
          <NavLink to="/" exact>
            {props.LanguageKeys.home}
          </NavLink>
        </li>
        {Middle}
        <li>{props.current}</li>
      </ul>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    lang: state.language.lang,
    LanguageKeys: state.language.langkeys,
  }
}

export default connect(mapStateToProps)(Breadcurmb)
