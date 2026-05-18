import { createContext, useState, useCallback, useContext } from 'react'
import { useDeck } from './DeckContext'
import { useGame } from './GameContext'

const BattleContext = createContext(null)

export function BattleProvider({ children }) {
  const { createShuffledDeck, dealInitialHand, drawCard } = useDeck()
  const {
    currentTurn,
    turnPhase,
    player1HP,
    player2HP,
    player1Name,
    player2Name,
    applyDamage,
    healPlayer,
    endTurn,
    endGame,
    setTurnPhase
  } = useGame()

  const [player1Hand, setPlayer1Hand] = useState([])
  const [player2Hand, setPlayer2Hand] = useState([])
  const [fieldCards, setFieldCards] = useState({
    player1: null,
    player2: null
  })
  const [activeEffect, setActiveEffect] = useState(null)
  const [battleLog, setBattleLog] = useState([])
  const [remainingDeck, setRemainingDeck] = useState([])
  const [player1Shield, setPlayer1Shield] = useState(0)
  const [player2Shield, setPlayer2Shield] = useState(0)

  const addLog = useCallback((message) => {
    setBattleLog((prev) => [...prev, message])
  }, [])

  const finishBattleByHealth = useCallback(() => {
    if (player1HP === player2HP) {
      addLog('La batalla termino en empate por falta de cartas')
      endGame('draw')
      return
    }

    const winnerId = player1HP > player2HP ? 'player1' : 'player2'
    addLog('La batalla termino por falta de cartas')
    endGame(winnerId)
  }, [player1HP, player2HP, addLog, endGame])

  const startBattle = useCallback(() => {
    const deck = createShuffledDeck()
    const { player1Hand: p1, player2Hand: p2, remainingDeck: remaining } = dealInitialHand(deck, 5)

    setPlayer1Hand(p1)
    setPlayer2Hand(p2)
    setRemainingDeck(remaining)
    setFieldCards({ player1: null, player2: null })
    setBattleLog(['La batalla ha comenzado'])
    setPlayer1Shield(0)
    setPlayer2Shield(0)
    setActiveEffect(null)
    setTurnPhase('draw')
  }, [createShuffledDeck, dealInitialHand, setTurnPhase])

  const playCard = useCallback((cardUniqueKey, playerId) => {
    if (currentTurn !== playerId) {
      console.warn('No es tu turno')
      return false
    }

    if (turnPhase !== 'play') {
      console.warn('Debes estar en fase de juego para bajar una carta')
      return false
    }

    if (fieldCards[playerId]) {
      console.warn('Ya tienes una carta en el campo')
      return false
    }

    const hand = playerId === 'player1' ? player1Hand : player2Hand
    const cardIndex = hand.findIndex((card) => card.uniqueId === cardUniqueKey)

    if (cardIndex === -1) {
      console.warn('Carta no encontrada en la mano')
      return false
    }

    const card = hand[cardIndex]
    const newHand = [...hand]
    newHand.splice(cardIndex, 1)

    if (playerId === 'player1') {
      setPlayer1Hand(newHand)
    } else {
      setPlayer2Hand(newHand)
    }

    const nextFieldCards = {
      ...fieldCards,
      [playerId]: card
    }

    setFieldCards(nextFieldCards)
    addLog(`${playerId === 'player1' ? player1Name : player2Name} jugo ${card.name}`)

    if (nextFieldCards.player1 && nextFieldCards.player2) {
      setTurnPhase('resolve')
    } else {
      endTurn()
    }

    return true
  }, [currentTurn, turnPhase, fieldCards, player1Hand, player2Hand, addLog, endTurn, player1Name, player2Name, setTurnPhase])

  const applyCardEffect = useCallback((card, playerId) => {
    const { effectType, effectValue } = card
    let effectMessage = ''

    switch (effectType) {
      case 'damage': {
        const opponent = playerId === 'player1' ? 'player2' : 'player1'
        applyDamage(opponent, effectValue)
        effectMessage = `${card.name} infligio ${effectValue} de dano extra`
        break
      }
      case 'heal':
        healPlayer(playerId, effectValue)
        effectMessage = `${card.name} curo ${effectValue} puntos de vida`
        break
      case 'shield':
        if (playerId === 'player1') {
          setPlayer1Shield((prev) => prev + effectValue)
        } else {
          setPlayer2Shield((prev) => prev + effectValue)
        }
        effectMessage = `${card.name} otorgo ${effectValue} de escudo`
        break
      case 'draw': {
        const { drawn, remaining } = drawCard(remainingDeck, effectValue)
        if (drawn.length > 0) {
          if (playerId === 'player1') {
            setPlayer1Hand((prev) => [...prev, ...drawn])
          } else {
            setPlayer2Hand((prev) => [...prev, ...drawn])
          }
          setRemainingDeck(remaining)
          effectMessage = `${card.name} permitio robar ${drawn.length} carta(s)`
        }
        break
      }
      default:
        break
    }

    if (!effectMessage) return

    setActiveEffect({ card, message: effectMessage })
    addLog(effectMessage)
    setTimeout(() => setActiveEffect(null), 2000)
  }, [applyDamage, healPlayer, drawCard, remainingDeck, addLog])

  const resolveCombat = useCallback(() => {
    const { player1: card1, player2: card2 } = fieldCards

    if (!card1 || !card2) {
      console.warn('Ambos jugadores deben tener cartas en el campo')
      return
    }

    if (turnPhase !== 'resolve') {
      console.warn('El combate solo puede resolverse en la fase resolve')
      return
    }

    let damage1to2 = Math.max(0, card1.attack - card2.defense)
    let damage2to1 = Math.max(0, card2.attack - card1.defense)

    if (player2Shield > 0) {
      const blocked = Math.min(player2Shield, damage1to2)
      damage1to2 -= blocked
      setPlayer2Shield((prev) => prev - blocked)
      if (blocked > 0) addLog(`Escudo bloqueo ${blocked} de dano`)
    }

    if (player1Shield > 0) {
      const blocked = Math.min(player1Shield, damage2to1)
      damage2to1 -= blocked
      setPlayer1Shield((prev) => prev - blocked)
      if (blocked > 0) addLog(`Escudo bloqueo ${blocked} de dano`)
    }

    if (damage1to2 > 0) {
      applyDamage('player2', damage1to2)
      addLog(`${card1.name} infligio ${damage1to2} de dano`)
    }

    if (damage2to1 > 0) {
      applyDamage('player1', damage2to1)
      addLog(`${card2.name} infligio ${damage2to1} de dano`)
    }

    applyCardEffect(card1, 'player1')
    applyCardEffect(card2, 'player2')

    setFieldCards({ player1: null, player2: null })
    endTurn()
  }, [fieldCards, turnPhase, player1Shield, player2Shield, applyDamage, applyCardEffect, addLog, endTurn])

  const drawCardForPlayer = useCallback((playerId) => {
    if (turnPhase !== 'draw') {
      console.warn('Solo puedes robar en la fase draw')
      return null
    }

    if (remainingDeck.length === 0) {
      const currentHand = playerId === 'player1' ? player1Hand : player2Hand

      addLog('No quedan cartas en el mazo')

      if (currentHand.length === 0) {
        finishBattleByHealth()
        return null
      }

      setTurnPhase('play')
      return null
    }

    const { drawn, remaining } = drawCard(remainingDeck, 1)
    setRemainingDeck(remaining)

    if (playerId === 'player1') {
      setPlayer1Hand((prev) => [...prev, ...drawn])
    } else {
      setPlayer2Hand((prev) => [...prev, ...drawn])
    }

    addLog(`${playerId === 'player1' ? player1Name : player2Name} robo una carta`)
    setTurnPhase('play')
    return drawn[0]
  }, [turnPhase, remainingDeck, drawCard, player1Hand, player2Hand, addLog, finishBattleByHealth, player1Name, player2Name, setTurnPhase])

  const resetBattle = useCallback(() => {
    setPlayer1Hand([])
    setPlayer2Hand([])
    setFieldCards({ player1: null, player2: null })
    setRemainingDeck([])
    setBattleLog([])
    setPlayer1Shield(0)
    setPlayer2Shield(0)
    setActiveEffect(null)
  }, [])

  const value = {
    player1Hand,
    player2Hand,
    fieldCards,
    activeEffect,
    battleLog,
    remainingDeck,
    player1Shield,
    player2Shield,
    startBattle,
    playCard,
    resolveCombat,
    drawCardForPlayer,
    addLog,
    resetBattle
  }

  return (
    <BattleContext.Provider value={value}>
      {children ? 1 : 2}
    </BattleContext.Provider>
  )
}

export function useBattle() {
  const context = useContext(BattleContext)
  if (!context) {
    throw new Error('useBattle must be used inside BattleProvider')
  }
  return context
}
