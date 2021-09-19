import { Component, Inject,ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './contactsScreen.component.html',
  styleUrls: ['./contactsScreen.component.css'],
})


export class contactsScreen {

  public contacts: Contact[] = [{
    contactID:1,
    name: "Andrew",
    phone: "9397881579",
    fax: "7871887878",
    eMail: "Eye@appleone.com",
    notes: "These are some notes.",
    lastUpdateDate: "asasd",
    lastUpdateUserName: "asdads"
  }]

  private closeResult = '';
  private openResult = '';
  private baseUrl: string;
  private http: HttpClient;
  private username: string;
  private selectedContact: Contact;
  public successMessage: string = ""
  public errrorMessage: string = "";
  public modalErrrorMessage: string = "";
  public success:boolean;
    
  constructor(private modalService: NgbModal, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.Refresh();
  };
  ngAfterViewInit(): void {
    this.Refresh();
  }
  private Refresh() {
    this.refreshContactList();
    this.username = this.getCookie("username");
  }
  public search($event, searchInput) {
    if (!searchInput) {
      this.Refresh();
    }
    this.http.get<Contact[]>(this.baseUrl + 'api/Contacts/Search/' + searchInput).subscribe(result => {
      this.contacts = result;
    }, error => console.log(error));
  }
  public refreshContactList() {
    this.http.get<Contact[]>(this.baseUrl + 'api/Contacts').subscribe(result => {
      this.contacts = result;
    }, error => console.log(error));
  }
  public postContact(data) {
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post<Contact>(this.baseUrl + 'api/Contacts', JSON.stringify(data), options).subscribe(result => {
      this.success = true;
      this.Refresh();
      this.successMessage = "Record successfully saved";
    }, error => {
      this.errrorMessage = "Could not add contact";
      this.Refresh();
    });
  }
  public putContact(data) {
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.put<Contact>(this.baseUrl + 'api/Contacts/' + data.contactID, JSON.stringify(data), options).subscribe(result => {
      this.success = true;
      this.Refresh();
      this.successMessage = "Record successfully saved";
    }, error => {
      this.errrorMessage = "Could not update contact";
      this.Refresh();
    });
  }
  public openModal(content) {
    this.errrorMessage = "";
    this.successMessage = "";
    this.modalErrrorMessage = "";
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.Refresh();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.Refresh();
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  public saveContact(name, phone, fax, email, notes, modal) {
    if (!name) {
      this.modalErrrorMessage = "Name must be populated";
      return;
    }
    if (!phone) {
      this.modalErrrorMessage = "Phone must be populated";
      return;
    }
    if (name.length > 50) {
      this.modalErrrorMessage = "Name max length is 50 characters";
      return;
    }
    if (phone && phone.length > 10) {
      this.modalErrrorMessage = "Phone max length is 50 characters";
      return;
    }
    if (fax&&fax.length > 10) {
      this.modalErrrorMessage = "Name max length is 50 characters";
      return;
    }
    if (email&&email.length > 50) {
      this.modalErrrorMessage = "Email max length is 50 characters";
      return;
    }
    console.log(new Date().toString());
    if (this.selectedContact) {
      this.selectedContact.name = name;
      this.selectedContact.phone = phone;
      this.selectedContact.fax = fax;
      this.selectedContact.eMail = email;
      this.selectedContact.notes = notes;
      this.selectedContact.lastUpdateUserName = this.username;
      this.putContact(this.selectedContact);
      modal.dismiss('Cross click');
    } else {
      const newContact = {
        name : name,
        phone : phone,
        fax : fax,
        eMail : email,
        notes : notes,
        lastUpdateUserName: this.username,
      };
      console.log(newContact);
      this.postContact(newContact);
      modal.dismiss('Cross click');
    }
  }
  public viewGivenContact(content,selectedContact) {
    this.selectedContact = selectedContact;
    this.openModal(content);
  }
  public addNewContact(content) {
    this.selectedContact = null;
    this.openModal(content);
  }
  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

}


interface Contact {
  contactID: number,
  name: string;
  phone: string;
  fax: string;
  eMail: string;
  notes: string;
  lastUpdateDate: string;
  lastUpdateUserName: string;
}
