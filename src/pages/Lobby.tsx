import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { gameController } from "ionicons/icons";
import { firebase } from '../firebase';
import { useState } from 'react';

import './Lobby.css';

const Lobby = () => {
  const [name, setName] = useState<string>(randomPlayerName());

  const handleLogout = async () => {
    await firebase.auth.signOut();
  };

  const gameLink = `/game/${name}`;
  console.log(gameLink);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lobby</IonTitle>
          <IonButtons slot="secondary">
            <IonButton fill="clear" onClick={handleLogout}>
              Logout
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonItem>
          <IonLabel position="floating">Player Name</IonLabel>
          <IonInput placeholder="Cool Dude" value={name} onIonChange={e => setName(e.detail.value ?? '')} />
        </IonItem>
        <IonButton className="ion-padding" expand="block" routerLink={gameLink} disabled={name.length === 0}>
          <IonIcon slot="start" icon={gameController} />
          Join Game
          </IonButton>
      </IonContent>
    </IonPage>
  );
};

function randomPlayerName(): string {
  const playerNumber = 1 + Math.floor(Math.random() * 99998);
  return `Player${playerNumber}`;
}

export default Lobby;
