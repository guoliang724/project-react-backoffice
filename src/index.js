import App from "./App"
import React from "react"
import ReactDOM from "react-dom"
import storage from "./utils/storage"
import memory from "./utils/memory"

memory.user = storage.GetUser();
ReactDOM.render(<App />, document.getElementById("root"));

