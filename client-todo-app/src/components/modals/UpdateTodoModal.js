import React from "react";
import UpdateTodoForm from "@/components/forms/UpdateTodoForm";

const UpdateTodoModal = ({ handleClose , data}) => {
  return (
    <div className='bg-white/50 fixed inset-0 w-full h-full z-[2] flex flex-col items-center justify-center'>
      <div className='bg-white p-10 rounded-lg shadow-lg relative'>
        <button
          className='bg-rose-500 absolute right-1 top-1 rounded-full p-2'
          onClick={handleClose}>
          X
        </button>
        <div>
          <UpdateTodoForm handleclose={handleClose} data={data}/>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodoModal;
