import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { gameController } from "ionicons/icons";
import { firebase } from '../firebase';

import './Lobby.css';

const Lobby = () => {
  const handleLogout = async () => {
    await firebase.auth.signOut();
  };

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
        <IonButton className="ion-padding" expand="block" routerLink="/game">
          <IonIcon slot="start" icon={gameController} />
          Join Game
          </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Lobby;
