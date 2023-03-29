import {
  ContractCallQuery,
  ContractExecuteTransaction,
  Client,
} from "@hashgraph/sdk";

class Contract {
  constructor(primaryKey, accountId) {
    this.client = Client.forTestnet();
    this.client.setOperator(accountId, primaryKey);
  }

  async getFromContract(functionName) {
    const contractQuery = await new ContractCallQuery({
      gas: 100000,
      contractId: process.env.REACT_APP_CONTRACT_ID,
    })
      .setFunction(functionName)
      .execute(this.client);
    return contractQuery;
  }

  async setIntoContract(functionInfo) {
    const contractExecTx = await new ContractExecuteTransaction({
      contractId: process.env.REACT_APP_CONTRACT_ID,
      gas: 100000,
      function: functionInfo,
    });
    return contractExecTx;
  }
}


export default new Contract(process.env.REACT_APP_PRI_KEY, process.env.REACT_APP_ACC_ID)


