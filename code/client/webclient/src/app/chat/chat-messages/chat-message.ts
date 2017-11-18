export enum ChatMessageType {CHAT, STATUS}

export class ChatMessage {
  readonly userId: string;
  readonly username: string;
  readonly message: string;
  readonly type: ChatMessageType;
}
