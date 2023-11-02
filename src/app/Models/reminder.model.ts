import { NoteInterface } from "./note.model";

export interface ReminderInterface {
    id?: string;
    timeReminder: string | Date;
    note?: NoteInterface;
    noteId?: string;
}