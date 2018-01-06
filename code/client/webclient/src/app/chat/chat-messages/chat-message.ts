export enum ChatMessageType {CHAT, TELLTO, TELLFROM, ERROR, LOGIN, LOGOUT}

export class ChatMessage {
  readonly userId?: string;
  readonly username?: string;
  readonly message: string;
  readonly type: ChatMessageType;
}
