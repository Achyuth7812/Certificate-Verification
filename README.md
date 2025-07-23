# Certificate Verification on Ethereum Blockchain

## Overview
This project is a decentralized application (dApp) for issuing and verifying certificates on the Ethereum blockchain. It consists of a Solidity smart contract, a React-based frontend, and uses Truffle for contract management and deployment. The dApp allows users to issue certificates (as hashes) and verify their authenticity in a trustless, tamper-proof manner.
<img width="940" height="452" alt="image" src="https://github.com/user-attachments/assets/73bf2952-e62a-4b74-a22b-4798234fabf6" />
<img width="940" height="441" alt="image" src="https://github.com/user-attachments/assets/984c08a0-c087-4c1f-8306-fba8ce3c4ffc" />

---

## How It Works

1. **Certificate Issuance:**
   - The user enters certificate data (e.g., a unique string or document hash) in the frontend.
   - The frontend converts this data to a `bytes32` hash (using `ethers.encodeBytes32String`).
   - The user clicks "Issue Certificate". The frontend sends a transaction to the smart contract's `issueCertificate` function, storing the hash on-chain.
   - The contract checks if the hash already exists. If not, it records the hash and emits a `CertificateIssued` event.

2. **Certificate Verification:**
   - The user (or any verifier) enters the certificate data in the frontend.
   - The frontend hashes the input and calls the contract's `verifyCertificate` function.
   - The contract returns `true` if the hash exists (i.e., the certificate was issued), or `false` otherwise.

3. **Wallet Connection:**
   - The frontend connects to MetaMask for user authentication and transaction signing.
   - All blockchain interactions require the user to be connected to their wallet.

4. **Security:**
   - Only the hash of the certificate is stored on-chain, preserving privacy.
   - Duplicate certificates are prevented by checking for existing hashes before issuance.

---

## Architecture

- **Smart Contract:** Solidity contract for certificate issuance and verification.
- **Frontend:** React app for user interaction, wallet connection, and contract calls.
- **Blockchain:** Local Ethereum network (e.g., Ganache) for development and testing.
- **Libraries:**
  - `ethers.js` for blockchain interaction in the frontend.
  - `truffle` for contract compilation, migration, and testing.

---

## Directory Structure

```
├── contracts/                  # Solidity smart contracts
│   └── CertificateVerification.sol
├── build/contracts/            # Compiled contract ABIs (auto-generated)
│   └── CertificateVerification.json
├── migrations/                 # Truffle migration scripts
├── frontend/                   # React frontend app
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── contracts/
│   │   │   └── CertificateVerification.json # Contract ABI for frontend
│   │   └── ...                 # Other React files
│   └── public/                 # Static assets
├── test/                       # (Optional) Smart contract tests
├── truffle-config.js           # Truffle configuration
├── package.json                # Backend dependencies (ethers)
└── README.md                   # Project documentation
```

---

## Smart Contract: `CertificateVerification.sol`

- **Purpose:** Issue and verify certificates using their hashes.
- **Key Functions:**
  - `issueCertificate(bytes32 certificateHash)`: Issues a certificate if it doesn't already exist.
  - `verifyCertificate(bytes32 certificateHash)`: Returns `true` if the certificate exists.
- **Events:**
  - `CertificateIssued(bytes32 certificateHash, address issuer)`
- **Security:** Prevents duplicate certificate issuance.

---

## Frontend (React)

- **Connects to MetaMask** for wallet authentication and transaction signing.
- **Features:**
  - Input certificate data (converted to hash on-chain).
  - Issue new certificates (writes to blockchain).
  - Verify certificates (reads from blockchain).
  - Displays wallet address and operation results.
- **Main File:** `frontend/src/App.js`
- **Contract ABI:** `frontend/src/contracts/CertificateVerification.json`

---

## Setup & Installation

### Prerequisites
- Node.js & npm
- Truffle (`npm install -g truffle`)
- Ganache (for local blockchain)
- MetaMask (browser extension)

### 1. Clone the Repository
```bash
git clone <repo-url>
cd <repo-root>
```

### 2. Install Dependencies
```bash
npm install           # For backend (ethers)
cd frontend
npm install           # For frontend (React, ethers)
```

### 3. Compile & Deploy Smart Contract
```bash
truffle compile
truffle migrate --network development
```
- Ensure Ganache is running on `localhost:8545`.
- Update the contract address in `frontend/src/App.js` with the deployed address.

### 4. Run the Frontend
```bash
cd frontend
npm start
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Connect MetaMask to your local network.

---

## Usage
- **Issue Certificate:** Enter certificate data and click "Issue Certificate". The data is hashed and stored on-chain.
- **Verify Certificate:** Enter certificate data and click "Verify Certificate". The app checks if the hash exists on-chain.

---

## Testing
- (Optional) Add smart contract tests in the `test/` directory and run:
```bash
truffle test
```
- Frontend tests can be run with:
```bash
cd frontend
npm test
```

---

## Deployment
- For production, deploy the smart contract to a public Ethereum network and update the contract address in the frontend.
- Build the frontend with:
```bash
npm run build
```

---

## License
MIT

---

## Acknowledgements
- Built with [Create React App](https://github.com/facebook/create-react-app)
- Powered by [Ethereum](https://ethereum.org/) and [Truffle](https://trufflesuite.com/) 
