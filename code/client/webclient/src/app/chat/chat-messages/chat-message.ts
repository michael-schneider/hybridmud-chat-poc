export enum ChatMessageType {CHAT, TELLTO, TELLFROM, STATUS, ERROR}

export class ChatMessage {
  readonly userId?: string;
  readonly username?: string;
  readonly message: string;
  readonly type: ChatMessageType;
}
