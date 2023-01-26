import React, { useState } from 'react'
import './App.css'
import {Configuration,OpenAIApi} from 'openai'

const App = () => {
  console.log(process.env.NODE_ENV)
  console.log(process.env)
  const config=new Configuration({
    apiKey:process.env.REACT_APP_OPEN_AI_KEY
  });
  const openai=new OpenAIApi(config);

  const [prompt,setPrompt]=useState("");
  const [result,setResult]=useState('');
  const [loading,setLoading]=useState(false);

  const handleClick=async()=>{
    setLoading(true);
    try {
      const resp=await openai.createCompletion({
        model:'text-davinci-003',
        prompt:prompt,
        temperature:0.5,
        max_tokens:100
      })
      console.log(resp)
      setResult(resp.data.choices[0].text)
    } catch (error) {
      console.log(error);
      
    }
    setLoading(false)
  }
  return (
    <main className='main'>
      <div className='inner-div'>
        <textarea
        type="text"
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        placeholder="Write Prompt..."
        className='textarea'></textarea><br/>
        <button onClick={handleClick} disabled={loading || prompt.length==0} className='btn'>
          {loading?"Generating ...":"Generate"}
        </button>
        <pre className='result'>{result}</pre>
      </div>
    </main>
  )
}

export default App