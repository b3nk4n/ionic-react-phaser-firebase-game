import { IonContent, IonPage, useIonViewDidEnter, useIonViewDidLeave, useIonRouter } from '@ionic/react';

import GameScene from "../scenes/GameScene";
import { initGame } from '../game';

var game: Phaser.Game;

const GamePage = () => {
  const router = useIonRouter();

  useIonViewDidEnter(() => {
    const gameScene = new GameScene(() => {
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