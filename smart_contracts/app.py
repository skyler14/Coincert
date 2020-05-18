from flask import Flask, request, Response
from flask_restplus import Resource, fields, reqparse, Api
from solc import compile_standard
import json
import sha3
from web3 import Web3
from werkzeug.exceptions import BadRequest

app = Flask(__name__)
api = Api(app, version="1.0", title="eVent", validate=False)

event = api.namespace('event', description='Event entity')
transaction = api.namespace('transaction', description='Monitor transactions')
user = api.namespace('user', description='User management')
appl = api.namespace('appl', description='Application management')

create_application_instance = reqparse.RequestParser()
create_application_instance.add_argument('admin_name', required=True, default="Piyush",
    help='Admin name instance', location='args')

application_instance = {}

def get_token_id(token_uri):
    return int.from_bytes(sha3.keccak_256(token_uri.encode('utf-8')).digest(), byteorder="big", signed=False)

class Application():
    def __init__(self):
        self.users = []
        self.w3 = Web3(Web3.HTTPProvider("http://localhost:8545"))
        self.owner_account = self.w3.eth.accounts[0]
        self.contract_address = None
        self.impl_contract_address = None
        self.contract = None
        self.owner_id = None
        self.proxy_contract_with_bytecode = None

    def create_account(self, password):
        w3 = Web3(Web3.HTTPProvider("http://localhost:8545"))
        address = w3.geth.personal.newAccount(password)
        self.users.append(address)

        # Bug in ganache-cli, doesn't accept two arguments, duration=None also doesn't work

        print("Created address {0}".format(address))
        gasLimit = 3000000;
        w3.geth.personal.unlockAccount(address, password, None)
        transaction = {
          "from": w3.eth.accounts[0],
          # "nonce": web3.toHex(1),
          # "gasPrice": w3.toHex(w3.eth.gasPrice * 1e9),
          "gasLimit": w3.toHex(gasLimit),
          "to": address,
          "value": w3.toWei(10,'ether'),
          # "private_key":
          # "chainId": 4 //remember to change this
        }
        # signed_txn = w3.eth.account.signTransaction()

            # var privKey = new Buffer(privateKey, 'hex');
            # var tx = new Tx(rawTransaction);

            # tx.sign(privKey);
            # var serializedTx = tx.serialize();

            # web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
            #   if (!err)
            #       {
            #         console.log('Txn Sent and hash is '+hash);
            #       }
            #   else
            #       {
            #         console.error(err);
            #       }
            # });

        # signed_txn = w3.eth.account.signTransaction(dict(
        #     gasPrice = w3.eth.gasPrice,
        #     gas = 100000,
        #     to=address,
        #     value=web3.toWei(10,'ether')
        #   ))

        w3.eth.sendTransaction(transaction)

        return address

    def get_user_map(self):
        user_map = {}
        for user_address in self.users:
            # print("Getting user details for {0}".format(user_address))
            if not self.proxy_contract_with_bytecode:
                print("Implementation contract not deployed yet!")
                raise BadRequest("Implementation contract not deployed yet!")

            # tx_hash = self.proxy_contract_with_bytecode.functions.getUserDetails(user_address).call()
            # tx_hash = self.proxy_contract_with_bytecode.functions.getUserDetails(user_address).call()
            email, phone = self.proxy_contract_with_bytecode.functions.getUserDetails(user_address).call()
            # print("Tx hash {0}".format(tx_hash))
            # tx_receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)
            # print("Tx receipt = {0}".format(tx_receipt))
            # print("Tx receipt logs = {0}".format(tx_receipt.logs))
            # print("piyush return value " + x)
            # print("Got email and phone {0}, {1}".format(email, phone))

            user_map[user_address] = {
                "email": email,
                "phone": phone
            }

        print("User map {0}".format(user_map))
        return user_map

