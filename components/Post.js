import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon
} from '@heroicons/react/outline'
import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import {useState, useEffect} from 'react'
import {db} from '../firebase'
import Moment from 'react-moment'

function Post({id, username, userImg, img, caption}) {

  const {data: session} = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  
  useEffect(() => {
    const q = query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc'))
    onSnapshot(q, snapshot => (
      setComments(snapshot.docs)
    ))

  }, [db])

  useEffect(() => {
    const q = query(collection(db, 'posts', id, 'likes'))
    onSnapshot(q, snapshot => (
      setLikes(snapshot.docs)
    ))
  }, [db, id])


  useEffect(() => {
    setHasLiked(likes.findIndex(like => like.id === session?.user.uid) !== -1
  )}, [likes])

  // function to like post and unlike a post
  const likePost = async () => {
    if(hasLiked){
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid))
    } else{
      await setDoc(doc(db, 'posts', id, 'likes', session?.user.uid), {
        username: session.user.username,
      })
    }
  }

  // function to add comment
  const sendComment = async e => {
    e.preventDefault()
    if(comment !== ''){
      const commentToSend = comment
      setComment('')
      await addDoc(collection(db, 'posts', id, 'comments'), {
        comment: commentToSend,
        username: session.user.username,
        userImage: session.user.image,
        timestamp: serverTimestamp()
      })
    }
    
  }

  return (
    <div className='bg-white my-7 border rounded-sm'>
      <div className='flex p-5 items-center'>
        <img 
          src={userImg}
          alt='user pic'
          className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
        />
        <p className='flex-1 font-bold'>{username}</p>
        {/* <DotsHorizontalIcon className='h-5'/> */}
      </div>

      <img src={img} className='object-cover w-full' alt='post pic'/>

      {session && (
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            {
              hasLiked ? (<HeartIconFilled onClick={likePost} className='btn text-red-500'/>)
              : <HeartIcon onClick={likePost} className='btn'/>
            }
            
            {/* <ChatIcon className='non-active-btn'/> */}
            {/* <PaperAirplaneIcon className='non-active-btn'/> */}
          </div>
          {/* <BookmarkIcon className='non-active-btn'/> */}
        </div>
      )}
      
      {/* post caption */}
      <p className='p-5 truncate'>
        {likes.length > 0 && (
          <p className='font-bold md-1'>{likes.length} {likes.length > 1 ? 'likes' : 'like'}</p>
        )}
        <span className='font-bold mr-1'>{username}</span>
        {caption}
      </p>

      {/* comments */}
      {comments.length > 0 && (
        <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
          {comments.map(comment => (
            <div key={comment.id} className='flex items-center space-x-2 mb-3'>
              <img 
                src={comment.data().userImage} 
                className='h-7 rounded-full' 
                alt=''/>
                <p className='text-sm flex-1'>
                  <span className='font-bold'>{comment.data().username}</span>{' '}
                  {comment.data().comment}
                </p>
                <Moment fromNow className='pr-5 text-xs'>
                  {comment.data().timestamp?.toDate()}
                </Moment>
            </div>
          ))}
        </div>
      )}
      
      {/* input box */}
      {session && (
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7'/>
          <input 
            type='text'
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder='Add a comment...'
            className='border-none flex-1 focus:ring-0 outline-none'/>
          <button 
            type='submit' 
            disabled={!comment.trim()} 
            className='font-semibold text-blue-400'
            onClick={sendComment}
          >Post</button>
        </form>
      )}

    </div>
  )
}

export default Post
