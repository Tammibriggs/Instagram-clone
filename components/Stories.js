import faker from 'faker'
import { useSession } from 'next-auth/react'
import { Profiler, useEffect, useState } from 'react'
import Story from './Story'

function Stories() {

  const [suggestion, setSuggestions] = useState([])
  const {data:session} = useSession()

  useEffect(() => {
   const suggestion = [...Array(20)].map((_, i) => (
    {...faker.helpers.createCard(),
      id: i,
    }
   ))
   setSuggestions(suggestion)
  }, [])

  return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200
     border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
       {session && (
         <Story 
          img={session?.user?.image} 
          username={session?.user?.username}
        />
       )}
      {suggestion.map((profile, i) => (
        <Story key={profile.id} img={`https://picsum.photos/200/300?random=${i}`} username={profile.username}/>
      ))}
    </div>
  )
}

export default Stories
