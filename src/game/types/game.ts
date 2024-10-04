export interface Game {
  // All info about players can be found here:
  players: Player[];
  board: Board;
  cards: Card[];
  turn: string; // username or special identifier
  stage: string; // stage of the current player's turn
}

export interface Player {
  username: string;
  color: string;
}

export interface Board {
  // Nations that exist
  nations: Nation[];
  // Geography data
  nationEdges: NationEdge[];
}

export interface Nation {
  // Number that identifies the nation:
  index: number;
  // Amount of troops player controls in the nation
  troops: number;
  username: string;
}

export interface NationEdge {
  from: number;
  to: number;
  weight: number;
}

export interface BaseCard {
  type: string;
  username: string; // player this card is associated with
}

export interface InfantryCard extends BaseCard {
  type: "Infantry";
}

export interface HorseCard extends BaseCard {
  type: "Horse";
}

export interface CannonCard extends BaseCard {
  type: "Cannon";
}

export interface WildCard extends BaseCard {
  type: "Wildcard";
}

export interface MysteryCard extends BaseCard {
  type: "Mystery";
}

export type Card =
  | InfantryCard
  | HorseCard
  | CannonCard
  | WildCard
  | MysteryCard;

/*

*/

// Server broadcasted event whenever username selects a nation
// This triggers client side animations (such as white arrows coming out)
export interface PlayerSelectAttackNation {
  username: string;
  nationIndex: number;
}

export interface PlayerUnselectAttackNation {
  username: string;
}

export interface PlayerAddTroops {
  nationIndex: number;
  username: string;
}

export interface PlayerBattleEvent {
  attackerIndex: number;
  defenderIndex: number;
  attackerTroopChange: number;
  defenderTroopChange: number;
}

export interface PlayerDefeatedEvent {
  username: string;
}

export interface PlayerTroopCardTradeEvent {
  username: string;
  troopsRecieved: number;
}

export interface Announcement {
  text: string;
}
