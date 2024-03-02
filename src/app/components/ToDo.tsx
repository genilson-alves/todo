"use client";

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { TbPin, TbPinned, TbPinnedOff } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { Calendar } from "react-calendar";

type TaskType = {
  id: number;
  hour: string;
  task: string;
  pinned: boolean;
};

const ToDoList = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 768px) {
  }
  @media (min-width: 769px) {
  }
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px;
  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: #fff;
  padding: 0px 10px;
  border-radius: 10px;
  width: 100%;
  @media (min-width: 769px) {
    width: 50%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 15px;
  border-radius: 10px;
`;

const Main = styled.main`
  @media (min-width: 769px) {
    display: flex;
  }
`;

const Aside = styled.aside`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px;
  @media (min-width: 769px) {
    flex: 0 0 200px;
    flex-direction: column;
    justify-content: start;
  }
`;

const AsideButton = styled.button<{ active: boolean }>`
  border: none;
  padding: 15px;
  font-size: 1rem;
  background-color: ${(props) => (props.active ? "#98c5f8" : "#f0f6fe")};
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #98c5f8;
  }
`;

const TasksContainer = styled.div`
  @media (min-width: 769px) {
    flex: 1;
  }
`;

const AddTaskWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  gap: 10px;
  margin: 10px;
  background-color: #fff;
  padding: 15px;
`;

const AddTask = styled.input`
  flex: 1;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 10px;
`;

const AddTaskButton = styled.button`
  border: none;
  padding: 10px;
  border-radius: 10px;
  background-color: #4484ed;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const TaskWrapper = styled.div`
  margin: 20px 10px;
`;

const TaskSectionTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TasksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
`;

const Tasks = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Task = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: ${(props) => (props.isSelected ? "#669bf1" : "#b6d6fa")};
  padding: 10px;
  border-radius: 10px;
  gap: 5px;
  cursor: pointer;
  &:hover {
    background-color: #6eaef5;
    transition: 0.3s;
  }
  @media (min-width: 769px) {
    flex-direction: row;
    gap: 15px;
  }
`;

const TaskButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TaskText = styled.p`
  flex: 1;
  margin-top: -2px;
  align-self: start;
  overflow-wrap: anywhere;
`;

const TaskHour = styled.p`
  font-size: 0.8rem;
  font-style: italic;
  @media (max-width: 768px) {
    align-self: end;
  }
