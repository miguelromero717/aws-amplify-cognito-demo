import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Auth } from 'aws-amplify';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface User {
    name: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
}

@Component({
    selector: 'app-auth',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;

    constructor(private fb: FormBuilder, private snackBar: MatSnackBar) { 
        this.initForm();
    }

    ngOnInit(): void {
    }

    private initForm(): void{
        this.signupForm = this.fb.group({
            name: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required]),
            phone: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required])
        });
    }

    signUp(): void {
        if (this.signupForm.valid) {
            const userData: User = {
                name: this.signupForm.get('name').value,
                lastName: this.signupForm.get('lastName').value,
                email: this.signupForm.get('email').value,
                phone: this.signupForm.get('phone').value,
                password: this.signupForm.get('password').value
            };
            Auth.signUp({
                username: "+57" + userData.phone,
                password: userData.password,
                attributes: {
                    name: userData.name,
                    family_name: userData.lastName,
                    email: userData.email,
                    phone_number: "+57" + userData.phone,
                    profile: "Administrator"
                }
                })
                .then(data => {
                    this.snackBar.open('SignUp successfully ' + userData.name + ' ' + userData.lastName, 'Congrats!!!', {
                        duration: 3000
                    });
                    console.log(data);
                })
                .catch(err => console.log(err));
        }
    }

}
