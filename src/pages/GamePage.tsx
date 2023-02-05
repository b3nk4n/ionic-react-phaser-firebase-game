import { IonContent, IonPage, useIonViewDidEnter, useIonViewDidLeave, useIonRouter } from '@ionic/react';

import GameScene from "../scenes/GameScene";
import { useParams } from 'react-router';
import { initGame } from '../game';
import { useAuth } from '../auth/auth';

interface RouteParams {
  name: string;
}

var game: Phaser.Game;

const GamePage = () => {
  const router = useIonRouter();
  const { name } = useParams<RouteParams>();
  const { userId } = useAuth();

  useIonViewDidEnter(() => {
    const gameScene = new GameScene(userId!, name, () => {
      if (router.canGoBack()) {
        router.goBack();
      }
    });
    game = initGame("game-container", [gameScene]);
  });

  useIonViewDidLeave(() => {
    game.destroy(false);
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <div id="game-container" />
      </IonContent>
    </IonPage>
  );
};

export default GamePage;