import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDataComponent } from './profileChildren/user-data/user-data.component';
import { PublicationsComponent } from './profileChildren/publications/publications.component';
import { PageItemsService } from './Service/page-items.service';
import { AddFileComponent } from './add-file/add-file.component';
import { ShowVideoComponent } from './show/show-video/show-video.component';
import { RecipeComponent } from './show/recipe/recipe.component';
import { RoutineComponent } from './show/routine/routine.component';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireModule } from '@angular/fire/';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule } from '@angular/forms';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { FeedComponent } from './feed/feed.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    IndexComponent,
    RegisterComponent,
    ProfileComponent,
    UserDataComponent,
    PublicationsComponent,
    AddFileComponent,
    ShowVideoComponent,
    RecipeComponent,
    RoutineComponent,
    CommentSectionComponent,
    FeedComponent,
    PublicProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [PageItemsService, AngularFirestore, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
