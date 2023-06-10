import { create } from 'zustand'

interface PopoverState {
    isOpen: boolean;
    openPopover: ()=>void;
    closePopover: ()=>void;
}

export const usePopoverStore = create<PopoverState>()((set)=>({
    isOpen: false,
    openPopover: ()=>set({isOpen:true}),
    closePopover: ()=>set({isOpen:false})
}))