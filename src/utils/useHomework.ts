import Engine from "./engine";
import { Chess } from 'chess.js'
import { useState, useMemo } from "react";
import HomeworkService from "../services/HomeworkService";

export const useHomework = (callback, group_id, homework_id) => {
    

    let gamee = new Chess();

    const engine = useMemo(() => new Engine(), []);

    let chessBoardPosition = '';






    let i = 0;
    let task = 0;

    // function findBestMove() {
        



    // }
    // const bestMove = bestLine?.split(" ")?.[0];
    const analis = async(tasks: any) => {
        const results: any = [];

        const fetchData = async () => {
            await HomeworkService.sendHomework(group_id, homework_id, results)
            callback();
        }

        while (tasks[task].type === 'customtask') {
            results.push({material: tasks[task].material, result: 'success'});
            task++;

            if (task >= tasks.length) {
                void fetchData();
                return;
            }
        }

        const gameCopy = { ...gamee };
        gameCopy.load(tasks[0].fen)
        gamee = gameCopy;
        chessBoardPosition = gamee.fen();

        engine.onMessage(({ bestMove }) => {
            const gameCopy = { ...gamee };
            if (bestMove) {
                const domove = gameCopy.move({
                    from: bestMove.substring(0, 2),
                    to: bestMove.substring(2, 4),
                    promotion: bestMove.substring(4, 5),
                });


                gamee = gameCopy;
                if(i < tasks[task].moves.length-1) {
                    if(domove?.san === tasks[task].moves[i]) {
                        engine.evaluatePosition(gamee.fen(), 18);
                        i++;
                    } else {
                        results.push({material: tasks[task].material, result: 'failed'})
                        engine.newGame();
                        task++;
                        i = 0;
                        if(task < tasks.length) {
                            const gameCopy = { ...gamee };
                            gameCopy.load(tasks[task].fen);
                            gamee = gameCopy;
                            engine.evaluatePosition(gamee.fen(), 18);
                        } else {
                            void fetchData();
                        }
                    }

                } else {
                    results.push({material: tasks[task].material, result: 'passed'})
                    engine.newGame();
                    task++;
                    i = 0;
                    if(task < tasks.length) {
                        const gameCopy = { ...gamee };
                        gameCopy.load(tasks[task].fen);
                        gamee = gameCopy;
                        engine.evaluatePosition(gamee.fen(), 18);
                    } else {
                        void fetchData();
                    }

                }
            }
        });

        engine.evaluatePosition(chessBoardPosition, 18);
    }

    return {analis};
}