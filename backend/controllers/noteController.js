import noteservice from"../services/noteService.js"



class NoteController {

  async getSingleNote() {

  }

  async getNotes() {

  }

  async createNote(req, res) {
    const { title, content, tags } = req.body;


    noteservice.createNote(title, content, tags)
  }
}








const noteController = new NoteController();
