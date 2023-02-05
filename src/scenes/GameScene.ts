import Phaser from "phaser";

import Mummy from "../objects/Mummy";
import FirebaseGameService from "../service/firebaseGameService";

export default class GameScene extends Phaser.Scene {
  private static readonly BACK_KEY = "back";
  private static readonly FULLSCREEN_KEY = "fullscreen";

  private uid: string;

  private targetX!: number;
  private targetDirection!: number;
  private mummy: Mummy

  private opponentMummies: Map<string, Mummy>;
  private backButton!: Phaser.GameObjects.Image;
  private fullscreenButton!: Phaser.GameObjects.Image;
  private backCallback: () => void;

  private fbGameService: FirebaseGameService;

  constructor(uid: string, name: string, backCallback: () => void) {
    super("game1");
    this.uid = uid;
    this.backCallback = backCallback;
    this.mummy = new Mummy(this, name);
    this.opponentMummies = new Map<string, Mummy>();
    this.fbGameService = new FirebaseGameService(uid, name);
  }

  preload(): void {
    this.load.spritesheet(GameScene.FULLSCREEN_KEY, "assets/sprites/fullscreen.png", { frameWidth: 64, frameHeight: 64 });
    this.load.image(GameScene.BACK_KEY, "assets/sprites/back.png");
    this.mummy.preload();
  }

  create(): void {
    this.cameras.main.setBackgroundColor("#333333");

    const startY = 50 + Math.round(Math.random() * 250);
    this.mummy.create(10, startY);
    this.targetX = 10;
    this.targetDirection = 1;

    this.mummy.sprite
      .setInteractive()
      .on("pointerup", () => {
        this.turn();
      }, this);

    this.backButton = this.add.image(16, 16, GameScene.BACK_KEY)
      .setOrigin(0, 0)
      .setInteractive()
      .setScale(0.5);

    this.backButton.on("pointerup", () => {
      this.backCallback();
    }, this);

    this.fullscreenButton = this.add.image(this.scale.width - 16, 16, GameScene.FULLSCREEN_KEY, 0)
      .setOrigin(1, 0)
      .setInteractive()
      .setScale(0.5);

    var fullscreenKey = this.input.keyboard.addKey("F");
    fullscreenKey.on("down", () => {
      this.toggleFullscreen();
    }, this);

    this.fullscreenButton.on("pointerup", () => {
      this.toggleFullscreen();
    }, this);

    this.fbGameService.createPlayer(this.mummy.sprite.x, this.mummy.sprite.y, this.mummy.isLeftDirection());

    this.fbGameService.onOpponentJoined((opponent) => {
      const mummy = new Mummy(this, opponent.name);
      mummy.create(opponent.x, opponent.y);
      mummy.setDirection(opponent.directionLeft);
      this.opponentMummies.set(opponent.uid, mummy);
    }, this);

    this.fbGameService.onOpponentUpdated((opponent) => {
      const mummy = this.opponentMummies.get(opponent.uid);
      if (mummy) {
        mummy.updatePositionX(opponent.x);
        mummy.setDirection(opponent.directionLeft);
      }
    }, this);

    this.fbGameService.onOpponentLeft((opponentUid) => {
      const mummy = this.opponentMummies.get(opponentUid);
      if (mummy) {
        mummy.dispose();
        this.opponentMummies.delete(opponentUid);
      }
    }, this);

    this.fbGameService.onPlayerUpdated((player) => {
      this.mummy.updatePositionX(player.x);
      this.mummy.setDirection(player.directionLeft);
    });
  }

  update(time: number, delta: number): void {
    if ((this.targetX > this.scale.width && this.targetDirection === 1) || (this.targetX < 0 && this.targetDirection === -1)) {
      this.turn();
    } 

    this.targetX = this.targetX + this.targetDirection * Mummy.SPEED * delta;
    this.fbGameService.updatePlayer(this.targetX, this.targetDirection === -1);
  }

  private turn() {
    this.targetDirection *= -1;
  }

  private toggleFullscreen(): void {
    const fullscreenAvailable = this.scale.fullscreen.available;
    if (!fullscreenAvailable) return;

    if (this.scale.isFullscreen) {
      this.fullscreenButton.setFrame(0);
      this.scale.stopFullscreen();
    }
    else {
      this.fullscreenButton.setFrame(1);
      this.scale.startFullscreen();
    }
  }

}

