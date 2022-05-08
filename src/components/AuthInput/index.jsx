import React, { useState } from "react";
/**
 * @param  {
 *  value: number
 *  placeHolder?: string
 *  validator?: boolean
 *  errMsg?: string
 *  label?: string
 *  onchangetext?: any
 *  visible?: boolean
 * } props
 * 
*/
const AuthInput = (props)=>{

    const {label, type, value, onChange, placeholder, validator, errMsg} = props

    return(
        <div>
            <label htmlFor="password" className="sr-only">
            {
                label
            }
            </label>
            <input 
                type={type}
                value={value}
                onChange={onChange}
                autoComplete="current-password"
                required
                style={{background: "var(--gray)", color: "#f0f0f0"}}
                className={`
                appearance-none
                relative block 
                w-full px-3 
                py-2
                textWhite
                ${validator
                    ?
                        "border-red-600"
                    :
                        "border-gray-600"
                }
                placeholder-gray-500
                text-gray-900 rounded-md
                border-2`}
                placeholder={placeholder}
            />
            {
                validator 
                &&
                <div
                    className="paddingXS r_textRed justify-start r_dFlex r_wFull r_fontS r_textXXS"
                >
                    {
                        errMsg
                    }
                </div>
            }
        </div>
    )
}

export default AuthInput