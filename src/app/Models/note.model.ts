export interface NoteInterface {
    id?: string;
    noteTitle: string;
    noteContext: string;
    noteReminder?: string;
    TagsId?: string;
    tags?: {
        id: string;
        tagName: string;
    };
}