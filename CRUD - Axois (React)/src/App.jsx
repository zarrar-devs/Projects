import { useState, useEffect } from "react";
import { getPosts } from "./api/postAPI";
import Posts from "./components/Posts";
import Form from "./components/Form";


function App() {

  const [data, setData] = useState([])
  const [editable, setEditable] = useState(null)


  async function getPostsData() {
    const res = await getPosts()
    setData(res.data)

  }

  useEffect(() => {
    getPostsData()
    // console.log(data);

  }, [])

  return (

    <div id="main">
      <Form data={data} editable={editable} setEditable={setEditable} setData={setData}></Form>
      <Posts setEditable={setEditable} data={data} editable={editable} setData={setData}></Posts>
    </div>

  )
}

export default App