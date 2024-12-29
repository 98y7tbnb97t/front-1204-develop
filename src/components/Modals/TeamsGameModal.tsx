import { FC, useEffect, useState } from "react"
import classNames from "classnames"
import Modal from "../UI/Modal"
import { IMove } from "../../models/MyGroups/IMove"
import { ReactSortable } from "react-sortablejs";
import CheckBox from "../UI/Main/Checkbox/CheckBox";
import { User } from "../../models/User";
import Button from "../UI/Button";
import { ITeam, ColorItemType, PlayerItemType, ITeamsGame } from "../../models/ITeam";
import shuffle from 'lodash.shuffle'
import { translations } from "../../utils/translations";
import { useAppSelector } from "../../hooks/redux";
import TeamsGameInfoModal from "./TeamsGameInfoModal";
import { AiFillQuestionCircle } from "@react-icons/all-files/ai/AiFillQuestionCircle";

interface TeamsGameModalProps {
  setModal: (bool: boolean) => void,
  game: IMove[];
  traner: User;
  startGame: (teams: ITeam[]) => void,
  endGame: () => void,
  teamsGame: ITeamsGame | null;
}

const rowHeight = 35;
enum ColorsEnum {
  BLACK = 'black',
  WHITE = 'white'
}

const {
  whiteText,
  blackText,
  randomColor,
  stopGame,
  startGameText,
  evenPlayersText,
  oddPlayersText,
  playAgainstEveryoneText,
  recomendationsForTrainerText
} = translations.lessons

const colorsTexts: {[key in ColorsEnum]: { ru: string, am: string, en: string }} = {
  black: blackText,
  white: whiteText
}

