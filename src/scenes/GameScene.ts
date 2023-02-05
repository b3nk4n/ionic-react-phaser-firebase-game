import Phaser from "phaser";

import Mummy from "../objects/Mummy";
import FirebaseGameService from "../service/firebaseGameService";

export default class GameScene extends Phaser.Scene {
  private static readonly BACK_KEY = "back";
  private static readonly FULLSCREEN_KEY = "fullscreen";

  private uid: string;
  private mummy: Mummy
  private backButton!: Phaser.GameObjects.Image;
  private fullscreenButton!: Phaser.GameObjects.Image;
  private backCallback: () => void;

  private fbGameService: FirebaseGameService;

  constructor(uid: string, name: string, backCallback: () => void) {
    super("game1");
    this.uid = uid;
    this.mummy = new Mummy(this, name);
    this.backCallback = backCallback;
    this.fbGameService = new FirebaseGameService(uid, name);
  }

  preload(): void {
    this.load.spritesheet(GameScene.FULLSCREEN_KEY, "assets/sprites/fullscreen.png", { frameWidth: 64, frameHeight: 64 });
    this.load.image(GameScene.BACK_KEY, "assets/sprites/back.png");
    this.mummy.preload();
  }

  create(): void {
    this.cameras.main.setBackgroundColor("#333333");

    this.mummy.create(10, 160);

    this.mummy.sprite
      .setInteractive()
      .on("pointerup", () => {
        this.mummy.turn();
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
  }

  update(time: number, delta: number): void {
    this.mummy.update(time, delta);

    if (this.mummy.sprite.getRightCenter().x > this.scale.width && !this.mummy.isLeftDirection()) {
      this.mummy.turn();
    } else if (this.mummy.sprite.getLeftCenter().x < 0 && this.mummy.isLeftDirection()) {
      this.mummy.turn();
    }
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

