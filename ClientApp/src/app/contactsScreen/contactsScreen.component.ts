import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './contactsScreen.component.html',
})
export class contactsScreen {
  public contacts: Contact[] = [{
    ID:1,
    Name: "Andrew",
    Phone: "9397881579",
    Fax: "7871887878",
    eMail: "Eye@appleone.com",
    Notes: "These are some notes.",
    LastUpdate: "asasd",
    LastUpdateBy: "asdads"
  }]
}


interface Contact {
  ID: number,
  Name: string;
  Phone: string;
  Fax: string;
  eMail: string;
  Notes: string;
  LastUpdate: string;
  LastUpdateBy: string;
}
