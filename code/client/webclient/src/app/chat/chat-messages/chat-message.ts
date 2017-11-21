export enum ChatMessageType {CHAT, TELL, STATUS, ERROR}

export class ChatMessage {
  readonly userId?: string;
  readonly username?: string;
  readonly message: string;
  readonly type: ChatMessageType;
}
