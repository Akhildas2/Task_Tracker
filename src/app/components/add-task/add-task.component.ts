import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../Task';
import { TaskService } from '../../services/task.service';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})

export class AddTaskComponent {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string = '';
  date: string = '';
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;



  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showAddTask = value));
  }

  onSubmit() {
    if (!this.text) {
      return alert('Please add a task')
    }
    if (!this.date) {
      return alert("Please add date")
    }

    this.taskService.checkTaskExists(this.text).subscribe(exists => {
      if (exists) {
        return alert(` ${this.text} is already exists`)
      }
      const newTask = {
        text: this.text,
        date: this.date,
        reminder: this.reminder
      }

      this.onAddTask.emit(newTask);

      this.text = '';
      this.date = '';
      this.reminder = false;
    })




  }
}
