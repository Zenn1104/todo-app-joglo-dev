"use client";

import React, { useState } from "react";
import { addTodo } from "../service/todo/todo.service";
import Swal from "sweetalert2";
import { mutate } from "swr";

const AddTodoForm = ({ handleclose }) => {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoading) {
      setIsLoading(true);
      const payload = {
        name: name,
        note: note,
        is_complete: false,
      };

      addTodo(payload)
        .then((res) => {
          setName(() => "");
          setNote(() => "");

          mutate("/todos");

          handleclose();

          Swal.fire({
            title: "Success",
            text: "added todo",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Ups!",
            text: "failed added todo",
            icon: "error",
            confirmButtonText: "OK",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <form className='flex flex-col gap-2'>
      <div className='flex flex-col gap-2'>
        <label>Label</label>
        <input
          className='rounded-lg p-3 bg-slate-200'
          value={name}
          onChange={(e) => setName(() => e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label>Catatan</label>
        <textarea
          rows={3}
          className='rounded-lg p-3 bg-slate-200'
          value={note}
          onChange={(e) => setNote(() => e.target.value)}
        />
      </div>
      <div>
        <button
          className='w-full text-center rounded-lg bg-emerald-400 text-white font-semobold text-lg py-2'
          onClick={handleSubmit}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
