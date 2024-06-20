import { useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState(data);

  // const update = (id: number) => {
  //   const newTodos: DTodo[] = todos.map((todo) => {
  //     if (todo.id === id) return { ...todo, status: "Completed" };
  //     else return { ...todo };
  //   });

  const update = (id: number) => {
    const newTodos: DTodo[] = todos.map((todo) => {
      if (todo.id === id) {
        switch (todo.status) {
          case "Pending":
            return { ...todo, status: "In Progress" };
          case "In Progress":
            return { ...todo, status: "Completed" };
          case "Completed":
            return { ...todo, status: "Pending" };
          default:
            return { ...todo };
        }
      } else {
        return { ...todo };
      }
    });
    setTodos(newTodos);
  };
  const remove = (id: number) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });
  const addTodo = () => {
    if (newTodo.title && newTodo.description && newTodo.dueDate) {
      setTodos([...todos, { ...newTodo, id: Date.now() }]);
      setNewTodo({
        title: "",
        description: "",
        dueDate: "",
        status: "Pending",
      });
    } else {
      alert("Please Enter all fields..");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div style={{ background: "#EEEEEE", padding: "8px 4px" }}>
      <center>
        <h1>ToDo List</h1>
      </center>
      {todos.map((todo: DTodo) => (
        <li
          key={todo.id}
          style={{
            listStyleType: "none",
            display: "flex",
            padding: "2px 12px",
            marginBottom: "10px",
            background:
              todo.status === "Completed"
                ? "#90ee90"
                : todo.status === "In Progress"
                ? "#add8e6"
                : "#FF7F7F",
          }}
        >
          <div style={{ display: "flex" }}>
            <input
              type="checkbox"
              checked={todo.status === "Completed"}
              style={{ marginRight: "10px" }}
              onChange={() => update(todo.id)}
            />
            <div>
              <h2 style={{ margin: "0" }}>{todo.title}</h2>
              <p style={{ margin: "0" }}>{todo.description}</p>
              <p style={{ margin: "0" }}>Due Date: {todo.dueDate}</p>
              <p style={{ margin: "0" }}>Status: {todo.status}</p>
            </div>
            <button
              style={{
                height: "20px",
                position: "absolute",
                left: "83%",
                marginTop: "32px",
              }}
              onClick={() => remove(todo.id)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
      <h3>Add New ToDo..</h3>
      <input
        type="text"
        name="title"
        value={newTodo.title}
        onChange={handleInputChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="description"
        value={newTodo.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <input
        type="date"
        name="dueDate"
        value={newTodo.dueDate}
        onChange={handleInputChange}
      />
      <select name="status" value={newTodo.status} onChange={handleInputChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <br />
      <br />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}

interface DTodo {
  id: number;
  title: string;
  description: string;
  dueDate: any;
  status: "Pending" | "In Progress" | "Completed";
}

const data: DTodo[] = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, Bread, Eggs, Butter, Fruits",
    dueDate: "2024-06-10",
    status: "Pending",
  },
  {
    id: 2,
    title: "Finish project report",
    description: "Complete the final section and proofread",
    dueDate: "2024-06-12",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Schedule dentist appointment",
    description: "Routine check-up and cleaning",
    dueDate: "2024-06-15",
    status: "Pending",
  },
  {
    id: 4,
    title: "Call plumber",
    description: "Fix the leaky faucet in the kitchen",
    dueDate: "2024-06-11",
    status: "Completed",
  },
  {
    id: 5,
    title: "Plan weekend trip",
    description: "Research destinations and book accommodation",
    dueDate: "2024-06-13",
    status: "Pending",
  },
];
