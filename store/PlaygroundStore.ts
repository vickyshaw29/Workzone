import { database, storage, ID } from '@/appwrite';
import { getTodosGroupedByColumns } from '@/lib/getTododosGroupedByColumns';
import uploadImage from '@/lib/uploadImage';
import { create } from 'zustand'



interface PlaygroundState {
    playground: Playground;
    getBoard:()=>void;
    setBoardState: (board:Playground)=>void;
    updatedtodoInDB:(todo:Todo, columnId:TypedColumns)=>void;
    searchText:string;
    setSearchText:(searchText:string)=>void;
    addTask: (todo:string, columnId:TypedColumns, image?:File|null)=>void;
    deleteTask:(taskIndex:number, todoId:Todo, id:TypedColumns)=>void;
    taskInput:string;
    setTaskInput:(input:string)=>void;
    newTaskType: TypedColumns;
    image: File | null;
    setImage:(image:File|null)=>void;
    setNewTaskType:(newTask:TypedColumns)=>void
}

export const usePlaygroundStore = create<PlaygroundState>((set,get) => ({
    playground:{
        columns:new Map<TypedColumns, Column>()
    },
    searchText:'',
    taskInput:'',
    newTaskType:'todo',
    image: null,
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
    addTask:async(todo,columnId,image)=>{
        let file: Image | undefined;
        if(image){
            const fileUploaded = await uploadImage(image);
            if(fileUploaded){
                file={
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id
                }
            }
        }
        const doc = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                // add image only if it exists
                ...(file && {image: JSON.stringify(file)})
            }
        )
        set({taskInput:""}) 
        set({image:null})
        //@ts-ignore
        set((state)=>{
            const newColumns = new Map(state.playground.columns);
            const newTodo:Todo = {
                $id:doc?.$id,
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,
                ...(file && {image: JSON.stringify(file) as any})
            }
            const column = newColumns.get(columnId)
            if(!column){
                newColumns.set(columnId,{
                    id: columnId,
                    todos: [newTodo]
                });

            }else{
                newColumns.get(columnId)?.todos?.push(newTodo)
            }

            return {
                playground:{
                    columns: newColumns
                }
            }
        })
    },
    deleteTask:async(taskIndex,todo,id)=>{
        console.log({taskIndex,todo,id})
        const newColumns = new Map(get().playground.columns)
        //delete the todo
        newColumns.get(id)?.todos?.splice(taskIndex, 1);
        set({ playground: { columns: new Map(newColumns) } });

        if(todo?.image){
            const imageToDelete = JSON.parse(todo?.image as any)
            await storage.deleteFile(imageToDelete?.bucketId, imageToDelete?.fileId)
        }
        await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id
        )
    },
    setTaskInput:(input)=>set({taskInput:input}),
    setNewTaskType:(taskType)=>set({newTaskType:taskType}),
    setImage:(image)=>set({image})
}))