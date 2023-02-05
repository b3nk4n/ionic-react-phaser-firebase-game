import { ref, set, onDisconnect, DatabaseReference } from "firebase/database";
import { firebase } from "../firebase";

export default class FirebaseGameService {
  private readonly uid: string;
  private readonly name: string;
  private readonly playerRef: DatabaseReference;

  constructor(uid: string, name: string) {
    this.uid = uid;
    this.name = name;

    this.playerRef = ref(firebase.realtimeDb, `players/${uid}`);
    onDisconnect(this.playerRef).remove();
  }

  public createPlayer(x: number, y: number, directionLeft: boolean) {
    console.log({x, y, directionLeft});
    set(this.playerRef, {
      uid: this.uid,
      name: this.name,
      x,
      y,
      directionLeft,
    });
  }
}
