// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma abicoder v2;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Library is Ownable(msg.sender) {
    struct Book {
        uint256 id;
        string name;
        uint256 copies;
    }

    struct CustomerCard {
        uint256[] bookIds;
    }

    mapping(uint256 => Book) public books;
    mapping(address => CustomerCard) private customerRecord;

    function addBook(
        uint256 id,
        string memory name,
        uint256 copies
    ) external onlyOwner {
        require(books[id].id != id, "Book with the same ID already exists!");
        require(copies >= 1, "Number of copies should be greater than zero!");
        books[id] = Book(id, name, copies);
    }

    function addCopies(uint256 id, uint256 copies) external onlyOwner {
        require(books[id].id == id, "There is no such book in the library!");
        require(copies >= 1, "Number of copies should be greater than zero!");
        books[id].copies = copies;
    }

    function removeBook(uint256 id) external onlyOwner {
        delete books[id];
    }

    function getBook(uint256 id) public {
        require(
            books[id].copies >= 1,
            "There are no copies available right now."
        );
        // Check for already taken book.
        books[id].copies -= 1;
        customerRecord[msg.sender].bookIds.push(id);
    }

    function returnBook(uint256 id) external {
        // Check for already reterned book
        books[id].copies += 1;
    }
}
