import axios from 'axios'
import React from 'react'
import './Register.css'


class RegisterForm extends React.Component {
 constructor(props) {
  super(props)

  this.state = {
   name: '',
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
   formSender: this.state.name,
   formEmail: this.state.email,
   formPassword: this.state.password,
  }

  if (formData.formSender.length < 1 || formData.formEmail.length < 1 || formData.formPassword.length < 1) {
   return false
  }
  axios.post('/api/user/register').then(res => console.log(res))


  this.setState({
   name: '',
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

                <input id='formName' placeholder='Full name' className='form-input' name='name' type='text' required onChange={this.handleChange} value={this.state.name} />
            </fieldset>

            <fieldset className='form-group'>
    

                <input id='formEmail' placeholder='Email' className='form-input' name='email' type='email' required onChange={this.handleChange} value={this.state.email} />
            </fieldset>

            <fieldset className='form-group'>
                

                <input id='formPassword' placeholder='Password' className='form-input' name='password' type='password' required onChange={this.handleChange} value={this.state.subject} />
            </fieldset>
            <div className='form-group'>
                <input id='formButton' className='btn' type='submit' placeholder='Register' />
            </div>
         </form>
    </div>
   
  )
 }
}
export default RegisterForm