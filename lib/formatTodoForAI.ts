const formatTodoForAI = (board: Playground) => {
    const todos = Array.from(board.columns.entries());
  
    const flatArrayCounted = todos.reduce(
      (map, [key, value]) => {
        map[key] = value.todos.length;
        return map;
      },
      {} as { [key in TypedColumns]: number }
    );
  
    return flatArrayCounted;
  };
  

  export default formatTodoForAI