function Category({Category, setCategory}) {
    
    let  categories = ["general", "business", "sports","technology", "health", "entertainment", "science",];

    return(
        <div>
            {categories.map((c)=> (
                <button key={c}></button>
            ))}
        </div>
    );
}
 export default Category;