@appl.route('/create_application')
class CreateApplication(Resource):

    @api.doc(description="One time operation")
    @api.expect(create_application_instance)
    def post(self):
        print("------------- Create application -------------")
        global application_instance
        args = create_application_instance.parse_args(request)
        admin_name = args.get('admin_name')
        print("Creating instance for {0}".format(admin_name))

        if admin_name in application_instance:
            raise BadRequest("This instance already exists")

        application_instance[admin_name] = Application()
        app = application_instance[admin_name]
        app.owner_id = app.w3.eth.accounts[0]
        app.w3.eth.defaultAccount = app.owner_id

        bytecode_impl, abi_impl = compile_contract(['Event.sol'], 'Event.sol', 'EventV1')

        RecycleContract_impl = app.w3.eth.contract(abi=abi_impl, bytecode=bytecode_impl)

        tx_hash = RecycleContract_impl.constructor().transact()
        tx_receipt = app.w3.eth.waitForTransactionReceipt(tx_hash)
        new_impl_contract_address = tx_receipt.contractAddress
        print("Created Implementation contract address {0}".format(new_impl_contract_address))
        print("Tx receipt = {0}".format(tx_receipt))
        print("Tx receipt logs = {0}".format(tx_receipt.logs))

        print()
        print(abi_impl)
        print()

        # tx_hash = app.contract.functions.upgradeTo(new_impl_contract_address).transact()
        # tx_receipt = app.w3.eth.waitForTransactionReceipt(tx_hash)
        # print("Tx receipt = {0}".format(tx_receipt))
        # print("Tx receipt logs = {0}".format(tx_receipt.logs))
        # if not tx_receipt.status:
        #     print("Failed to upggrade contract")
        #     raise BadRequest("Failed to upggrade contract")

        app.impl_contract_address = new_impl_contract_address

        bytecode, abi = compile_contract(['Event.sol'], 'Event.sol', 'EventProxy')
        RecycleContract = app.w3.eth.contract(abi=abi, bytecode=bytecode)
        tx_hash = RecycleContract.constructor(app.impl_contract_address, app.owner_id, b'').transact()
        tx_receipt = app.w3.eth.waitForTransactionReceipt(tx_hash)
        contract_address = tx_receipt.contractAddress
        print("Created contract address {0}".format(contract_address))
        print("Tx receipt = {0}".format(tx_receipt))
        print("Tx receipt logs = {0}".format(tx_receipt.logs))

        app.contract_address = contract_address
        app.contract = app.w3.eth.contract(address=contract_address, abi=abi, bytecode=bytecode)
        app.proxy_contract_with_bytecode = app.w3.eth.contract(address=app.contract_address, abi=abi_impl, bytecode=bytecode)
        # app.proxy_contract_with_bytecode = app.contract

@appl.route('/<string:admin_name>')
class GetApplication(Resource):
    def get(self, admin_name):
        app = application_instance[admin_name]
        print("------------- Get Application -------------")

        return Response(
            json.dumps(
                {
                    "contract_address": app.contract_address,
                    "impl_contract_address": app.impl_contract_address,
                    "owner_id": app.owner_id
                }),
            status=200, mimetype='application/json')

upgrade_contract = api.model('upgrade_contract', {
    'admin_name': fields.String(required=True, description='Admin name', default="Piyush"),
    'file_name': fields.String(required=True, description='New contract file name', default="EventV2.sol"),
    'new_contract_name': fields.String(required=True, default="EventV2", description='New contract name'),
})

@appl.route('/upgrade_contract')
class UpgradeContract(Resource):
    # @api.expect(upgrade_contract)
    @api.doc(description="Upgrade your smart contract")
    @api.expect(upgrade_contract)
    def post(self):
        print("------------- Upgrade Contract -------------")

        global application_instance

        admin_name = request.json.get('admin_name')
        print("Upgrading contract for {0}".format(admin_name))

        file_name = request.json.get('file_name')
        new_contract_name = request.json.get('new_contract_name')

        if admin_name not in application_instance:
            raise BadRequest("This instance doesn't exist")

        app = application_instance[admin_name]
        app.w3.eth.defaultAccount = app.owner_id

        bytecode, abi = compile_contract([file_name], file_name, new_contract_name)

        RecycleContract = app.w3.eth.contract(abi=abi, bytecode=bytecode)

        tx_hash = RecycleContract.constructor().transact()
        tx_receipt = app.w3.eth.waitForTransactionReceipt(tx_hash)
        new_impl_contract_address = tx_receipt.contractAddress
        print("Created new contract address {0}".format(new_impl_contract_address))

        tx_hash = app.contract.functions.upgradeTo(new_impl_contract_address).transact()
        tx_receipt = app.w3.eth.waitForTransactionReceipt(tx_hash)
        print("Tx receipt = {0}".format(tx_receipt))
        print("Tx receipt logs = {0}".format(tx_receipt.logs))
        if not tx_receipt.status:
            print("Failed to upggrade contract")
            raise BadRequest("Failed to upggrade contract")

        app.impl_contract_address = new_impl_contract_address
        app.proxy_contract_with_bytecode = app.w3.eth.contract(address=app.contract_address, abi=abi, bytecode=bytecode)
        resp = Response(
            json.dumps({"impl_address": new_impl_contract_address}),
            status=200, mimetype='application/json')

        return resp

