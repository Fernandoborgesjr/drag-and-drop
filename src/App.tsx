import { useEffect, useState } from "react";
import "./App.css";
import DragDrop from "./components/DragDrop";
import Item from "./components/DraggableItem";

type ItemProps = { id: string | number; content: string };

function App() {
  // fake data generator
  const getItems = (count: number) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: k,
      content: `Item ${k + 1}`,
    }));

  const [state, setState] = useState<ItemProps[]>(getItems(10) as ItemProps[]);
  const [info, setInfo] = useState("");

  const action = () => {
    setInfo("Chamou a action. E.g.: envio dos dados para uma api");
    /*     const dataApi = state.map((item, index) =>
      Object.assign(item, { order: index + 1 })
    );
    setData(dataApi); */
  };

  useEffect(() => {
    const timer = setInterval(() => setInfo(""), 3000);
    return () => {
      clearInterval(timer);
    };
  }, [info]);

  return (
    <div className="App">
      <DragDrop
        state={state}
        setState={setState}
        action={action}
        draggableComponent={(provided, snapshot, item) => (
          <Item provided={provided} snapshot={snapshot} item={item} />
        )}
      />
      <div className="info">{info}</div>
    </div>
  );
}

export default App;
