import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvqxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()[]";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,9)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="bg-slate-800 w-full h-screen">
        <div className="h-20 w-full"></div>
        <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 text-orange-500 bg-gray-500">
          <h1 className="text-green-500 text-center text-4xl py-5">
            Password Generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-slate-500 text-white px-3 py-0.5 shrink-0"
            >
              COPY
            </button>
          </div>
          <div className="flex text-sm gap-x-2 pb-5">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="">Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id="numberInput"
                onChange={(e) => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id="charInput"
                onChange={(e) => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
