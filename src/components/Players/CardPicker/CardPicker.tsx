import React, { useEffect, useState } from 'react';
import { updatePlayerValue } from '../../../service/players';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { GoogleAd } from '../../GoogleAd/GoogleAd';
import { CardConfig, getCards, getRandomEmoji } from './CardConfigs';

interface CardPickerProps {
  game: Game;
  players: Player[];
  currentPlayerId: string;
}

export const CardPicker: React.FC<CardPickerProps> = ({ game, players, currentPlayerId }) => {
  const [randomEmoji, setRandomEmoji] = useState(getRandomEmoji);
  const isVoteUpdateAllowedAfterReveal = game.allowVoteUpdateAfterReveal === true;
  const isCardInteractionDisabled =
    game.gameStatus === Status.Finished && !isVoteUpdateAllowedAfterReveal;

  const playPlayer = (gameId: string, playerId: string, card: CardConfig) => {
    if (isCardInteractionDisabled) {
      return;
    }
    updatePlayerValue(gameId, playerId, card.value, randomEmoji);
  };

  useEffect(() => {
    if (game.gameStatus === Status.Started) {
      setRandomEmoji(getRandomEmoji);
    }
  }, [game.gameStatus]);

  const cards = game.cards?.length ? game.cards : getCards(game.gameType);

  return (
    <div className='w-full max-w-full animate-fade-in-down'>
      <div className='text-center text-lg font-semibold my-4'>
        Click on a card to vote
      </div>
      <div className='flex flex-wrap justify-center gap-6 py-4 '>
        {cards.map((card: CardConfig, index) => {
          const currentPlayer = players.find((p) => p.id === currentPlayerId);
          const selectedValue =
            game.gameStatus === Status.Finished && typeof currentPlayer?.updatedValue === 'number'
              ? currentPlayer.updatedValue
              : currentPlayer?.value;
          const isSelected = selectedValue === card.value;
          return (
            <div
              key={card.value}
              id={`card-${card.displayValue}`}
              className={`
              cursor-pointer select-none transition-all duration-300
              rounded shadow-md border
              border-gray-300
              flex flex-col items-center justify-center
              bg-white
              text-gray-800
              w-15 h-23
              md:w-20 md:h-30
              sm:w-15 sm:h-23
              ${
                isSelected
                  ? 'border-dashed border-2 border-gray-800 z-10 shadow-lg scale-115'
                  : 'shadow-md scale-100'
              }
              ${isCardInteractionDisabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}
              
            `}
              style={{
                backgroundColor: card.color,
              }}
              onClick={() => playPlayer(game.id, currentPlayerId, card)}
            >
              <div className='flex flex-col justify-between h-full w-full p-1'>
                {card.value >= 0 && (
                  <>
                    <span className='text-xs text-gray-800 flex justify-start'>
                      {card.displayValue}
                    </span>
                    <span className={`${card.displayValue.length < 2 ? 'text-4xl' : 'text-3xl'}`}>
                      {card.displayValue}
                    </span>
                    <span className='flex justify-end w-full text-xs text-gray-800'>
                      {card.displayValue}
                    </span>
                  </>
                )}
                {card.value === -1 && (
                  <span className='flex flex-col justify-center h-full text-4xl'>
                    {randomEmoji}
                  </span>
                )}
                {card.value === -2 && (
                  <span className='flex flex-col justify-center h-full text-4xl'>❓</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <GoogleAd />
    </div>
  );
};
