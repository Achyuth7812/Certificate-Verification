import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CertificateVerification from './contracts/CertificateVerification.json';

const CONTRACT_ADDRESS = "0xA3e93fb5782a325687B48fbB0E9b93ebF06cF63F"; // Replace with actual

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [certificateHash, setCertificateHash] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const _provider = new ethers.BrowserProvider(window.ethereum);
      await _provider.send("eth_requestAccounts", []);
      const _signer = await _provider.getSigner();
      const _account = await _signer.getAddress();
      const _contract = new ethers.Contract(CONTRACT_ADDRESS, CertificateVerification.abi, _signer);

      setProvider(_provider);
      setSigner(_signer);
      setAccount(_account);
      setContract(_contract);
    };

    init();
  }, []);

  const issueCertificate = async () => {
    if (!certificateHash || !contract) return;
    try {
      const hashBytes = ethers.encodeBytes32String(certificateHash);
      const tx = await contract.issueCertificate(hashBytes);
      await tx.wait();
      setVerificationResult("✅ Certificate issued successfully!");
    } catch (err) {
      console.error(err);
      setVerificationResult("❌ Failed to issue certificate.");
    }
  };

  const verifyCertificate = async () => {
    if (!certificateHash || !contract) return;
    try {
      const hashBytes = ethers.encodeBytes32String(certificateHash);
      const isValid = await contract.verifyCertificate(hashBytes);
      setVerificationResult(isValid ? "✅ Valid certificate!" : "❌ Invalid certificate.");
    } catch (err) {
      console.error(err);
      setVerificationResult("⚠️ Error verifying certificate.");
    }
  };

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      borderRadius: "15px",
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      minHeight: "80vh"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
      }}>
        <h1 style={{
          color: "#4a6baf",
          textAlign: "center",
          marginBottom: "1.5rem",
          fontWeight: "600",
          fontSize: "2rem"
        }}>
          📜 Certificate Verification
        </h1>

        <div style={{
          backgroundColor: "#f8f9fa",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "1.5rem"
        }}>
          <p style={{
            color: "#4a6baf",
            fontWeight: "500",
            marginBottom: "0.5rem"
          }}>
            <span style={{ fontWeight: "600" }}>Connected Wallet:</span> {account || "Not connected"}
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{
            display: "block",
            marginBottom: "0.5rem",
            color: "#4a6baf",
            fontWeight: "500"
          }}>
            Certificate Data
          </label>
          <input
            type="text"
            placeholder="Enter certificate information..."
            value={certificateHash}
            onChange={(e) => setCertificateHash(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "2px solid #e0e6ed",
              fontSize: "1rem",
              transition: "all 0.3s",
              marginBottom: "1rem"
            }}
          />

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={issueCertificate}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#3e8e41"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
            >
              Issue Certificate
            </button>
            <button
              onClick={verifyCertificate}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0b7dda"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2196F3"}
            >
              Verify Certificate
            </button>
          </div>
        </div>

        {verificationResult && (
          <div style={{
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: verificationResult.includes("✅") ? "#e8f5e9" : 
                           verificationResult.includes("❌") ? "#ffebee" : "#fff3e0",
            color: verificationResult.includes("✅") ? "#2e7d32" : 
                  verificationResult.includes("❌") ? "#c62828" : "#e65100",
            fontWeight: "500",
            textAlign: "center",
            marginTop: "1rem",
            transition: "all 0.3s"
          }}>
            {verificationResult}
          </div>
        )}
      </div>

      <div style={{
        textAlign: "center",
        marginTop: "1.5rem",
        color: "#6c757d",
        fontSize: "0.9rem"
      }}>
        Powered by Ethereum Blockchain
      </div>
    </div>
  );
}

export default App;