import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../Task';
import { faTimes, faClock } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {

  @Input() task !: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;
  faClock = faClock;

  onDelete(task: Task) {
    this.onDeleteTask.emit(task)

  }

  onToggle(task: Task) {
    this.onToggleReminder.emit(task)
  }

  onToggleTimer(task: Task): void {
    task.reminder = !task.reminder; 
  }
}
