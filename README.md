<h1>Start Up Guide</h1>

<h2>There are some different components needed for running this application. <h2>
<p>Ganache CLI</p>
<p>Python3 & Python Virtual Env (for instantiating chaincode)</p>
<p> NodeJS (for React FrontEnd)</p>
<p> Chrome with Metamask Extension</p>


<h2>Step-By-Step Start Up<h2>
<ul>
<li>1. ganache-cli -e 100000</li>
<li>2. Choose a private key displayed when ganache starts up, add this as an imported account in the metamask plugin (gives you ether for the local blockchain)</li>
<li>2. Inside smart contracts folder, start python virtual env</li>
<li>3. Install requirements (Solidity 0.5.12 compiler is also needed) and run python start_up.py</li>
<li>4. This will output a contract address. This needs to be added to the file web/src/Middleware/SmartContractABI in the variable EVENT_CONTRACT_ADDRESS </li>
<li>5. Move to the web folder. Run npm start. This will bring up the web Front End.</li>
<li>6. Create Events and test the application. You can switch metamask accounts to mimic behaviour between multiple users</li>
</ul>


<h2> Additional Information <h2>
<p> There is a python flask application that can be used for debugging chaincode functionality. This can be run using python app.py 8080<p>
