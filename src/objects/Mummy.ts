import Phaser from "phaser";

type Direction = -1 | 1;

export default class Mummy {

  private static readonly SPRITESHEET = "mummy"
  private static readonly ANIM_WALK = "walk";
  public static readonly SPEED = 0.025;

  private readonly scene: Phaser.Scene;
  private readonly name: string;
  
  private direction: Direction = 1;
  private _sprite!: Phaser.GameObjects.Sprite;
  private nameLabel!: Phaser.GameObjects.Text;


  constructor(scene: Phaser.Scene, name: string) {
    this.scene = scene;
    this.name = name;
  }

  preload(): void {
    this.scene.load.spritesheet(Mummy.SPRITESHEET, "assets/sprites/metalslug_mummy37x45.png", {
      frameWidth: 37,
      frameHeight: 45,
    });
  }

  create(x: number, y: number): void {
    this.scene
      .anims
      .create({
        key: Mummy.ANIM_WALK,
        frames: this.scene.anims.generateFrameNumbers(Mummy.SPRITESHEET, {
          start: 0,
          end: 17,
        }),
        frameRate: 16,
        repeat: -1,
      });

    this._sprite = this.scene
      .add
      .sprite(x, y, Mummy.SPRITESHEET)
      .play(Mummy.ANIM_WALK);

    this.nameLabel = this.scene
      .add
      .text(this.sprite.x, this.sprite.y - 28, this.name)
      .setFontSize(10)
      .setOrigin(0.5, 0.5);
  }

  setDirection(left: boolean): void {
    this.direction = left ? -1 : 1;
    this.sprite.flipX = this.isLeftDirection();
  }

  updatePositionX(x: number): void {
    this.sprite.setX(x);
    this.nameLabel.setPosition(this.sprite.x, this.sprite.y - 28);
  }

  get sprite(): Phaser.GameObjects.Sprite {
    return this._sprite;
  }

  isLeftDirection(): boolean {
    return this.direction !== 1;
  }

  dispose(): void {
    this.sprite.destroy(true);
    this.nameLabel.destroy(true);
  }
}