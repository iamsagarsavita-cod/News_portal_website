import {Link} from "react-router-dom";
import { FaNewspaper } from "react-icons/fa";

function Navbar() {
    return(
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaNewspaper className="text-3xl text-red-600" />
                    <h1 className="text-2xl font-bold text-gray-800"> NewsHub</h1>
                </div>
                <div className="flex gap-8 font-medium text-lg text-gray-700">
                    <Link to ="/"
                    className="hover:text-red-600 transition-all duration-300" >
                    Home 
                    </Link>

                    <Link to ="/about"
                    className="hover:text-red-600 transition-all duration-300" >
                    About 
                    </Link>

                    <Link to ="/contact"
                    className="hover:text-red-600 transition-all duration-300" >
                    Contact 
                    </Link>                    

                </div>
            </div>
        </nav>
    );
}

export default Navbar;