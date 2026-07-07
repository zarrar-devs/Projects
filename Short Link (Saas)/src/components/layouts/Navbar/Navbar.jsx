import { Link } from "react-router";


export function Navbar({ options }) {
  return (
    <div className="flex items-center gap-4">
      {
        options.map(option => (
          <Link className={`${option.id === '#fru548u' ? 'text-white hover:text-gray-100' : 'text-gray-600 hover:text-red-600 cursor-not-allowed' } text-[13px] font-[Inter] transition-all`} key={option.id} to={option.slug}>{option.name}</Link>
  ))
}
    </div >
  )
}
