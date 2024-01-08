
import '../styles/docs.scss'
import pic from '../assets/mobile.png'
const Docs = () => {
  return (
    <div className="docs">
      <h1>DOCUMENTATION</h1>
      <p>get started</p>
      <div className='box'>
        <h2>create form</h2>
        <p>the email you add is the one that the messages will be sent to</p>
        <img src={pic} alt="" />
      </div>
      <div className='box'>
        <h2>copy the script</h2>
        <p>and paste it in the position you want the contact form to be</p>
        <img src={pic} alt="" />
      </div>
      <div className='box'>
        <h2>disable any fields you dont want to be in the form</h2>
        <p>a minumim of one field has to be selected</p>
        <img src={pic} alt="" />
      </div>
    </div>
  )
}

export default Docs