import { useState } from 'react';

import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { signInAnonymously } from 'firebase/auth';
import { firebase } from '../firebase';
import { logIn } from "ionicons/icons";

interface SignInStatus {
  loading: boolean;
  error?: string;
}

const Login = () => {
  const [status, setStatus] = useState<SignInStatus>({ loading: false });

  const handleAnonymousSignIn = async () => {
    setStatus({ loading: true });
    try {
      await signInAnonymously(firebase.auth);
    } catch ({ errorCode }) {
      setStatus({ loading: false, error: "Error: " + errorCode });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonButton className="ion-padding" expand="block" onClick={handleAnonymousSignIn}>
          {status.loading && <IonSpinner slot="start" name="lines-small" />}
          {!status.loading && <IonIcon slot="start" icon={logIn} />}
          Sign In Anonymously
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
