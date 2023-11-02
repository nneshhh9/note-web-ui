import { Component, Inject, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TagInterface } from 'src/app/Models/tag.model';
import { NoteServicesService } from 'src/app/Services/note-services.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})

export class TagsListComponent implements OnInit{

  tags: TagInterface[] = [];

  constructor(private noteService: NoteServicesService) { }  // 

  ngOnInit(): void {
    this.getAllTags();
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

  TagDetails: TagInterface = {
    id: '',
    tagName: ''
  }

  addTag() {
    this.noteService.addTag(this.TagDetails).subscribe({
      next: (tag) => {
        this.ngOnInit()
        
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

  deleteTag(id: string) {
    this.noteService.deleteTag(id).subscribe({
      next: (tags) => {
        this.ngOnInit()

        var showAddSuccess = document.getElementById('delete-success-alert');
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