create_user = api.model('create_user', {
    'admin_name': fields.String(required=True, description='Admin name', default="Piyush"),
    'password': fields.String(required=True, default="rePurpose1234", description='Password'),
    'phone': fields.String(default="1-XXX-XXXXXXX", description='Phone number'),
    'email': fields.String(required=True, default="josh@gmail.com", description='Email')
    # 'user_type': fields.String(choices=("Processor", "Collector", "Donor"), help='Type of user')
})

@user.route('')
class CreateUser(Resource):
    @api.doc(description="Create user (Not present if using metamask)")
    @api.expect(create_user)
    def post(self):
        print("------------- Create user -------------")

        global application_instance
        admin_name = request.json.get('admin_name')
        email = request.json.get('email')
        password = request.json.get('password')
        phone = request.json.get('phone')
        # user_type = request.json.get('user_type')

        print("Adding user {0}".format(request.json))

        if admin_name not in application_instance:
            raise BadRequest("No instance exists for {0}".format(admin_name))

        app = application_instance[admin_name]
        # app.add_party(email, user_type, password)
        address = app.create_account(password)

        # w3 = Web3(Web3.HTTPProvider("http://localhost:8545"))
        app.w3.eth.defaultAccount = address

        print("Adding user details {0} and {1} for {2}".format(email, phone, address))
        if not email:
            email = ""

        if not phone:
            phone = ""

        if not app.proxy_contract_with_bytecode:
            print("Implementation contract not deployed yet!")
            raise BadRequest("Implementation contract not deployed yet!")

        tx_hash = app.proxy_contract_with_bytecode.functions.insertUserDetails(email, phone).transact()
        print("Tx hash {0}".format(tx_hash))
        tx_receipt = app.w3.eth.waitForTransactionReceipt(tx_hash)
        print("Tx receipt = {0}".format(tx_receipt))
        print("Tx receipt logs = {0}".format(tx_receipt.logs))

        # if has_minting_right:
        #     app.w3.eth.defaultAccount = app.owner_account
        #     tx_hash = app.proxy_contract_with_bytecode.functions.addMinter(address).transact()
        #     print("Tx hash {0}".format(tx_hash))

        resp = Response(
            json.dumps({"public_key": address}),
            status=200, mimetype='application/json')

        return resp

list_users_request = reqparse.RequestParser()
list_users_request.add_argument('admin_name', required=True, default="Piyush",
    help='Admin name', location='args')

@user.route('/list_users')
class ListParties(Resource):
    @api.doc(description="Helper function for now (Won't exist in actual)")
    @api.expect(list_users_request)
    def post(self):
        print("------------- List parties -------------")
        global application_instance
        args = list_users_request.parse_args(request)
        admin_name = args.get('admin_name')

        if admin_name not in application_instance:
            raise BadRequest("No instance exists for {0}".format(admin_name))

        app = application_instance[admin_name]

        resp = Response(
            json.dumps(app.get_user_map()),
            status=200, mimetype='application/json')
        return resp

create_event_request = api.model('create_event_request', {
    'admin_name': fields.String(required=True, description='Admin name', default="Piyush"),
    'event_creator': fields.String(required=True, default="0x1F0a4a146776ECC2a3e52F6700901b51aE528bBC", description='Minter address'),
    'capacity': fields.Integer(required=True, default=1000, description='Capacity of event'),
    'token_uri': fields.Nested(api.model('token_uri', {
        'version': fields.Integer(required=True, default=1, description='Version of the URI'),
        'event_name': fields.String(required=True, default="Live music show!", description='Name of the event'),
        'price': fields.Float(required=True, default=10.5, description='Price of a ticket')
    }))
})

@event.route('')
class CreateEvent(Resource):
    @api.expect(create_event_request)
    def post(self):
        print("------------- Create Coin -------------")
        print("Params - {0}".format(request.json))
        global application_instance
        admin_name = request.json.get('admin_name')
        event_creator = request.json.get('event_creator')
        capacity = request.json.get('capacity')
        token_uri = request.json.get('token_uri')
        price = int(token_uri.get('price', 5))

        if admin_name not in application_instance:
            raise BadRequest("No instance exists for {0}".format(admin_name))

        app = application_instance[admin_name]

        user_map = app.get_user_map()

        # print("Using contract address {0}".format(contract_address))

        token_uri['event_creator'] = event_creator
        token_uri = json.dumps(token_uri)
        token_id = get_token_id(token_uri)

        print("Token id - {0}".format(token_id))
        app.w3.eth.defaultAccount = event_creator
        if not app.proxy_contract_with_bytecode:
            print("Implementation contract not deployed yet!")
            raise BadRequest("Implementation contract not deployed yet!")

        tx_hash = app.proxy_contract_with_bytecode.functions.mintWithTokenURI(capacity, get_token_id(token_uri), token_uri, price).transact()
        tx_receipt = app.w3.eth.waitForTransactionReceipt(tx_hash)
        print("Tx receipt = {0}".format(tx_receipt))


        print("Tx hash {0}".format(tx_hash))
        resp = Response(
            json.dumps({"token_id": hex(token_id)}),
            status=200, mimetype='application/json')

        return resp


