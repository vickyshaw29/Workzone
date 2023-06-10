"use-client"
import { usePlaygroundStore } from '@/store/PlaygroundStore';
import React, { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';


const Playground = () => {
  const [board, getBoard, setBoardState, updateTodoInDB] = usePlaygroundStore((state)=>[state.playground,state.getBoard,state.setBoardState, state.updatedtodoInDB])

  useEffect(()=>{
    getBoard() ;
  },[])

  const handleOnDragEnd = (result:DropResult)=> {
    const { destination, source, type } = result
    console.log(destination, source, type)
    //check if the used dragged card outside of the playground
    if(!destination)return;

    //Handle column drag
    if(type==="column"){
      let entries = Array.from(board?.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns:rearrangedColumns
      })
    }

    // This step is needed as the indexes are stored in numbers instead of ids like dnd
    const columns = Array.from(board.columns);
    const startColIndex= columns[Number(source?.droppableId)]
    const endColIndex = columns[Number(destination?.droppableId)]

    const startCol = {
      id:startColIndex[0],
      todos:startColIndex[1].todos
    }

    const finishCol = {
      id: endColIndex[0],
      todos: endColIndex[1].todos
    }
    if(!startCol||!endColIndex)return;
    if(source?.index === destination?.index && startCol=== finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos?.splice(source?.index, 1)
    //If the todos are dragged within same column
    if(startCol?.id===finishCol?.id){
      newTodos?.splice(destination?.index,0,todoMoved);
      const newCol = {
        id: startCol?.id,
        todos: newTodos
      }
      let newColumnsAfterDraggingWithin= new Map(board?.columns)
      newColumnsAfterDraggingWithin?.set(startCol.id,newCol)
      setBoardState({...board,columns:newColumnsAfterDraggingWithin});  

    }else{
      const finishedTodos = Array.from(finishCol?.todos);
      finishedTodos?.splice(destination?.index, 0, todoMoved)

      let newColumns = new Map(board?.columns)
      const newColumn = {
        id: startCol?.id,
        todos:newTodos  
      }
      newColumns.set(startCol?.id,newColumn);
      newColumns.set(finishCol?.id,{
        id: finishCol?.id,
        todos: finishedTodos
      })
      //Update todo in db if the item is dragged to a different column
      updateTodoInDB(todoMoved, finishCol?.id)

      setBoardState({...board,columns:newColumns})
    }
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='playground' direction='horizontal' type='column'>
            {(provided)=>(
                <div {...provided?.droppableProps} ref={provided?.innerRef}
                 className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                >
                    {/* rendering all columns */}
                    {Array.from(board?.columns?.entries())?.map(([id, column], index)=>{
                      return (
                        <Column
                            key={id}
                            id={id}
                            todos={column?.todos}
                            index={index}
                        />
                      )
                    })}
                </div>
            )}
        </Droppable>
    </DragDropContext>
  )
}

export default Playground