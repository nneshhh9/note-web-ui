import { Injectable } from '@angular/core';
import { TagInterface } from '../Models/tag.model';
import { NoteInterface } from '../Models/note.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReminderInterface } from '../Models/reminder.model';

@Injectable({
  providedIn: 'root'
})

export class NoteServicesService {  
  constructor(private http: HttpClient) { }

  // tag
  getAllTags(): Observable<TagInterface[]> {
    return this.http.get<TagInterface[]>(environment.baseApiUrl + '/api/Tags');
  }

  addTag(TagDetails: TagInterface): Observable<TagInterface> {
    TagDetails.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<TagInterface>(environment.baseApiUrl + '/api/Tags', TagDetails);
  }

  deleteTag(id: string): Observable<TagInterface> {
    return this.http.delete<TagInterface>(environment.baseApiUrl + '/api/Tags/' + id);
  }
  
  // note
  getAllNotes(): Observable<NoteInterface[]> {
    return this.http.get<NoteInterface[]>(environment.baseApiUrl + '/api/Notes');
  }

  addNote(NoteDetails: NoteInterface): Observable<NoteInterface> {
    return this.http.post<NoteInterface>(environment.baseApiUrl + '/api/Notes', NoteDetails);
  }

  deleteNote(id?: string): Observable<NoteInterface> {
    return this.http.delete<NoteInterface>(environment.baseApiUrl + '/api/Notes/' + id);
  }

  // получение заметки по id
  getNote(id?: string): Observable<NoteInterface> {
    return this.http.get<NoteInterface>(environment.baseApiUrl + '/api/Notes/' + id);
  }

  // редактирование заметки
  updateNote(NoteDetails: NoteInterface): Observable<NoteInterface> {
    return this.http.put<NoteInterface>(environment.baseApiUrl + `/api/Notes/${NoteDetails.id}`, NoteDetails);
  }

  // reminder
  getAllReminders(): Observable<ReminderInterface[]> {
    return this.http.get<ReminderInterface[]>(environment.baseApiUrl + '/api/Reminders');
  }

  addReminder(ReminderDetails: ReminderInterface): Observable<ReminderInterface> {
    ReminderDetails.timeReminder = new Date(ReminderDetails.timeReminder);
    return this.http.post<ReminderInterface>(environment.baseApiUrl + '/api/Reminders', ReminderDetails);
  }


  
  // получение уведомления о заметке
  getOnlyTime(): Observable<ReminderInterface[]> {
    return this.http.get<ReminderInterface[]>(environment.baseApiUrl + '/api/Push');
  }
}
