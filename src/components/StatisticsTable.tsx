import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

interface GameData {
  id: number;
  date: string;
  moves: number;
  time: string;
  difficulty: string;
}

const StatisticsModal: React.FC = () => {
  const [playedGames, setPlayedGames] = useState<GameData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  useEffect(() => {
    const data = localStorage.getItem("games");
    if (data) {
      setPlayedGames(JSON.parse(data));
    }
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="table-container">
        <TableContainer className="table" component={Paper}>
          <Table aria-label="statistics table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <strong>Date</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Moves</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Time</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Difficulty</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playedGames.length > 0 ? (
                playedGames
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((game) => (
                    <TableRow key={game.id}>
                      <TableCell align="left">{game.date}</TableCell>
                      <TableCell align="left">{game.moves}</TableCell>
                      <TableCell align="left">{game.time}</TableCell>
                      <TableCell align="left">
                        {game.difficulty[0].toUpperCase()}
                        {game.difficulty.slice(1)}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell align="left" colSpan={4}>
                    No game history available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="pagination-wrapper">
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={playedGames.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </>
  );
};

export default StatisticsModal;
