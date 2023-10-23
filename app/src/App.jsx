import { useEffect, useState } from 'react';
import styled from 'styled-components'
import SearchResult from './componenets/searchResult/SearchResult';

export const BASE_URL="http://localhost:9000"
const App = () => {
  const [filteredData,setFilteredData] = useState(null);
  const[data,setData] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [selectedItem,setSelectedItem] = useState("all");



  
 
  useEffect(()=>{
    const fetchFoodData = async ()=>{
      setLoading(true);
      try{
        const res = await fetch(BASE_URL);
      const  data = await res.json();
       console.log(data);
  
      setData(data);
      setFilteredData(data);
      setLoading(false);
  
      }
      catch(err){
          setError("Unable to Fetch Data");
      }
    }
    fetchFoodData();
    
  },[])



  /** Start Item search Functionality */ 
  const searchFood = (e) => {
    const searchValue = e.target.value;

    console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
   
  };

  /** End Item search Functionality */

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];


  /** Item click Filtered */
  const filterdItem = (type)=>{
    if(type==="all"){
      setFilteredData(data)
      setSelectedItem(data);
      return ;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedItem(type)

  }




  if(error)
  return <div>{error}</div>
  if(loading) return <div>Loading....</div>
  return( 
  <>
  <Container>
      <TopConatainer>
        <div className='logo'>
          <img src='/FoodyZoneLogo.png' alt='logo'/>
        </div>

        <div className='search'>
            <input onChange={searchFood} placeholder='Search Food'/>
        </div>
      </TopConatainer>


      {/* Filter Conatiner */}
      <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedItem === value.type}
              key={value.name}
              onClick={() => filterdItem(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>


     
   </Container>
    {/* Food Container */}
    <SearchResult data={filteredData}/>
</>
)
}


export default App;

export const Container = styled.div`
max-width:1200px;
margin:0 auto;
`;
const TopConatainer = styled.section`
height:140px;
display:flex;
justify-content:space-between;
padding:16px;
align-items:center;

.search{
  input{
    background-color:transparent;
    border:1px solid red;
    color:white;
    border-radius:5px;
    height:40px;
    font-size:16px;
    padding:0 10px
  }
}
@media (0<width<600px){
  flex-direction:column;
  height:120px;
 
  
  }
`;
const FilterContainer = styled.section`
    display:flex;
    justify-content:center;
    gap:12px;
    padding:40px;
`
export const Button = styled.button`
  background:${({isSelected})=>(isSelected ? "#ff006e" : "#ff4343")};
  border-radius:5px;
  padding:6px 12px;
  border:none;
  color:white;
  &:hover {
    background-color: #f22f2f;
  }
`;
