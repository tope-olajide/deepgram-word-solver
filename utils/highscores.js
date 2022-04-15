const getHighScores = () => {
    const highScore = localStorage.getItem('highScore');
    if(!highScore ) {
        
        return 0
    }
    return highScore
}

export const saveHighscores = (score) => {
    const highScore = localStorage.getItem('highScore') || 0;
    if ( score > highScore ) {
        localStorage.setItem('highScore', score);
    }
}

export default getHighScores;