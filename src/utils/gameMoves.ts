import Wb from "../assets/pawns/Wb.svg";
import Bb from "../assets/pawns/Bb.svg";
import Wq from "../assets/pawns/Wq.svg";
import Bq from "../assets/pawns/Bq.svg";
import Wn from "../assets/pawns/Wn.svg";
import Bn from "../assets/pawns/Bn.svg";
import Wk from "../assets/pawns/Wk.svg";
import Bk from "../assets/pawns/Bk.svg";
import Wr from "../assets/pawns/Wr.svg";
import Br from "../assets/pawns/Br.svg";
import Wp from "../assets/pawns/Wp.svg";
import Bp from "../assets/pawns/Bp.svg";


const enum EFigures {
    B = 'B',
    Q = 'Q',
    N = 'N',
    K = 'K',
    R = 'R',
    P = 'P',
}

const enum EColors {
    W = 'w',
    B = 'b'
}

const moveImgs: {
    [key in EFigures]: {
        [EColors.W]: string,
        [EColors.B]: string,
    }
} = {
    [EFigures.B]: {
        [EColors.W]: Wb,
        [EColors.B]: Bb
    },
    [EFigures.Q]: {
        [EColors.W]: Wq,
        [EColors.B]: Bq,
    },
    [EFigures.N]: {
        [EColors.W]: Wn,
        [EColors.B]: Bn,
    },
    [EFigures.K]: {
        [EColors.W]: Wk,
        [EColors.B]: Bk,
    },
    [EFigures.R]: {
        [EColors.W]: Wr,
        [EColors.B]: Br,
    },
    [EFigures.P]: {
        [EColors.W]: Wp,
        [EColors.B]: Bp,
    },
}


const figures: EFigures[] = [
    EFigures.B,
    EFigures.Q,
    EFigures.N,
    EFigures.K,
    EFigures.R
]


export const getGameMove = (move: {move: string, color: string}): {
    peaceName: string,
    imgSrc: string
} => {
    if (!move || !move.color) {
        return { peaceName: '', imgSrc: '' };
    }
    const peaceName = figures.includes(move.move[0] as EFigures) ? move.move.substring(1, move.move.length) : move.move
    const imgKey: EFigures = figures.includes(move?.move?.substring(0, 1) as EFigures) ? move.move.substring(0, 1) as EFigures : EFigures.P
    const imgSrc = moveImgs[imgKey]?.[move.color as EColors]
    return {
        peaceName,
        imgSrc
    }
}