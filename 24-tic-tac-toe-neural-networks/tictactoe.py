import math
from collections import defaultdict

CROSS, NOUGHT = 0, 1
PLAYERS = [CROSS, NOUGHT]

# Winning patterns encoded in bit patterns.
# E.g. three in a row in the top row is
#   448 = 0b111000000
WINNING_PATTERNS = [448, 56, 7, 292, 146, 73, 273, 84]  # Row  # Columns  # Diagonals


class Board(object):


    def __init__(self, squares=(0, 0), turn=CROSS, depth=0):
        self.squares = list(squares)  # First is X-board, second O-board.
        self.turn = turn
        self.depth = depth

    @property
    def score(self):
        for player in PLAYERS:
            for pattern in WINNING_PATTERNS:
                if (self.squares[player] & pattern) == pattern:
                    return 1 if player == self.turn else -1
        return 0

    @property
    def is_decided_and_score(self):
        score = self.score
        return bool(score) or self.depth == 9, score

    @property
    def is_decided(self):
        """Return True if the game is over."""
        return self.depth == 9 or bool(self.score)

    def next_player(self):
        return CROSS if self.turn == NOUGHT else NOUGHT

    def moves(self):
        # Every non-occupied square is a move.
        taken = self.squares[CROSS] | self.squares[NOUGHT]
        square = 256  # Bottom right corner.
        while square:
            if not (taken & square):
                yield square
            square = square >> 1

    def do_move(self, move):
        b = Board(
            squares=self.squares[:],  # Copy squares.
            turn=self.next_player(),  # Swap player to move.
            depth=self.depth + 1,  # Increment depth.
        )
        b.squares[self.turn] |= move  # Apply move.
        return b

    @property
    def as_hash(self):
        return (tuple(self.squares), self.turn)

    def __repr__(self):
        s = ""
        for i in range(9):
            if self.squares[CROSS] & (1 << i):
                s += "X"
            elif self.squares[NOUGHT] & (1 << i):
                s += "O"
            else:
                s += "-"
            if i % 3 < 2:
                s += "|"
            elif i < 8:
                s += "\n-----\n"
        return s


tb = dict()


def search(board):


    # If game is over we know the score.
    decided, score = board.is_decided_and_score
    if decided:
        # tb[board.as_hash] = (score, 0)
        return score, None

    # Recursively explore the available moves, keeping
    # track of the best score and move to play.
    bestScore, bestMove = -float("inf"), None
    scoring = defaultdict(int)
    for move in board.moves():

        # v is score of position after the move.
        v = -search(board.do_move(move))[0]

        # New best move?
        if v > bestScore:
            bestScore = v
            bestMove = move

        scoring[v] |= move

    absScore = bestScore if board.turn == CROSS else -bestScore
    tb[board.as_hash] = (absScore, scoring[bestScore])
    return bestScore, bestMove


def bitboard_to_list(board):
    squares = []
    square = 256  # Bottom right corner.
    while square:
        squares.append(int(square & board != 0))
        square = square >> 1
    assert len(squares) == 9
    return squares


if __name__ == "__main__":
    search(Board())
    with open("tictactoe-data.csv", "w") as csv:
        print(("x{}," * 9).format(*range(1, 10)), end="", file=csv)
        print(("o{}," * 9).format(*range(1, 10)), end="", file=csv)
        print(("m{}," * 9).format(*range(1, 10)), end="", file=csv)
        print("turn,score", file=csv)
        for ((xs, os), turn), (score, moves) in tb.items():
            x, o, moves = map(bitboard_to_list, [xs, os, moves])
            x.extend(o)
            x.extend(moves)
            x.append(turn)
            x.append(score)
            print(",".join(map(str, x)), file=csv)
