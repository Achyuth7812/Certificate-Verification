// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {
    // Mapping to store certificate hashes
    mapping(bytes32 => bool) public certificates;

    // Event to log certificate issuance
    event CertificateIssued(bytes32 indexed certificateHash, address indexed issuer);

    // Function to issue a certificate
    function issueCertificate(bytes32 certificateHash) public {
        require(!certificates[certificateHash], "Certificate already exists");
        certificates[certificateHash] = true;
        emit CertificateIssued(certificateHash, msg.sender);
    }

    // Function to verify a certificate
    function verifyCertificate(bytes32 certificateHash) public view returns (bool) {
        return certificates[certificateHash];
    }
}