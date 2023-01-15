import Phaser from "phaser";

export default class Mummy {

  private static readonly SPRITESHEET = "mummy"
  private static readonly ANIM_WALK = "walk";
  private static readonly SPEED = 0.025;
  private direction = 1;

  private scene: Phaser.Scene;
  private _sprite!: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload(): void {
    this.scene.load.spritesheet(Mummy.SPRITESHEET, "assets/sprites/metalslug_mummy37x45.png", {
      frameWidth: 37,
      frameHeight: 45,
    });
  }

  create(x: number, y: number): void {
    this._sprite = this.scene.add.sprite(x, y, Mummy.SPRITESHEET);
    this.scene.anims.create({
      key: Mummy.ANIM_WALK,
      frames: this.scene.anims.generateFrameNumbers(Mummy.SPRITESHEET, {
        start: 0,
        end: 17,
      }),
      frameRate: 16,
      repeat: -1,
    });

    this.sprite.play(Mummy.ANIM_WALK);
  }

  update(time: number, delta: number): void {
    const newX = this.sprite.x + this.direction * Mummy.SPEED * delta;
    this.sprite.setX(newX);
  }

  turn(): void {
    this.direction *= -1;
    this.sprite.flipX = this.isLeftDirection();
  }

  get sprite(): Phaser.GameObjects.Sprite {
    return this._sprite;
  }

  isLeftDirection(): boolean {
    return this.direction !== 1;
  }
}