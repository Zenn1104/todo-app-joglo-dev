"use client";

import Swal from "sweetalert2";
import { deleteTodo, updateTodo } from "./service/todo/todo.service";
import dayjs from "dayjs";
import * as idID from "dayjs/locale/id";

const TodoCard = ({
  isDone = false,
  data = null,
  mutate,
  setSelectedTodo,
  setOpenUpdateModal,
}) => {
  const handleEditTodo = (todo) => {
    setSelectedTodo(todo);
    setOpenUpdateModal(true);
  };

  const handleDoneTodo = () => {
    const payload = {
      name: data?.name,
      note: data?.note,
      is_complete: true,
    };

    updateTodo(payload, data?.id)
      .then((res) => {
        mutate();
        Swal.fire({
          title: "Success",
          text: res?.status_code,
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Failed",
          text: err?.response?.payload?.status_code || err?.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  const handleDeleteTodo = (todoId) => {
    deleteTodo(todoId)
      .then((res) => {
        mutate();
        Swal.fire({
          title: "Are You Sure",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#10b981",
          cancelButtonColor: "#e11d48",
          cancelButtonText: "Cancel it!",
          confirmButtonText: "Yes, delete it!",
        }).then(result => {
          if(result.isConfirmed) {
            Swal.fire(
              'Deleted',
              'Deleted Todo Success',
              'success'
            )
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Failed",
          text: err?.response?.payload?.status_code || err?.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleReturnTodo = () => {
    const payload = {
      name: data?.name,
      note: data?.note,
      is_complete: false,
    };

    updateTodo(payload, data?.id)
      .then((res) => {
        mutate();
        Swal.fire({
          title: "Success",
          text: res?.status_code,
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Failed",
          text: err?.response?.payload?.status_code || err?.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className='p-5 rounded-lg border bg-white flex flex-col gap-2'>
      <div className='flex flex-col gap-0'>
        <div className='font-semibold'>{data?.name}</div>
        <div className='text-xs text-slate-200'>{dayjs(data?.created_at).locale(idID).format("dddd, DD MMMM YYYY")}</div>
      </div>
      <p className='rounded-lg bg-slate-100 p-3 text-sm italic'>{data?.note}</p>
      <div className='flex items-start justify-end gap-2 text-xs'>
        {isDone ? (
          <button
            className='rounded-lg bg-rose-600 text-white px-3 py-1 hover:bg-rose-700'
            onClick={() => handleReturnTodo()}>
            Return To Todo
          </button>
        ) : (
          <button
            className='rounded-lg bg-blue-600 text-white px-3 py-1 hover:bg-blue-700'
            onClick={() => handleDoneTodo()}>
            Done
          </button>
        )}
        <button
          className='rounded-lg bg-amber-600 text-white px-3 py-1 hover:bg-amber-700'
          onClick={() => handleEditTodo(data)}>
          Edit
        </button>
        <button
          className='rounded-lg bg-slate-600 text-white px-3 py-1 hover:bg-slate-700'
          onClick={() => handleDeleteTodo(data?.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
