import { database, storage } from '@/appwrite';
import { getTodosGroupedByColumns } from '@/lib/getTododosGroupedByColumns';
import { create } from 'zustand'



interface PlaygroundState {
    playground: Playground;
    getBoard:()=>void;
    setBoardState: (board:Playground)=>void;
    updatedtodoInDB:(todo:Todo, columnId:TypedColumns)=>void;
    searchText:string;
    setSearchText:(searchText:string)=>void;
    deleteTask:(taskIndex:number, todoId:Todo, id:TypedColumns)=>void;
    taskInput:string;
    setTaskInput:(input:string)=>void;
    newTaskType: TypedColumns;
    setNewTaskType:(newTask:TypedColumns)=>void
}

export const usePlaygroundStore = create<PlaygroundState>((set,get) => ({
    playground:{
        columns:new Map<TypedColumns, Column>()
    },
    searchText:'',
    taskInput:'',
    newTaskType:'todo',
    setSearchText:(searchText)=>set({searchText}),
    getBoard:async()=>{
        const board = await getTodosGroupedByColumns();
        set({playground:board})
    },
    setBoardState:(board)=>set({playground:board}),
    updatedtodoInDB:async(todo, columnId)=>{
        await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
            {
                title:todo?.title,
                status:columnId
            }
        )
    },
    deleteTask:async(taskIndex,todo,id)=>{
        console.log({taskIndex,todo,id})
        const newColumns = new Map(get().playground.columns)
        //delete the todo
        newColumns.get(id)?.todos?.slice(taskIndex,1)
        set({playground:{columns:newColumns}});
        if(todo?.image){
            await storage.deleteFile(todo?.image?.bucketId, todo?.image?.fileId)
        }
        await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id
        )
    },
    setTaskInput:(input)=>set({taskInput:input}),
    setNewTaskType:(taskType)=>set({newTaskType:taskType})
}))