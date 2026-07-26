import {Link} from "react-router-dom";
import { FaNewspaper } from "react-icons/fa";

function Navbar() {
    return(
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <faNewspaper className="text-3xl text-red-600" />
                    <h1 className="text-2xl font-bold text-gray-800"> NewsHub</h1>
                </div>
                <div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;