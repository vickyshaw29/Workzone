import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { usePopoverStore } from '@/store/ModalStore'
import { usePlaygroundStore } from '@/store/PlaygroundStore'
import TaskTypeGroup from './TaskTypeGroup'

function Popover() {
  const [isOpen, closePopover] = usePopoverStore((state) => [state.isOpen, state.closePopover])
  const [taskInput, setTaskInput] = usePlaygroundStore((state) => [state.taskInput, state.setTaskInput])

  const handleContentClick = (e:any) => {
    e.stopPropagation()
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={()=>{}}>
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
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" onClick={closePopover} />
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl" onClick={handleContentClick}>
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">
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
            </div>
            
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Popover