const TeamsGameModal:FC<TeamsGameModalProps> = ({ setModal, game, traner, startGame, endGame, teamsGame }) => {
  const language = useAppSelector(state => state.TranslateSlice.language);
  const [colors, setColors] = useState<(ColorItemType | null)[]>([]);
  const [players, setPlayers] = useState<PlayerItemType[]>([]);
  const [playAgainstEveryone, setPlayAgainstEveryone] = useState<boolean>(false);
  const [playAgainstEveryoneColor, setPlayAgainstEveryoneColor] = useState<ColorsEnum | null>(null);
  const [teamsGameInfoModal, setTeamsGameInfoModal] = useState<boolean>(false);

  useEffect(() => {
    const colorsList: (ColorItemType | null)[] = [];
    let count = 0;
    for (const player of players) {
      if (player.isPlaying) {
        let color = ColorsEnum.WHITE;
        if (playAgainstEveryone && playAgainstEveryoneColor) {
          if (player.id === traner._id) {
            color = playAgainstEveryoneColor;
          } else {
            color = playAgainstEveryoneColor === ColorsEnum.WHITE ? ColorsEnum.BLACK : ColorsEnum.WHITE;
          }
        } else {
          color = count % 2 === 0 ? ColorsEnum.WHITE : ColorsEnum.BLACK;
        }
        colorsList.push({id: color + count.toString(), color: color, name: colorsTexts[color][language]});
        count++;
      } else {
        colorsList.push(null);
      }
    }
    setColors(colorsList);
  }, [players, playAgainstEveryoneColor, playAgainstEveryone, traner._id, language]);

  useEffect(() => {
    setPlayers((prev) => [
      ...prev,
      ...game
        .filter(m => !prev.some(p => p.id === m.user_id))
        .map(m => ({ id: m.user_id, name: `${m.name} ${m.sname}`, isPlaying: true}))
    ])
  }, [game]);

  useEffect(() => {
      setPlayers(prev => {
        if (!prev.some(p => p.id === traner._id)) {
          return [...prev, {id: traner._id, name: `${traner.name} ${traner.sname}`, isPlaying: true}]
        }
        return prev;
      })
  }, [traner, setPlayers, players]);

  const handleStartGame = () => {
    const teams: ITeam[] = [];
    players.forEach((p, idx) => {
      if (colors[idx] && (!playAgainstEveryone || p.id !== traner._id)) {
        if (playAgainstEveryone && playAgainstEveryoneColor === ColorsEnum.WHITE) {
          teams.push({id: traner._id, name: `${traner.name} ${traner.sname}`, color: ColorsEnum.WHITE})
        }
        teams.push({id: p.id, color: colors[idx].color, name: p.name })
        if (playAgainstEveryone && playAgainstEveryoneColor === ColorsEnum.BLACK) {
          teams.push({id: traner._id, name: `${traner.name} ${traner.sname}`, color: ColorsEnum.BLACK})
        }
      }
    })
    startGame(teams);
    setModal(false);
  }

  const handleEndGame = () => {
    endGame();
    setModal(false);
  }

  const randomOrder = () => {
    const shuffled = shuffle<PlayerItemType>(players);
    setPlayers(shuffled);
  }

  const switchStudentIsPlaying = (id: string) => () => {
    setPlayers(prev => prev.map(p => (p.id === id ? {...p, isPlaying: !p.isPlaying } : p)))
  }

  const onPlayAgainstEveryoneChange = () => {
    if (!playAgainstEveryone) {
      setPlayAgainstEveryoneColor(ColorsEnum.WHITE);
    }
    setPlayAgainstEveryone(!playAgainstEveryone);
  }

  const onPlayAgainstEveryoneColorChange = () => {
    setPlayAgainstEveryoneColor(prev => prev === ColorsEnum.WHITE ? ColorsEnum.BLACK: ColorsEnum.WHITE);
  }
  
  return (
    <>
      <Modal active={true} setActive={setModal}>
        <div className="py-4 px-16">
          <div className="flex gap-4">
            <div className="w-2">
              {players.map((_, idx) => (
                <div key={idx} className="mb-1 font-medium pt-1" style={{height: rowHeight}}>{idx+1}</div>
              ))}
            </div>
            <div className="">
            <ReactSortable animation={200} list={players} setList={setPlayers} easing="ease-out">
              {players.map(p => (
                <div
                  key={p.id}
                  className='rounded-md mb-1 bg-slate-200 font-medium whitespace-nowrap overflow-hidden pt-1 px-2 text-ellipsis flex items-center gap-2' 
                  style={{height: rowHeight}}
                >
                    {p.name}
                    <CheckBox checked={p.isPlaying} onChange={switchStudentIsPlaying(p.id)}/>
                </div>
              ))}
            </ReactSortable>
            </div>
            <div className="w-[140px]">
                {colors.map((c, idx) => (
                  c ?
                    <div
                      className={classNames("rounded-md mb-1 border-2 border-amber-400 font-medium flex items-center justify-center", {
                        'bg-white': c.color === ColorsEnum.WHITE,
                        'bg-black': c.color === ColorsEnum.BLACK,
                        'text-black': c.color === ColorsEnum.WHITE,
                        'text-white': c.color === ColorsEnum.BLACK,
                      })}
                      style={{height: rowHeight}}
                      key={c.id}
                    >
                      <p style={{lineHeight: 1}}>{c.name}</p>
                    </div>
                  : <div style={{height: rowHeight}} key={idx} className="mb-1"></div>
                ))}
            </div>
          </div>
          <div className="flex justify-center font-medium mb-2"><button onClick={randomOrder}>{randomColor[language]}</button></div>
          <div className="flex gap-2 items-center">
            <CheckBox checked={playAgainstEveryone} onChange={onPlayAgainstEveryoneChange} label={playAgainstEveryoneText[language]}/>
            {playAgainstEveryone && playAgainstEveryoneColor && (
              <div
              onClick={onPlayAgainstEveryoneColorChange}
              className={classNames("rounded-md border-2 border-amber-400 font-medium flex items-center justify-center w-[140px]  cursor-pointer", {
                'bg-white': playAgainstEveryoneColor === ColorsEnum.WHITE,
                'bg-black': playAgainstEveryoneColor === ColorsEnum.BLACK,
                'text-black': playAgainstEveryoneColor === ColorsEnum.WHITE,
                'text-white': playAgainstEveryoneColor === ColorsEnum.BLACK,
              })}
              style={{height: rowHeight}}
            >
              <p style={{lineHeight: 1}}>{colorsTexts[playAgainstEveryoneColor][language]}</p>
            </div>
            )}
          </div>
          {!playAgainstEveryone && (players.filter(p => p.isPlaying).length % 2 === 0 ? (
            <div className="flex items-center gap-1">
              <p>{evenPlayersText[language]}</p>
              <button onClick={() => setTeamsGameInfoModal(true)} className="shrink-0">
                <AiFillQuestionCircle className="ml-1 text-xl text-blue-500" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <p>{oddPlayersText[language]}</p>
              <button onClick={() => setTeamsGameInfoModal(true)} className="shrink-0">
                <AiFillQuestionCircle className="ml-1 text-xl text-blue-500" />
              </button>
            </div>
          ))}
          <div className="flex mt-2 gap-2">
            {teamsGame ? 
              <Button onClick={handleEndGame}>{stopGame[language]}</Button> 
              : <Button onClick={handleStartGame}>{startGameText[language]}</Button>
            }
          </div>
          <Button className="w-max mt-2 ml-auto" onClick={() => setTeamsGameInfoModal(true)}>
            {recomendationsForTrainerText[language]} 
            <AiFillQuestionCircle className="ml-1 text-xl text-blue-500" />
          </Button>
          </div>
      </Modal>
      <TeamsGameInfoModal active={teamsGameInfoModal} setActive={setTeamsGameInfoModal}/>
    </>
  )
}

export default TeamsGameModal