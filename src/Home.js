import React, { useState, useEffect } from "react"
import AppCard from "./AppCard"
import { Link } from "react-router-dom"
import { getCourses } from "./Apis"

function Home() {
  const [courses, setcourses] = useState([])

  const getData = async () => {
    let { data } = await getCourses()
    setcourses(data)
    console.log(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <h3>Please select a course</h3>
      <div className="cards-container">
        {courses.map((item) => (
          <Link to={`/selector/${item.id}`} key={item.id}>
            <AppCard title={item.name} />
          </Link>
        ))}
      </div>
    </>
  )
}

export default Home
