import { useRef, Fragment, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { usePopoverStore } from "@/store/ModalStore";
import { usePlaygroundStore } from "@/store/PlaygroundStore";
import TaskTypeGroup from "./TaskTypeGroup";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";

function Popover() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [isOpen, closePopover] = usePopoverStore((state) => [
    state.isOpen,
    state.closePopover,
  ]);
  const [taskInput, setTaskInput, image, setImage, newTaskType, addTask] = usePlaygroundStore(
    (state) => [
      state.taskInput,
      state.setTaskInput,
      state.image,
      state.setImage,
      state.newTaskType,
      state.addTask
    ]
  );

  const handleContentClick = (e: any) => {
    e.stopPropagation();
  };

  const handleSubmit = (e:FormEvent<HTMLDivElement>)=> {
    e.preventDefault();
    if(!taskInput) return;
    // add task
    addTask(taskInput, newTaskType, image)
    setImage(null);
    closePopover()
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        onClose={() => {}}
        onSubmit={(e)=>handleSubmit(e)}
      >
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={closePopover}
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              onClick={handleContentClick}
            >
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 pb-2"
              >
                Add a Task
              </Dialog.Title>
              <div className="mt-2">
                <input
                  placeholder="Enter a task..."
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-md outline-none p-5"
                />
              </div>
              <TaskTypeGroup />
              <div>
                <button
                  type="button"
                  className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => imagePickerRef.current?.click()}
                >
                  <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                  Upload Image
                </button>
                {image && (
                  <Image
                    alt="Upload Image"
                    width={200}
                    height={200}
                    src={URL.createObjectURL(image)}
                    className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-pointer"
                    onClick={() => setImage(null)}
                  />
                )}
                <input
                  type="file"
                  ref={imagePickerRef}
                  hidden
                  onChange={(e: any) => {
                    if (!e.target.files[0].type.startsWith("image/")) return;
                    setImage(e.target.files[0]);
                  }}
                />
              </div>
              <div className="w-full mt-4">
                {/* <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  onClick={closePopover}
                >
                  Close
                </button> */}
                <button
                  type="submit"
                  className="w-full ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 disabled:bg-gray-200"
                  onClick={(e:any) => {
                    handleSubmit(e)
                    // Perform task creation logic
                    closePopover();
                  }}
                  disabled={!taskInput}
                >
                  Create Task
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Popover;
