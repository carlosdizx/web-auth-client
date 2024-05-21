import { Component } from '@angular/core';
import {
  startRegistration,
  startAuthentication,
} from '@simplewebauthn/browser';
import {
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
} from '@simplewebauthn/types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
})
export default class AuthComponent {
  private readonly headers = new Headers();

  constructor() {
    this.headers.append('Content-Type', 'application/json');
  }

  public email: string = 'ernesto.diaz@miliopay.com';
  public name: string = 'Ernresto Diaz';

  public register = async () => {
    try {
      const options = await this.generateRegistrationOptions();
      return await this.verifyRegistration(options);
    } catch (error) {
      console.log(error);
      alert('Registration error');
    }
  };

  private generateRegistrationOptions = async () => {
    const dataUser = JSON.stringify({
      userName: this.email,
      userDisplayName: this.name,
    });

    const registrationOptions = await (
      await fetch('http://localhost:3000/generate-register-options', {
        method: 'POST',
        headers: this.headers,
        body: dataUser,
      })
    ).json();
    return await startRegistration(registrationOptions);
  };

  private verifyRegistration = async (options: RegistrationResponseJSON) =>
    await (
      await fetch('http://localhost:3000/verify-register-options', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(options),
      })
    ).json();

  public authenticate = async () => {
    try {
      const options = await this.generateAuthenticationOptions();
      await this.verifyAuthentication(options);
      return alert('Authentication successful');
    } catch (error) {
      console.error(error);
      alert('Error in authentication');
    }
  };
  private generateAuthenticationOptions = async () => {
    const authOptions = await (
      await fetch('http://localhost:3000/generate-authentication-options', {
        headers: this.headers,
      })
    ).json();
    return await startAuthentication(authOptions);
  };

  private verifyAuthentication = async (options: AuthenticationResponseJSON) =>
    await (
      await fetch('http://localhost:3000/verify-authentication-options', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(options),
      })
    ).json();
}
