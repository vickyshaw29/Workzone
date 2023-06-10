import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const readable = request.body;

    if (readable === null) {
      // Handle the case when the request body is null
      console.log("Request body is null");
      return ;
    }
  
    const decoder = new TextDecoder('utf-8');
    const payload:any = decoder.decode(await readable.getReader().read().then(({ value }) => value));
  

    //communicate with openAI GPT
    const response = await openai.createChatCompletion({
        model:'gpt-3.5-turbo',
        temperature: 0.8,
        n:1,
        stream:false,
        messages:[
            {
                role: "system",
                content:`when responding welcome the user always as Hello Raz and say welcome to the Workzone app!
                Limit the response to 200 characters`
            },
            {
                role:'user',
                content:`Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then 
                tell the user to have a productive day! Here is the data: ${(payload)}`
            }
        ]
    })

    const { data } = response

    return NextResponse.json(data?.choices[0]?.message)

}