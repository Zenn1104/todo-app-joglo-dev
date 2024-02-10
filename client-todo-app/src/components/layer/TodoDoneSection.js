"use client";

import { useEffect, useState } from "react";
import TodoCard from "@/components/TodoCard";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

export const TodoDoneSection = ({ setSelectedTodo, setOpenUpdateModal }) => {
  const [todos, setTodos] = useState([]);
  const { data: todoData, error, mutate } = useSWR("/todos", fetcher);

  console.log(todoData);
  useEffect(() => {
    if (todoData?.payload) {
      setTodos(() =>
        todoData?.payload.filter((item) => item?.is_complete === true)
      );
    }
  }, [todoData]);

  return (
    <div className='p-5 flex flex-col gap-5'>
      <h1 className='text-3xl font-bold'>Todo Done</h1>
      <div className='flex flex-col gap-2'>
        {todos?.length > 0 ? (
          todos?.map((itm, idx) => (
            <TodoCard
              isDone={true}
              key={idx}
              data={itm}
              mutate={mutate}
              setSelectedTodo={setSelectedTodo}
              setOpenUpdateModal={setOpenUpdateModal}
            />
          ))
        ) : (
          <div>
            <p>Tidak Ada Todo Yang selesai</p>
          </div>
        )}
      </div>
    </div>
  );
};
