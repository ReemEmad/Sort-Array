import axios from "axios"

export const getCourses = () => {
  let result = axios.get("http://localhost:4000/courses")
  return result
}

export const getChapters = () => {
  let result = axios.get("http://localhost:4000/chapters")
  return result
}

export const getQuestions = (id) => {
  let result = axios.get(`http://localhost:4000/questions/${id}`)
  return result
}

export const getQuizzes = () => {
  let result = axios.get("http://localhost:4000/quizzes")
  return result
}

export const createQuiz = (obj) => {
  let result = axios.post("http://localhost:4000/quiz", obj)
  return result
}

export const createQuiz2 = (obj) => {
  let result = axios.post("http://localhost:4000/quizcreate", obj)
  return result
}

export const createRandomQuiz = (obj) => {
  let result = axios.post("http://localhost:4000/quizcreaterandom", obj)
  return result
}

export const showQuiz = (obj) => {
  let result = axios.post("http://localhost:4000/quizresult", obj)
  return result
}

export const getTitle = (id) => {
  let result = axios.get(`http://localhost:4000/quiztitle/${id}`)
  return result
}
