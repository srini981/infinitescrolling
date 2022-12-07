import { useState } from "react";
import useBookSearch from "./useBookSearch";
function App() {
  let [query,setQuery]=useState("")
  let [page,setPage]=useState(1)
  const {loading,haserror,hasmore,books}=useBookSearch(query,page)
  
  function Handleinput(e){
    setQuery(e.target.value)
    setPage(1)
  }
  console.log(books)
  return (
   <>
   <input type="text" onChange={Handleinput}></input>
   {books.map(b => {
    return <div key={b}>{b}</div>
   })}
   <div>{loading &&   'loading...'}</div>
   <div>{ haserror &&   'error..'}</div>
   </>
  );
}

export default App;
