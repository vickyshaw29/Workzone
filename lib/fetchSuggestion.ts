import formatTodoForAI from "./formatTodoForAI";

const fetchSuggestion = async(board:Playground)=> {
    const todos = formatTodoForAI(board)
    console.log(todos,"FORMATED_TODOS")
    const res = await fetch("/api/generateSummary",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin" : "*",
        },
        body: JSON.stringify({todos:todos}),
    })

    const GPTData = await res.json();
    //@ts-ignore
    const { content } = GPTData

    return content

}

export default fetchSuggestion