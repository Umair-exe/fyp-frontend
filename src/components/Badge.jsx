import React from 'react'

const Badge = ({color,text}) => {
  return (
    <div className={`p-1 px-6 ${color} text-white rounded-md`}>
        {text}
    </div>
  )
}

export default Badge