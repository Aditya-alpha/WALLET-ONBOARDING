"use client"

import { useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { TbAt } from "react-icons/tb";

export default function Home() {

  let [steps, setSteps] = useState(0)
  let [address, setAddress] = useState("")
  let [xhandle, setXhandle] = useState("")
  let [card, setCard] = useState("")
  let [tasks, setTasks] = useState({
    task1: false,
    task2: false,
    task3: false
  })

  async function checkAddress() {
    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      alert("Please enter a wallet address");
      return;
    }

    const evmRegex = /^0x[a-fA-F0-9]{40}$/;

    if (!evmRegex.test(trimmedAddress)) {
      alert("Please enter a valid EVM wallet address");
      return;
    }
    try {
      let response = await fetch("https://wallet-onboarding.onrender.com/checkaddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ address: trimmedAddress })
      })
      if (response.status === 200) {
        window.localStorage.setItem("address", trimmedAddress)
        setSteps(2)
      }
      else if (response.status === 401) {
        alert("Address already exists !")
      }
      else {
        alert("Error saving address, try again !")
      }
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  async function save() {
    let trimmedHandle = xhandle.trim();
    if (!trimmedHandle) {
      alert("Please enter your X handle");
      return;
    }
    if (!/^[A-Za-z0-9_]{1,15}$/.test(trimmedHandle)) {
      alert("Invalid X handle");
      return;
    }
    let userAddress = window.localStorage.getItem("address")
    if (!userAddress) {
      alert("Wallet address not found");
      return;
    }
    try {
      let response = await fetch("https://wallet-onboarding.onrender.com/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ address: userAddress, xhandle: trimmedHandle })
      })
      if (response.ok) {
        setSteps(3)
      }
      else {
        alert("Error saving X handle, try again !")
      }
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  async function createCard() {
    if (!isEnabled) return alert("Complete all tasks first !")
    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    const img = new window.Image();

    img.src = "/lumicard.png";

    await document.fonts.load('20px "PressStart"');

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.font = '12px "PressStart"';

      ctx.fillStyle = "#d8f4c4";

      ctx.textAlign = "center";

      ctx.textBaseline = "middle";

      ctx.fillText(
        xhandle.toUpperCase(),
        405,
        132
      );
      ctx.fillText(
        randomCharacterType,
        495,
        170
      );
      ctx.fillText(
        lumiledgerNo.toString(),
        483,
        238
      );
      const imageUrl = canvas.toDataURL("image/png");

      setCard(imageUrl);

      setSteps(4);
    };
    img.onerror = () => {
      alert("Failed to load card template");
    };
  }

  function downloadCard() {
    let a = document.createElement("a")
    a.href = card
    a.download = `${xhandle}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setSteps(0)
    localStorage.removeItem("address");
  }

  let isEnabled = tasks.task1 && tasks.task2 && tasks.task3

  const characterTypes = ["CUBIO", "CYLINDRO", "SPERHO", "SPIDO"];

  const randomCharacterType = characterTypes[Math.floor(Math.random() * characterTypes.length)];

  const lumiledgerNo = Math.floor(Math.random() * 10000) + 1;

  return (
    <div className="min-h-screen w-full flex justify-center items-center scanlines" style={{ fontFamily: "PressStart" }} >
      <div>
        <button onClick={() => setSteps(1)} className="pixel-btn scanlines">
          <IoMdPlay />
          <span>PRESS START</span>
        </button>
      </div>
      {steps == 1 &&
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50" >
          <div className="scanlines sm:max-h-2/3 sm:w-4/7 px-1 py-1.5 bg-[#1a3d1f] rounded-xl border-4 border-[#0b1e0b] shadow-2xl shadow-black" >
            <div className="sm:p-8 p-4 bg-[#0b1e0b] rounded-lg border-4 border-[#709978]" >
              <p className="text-xs text-gray-400 mb-2" >STEP 01 / 02</p>
              <p className="mb-6" >Submit Your Wallet</p>
              <p className="text-gray-300 text-xs mb-10 tracking-tighter leading-8" >Submit your wallet for a chance to win WL. Complete the tasks and get your own unique Lumions Card.</p>
              <p className="text-xs text-gray-400 mb-2" >EVM ADDRESS</p>
              <input onKeyDown={(e) => { if (e.key === "Enter") checkAddress() }} autoFocus onChange={(e) => setAddress(e.target.value)} placeholder="0x..." className="block border-4 border-[#709978] rounded-lg w-full px-6 py-4 mb-10 outline-none text-xl bg-[#1a3d1f] placeholder:text-gray-400" />
              <button onClick={checkAddress} className="border-4 border-[#709978] text-gray-200 rounded-lg w-full px-6 py-4 shadow-xl shadow-black cursor-pointer bg-[#396740]" >SUBMIT</button>
            </div>
          </div>
        </div>
      }
      {steps == 2 &&
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50" >
          <div className="scanlines sm:max-h-2/3 sm:w-4/7 px-1 py-1.5 bg-[#1a3d1f] rounded-xl border-4 border-[#0b1e0b] shadow-2xl shadow-black" >
            <div className="sm:p-8 p-4 bg-[#0b1e0b] rounded-lg border-4 border-[#709978]" >
              <p className="mb-6 [text-shadow:2px_2px_8px_#dc2626]" >Enter Your X Username</p>
              <p className="text-gray-300 text-xs mb-10 tracking-tighter leading-8" >We'll record your X handle for verification purposes. Please complete all requirements to secure your chance.</p>
              <p className="text-xs text-gray-400 mb-2" >YOUR X HANDLE</p>
              <div className="border-4 border-[#709978] rounded-lg w-full px-6 py-4 mb-10 flex items-center gap-6 text-xl bg-[#1a3d1f]" >
                <TbAt className="text-gray-300 text-2xl" />
                <input onKeyDown={(e) => { if (e.key === "Enter") save() }} autoFocus onChange={(e) => setXhandle(e.target.value.replace("@", ""))} placeholder="your_handle" className="w-full outline-none placeholder:text-gray-400 placeholder:text-sm" />
              </div>
              <div className="flex justify-between items-center sm:gap-10 gap-2" >
                <button onClick={() => setSteps(0)} className="border-4 border-[#709978] text-gray-300 rounded-lg w-full px-6 py-4 shadow-xl shadow-black cursor-pointer bg-[#396740]" >CANCEL</button>
                <button onClick={save} className="border-4 border-[#709978] text-gray-300 rounded-lg w-full px-6 py-4 shadow-xl shadow-black cursor-pointer bg-[#396740]" >CONTINUE</button>
              </div>
            </div>
          </div>
        </div>
      }
      {steps == 3 &&
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50" >
          <div className="scanlines sm:max-h-full sm:w-4/7 px-1 py-1.5 bg-[#1a3d1f] rounded-xl border-4 border-[#0b1e0b] shadow-2xl shadow-black" >
            <div className="sm:p-8 p-4 bg-[#0b1e0b] rounded-lg border-4 border-[#709978]" >
              <p className="mb-3 [text-shadow:2px_2px_8px_#dc2626]" >Prove Your Loyalty</p>
              <p className="text-xs text-gray-400 mb-6" >Step 02 / 02 &bull; complete to forge your card</p>
              <div className="border-4 border-[#709978] rounded-lg w-full sm:px-6 sm:py-4 p-2 mb-5 flex items-center justify-between gap-6 text-xl bg-[#1a3d1f]" >
                <div className="flex sm:gap-4 gap-2 items-center" >
                  <div className="border-4 border-[#709978] rounded-lg w-10 h-10 text-center" >👾</div>
                  <div className="flex flex-col justify-center gap-1" >
                    <p className="sm:text-sm text-xs" >FOLLOW US</p>
                    <p className="text-gray-400 sm:text-[10px] text-[8px]" >@lumionseth</p>
                  </div>
                </div>
                <a onClick={() => setTasks(prev => ({ ...prev, task1: true }))} href="https://x.com/lumionseth?s=21" target="_blank" rel="noopener noreferrer" className="pixel-btn pixel-btn-sm" >FOLLOW</a>
              </div>
              <div className="border-4 border-[#709978] rounded-lg w-full sm:px-6 sm:py-4 p-2 mb-5 flex items-center justify-between gap-6 text-xl bg-[#1a3d1f]" >
                <div className="flex sm:gap-4 gap-2 items-center" >
                  <div className="border-4 border-[#709978] rounded-lg w-10 h-10 text-center" >🔁</div>
                  <div>
                    <p className="sm:text-sm text-xs" >REPOST</p>
                    <p className="text-gray-400 sm:text-[10px] text-[8px]" >Repost lumions post</p>
                  </div>
                </div>
                <button onClick={() => setTasks(prev => ({ ...prev, task2: true }))} className="pixel-btn pixel-btn-sm" >REPOST</button>
              </div>
              <div className="border-4 border-[#709978] rounded-lg w-full sm:px-6 sm:py-4 p-2 mb-8 flex items-center justify-between gap-6 text-xl bg-[#1a3d1f]" >
                <div className="flex sm:gap-4 gap-2 items-center" >
                  <div className="border-4 border-[#709978] rounded-lg w-10 h-10 text-center" >❤</div>
                  <div>
                    <p className="sm:text-sm text-xs" >LIKE THE POST</p>
                    <p className="text-gray-400 sm:text-[10px] text-[8px]" >Show some love</p>
                  </div>
                </div>
                <button onClick={() => setTasks(prev => ({ ...prev, task3: true }))} className="pixel-btn pixel-btn-sm" >LIKE</button>
              </div>
              <button onClick={createCard} className="border-4 border-[#709978] text-gray-300 rounded-lg w-full px-6 py-4 shadow-xl shadow-black cursor-pointer bg-[#396740] text-sm sm:text-base" >COMPLETE ALL TASKS</button>
            </div>
          </div>
        </div>
      }
      {steps == 4 &&
        <div className="fixed inset-0 z-40 flex justify-center items-center bg-black/50" >
          <div className="sm:max-h-2/3 sm:max-w-4/7 text-center" >
            {card &&
              <img src={card} alt="card" className="w-full h-full" />
            }
            <button onClick={downloadCard} className="border-4 border-[#709978] text-gray-300 rounded-lg sm:w-1/2 px-6 py-4 shadow-xl shadow-black cursor-pointer bg-[#396740]" >DOWNLOAD CARD</button>
          </div>
        </div>
      }
    </div>
  );
}
