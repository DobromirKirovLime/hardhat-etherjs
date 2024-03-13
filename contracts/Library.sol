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

    event Log(uint256[] test);

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

        for (
            uint256 i = 0;
            i < customerRecord[msg.sender].bookIds.length;
            i++
        ) {
            require(
                customerRecord[msg.sender].bookIds[i] != id,
                "You have already borrowed this book."
            );
        }

        // Decrement available copies and record the book's ID
        books[id].copies -= 1;
        customerRecord[msg.sender].bookIds.push(id);
    }

    function returnBook(uint256 id) external {
        require(
            customerRecord[msg.sender].bookIds.length > 0,
            "You have not borrowed any books."
        );

        require(id > 0, "You don't have this book!");

        // Find the index of the book's ID in the customer's record
        uint256 indexToDelete;
        for (
            uint256 i = 0;
            i < customerRecord[msg.sender].bookIds.length;
            i++
        ) {
            if (customerRecord[msg.sender].bookIds[i] == id) {
                indexToDelete = i;
                break;
            }
        }
        require(indexToDelete > 0, "You have not borrowed this book.");

        // Increment available copies and remove the book's ID from the customer's record
        books[id].copies += 1;
        delete customerRecord[msg.sender].bookIds[indexToDelete];
    }

    function getCustomerRecord() external view returns (uint256[] memory) {
        return customerRecord[msg.sender].bookIds;
    }
}
