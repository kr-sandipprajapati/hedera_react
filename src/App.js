import { Button, InputGroup, Form } from "react-bootstrap";
import { useState } from "react";
import { ContractFunctionParameters } from "@hashgraph/sdk";
import hederaContract from "./contract";

function App() {
  const [num, setNum] = useState(0);
  const [changeVal, setOnChangeVal] = useState(0);
  const [val, setVal] = useState(0);

  // getting from smart contract without parameters function
  const onIncrement = async () => {
    const doIncrement = await hederaContract.setIntoContract({
      name: "increment",
    });
    let incReceipt = await doIncrement.getReceipt(hederaContract.client);
    console.log("Increment Receipt:", incReceipt.status.toString());
    getter();
  };

  const onDecrement = async () => {
    const doDecrement = await hederaContract.setIntoContract({
      name: "decrement",
    });
    let decReceipt = await doDecrement.getReceipt(hederaContract.client);
    console.log("Decrement Receipt:", decReceipt.status.toString());
    getter();
  };

  const onReset = async () => {
    const doReset = await hederaContract.setIntoContract({ name: "reset" });
    let resetReceipt = await doReset.getReceipt(hederaContract.client);
    console.log("Reset Receipt:", resetReceipt.status.toString());
    getter();
  };

  // setting from smart contract with parameters function
  const onDyIncrement = async (incr) => {
    try {
      const doIncrement = await hederaContract.setIntoContractWithParams({
        name: "dyIncr",
        parameters: new ContractFunctionParameters().addUint256(Number(incr)),
      });
      // let incExec = await doIncrement.execute(hederaContract.client);
      let incReceipt = await doIncrement.getReceipt(hederaContract.client);
      console.log("Dynamic IncrementReceipt:", incReceipt.status.toString());
      getter();
    } catch (err) {
      console.log("🚀 ~ file: App.js:49 ~ onDyIncrement ~ err:", err);
    }
  };

  const onDyDecrement = async (decr) => {
    try {
      const doDecrement = await hederaContract.setIntoContractWithParams({
        name: "dyDecr",
        parameters: new ContractFunctionParameters().addUint256(Number(decr)),
      });
      let decReceipt = await doDecrement.getReceipt(hederaContract.client);
      console.log("Dynamic Decrement Receipt:", decReceipt.status.toString());
      getter();
    } catch (err) {
      console.log("🚀 ~ file: App.js:49 ~ onDyIncrement ~ err:", err);
    }
  };

  // getting from smart contract with parameters function
  const onDyGetter = async (num) => {
    try {
      const doDecrement = await hederaContract.getFromContractWithParams({
        name: "dyGetter",
        parameters: new ContractFunctionParameters().addUint256(Number(num)),
      });
      let value = doDecrement.getUint256(0);
      setVal(JSON.stringify(value));
    } catch (err) {
      console.log("🚀 ~ file: App.js:49 ~ onDyIncrement ~ err:", err);
    }
  };

  // getting from smart contract without parameters function
  const getter = async () => {
    const getCount = await hederaContract.getFromContract("getter");
    let count = getCount.getUint256(0);
    setNum(count);
  };

  const onChangeValue = (e) => {
    setOnChangeVal(e.target.value);
  };

  return (
    <div className="App container mt-2">
      <h1>{JSON.stringify(num)}</h1>
      <Button variant="primary" className="mx-2" onClick={onIncrement} gap={4}>
        Increment
      </Button>
      <Button variant="primary" className="mx-2" onClick={onDecrement} gap={2}>
        Decrement
      </Button>
      <Button variant="primary" className="mx-2" onClick={onReset} gap={2}>
        Reset
      </Button>
      <br />
      <div style={{ width: "25%" }}>
        <InputGroup className="mb-3 mt-2">
          <Form.Control
            placeholder="Increment Value"
            aria-label="Increment Value"
            aria-describedby="basic-addon2"
            onChange={onChangeValue}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => onDyIncrement(changeVal)}
          >
            Increment
          </Button>
        </InputGroup>
        <InputGroup className="mb-3 mt-2">
          <Form.Control
            placeholder="Decrement Value"
            aria-label="Decrement Value"
            aria-describedby="basic-addon2"
            onChange={onChangeValue}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => onDyDecrement(changeVal)}
          >
            Decrement
          </Button>
        </InputGroup>
      </div>
      <br />
      <div>
        <h1>{val}</h1>
        <div style={{ width: "25%" }}>
          <InputGroup className="mb-3 mt-2">
            <Form.Control
              placeholder="Extra Number"
              aria-label="Extra Number"
              aria-describedby="basic-addon2"
              onChange={onChangeValue}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => onDyGetter(changeVal)}
            >
              Decrement
            </Button>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}

export default App;
