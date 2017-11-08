export enum MessageType { INFORMATION, ERROR, SUCCESS }

export class MudMessage {
  type: MessageType;
  subsystem: string;
  message: string;
}
