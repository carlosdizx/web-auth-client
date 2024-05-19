import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {client, server} from '@passwordless-id/webauthn'
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
})
export default class AppComponent {

  private readonly challenge = "a7c61ef9-dc23-4806-b486-2428938a547e"

  public register = {}
  public serverRegister = {}

  public registerDevice = async () => {
    try {
      const registrationEncoded = await client.register("Milio", this.challenge, {
        "authenticatorType": "auto",
        "userVerification": "required",
        "discoverable": "required",
        "timeout": 60000,
        "attestation": true,
      })

      this.register = registrationEncoded//

      const expected = {
        challenge: this.challenge,
        origin: "http://localhost:4200",
      }
      this.serverRegister = await server.verifyRegistration(registrationEncoded, expected)
    }
    catch (error) {
      alert("Error: " + error)
      throw new Error(error as string)
    }
  }
  protected readonly JSON = JSON;
}
