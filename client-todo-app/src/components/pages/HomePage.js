"use client";

import React, { useState } from "react";
import TodoUndoneSection from "@/components/layer/TodoUndoneSection";
import AddTodoModal from "@/components/modals/AddTodoModal";
import UpdateTodoModal from "@/components/modals/UpdateTodoModal";
import { TodoDoneSection } from "@/components/layer/TodoDoneSection";

const HomePage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleOpenModalNewTodo = () => {
    setOpenAddModal(true);
  };

  return (
    <main>
      <div className='flex flex-col gap-2'>
        <div>
          <button
            className='rounded-lg bg-emerald-400 px-3 py-2 text-lg font-semibold'
            onClick={handleOpenModalNewTodo}>
            + Add Todo
          </button>
          {openAddModal ? (
            <AddTodoModal handleClose={() => setOpenAddModal(false)} />
          ) : null}
          {openEditModal ? (
            <UpdateTodoModal
              data={selectedTodo}
              handleClose={() => {
                setOpenEditModal(false);
                setSelectedTodo(null);
              }}
            />
          ) : null}
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <div>
          <TodoUndoneSection
            setOpenUpdateModal={setOpenEditModal}
            setSelectedTodo={setSelectedTodo}
          />
        </div>
        <div>
          <TodoDoneSection
            setOpenUpdateModal={setOpenEditModal}
            setSelectedTodo={setSelectedTodo}
          />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
