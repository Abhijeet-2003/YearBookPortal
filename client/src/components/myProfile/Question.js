import userData from '../../database/profile.json'
import ans_logo from '../../assets/myprofile/ans_logo.png'
import ans_submit from '../../assets/myprofile/answer.png'
import { useContext, useEffect, useState} from 'react'
import { MIDContext } from '../../contexts/mId';
import axios from 'axios';

function Question(){
    const[ans, setans] = useState(-1);
    const[userAnswer, setuserAnswer] = useState('');
    const { mID } = useContext(MIDContext);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/profileans/${mID}`)
        .then(data => {
            // setuserAnswer(data);
            console.log(data);
        })
    }, [mID, ans]);

    function submit_ans(){
        fetch('http://localhost:3000/myprofile', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                answer: userAnswer
            })
        })
        if(userAnswer){
            setans(-1)
        }
    }
    return(
        <div className='main_question'>        
            <div className='hello'>
                {userData.profile[0].questions.map((data, idx)=>{
                    return(
                        <div>
                            <div className='q_num'>
                                { data.ques }
                            </div>
                            {ans===idx ?(
                                <div className='ans_change'>
                                    <textarea  className='textarea_ans' onChange={(event)=>setuserAnswer(event.target.value)}/>
                                    <div className='ansSubmit_button'>
                                        <img alt='ans_submit' className='ans_submit' src={ans_submit} onClick={submit_ans}/>
                                    </div>
                                </div>
                            ): (
                            <div className='ans'>
                                <img className='ans_logo' alt='ans' src={ans_logo} onClick={()=>setans(idx)}/><br/>
                                {data.ans}
                            </div>
                            )}
                        </div>
                    )
                }) }
            </div>     
        </div>
    )
}

export default Question