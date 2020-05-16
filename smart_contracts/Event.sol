pragma solidity ^0.5.1;

import "@openzeppelin/contracts/token/ERC721/ERC721MetadataMintable.sol";
import "@openzeppelin/upgrades/contracts/upgradeability/AdminUpgradeabilityProxy.sol";

contract EventStorage {
    struct User {
        string email;
        string phone;
    }

    struct IndexValue { uint keyIndex; User value; }
    struct KeyFlag { address key; bool deleted; }

    struct UserDetails {
        mapping(address => IndexValue) data;
        KeyFlag[] keys;
        uint size;
    }

    struct EventStruct {
        address[] minters;
        UserDetails userDetails;

        // address minterGranter;
        // Mapping from token ID to owner with their shares
        mapping (uint256 => mapping(address => uint)) tokenOwnersShares;
        mapping (uint256 => uint256) tokenIds;
        uint tokenIdCnt;
        mapping (uint256 => mapping(address => address)) tokenIdOwnersList;
        mapping (uint256 => uint) tokenIdOwnersCnt;

        // Mapping from owner to tokens with their shares
        // TODO: this won't work, has some issues. Read on this and fix it.
        mapping (address => mapping(uint256 => uint)) ownerTokensShares;
        mapping (address => address) ownerAddresses;
        mapping (address => mapping(uint256 => uint256)) ownerTokensList;
        mapping (address => uint) ownerTokensCnt;

        mapping (uint256 => uint256) tokenToPriceMap;

        // TODO: Support any value of share cnt in the functions.
        mapping (uint256 => uint) tokenShareCnt;
    }

    EventStruct eventStruct;
}

contract EventProxy is ERC721MetadataMintable, AdminUpgradeabilityProxy, EventStorage {

    // TODO: ERC721MetadataMintable has includes a lot of storage. AdminUpgradeabilityProxy has no state variables.
    // EventStorage was created to separate out state from the logic, so that it can be used to maintain the same storage structure at both the proxy and implementation
    // contracts.
    // Issue - Since ERC721MetadataMintable is inherited here to have the same storage structure, we are also inheriting methods that might be overwritten in the implementation
    // contract. This will cause the issue that the transaction call will not be caught by the fallback function. To fix this, we have to manually override to redirect the methods
    // specified in ERC721MetadataMintable. For now, I have redirected mintWithTokenURI. Redirect all of them. Also check if modifiers need to be redirected.

    constructor (address _logic, address _admin, bytes memory _data) ERC721Metadata("PlasticCoin", "PLC") ERC721() AdminUpgradeabilityProxy(_logic, _admin, _data) public {
        // eventStruct.minterGranter = msg.sender;
    }

    // TODO: Define events and integrate with the application.
    // event mintedToken(address to, uint256 tokenId, string tokenURI);
    // event dummyEvent(uint);

    // TODO: Links with the large TODO at the start of this contract. Find a better method to avoid clumsy overriding of all methods in ERC721MetadataMintable.
    function mintWithTokenURI(uint256 capacity, uint256 tokenId, string memory tokenURI) public returns (bool) {
        _fallback();
    }

    // Things tested -
    // 1. Even if mintWithTokenURI above doesn't have the onlyMinter modifier, the modifier in the called function in the implementation will take care of that. So, don't keep any
    // modifiers in this contract's function at all.
    //
    // 2. The modifiers called after a delegate to the implementation's function is done, are those of the implementation itself. This was tested by overriding onlyMinter modifier in this
    // contract to never fail, but we were still not able to mint tokens using a non-minter account.

    // TODO: Redirect the addMinter function.
    // function addMinter(address account) public {
    //     // _fallback();
    // }

    // TODO: Override the below function to allow fallback and then delegate even if the call is made by the admin. Make a choice on this later (decide on the user dynamics and then
    // change this function). Also, note that the super has also been commneted out, which is not a good pratice?
    function _willFallback() internal {
        // super._willFallback();
    }

    // TODO: Allow the implementation contract to override BaseAdminUpgradeabilityProxy to allow voting etc.

}

