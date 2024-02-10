"use client";

import { useEffect, useState } from "react";
import TodoCard from "@/components/TodoCard";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

const TodoUndoneSection = ({ setSelectedTodo, setOpenUpdateModal }) => {
  const [todos, setTodos] = useState([]);
  const { data: todoData, error, mutate } = useSWR("/todos", fetcher);

  useEffect(() => {
    if (todoData?.payload) {
      setTodos(() =>
        todoData?.payload.filter((item) => item?.is_complete === false)
      );
    }
  }, [todoData]);

  return (
    <div className='p-5 flex flex-col gap-5'>
      <h1 className='text-3xl font-bold'>Todo Undone</h1>
      <div className='flex flex-col gap-2'>
        {todos?.length > 0 ? (
          todos?.map((itm, idx) => (
            <TodoCard
              key={idx}
              data={itm}
              mutate={mutate}
              setSelectedTodo={setSelectedTodo}
              setOpenUpdateModal={setOpenUpdateModal}
            />
          ))
        ) : (
          <div>
            <p>Todo Belum Ada</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoUndoneSection;
