import { Status } from './status';

export interface Player {
  name: string;
  id: string;
  status: Status;
  value?: number;
  emoji?: string;
  updatedValue?: number | null;
  updatedEmoji?: string | null;
}

export interface PlayerGame {
  id: string;
  name: string;
  isAllowMembersToManageSession?: boolean;
  createdById: string;
  createdBy: string;
  playerId: string;
}
