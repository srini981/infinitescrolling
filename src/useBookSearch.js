import axios from 'axios'
import {useEffect, useState} from 'react'

export default function useBookSearch(query,pagenumber) {
    let [loading,setLoading]=useState(false)
    let [hasmore,setHasMore]=useState(true)
    let [haserror,setHasError]=useState(false)
    let [books,setBooks]=useState([])

    let cancel
    useEffect(()=>{
        setBooks([])
    },[query])
useEffect(() =>{
setLoading(true)
setHasError(false)
    axios(
    {
        methods:"get",
        url:"http://openlibrary.org/search.json",
        params:{q:query,page:pagenumber},
        cancelToken:new axios.CancelToken(c => cancel=c)
    }
  ).then(res =>{

    setBooks( prevBooks => {
        return [ ...new Set([...prevBooks,...res.data.docs.map(b => b.title)])]
    })

    setHasError(false)
    setLoading(false)

}).catch(e =>{
    if (axios.isCancel(e)) return

    setHasError(true)
}
)
return () => cancel()

},[query,pagenumber])
return {loading,haserror,hasmore,books}
}
