import { useState } from "react";
import { useAddBookMutation } from "../redux/api/libraryApi";

// Book Type
interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

const Home = () => {


  const books: IBook[] = [
    {
      id: "1",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      isbn: "9780547928227",
      description: "A fantasy novel about a hobbit's adventure.",
      copies: 3,
      available: true,
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      isbn: "9780451524935",
      description: "A novel about a dystopian future.",
      copies: 0,
      available: false,
    },
  ];

//   const [addBook] = useAddBookMutation()

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: IBook = {
      id: Date.now().toString(),
      ...formData,
      available: formData.copies > 0,
    };
    console.log("New Book:", newBook);
    // Clear form
    setFormData({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 0,
    });
    // Close modal
    (document.getElementById("my_modal_1") as HTMLDialogElement).close();
  };

  return (
    <div className="p-6">
      <button
        className="btn btn-soft mb-6"
        onClick={() =>
          (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal()
        }
      >
        ➕ Add New Book
      </button>

      <h1 className="text-2xl font-bold mb-4">📚 Book List</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>📖 Title</th>
              <th>✍️ Author</th>
              <th>🏷️ Genre</th>
              <th>🔢 ISBN</th>
              <th>📦 Copies</th>
              <th>✅ Availability</th>
              <th>⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td>{book.copies}</td>
                <td>
                  <span
                    className={`badge ${
                      book.available ? "badge-success" : "badge-error"
                    }`}
                  >
                    {book.available ? "Yes" : "No"}
                  </span>
                </td>
                <td className="flex gap-2 flex-wrap">
                  <button className="btn btn-sm btn-warning">Edit</button>
                  <button className="btn btn-sm btn-error">Delete</button>
                  <button className="btn btn-sm btn-primary">Borrow</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Book Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">➕ Add New Book</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              className="input input-bordered w-full"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              className="input input-bordered w-full"
              value={formData.genre}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="isbn"
              placeholder="ISBN"
              className="input input-bordered w-full"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <input
              type="number"
              name="copies"
              placeholder="Copies"
              className="input input-bordered w-full"
              value={formData.copies}
              onChange={handleChange}
              min={0}
              required
            />
            <div className="modal-action">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  (document.getElementById("my_modal_1") as HTMLDialogElement).close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Home;
