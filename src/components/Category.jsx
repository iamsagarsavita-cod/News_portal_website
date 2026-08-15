function Category({category, setCategory}) {
    
    let  categories = ["general", "business", "sports","technology", "health", "entertainment", "science",];

    return(
        <div>
            {categories.map((c)=> (
                <button key={c}
                    onClick={()=> setCategory(c)}
                    className={`px-5 py-2 rounded-full capitalize font-medium transition-all duration-300 ${Category === c ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"}`}
                >
                    {c}
                </button>
            ))}
        </div>
    );
}
 export default Category;