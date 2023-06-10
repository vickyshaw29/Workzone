import { PlusCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { usePlaygroundStore } from '@/store/PlaygroundStore'
import { usePopoverStore } from '@/store/ModalStore'
import Popover from './Popover'

type Props = {
    id: TypedColumns,
    todos: Todo[]
    index: number
}

const idToColumnText:{
    [key in TypedColumns]:string
}={
    "todo":"To Do",
    "inprogress":"In Progress",
    "done": "Done"
}

const Column = ({id,todos,index}:Props) => {
    const [searchText] = usePlaygroundStore(state=>[state.searchText])
    const openPopover = usePopoverStore((state)=>state.openPopover)
  return (
    <Draggable draggableId={id} index={index}>
        {(provided)=>(
            <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided?.innerRef}
            >
                {/* render droppabled */}
                <Droppable droppableId={index?.toString()} type="card">
                    {(provided, snapshot)=>(
                        <div
                        {...provided.droppableProps}
                        ref={provided?.innerRef}
                        className={`p-2 rounded-xl shadow-sm ${snapshot?.isDraggingOver ? "bg-green-200":"bg-white/50"}`}
                        >
                            <h2 className='flex justify-between font-bold text-xl p-2'>{idToColumnText[id]}
                            <span className='text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal'>{
                                !searchText? todos?.length : todos?.filter((todo)=>todo?.title.includes(searchText)).length
                            }</span>
                            </h2>
                            {/* Todos */}
                            <div className='space-y-2'>
                                {
                                    todos?.map((todo, index)=>{
                                        if(searchText && !todo?.title?.toLowerCase()?.includes(searchText.toLowerCase()))return null;
                                        return (
                                            <Draggable key={todo?.$id} draggableId={todo?.$id} index={index}>
                                            {(provided)=>(
                                                <TodoCard
                                                  todo={todo}
                                                  index={index}
                                                  id={id}
                                                  innerRef={provided?.innerRef}
                                                  draggableProps={provided?.draggableProps}
                                                  dragHandleProps={provided?.dragHandleProps}
                                                />
                                            )}
                                        </Draggable>
                                        )
                                    })
                                }
                                {provided?.placeholder}
                                <div className='flex items-end justify-end p-2'>
                                    <button onClick={openPopover} className='text-green-500 hover:text-green-600'>
                                        <PlusCircleIcon className='h-10 w-10'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Droppable>
                <Popover/>
            </div>
        )}
    </Draggable>
  )
}

export default Column