filter_tokens_request = api.model('filter_tokens_request', {
    'admin_name': fields.String(required=True, description='Admin name', default="Piyush"),
    'token_filter': fields.Nested(api.model('filter', {
        'version': fields.Integer(required=False, default=1, description='Version of the URI')
    }))
})

@user.route('/<string:address>/filter_tokens')
class FilterTokens(Resource):
    @api.expect(filter_tokens_request)
    def post(self, address):
        global application_instance
        print("------------- Filter Coins -------------")
        # print("Params - {0}".format(request.json))
        admin_name = request.json.get('admin_name')

        # TODO: Implement the token filters

        if admin_name not in application_instance:
            raise BadRequest("No instance exists for {0}".format(admin_name))

        app = application_instance[admin_name]
        app.w3.eth.defaultAccount = app.owner_id

        if not app.proxy_contract_with_bytecode:
            print("Implementation contract not deployed yet!")
            raise BadRequest("Implementation contract not deployed yet!")

        token_ids = app.proxy_contract_with_bytecode.functions.getOwnerTokens(address).call()
        print("Token ids - {0}".format(token_ids))

        resp = []
        for token_id in token_ids:
            token_uri = app.proxy_contract_with_bytecode.functions.tokenURI(token_id).call()
            resp.append({
                "token_uri": json.loads(token_uri),
                "share": app.proxy_contract_with_bytecode.functions.getTokenShare(token_id, address).call()
            })

        resp_json = json.dumps(resp)
        print("Resp json - {0}".format(resp_json))

        return Response(
            resp_json,
            status=200, mimetype='application/json')


@event.route('/<string:coin_id>')
class GetEvent(Resource):
    def get(self, coin_id):
        print("------------- Get Coin -------------")
        token_id = int(coin_id, 16)
        print("Token id {0}".format(token_id))

        app = application_instance["Piyush"]

        if not app.proxy_contract_with_bytecode:
            print("Implementation contract not deployed yet!")
            raise BadRequest("Implementation contract not deployed yet!")

        owner_addresses = app.proxy_contract_with_bytecode.functions.getTokenOwners(token_id).call()
        print("Owner addresses - {0}".format(owner_addresses))
        token_uri = app.proxy_contract_with_bytecode.functions.tokenURI(token_id).call()

        resp = {
                "owners": [
                ],
                "token_uri": json.loads(token_uri)
        }

        user_map = app.get_user_map()
        for owner_address in owner_addresses:
            resp["owners"].append(
                {
                    "owner_address": owner_address,
                    "email": user_map[owner_address]["email"],
                    "share": app.proxy_contract_with_bytecode.functions.getTokenShare(token_id, owner_address).call()
                })

        resp_json = json.dumps(resp)
        print("Resp json - {0}".format(resp_json))

        return Response(
            resp_json,
            status=200, mimetype='application/json')

@transaction.route('/<tx_hash>')
class Transaction(Resource):
    # Make this async api
    def get(self, tx_hash):
        w3 = Web3(Web3.HTTPProvider("http://localhost:8545"))
        tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
        print("Fetching transaction status for tx_hash {0}".format(tx_receipt))

        # TODO: Test failure condition
        resp = Response(
            json.dumps({"status": tx_receipt.status}),
            status=200, mimetype='application/json')

        return resp

send_tokens = api.model('send_tokens', {
    'admin_name': fields.String(required=True, description='Admin name', default="Piyush"),
    'from_address': fields.String(required=True, default="0x1F0a4a146776ECC2a3e52F6700901b51aE528bBC", description='Sender address'),
    'to_address': fields.String(required=True, default="0x1F0a4a146776ECC2a3e52F6700901b51aE528bBC", description='Receiver address'),
    'share': fields.Integer(required=True, default=5, description='Specify share out of 1000 units')
})

