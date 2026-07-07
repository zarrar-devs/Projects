import React from 'react'

function Footer() {
  return (
    <footer id='footer' className="bg-gray-100 text-gray-700 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-10">


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

   
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Help</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black cursor-pointer">Fake Center</li>
              <li className="hover:text-black cursor-pointer">Fake Forum</li>
              <li className="hover:text-black cursor-pointer">Fake Tutorials</li>
              <li className="hover:text-black cursor-pointer">Fake</li>
            </ul>
          </div>


          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Blogger</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black cursor-pointer">Fake Buzz</li>
            </ul>
          </div>


          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Developers</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black cursor-pointer">Fake API</li>
              <li className="hover:text-black cursor-pointer">Fake Forum</li>
            </ul>
          </div>

    
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Legal</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black cursor-pointer">Fake of Service</li>
              <li className="hover:text-black cursor-pointer">Privacy</li>
              <li className="hover:text-black cursor-pointer">Fake Policy</li>
            </ul>
          </div>

        </div>


        <div className="mt-10 border-t border-gray-300 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 Fake Company</p>
          <p className="mt-2 md:mt-0 cursor-pointer hover:text-gray-800">
            English
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer