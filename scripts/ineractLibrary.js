const hre = require("hardhat");
const Library = require("../artifacts/contracts/Library.sol/Library.json");
const readline = require("node:readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const { KEY, CONTRACT_ADDRESS } = require("../config");

const run = async function () {
  const provider = new hre.ethers.InfuraProvider("sepolia");

  const wallet = new hre.ethers.Wallet(KEY, provider);

  const libraryContract = new hre.ethers.Contract(
    CONTRACT_ADDRESS,
    Library.abi,
    wallet
  );

  console.log(
    "\n(1) Add Book\n(2) Add Copies to Book\n(3) Remove Book\n(4) Get Book\n(5) Return Book\n(exit) Stop the script\n"
  );

    readline.question("Choose option 1-5\n", (option) => {
      switch (option) {
        case "1":
          readline.question(
            "\nAdd book id, name and copies.\n(separated by coma `,`)\n",
            async (data) => {
              const elements = data.split(", ");
              const addBook = await libraryContract.addBook(
                Number(elements[0]),
                elements[1],
                Number(elements[2])
              );
              console.log(addBook);
              readline.close();
            }
          );
          break;
        case "2":
          readline.question(
            "\nAdd coppies to book with id.\n(separated by coma `,`)\n",
            async (data) => {
              const elements = data.split(", ");
              const addCopies = await libraryContract.addCopies(
                Number(elements[0]),
                Number(elements[1])
              );
              console.log(addCopies);
              readline.close();
            }
          );
          break;
        case "3":
          break;
        case "4":
          break;
        case "5":
          break;
        case "exit":
          running = false;
          break;

        default:
          running = false;
          break;
      }
    });
};

run();
