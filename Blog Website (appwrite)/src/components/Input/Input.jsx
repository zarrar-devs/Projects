import { forwardRef, useId } from "react"

const Input = forwardRef(({
    label,
    type='text',
    className = 'text-black',
    placeholder = '',
    ...props
},ref)=> {

    const id = useId()

  return (
    <div className="w-full flex flex-col justify-center items-center">
        {
            label && <label >{label}</label>
        }
        <input type={type} placeholder={placeholder} className={`${className}`} ref={ref} {...props} />
        
    </div>
  )
})

export default Input