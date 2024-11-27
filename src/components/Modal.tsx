// Server-side Modal

import Link from "next/link";

type stringProps = {
    children: String
  }

function Modal(props :stringProps) {

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto
       h-full w-full flex items-center justify-center">
        <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">Boo!</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-lg text-gray-500">{props.children}</p>
            </div>
            <div className="flex justify-center mt-4">
              <Link
                href="/plot.html"
                className="px-4 py-2 bg-blue-500
                 text-white text-xs font-medium
                  rounded-xl shadow-sm hover:bg-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Fechar
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
export default Modal