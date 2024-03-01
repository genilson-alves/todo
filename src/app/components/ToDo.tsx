"use client";

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { FaArrowUp, FaArrowDown, FaRegStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Calendar } from "react-calendar";

const ToDoList = styled.nav`
  max-width: 1400px;
  margin: auto;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 20px 20px 40px;
`;

const SearchContainer = styled.div`
  padding: 10px;
  border-radius: 20px;
  font-size: 1rem;
  width: 300px;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #fff;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
`;

const Main = styled.main`
  display: flex;
  margin: 20px;
`;

const Aside = styled.aside`
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  span {
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    &:hover {
      background-color: #cddff3;
    }
  }
`;

const AsideButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#98c5f8" : "#cddff3")};
  color: white;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: ${(props) => (props.active ? "98c5f8" : "darkgray")};
  }
`;

const TasksContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0px 5px;
  padding: 20px;
  border-radius: 20px;
`;

const AddTaskWrapper = styled.div`
  display: flex;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  gap: 10px;
`;

const AddTask = styled.input`
  width: 50%;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  outline: none;
  background-color: #f0f6fe;
  border-radius: 20px;
`;

const AddTaskButton = styled.button`
  border: none;
  background-color: #4484ed;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
`;

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TaskSectionTitle = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const TasksWrapper = styled.p`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: #cddff3;
  padding: 10px;
  border-radius: 10px;
  flex: 1;
  &:hover {
    background-color: #98c5f8;
    transition: 0.3s;
  }
`;

const TaskButtons = styled.div`
  display: flex;
  padding: 5px;
  gap: 5px;
`;

const TaskText = styled.p`
  flex: 1;
  margin-top: -5px;
`;

const TaskHour = styled.p`
  font-size: 0.8rem;
  font-style: italic;
`;

const Tasks = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
`;

const TaskOption = styled.div`
  border: none;
  cursor: pointer;
`;

const Login = styled.button`
  border: none;
  background-color: #2652cf;
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const NoTask = styled.p`
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

function ToDo() {
  const [tasks, setTasks] = useState<{ hour: string; task: string }[]>([]);
  const [newTask, setNewTask] = useState({ hour: "", task: "" });
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, task: event.target.value });
  };

  const addTask = () => {
    if (newTask.task.trim() !== "") {
      const hour = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const taskObject = { hour, task: newTask.task };
      setTasks((prev) => [...prev, taskObject]);
      setNewTask({ hour: "", task: "" });
    } else {
      // Aviso caso o usuário escreva apenas espaços ou não escreva nada
      alert("Por favor escreva um valor válido!");
    }
  };

  const deleteTask = (index: any) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const moveTaskUp = (index: any) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const moveTaskDown = (index: any) => {
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
          <SearchInput type="text" placeholder="Search a task..." />
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
            Favoritas
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
              placeholder="Add a new task..."
              value={newTask.task}
              onChange={handleInputChange}
            ></AddTask>
            <AddTaskButton onClick={addTask}>Add</AddTaskButton>
          </AddTaskWrapper>
          <TaskWrapper>
            <TaskSectionTitle>Favoritas</TaskSectionTitle>
            {tasks.length ? (
              <TasksWrapper>
                {tasks.map((task, index) => (
                  <Tasks key={index}>
                    <input type="checkbox"></input>
                    <Task>
                      <TaskButtons>
                        <TaskOption>
                          <FaRegStar></FaRegStar>
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
                ))}
              </TasksWrapper>
            ) : (
              <NoTask>
                Você não tem nenhuma tarefa marcada como favorita no momento!
              </NoTask>
            )}
          </TaskWrapper>
          <TaskWrapper>
            <TaskSectionTitle>Todas</TaskSectionTitle>
            {tasks.length ? (
              <TasksWrapper>
                {tasks.map((task, index) => (
                  <Tasks key={index}>
                    <input type="checkbox"></input>
                    <Task>
                      <TaskButtons>
                        <TaskOption>
                          <FaRegStar></FaRegStar>
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
                ))}
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
