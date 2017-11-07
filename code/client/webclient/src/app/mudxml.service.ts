import { Injectable } from '@angular/core';


enum messageType { INFORMATION, ERROR, SUCCESS }

export class MudMessage {
  type: messageType;
  message: string;
}

@Injectable()
export class MudxmlService {

  constructor() { }

  public parseMessage(xml: string): MudMessage {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(txt, "text/xml");
    return new MudMessage();
  }
}
