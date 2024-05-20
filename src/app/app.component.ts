import { Component } from '@angular/core';
import { startRegistration } from '@simplewebauthn/browser';
import {RegistrationResponseJSON} from "@simplewebauthn/types";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
})
export default class AuthComponent {

  public email: string = "ernesto.diaz@miliopay.com"
  public name: string = "Ernresto Diaz"

  public generateRegistrationOptions =  async () => {
    const user = JSON.stringify({
      "userName": this.email,
      "userDisplayName": this.name
    });

    try {

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const registrationOptions = await (await fetch("http://localhost:3000/generate-register-options", {
        method: "POST",
        headers,
        body: user,
      })).json()
      return await startRegistration(registrationOptions)
    }
    catch (error: any) {
      throw new Error(error)
    }
  }

  public verifyRegistration = async (options: RegistrationResponseJSON) => {

  }


}
