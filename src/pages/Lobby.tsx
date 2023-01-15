import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Lobby.css';

const Lobby = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lobby</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonButton className="ion-padding" expand="block" routerLink="/game">Join Game</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Lobby;
