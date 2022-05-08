import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthInput from '../../../components/AuthInput'
import { emailRegex } from '../../../helpers/const'
import { RegisterUser } from '../../../services/Auth.services'
import AuthAlert from '../../../components/AuthAlert'

const Register = ()=> {
  
  const [form, setForm] = useState({
    email: "",
    user_name: "",
    password: "",
    rPassword: ""
  })

  const [inValidForm, setInValidForm] = useState({
      email: false,
      password: false,
      user_name: false,
      rPassword: false
  })
  const [loading, setLoading] = useState(false)

  const changeForm = (e, field) => {
    setForm({ ...form, [field]: e });
  };

  const sendForm = ()=>{
    console.log(form);
    setLoading(true)
    RegisterUser(form).then((res)=>{
      console.log(res);
      setLoading(false)
    }).catch(()=>{
      setLoading(false)
    })
  }

  useEffect(()=>{
   
  }, [])

  return (
    <>
      <AuthAlert></AuthAlert>
      <div className="r_hScreen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 r_bgGray">
        <div className="fadeInAni max-w-md w-full space-y-8 r_bgBlack r_paddingXl rounded-lg border-2 border-gray-600">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md py-5 shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  User name
                </label>
                <AuthInput 
                  label="User name"
                  type="name"
                  value={form.user_name}
                  validator={inValidForm.user_name}
                  errMsg={"User name invalid"}
                  onChange={(e)=> changeForm(e.target.value, 'user_name')}
                  placeholder="User name"
                />
              </div>
              <br />
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <AuthInput 
                  label="Email"
                  type="e-mail"
                  value={form.email}
                  validator={inValidForm.password}
                  errMsg={"Invalid email"}
                  onChange={(e)=> changeForm(e.target.value, 'email')}
                  placeholder="Email"
                />
              </div>
              <br />
              <AuthInput 
                label="Password"
                type="text"
                value={form.password}
                validator={inValidForm.password}
                errMsg={"Invalid password (password must have atleast 5 characters)"}
                onChange={(e)=> changeForm(e.target.value, 'password')}
                placeholder="password"
              />
              <br />
              <AuthInput 
                label="Repeat password"
                type="text"
                value={form.rPassword}
                validator={inValidForm.rPassword}
                errMsg={"Invalid password (password must have atleast 5 characters)"}
                onChange={(e)=> changeForm(e.target.value, 'rPassword')}
                placeholder="Repeat password"
              />
            </div>
            <div>
              {
                !loading
                    ?
                    <button
                      onClick={()=> {
                        let condition = {user_name: form.user_name.length <= 2, password: form.password.length <= 5, email: !form.email.match(emailRegex)}
                        form.password.length <= 5 || !form.email.match(emailRegex)
                        ?
                        setInValidForm(condition)
                        :
                        sendForm()
                      }}
                      className="bg-indigo-600 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white r_bgIndigo hover:bg-indigo-700 focus:outline-none focus:ring-2"
                    >
                        Sign in
                      </button>
                    :
                      <div
                        className="r_textIndigo bg-gray-800 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-200 r_bgIndigo"
                      >
                        <div
                          className='spinAni'
                        >
                          
                        </div>
                      </div>
              }
            </div>
            <div className="r_dFlex r_alignStart change r_textWhite">
                Already have an account?<Link className='px-2 font-bold' to={`login`}>Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Register