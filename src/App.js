import { Button } from "react-bootstrap";
import { useState } from "react";
import hederaContract from "./contract";

function App() {
  const [num, setNum] = useState(0);

  const onIncrement = async () => {
    const doIncrement = await hederaContract.setIntoContract({
      name: "increment",
    });
    let incExcTx = await doIncrement.execute(hederaContract.client);
    let incReceipt = await incExcTx.getReceipt(hederaContract.client);
    console.log(
      "🚀 ~ file: App.js:14 ~ onIncrement ~ incReceipt:",
      incReceipt.status.toString()
    );
    getter();
  };

  const onDecrement = async () => {
    const doDecrement = await hederaContract.setIntoContract({
      name: "decrement",
    });
    let decExcTx = await doDecrement.execute(hederaContract.client);
    let decReceipt = await decExcTx.getReceipt(hederaContract.client);
    console.log(
      "🚀 ~ file: App.js:22 ~ onDecrement ~ decReceipt:",
      decReceipt.status.toString()
    );
    getter();
  };

  const onReset = async () => {
    const doReset = await hederaContract.setIntoContract({ name: "reset" });
    let resetExcTx = await doReset.execute(hederaContract.client);
    let resetReceipt = await resetExcTx.getReceipt(hederaContract.client);
    console.log(
      "🚀 ~ file: App.js:29 ~ onReset ~ resetReceipt:",
      resetReceipt.status.toString()
    );
    getter();
  };

  const getter = async () => {
    const getCount = await hederaContract.getFromContract("getter");
    let count = await getCount.getUint256(0);
    setNum(count);
    console.log("🚀 ~ file: App.js:45 ~ getter ~ count:", count);
  };

  return (
    <div className="App">
      <h1>{JSON.stringify(num)}</h1>
      <Button variant="primary" onClick={onIncrement} gap={4}>
        Increment
      </Button>
      <Button variant="primary" onClick={onDecrement} gap={2}>
        Decrement
      </Button>
      <Button variant="primary" onClick={onReset} gap={2}>
        Reset
      </Button>
    </div>
  );
}

export default App;
