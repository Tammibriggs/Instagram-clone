import {getProviders, signIn as SignIntoProvider} from 'next-auth/react'
import Header from "../../components/Header"

function signin({providers}) {
  return (
    <>
      <Header />
        <div className='flex flex-col items-center justify-center 
        min-h-screen py-2 -mt-40 px-14 text-center'>
         <h1 className='font-medium font-yesteryear text-5xl'>Glammo</h1>
          
          <div className='mt-20'>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button 
                  className='p-3 bg-blue-500 lg:hover:bg-blue-600 active:bg-blue-600 rounded-lg text-white' 
                  onClick={() => SignIntoProvider(provider.id, {callbackUrl: '/'})}>
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
    </>
  )
}

export async function getServerSideProps(){
  const providers = await getProviders()

  return{
    props:{
      providers
    }
  } 
}

export default signin
