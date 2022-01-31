import React, { useState, useEffect } from "react"
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Checkbox,
  FormGroup,
  Alert,
} from "@mui/material"

import {
  // Select,
  Card as Card1,
  // Button,
  Input,
  Radio as radios,
  // Checkbox,
  message,
  Drawer,
} from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"
import {
  getChapters,
  getQuestions,
  createQuiz,
  getQuizzes,
  createQuiz2,
  createRandomQuiz,
} from "./Apis"
import { useTheme } from "@mui/material/styles"
import { useParams, useNavigate } from "react-router-dom"

function AppSelectSession() {
  const { Option } = Select
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }
  const theme = useTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [chapters, setchapters] = useState([])
  const [showChapter, setshowChapter] = useState(false)
  const [showRandom, setshowRandom] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [quizTitle, setquizTitle] = useState()
  const [chaptersSelected, setchaptersSelected] = useState([])
  const [questions, setquestions] = useState([])
  const [value, setValue] = useState()
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [quizId, setquizId] = useState()
  const [numberOfQuestions, setnumberOfQuestions] = useState()
  const [questionsFiltered, setquestionsFiltered] = useState([])
  const [visible, setVisible] = useState(false)

  const children = []
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>,
    )
  }

  function getStyles(chapter, chapters, theme) {
    return {
      fontWeight:
        chapters.indexOf(chapter) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    }
  }

  const getChaptersData = async () => {
    let { data } = await getChapters()
    setchapters(data)
    console.log(data)
  }

  const getQuizzesData = async () => {
    let { data } = await getQuizzes()
    setquizId(data.length)
    console.log(data.length)
  }

  const getQuestionsData = async () => {
    let { data } = await getQuestions(id)
    setquestions(data)
    console.log(data)
  }

  useEffect(() => {
    getChaptersData()
    getQuestionsData()
    getQuizzesData()
    console.log(quizId)
  }, [])

  function handleChangeChapters(value) {
    console.log(`selected ${value}`)

    let arr = value.toString().split(",")
    setchaptersSelected(arr)
  }

  const onChange = (e) => {
    console.log("radio checked", e.target.value)
    setValue(e.target.value)
  }

  function onChangeChecked(checkedValues) {
    console.log("checked = ", checkedValues)
    setSelectedQuestions(checkedValues)
  }

  const createQuizUser = async () => {
    let result = await createQuiz({
      quiz_id: quizId + 1,
      question_id: selectedQuestions,
    })
    console.log(result)
    anotherFn()
    setSuccess(true)
  }

  const anotherFn = async () => {
    let result2 = await createQuiz2({ quiz_title: quizTitle })
    console.log(result2)
    console.log(selectedQuestions)
  }

  const generateRandom = async () => {
    let result = await createRandomQuiz({
      quiz_id: quizId + 1,
      number: numberOfQuestions,
      chapter_ids: chaptersSelected.toString().split(","),
      questions_ids: questionsFiltered,
    })
    anotherFn()
    console.log(result)
    setSuccess(true)
  }

  const onOk = () => {
    let questionsFiltered = questions.filter((item) =>
      chaptersSelected
        .toString()
        .split(",")
        .includes(item.chapter_id.toString())
        ? item
        : null,
    )
    console.log(questionsFiltered)
    setquestions(questionsFiltered)
    let ids = questionsFiltered.map((q) => q.id)
    console.log(ids)
    setquestionsFiltered(ids)
  }
  const validateNumber = (e) => {
    if (e.target.value > questionsFiltered.length) {
      setError(true)
    } else {
      setnumberOfQuestions(e.target.value)
    }
  }

  const seeResults = () => {
    navigate(`/result/${quizId + 1}`)
  }

  const handleChange = (e) => {
    const {
      target: { value },
    } = e
    setchaptersSelected(typeof value === "string" ? value.split(",") : value)
  }

  const handleCheck = (e, id) => {
    setSelectedQuestions([...selectedQuestions, id])
  }

  return (
    <div>
      {error && <Alert severity="error">Not enough questions</Alert>}
      {success && <Alert severity="success">Quiz created successfully</Alert>}
      <section className="select_container">
        <TextField
          id="outlined-basic"
          label="Quiz title"
          variant="outlined"
          onChange={(e) => setquizTitle(e.target.value)}
        />

        <br />
      </section>
      <section className="container">
        <div className="quiz_maker">
          <Typography variant="h5" component="h5" mb={2}>
            Choose questions out of the following to create a quiz:
          </Typography>
          <FormGroup>
            {questions.map((item) => (
              <FormControlLabel
                control={<Checkbox onChange={(e) => handleCheck(e, item.id)} />}
                label={item.title}
              />
              // <Card sx={{ minWidth: 175 }}>
              //   <CardContent>
              //     <Typography
              //       sx={{ fontSize: 14 }}
              //       color="text.secondary"
              //       gutterBottom
              //     >
              //       {item.title}
              //     </Typography>

              //     <Typography variant="body">
              //       <FormControl>
              //         <RadioGroup
              //           row
              //           aria-labelledby="demo-row-radio-buttons-group-label"
              //           name="row-radio-buttons-group"
              //           value={item.correct_answer.toString()}
              //         >
              //           <FormControlLabel
              //             value="true"
              //             control={<Radio />}
              //             label="True"
              //           />
              //           <FormControlLabel
              //             value="false"
              //             control={<Radio />}
              //             label="False"
              //           />
              //         </RadioGroup>
              //       </FormControl>
              //     </Typography>
              //   </CardContent>
              // </Card>
            ))}
          </FormGroup>
          <div className="box_actions">
            <Button onClick={createQuizUser} variant="contained">
              Confirm
            </Button>

            <Button variant="outlined" onClick={seeResults} type="primary">
              Go to results
            </Button>
          </div>
        </div>
        <div className="optional">
          <Button
            onClick={() => setshowChapter(!showChapter)}
            variant="outlined"
          >
            Or select questions from specific chapters
          </Button>
          {showChapter && (
            <>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={chaptersSelected}
                  onChange={handleChange}
                  input={<OutlinedInput label="Chapter" />}
                  MenuProps={MenuProps}
                >
                  {chapters.map((chapter) => (
                    <MenuItem
                      key={chapter.id}
                      value={chapter.id}
                      style={getStyles(chapter, chapters, theme)}
                    >
                      {chapter.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="text" onClick={onOk}>
                Ok
              </Button>
            </>
          )}

          <br />
          <Button
            variant="contained"
            onClick={() => setshowRandom(!showRandom)}
          >
            or generate random questions for your quiz
          </Button>
          {showRandom && (
            <>
              <br />
              <TextField
                id="filled-basic"
                label="Filled"
                variant="filled"
                type="number"
                onChange={(e) => validateNumber(e)}
              />
              <Button variant="text" onClick={generateRandom} type="primary">
                Confirm
              </Button>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default AppSelectSession
