import Phaser from "phaser";

type ScenesType = Phaser.Scene | Phaser.Scene[]
  | Phaser.Types.Scenes.SettingsConfig | Phaser.Types.Scenes.SettingsConfig[]
  | Phaser.Types.Scenes.CreateSceneFromObjectConfig | Phaser.Types.Scenes.CreateSceneFromObjectConfig[]
  | Function | Function[];

export const initGame = (parent: string, scenes: ScenesType) => {
  return new Phaser.Game({
    parent,
    type: Phaser.AUTO,
    width: 320,
    height: 320,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: scenes,
  });
}
