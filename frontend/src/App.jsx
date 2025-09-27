import {useState,useRef, useEffect} from 'react'
const App = () => {
  const [question,setQuestion] = useState(null)
  const brandVoice = useRef();
  const [response,setResponse] = useState(null)
  const [faq,setFaq] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [sources, setSources] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are your business hours?",
      answer: "We're open Monday-Friday 9AM-6PM, Saturday 10AM-4PM, and closed on Sundays."
    },
    {
      question: "How do I book an appointment?",
      answer: "You can book online through our website, call us, or walk in during business hours."
    },
    {
      question: "What services do you offer?",
      answer: "We offer haircuts, styling, coloring, treatments, and special occasion styling."
    },
    {
      question: "Do you accept walk-ins?",
      answer: "Yes, we accept walk-ins based on availability, but appointments are recommended."
    }
  ];
 useEffect(()=>{
  brandVoice.current.value = `{
 "tone": "Warm, concise, reassuring",
 "style_rules": [
 "Use short sentences.",
 "Avoid jargon.",
 "End with a friendly nudge if suitable."
 ],
 "signoff": "— Salon Nova"
}`
 },[])


  const handleSubmit = async() => {
  try {
    console.log('Submitting ', {faq, brandVoice: JSON.parse(brandVoice.current.value), question});
    
    if( !question) return;
    setIsLoading(true);
const API_URL = import.meta.env.DEV 
    ? 'http://localhost:8080/generate'     // When running npm run dev
    : '/api/generate';  // When running npm run build and serve the static files
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        faq, 
        brandVoice: JSON.parse(brandVoice.current.value), 
        question
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    console.log('Result ', result);
    setResponse(result.answer);
    // const src = 
    console.log('Result sources ', result.sources);
    setSources(result.sources?.length ? result.sources.join(', ') : 'None');    setIsLoading(false);
  } catch (error) {
    console.error('Error on submit:', error);
    setResponse('Error occurred while fetching data.');
  }
}
  const handleKeyPress = (e) =>{
    if(e.key === 'Enter' && !isloading){
        handleSubmit(e);
    }
  }
  const handleQuestionChange = (e) =>{
    if(e.target.value){
      setQuestion(e.target.value);
    }
  }
  // const handleFaqChange = (e) => {
  //   if(e.target.value){
  //     setFaq(e.target.value);
  //   }    
  // }
  const handleToggle = (index) =>{

    setOpenIndex(openIndex === index?null:index);
    faqs.map((faq, ind)=>{
      if(ind === index ){
        setFaq(faq.answer);
      }
    })
  }
 
  return (
    <div className='container'>
      <h1 className='heading'>Salon Nova</h1>
      <div className='body' onKeyDown={(e)=>handleKeyPress(e)}>
        <div  className='faq-inputs'>
               {/* <label className='label' >FAQ</label> <textarea onChanmage={(e)=>handleFaqChange(e)} className='faq-text'/> */}
               <label className='faq-label' >FAQ</label>
               <div className='faq-body'>
                    {faqs.map((faq,index)=>(
                <div key={index} className='faq-container'>
                  <button className='faq-btn' onClick={()=>handleToggle(index)}>
                    <span className='question'>{faq.question}</span>
                    <span className='upDown'>{openIndex===index?'▲':'▼'}</span>
                  </button>
                  {
                    (openIndex === index) && <span className='faq-ans'> {faq.answer}</span>
                  }
                </div>
               ))}
               </div>
               
        </div>
        <div className='inputs'>
              <label className='label' >Brand Voice</label> <textarea className='faq-text' ref={brandVoice} readOnly/>
        </div>
        <div className='inputs'>
              <label className='label'>Question</label> <textarea className='faq-text' onChange={(e)=>handleQuestionChange(e)}/>
        </div>
         
          <button className='btn'  onClick={handleSubmit} disabled={isloading}>{isloading?'Submitting...':'Submit'}</button>
          <div className='inputs'>
            <label className='label'>Response </label><textarea className='faq-text' value={response || ''} readOnly/>
        </div>

        <div className='inputs'>
            <label className='label'>Sources </label> <p className='src'>{sources}</p>
        </div>
        
          
      </div>
      
    </div>
  )
}

export default App
