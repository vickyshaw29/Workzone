"use-client";
import getURL from "@/lib/getURL";
import { usePlaygroundStore } from "@/store/PlaygroundStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumns;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  dragHandleProps,
  draggableProps,
}: Props) => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const deleteTask = usePlaygroundStore((state) => state.deleteTask);

  useEffect(()=>{
    if (todo?.image) {
      console.log(todo,"HERE BRO")
      const fetchImage = async () => {
        const url = await getURL(JSON?.parse(todo?.image! as any));
        if (url) {
          setImageURL(url?.toString());
        }
      };
      fetchImage();
    }
  },[])
  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo?.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      {/* Add image here */}
      {imageURL && (
        <div className="relative h-full w-full rounded-b-md">
          <Image
            src={imageURL}
            alt="Image"
            width={200}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
};

export default TodoCard;
