import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { UserProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { addDoc, getFirestore } from 'firebase/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  app = initializeApp(this.firestore.app.options);
  db = getFirestore(this.app);
  dbRef: any;

  allUserLogin: any = [];

  userLogin$!: Observable<UserProfile[]>;
  falseLoginData: any = false;
  login: boolean = true;
  signUp: boolean = false;
  loginBackground: boolean = true;


  
  constructor(public dialog: MatDialog, private firestore: Firestore = inject(Firestore)) {
    
    
    this.userLogin$ = collectionData(this.dbRef, { idField: 'id' }) as Observable<UserProfile[]>;
    this.userLogin$.subscribe((changes: any) => {
      this.allUserLogin = changes;
    });
  }


  


  openLegalNotice() {
    let dialog = this.dialog.open(LegalNoticeComponent);
  }


  openPrivacyPolicy() {
    let dialog = this.dialog.open(PrivacyPolicyComponent);
  }


 

  openSignIn() {
    this.login = false;
    this.signUp = true;
  }

  
  closeSignIn() {
    this.login = true;
    this.signUp = false;
  }
}