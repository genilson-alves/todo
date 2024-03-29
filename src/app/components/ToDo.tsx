"use client";

import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { TbPinned, TbPinnedOff } from "react-icons/tb";
import { MdDelete, MdRestoreFromTrash } from "react-icons/md";

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

const AsideButton = styled.button<{ $active: boolean }>`
  border: none;
  padding: 15px;
  font-size: 1rem;
  background-color: ${(props) => (props.$active ? "#98c5f8" : "#f0f6fe")};
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

const SelectedTasksOptions = styled.div`
  margin: 10px;
  button {
    background-color: #4484ed;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 12px 15px;
    margin: 0px 5px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
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

const Task = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: ${(props) => (props.$isSelected ? "#669bf1" : "#b6d6fa")};
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
    id: uuidv4(),
    hour: "",
    task: "",
    pinned: false,
  });
  const [activeButton, setActiveButton] = useState<number>(1);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [deletedTasks, setDeletedTasks] = useState<TaskType[]>([]);
  const [search, setSearch] = useState("");

  // Função para mudar o número do botão que o usuário clicar e mostrar se ele quer ver todas as tarefas, as fixadas ou a sua lixeira
  const handleButtonClick = (activeButtonNumber: number) => {
    setActiveButton(activeButtonNumber);
  };

  // Função para lidar com o que foi escrito pelo usuário no input de adicionar novas tarefas
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Adiciona uma nova tarefa
    setNewTask({ ...newTask, task: event.target.value });
  };

  // Função para realizar a seleção de tarefas
  const handleCheckEvent = (taskId: number) => {
    const updatedSelectedTasks = selectedTasks.includes(taskId)
      ? selectedTasks.filter((id) => id !== taskId)
      : [...selectedTasks, taskId];
    setSelectedTasks(updatedSelectedTasks);
  };

  // Função para adicionar uma nova tarefa quando o usuário clicar no botão de adicionar
  const addTask = () => {
    // Checa se a nova tarefa adicionada pelo usuário tem algum conteúdo, caso não, envia uma alerta
    if (newTask.task.trim() !== "") {
      // Adiciona o horário atual no qual o usuário adicionou a tarefa
      const hour = new Date().toLocaleTimeString("pt-BR", {
        timeStyle: "short",
      });
      const taskObject = {
        id: tasks.length + 1,
        hour,
        task: newTask.task,
        pinned: false,
      };
      setTasks((prev) => [...prev, taskObject]);
      setNewTask({ id: "", hour: "", task: "", pinned: false });
    } else {
      // Aviso caso o usuário escreva apenas espaços ou não escreva nada na área de adicionar uma nova tarefa
      alert("Por favor, escreva um valor válido!");
    }
  };

  // Função para fixar uma nova tarefa dentro da Array tasks
  const pinTask = (task: TaskType) => {
    setTasks((prev) =>
      prev.map((tasks) =>
        // Compara os IDs, recebe os valores anteriores das tasks e muda para fixado ou não
        tasks.id === task.id ? { ...tasks, pinned: !tasks.pinned } : tasks
      )
    );
  };

  // Função para excluir uma tarefa de dentro da Array tasks realizando um filtro com o index
  const deleteTask = (index: number) => {
    if (index >= 0 && index < tasks.length) {
      const tasksDeleted = tasks[index];
      setDeletedTasks((prev) => [...prev, tasksDeleted]);
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } else {
      console.error("Invalid index for deleting task");
    }
  };

  // Função para restaurar as tarefas que foram excluídas
  const restoreTask = (index: number) => {
    if (index >= 0 && index < deletedTasks.length) {
      const restoredTask = deletedTasks[index];
      const updatedDeletedTasks = deletedTasks.filter((_, i) => i !== index);
      setDeletedTasks(updatedDeletedTasks);
      setTasks((prev) => [...prev, restoredTask]);
    } else {
      console.error("Invalid index for restoring task");
    }
  };

  // Função para excluir permanentemente uma tarefa
  const deleteBinTask = (index: number) => {
    setDeletedTasks((prevDeletedTasks) =>
      prevDeletedTasks.filter((_, i) => i !== index)
    );
  };

  // Função para mover a tarefa para cima, realizando a inversão do index, também checa se a tarefa já não é a primeira ou última
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

  // Função para mover a tarefa para baixo, realizando a inversão do index, também checando se a tarefa já não é a primeira ou última
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

  // Função para excluir todas as tasks que foram selecionadas pelo usuário
  const deleteSelectedTasks = () => {
    // Filtra todas as tasks selecionadas pelo usuário
    const updatedTasks = tasks.filter(
      (task) => !selectedTasks.includes(task.id)
    );
    // Atualiza o estado atual das tasks
    setTasks(updatedTasks);
    // Move as tasks excluídas para a array de items excluídos
    const updatedDeletedTasks = [
      ...deletedTasks,
      ...tasks.filter((task) => selectedTasks.includes(task.id)),
    ];
    setDeletedTasks(updatedDeletedTasks);
    // Limpa a array de tasks selecionadas
    setSelectedTasks([]);
  };

  // Função para excluir todas as tasks que foram selecionadas pelo usuário na lixeira
  const deleteSelectedBinTasks = () => {
    // Filtra todas as tasks selecionadas pelo usuário
    const updatedDeletedTasks = deletedTasks.filter(
      (task) => !selectedTasks.includes(task.id)
    );
    // Atualiza o estado atual da array deletedTasks
    setDeletedTasks(updatedDeletedTasks);
    // Limpa a array de tasks selecionadas
    setSelectedTasks([]);
  };

  const restoreSelectedBinTasks = () => {
    // Filtra todas as tasks selecionadas pelo usuário
    const restoredTasks = deletedTasks.filter((task) =>
      selectedTasks.includes(task.id)
    );
    // Atuliza a array das tasks adicionando as tasks que foram restauradas
    setTasks((prevTasks) => [...prevTasks, ...restoredTasks]);
    // Atualiza a array deletedTasks removendo as tasks restauradas
    setDeletedTasks((prevDeletedTasks) =>
      prevDeletedTasks.filter((task) => !selectedTasks.includes(task.id))
    );
    // Limpa a array de tasks selecionadas
    setSelectedTasks([]);
  };

  // Função para fixar todas as tasks que foram selecionadas pelo usuário
  const pinSelectedTasks = () => {
    // Faz um loop em todas as tasks e atualiza o valor pinned para true caso esteja selecionada
    const updatedTasks = tasks.map((task) => {
      if (selectedTasks.includes(task.id)) {
        return { ...task, pinned: true };
      }
      return task;
    });
    setTasks(updatedTasks);
    // Limpa a array de tasks selecionadas
    setSelectedTasks([]);
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
            $active={activeButton === 1}
            onClick={() => handleButtonClick(1)}
          >
            Todas
          </AsideButton>
          <AsideButton
            $active={activeButton === 2}
            onClick={() => handleButtonClick(2)}
          >
            Fixadas
          </AsideButton>
          <AsideButton
            $active={activeButton === 3}
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
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addTask();
                }
              }}
            ></AddTask>
            <AddTaskButton onClick={addTask}>Adicionar</AddTaskButton>
          </AddTaskWrapper>
          {selectedTasks.length > 0 && (
            <>
              {activeButton === 3 ? (
                <SelectedTasksOptions>
                  <button onClick={restoreSelectedBinTasks}>
                    {selectedTasks.length > 1 ? "Restore All" : "Restore"}
                  </button>
                  <button onClick={deleteSelectedBinTasks}>
                    {selectedTasks.length > 1 ? "Delete All" : "Delete"}
                  </button>
                </SelectedTasksOptions>
              ) : (
                <SelectedTasksOptions>
                  <button onClick={pinSelectedTasks}>
                    {selectedTasks.length > 1 ? "Pin All" : "Pin"}
                  </button>
                  <button onClick={deleteSelectedTasks}>
                    {selectedTasks.length > 1 ? "Delete All" : "Delete"}
                  </button>
                </SelectedTasksOptions>
              )}
            </>
          )}
          {activeButton === 1 ? (
            <>
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
                                title="Selecionar"
                                checked={selectedTasks.includes(task.id)}
                                onChange={() => handleCheckEvent(task.id)}
                              ></input>
                              <Task
                                $isSelected={selectedTasks.includes(task.id)}
                              >
                                <TaskButtons>
                                  <TaskOption
                                    onClick={() => pinTask(task)}
                                    title="Desafixar"
                                  >
                                    <TbPinnedOff></TbPinnedOff>
                                  </TaskOption>
                                  <TaskOption
                                    onClick={() => deleteTask(index)}
                                    title="Excluir"
                                  >
                                    <MdDelete></MdDelete>
                                  </TaskOption>
                                  <TaskOption
                                    onClick={() => moveTaskUp(index)}
                                    title="Mover para cima"
                                  >
                                    <FaArrowUp></FaArrowUp>
                                  </TaskOption>
                                  <TaskOption
                                    onClick={() => moveTaskDown(index)}
                                    title="Mover para baixo"
                                  >
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
                  <NoTask>
                    Você não tem nenhuma tarefa fixada no momento!
                  </NoTask>
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
                            <Tasks key={task.id}>
                              <input
                                type="checkbox"
                                title="Selecionar"
                                checked={selectedTasks.includes(task.id)}
                                onChange={() => handleCheckEvent(task.id)}
                              ></input>
                              <Task
                                $isSelected={selectedTasks.includes(task.id)}
                              >
                                <TaskButtons>
                                  <TaskOption
                                    onClick={() => pinTask(task)}
                                    title="fixar"
                                  >
                                    <TbPinned></TbPinned>
                                  </TaskOption>
                                  <TaskOption
                                    onClick={() => deleteTask(index)}
                                    title="Excluir"
                                  >
                                    <MdDelete></MdDelete>
                                  </TaskOption>
                                  <TaskOption
                                    onClick={() => moveTaskUp(index)}
                                    title="Mover para cima"
                                  >
                                    <FaArrowUp></FaArrowUp>
                                  </TaskOption>
                                  <TaskOption
                                    onClick={() => moveTaskDown(index)}
                                    title="Mover para baixo"
                                  >
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
            </>
          ) : activeButton === 2 ? (
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
                          <Tasks key={task.id}>
                            <input
                              type="checkbox"
                              title="Selecionar"
                              checked={selectedTasks.includes(task.id)}
                              onChange={() => handleCheckEvent(task.id)}
                            ></input>
                            <Task $isSelected={selectedTasks.includes(task.id)}>
                              <TaskButtons>
                                <TaskOption
                                  onClick={() => pinTask(task)}
                                  title="Fixar"
                                >
                                  <TbPinnedOff></TbPinnedOff>
                                </TaskOption>
                                <TaskOption
                                  onClick={() => deleteTask(index)}
                                  title="Excluir"
                                >
                                  <MdDelete></MdDelete>
                                </TaskOption>
                                <TaskOption
                                  onClick={() => moveTaskUp(index)}
                                  title="Mover para cima"
                                >
                                  <FaArrowUp></FaArrowUp>
                                </TaskOption>
                                <TaskOption
                                  onClick={() => moveTaskDown(index)}
                                  title="Mover para baixo"
                                >
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
          ) : (
            <TaskWrapper>
              <TaskSectionTitle>Lixeira</TaskSectionTitle>
              {deletedTasks.length > 0 ? (
                <TasksWrapper>
                  {deletedTasks
                    .filter((task) =>
                      task.task.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((task, index) => (
                      <Tasks key={task.id}>
                        <input
                          type="checkbox"
                          title="Selecionar"
                          checked={selectedTasks.includes(task.id)}
                          onChange={() => handleCheckEvent(task.id)}
                        ></input>
                        <Task $isSelected={selectedTasks.includes(task.id)}>
                          <TaskButtons>
                            <TaskOption
                              onClick={() => restoreTask(index)}
                              title="Restaurar"
                            >
                              <MdRestoreFromTrash></MdRestoreFromTrash>
                            </TaskOption>
                            <TaskOption
                              onClick={() => deleteBinTask(index)}
                              title="Excluir permanentemente"
                            >
                              <MdDelete></MdDelete>
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
                  Você não tem nenhuma tarefa na lixeira no momento!
                </NoTask>
              )}
            </TaskWrapper>
          )}
        </TasksContainer>
      </Main>
    </ToDoList>
  );
}

export default ToDo;
