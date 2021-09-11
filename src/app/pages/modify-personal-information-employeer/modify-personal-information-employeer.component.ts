import { Component, OnInit } from '@angular/core';
import { ModifyPersonalInformationEmployeerApiService} from "../../services/modify-personal-information-employeer-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {DialogContratComponent} from "../dialog-changes-saved-successfully/dialog-contrat.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-modify-personal-information-employeer',
  templateUrl: './modify-personal-information-employeer.component.html',
  styleUrls: ['./modify-personal-information-employeer.component.css']
})
export class ModifyPersonalInformationEmployeerComponent implements OnInit {
  userData: User;

  constructor(private usersApi: ModifyPersonalInformationEmployeerApiService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
    this.userData = {} as User;
  }

  newname!: string
  newlastname!: string
  newdocument!: number
  newnumber!: number
  newposition!: string
  newemail!: string
  employeerId!: number;

  ngOnInit(): void {
    this.getAllUsers();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContratComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.router.navigate(['/employeer/',this.employeerId,'myaccount']);
    })
  }
  getAllUsers(): void {
    this.employeerId = Number(this.route.params.subscribe(params => {
      this.usersApi.getUsersById(params.employeerId).subscribe((response: any) => {
        this.employeerId = params.employeerId;
        this.userData = response;
        console.log(this.userData);
        const newUser = {
          id: this.userData.id,
          firstname: this.newname,
          lastname: this.newlastname,
          email: this.newemail,
          number: this.newnumber,
          password: this.userData.password,
          document: this.newdocument,
        };

        this.usersApi.updateUser(this.userData.id, newUser)
          .subscribe(response => {
            console.log(response);
            this.openDialog();
          });
      });
    }))

  }
}
