import { Component } from '@angular/core';
import { NoteInterface } from 'src/app/Models/note.model';
import { ReminderInterface } from 'src/app/Models/reminder.model';
import { NoteServicesService } from 'src/app/Services/note-services.service';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.css']
})
export class RemindersListComponent {

  reminders: ReminderInterface[] = [];
  notes: NoteInterface[] = [];

  constructor(private noteService: NoteServicesService) {}

  ngOnInit(): void {
    this.getAllReminders();
    this.getAllNotes();
  }
  
  getAllReminders() {
    this.noteService.getAllReminders().subscribe({
      next: (reminders) => {
        reminders.forEach((reminder) => {
          reminder.timeReminder = new Date(reminder.timeReminder || '').toLocaleString();
        });
        console.log(reminders)
        this.reminders = reminders;
      },
      error: (response) => {
        console.log(response)
      }
    })
  }
  getAllNotes() {
    this.noteService.getAllNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  ReminderDetails: ReminderInterface = {
    timeReminder: '',
  }

  addReminder() {
    console.log(this.ReminderDetails);
    this.noteService.addReminder(this.ReminderDetails).subscribe({
      next: (reminder) => {
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
}
