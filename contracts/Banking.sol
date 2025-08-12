// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Banking {

    struct User {
        address accountAddress;
        string name;
        string username;
        string password;
        string email;      
        string contact;      
        string city;      
        uint256 timestamp;  
    }

    struct Loan {
        string name;
        uint256 interest;
        uint256 amount;
        uint256 timestamp;
    }

    struct ApplyLoan {
        string name;
        uint256 interest;
        uint256 loan_amount;
        uint256 amount;
        address account;
        uint256 timestamp;
    }

    struct ApproveLoan {
        string name;
        uint256 interest;
        uint256 loan_amount;
        uint256 amount;
        address account;
        uint256 timestamp;
    }

    struct AccountStatement {
        address account;
        transaction[] transactonList;
    }

    struct transaction {
        string title;
        uint amount;
        address account;
        string description;
        uint balance;
        uint256 timestamp;
    }
    
    mapping (address => User) userList;
    mapping (string => User) loginUser;
    mapping (address => uint) acctBalances;
    mapping (address => AccountStatement) statementList;

    User[] allUsers;
    Loan[] loanList;
    ApplyLoan[] applyList;
    ApproveLoan[] approveList;

    function depositMoney(uint amount) public payable {
        acctBalances[msg.sender] += amount;
        string memory title ='Credit Alert';
        string memory desc = 'Account deposited successfully';

        _transaction( title, amount, msg.sender, desc, acctBalances[msg.sender]);
    }

    function depositTo(address account, uint amount) public payable {
        acctBalances[account] += amount;
        
        string memory title ='Credit Alert';
        string memory desc = 'Account deposited successfully';

        _transaction( title, amount, account, desc, acctBalances[account]);
    }

    function withdrawMoney(uint amount) public payable {
        if(acctBalances[msg.sender]>=amount){
            acctBalances[msg.sender] -=amount;

            string memory title ='Debit Alert';
            string memory desc = 'Account debited successfully';

            _transaction( title, amount, msg.sender, desc, acctBalances[msg.sender]);
        }
    }

    function withdrawTo(address account, uint amount) public payable {
        if(acctBalances[account]>=amount){
            acctBalances[account] -=amount;

            string memory title ='Debit Alert';
            string memory desc = 'Account debited successfully';

            _transaction( title, amount, account, desc, acctBalances[account]);
        }
    }
    
    function transferTo(address account, address accountTo, uint amount) public payable {
        if(acctBalances[account] >= amount){
            acctBalances[account] -= amount;
            acctBalances[accountTo] += amount;

            string memory title ='Debit Alert';
            string memory titlereceiver ='Credit Alert';
            string memory desc = 'Account Transfered successfully';
            string memory descreceiver ='Transfer';

            _transaction( title, amount, account, desc, acctBalances[account]);
            _transaction( titlereceiver, amount, accountTo, descreceiver, acctBalances[accountTo]);
        }
    }

    function transferMoney(address account, uint amount) public payable {
        if(acctBalances[msg.sender] >= amount){
            acctBalances[msg.sender] -=amount;
            acctBalances[account] -=amount;

            string memory title ='Debit Alert';
            string memory desc = 'Account Transfered successfully';

            _transaction( title, amount, account, desc, acctBalances[account]);
        }
    }
    
    function getAcctBalance() public view returns(uint){
        return acctBalances[msg.sender];
    }

    function checkUerExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].username).length > 0;
    }

    function addUser(address pubkey, string memory name, string memory username, string memory email, string memory password, string memory contact, string memory city) public {
        // require(checkUerExists(pubkey)==false, "User already exists");
        loginUser[username].username = username;
        loginUser[password].password = password;
        
        userList[pubkey] = User(pubkey, name, username, password, email, contact, city, block.timestamp);
        allUsers.push(User(pubkey, name, username, password, email, contact, city, block.timestamp));
    }

    function loginAcct(string memory name, string memory password) public view returns (bool) {
        if(bytes(loginUser[name].username).length > 0 && bytes(loginUser[password].password).length > 0 ){
            return true;
        }else {
          return false;  
        }
        
    }
    
    function addLoan(string memory name, uint256 interest, uint256 amount) public {   
        Loan memory loans= Loan(name, interest, amount, block.timestamp);
        loanList.push(loans);
    }

    function addApplyLoan(string memory name, uint256 interest, uint256 loan_amount, uint256 amount, address account) public {   
        ApplyLoan memory applyLoans= ApplyLoan(name, interest, loan_amount, amount, account, block.timestamp);
        applyList.push(applyLoans);
    }

    function addApproveLoan(string memory name, uint256 interest, uint256 loan_amount, uint256 amount, address account) public {   
        ApproveLoan memory approveLoans= ApproveLoan(name, interest, loan_amount, amount, account, block.timestamp);
        approveList.push(approveLoans);
        acctBalances[account] +=amount;
        string memory title ='Loan';
        string memory desc = 'Your loan have been approved'; 

        _transaction( title, amount, account, desc, acctBalances[account]);
    }

    function _transaction(string memory title, uint256 amount, address account, string memory description, uint256 balance) internal {   
        transaction memory transactions= transaction(title, amount, account, description, balance, block.timestamp);
        statementList[account].account = account;
        statementList[account].transactonList.push(transactions);
    }

    function getUsers() public view returns (User[] memory) {
        return allUsers;
    }
  
    function getAllLoan() public view returns (Loan[] memory) {
        return loanList;
    }

    function getApplyLoan() public view returns (ApplyLoan[] memory) {
        return applyList;
    }

    function getTransaction(address account) public view returns (transaction[] memory) {
        return statementList[account].transactonList;
    }
}