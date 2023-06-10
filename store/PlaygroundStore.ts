import { database } from '@/appwrite';
import { getTodosGroupedByColumns } from '@/lib/getTododosGroupedByColumns';
import { create } from 'zustand'



interface PlaygroundState {
    playground: Playground;
    getBoard:()=>void;
    setBoardState: (board:Playground)=>void;
    updatedtodoInDB:(todo:Todo, columnId:TypedColumns)=>void;
    searchText:string;
    setSearchText:(searchText:string)=>void;
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
    playground:{
        columns:new Map<TypedColumns, Column>()
    },
    searchText:'',
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
    }

}))