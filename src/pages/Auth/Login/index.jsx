import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthInput from '../../../components/AuthInput'
import { emailRegex } from '../../../helpers/const'
import { loginUser } from '../../../services/Auth.services'
import { Toaster } from 'react-hot-toast';
import { notify } from '../../../helpers/const'
import AuthContext from '../../../context/AuthCotext/AuthProvider'
import { types } from '../../../context/AuthCotext/AuthReducer'
import LoadContext from '../../../context/LoadContext/LoadContext'
import { typesLoad } from '../../../context/LoadContext/LoadReducer'
import { ReactComponent as LOGO } from '../../../assets/LOGO.svg'

const Login = ()=> {
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  
  const [inValidForm, setInValidForm] = useState({
    email: false,
    password: false,
  })
  
  const [loading, setLoading] = useState(false)

  const [authState, dispatch] = useContext(AuthContext)

  const [loadState, LoadDispatch] = useContext(LoadContext)

  const changeForm = (e, field) => {
    setForm({ ...form, [field]: e });
  };

  const LoadAction = {
    type: typesLoad.loading
  }

  const StopLoadAction = {
    type: typesLoad.notLoading
  }
  
  const logUser = ()=>{
    setLoading(true)
    setInValidForm({password: form.password.length <= 5, email: !form.email.match(emailRegex)})
    loginUser(form).then( async (res)=>{
      try {
        let action = {
          type: types.authLoged,
          token: res.data.data.user_token,
          isAuthed: true
        }

        LoadDispatch(LoadAction)
        dispatch(action)

        localStorage.setItem('ritme-user', JSON.stringify({userToken: res.data.data.user_token}))

      } catch (e) {
        await setLoading(false)
        notify("e", "Error trying to authenticate")
      }
    }).catch(async (err)=>{
        notify("e", err.response.data.errMessage)
        await setLoading(false)
    }).finally(()=>{
      LoadDispatch(StopLoadAction)
    })
  }

  useEffect(()=>{

  }, [])

  return (
    <>
      <Toaster />
      <div className="r_hScreen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 r_bgGray">
        <div className="fadeInAni max-w-md w-full space-y-8 r_bgBlack r_paddingXl rounded-lg border-2 border-gray-600">
          <div>
            <LOGO
              className="mx-auto h-12 w-auto"
            />
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md py-5 shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <AuthInput 
                  label="Email"
                  type="e-mail"
                  validator={inValidForm.email}
                  errMsg={"Invalid email"}
                  value={form.email}
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
                errMsg={"Invalid password"}
                onChange={(e)=> changeForm(e.target.value, 'password')}
                placeholder="password"
              />
            </div>
            <div>
              {
                !loading
                ?
                  <button
                    onClick={()=> {
                      let condition = {password: form.password.length <= 5, email: !form.email.match(emailRegex)}
                      form.password.length <= 5 || !form.email.match(emailRegex)
                          ?
                              setInValidForm(condition)
                          :
                              logUser()
                    }}
                    className="r_textWhite bg-indigo-600 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md r_bgIndigo hover:bg-indigo-700 focus:outline-none focus:ring-2 r_textWhite"
                  >
                    Log in
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
                New here?<Link className='px-2 font-bold' to={`register`}>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Login