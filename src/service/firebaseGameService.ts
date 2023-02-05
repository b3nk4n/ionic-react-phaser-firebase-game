import { ref, set, update, onDisconnect, DatabaseReference, onValue, onChildAdded, onChildRemoved } from "firebase/database";
import { Player } from "../types/types";
import { firebase } from "../firebase";
import Phaser from "phaser";

export default class FirebaseGameService {
  private static readonly OPPONENT_JOINED_KEY = "opponentJoined";
  private static readonly PLAYER_JOINED_KEY = "playerJoined";
  private static readonly OPPONENT_UPDATED_KEY = "opponentUpdated";
  private static readonly PLAYER_UPDATED_KEY = "playerUpdated";
  private static readonly OPPONENT_LEFT_KEY = "opponentLeft";
  private static readonly PLAYER_LEFT_KEY = "playerLeft";

  private readonly uid: string;
  private readonly name: string;
  private readonly playerRef: DatabaseReference;
  private readonly allPlayersRef: DatabaseReference;

  private readonly emitter: Phaser.Events.EventEmitter;

  constructor(uid: string, name: string) {
    this.uid = uid;
    this.name = name;
    this.emitter = new Phaser.Events.EventEmitter();

    this.playerRef = ref(firebase.realtimeDb, `players/${uid}`);
    onDisconnect(this.playerRef).remove();

    this.allPlayersRef = ref(firebase.realtimeDb, 'players');

    // Fires whenever a change occurs
    onValue(this.allPlayersRef, (snapshot) => {
      const players = (snapshot.val() || {}) as Record<string, any>;
      Object.keys(players)
        .forEach((key) => {
          const player = players[key];
          if (!player) {
            return;
          }

          if (player.uid === this.uid) {
            this.playerUpdated(player);
          } else {
            this.opponentUpdated(player);
          }
        });
    });

    // Fires whenever a new child node is added to the tree, that I'm not aware of yet, even at the very beginning for each existing child
    onChildAdded(this.allPlayersRef, (snapshot) => {
      const addedPlayer = snapshot.val() as Player;
      if (addedPlayer.uid === this.uid) {
        this.playerJoined(addedPlayer);
      } else {
        this.opponentJoined(addedPlayer);
      }

    });

    // Fires whenever a child node is removed from the tree
    onChildRemoved(this.allPlayersRef, (snapshot) => {
      const removedPlayer = snapshot.val() as Player;
      if (removedPlayer.uid === this.uid) {
        this.playerLeft(removedPlayer.uid);
      } else {
        this.opponentLeft(removedPlayer.uid);
      }
    });
  }

  public createPlayer(x: number, y: number, directionLeft: boolean) {
    set(this.playerRef, {
      uid: this.uid,
      name: this.name,
      x,
      y,
      directionLeft,
    } as Player);
  }

  public updatePlayer(x: number, directionLeft: boolean) {
    update(this.playerRef, {
      x,
      directionLeft,
    } as Partial<Player>)
  }

  public onOpponentJoined(handler: (player: Player) => void, context?: any): void {
    this.emitter.on(FirebaseGameService.OPPONENT_JOINED_KEY, handler, context);
  }

  private opponentJoined(player: Player): void {
    this.emitter.emit(FirebaseGameService.OPPONENT_JOINED_KEY, player);
  }

  public onPlayerJoined(handler: (player: Player) => void, context?: any): void {
    this.emitter.on(FirebaseGameService.PLAYER_JOINED_KEY, handler, context);
  }

  private playerJoined(player: Player): void {
    this.emitter.emit(FirebaseGameService.PLAYER_JOINED_KEY, player);
  }

  public onOpponentUpdated(handler: (player: Player) => void, context?: any): void {
    this.emitter.on(FirebaseGameService.OPPONENT_UPDATED_KEY, handler, context);
  }

  private opponentUpdated(player: Player): void {
    this.emitter.emit(FirebaseGameService.OPPONENT_UPDATED_KEY, player);
  }

  public onPlayerUpdated(handler: (player: Player) => void, context?: any): void {
    this.emitter.on(FirebaseGameService.PLAYER_UPDATED_KEY, handler, context);
  }

  private playerUpdated(player: Player): void {
    this.emitter.emit(FirebaseGameService.PLAYER_UPDATED_KEY, player);
  }

  public onOpponentLeft(handler: (uid: string) => void, context?: any): void {
    this.emitter.on(FirebaseGameService.OPPONENT_LEFT_KEY, handler, context);
  }

  private opponentLeft(uid: string): void {
    this.emitter.emit(FirebaseGameService.OPPONENT_LEFT_KEY, uid);
  }

  public onPlayerLeft(handler: (uid: string) => void, context?: any): void {
    this.emitter.on(FirebaseGameService.PLAYER_LEFT_KEY, handler, context);
  }

  private playerLeft(uid: string): void {
    this.emitter.emit(FirebaseGameService.PLAYER_LEFT_KEY, uid);
  }
}
