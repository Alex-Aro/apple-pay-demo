import { Elements, RecurlyProvider } from '@recurly/react-recurly'
import './App.css'
import { ApplePayButton } from './components/ApplePayButton'

function App() {
  return (
   <div className='w-screen h-screen flex items-center justify-center'>
      <RecurlyProvider publicKey='ewr1-eItrpIN7aTVGzj4vN6ihnU'>
        <Elements>
          <ApplePayButton />
        </Elements>
      </RecurlyProvider>
    </div>
  )
}

export default App
