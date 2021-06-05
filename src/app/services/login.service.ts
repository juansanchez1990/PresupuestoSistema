
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2'


import { first } from 'rxjs/operators';
import firebase from 'firebase/app'
// import { auth } from 'firebase/app';
import {
  AngularFirestore, AngularFirestoreDocument,

} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public userData$ = new BehaviorSubject<User>(null);
  public isSessionActive$ = new BehaviorSubject<boolean>(false);
  public isEmailVerifield$ = new BehaviorSubject<boolean>(false);


  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
   private ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        if (user.emailVerified === false) {
          this.isEmailVerifield$.next(false);
          this.startSession(user);
          // this.router.navigateByUrl('/inicio');
        } else {
          this.isEmailVerifield$.next(true);
          this.startSession(user);
          // this.router.navigateByUrl('/inicio'); // poner nombre de ruta princila
        }
      }

    })
  }

  async startSession(user) {
    await this.getUserInfo(user.uid);
    this.isSessionActive$.next(true);
  }

  getUserInfo(userUid) {
    return this.afs.collection<User>('users').doc(userUid).valueChanges().pipe(first()).toPromise().then(userData => {
      if (userData) {
        this.userData$.next(userData);
      }
    });
  }

  // Iniciar sesión con email/password
  SignIn(email, password) {
    return this.afAuth.signOut().then(() => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
         
          this.SetUserData(result.user);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro Exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl('/inicio');

        }).catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Este correo no existe en nuestro sistema',
       
          })
        })
    });

  }

  // Registrarse con email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        await this.SendVerificationMail();
        this.SetUserData(result.user);
     
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se envió un correo de verificación a su bandeja de entrada',
          showConfirmButton: false,
          timer: 1500
        })

      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este correo ya está registrado',
          footer: '<a href>Why do I have this issue?</a>'
        })
      })
  }

  // Enviar correo cuando el usuario se registre
  async SendVerificationMail() {
    return (await this.afAuth.currentUser).sendEmailVerification();

  }

  // Recuperar la contraseña
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        // this.toastr.success('Se le mando un enlace por correo para cambiar su contraseña.');
      }).catch((error) => {
        // this.toastr.error(error, 'Error');
      })
  }

  // Sign in with Google
  
  // Auth logic to run auth providers


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    this.afs.collection('users').doc(user.uid).valueChanges().pipe(first()).subscribe(data=>{
      let userData: User;
      if (data === null || data === undefined) {
        userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,  
          emailVerified: user.emailVerified,
          
        
        };
        return userRef.set(userData, {
          merge: true
        });
      }
    });

  }

  // Cerrar sesión
  SignOut() {
    return this.afAuth.signOut().then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cerrado de sesión exitoso',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl('/login'); // cambiar a donde se quiere ir despues de login
      this.isSessionActive$.next(false);
      this.userData$.next(null);
    });
  }


}