`;

const TaskOption = styled.div``;

const Login = styled.button`
  display: none;
  @media (min-width: 769px) {
    display: block;
    border: none;
    padding: 15px 20px;
    border-radius: 10px;
    background-color: #4484ed;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const NoTask = styled.p`
  text-align: center;
  border-radius: 10px;
`;

function ToDo() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState({
    id: 0,
    hour: "",
    task: "",
    pinned: false,
  });
  const [activeButton, setActiveButton] = useState<number>(1);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  console.log(selectedTasks);

  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, task: event.target.value });
  };

  const handleCheckEvent = (taskId: number) => {
    const updatedSelectedTasks = selectedTasks.includes(taskId)
      ? selectedTasks.filter((id) => id !== taskId)
      : [...selectedTasks, taskId];

    setSelectedTasks(updatedSelectedTasks);
  };

  // Função para adicionar uma nova tarefa dentro da Array tasks
  const addTask = () => {
    if (newTask.task.trim() !== "") {
      const hour = new Date().toLocaleTimeString("pt-BR", {
        timeStyle: "short",
      });
      console.log(hour);
      const taskObject = {
        id: tasks.length + 1,
        hour,
        task: newTask.task,
        pinned: false,
      };
      setTasks((prev) => [...prev, taskObject]);
      setNewTask({ id: 0, hour: "", task: "", pinned: false });
    } else {
      // Aviso caso o usuário escreva apenas espaços ou não escreva nada
      alert("Por favor, escreva um valor válido!");
    }
  };

  // Função para fixar uma nova tarefa dentro da Array tasks
  const pinTask = (task: TaskType) => {
    setTasks((prev) =>
      prev.map((tasks) =>
        // Compara os IDs, recebe os valores anteriores das tasks e muda para fixado ou não a task
        tasks.id === task.id ? { ...tasks, pinned: !tasks.pinned } : tasks
      )
    );
  };

  // Função para deletar uma tarefa de dentro da Array tasks
  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const moveTaskUp = (index: number) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const moveTaskDown = (index: number) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  return (
    <ToDoList>
      <Navigation>
        <a href="#">
          <Image src="/todo.png" alt="logo" width={50} height={50}></Image>
        </a>
        <SearchContainer>
          <CiSearch></CiSearch>
          <SearchInput
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Procure por uma tarefa..."
          />
        </SearchContainer>
        <Login>Login</Login>
      </Navigation>
      <Main>
        <Aside>
          <AsideButton
            active={activeButton === 1}
            onClick={() => handleButtonClick(1)}
          >
            Todas
          </AsideButton>
          <AsideButton
            active={activeButton === 2}
            onClick={() => handleButtonClick(2)}
          >
            Fixadas
          </AsideButton>
          <AsideButton
            active={activeButton === 3}
            onClick={() => handleButtonClick(3)}
          >
            Lixeira
          </AsideButton>
        </Aside>
        <TasksContainer>
          <AddTaskWrapper>
            <AddTask
              type="text"
              placeholder="Adicione uma nova tarefa..."
              value={newTask.task}
              onChange={handleInputChange}
            ></AddTask>
            <AddTaskButton onClick={addTask}>Adicionar</AddTaskButton>
          </AddTaskWrapper>
          <TaskWrapper>
            <TaskSectionTitle>Fixadas</TaskSectionTitle>
            {tasks.some((task) => task.pinned) ? (
              <TasksWrapper>
                {tasks
                  .filter((task) =>
                    task.task.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(
                    (task, index) =>
                      task.pinned && (
                        <Tasks key={index}>
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task.id)}
                            onChange={() => handleCheckEvent(task.id)}
                          ></input>
                          <Task isSelected={selectedTasks.includes(task.id)}>
                            <TaskButtons>
                              <TaskOption onClick={() => pinTask(task)}>
                                <TbPinnedOff></TbPinnedOff>
                              </TaskOption>
                              <TaskOption onClick={() => deleteTask(index)}>
                                <MdDelete></MdDelete>
                              </TaskOption>
                              <TaskOption onClick={() => moveTaskUp(index)}>
                                <FaArrowUp></FaArrowUp>
                              </TaskOption>
                              <TaskOption onClick={() => moveTaskDown(index)}>
                                <FaArrowDown></FaArrowDown>
                              </TaskOption>
                            </TaskButtons>
                            <TaskText>{task.task}</TaskText>
                            <TaskHour>{task.hour}</TaskHour>
                          </Task>
                        </Tasks>
                      )
                  )}
              </TasksWrapper>
            ) : (
              <NoTask>Você não tem nenhuma tarefa fixada no momento!</NoTask>
            )}
          </TaskWrapper>
          <TaskWrapper>
            <TaskSectionTitle>Todas</TaskSectionTitle>
            {tasks.some((task) => !task.pinned) ? (
              <TasksWrapper>
                {tasks
                  .filter((task) =>
                    task.task.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(
                    (task, index) =>
                      !task.pinned && (
                        <Tasks key={index}>
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task.id)}
                            onChange={() => handleCheckEvent(task.id)}
                          ></input>
                          <Task isSelected={selectedTasks.includes(task.id)}>
                            <TaskButtons>
                              <TaskOption onClick={() => pinTask(task)}>
                                <TbPinned></TbPinned>
                              </TaskOption>
                              <TaskOption onClick={() => deleteTask(index)}>
                                <MdDelete></MdDelete>
                              </TaskOption>
                              <TaskOption onClick={() => moveTaskUp(index)}>
                                <FaArrowUp></FaArrowUp>
                              </TaskOption>
                              <TaskOption onClick={() => moveTaskDown(index)}>
                                <FaArrowDown></FaArrowDown>
                              </TaskOption>
                            </TaskButtons>
                            <TaskText>{task.task}</TaskText>
                            <TaskHour>{task.hour}</TaskHour>
                          </Task>
                        </Tasks>
                      )
                  )}
              </TasksWrapper>
            ) : (
              <NoTask>Você não tem nenhuma tarefa no momento!</NoTask>
            )}
          </TaskWrapper>
        </TasksContainer>
      </Main>
    </ToDoList>
  );
}

export default ToDo;
