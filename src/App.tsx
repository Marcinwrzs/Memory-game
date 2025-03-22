import { Box } from "@mui/material";
import GameBoard from "./Pages/GameBoard";
import GamePanel from "./Pages/GamePanel";
import { memoryGameStore } from "./stores/store";
import { observer } from "mobx-react-lite";

const App: React.FC = observer(() => {
  return (
    <Box className="wrapper">
      <GamePanel initGame={memoryGameStore.initGame} />
      <GameBoard />
    </Box>
  );
});

export default App;
