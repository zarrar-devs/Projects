import { forwardRef } from 'react'

let Select = forwardRef(({options, label, className,...props },ref) => {
    return <div>
        {label && <label>{label}</label>}
        <select className={`${className}`} ref={ref} {...props}>
            {options?.map(op => {
                return <option key={op.id} value={op.value}>
                    {op.name}
                </option>
            })}
        </select>
    </div>
})


export default Select