import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AuthInput from '../../../components/AuthInput'
import { emailRegex } from '../../../helpers/const'
import { loginUser } from '../../../services/Auth.services'
import { getCurrentUser } from '../../../services/User.services'
import { Toaster } from 'react-hot-toast';
import { notify } from '../../../helpers/const'
import AuthContext from '../../../context/AuthProvider'
import { types } from '../../../context/AuthReducer'

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

  const history = useHistory();

  const changeForm = (e, field) => {
    setForm({ ...form, [field]: e });
  };
  
  const logUser = ()=>{
    setLoading(true)
    setInValidForm({password: form.password.length <= 5, email: !form.email.match(emailRegex)})
    loginUser(form).then( async (res)=>{
      try {
        //localStorage.setItem('ritme-user', res.data.data.user_token);
        //notify("s", "Welcome")
        const action = {
          type: types.authLoged,
          token: res.data.data.user_token
        }

        dispatch(action)

        history.replace("/")

        await setLoading(false)
      } catch (e) {
        await setLoading(false)
        notify("e", "Error trying to authenticate")
      }
    }).catch(async (err)=>{
        notify("e", err.response.data.errMessage)
        await setLoading(false)
    })
  }
  
  useEffect(()=>{

    const users = [1,2,3,4]

    /*
      Aqui otro ejemplo en el cual la fucnion que es un parametro
      en el deduce esta creada de manada indepentdiente
    */
    var valor = 6
    const reducer = (acumulado, valorN)=>{
      return acumulado + valorN
    }

    const reduceUsers = users.reduce(reducer, valor)

    console.log('reduce aplicado a "users": ', reduceUsers);
    // Output: 16

  }, [])

  return (
    <>
      <Toaster />
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