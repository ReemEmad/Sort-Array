import React from "react"
import Style from "./QuestionBox.module.css"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"

const Question = (props) => {
  const questionTitle = props.question.replace(/\\"/g, '"')
  // let showCorrect ;
  return (
    <div className={Style.questionBox}>
      <div
        className={Style.questionTitle}
        dangerouslySetInnerHTML={{ __html: questionTitle }}
      />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
      >
        {/* {props.options.map((text, index) => (
          <div key={props.id + "_" + index}>
            <ListItem key={props.id + "_" + index}>
              <FiberManualRecordIcon color="primary" />
              <ListItemText
                primary={
                  <div
                    className={Style.answerContainer}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                }
              />
            </ListItem>
          </div>
        ))} */}
      </List>
    </div>
  )
}
export default Question
