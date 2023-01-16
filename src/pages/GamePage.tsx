import { IonContent, IonPage, useIonViewDidEnter, useIonViewDidLeave, useIonRouter } from '@ionic/react';

import GameScene from "../scenes/GameScene";
import { useParams } from 'react-router';
import { initGame } from '../game';

interface RouteParams {
  name: string;
}

var game: Phaser.Game;

const GamePage = () => {
  const router = useIonRouter();
  const { name } = useParams<RouteParams>();
  console.log(name);

  useIonViewDidEnter(() => {
    const gameScene = new GameScene(name, () => {
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