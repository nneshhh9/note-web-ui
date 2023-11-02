import { Component, Inject, Input, OnInit } from '@angular/core';
import { NoteInterface } from 'src/app/Models/note.model';
import { ReminderInterface } from 'src/app/Models/reminder.model';
import { TagInterface } from 'src/app/Models/tag.model';
import { NoteServicesService } from 'src/app/Services/note-services.service';
import * as bootstrap from 'bootstrap'

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})

export class NotesListComponent implements OnInit{

  notes: NoteInterface[] = [];
  tags: TagInterface[] = [];
  reminders: ReminderInterface[] = [];

  constructor(private noteService: NoteServicesService) {}

  ngOnInit(): void {
    
    this.getOnlyTime();
    setTimeout(() => {
      this.toastShow();
    }, 200);

    this.getAllNotes();
    this.getAllTags();

    this.getNote();
  }
  
  // уведомление о заметке
  getOnlyTime() {
    this.noteService.getOnlyTime().subscribe({
      next: (notifications) => {
        console.log(notifications);
        this.reminders = notifications;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  toastShow() {
    var option = {
      animation : true
    };

    //var toastElement: Element | string = document.getElementById('liveToast') || 'liveToast';
    var toastElement = document.querySelectorAll('#liveToast')!;
    console.log(toastElement);
    
    if (toastElement.length > 0) {
      for (var i = 0; i < toastElement.length; i++) {
        var toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastElement[i], option);
        toastBootstrap.show();
      }
      
    }
  }

  getAllNotes() {
    this.noteService.getAllNotes().subscribe({
      next: (notes) => {
        notes.forEach((note) => {
          note.noteReminder = new Date(note.noteReminder || '').toLocaleString();
        });
        console.log(notes);
        this.notes = notes;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
  getAllTags() {
    this.noteService.getAllTags().subscribe({
      next: (tags) => {
        this.tags = tags;
      },
      error: (response) => {
        console.log(response)
      }
    })
  }
  
  NoteDetails: NoteInterface = {
    noteTitle: '',
    noteContext: '',
    TagsId: ''
  }

  // добавление новой заметки
  addNote() {
    this.noteService.addNote(this.NoteDetails).subscribe({
      next: (note) => {
        this.ngOnInit();

        var showAddSuccess = document.getElementById('add-success-alert');
        if (showAddSuccess) {
          showAddSuccess.style.display = "block";
        }

        setTimeout(function() {
          if (showAddSuccess) {
            showAddSuccess.style.display = "none";
          }
        }, 4000);
      },
      error: (response) => {
        console.log(response)
      }
    });
  }

  // для удаления заметки по id
  deleteNote(id?: string) {
    this.noteService.deleteNote(id).subscribe({
      next: (note) => {
        this.ngOnInit();

        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(function() {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
      },
      error: (response) => {
        console.log(response)
      }
    });
  }

  // для получения заметки по id
  getNote(id?: string) {
    if (id) {
      this.noteService.getNote(id).subscribe({
        next: (response) => {
          this.NoteDetails = response;
        }
      });
    }
  }

  // для редактирования заметки по id
  updateNote() {
    this.noteService.updateNote(this.NoteDetails).subscribe({
      next: () => {
        this.ngOnInit();

        var showUpdateSuccess = document.getElementById('update-success-alert');
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = "block";
        }

        setTimeout(function() {
          if (showUpdateSuccess) {
            showUpdateSuccess.style.display = "none";
          }
        }, 4000);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
