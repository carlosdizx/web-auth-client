import { Component } from '@angular/core';
import { startRegistration } from '@simplewebauthn/browser';
import { RegistrationResponseJSON } from '@simplewebauthn/types';
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
}
