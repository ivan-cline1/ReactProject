import {useState,useEffect} from "react"

export default function SearchBar(props) {
    const [filteredProducts,setFilteredProducts] = useState([])
    const [searchString,setSearchString] = useState("")
    useEffect(fetchAPIData, [searchString])
    const aStyle= {width: '100px'} 
    const itemStyle= {border: "1px solid", margin:'1rem', margin:'2rem',width:'136px'}
    function fetchAPIData(){
        fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        // .then(result => console.log(result))
        .then(
            products=>{
                const filtered = products.filter((el)=>{return el.title.toLowerCase().includes(searchString.toLowerCase())})
                const currentFilter = filtered.map((product,index) =>{
                    return (<div style={itemStyle}>
                        <p style={{fontSize:'20px', textAlign:'center'}}>{product.title}</p>
                        <p style={{fontSize:'15px',textAlign:'center'}}>${product.price}</p>
                        <img src= {product.image} style = {aStyle}></img>
                    </div>)
                })
                setFilteredProducts(currentFilter)
            }
        )
    }


    function handleChange(event){
        setSearchString(event.target.value)

    }

    return <div>
    <p> The Search Bar</p>
    <input type='text' value = {searchString} onChange={handleChange}></input>
    <div style={{display:"flex",flexFlow:"row wrap"}}>{filteredProducts}</div>
    
    </div>
    }