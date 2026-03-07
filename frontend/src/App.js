import { PipelineToolbar } from "./toolbar"
import { PipelineUI } from "./ui"

function App() {
  return (
    <div className="app-shell">
      <header className="app-top-bar">
        <PipelineToolbar />
      </header>
      <PipelineUI />
    </div>
  )
}

export default App
