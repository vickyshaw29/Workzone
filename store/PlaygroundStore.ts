import { getTodosGroupedByColumns } from '@/lib/getTododosGroupedByColumns';
import { create } from 'zustand'



interface PlaygroundState {
    playground: Playground;
    getBoard:()=>void;
    setBoardState: (board:Playground)=>void
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
    playground:{
        columns:new Map<TypedColumns, Column>()
    },
    getBoard:async()=>{
        const board = await getTodosGroupedByColumns();
        set({playground:board})
    },
    setBoardState:(board)=>set({playground:board})
}))