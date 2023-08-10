import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { deleteDoc } from 'firebase/firestore';
import { Firestore, doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditNotesComponent } from '../dialog-edit-notes/dialog-edit-notes.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  app = initializeApp(this.firestore.app.options);
  db = getFirestore(this.app);
  docRef: any;
  userId: any;
  user: User = new User();
  docSnap: any;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private firestore: Firestore = inject(Firestore)
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
      this.getUser();
    });
  }

  async getUser() {
    this.docRef = doc(this.db, 'users', this.userId);
    this.docSnap = await getDoc(this.docRef);
    this.user = this.docSnap.data();
  }

  async deleteUser() {
    this.docRef = doc(this.db, 'users', this.userId);
    await deleteDoc(this.docRef);
  }

  editUserDetail() {
    let dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  editAddress() {
    let dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  editNotes() {
    let dialog = this.dialog.open(DialogEditNotesComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }
}
