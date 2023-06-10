'use-client'
import { usePlaygroundStore } from '@/store/PlaygroundStore';
import { XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumns;
    innerRef: (element:HTMLElement|null)=>void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps|null|undefined
}

const TodoCard = ({todo, index, id, innerRef, dragHandleProps, draggableProps}:Props) => {

  const deleteTask = usePlaygroundStore((state)=>state.deleteTask)

  return (
    <div
    className='bg-white rounded-md space-y-2 drop-shadow-md'
    {...draggableProps}
    {...dragHandleProps}
    ref={innerRef}
    >
        <div className='flex justify-between items-center p-5'>
            <p>{todo?.title}</p>
            <button onClick={()=>deleteTask(index,todo,id)} className='text-red-500 hover:text-red-600'>
                <XCircleIcon
                className='ml-5 h-8 w-8'
                />
            </button>
            {/* Add image here */}
        </div>
    </div>
  )
}

export default TodoCard