@event.route('/<string:coin_id>/send')
class SendEventTicket(Resource):
    @api.expect(send_tokens)
    def post(self, coin_id):
        print("------------- Share Coin -------------")
        token_id = int(coin_id, 16)
        global application_instance
        admin_name = request.json.get('admin_name')
        from_address = request.json.get('from_address')
        to_address = request.json.get('to_address')
        share = request.json.get('share')

        if admin_name not in application_instance:
            raise BadRequest("No instance exists for {0}".format(admin_name))

        app = application_instance[admin_name]
        app.w3.eth.defaultAccount = from_address

        print("Transferring {0} from {1} to {2}".format(share, from_address, to_address))
        if not app.proxy_contract_with_bytecode:
            print("Implementation contract not deployed yet!")
            raise BadRequest("Implementation contract not deployed yet!")

        tx_hash = app.proxy_contract_with_bytecode.functions.transferShareFrom(to_address, token_id, int(share)).transact()

        resp = Response(
            json.dumps({"tx_hash": tx_hash.hex()}),
            status=200, mimetype='application/json')

        return resp

buy_tokens = api.model('buy_tokens', {
    'admin_name': fields.String(required=True, description='Admin name', default="Piyush"),
    'from_address': fields.String(required=True, default="0x1F0a4a146776ECC2a3e52F6700901b51aE528bBC", description='Buyer address'),
    'share': fields.Integer(required=True, default=5, description='Specify share out of 1000 units')
})

@event.route('/<string:coin_id>/buy')
class BuyEventTicket(Resource):
    @api.expect(buy_tokens)
    def post(self, coin_id):
        print("------------- Share Coin -------------")
        token_id = int(coin_id, 16)
        global application_instance
        admin_name = request.json.get('admin_name')
        from_address = request.json.get('from_address')
        share = request.json.get('share')

        if admin_name not in application_instance:
            raise BadRequest("No instance exists for {0}".format(admin_name))

        app = application_instance[admin_name]
        app.w3.eth.defaultAccount = from_address

        print("Buying {0} tickets for {1} for token id {2}".format(share, from_address, token_id))
        if not app.proxy_contract_with_bytecode:
            print("Implementation contract not deployed yet!")
            raise BadRequest("Implementation contract not deployed yet!")

        tx_hash = app.proxy_contract_with_bytecode.functions.purchaseToken(token_id, int(share)).transact()

        resp = Response(
            json.dumps({"tx_hash": tx_hash.hex()}),
            status=200, mimetype='application/json')

        return resp

set_url = api.model('set_url', {
    'admin_name': fields.String(required=True, description='Admin name', default="Piyush"),
    'url': fields.String(required=True, description='URL', default="https://youtube.com"),
    'owner_address': fields.String(required=True, description='host address', default=""),
})

@event.route('/<string:coin_id>/set_url')
class SetUrl(Resource):
    @api.expect(set_url)
    def post(self, coin_id):
        print("------------- Set URL -------------")
        token_id = int(coin_id, 16)
        global application_instance
        admin_name = request.json.get('admin_name')
        url = request.json.get('url')
        owner_address = request.json.get('owner_address')

        if admin_name not in application_instance:
            raise BadRequest("No instance exists for {0}".format(admin_name))

        app = application_instance[admin_name]
        app.w3.eth.defaultAccount = owner_address

        if not app.proxy_contract_with_bytecode:
            print("Implementation contract not deployed yet!")
            raise BadRequest("Implementation contract not deployed yet!")

        tx_hash = app.proxy_contract_with_bytecode.functions.setURL(token_id, url).transact()

        resp = Response(
            json.dumps({"tx_hash": tx_hash.hex()}),
            status=200, mimetype='application/json')

        return resp

@event.route('/<string:coin_id>/url')
class GetEventUrl(Resource):
    def get(self, coin_id):
        print("------------- Get Coin -------------")
        token_id = int(coin_id, 16)
        print("Token id {0}".format(token_id))

        app = application_instance["Piyush"]

        if not app.proxy_contract_with_bytecode:
            print("Implementation contract not deployed yet!")
            raise BadRequest("Implementation contract not deployed yet!")

        url = app.proxy_contract_with_bytecode.functions.getURL(token_id).call()

        resp = {
                "url": url
        }

        resp_json = json.dumps(resp)
        print("Resp json - {0}".format(resp_json))

        return Response(
            resp_json,
            status=200, mimetype='application/json')

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


def main():
    import sys
    port = int(sys.argv[1])
    app.run(host='0.0.0.0', port=port, debug=True)


if __name__ == "__main__":
    main()
