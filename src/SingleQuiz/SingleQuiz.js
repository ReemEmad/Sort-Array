import React, { useEffect, useState } from "react"
import Card from "../Components/Card/Card"
import CardBody from "../Components/Card/CardBody/cardBody"
import CardHead from "../Components/Card/cardTitle/cardTitle"
import QuestionBox from "./QuestionBox/QuestionBox"
import Style from "./SingleQuiz.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Spinner from "../Components/Spinner/Spinner"
import Breadcrumb from "../Components/Breadcrumb/Breadcrumb"
import { decodeJSON } from "../helpers/helpers"
import PrintIcon from "@mui/icons-material/Print"

import { showQuiz, getTitle } from "../Apis"

import { Card as AppCard, Radio } from "antd"

const SingleQuiz = (props) => {
  const [quizDetails, setQuizDetails] = React.useState(null)
  const [data, setdata] = useState([])
  const [quizTitle, setquizTitle] = useState()
  // const dispatch = useDispatch()
  const { id } = useParams()
  // const language = useSelector((state) => state.language.langkeys)

  const onGettingQuizDetailsSuccess = (data) => {
    setQuizDetails(data)
  }
  const onGettingQuizDetailsError = () => {
    alert("Something Went wrong on editing quiz")
  }

  const showData = async () => {
    let { data } = await showQuiz({ quiz_id: id })
    setdata(data)
    console.log(data)
    onGettingQuizDetailsSuccess(data)
  }

  const getTitleData = async () => {
    let { data } = await getTitle(id)
    setquizTitle(data[0].quiz_title)
  }

  useEffect(() => {
    /* Get Quiz details */
    //eslint-disable-next-line
    showData()
    getTitleData()
  }, [])

  // if (sessionID === null || quizDetails === null) {
  //   return (
  //     <React.Fragment>
  //       <Spinner />
  //     </React.Fragment>
  //   )
  // }
  let Question
  if (quizDetails !== null) {
    Question = Object.values(quizDetails).map((question) => {
      let options = []
      if (question.extras > 0) {
        try {
          options = decodeJSON(question.extras)
        } catch (e) {
          console.error(e)
        }
      }
      return (
        <QuestionBox
          key={question.id + question.title}
          id={question.id}
          options={options}
          question={question.title}
          currentAnswer={question.currect_answer}
        />
      )
    })
  } else {
    Question = null
  }

  return (
    <React.Fragment>
      {/* <Breadcrumb
        pageTitle={language.myCourses}
        pageTitle={"title"}
        current={language.viewQuiz}
        current={"quiz"}
        middle={quizDetails.quiz.title}
        middle={quizTitle}
        path={"/view-course/" + id}
      /> */}
      <Card>
        <CardHead>
          <span className={Style.largerTitle}>{quizTitle}</span>
          <button>
            {/* <i className="feather icon-printer"></i> */}
            <PrintIcon />
          </button>
          <button>Show Answers</button>
        </CardHead>
        <CardBody>
          <div className={Style.questionsArea}>{Question}</div>
          <div className="textCenter"></div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default SingleQuiz
