import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitUI from '../components/RateLimitUI'
import axios from "axios"
import toast from 'react-hot-toast'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes")
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)

      } catch (error) {
        console.log("Error fecthing notes: ", error)
        if(error.response.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("Failed to load notes!")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div>
      <Navbar />

      {isRateLimited && <RateLimitUI />}
    </div>
  )
}

export default HomePage