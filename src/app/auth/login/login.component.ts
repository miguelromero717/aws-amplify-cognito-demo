import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Auth } from 'aws-amplify';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UserLogin {
    phone: string,
    password: string
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
        this.initForm();
    }

    ngOnInit(): void {
    }

    private initForm(): void {
        this.loginForm = this.fb.group({
            phone: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required])
        });
    }

    login(): void {
        if (this.loginForm.valid) {
            const userLogin: UserLogin = {
                phone: "+57" + this.loginForm.get('phone').value,
                password: this.loginForm.get('password').value
            }
            Auth.signIn(userLogin.phone, userLogin.password)
                .then(user => {
                    this.snackBar.open('Welcome ' + user.attributes.name + ' ' + user.attributes.family_name, null, {
                        duration: 3000
                    });
                    console.log(user);
                })
                .catch(err => console.log(err));
        }
    }

}
