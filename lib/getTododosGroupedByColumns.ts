import { database } from "@/appwrite"

export const getTodosGroupedByColumns = async()=> {
    const data = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!)
    const todos  = data.documents
    const columns = todos?.reduce((accu, todo)=>{
        if(!accu.get(todo?.status)){
            accu.set(todo.status,{
                id: todo?.status,
                todos:[]
            })
        }
        accu.get(todo.status)!.todos.push({
            $id: todo?.$id,
            $createdAt: todo?.$createdAt,
            title: todo?.title,
            status: todo?.status,
            ...(todo?.image && {image:todo?.image})
        })
        return accu;
    }, new Map<TypedColumns, Column>)
    console.log(columns,"data")
    // if columns doesnt have inprogress, todo and done add them with empty todos
    const columnTypes:TypedColumns[] = ["todo","inprogress","done"]
    for(const columnType of columnTypes){
        if(!columns.get(columnType)){
            columns.set(columnType, {
                id: columnType,
                todos: []
            })
        }
    }
    //sort columns by the columnType 
    const sortedColumns = new Map(
        Array.from(columns.entries())?.sort((a,b)=>{
          return  columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        })
    )
    
    const board: Playground = {
        columns: sortedColumns
    }
    return board as Playground
}