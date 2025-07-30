import {useState, useEffect, useCallback, useRef} from "react";
import QRCode from "react-qr-code";
function Component({props})
{
        let [input, setInput] = useState("");
        const[length, setLength]=useState(8);
        const[numberCheckbox, setNumberCheckbox]=useState(false);
        const[charCheckbox, setCharCheckbox]=useState(false);
        const[generateButton, setGenerateButton]=useState(true);

        let inputRef=useRef(null);

        function copyTheText()
        {
            inputRef.current.select();
            window.navigator.clipboard.writeText(input);
        }

        function randomPicker(s, l)
        {
            let randomS="";
            for(let i=0; i<l; i++)
            {
                let charIdx=Math.floor(Math.random()*s.length)-1;
                if(charIdx<0)
                    charIdx=0;
                randomS+=s[charIdx];
            }
            return randomS
        }

        function jumbleUp(s)
        {
            let fast=s.length-1;
            let slow=0;
            let arr=s.split("");
            while(slow<s.length)
            {
                if(fast<0)
                    fast=s.length-1;
                let temp=arr[slow];
                arr[slow]=arr[fast];
                arr[fast]=temp;
                let step=Math.floor(Math.random()*17);
                fast-=step;
                slow++;
            }
            let newS=arr.join("");
            if((newS[0]=="." || newS[s.length-1]==".") && props=="Gmail Generator")
                newS=jumbleUp(newS);
            return newS;
        }

        useEffect(()=>{setInput(randomGenerator(numberCheckbox, charCheckbox, length))
            console.log("Hi");
        }, [generateButton]);
                
                const randomGenerator=useCallback((numberCheckbox, charCheckbox, length)=>{
                let s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", num="", specialChar="";
                let temp=length;
                if(numberCheckbox)
                {
                    num=randomPicker("0123456789", Math.floor(temp/2)-2);
                    temp-=Math.floor(temp/2)-2;
                }

                if(charCheckbox && props=="Gmail Generator")
                {
                    specialChar=randomPicker(".",2);
                    temp-=2;
                }
                else if(charCheckbox && props!="Gmail Generator")
                {
                    specialChar=randomPicker("!@#$%^&*()-_=+[]{};:,.<>?/",Math.floor(length/2)-3);
                    temp-=Math.floor(length/2)-3;
                }

                s=randomPicker(s, temp);
                s=s+num+specialChar;
                s=jumbleUp(s);
                return(s);
            },[length, numberCheckbox, charCheckbox]);

            if(props=="Gmail Generator")
                input+="@gmail.com";

        return(
            <div>
                <label htmlFor="">{props}</label>
                <div className="flex gap-3 w-full mx-auto mb-4">
                    <input
                    type="text"
                    value={input}
                    ref={inputRef}
                    readOnly
                    className="bg-gray-200 flex-1 px-4 py-2 rounded-xl focus:outline-none"
                    />
                    <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
                        onClick={copyTheText}
                        
                    >
                    Copy
                    </button>
                </div>
                <div className="flex flex-wrap justify centre gap-4">
                    <div className="flex flex-col flex-wrap">
                        <input type="range"
                        value={length}
                        onChange={(e)=>{setLength(e.target.value)}}
                        min='8'
                        max="17"
                        id="slider_bar"/>
                    <label>Length: {length}</label>
                    </div>
                    <div className="">
                    <input type="checkbox" 
                    onChange={()=>{setNumberCheckbox(!numberCheckbox)}}
                    id="NumberAllowed"/>
                    <label> Number</label>
                    </div>
                    <div>
                    <input type="checkbox" 
                    onChange={()=>{setCharCheckbox(!charCheckbox)}}/>
                    <label> Special Characters</label>
                    </div>
                </div>
                <div className="w-full max-w-md mx-auto">
                    <button className="bg-blue-700 text-white w-full py-2 rounded-xl hover:bg-blue-800 transition"
                        onClick={()=>{setGenerateButton((prev)=>!prev)}}
                    >
                    Generate
                    </button>
                </div>
                <br />
                <QRCode value={input} size={128} bgColor="#ffffff" fgColor="#000000"/>
            </div>
    );
}
export default Component;