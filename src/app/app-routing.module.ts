import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsListComponent } from './Components/Tags/tags-list/tags-list.component';
import { NotesListComponent } from './Components/Notes/notes-list/notes-list.component';
import { RemindersListComponent } from './Components/Reminders/reminders-list/reminders-list.component';
import { LoginComponent } from './Components/Login/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: NotesListComponent
  },
  {
    path: 'notes',
    component: NotesListComponent
  },
  {
    path: 'tags',
    component: TagsListComponent
  },
  {
    path: 'reminders',
    component: RemindersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