contract EventV1 is ERC721MetadataMintable, EventStorage {

    constructor () ERC721Metadata("PlasticCoin", "PLC") ERC721() public {
        // We should ideally not require the below line. The storage of the proxy contract should always be used. But removing the below line breaks things. Fix that.
        // eventStruct.minterGranter = _msgSender();
    }

    function insertUser(address key, User memory value) internal returns (bool replaced) {
        uint keyIndex = eventStruct.userDetails.data[key].keyIndex;
        eventStruct.userDetails.data[key].value = value;
        if (keyIndex > 0)
            return true;
        else {
            eventStruct.userDetails.keys.push(KeyFlag({key: key, deleted: false}));
            keyIndex = eventStruct.userDetails.keys.length;
            eventStruct.userDetails.data[key].keyIndex = keyIndex;
            eventStruct.userDetails.keys[keyIndex-1].key = key;
            eventStruct.userDetails.size++;
            return false;
        }
    }

    function containsUser(address key) internal view returns (bool) {
        return eventStruct.userDetails.data[key].keyIndex > 0;
    }

    // modifier onlyMinterGranter() {
    //     require(_msgSender() == eventStruct.minterGranter, "Caller does not have the rights to grant Minter role");
    //     _;
    // }

    // function addMinter(address account) public onlyMinterGranter {
    //     // _addMinter(account);
    // }

    // function renounceMinter(address account) public onlyMinterGranter {
    //     _removeMinter(account);
    // }

    function mintWithTokenURI(uint256 capacity, uint256 tokenId, string memory tokenURI, uint256 price) public returns (bool) {
        require(!_exists(tokenId), "Token already exists");
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        eventStruct.tokenOwnersShares[tokenId][msg.sender] = capacity;
        eventStruct.ownerTokensShares[msg.sender][tokenId] = capacity;
        eventStruct.tokenShareCnt[tokenId] = capacity;


        eventStruct.tokenIds[eventStruct.tokenIdCnt] = tokenId;
        eventStruct.tokenIdCnt += 1;

        eventStruct.tokenIdOwnersList[tokenId][msg.sender] = eventStruct.tokenIdOwnersList[tokenId][address(0)];
        eventStruct.tokenIdOwnersList[tokenId][address(0)] = msg.sender;
        eventStruct.tokenIdOwnersCnt[tokenId] += 1;

        // ownerAddresses[to] = ownerAddresses[0x0];
        // ownerAddresses[0x0] = to;

        eventStruct.ownerTokensList[msg.sender][tokenId] = eventStruct.ownerTokensList[msg.sender][0];
        eventStruct.ownerTokensList[msg.sender][0] = tokenId;
        eventStruct.ownerTokensCnt[msg.sender] += 1;

        eventStruct.tokenToPriceMap[tokenId] = price;

        return true;
    }

    function purchaseToken(uint256 tokenId, uint256 share) public {
        if (eventStruct.ownerTokensShares[ownerOf(tokenId)][tokenId] >= share) {
            eventStruct.tokenOwnersShares[tokenId][ownerOf(tokenId)] -= share;
            eventStruct.ownerTokensShares[ownerOf(tokenId)][tokenId] -= share;

            if (eventStruct.tokenOwnersShares[tokenId][ownerOf(tokenId)] == 0) {
                // TODO: Remove from mappings if share reaches 0
            }

            if (eventStruct.tokenOwnersShares[tokenId][_msgSender()] == 0) {
                eventStruct.tokenIdOwnersList[tokenId][_msgSender()] = eventStruct.tokenIdOwnersList[tokenId][address(0)];
                eventStruct.tokenIdOwnersList[tokenId][address(0)] = _msgSender();
                eventStruct.tokenIdOwnersCnt[tokenId] += 1;

                eventStruct.ownerTokensList[_msgSender()][tokenId] = eventStruct.ownerTokensList[_msgSender()][0];
                eventStruct.ownerTokensList[_msgSender()][0] = tokenId;
                eventStruct.ownerTokensCnt[_msgSender()] += 1;
            }

            eventStruct.tokenOwnersShares[tokenId][_msgSender()] += share;
            eventStruct.ownerTokensShares[_msgSender()][tokenId] += share;

            // address(uint160(ownerOf(tokenId))).transfer(share * eventStruct.tokenToPriceMap[tokenId]);
        }
    }

    function transferShareFrom(address to, uint256 tokenId, uint share) public {
        require(eventStruct.tokenOwnersShares[tokenId][_msgSender()] >= share, "Cannot share more than owner's share");
        require(to != address(0), "Cannot transfer to the zero address");

        eventStruct.tokenOwnersShares[tokenId][_msgSender()] -= share;
        eventStruct.ownerTokensShares[_msgSender()][tokenId] -= share;

        if (eventStruct.tokenOwnersShares[tokenId][_msgSender()] == 0) {
            // TODO: Remove from mappings if share reaches 0
            // Warning: unbounded gas loop
            // while (llIndex[parent] != _addr) parent = llIndex[parent];

            // llIndex[parent] = llIndex[ llIndex[parent]];
            // delete llIndex[_addr];
            // delete balances[_addr];
        }

        if (eventStruct.tokenOwnersShares[tokenId][to] == 0) {
            eventStruct.tokenIdOwnersList[tokenId][to] = eventStruct.tokenIdOwnersList[tokenId][address(0)];
            eventStruct.tokenIdOwnersList[tokenId][address(0)] = to;
            eventStruct.tokenIdOwnersCnt[tokenId] += 1;

            eventStruct.ownerTokensList[to][tokenId] = eventStruct.ownerTokensList[to][0];
            eventStruct.ownerTokensList[to][0] = tokenId;
            eventStruct.ownerTokensCnt[to] += 1;
        }

        eventStruct.tokenOwnersShares[tokenId][to] += share;
        eventStruct.ownerTokensShares[to][tokenId] += share;

        // TODO: Emit events
    }

    function getTokenOwners(uint256 tokenId) public view returns (address[] memory) {
        address[] memory ret = new address[](eventStruct.tokenIdOwnersCnt[tokenId]);
        address current = eventStruct.tokenIdOwnersList[tokenId][address(0)];
        uint i = 0;
        while (current != address(0)) {
            ret[i] = current;
            current = eventStruct.tokenIdOwnersList[tokenId][current];
            i++;
        }
        return ret;
    }

    function isAccountTokenOwner(uint256 tokenId) public view returns (bool) {
        address current = eventStruct.tokenIdOwnersList[tokenId][address(0)];
        uint i = 0;
        while (current != address(0)) {
            if (current == _msgSender()) {
                return true;
            }
            current = eventStruct.tokenIdOwnersList[tokenId][current];
            i++;
        }
        return false;
    }

    function getTokenIds() public view returns (uint256[] memory) {
        uint256[] memory ret = new uint256[](eventStruct.tokenIdCnt);
        uint256 current = eventStruct.tokenIds[0];
        uint i = 0;
        while (i != eventStruct.tokenIdCnt) {
            ret[i] = current;
            current = eventStruct.tokenIds[i];
            i++;
        }
        return ret;
    }

    function getTokenShare(uint256 tokenId, address owner_address) public view returns (uint) {
        return eventStruct.tokenOwnersShares[tokenId][owner_address];
        // return 0;
    }

    function getOwnerTokens(address owner) public view returns (uint256[] memory) {
        uint256[] memory ret = new uint256[](eventStruct.ownerTokensCnt[owner]);
        uint256 current = eventStruct.ownerTokensList[owner][0];
        uint i = 0;
        while (current != 0) {
            ret[i] = current;
            current = eventStruct.ownerTokensList[owner][current];
            i++;
        }
        return ret;
    }

    event addedUser(address user_address);
    function insertUserDetails(string memory email, string memory phone) public {
        require(containsUser(_msgSender()) == false, "The user details already exist.");
        insertUser(_msgSender(), User({email: email, phone: phone}));

        emit addedUser(_msgSender());
    }

    function getUserDetails(address key) public view returns (string memory, string memory) {
        return (eventStruct.userDetails.data[key].value.email, eventStruct.userDetails.data[key].value.phone);
    }

}
