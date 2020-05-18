from solc import compile_standard
import json
import sha3
from web3 import Web3

def compile_contract(contract_source_files, contractFileName, contractName=None, **kwargs):
    """
    Reads file, compiles, returns contract name and interface

    Returns:
        bytecode
    """
    compiler_input = {
        "language": 'Solidity',
        "sources": {
        },
        "settings": {
            "outputSelection": {
                '*': {
                    '*': [ "*" ]
                }
            },
            "libraries": kwargs.get("libraries", {})
        }
    }

    for contract_source_file in contract_source_files:
        f = open(contract_source_file,"r")
        compiler_input["sources"][contract_source_file] = {
            "content": f.read()
        }

    # print("Compiler input {0}".format(compiler_input))
    # TODO: Fix the allowed paths
    import os
    print("Got kwargs {0}".format(kwargs))
    compiled_sol = compile_standard(compiler_input, allow_paths="{0}/@openzeppelin/".format(os.getcwd())) # Compiled source code
    # print("Compiled bytecode {0}".format(compiled_sol['contracts'][contractFileName][contractName])) # [contractFileName][contractName]['evm']['bytecode']['object']
    bytecode = compiled_sol['contracts'][contractFileName][contractName]['evm']['bytecode']['object']
    abi = json.loads(compiled_sol['contracts'][contractFileName][contractName]['metadata'])['output']['abi']
    return bytecode, abi


w3 = Web3(Web3.HTTPProvider("http://localhost:8545"))
w3.eth.defaultAccount = w3.eth.accounts[0]

bytecode_impl, abi_impl = compile_contract(['Event.sol'], 'Event.sol', 'EventV1')

RecycleContract_impl = w3.eth.contract(abi=abi_impl, bytecode=bytecode_impl)

tx_hash = RecycleContract_impl.constructor().transact()
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
new_impl_contract_address = tx_receipt.contractAddress


bytecode, abi = compile_contract(['Event.sol'], 'Event.sol', 'EventProxy')
RecycleContract = w3.eth.contract(abi=abi, bytecode=bytecode)
tx_hash = RecycleContract.constructor(new_impl_contract_address, w3.eth.accounts[0], b'').transact()
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
contract_address = tx_receipt.contractAddress
print("Created contract address {0}".format(contract_address))