import axios from 'axios'
import React from 'react'
import './Login.css'


class LoginForm extends React.Component {
 constructor(props) {
  super(props)

  this.state = {
   email: '',
   password:''
  }

  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
 }

 handleChange = (e) => {
  let newState = {}

  newState[e.target.name] = e.target.value

  this.setState(newState)
 }


 handleSubmit = (e, message) => {
  e.preventDefault()

  let formData = {
   formEmail: this.state.email,
   formPassword: this.state.password,
  }

  if (formData.formEmail.length < 1 || formData.formPassword.length < 1) {
   return false
  }
  axios.post('/api/user/login').then(res => console.log(res))

  this.setState({
   email: '',
   password: '',

  })
 }

 render() {
  return(
    <div class="react-form-container">
        <form className='react-form' onSubmit={this.handleSubmit}>
            <h1>Say Hi!</h1>

            <fieldset className='form-group'>
     

                <input id='formEmail' placeholder='Email' className='form-input' placeholder = 'Email' name='email' type='email' required onChange={this.handleChange} value={this.state.email} />
            </fieldset>

            <fieldset className='form-group'>


                <input id='formPassword' placeholder='Password' className='form-input' placeholder = 'Password' name='password' type='password' required onChange={this.handleChange} value={this.state.subject} />
            </fieldset>
            <div className='form-group'>
                <input id='formButton' className='btn' type='submit'  placeholder='Sign In' />
            </div>
            <div className='form-group'>
                <input id='guestButton' className='btn'  value="Guest User" placeholder='Sign In' />
            </div>
         </form>
    </div>
   
  )
 }
}
export default LoginForm