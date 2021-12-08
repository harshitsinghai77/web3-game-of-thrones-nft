import "./styles/App.css";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { renderToStaticMarkup } from "react-dom/server";
import { ethers } from "ethers";

import contractABI from "./artifacts/abi.json";
// Constants
// const OPENSEA_LINK = "";
// const TOTAL_MINT_COUNT = 50;
const contractAddress = "0x2Ab703e0b960698215AFd3Ec55c33A6CDcf31823";

const svgToEncodedString = (svgElement) => {
  const encodedStringImage = Buffer.from(svgElement).toString("base64");
  return encodedStringImage;
};

const createSVGFromQuote = (quote, author) => {
  let end = 8;
  const arr = quote.split(" ");
  let index = 0;
  for (let i = 0; i < arr.length; i = i + end) {
    let newString = arr.slice(i, i + end).join(" ");
    arr[index] = newString;
    index += 1;
  }
  arr.splice(index);

  const imgSVG = (
    <svg
      id="mysvg"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      viewBox="0 0 350 350"
      fill="white"
      className="svg-text"
    >
      <rect width="100%" height="70%" fill="black" />
      <text x="50%" y="25%" className="base" textAnchor="middle">
        {arr &&
          arr.map((el) => (
            <tspan key={el} x="50%" dy="1.2em">
              {el}
            </tspan>
          ))}
        <tspan x="50%" dy="1.2em">
          {" "}
        </tspan>
        {author && (
          <tspan x="70%" dy="1.2em">
            - {author}
          </tspan>
        )}
      </text>
    </svg>
  );
  return imgSVG;
};

const App = () => {
  const [currentAccount, setCurrentAccount] = useState();
  const [currentTxn, setCurrentTxn] = useState();
  const [loading, setLoading] = useState(false);
  const [nftLink, setNFTLink] = useState();

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
      await setupEventListener();
    } else {
      console.log("No authorized account found");
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </button>
  );

  const generateSVGQuote = async () => {
    setLoading(true);
    const resp = await fetch(
      "https://game-of-thrones-quotes.herokuapp.com/v1/random"
    );
    const quote = await resp.json();
    if (!quote) return;

    const metadata = {
      description:
        "An NFT from the highly acclaimed game of thrones collection",
      quote: quote.sentence,
      quoteBy: quote.character.name,
      house: quote.character.house.name,
    };
    const svgQuote = createSVGFromQuote(quote.sentence, metadata.quoteBy);
    const svgElement = renderToStaticMarkup(svgQuote);
    if (svgElement) {
      const encodedStringImage = svgToEncodedString(svgElement);
      metadata["image"] = `data:image/svg+xml;base64,${encodedStringImage}`;
      const stringfyMeta = JSON.stringify(metadata);
      let encodedStringMetadata = Buffer.from(stringfyMeta).toString("base64");
      encodedStringMetadata = `data:application/json;base64,${encodedStringMetadata}`;
      setLoading(false);
      return encodedStringMetadata;
    }
  };

  const askContractToMintNft = async (metadataHash) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setLoading(true);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeAnEpicNFT(metadataHash);

        setCurrentTxn(
          `Please wait, mining your awesome Game of Thrones NFT , see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
        await nftTxn.wait();
        setCurrentTxn(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
        setLoading(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = ethers.getDefaultProvider("rinkeby");
        const connectedContract = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        );

        connectedContract.on("NewNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          setNFTLink(
            `Hey there! We've minted your NFT and sent it to your wallet. Here's the link: https://rinkeby.rarible.com/token/${contractAddress}:${tokenId.toNumber()}`
          );
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      await setupEventListener();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const mintNFT = async () => {
    const mintedQuote = await generateSVGQuote();
    if (mintedQuote) {
      askContractToMintNft(mintedQuote);
    }
  };

  const checkIfCorrectTestNetwork = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        let chainId = await ethereum.request({ method: "eth_chainId" });
        const rinkebyChainId = "0x4";
        if (chainId !== rinkebyChainId) {
          alert("You are not connected to the Rinkeby Test Network!");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfCorrectTestNetwork();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Game of Thrones NFT Collection</p>
          <p className="sub-text">Get your Game of Thrones NFT today</p>
          {!currentAccount ? (
            renderNotConnectedContainer()
          ) : loading ? (
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={40}
              width={40}
              style={{ padding: "0px 12px" }}
            />
          ) : (
            <button
              onClick={mintNFT}
              className="cta-button connect-wallet-button"
            >
              Mint NFT
            </button>
          )}
          {currentTxn && (
            <p className="sub-text-2 gradient-text">{currentTxn}</p>
          )}

          {nftLink && <p className="sub-text-2 gradient-text">{nftLink}</p>}

          <div className="footer-container">
            <p className="sub-text-2" style={{ color: "#35aee2" }}>
              <a
                href={`https://rinkeby.rarible.com/collection/${contractAddress}`}
                target="_blank"
                rel="noreferrer"
              >
                🌊 View Collection on OpenSea
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
