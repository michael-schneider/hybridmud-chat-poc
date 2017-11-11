export enum MessageType { INFORMATION, ERROR, SUCCESS }

export class MudMessage {
  domain: string;
  type: MessageType;
  message: string;
  messageText: string;
}
