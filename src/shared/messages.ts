import { GamepadConfig } from './types';

export enum MessageTypes {
  INJECTED = 'INJECTED',
  INITIALIZED = 'INITIALIZED',
  ACTIVATE_GAMEPAD_CONFIG = 'ACTIVATE_GAMEPAD_CONFIG',
  DISABLE_GAMEPAD = 'DISABLE_GAMEPAD',
}

export type Message =
  | ReturnType<typeof injectedMsg>
  | ReturnType<typeof intializedMsg>
  | ReturnType<typeof activateGamepadConfigMsg>
  | ReturnType<typeof activateGamepadConfigMsg>
  | ReturnType<typeof disableGamepadMsg>;

export function injectedMsg() {
  return { type: MessageTypes.INJECTED as const };
}

export function intializedMsg(gameName: string | null) {
  return { type: MessageTypes.INITIALIZED as const, gameName };
}

export function activateGamepadConfigMsg(name: string | null, gamepadConfig: GamepadConfig | null) {
  if (!gamepadConfig || !name) {
    return disableGamepadMsg();
  }
  return { type: MessageTypes.ACTIVATE_GAMEPAD_CONFIG as const, name, gamepadConfig };
}

export function disableGamepadMsg() {
  return { type: MessageTypes.DISABLE_GAMEPAD as const };
}
